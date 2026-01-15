import { useEffect } from "react";
import { useCharacterStore } from "./characterStore";
import { useEnemyStore } from "./enemyStore";
import { useSpellStore } from "./spellStore";
import { useGameLoop } from "./hooks/useGameLoop";
import { CharacterSection } from "./components/CharacterSection";
import { EnemySection } from "./components/EnemySection";
import { ProgressionBar } from "./components/ProgressionBar";
import { Sidebar } from "./components/Sidebar";
import { DEFAULT_SPELLS } from "./spells";
import { loadGame, saveGame } from "./utils/saveSystem";

function App() {
  const { character } = useCharacterStore();
  const { enemies } = useEnemyStore();
  const setSpells = useSpellStore((state) => state.setSpells);
  const recalculateEquippedSpellCosts = useSpellStore(
    (state) => state.recalculateEquippedSpellCosts
  );

  useEffect(() => {
    // Load game on startup
    const loaded = loadGame();

    // If no save was loaded, initialize with default spells
    if (!loaded) {
      setSpells(DEFAULT_SPELLS);
      recalculateEquippedSpellCosts();
    } else {
      // Even if loaded, ensure spells are properly initialized
      recalculateEquippedSpellCosts();
    }
  }, [setSpells, recalculateEquippedSpellCosts]);

  useEffect(() => {
    // Auto-save every 5 minutes
    const autoSaveInterval = setInterval(() => {
      saveGame();
      localStorage.setItem("idle-fight-save-time", new Date().toISOString());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(autoSaveInterval);
  }, []);

  useGameLoop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Progression Display */}
            <ProgressionBar />

            {/* Battle Arena */}
            <div className="flex gap-4 mt-4">
              <CharacterSection character={character} />
              <EnemySection enemies={enemies} />
            </div>
          </div>
        </div>

        {/* Sidebar - Fixed width on right, full height */}
        <div className="w-96 bg-slate-700 border-l border-slate-600 overflow-hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
