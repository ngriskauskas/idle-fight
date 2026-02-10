import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { AttackStatusStats, StatusEffect, StatusEffectType } from "../types";
import { statusEffectMap } from "../logic/statusActions";
import { getCombatant } from "../utils/getCombatant";

export function useCheckStatuses() {
  const combatantStatuses = useGameStore((state) => [
    ...state.friends.map((f) => ({ combatantId: f.id, statusEffects: f.statusEffects })),
    ...state.enemies.map((e) => ({ combatantId: e.id, statusEffects: e.statusEffects })),
  ]);

  useEffect(() => {
    combatantStatuses.forEach(({ combatantId, statusEffects }) => {
      statusEffects.forEach((status) => {
        runStatusEffect(status, combatantId);
      });
      useGameStore.setState((state) => {
        const combatant = getCombatant(combatantId, state);
        if (!combatant) return;
        combatant.statusEffects = combatant.statusEffects.filter((s) => s.stacks >= 0);
      });
    });
  }, [JSON.stringify(combatantStatuses)]);
}

function runStatusEffect(status: StatusEffect, combatantId: string): void {
  useGameStore.setState((state) => {
    const effectFunction = statusEffectMap[status.type];
    if (!effectFunction) return;
    const combatant = getCombatant(combatantId, state);
    if (!combatant) return;
    effectFunction(combatant, status.stacks);
  });
}

export function applyStatusEffects(statuses: AttackStatusStats, targetId: string) {
  useGameStore.setState((state) => {
    const target = getCombatant(targetId, state);
    if (!target) return;
    Object.entries(statuses).forEach(([statusType, amount]) => {
      const effect = target.statusEffects.find((s) => s.type === statusType);
      if (effect) {
        effect.stacks += amount;
      } else {
        target.statusEffects.push({ type: statusType as StatusEffectType, stacks: amount });
      }
    });
  });
}
