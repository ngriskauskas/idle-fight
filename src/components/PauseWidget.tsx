import { useGameStore } from "../store/gameStore";
import { uiActions } from "../logic/uiActions";

export function PauseWidget() {
  const isPaused = useGameStore((state) => state.isPaused);
  const showDebugPanel = useGameStore((state) => state.showDebugPanel);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
      <div
        className={`px-3 py-1 rounded font-semibold text-sm ${
          isPaused
            ? "bg-red-900 text-red-200 border border-red-600"
            : "bg-green-900 text-green-200 border border-green-600"
        }`}
      >
        {isPaused ? "PAUSED" : "RUNNING"}
      </div>

      <button
        onClick={uiActions.togglePause}
        className={`px-4 py-2 rounded font-bold transition ${
          isPaused
            ? "bg-green-600 hover:bg-green-500 text-white"
            : "bg-red-600 hover:bg-red-500 text-white"
        }`}
      >
        {isPaused ? "▶ Resume" : "⏸ Pause"}
      </button>

      <button
        onClick={() =>
          useGameStore.setState((state) => {
            state.showDebugPanel = !state.showDebugPanel;
          })
        }
        className={`px-4 py-2 rounded font-bold transition ${
          showDebugPanel
            ? "bg-yellow-600 hover:bg-yellow-500 text-white"
            : "bg-gray-600 hover:bg-gray-500 text-white"
        }`}
      >
        Debug
      </button>
    </div>
  );
}
