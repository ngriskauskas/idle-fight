import type { Attack, Combatant, Spell } from "../types";
import { useGameStore } from "../store/gameStore";
import { applyStatusEffects } from "./statusActions";
import { applyAuraEffect, removeFragileAuras } from "./auraActions";
import { logDamage } from "./logActions";
import { callTriggers } from "./triggerActions";

function castAuraSpell(spell: Spell, caster: Combatant): void {
  const targets = caster.isMainCharacter
    ? spell.isSelfTargeted
      ? [useGameStore.getState().character]
      : useGameStore.getState().enemies.filter((e) => !e.isDead)
    : spell.isSelfTargeted
      ? [useGameStore.getState().enemies.find((e) => e.id === caster.id)!]
      : [useGameStore.getState().character];

  console.log(
    "Applying aura to targets:",
    spell.name,
    targets.map((t) => t.name),
  );

  targets.forEach((target) => {
    applyAuraEffect(target, spell.auraEffect!);
  });
}

export function castSpell(spell: Spell, caster: Combatant): void {
  if (spell.spellType === "aura") {
    castAuraSpell(spell, caster);
  } else {
    const attack = createAttack(caster, spell);

    if (caster.isMainCharacter) {
      attackEnemies(attack, caster, spell);
    } else {
      attackCharacter(attack, caster, spell);
    }
  }

  useGameStore.setState((state) => {
    if (caster.isMainCharacter) {
      state.character.mana.current = Math.max(
        0,
        state.character.mana.current -
          (spell.manaCost.total +
            (spell.spellType === "magic" ? state.character.manaCost.total : 0)),
      );
    } else {
      const enemy = state.enemies.find((e) => e.id === caster.id);
      if (enemy) {
        enemy.mana.current = Math.max(
          0,
          enemy.mana.current -
            (spell.manaCost.total +
              (spell.spellType === "magic" ? enemy.manaCost.total : 0)),
        );
      }
    }
  });
}

export function createAttack(caster: Combatant, spell: Spell): Attack {
  const totalCritChance = caster.critChance.total + spell.critChance.total;
  const isCrit = Math.random() < totalCritChance;

  let damage =
    spell.spellType === "magic"
      ? spell.damage.total * spell.manaCost.total
      : spell.damage.total + caster.attack.total;

  if (isCrit) {
    const totalCritMultiplier =
      caster.critMultiplier.total + spell.critMultiplier.total - 1;
    damage = Math.floor(damage * totalCritMultiplier);
  }

  let combinedStatusStats: Record<string, number> = {};

  if (spell.spellType === "physical") {
    const poison =
      (spell.statusStats.poison?.total || 0) +
      (caster.statusStats.poison?.total || 0);
    const bleed =
      (spell.statusStats.bleed?.total || 0) +
      (caster.statusStats.bleed?.total || 0);
    if (poison > 0) combinedStatusStats.poison = poison;
    if (bleed > 0) combinedStatusStats.bleed = bleed;
  } else if (spell.spellType === "magic") {
    const fire =
      (spell.statusStats.fire?.total || 0) +
      (caster.statusStats.fire?.total || 0);
    const ice =
      (spell.statusStats.ice?.total || 0) +
      (caster.statusStats.ice?.total || 0);
    const lightning =
      (spell.statusStats.lightning?.total || 0) +
      (caster.statusStats.lightning?.total || 0);
    if (fire > 0) combinedStatusStats.fire = fire;
    if (ice > 0) combinedStatusStats.ice = ice;
    if (lightning > 0) combinedStatusStats.lightning = lightning;
  }

  return {
    isAoe: spell.isAoe,
    damage,
    isCrit,
    statusStats: combinedStatusStats,
  };
}

export function takeCharacterDamage(damageTaken: number): void {
  useGameStore.setState((state) => {
    const shieldDamage = Math.min(state.character.shield.current, damageTaken);
    const healthDamage = damageTaken - shieldDamage;
    state.character.shield.current = Math.max(
      0,
      state.character.shield.current - shieldDamage,
    );
    state.character.health.current = Math.max(
      0,
      state.character.health.current - healthDamage,
    );
  });
}

export function takeEnemyDamage(enemyIndex: number, damageTaken: number): void {
  useGameStore.setState((state) => {
    const enemy = state.enemies[enemyIndex];
    const shieldDamage = Math.min(enemy.shield.current, damageTaken);
    const healthDamage = damageTaken - shieldDamage;
    enemy.shield.current = Math.max(0, enemy.shield.current - shieldDamage);
    enemy.health.current = Math.max(0, enemy.health.current - healthDamage);
  });
}

export function attackCharacter(
  attack: Attack,
  caster: Combatant,
  spell: Spell,
): void {
  const state = useGameStore.getState();
  const defense = state.character.defense.current;
  const damageTaken = Math.max(0, attack.damage - defense);
  logDamage(caster, [state.character], spell, damageTaken, attack);
  takeCharacterDamage(damageTaken);
  applyStatusEffects(attack, state.character);

  // Apply leech to the enemy caster
  const healthLeechAmount = Math.min(caster.healthLeech.total, damageTaken);
  const manaLeechAmount = Math.min(caster.manaLeech.total, damageTaken);

  useGameStore.setState((state) => {
    const enemy = state.enemies.find((e) => e.id === caster.id);
    if (enemy) {
      enemy.health.current = Math.min(
        enemy.maxHealth.total,
        enemy.health.current + healthLeechAmount,
      );
      enemy.mana.current = Math.min(
        enemy.maxMana.total,
        enemy.mana.current + manaLeechAmount,
      );
    }
  });
  callTriggers("onHit", caster);
  callTriggers("onTakeAttack", state.character);
  if (attack.isCrit) {
    callTriggers("onCrit", caster);
  }
}

export function attackEnemies(
  attack: Attack,
  caster: Combatant,
  spell: Spell,
): void {
  const state = useGameStore.getState();
  const aliveEnemies = state.enemies.filter((e) => !e.isDead);

  const enemiesToAttack = spell.isAoe ? aliveEnemies : [aliveEnemies[0]];

  if (!enemiesToAttack[0]) return;

  let totalDamageTaken = 0;

  enemiesToAttack.forEach((enemy) => {
    const enemyIndex = state.enemies.indexOf(enemy);
    const defense = enemy.defense.current;
    const damageTaken = Math.max(0, attack.damage - defense);
    logDamage(caster, [enemy], spell, damageTaken, attack);
    takeEnemyDamage(enemyIndex, damageTaken);
    applyStatusEffects(attack, enemy);
    totalDamageTaken += damageTaken;
    callTriggers("onTakeAttack", enemy);
  });

  // Apply leech to the character caster
  const healthLeechAmount = Math.min(
    caster.healthLeech.total,
    totalDamageTaken,
  );
  const manaLeechAmount = Math.min(caster.manaLeech.total, totalDamageTaken);

  useGameStore.setState((state) => {
    state.character.health.current = Math.min(
      state.character.maxHealth.total,
      state.character.health.current + healthLeechAmount,
    );
    state.character.mana.current = Math.min(
      state.character.maxMana.total,
      state.character.mana.current + manaLeechAmount,
    );
  });

  callTriggers("onHit", caster);
  if (attack.isCrit) {
    callTriggers("onCrit", caster);
  }
}
