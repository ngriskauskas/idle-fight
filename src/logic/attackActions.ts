import { applyStatusEffects } from "../hooks/useCheckStatuses";
import { useGameStore } from "../store/gameStore";
import {
  Attack,
  Combatant,
  CombatStat,
  MagicSpell,
  PhysicalSpell,
  Spell,
  StatusEffectType,
} from "../types";
import { getCombatant } from "../utils/getCombatant";
import { logDamage } from "./logActions";
import { callTriggers } from "./triggerActions";
import { getScaleMulti } from "./progressionActions";

const STATUS_TYPES: StatusEffectType[] = ["poison", "bleed", "fire", "ice", "lightning"];

// Per point of a spell's status: the share of the caster's attack (physical) or of the
// spell's mana cost (magic) added as stacks. Rend (bleed 8) adds 32% of attack per hit.
const PHYSICAL_STATUS_SHARE = 0.04;
const MAGIC_STATUS_SHARE = 0.05;

// Enemy statuses ignore defense, so they apply at reduced strength.
const ENEMY_STATUS_SCALE = 0.15;

function calcIsCrit(spell: MagicSpell | PhysicalSpell, caster: Combatant): boolean {
  const totalCritChance = caster.critChance.total + spell.critChance.total;
  return Math.random() < totalCritChance;
}

function calcCritDamage(
  spell: MagicSpell | PhysicalSpell,
  caster: Combatant,
  isCrit: boolean,
  rawDamage: number,
): number {
  return isCrit
    ? Math.floor(rawDamage * (caster.critMultiplier.total + spell.critMultiplier.total - 1))
    : rawDamage;
}

// Statuses an attack applies: the spell's own plus the caster's status stats, which ride
// on every attack. A player's spell status grows with how hard they hit. An enemy's grows
// with its wave, like the rest of its stats.
function calcAttackStatuses(
  spell: MagicSpell | PhysicalSpell,
  caster: Combatant,
  power: number,
  powerShare: number,
): Partial<Record<StatusEffectType, number>> {
  const statuses: Partial<Record<StatusEffectType, number>> = {};
  const spellStats = spell.statusStats as Partial<Record<StatusEffectType, CombatStat>>;
  STATUS_TYPES.forEach((type) => {
    const base = spellStats[type]?.total ?? 0;
    let stacks = 0;
    if (type === "ice") {
      stacks = base;
    } else if (caster.isEnemy) {
      // bleed lasts twice as long as the other statuses, so an enemy applies half as much
      stacks = base * getScaleMulti() * ENEMY_STATUS_SCALE * (type === "bleed" ? 0.5 : 1);
    } else {
      // the player's statuses follow their own power (attack or mana cost), never the wave
      stacks = base * (1 + power * powerShare);
    }
    stacks += caster.statusStats[type].total;
    if (stacks > 0) statuses[type] = Math.ceil(stacks);
  });
  return statuses;
}

function createPhysicalAttack(spell: PhysicalSpell, caster: Combatant): Attack {
  const isCrit = calcIsCrit(spell, caster);
  const rawDamage = Math.round(
    spell.damage.total + caster.attack.total * (spell.attackScale ?? 1),
  );
  const damage = calcCritDamage(spell, caster, isCrit, rawDamage);

  return {
    isAoe: spell.isAoe,
    damage,
    isCrit,
    statusStats: calcAttackStatuses(spell, caster, caster.attack.total, PHYSICAL_STATUS_SHARE),
  };
}

function createMagicAttack(spell: MagicSpell, caster: Combatant): Attack {
  const isCrit = calcIsCrit(spell, caster);
  // read the cost from the caster so spells cast by triggers follow mana cost gear too
  const manaCost = spell.manaCost.base + caster.manaCost.total;
  const rawDamage = spell.damage.total * manaCost;
  const damage = calcCritDamage(spell, caster, isCrit, rawDamage);

  return {
    isAoe: spell.isAoe,
    damage,
    isCrit,
    statusStats: calcAttackStatuses(spell, caster, manaCost, MAGIC_STATUS_SHARE),
  };
}

function getTargets(attack: Attack, caster: Combatant): Combatant[] {
  const state = useGameStore.getState();
  const alive = (caster.isEnemy ? state.friends : state.enemies).filter((c) => !c.isDead);
  return attack.isAoe ? alive : alive.slice(0, 1);
}

// Defense equal to the hit halves it. Small hits are never fully blocked and big hits
// are never ignored, so defense stays useful without making damage all-or-nothing.
function mitigateDamage(damage: number, defense: number): number {
  if (damage <= 0) return 0;
  if (defense <= 0) return damage;
  return Math.ceil((damage * damage) / (damage + defense));
}

function takeAttack(caster: Combatant, target: Combatant, attack: Attack, spell: Spell): number {
  let totalDamage = 0;
  useGameStore.setState((state) => {
    const targetState = getCombatant(target.id, state)!;
    const damageTaken = mitigateDamage(attack.damage, targetState.defense.current);
    const shieldDamage = Math.min(targetState.shield.current, damageTaken);
    const healthDamage = damageTaken - shieldDamage;
    targetState.shield.current = Math.max(0, targetState.shield.current - shieldDamage);
    targetState.health.current = Math.max(0, targetState.health.current - healthDamage);
    totalDamage = damageTaken;
  });

  applyStatusEffects(attack.statusStats, target.id);
  logDamage(caster, [target], spell, totalDamage, attack);
  callTriggers("onTakeAttack", target.id);
  callTriggers("onHit", caster.id);
  if (attack.isCrit) {
    callTriggers("onCrit", caster.id);
  }

  return totalDamage;
}

function applyLeech(caster: Combatant, damageDealt: number): void {
  const healthLeechAmount = Math.min(caster.healthLeech.total, damageDealt);
  const manaLeechAmount = Math.min(caster.manaLeech.total, damageDealt);
  useGameStore.setState((state) => {
    const combatantState = getCombatant(caster.id, state)!;

    combatantState.health.current = Math.min(
      combatantState.maxHealth.total,
      combatantState.health.current + healthLeechAmount,
    );
    combatantState.mana.current = Math.min(
      combatantState.maxMana.total,
      combatantState.mana.current + manaLeechAmount,
    );
  });
}

export function launchPhysicalAttack(spell: PhysicalSpell, casterId: string) {
  const combatant = getCombatant(casterId, useGameStore.getState())!;
  const attack = createPhysicalAttack(spell, combatant);
  const targets = getTargets(attack, combatant);
  targets.forEach((target) => {
    const damageDealt = takeAttack(combatant, target, attack, spell);
    applyLeech(combatant, damageDealt);
  });
}

export function launchMagicAttack(spell: MagicSpell, casterId: string) {
  const combatant = getCombatant(casterId, useGameStore.getState())!;
  const attack = createMagicAttack(spell, combatant);
  const targets = getTargets(attack, combatant);
  targets.forEach((target) => {
    const damageDealt = takeAttack(combatant, target, attack, spell);
    applyLeech(combatant, damageDealt);
  });
}
