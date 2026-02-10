import { applyAuraEffect } from "../hooks/useCheckAuraEffects";
import { applyStatusEffects } from "../hooks/useCheckStatuses";
import { useGameStore } from "../store/gameStore";
import { AuraSpell, Combatant, MagicSpell, PhysicalSpell } from "../types";
import { Trigger, TriggerAction, TriggerType } from "../types/triggers";
import { getCombatant } from "../utils/getCombatant";
import { launchMagicAttack, launchPhysicalAttack } from "./attackActions";

export function getTriggerMap(
  combatant: Combatant,
  trigger: Trigger,
): Record<TriggerAction, () => void> {
  return {
    speedBoost: () => {
      useGameStore.setState((state) => {
        const targetCombatant = getCombatant(combatant.id, state);
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
      if (trigger.spell!.spellType === "magic") {
        launchMagicAttack(trigger.spell as MagicSpell, combatant.id);
      } else if (trigger.spell!.spellType === "physical") {
        launchPhysicalAttack(trigger.spell as PhysicalSpell, combatant.id);
      }
    },
    castAura: () => {
      applyAuraEffect(trigger.spell as AuraSpell, combatant.id);
    },
    castAuraAll: () => {
      const state = useGameStore.getState();
      const targets = [...state.friends, ...state.enemies];
      targets.forEach((target) => {
        applyAuraEffect(trigger.spell as AuraSpell, target.id);
      });
    },
    poisonAll: () => {
      const state = useGameStore.getState();

      const targets = [...state.friends, ...state.enemies];
      targets.forEach((target) => {
        applyStatusEffects(
          {
            poison: trigger.value!,
          },
          target.id,
        );
      });
    },
    poisonAoe: () => {
      const state = useGameStore.getState();
      const targets = combatant.isEnemy ? state.friends : state.enemies;
      targets.forEach((target) => {
        applyStatusEffects(
          {
            poison: trigger.value!,
          },
          target.id,
        );
      });
    },
    poisonSpread: () => {
      const poisonEffect = combatant.statusEffects.find((se) => se.type === "poison");
      if (!poisonEffect || poisonEffect.stacks <= 0) return;

      const state = useGameStore.getState();
      const otherTargets = combatant.isEnemy
        ? state.friends.filter((f) => f.id !== combatant.id && !f.isDead)
        : state.enemies.filter((e) => e.id !== combatant.id && !e.isDead);
      if (otherTargets.length === 0) return;
      const target = otherTargets[0];

      applyStatusEffects(
        {
          poison: poisonEffect.stacks,
        },
        target.id,
      );
    },
  };
}

export function callTriggerAction(trigger: Trigger, combatant: Combatant): void {
  if (combatant.isDead) return;
  const triggerMap = getTriggerMap(combatant, trigger);
  if (Math.random() * 100 >= (trigger.chance ?? 100)) return;
  const action = triggerMap[trigger.action];
  action();
}

export function callTriggers(type: TriggerType, combatantId: string) {
  const combatant = getCombatant(combatantId, useGameStore.getState());
  if (!combatant || combatant.isDead) return;

  const triggers = combatant.triggers[type];
  triggers.forEach((trigger) => {
    callTriggerAction(trigger, combatant);
  });
}

export function addTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = getCombatant(combatant.id, state);
    if (!targetCombatant) return;

    if (targetCombatant.triggers[trigger.type].some((t) => t.id === trigger.id)) return;
    targetCombatant.triggers[trigger.type].push(trigger);
  });
}

export function removeTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = getCombatant(combatant.id, state);
    if (!targetCombatant) return;

    targetCombatant.triggers[trigger.type] = targetCombatant.triggers[trigger.type].filter(
      (t) => t.id !== trigger.id,
    );
  });
}
