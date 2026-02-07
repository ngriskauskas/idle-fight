import { useGameStore } from "../store/gameStore";
import { Combatant } from "../types";
import { Trigger, TriggerAction, TriggerType } from "../types/triggers";
import { applyAuraEffect } from "./auraActions";
import { attackCharacter, attackEnemies, createAttack } from "./combatActions";
import { applyStatusEffects } from "./statusActions";

export function getTriggerMap(
  combatant: Combatant,
  trigger: Trigger,
): Record<TriggerAction, () => void> {
  return {
    speedBoost: () => {
      useGameStore.setState((state) => {
        const targetCombatant = combatant.isMainCharacter
          ? state.character
          : state.enemies.find((e) => e.id === combatant.id);
        if (!targetCombatant) return;

        targetCombatant.spells.forEach((spell) => {
          spell.attackCost.current = Math.min(
            spell.attackCost.total,
            spell.attackCost.current + trigger.value!,
          );
        });
      });
    },
    castSpell: () => {
      const attack = createAttack(combatant, trigger.spell!);

      if (combatant.isMainCharacter) {
        attackEnemies(attack, combatant, trigger.spell!);
      } else {
        attackCharacter(attack, combatant, trigger.spell!);
      }
    },
    castAura: () => {
      const state = useGameStore.getState();
      const target = combatant.isMainCharacter
        ? state.character
        : state.enemies.find((e) => e.id === combatant.id);
      if (!target) return;
      applyAuraEffect(target, trigger.spell!.auraEffect!);
    },
    castAuraAll: () => {
      const state = useGameStore.getState();
      const targets = [state.character, ...state.enemies];
      targets.forEach((target) => {
        applyAuraEffect(target, trigger.spell!.auraEffect!);
      });
    },
    poisonAll: () => {
      const state = useGameStore.getState();

      const targets = [state.character, ...state.enemies];
      targets.forEach((target) => {
        applyStatusEffects(
          {
            damage: 0,
            isCrit: false,
            isAoe: false,
            statusStats: { poison: trigger.value! },
          },
          target,
        );
      });
    },
    poisonAoe: () => {
      const state = useGameStore.getState();
      const targets = combatant.isMainCharacter
        ? state.enemies
        : [state.character];
      targets.forEach((target) => {
        applyStatusEffects(
          {
            damage: 0,
            isCrit: false,
            isAoe: true,
            statusStats: { poison: trigger.value! },
          },
          target,
        );
      });
    },
    poisonSpread: () => {
      if (combatant.isMainCharacter) return;
      const poisonEffect = combatant.statusEffects.find(
        (se) => se.type === "poison",
      );
      if (!poisonEffect || poisonEffect.stacks <= 0) return;
      const state = useGameStore.getState();
      const otherEnemies = state.enemies.filter(
        (e) => e.id !== combatant.id && !e.isDead,
      );
      if (otherEnemies.length === 0) return;
      const target = otherEnemies[0];

      applyStatusEffects(
        {
          damage: 0,
          isCrit: false,
          isAoe: false,
          statusStats: { poison: poisonEffect.stacks },
        },
        target,
      );
    },
  };
}

export function callTriggerAction(
  trigger: Trigger,
  combatant: Combatant,
): void {
  if (combatant.isDead) return;
  const triggerMap = getTriggerMap(combatant, trigger);
  if (Math.random() * 100 >= (trigger.chance ?? 100)) return;
  const action = triggerMap[trigger.action];
  action();
}

export function callTriggers(type: TriggerType, combatant: Combatant) {
  if (combatant.isDead) return;
  const triggers = combatant.triggers[type];

  triggers.forEach((trigger) => {
    callTriggerAction(trigger, combatant);
  });
}

export function addTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = combatant.isMainCharacter
      ? state.character
      : state.enemies.find((e) => e.id === combatant.id);
    if (!targetCombatant) return;

    if (targetCombatant.triggers[trigger.type].some((t) => t.id === trigger.id))
      return;
    targetCombatant.triggers[trigger.type].push(trigger);
  });
}

export function removeTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = combatant.isMainCharacter
      ? state.character
      : state.enemies.find((e) => e.id === combatant.id);
    if (!targetCombatant) return;

    targetCombatant.triggers[trigger.type] = targetCombatant.triggers[
      trigger.type
    ].filter((t) => t.id !== trigger.id);
  });
}
