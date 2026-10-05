// Minimal stand-in for React so the game's hooks run headless, with no DOM and no timers.
// Only what src/hooks and zustand use: useEffect, useRef, and a store selector hook.

type Slot = { ref?: { current: unknown }; deps?: unknown[] };

const slots: Slot[] = [];
let index = 0;
let pendingEffects: (() => void)[] = [];

function nextSlot(): Slot {
  if (!slots[index]) slots[index] = {};
  return slots[index++];
}

export function useRef<T>(initial: T): { current: T } {
  const slot = nextSlot();
  if (!slot.ref) slot.ref = { current: initial };
  return slot.ref as { current: T };
}

export function useEffect(effect: () => void, deps?: unknown[]): void {
  const slot = nextSlot();
  const changed =
    !deps || !slot.deps || deps.length !== slot.deps.length || deps.some((d, i) => d !== slot.deps![i]);
  slot.deps = deps;
  if (changed) pendingEffects.push(effect);
}

export function useDebugValue(): void {}

// replaces use-sync-external-store/shim/with-selector
export function useSyncExternalStoreWithSelector<S, T>(
  _subscribe: unknown,
  getSnapshot: () => S,
  _getServerSnapshot: unknown,
  selector: (state: S) => T,
): T {
  return selector(getSnapshot());
}

// Render the hook tree and run effects until the store stops changing.
export function settle(render: () => void, getState: () => unknown): void {
  for (let i = 0; i < 500; i++) {
    const before = getState();
    index = 0;
    pendingEffects = [];
    render();
    pendingEffects.forEach((effect) => effect());
    if (getState() === before) return;
  }
  throw new Error("engine did not settle after 500 passes");
}

export default { useRef, useEffect, useDebugValue, useSyncExternalStoreWithSelector };
