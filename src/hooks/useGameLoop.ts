import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { tickSpells } from "../logic/combatantActions";
import { tickRespawn } from "../logic/characterActions";
import { tickStatusEffects } from "../logic/statusActions";

export function useGameLoop() {
  const character = useGameStore((state) => state.character);
  const isPaused = useGameStore((state) => state.isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        tickSpells();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [character.currentRespawnTime, isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && character.currentRespawnTime === 0) {
        tickStatusEffects();
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
