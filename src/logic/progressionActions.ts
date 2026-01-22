import { useGameStore } from "../store/gameStore";

export function progressEnemy(): void {
  useGameStore.setState((state) => {
    state.progress.enemy += 1;

    if (state.progress.enemy > state.progress.highest.enemy) {
      state.progress.highest.enemy = state.progress.enemy;
    }

    if (state.progress.enemy > 10) {
      state.progress.enemy = 1;
      state.progress.wave += 1;

      if (state.progress.wave > state.progress.highest.wave) {
        state.progress.highest.wave = state.progress.wave;
      }

      if (state.progress.wave > 10) {
        state.progress.wave = 1;
        state.progress.world += 1;

        if (state.progress.world > state.progress.highest.world) {
          state.progress.highest.world = state.progress.world;
        }
      }
    }
  });
}

export function resetProgression(): void {
  useGameStore.setState((state) => {
    state.progress.enemy = 1;
    state.progress.wave = 1;
    state.progress.world = 1;
  });
}
