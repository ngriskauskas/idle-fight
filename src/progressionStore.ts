import { create } from "zustand";
import { useEnemyStore } from "./enemyStore";

interface ProgressionStore {
  world: number;
  wave: number;
  enemyNumber: number;
  isBoss: boolean;
  progressToNextLevel: () => void;
  resetToWorldStart: () => void;
}

export const useProgressionStore = create<ProgressionStore>((set) => ({
  world: 1,
  wave: 1,
  enemyNumber: 1,
  isBoss: false,
  progressToNextLevel: () =>
    set((state) => {
      let newEnemyNumber = state.enemyNumber + 1;
      let newWave = state.wave;
      let newWorld = state.world;
      let newIsBoss = false;

      // Check if we've completed a wave (reached enemy 11)
      if (newEnemyNumber > 10) {
        newEnemyNumber = 1;
        newWave += 1;

        // Check if we've completed all waves (reached wave 11)
        if (newWave > 10) {
          newWave = 1;
          newWorld += 1;
        }
      }

      // Boss is every 10th enemy
      if (newEnemyNumber === 10) {
        newIsBoss = true;
      }

      return {
        world: newWorld,
        wave: newWave,
        enemyNumber: newEnemyNumber,
        isBoss: newIsBoss,
      };
    }),
  resetToWorldStart: () => {
    set(() => ({
      wave: 1,
      enemyNumber: 1,
      isBoss: false,
    }));

    // Reset enemies to world 1, wave 1
    const enemyStore = useEnemyStore.getState();
    enemyStore.resetEnemies();
  },
}));
