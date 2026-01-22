import { useEffect } from "react";
import { loadGame, saveGame } from "../utils/saveSystem";
import { spawnNewEnemies } from "../logic/enemyActions";
import { useGameStore } from "../store/gameStore";

const AUTO_SAVE_INTERVAL = 5 * 60 * 1000;

export function useSaveSystem() {
  useEffect(() => {
    const hasSaveData = loadGame();
    if (!hasSaveData) {
      // No save data, spawn first enemy only if no enemies exist
      const enemies = useGameStore.getState().enemies;
      if (enemies.length === 0) {
        spawnNewEnemies();
      }
    }
  }, []);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveGame();
      localStorage.setItem("idle-fight-save-time", new Date().toISOString());
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(autoSaveInterval);
  }, []);
}
