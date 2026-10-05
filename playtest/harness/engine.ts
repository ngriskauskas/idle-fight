import { useGameStore } from "../../src/store/gameStore";
import { useCombatEngine } from "../../src/hooks/useCombatEngine";
import { fastTick, slowTick } from "../../src/hooks/useGameLoop";
import { levelUpCharacter, tickRespawn } from "../../src/logic/characterActions";
import { dropItem } from "../../src/logic/itemActions";
import { spawnNewEnemies } from "../../src/logic/enemyActions";
import type { AuraSpell, Character, Enemy, MagicSpell } from "../../src/types";
import { settle } from "./reactShim";

export interface RunStats {
  kills: number;
  deaths: number;
  xp: number;
  itemsDropped: number;
  damageDealt: Record<string, number>;
  casts: Record<string, number>;
  crits: number;
  damageTaken: Record<string, number>;
  // stacks ticking on enemies each second, by status. Roughly the damage over time dealt.
  dotStacks: Record<string, number>;
  // status damage the character took each second, by status
  statusTaken: Record<string, number>;
  // what dealt the killing blow on each death
  deathCauses: Record<string, number>;
  // the largest single hit taken from each enemy spell
  hardestHits: Record<string, number>;
  deathsAt: Record<string, number>;
  // seconds each aura was active, on you and on enemies, and the most stacks seen
  auraSeconds: Record<string, number>;
  enemyAuraSeconds: Record<string, number>;
  auraMaxStacks: Record<string, number>;
  manaPctSum: number;
  secondsOutOfMana: number;
  healthPctSum: number;
  healthSamples: number;
  minHealthPct: number;
}

export interface TimelineEvent {
  t: number;
  event: string;
}

export interface RunFile {
  name: string;
  seed: number;
  rng: number;
  ticks: number;
  best: number;
  state: unknown;
  stats: RunStats;
  timeline: TimelineEvent[];
  actions: TimelineEvent[];
  // set when the run did not start from a fresh character: how it was set up
  startNote?: string;
}

export function emptyStats(): RunStats {
  return {
    kills: 0,
    deaths: 0,
    xp: 0,
    itemsDropped: 0,
    damageDealt: {},
    casts: {},
    crits: 0,
    damageTaken: {},
    dotStacks: {},
    statusTaken: {},
    deathCauses: {},
    hardestHits: {},
    deathsAt: {},
    auraSeconds: {},
    enemyAuraSeconds: {},
    auraMaxStacks: {},
    manaPctSum: 0,
    secondsOutOfMana: 0,
    healthPctSum: 0,
    healthSamples: 0,
    minHealthPct: 100,
  };
}

export const store = useGameStore;
export const getState = () => store.getState();
export const character = () => getState().friends.find((f) => f.id === "main") as Character;
export const flush = () => settle(useCombatEngine, getState);

// mulberry32, so a seed replays the same drops and crits
function seedRandom(run: RunFile) {
  Math.random = () => {
    run.rng = (run.rng + 0x6d2b79f5) | 0;
    let t = run.rng;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function newRun(name: string, seed: number): RunFile {
  const run: RunFile = {
    name,
    seed,
    rng: seed,
    ticks: 0,
    best: 0,
    state: null,
    stats: emptyStats(),
    timeline: [],
    actions: [],
  };
  seedRandom(run);
  store.setState(JSON.parse(JSON.stringify(store.getInitialState())), true);
  spawnNewEnemies();
  flush();
  run.state = getState();
  return run;
}

export interface AdvancedStart {
  level: number;
  world: number;
  wave: number;
  drops: number;
}

// Set a fresh run up as a character who has already reached a later wave: the levels
// (with their unspent talent and spell points) and a stash of drops rolled on the waves
// leading up to it. Everything goes through the game's own level-up and drop code, so the
// start always matches the current balance. Nothing is equipped or spent: the player
// builds the character before the first `run`.
export function advanceStart(run: RunFile, start: AdvancedStart) {
  for (let level = character().level; level < start.level; level++) levelUpCharacter();

  const target = (start.world - 1) * 10 + start.wave;
  const setWave = (totalWave: number) => {
    store.setState((state) => {
      state.progress.world = Math.floor((totalWave - 1) / 10) + 1;
      state.progress.wave = ((totalWave - 1) % 10) + 1;
      state.progress.enemy = 1;
    });
  };
  // drops come from the ten waves up to the target, weighted toward the recent ones
  for (let i = 0; i < start.drops; i++) {
    const back = Math.floor(Math.random() * Math.random() * Math.min(10, target));
    setWave(target - back);
    dropItem(getState().progress.wave);
  }
  setWave(target);
  store.setState((state) => {
    state.progress.highest = { world: start.world, wave: start.wave, enemy: 1 };
    state.enemies = [];
    state.logs = [];
  });
  spawnNewEnemies();
  flush();
  run.best = start.world * 10000 + start.wave * 100 + 1;
  run.startNote = `started at level ${start.level}, world ${start.world} wave ${start.wave}, with ${start.drops} drops from the waves before it and all points unspent`;
  run.state = getState();
}

// Copy another run's character and progress into a new run, with fresh stats.
export function forkRun(source: RunFile, name: string, seed: number): RunFile {
  return {
    ...source,
    name,
    seed,
    rng: seed,
    stats: emptyStats(),
    timeline: [],
    actions: [],
    startNote: `forked from run "${source.name}" at ${formatTime(gameSeconds(source))} of its game time${source.startNote ? ` (${source.startNote})` : ""}`,
  };
}

export function loadRun(run: RunFile) {
  seedRandom(run);
  store.setState(JSON.parse(JSON.stringify(run.state)), true);
  flush();
}

export const gameSeconds = (run: RunFile) => Math.floor(run.ticks / 10);

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0 ? `${h}h${String(m).padStart(2, "0")}m` : `${m}m${String(s).padStart(2, "0")}s`;
}

const add = (rec: Record<string, number>, key: string, n: number) => {
  rec[key] = (rec[key] ?? 0) + n;
};

const logNumber = (id: string) => Number(id.slice(id.lastIndexOf("_") + 1));

function collectLogs(run: RunFile, segment: RunStats, seen: number, location: string) {
  const state = getState();
  const both = [segment, run.stats];
  for (const log of state.logs) {
    if (logNumber(log.id) < seen) continue;
    if (log.type === "damage") {
      for (const stats of both) {
        if (log.source.isEnemy) {
          add(stats.damageTaken, log.source.name, log.damage);
          const hit = `${log.source.name} ${log.spell.name}`;
          stats.hardestHits ??= {};
          stats.hardestHits[hit] = Math.max(stats.hardestHits[hit] ?? 0, log.damage);
        } else {
          add(stats.damageDealt, log.spell.name, log.damage);
          add(stats.casts, log.spell.name, 1);
          if (log.attack.isCrit) stats.crits += 1;
        }
      }
    } else if (log.type === "kill") {
      if (log.target.isEnemy) {
        for (const stats of both) {
          stats.kills += 1;
          stats.xp += log.xpGained;
        }
        if ((log.target as Enemy).isBoss) {
          run.timeline.push({ t: gameSeconds(run), event: `killed boss ${log.target.name}` });
        }
      } else if (log.target.isMainCharacter) {
        // an attack logged in the same tick dealt the blow; otherwise a status tick did
        const blow = [...state.logs]
          .reverse()
          .find((l) => l.type === "damage" && logNumber(l.id) >= seen && l.source.isEnemy);
        const statuses = character()
          .statusEffects.filter((se) => se.type !== "ice")
          .map((se) => se.type);
        const cause =
          blow && blow.type === "damage"
            ? `${blow.source.name} ${blow.spell.name} for ${blow.damage}`
            : `status damage (${statuses.join(", ") || "unknown"})`;
        for (const stats of both) {
          stats.deaths += 1;
          stats.minHealthPct = 0;
          add(stats.deathsAt, location, 1);
          stats.deathCauses ??= {};
          add(stats.deathCauses, cause, 1);
        }
      }
    } else if (log.type === "itemDrop") {
      for (const stats of both) stats.itemsDropped += 1;
      if (["epic", "legendary", "unique"].includes(log.item.rarity)) {
        run.timeline.push({
          t: gameSeconds(run),
          event: `dropped ${log.item.rarity} ${log.item.name}`,
        });
      }
    }
  }
}

function trackProgress(run: RunFile) {
  const p = getState().progress;
  const score = p.world * 10000 + p.wave * 100 + p.enemy;
  if (score <= run.best) return;
  const prevWave = Math.floor(run.best / 100);
  run.best = score;
  if (Math.floor(score / 100) > prevWave) {
    run.timeline.push({ t: gameSeconds(run), event: `first reached world ${p.world} wave ${p.wave}` });
  }
}

// Advance one 100ms game tick. Mirrors useGameLoop.
export function tick(run: RunFile, segment: RunStats) {
  run.ticks += 1;
  const seen = getState().logIdCounter;
  // dying resets progress, so note where we were before the tick
  const p = getState().progress;
  const location = `world ${p.world} wave ${p.wave} enemy ${p.enemy}`;
  const alive = character().currentRespawnTime === 0;
  const second = run.ticks % 10 === 0;

  if (alive) fastTick();
  if (second) {
    if (alive) {
      getState().enemies.forEach((enemy) => {
        if (enemy.isDead) return;
        enemy.statusEffects.forEach((status) => {
          if (status.stacks > 0 && status.type !== "ice") {
            add(segment.dotStacks, status.type, status.stacks);
            add(run.stats.dotStacks, status.type, status.stacks);
          }
        });
      });
      character().statusEffects.forEach((status) => {
        if (status.stacks > 0 && status.type !== "ice") {
          for (const stats of [segment, run.stats]) {
            stats.statusTaken ??= {};
            add(stats.statusTaken, status.type, status.stacks);
          }
        }
      });
      slowTick();
    }
    tickRespawn();
  }
  flush();

  collectLogs(run, segment, seen, location);
  trackProgress(run);

  if (second && alive) {
    const c = character();
    const pct = Math.max(0, (c.health.current / c.maxHealth.total) * 100);
    const manaCosts = c.spells
      .filter((s) => s.spellType !== "physical")
      .map((s) => (s as MagicSpell | AuraSpell).manaCost.total);
    const outOfMana = manaCosts.length > 0 && c.mana.current < Math.min(...manaCosts);
    const enemyAuras = new Set(
      getState()
        .enemies.filter((e) => !e.isDead)
        .flatMap((e) => e.auraEffects.map((a) => `${a.name} on ${e.name}`)),
    );
    for (const stats of [segment, run.stats]) {
      stats.healthPctSum += pct;
      stats.healthSamples += 1;
      stats.minHealthPct = Math.min(stats.minHealthPct, pct);
      stats.manaPctSum += c.maxMana.total > 0 ? (c.mana.current / c.maxMana.total) * 100 : 0;
      if (outOfMana) stats.secondsOutOfMana += 1;
      c.auraEffects.forEach((aura) => {
        add(stats.auraSeconds, aura.name, 1);
        stats.auraMaxStacks[aura.name] = Math.max(stats.auraMaxStacks[aura.name] ?? 0, aura.stacks);
      });
      enemyAuras.forEach((name) => add(stats.enemyAuraSeconds, name, 1));
    }
  }

  if (getState().animationQueue.length > 0) {
    store.setState((state) => {
      state.animationQueue = [];
    });
  }
}

export function saveState(run: RunFile) {
  run.state = getState();
}
