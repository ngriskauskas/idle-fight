import { applyStatusEffects } from "../hooks/useCheckStatuses";
import { useGameStore } from "../store/gameStore";
import { Attack, Combatant, MagicSpell, PhysicalSpell, Spell, StatusStats } from "../types";
import { getCombatant } from "../utils/getCombatant";
import { logDamage } from "./logActions";

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

function createPhysicalAttack(spell: PhysicalSpell, caster: Combatant): Attack {
  const isCrit = calcIsCrit(spell, caster);
  const rawDamage = spell.damage.total + caster.attack.total;
  const damage = calcCritDamage(spell, caster, isCrit, rawDamage);

  const statusStats: Partial<{
    poison: number;
    bleed: number;
  }> = {};
  for (const [type, stat] of Object.entries(spell.statusStats)) {
    statusStats[type as keyof typeof statusStats] =
      stat.total + caster.statusStats[type as keyof StatusStats].total;
  }

  return {
    isAoe: spell.isAoe,
    damage,
    isCrit,
    statusStats,
  };
}

function createMagicAttack(spell: MagicSpell, caster: Combatant): Attack {
  const isCrit = calcIsCrit(spell, caster);
  const rawDamage = spell.damage.total * spell.manaCost.total;
  const damage = calcCritDamage(spell, caster, isCrit, rawDamage);

  const statusStats: Partial<{
    fire: number;
    ice: number;
    lightning: number;
  }> = {};
  for (const [type, stat] of Object.entries(spell.statusStats)) {
    statusStats[type as keyof typeof statusStats] =
      stat.total + caster.statusStats[type as keyof StatusStats].total;
  }

  return {
    isAoe: spell.isAoe,
    damage,
    isCrit,
    statusStats,
  };
}

function getTargets(attack: Attack, caster: Combatant): Combatant[] {
  const state = useGameStore.getState();
  if (caster.isEnemy) {
    return attack.isAoe ? state.friends : [state.friends[0]];
  } else {
    return attack.isAoe ? state.enemies : [state.enemies[0]];
  }
}

function takeAttack(caster: Combatant, target: Combatant, attack: Attack, spell: Spell): number {
  let totalDamage = 0;
  useGameStore.setState((state) => {
    const targetState = getCombatant(target.id, state)!;
    const damageTaken = Math.max(attack.damage - targetState.defense.current, 0);
    const shieldDamage = Math.min(targetState.shield.current, damageTaken);
    const healthDamage = damageTaken - shieldDamage;
    targetState.shield.current = Math.max(0, targetState.shield.current - shieldDamage);
    targetState.health.current = Math.max(0, targetState.health.current - healthDamage);
    totalDamage = damageTaken;
  });

  applyStatusEffects(attack.statusStats, target.id);
  logDamage(caster, [target], spell, totalDamage, attack);
  //TODO call triggers on hit, on crit, etc

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
