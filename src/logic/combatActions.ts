import type { Attack, Combatant, Spell } from "../types";
import { useGameStore } from "../store/gameStore";
import { killCharacter } from "./characterActions";
import { killEnemy } from "./enemyActions";
import { applyStatusEffects } from "./statusActions";
import { logDamage } from "./logActions";

export function castSpell(spell: Spell, caster: Combatant): void {
  const attack = createAttack(caster, spell);

  if (caster.isMainCharacter) {
    attackEnemies(attack, caster, spell);
  } else {
    attackCharacter(attack, caster, spell);
  }
}

function createAttack(caster: Combatant, spell: Spell): Attack {
  const damage = spell.damage + caster.currentAttack;
  const attack = {
    damage,
    statusStats: spell.statusStats,
  };
  return attack;
}

export function takeCharacterDamage(damageTaken: number): void {
  useGameStore.setState((state) => {
    state.character.health = Math.max(0, state.character.health - damageTaken);
  });

  if (useGameStore.getState().character.health <= 0) {
    killCharacter();
  }
}

export function takeEnemyDamage(enemyIndex: number, damageTaken: number): void {
  useGameStore.setState((state) => {
    const enemy = state.enemies[enemyIndex];
    enemy.health = Math.max(0, enemy.health - damageTaken);
  });

  if (useGameStore.getState().enemies[enemyIndex]!.health <= 0) {
    killEnemy(enemyIndex);
  }
}

function attackCharacter(
  attack: Attack,
  caster: Combatant,
  spell: Spell,
): void {
  const state = useGameStore.getState();
  const defense = state.character.currentDefense;
  const damageTaken = Math.max(0, attack.damage - defense);
  takeCharacterDamage(damageTaken);
  applyStatusEffects(attack, state.character);
  logDamage(caster, state.character, spell, damageTaken, attack);
}

function attackEnemies(attack: Attack, caster: Combatant, spell: Spell): void {
  const state = useGameStore.getState();
  const enemyToAttack = state.enemies[0];
  if (!enemyToAttack) return;
  const defense = enemyToAttack.currentDefense || 0;
  const damageTaken = Math.max(0, attack.damage - defense);
  takeEnemyDamage(0, damageTaken);
  applyStatusEffects(attack, enemyToAttack);
  logDamage(caster, enemyToAttack, spell, damageTaken, attack);
}
