import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import { callTriggers } from "../logic/triggerActions";
import { killCharacter } from "../logic/characterActions";
import { killEnemy } from "../logic/enemyActions";
import { removeFragileAuras } from "../logic/auraActions";

export function useCheckCharacterHealth() {
  const character = useGameStore((state) => state.character);
  const prevHealth = useRef<number | null>(null);

  useEffect(() => {
    if (!character) return;
    if (character.health.current / character.maxHealth.total <= 0.2) {
      callTriggers("onLowHealth", character);
    }
    if (character.health.current <= 0 && character.currentRespawnTime === 0) {
      killCharacter();
    } else {
      if (
        prevHealth.current !== null &&
        character.health.current < prevHealth.current
      ) {
        callTriggers("onTakeDamage", character); //TODO test onTakeDamage triggers
        removeFragileAuras(character);
      }
    }
    prevHealth.current = character.health.current;
  }, [
    character.health.current,
    character.maxHealth.total,
    character.currentRespawnTime,
  ]);
}

export function useCheckEnemiesHealth() {
  const enemiesHealth = useGameStore((state) =>
    state.enemies.map((e) => ({
      current: e.health.current,
      max: e.maxHealth.total,
      isDead: e.isDead,
      id: e.id,
    })),
  );
  const prevHealths = useRef<Record<string, number>>({});

  useEffect(() => {
    enemiesHealth.forEach((enemy, idx) => {
      if (enemy.current / enemy.max <= 0.2) {
        const e = useGameStore
          .getState()
          .enemies.find((e) => e.id === enemy.id);
        if (e) callTriggers("onLowHealth", e);
      }
      if (enemy.current <= 0 && !enemy.isDead) {
        killEnemy(idx);
      } else if (!enemy.isDead && enemy.current < enemy.max) {
        const prev = prevHealths.current[enemy.id];
        if (prev !== undefined && enemy.current < prev) {
          const e = useGameStore
            .getState()
            .enemies.find((e) => e.id === enemy.id);
          if (e) {
            callTriggers("onTakeDamage", e);
            removeFragileAuras(e);
          }
        }
      }
      prevHealths.current[enemy.id] = enemy.current;
    });
  }, [JSON.stringify(enemiesHealth)]);
}
