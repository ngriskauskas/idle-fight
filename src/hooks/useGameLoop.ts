import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { tickRegen, tickSpells, tickAuraEffects, tickStatusEffects } from "../logic/tickActions";
import { tickRespawn } from "../logic/characterActions";
import { tickEnemyDeathTimers } from "../logic/enemyActions";
import { Character } from "../types";

export function useGameLoop() {
  const character = useGameStore(
    (state) => state.friends.find((f) => f.isMainCharacter)!,
  ) as Character;
  const isPaused = useGameStore((state) => state.isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        tickSpells();
        tickEnemyDeathTimers();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [character.currentRespawnTime, isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        tickStatusEffects();
        tickAuraEffects();
        tickRegen();
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
