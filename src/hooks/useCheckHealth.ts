import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import { callTriggers } from "../logic/triggerActions";
import { killEnemy } from "../logic/enemyActions";
import { removeFragileAuras } from "./useCheckAuraEffects";
import { getCombatant } from "../utils/getCombatant";
import { killFriend } from "../logic/characterActions";

export function useCheckHealth() {
  const combantsHealth = useGameStore((state) => [
    ...state.enemies.map((e) => ({
      current: e.health.current,
      max: e.maxHealth.total,
      isDead: e.isDead,
      id: e.id,
    })),
    ...state.friends.map((f) => ({
      current: f.health.current,
      max: f.maxHealth.total,
      isDead: f.isDead,
      id: f.id,
    })),
  ]);

  const prevHealths = useRef<Record<string, number>>({});

  function killCombatant(id: string) {
    const combatant = getCombatant(id, useGameStore.getState());
    if (!combatant) return;
    if (combatant.isEnemy) {
      killEnemy(id);
    } else {
      killFriend(id);
    }
  }

  function checkHealth(combatant: { current: number; max: number; isDead: boolean; id: string }) {
    if (combatant.current / combatant.max <= 0.2) {
      callTriggers("onLowHealth", combatant.id);
    }
    if (combatant.current <= 0 && !combatant.isDead) {
      killCombatant(combatant.id);
    } else if (!combatant.isDead && combatant.current < combatant.max) {
      const prev = prevHealths.current[combatant.id];
      if (prev !== undefined && combatant.current < prev) {
        callTriggers("onTakeDamage", combatant.id);
        removeFragileAuras(combatant.id);
      }
    }
    prevHealths.current[combatant.id] = combatant.current;
  }

  useEffect(() => {
    combantsHealth.forEach((combatant) => {
      checkHealth(combatant);
    });
  }, [JSON.stringify(combantsHealth)]);
}
