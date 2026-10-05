import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spellActions } from "../../src/logic/spellActions";
import { unlockTalent } from "../../src/logic/talentActions";
import { equipItem, grantItem, removeItem, unequipItem } from "../../src/logic/itemActions";
import { ITEM_TEMPLATES } from "../../src/data/itemData";
import { UNIQUE_ITEMS } from "../../src/data/uniqueItemData";
import { BOSSES } from "../../src/data/bossData";
import { DEFAULT_ENEMIES } from "../../src/data/enemyData";
import type {
  AuraSpell,
  Effect,
  EquipSlot,
  Item,
  MagicSpell,
  PhysicalSpell,
  Spell,
  Talent,
} from "../../src/types";
import type { Trigger } from "../../src/types/triggers";
import {
  advanceStart,
  character,
  emptyStats,
  flush,
  forkRun,
  formatTime,
  gameSeconds,
  getState,
  loadRun,
  newRun,
  RunFile,
  RunStats,
  saveState,
  store,
  tick,
} from "./engine";
import { spawnNewEnemies } from "../../src/logic/enemyActions";

const RUNS_DIR = join(process.cwd(), "playtest", "runs");
const out = (line = "") => console.log(line);

const SLOTS: Record<string, EquipSlot[]> = {
  weapon: ["weapon1", "weapon2"],
  ring: ["ring1", "ring2"],
  body: ["body"],
  helmet: ["helmet"],
  legs: ["legs"],
  boots: ["boots"],
  amulet: ["amulet"],
};

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function runPath(name: string) {
  return join(RUNS_DIR, `${name}.json`);
}

function readRun(name: string): RunFile {
  if (!existsSync(runPath(name))) fail(`no run named "${name}". Start one with: new ${name}`);
  const run: RunFile = JSON.parse(readFileSync(runPath(name), "utf8"));
  run.stats = { ...emptyStats(), ...run.stats };
  return run;
}

function writeRun(run: RunFile) {
  saveState(run);
  mkdirSync(RUNS_DIR, { recursive: true });
  writeFileSync(runPath(run.name), JSON.stringify(run));
}

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

// ---------- formatting ----------

function fmtEffect(e: Effect): string {
  const sign = e.value >= 0 ? "+" : "";
  const amount = e.priority === "set" ? `set to ${e.value}` : `${sign}${e.value}${e.valueType === "percentage" ? "%" : ""}`;
  return `${e.type} ${amount}`;
}

function fmtTrigger(t: Trigger): string {
  const parts = [t.type, "->", t.action];
  if (t.status) parts.push(t.status);
  if (t.value !== undefined) parts.push(String(t.value));
  if (t.spell) parts.push(`"${t.spell.name}"`);
  if (t.chance !== undefined) parts.push(`(${t.chance}% chance)`);
  return parts.join(" ");
}

function fmtStatuses(stats: Record<string, { total: number }>): string {
  return Object.entries(stats)
    .map(([type, stat]) => `${type} ${stat.total}`)
    .join(", ");
}

function fmtSpell(spell: Spell): string {
  const bits = [`cast ${(spell.attackCost.base / 10).toFixed(1)}s`];
  if (spell.isAoe) bits.push("AoE");
  if (spell.spellType === "physical") {
    const s = spell as PhysicalSpell;
    bits.push(`dmg ${s.damage.base} + ${Math.round((s.attackScale ?? 1) * 100)}% of attack`, `crit +${Math.round(s.critChance.base * 100)}% x${s.critMultiplier.base}`);
    if (Object.keys(s.statusStats).length) bits.push(fmtStatuses(s.statusStats));
  } else if (spell.spellType === "magic") {
    const s = spell as MagicSpell;
    bits.push(
      `dmg ${s.damage.base} x mana cost`,
      `mana ${s.manaCost.base}`,
      `crit +${Math.round(s.critChance.base * 100)}% x${s.critMultiplier.base}`,
    );
    if (Object.keys(s.statusStats).length) bits.push(fmtStatuses(s.statusStats));
  } else {
    const s = spell as AuraSpell;
    const a = s.auraEffect;
    bits.push(`mana ${s.manaCost.base}`, `lasts ${a.baseTime}s`, s.isSelfTargeted ? "on self" : "on enemies");
    if (a.scaling) bits.push("stacks scale");
    if (a.isFragile) bits.push("fragile (lost when you lose health)");
    a.effects.forEach((e) => bits.push(fmtEffect(e)));
    [...(a.tickTriggers ?? []), ...(a.triggers ?? [])].forEach((t) => bits.push(fmtTrigger(t)));
  }
  return bits.join("; ");
}

function fmtItem(item: Item): string {
  const effects = [...item.mainEffects, ...item.secondaryEffects].map(fmtEffect).join(", ");
  const triggers = item.triggers?.length ? ` | ${item.triggers.map(fmtTrigger).join(", ")}` : "";
  return `${item.id} [${item.slot}] ${item.rarity} ${item.name} L${item.level}: ${effects}${triggers}`;
}

function talentPointsSpent(): number {
  return getState().talents.reduce((sum, t) => sum + t.level * t.cost, 0);
}

const tierRequirement = (tier: number) => 5 * (tier - 1);

function sorted(rec: Record<string, number>): [string, number][] {
  return Object.entries(rec).sort((a, b) => b[1] - a[1]);
}

function printStats(stats: RunStats, seconds: number) {
  const minutes = Math.max(seconds / 60, 1 / 60);
  out(`  kills ${stats.kills} (${(stats.kills / minutes).toFixed(1)}/min), deaths ${stats.deaths}, xp ${stats.xp}, items dropped ${stats.itemsDropped}`);
  if (stats.healthSamples > 0) {
    out(`  health: average ${Math.round(stats.healthPctSum / stats.healthSamples)}%, lowest ${Math.round(stats.minHealthPct)}%`);
  }
  const dealt = sorted(stats.damageDealt);
  const totalDealt = dealt.reduce((sum, [, n]) => sum + n, 0);
  const totalDot = Object.values(stats.dotStacks).reduce((sum, n) => sum + n, 0);
  out(`  direct damage dealt: ${totalDealt} (${stats.crits} crits)`);
  dealt.forEach(([name, n]) => {
    out(`    ${name}: ${n} over ${stats.casts[name]} hits (${Math.round((n / Math.max(totalDealt, 1)) * 100)}%)`);
  });
  if (totalDot > 0) {
    out(`  status damage dealt to enemies: ${totalDot}`);
    sorted(stats.dotStacks).forEach(([name, n]) => out(`    ${name}: ${n}`));
  }
  if (stats.healthSamples > 0) {
    const pctOfTime = (n: number) => `${Math.round((n / stats.healthSamples) * 100)}% of the time`;
    out(`  mana: average ${Math.round(stats.manaPctSum / stats.healthSamples)}%, too low to cast anything ${pctOfTime(stats.secondsOutOfMana)}`);
    const auras = sorted(stats.auraSeconds);
    if (auras.length) {
      out(`  auras on you: ${auras.map(([name, n]) => `${name} ${pctOfTime(n)} (max ${stats.auraMaxStacks[name]} stacks)`).join(", ")}`);
    }
    const enemyAuras = sorted(stats.enemyAuraSeconds);
    if (enemyAuras.length) {
      out(`  auras on enemies: ${enemyAuras.map(([name, n]) => `${name} ${pctOfTime(n)}`).join(", ")}`);
    }
  }
  if (stats.deaths > 0) {
    out(`  died at: ${sorted(stats.deathsAt).map(([where, n]) => `${where} x${n}`).join(", ")}`);
  }
  const causes = sorted(stats.deathCauses ?? {});
  if (causes.length) {
    out(`  killing blows: ${causes.map(([cause, n]) => `${cause} x${n}`).join(", ")}`);
  }
  const hardest = sorted(stats.hardestHits ?? {}).slice(0, 5);
  if (hardest.length) {
    out(`  hardest single hits taken: ${hardest.map(([hit, n]) => `${hit} ${n}`).join(", ")}`);
  }
  const taken = sorted(stats.damageTaken);
  if (taken.length) {
    out(`  damage taken from attacks (before your shield): ${taken.map(([name, n]) => `${name} ${n}`).join(", ")}`);
  }
  const statusTaken = sorted(stats.statusTaken ?? {});
  if (statusTaken.length) {
    out(`  status damage taken (ignores defense): ${statusTaken.map(([name, n]) => `${name} ${n}`).join(", ")}`);
  }
}

function printStatus(run: RunFile) {
  if (run.startNote) out(`NOT A FRESH START: ${run.startNote}`);
  const state = getState();
  const c = character();
  const p = state.progress;
  out(`run "${run.name}" (seed ${run.seed}), game time ${formatTime(gameSeconds(run))}`);
  out(`progress: world ${p.world} wave ${p.wave} enemy ${p.enemy}/10 | highest: world ${p.highest.world} wave ${p.highest.wave}`);
  out(`level ${c.level}, xp ${c.experience}/${c.experienceNeeded}, talent points ${state.talentPoints}, spell points ${state.spellPoints}`);
  out(
    `stats: health ${c.maxHealth.total}, attack ${c.attack.total}, defense ${c.defense.total}, speed ${c.speed.total}, ` +
      `crit ${Math.round(c.critChance.total * 100)}% x${c.critMultiplier.total.toFixed(2)}, shield ${c.maxShield.total} (+${c.shieldRegen.total}/s), ` +
      `health regen ${c.healthRegen.total}/s, leech ${c.healthLeech.total}, mana ${c.maxMana.total} (+${c.manaRegen.total}/s), mana cost ${c.manaCost.total}`,
  );
  const statusStats = Object.entries(c.statusStats).filter(([, s]) => s.total !== 0);
  if (statusStats.length) out(`status bonus on every attack: ${statusStats.map(([k, s]) => `${k} ${s.total}`).join(", ")}`);
  out(`spell slots ${c.spells.length}/${c.spellCount}: ${c.spells.map((s) => s.id).join(", ") || "none"}`);
  const talents = state.talents.filter((t) => t.level > 0);
  out(`talents (${talentPointsSpent()} points spent): ${talents.map((t) => `${t.id} ${t.level}/${t.maxLevel}`).join(", ") || "none"}`);
  out("equipped:");
  Object.entries(c.equippedSlots).forEach(([slot, item]) => {
    out(`  ${slot}: ${item ? fmtItem(item) : "-"}`);
  });
  out(`inventory (${c.items.length}):`);
  c.items.forEach((item) => out(`  ${fmtItem(item)}`));
  out(`enemies now: ${state.enemies.map((e) => `${e.name} L${e.level} ${e.health.current}/${e.maxHealth.total}hp`).join(", ")}`);
}

function printCatalog(kind: string | undefined) {
  const state = getState();
  const c = character();
  if (!kind || kind === "spells") {
    out("SPELLS (id | type | unlock cost | state)");
    state.spells.forEach((spell) => {
      const equipped = c.spells.some((s) => s.id === spell.id);
      const status = equipped ? "EQUIPPED" : spell.unlocked ? "unlocked" : "locked";
      out(`${spell.id} | ${spell.spellType} | ${spell.unlockCost} | ${status}`);
      out(`    ${spell.name}: ${spell.description}`);
      out(`    ${fmtSpell(spell)}`);
    });
  }
  if (!kind || kind === "talents") {
    const spent = talentPointsSpent();
    out(`TALENTS (id | tier | cost | level). ${spent} points spent. Tier N needs ${tierRequirement(2)} points spent per tier above 1.`);
    state.talents.forEach((t: Talent) => {
      const tierLocked = spent < tierRequirement(t.tier) ? ` | TIER LOCKED (needs ${tierRequirement(t.tier)} spent)` : "";
      const levelLocked = c.level < (t.requiredLevel ?? 0) ? ` | LEVEL LOCKED (needs level ${t.requiredLevel})` : "";
      out(`${t.id} | tier ${t.tier} | cost ${t.cost} | ${t.level}/${t.maxLevel}${tierLocked}${levelLocked}`);
      const slots = t.spellSlots ? [`+${t.spellSlots} spell slot`] : [];
      const detail = [...slots, ...t.effects.map(fmtEffect), ...(t.triggers ?? []).map(fmtTrigger)].join("; ");
      out(`    ${t.name}${t.description ? `: ${t.description}` : ""}`);
      if (detail) out(`    per level: ${detail}`);
    });
  }
}

// ---------- commands ----------

function cmdRun(run: RunFile, args: string[]) {
  const seconds = Number(flag(args, "seconds") ?? 600);
  const stopOnLevel = !args.includes("--no-stop");
  const segment = emptyStats();
  const startTicks = run.ticks;
  const startLevel = character().level;
  const startProgress = { ...getState().progress };
  const timelineStart = run.timeline.length;
  let stopped = "time limit";

  for (let i = 0; i < seconds * 10; i++) {
    tick(run, segment);
    if (stopOnLevel && character().level > startLevel) {
      stopped = "level up";
      break;
    }
  }

  const elapsed = Math.floor((run.ticks - startTicks) / 10);
  const p = getState().progress;
  out(`advanced ${formatTime(elapsed)} (stopped: ${stopped}). game time now ${formatTime(gameSeconds(run))}`);
  out(`  progress: world ${startProgress.world} wave ${startProgress.wave} enemy ${startProgress.enemy} -> world ${p.world} wave ${p.wave} enemy ${p.enemy} | highest wave ${p.highest.wave} (world ${p.highest.world})`);
  const c = character();
  out(`  level ${startLevel} -> ${c.level}, xp ${c.experience}/${c.experienceNeeded}, talent points ${getState().talentPoints}, spell points ${getState().spellPoints}, spell slots ${c.spells.length}/${c.spellCount}`);
  printStats(segment, elapsed);
  run.timeline.slice(timelineStart).forEach((e) => out(`  [${formatTime(e.t)}] ${e.event}`));
}

function cmdAct(run: RunFile, rawArgs: string[]) {
  // accept `act <run> "talent warrior-training"` as well as separate words
  const args = rawArgs.flatMap((arg) => arg.trim().split(/\s+/)).filter(Boolean);
  const [action, a, b] = args;
  const state = getState();
  const c = character();
  const before = JSON.stringify([state.talentPoints, state.spellPoints, c.spells.map((s) => s.id), c.equippedSlots, c.items.length]);

  if (action === "talent") {
    const talent = state.talents.find((t) => t.id === a) ?? fail(`unknown talent "${a}"`);
    if (talentPointsSpent() < tierRequirement(talent.tier)) fail(`tier ${talent.tier} needs ${tierRequirement(talent.tier)} talent points spent`);
    if (c.level < (talent.requiredLevel ?? 0)) fail(`${a} needs level ${talent.requiredLevel}, you are level ${c.level}`);
    if (talent.level >= talent.maxLevel) fail(`${a} is already at max level`);
    if (state.talentPoints < talent.cost) fail(`${a} costs ${talent.cost}, you have ${state.talentPoints} talent points`);
    unlockTalent(a);
  } else if (action === "unlock-spell") {
    const spell = state.spells.find((s) => s.id === a) ?? fail(`unknown spell "${a}"`);
    if (spell.unlocked) fail(`${a} is already unlocked`);
    if (state.spellPoints < spell.unlockCost) fail(`${a} costs ${spell.unlockCost}, you have ${state.spellPoints} spell points`);
    spellActions.unlockSpell(a);
  } else if (action === "equip-spell") {
    const spell = state.spells.find((s) => s.id === a) ?? fail(`unknown spell "${a}"`);
    if (!spell.unlocked) fail(`${a} is not unlocked`);
    if (c.spells.some((s) => s.id === a)) fail(`${a} is already equipped`);
    if (c.spells.length >= c.spellCount) fail(`all ${c.spellCount} spell slots are full. unequip-spell first`);
    spellActions.equipSpell(a);
  } else if (action === "unequip-spell") {
    if (!c.spells.some((s) => s.id === a)) fail(`${a} is not equipped`);
    spellActions.unequipSpell(a);
  } else if (action === "equip-item") {
    const item = c.items.find((i) => i.id === a) ?? fail(`no item "${a}" in inventory`);
    const allowed = SLOTS[item.slot];
    const slot = (b as EquipSlot) ?? allowed.find((s) => !c.equippedSlots[s]) ?? allowed[0];
    if (!allowed.includes(slot)) fail(`${item.name} goes in: ${allowed.join(" or ")}`);
    equipItem(a, slot);
  } else if (action === "unequip-item") {
    if (!c.equippedSlots[a as EquipSlot]) fail(`nothing equipped in "${a}"`);
    unequipItem(a as EquipSlot);
  } else if (action === "discard-item") {
    if (!c.items.some((i) => i.id === a)) fail(`no item "${a}" in inventory`);
    removeItem(a);
  } else {
    fail("actions: talent <id> | unlock-spell <id> | equip-spell <id> | unequip-spell <id> | equip-item <itemId> [slot] | unequip-item <slot> | discard-item <itemId>");
  }

  flush();
  const after = getState();
  const ca = character();
  const changed = before !== JSON.stringify([after.talentPoints, after.spellPoints, ca.spells.map((s) => s.id), ca.equippedSlots, ca.items.length]);
  if (!changed && action !== "talent") fail("the action had no effect");
  run.actions.push({ t: gameSeconds(run), event: args.join(" ") });
  out(`ok: ${args.join(" ")}`);
  out(`talent points ${after.talentPoints}, spell points ${after.spellPoints}, spell slots ${ca.spells.length}/${ca.spellCount}: ${ca.spells.map((s) => s.id).join(", ")}`);
}

function cmdSummary(run: RunFile) {
  printStatus(run);
  out();
  out(`whole run (${formatTime(gameSeconds(run))}):`);
  printStats(run.stats, gameSeconds(run));
  out();
  out("timeline:");
  run.timeline.forEach((e) => out(`  [${formatTime(e.t)}] ${e.event}`));
  out();
  out("decisions:");
  run.actions.forEach((e) => out(`  [${formatTime(e.t)}] ${e.event}`));
}

// ---------- QA commands: set up a test, never part of a fair playthrough ----------

function markQa(run: RunFile, what: string) {
  const note = `QA setup: ${what}`;
  run.startNote = run.startNote ? `${run.startNote}; ${note}` : note;
  run.actions.push({ t: gameSeconds(run), event: `qa ${what}` });
}

function cmdQa(run: RunFile, args: string[]) {
  const [what, a, b] = args;
  if (what === "items") {
    out("ITEM TEMPLATES (id | slot | effects | triggers)");
    [...ITEM_TEMPLATES, ...UNIQUE_ITEMS].forEach((t) => {
      const unique = UNIQUE_ITEMS.includes(t) ? " | UNIQUE" : "";
      const triggers = t.triggers?.length ? ` | ${t.triggers.map(fmtTrigger).join(", ")}` : "";
      out(`${t.id} | ${t.slot}${unique} | ${t.itemEffects.map(fmtEffect).join(", ")}${triggers}`);
    });
  } else if (what === "enemies") {
    out("ENEMIES (id | first wave | base health, attack, defense | extras | spells). Stats are multiplied by the wave scale.");
    const line = (e: (typeof DEFAULT_ENEMIES)[number], wave: string) => {
      const extras = [
        e.baseShield ? `shield ${e.baseShield}` : "",
        e.baseShieldRegen ? `shield regen ${e.baseShieldRegen}` : "",
        e.baseHealthRegen ? `health regen ${e.baseHealthRegen}` : "",
        e.baseManaCost ? `mana cost ${e.baseManaCost}` : "",
      ].filter(Boolean);
      out(`${e.id} | ${wave} | ${e.baseHealth}, ${e.baseAttack}, ${e.baseDefense} | ${extras.join(", ") || "-"} | ${e.spells.map((sp) => sp.id).join(", ")}`);
    };
    DEFAULT_ENEMIES.forEach((e) => line(e, `wave ${e.minWave}`));
    BOSSES.forEach((e) => line(e, `BOSS wave ${e.wave}`));
  } else if (what === "grant-item") {
    const level = getState().progress.wave;
    if (!a || !grantItem(a, level, b as Item["rarity"])) fail(`unknown item template "${a}". List them with: qa <run> items`);
    flush();
    markQa(run, `granted ${a}${b ? ` (${b})` : ""}`);
    const item = character().items[character().items.length - 1];
    out(`granted: ${fmtItem(item)}`);
  } else if (what === "points") {
    const talent = Number(a);
    const spell = Number(b ?? 0);
    if (!Number.isInteger(talent) || !Number.isInteger(spell)) fail("qa points <talent points> [spell points]");
    store.setState((state) => {
      state.talentPoints += talent;
      state.spellPoints += spell;
    });
    markQa(run, `added ${talent} talent and ${spell} spell points`);
    out(`talent points ${getState().talentPoints}, spell points ${getState().spellPoints}`);
  } else if (what === "wave") {
    const world = Number(a);
    const wave = Number(b);
    const enemy = Number(args[3] ?? 1);
    if (![world, wave, enemy].every(Number.isInteger) || world < 1 || wave < 1 || wave > 10 || enemy < 1 || enemy > 10) fail("qa wave <world> <wave 1-10> [enemy 1-10]. Enemy 10 is the boss");
    store.setState((state) => {
      state.progress.world = world;
      state.progress.wave = wave;
      state.progress.enemy = enemy;
      state.enemies = [];
    });
    spawnNewEnemies();
    flush();
    markQa(run, `moved to world ${world} wave ${wave} enemy ${enemy}`);
    out(`enemies now: ${getState().enemies.map((e) => `${e.name} ${e.health.current}/${e.maxHealth.total}hp, attack ${e.attack.total}, defense ${e.defense.total}, shield ${e.shield.current}`).join("; ")}`);
  } else {
    fail("qa: items | enemies | grant-item <templateId> [rarity] | points <talent> [spell] | wave <world> <wave> [enemy]");
  }
}

const USAGE = `usage: npm run playtest -- <command>
  new <name> [--seed N]          start a fresh run
  new <name> --level L [--world W] --wave N [--drops K]
                                 start further along: a level L character at that wave with K drops
                                 (default 20) from the waves before it, all points unspent
  new <name> --from <run>        start from a copy of another run's character and progress
  status <name>                  character, build, inventory, progress
  catalog <name> [spells|talents] everything that can be unlocked, with costs
  run <name> [--seconds N] [--no-stop]
                                 advance game time (default 600s). Stops early on level up unless --no-stop
  act <name> <action> ...        talent <id> | unlock-spell <id> | equip-spell <id> | unequip-spell <id>
                                 | equip-item <itemId> [slot] | unequip-item <slot> | discard-item <itemId>
  summary <name>                 status plus whole-run stats, timeline and every decision made
  qa <name> items | enemies      list every item template, or every enemy and boss
  qa <name> grant-item <templateId> [rarity]
  qa <name> points <talent> [spell]
  qa <name> wave <world> <wave> [enemy]
                                 QA only: set up a test. The run is marked as not a fair playthrough`;

const [command, name, ...rest] = process.argv.slice(2);
if (!command || !name) {
  out(USAGE);
  process.exit(command ? 1 : 0);
}

if (command === "new") {
  if (existsSync(runPath(name))) fail(`run "${name}" already exists`);
  const seed = Number(flag(rest, "seed") ?? Math.floor(Math.random() * 1e9));
  const from = flag(rest, "from");
  const num = (key: string) => (flag(rest, key) === undefined ? undefined : Number(flag(rest, key)));
  const level = num("level");
  const wave = num("wave");
  const world = num("world");
  let run: RunFile;
  if (from) {
    if (level !== undefined || wave !== undefined || world !== undefined) fail("--from cannot be combined with --level, --wave or --world");
    run = forkRun(readRun(from), name, flag(rest, "seed") === undefined ? readRun(from).rng : seed);
    loadRun(run);
  } else {
    run = newRun(name, seed);
    if (level !== undefined || wave !== undefined || world !== undefined) {
      const start = { level: level ?? 1, world: world ?? 1, wave: wave ?? 1, drops: num("drops") ?? 20 };
      if (![start.level, start.world, start.wave, start.drops].every(Number.isInteger)) fail("--level, --world, --wave and --drops take whole numbers");
      if (start.level < 1 || start.world < 1 || start.wave < 1 || start.wave > 10 || start.drops < 0) fail("need level >= 1, world >= 1, wave 1 to 10, drops >= 0");
      advanceStart(run, start);
    }
  }
  writeRun(run);
  printStatus(run);
} else {
  const run = readRun(name);
  loadRun(run);
  if (command === "status") printStatus(run);
  else if (command === "catalog") printCatalog(rest[0]);
  else if (command === "run") cmdRun(run, rest);
  else if (command === "act") cmdAct(run, rest);
  else if (command === "summary") cmdSummary(run);
  else if (command === "qa") cmdQa(run, rest);
  else fail(`unknown command "${command}"\n${USAGE}`);
  writeRun(run);
}
