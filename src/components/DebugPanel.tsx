import React from "react";
import { levelUpCharacter } from "../logic/characterActions";
import { dropItem } from "../logic/itemActions";
import { useGameStore } from "../store/gameStore";
import { resetEnemies } from "../logic/enemyActions";

export function DebugPanel() {
  const progress = useGameStore((state) => state.progress);
  const showDebugPanel = useGameStore((state) => state.showDebugPanel);
  // (removed unused setProgress)

  const [enemyInput, setEnemyInput] = React.useState(progress.enemy);
  const [waveInput, setWaveInput] = React.useState(progress.wave);
  const [worldInput, setWorldInput] = React.useState(progress.world);

  if (!showDebugPanel) {
    return null;
  }

  const handleLevelUp = () => {
    levelUpCharacter();
  };

  const handleDropItem = () => {
    dropItem(progress.wave);
  };

  const handleLevelUp10 = () => {
    for (let i = 0; i < 10; i++) {
      levelUpCharacter();
    }
  };

  const handleDrop10Items = () => {
    for (let i = 0; i < 10; i++) {
      dropItem(progress.wave);
    }
  };

  const handleJump = () => {
    useGameStore.setState((state) => {
      state.progress.enemy = Math.max(1, Math.min(10, Number(enemyInput)));
      state.progress.wave = Math.max(1, Number(waveInput));
      state.progress.world = Math.max(1, Number(worldInput));
    });
    resetEnemies();
  };

  return (
    <div className="bg-red-900 border-2 border-red-600 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-bold text-red-200">DEBUG MODE</div>
        <div className="flex gap-2">
          <button
            onClick={handleLevelUp}
            className="px-3 py-1 bg-red-700 hover:bg-red-600 text-red-100 font-bold text-sm rounded transition"
          >
            Level Up
          </button>
          <button
            onClick={handleDropItem}
            className="px-3 py-1 bg-red-700 hover:bg-red-600 text-red-100 font-bold text-sm rounded transition"
          >
            Drop Item
          </button>
          <button
            onClick={handleLevelUp10}
            className="px-3 py-1 bg-orange-700 hover:bg-orange-600 text-orange-100 font-bold text-sm rounded transition"
          >
            Level Up x10
          </button>
          <button
            onClick={handleDrop10Items}
            className="px-3 py-1 bg-orange-700 hover:bg-orange-600 text-orange-100 font-bold text-sm rounded transition"
          >
            Drop x10 Items
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <label className="text-xs text-red-200">Enemy:</label>
        <input
          type="number"
          min={1}
          max={10}
          value={enemyInput}
          onChange={(e) => setEnemyInput(Number(e.target.value))}
          className="w-14 px-1 py-0.5 rounded bg-red-950 text-red-100 border border-red-700 text-xs"
        />
        <label className="text-xs text-red-200">Wave:</label>
        <input
          type="number"
          min={1}
          value={waveInput}
          onChange={(e) => setWaveInput(Number(e.target.value))}
          className="w-14 px-1 py-0.5 rounded bg-red-950 text-red-100 border border-red-700 text-xs"
        />
        <label className="text-xs text-red-200">World:</label>
        <input
          type="number"
          min={1}
          value={worldInput}
          onChange={(e) => setWorldInput(Number(e.target.value))}
          className="w-14 px-1 py-0.5 rounded bg-red-950 text-red-100 border border-red-700 text-xs"
        />
        <button
          onClick={handleJump}
          className="ml-2 px-3 py-1 bg-yellow-700 hover:bg-yellow-600 text-yellow-100 font-bold text-xs rounded transition"
        >
          Jump & Respawn
        </button>
      </div>
    </div>
  );
}
