import { useGameStore } from "../store/gameStore";

const SCALE_GROWTH_PER_WAVE = 1.25;
// Each world starts again from the weakest enemy types. Trash there is about a fifth as
// strong as the trash that ends a world, but the first boss is over a third as strong as
// the last one. At 2 the new world's first boss hits a little harder than the old world's
// last, and its first waves are a breather.
const SCALE_JUMP_PER_WORLD = 2;

// How strong enemies and item drops are at the current wave. Nothing of the player's
// uses this directly.
export function getScaleMulti(): number {
  const state = useGameStore.getState();
  const wave = state.progress.wave;
  const world = state.progress.world;
  const totalWave = (world - 1) * 10 + wave;
  return (
    Math.pow(SCALE_GROWTH_PER_WAVE, totalWave - 1) * Math.pow(SCALE_JUMP_PER_WORLD, world - 1)
  );
}

export function progressEnemy(): void {
  useGameStore.setState((state) => {
    state.progress.enemy += 1;

    if (state.progress.enemy > 10) {
      state.progress.enemy = 1;
      state.progress.wave += 1;

      if (state.progress.wave > 10) {
        state.progress.wave = 1;
        state.progress.world += 1;
      }

      const { world, wave, highest } = state.progress;
      if (world > highest.world || (world === highest.world && wave > highest.wave)) {
        highest.world = world;
        highest.wave = wave;
        highest.enemy = 1;
      }
    } else {
      const { world, wave, enemy, highest } = state.progress;
      if (world === highest.world && wave === highest.wave && enemy > highest.enemy) {
        highest.enemy = enemy;
      }
    }
  });
}

export function resetProgression(): void {
  useGameStore.setState((state) => {
    // death sends you all the way back; getting stronger shows up as clearing faster
    state.progress.enemy = 1;
    state.progress.wave = 1;
    state.progress.world = 1;
  });
}
