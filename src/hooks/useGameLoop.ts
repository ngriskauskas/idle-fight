import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { tickRegen, tickSpells } from "../logic/combatantActions";
import { tickRespawn } from "../logic/characterActions";
import { tickStatusEffects } from "../logic/statusActions";
import { tickAuraEffects } from "../logic/auraActions";
import { tickEnemyDeathTimers } from "../logic/enemyActions";

export function useGameLoop() {
  const character = useGameStore((state) => state.character);
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
