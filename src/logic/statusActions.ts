import type { Attack, Combatant, StatusEffectType } from "../types";
import { useGameStore } from "../store/gameStore";

function poisonEffect(target: Combatant, stacks: number): void {
  target.health = Math.max(0, target.health - stacks);
}

function bleedEffect(target: Combatant, stacks: number): void {
  target.health = Math.max(0, target.health - stacks);
  target.currentDefense = Math.max(0, target.defense - stacks);
}

function fireEffect(target: Combatant, stacks: number): void {
  target.health = Math.max(0, target.health - stacks);
}

function iceEffect(target: Combatant, stacks: number): void {
  target.spells.forEach((spell) => {
    spell.attackCost = spell.baseAttackCost + stacks;
  });
}

function lightningEffect(target: Combatant, stacks: number): void {
  target.health = Math.max(0, target.health - stacks);
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

    for (const [statusType, amount] of Object.entries(attack.statusStats)) {
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
    state.enemies.forEach(processCombatant);
  });
}
