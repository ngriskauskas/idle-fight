import { useGameLoop } from "./hooks/useGameLoop";
import { useSaveSystem } from "./hooks/useSaveSystem";
import { CharacterSection } from "./components/CharacterSection";
import { EnemySection } from "./components/EnemySection";
import { ProgressionBar } from "./components/ProgressionBar";
import { PauseWidget } from "./components/PauseWidget";
import { DebugPanel } from "./components/DebugPanel";
import { Sidebar } from "./components/Sidebar";
import {
  useCheckCharacterHealth,
  useCheckEnemiesHealth,
} from "./hooks/useCheckHealth";
import {
  useRecalcCharacterSpellCosts,
  useRecalcCharacterSpellSpeeds,
  useRecalcEnemySpellCosts,
  useRecalcEnemySpellSpeeds,
} from "./hooks/useRecalcCombatant";
import { useCheckCharacterMana } from "./hooks/useCheckMana";

function App() {
  useSaveSystem();
  useGameLoop();
  useCheckCharacterHealth();
  useCheckEnemiesHealth();
  useCheckCharacterMana();
  useRecalcCharacterSpellCosts();
  useRecalcCharacterSpellSpeeds();
  useRecalcEnemySpellCosts();
  useRecalcEnemySpellSpeeds();

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="flex-1 flex h-full">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-6xl">
            <DebugPanel />

            <div className="flex gap-4 items-start">
              <div className="w-2/3">
                <ProgressionBar />
              </div>
              <div className="w-1/3">
                <PauseWidget />
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <CharacterSection />
              <EnemySection />
            </div>
          </div>
        </div>

        <div className="w-[360px] bg-slate-700 border-l border-slate-600 h-screen overflow-hidden flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
