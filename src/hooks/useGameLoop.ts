import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { tickRegen, tickSpells, tickAuraEffects, tickStatusEffects } from "../logic/tickActions";
import { tickRespawn } from "../logic/characterActions";
import { tickEnemyDeathTimers } from "../logic/enemyActions";
import { Character } from "../types";

export function fastTick() {
  tickSpells();
  tickEnemyDeathTimers();
}

export function slowTick() {
  tickStatusEffects();
  tickAuraEffects();
  tickRegen();
}

export function useGameLoop() {
  const character = useGameStore(
    (state) => state.friends.find((f) => f.isMainCharacter)!,
  ) as Character;
  const isPaused = useGameStore((state) => state.isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        fastTick();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [character.currentRespawnTime, isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        slowTick();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [character.currentRespawnTime, isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tickRespawn();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);
}
