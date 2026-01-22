import { levelUpCharacter } from "../logic/characterActions";
import { dropItem } from "../logic/itemActions";
import { useGameStore } from "../store/gameStore";

export function DebugPanel() {
  const character = useGameStore((state) => state.character);
  const showDebugPanel = useGameStore((state) => state.showDebugPanel);

  if (!showDebugPanel) {
    return null;
  }

  const handleLevelUp = () => {
    levelUpCharacter();
  };

  const handleDropItem = () => {
    dropItem(character.level);
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
        </div>
      </div>
    </div>
  );
}
