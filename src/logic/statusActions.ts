import type { Attack, Combatant, StatusEffectType } from "../types";
import { useGameStore } from "../store/gameStore";
import {
  recalcCharacterSpellSpeeds,
  recalcEnemySpellSpeeds,
} from "./combatantActions";
import { killCharacter } from "./characterActions";
import { killEnemy } from "./enemyActions";

function poisonEffect(target: Combatant, stacks: number): void {
  target.health.current = Math.max(0, target.health.current - stacks);
}

function bleedEffect(target: Combatant, stacks: number): void {
  target.health.current = Math.max(0, target.health.current - stacks);
  target.defense.current = Math.max(0, target.defense.total - stacks);
}

function fireEffect(target: Combatant, stacks: number): void {
  target.health.current = Math.max(0, target.health.current - stacks);
}

function iceEffect(target: Combatant, stacks: number): void {
  target.speed.current = Math.max(0, target.speed.total - stacks);
}

function lightningEffect(target: Combatant, stacks: number): void {
  target.health.current = Math.max(0, target.health.current - stacks);
}

const statusEffectMap: Record<
  StatusEffectType,
  (target: Combatant, stacks: number) => void
> = {
  poison: poisonEffect,
  bleed: bleedEffect,
  fire: fireEffect,
  ice: iceEffect,
  lightning: lightningEffect,
};

export function applyStatusEffects(attack: Attack, target: Combatant): void {
  useGameStore.setState((state) => {
    const stateTarget = target.isMainCharacter
      ? state.character
      : state.enemies.find((e) => e.id === target.id)!;

    if (!stateTarget) return;
    for (const [statusType, statObj] of Object.entries(attack.statusStats)) {
      if (!statObj) continue;
      const amount = statObj;
      const effect = stateTarget.statusEffects.find(
        (e) => e.type === (statusType as StatusEffectType),
      );
      if (effect) {
        effect.stacks += amount;
      } else {
        stateTarget.statusEffects.push({
          type: statusType as StatusEffectType,
          stacks: amount,
        });
      }
    }
  });
}

export function tickStatusEffects(): void {
  useGameStore.setState((state) => {
    const processCombatant = (target: Combatant) => {
      for (const effect of target.statusEffects) {
        const effectFn = statusEffectMap[effect.type];
        if (effectFn) {
          effectFn(target, effect.stacks);
        }
        effect.stacks -= 1;
      }
      target.statusEffects = target.statusEffects.filter((e) => e.stacks >= 0);
    };

    processCombatant(state.character);
    state.enemies.filter((e) => !e.isDead).forEach(processCombatant);
  });
  recalcCharacterSpellSpeeds();
  recalcEnemySpellSpeeds();

  // Check for deaths
  const state = useGameStore.getState();
  if (
    state.character.health.current <= 0 &&
    state.character.currentRespawnTime === 0
  ) {
    killCharacter();
  }
  state.enemies
    .filter((e) => !e.isDead)
    .forEach((enemy, index) => {
      if (enemy.health.current <= 0) {
        killEnemy(index);
      }
    });
}
