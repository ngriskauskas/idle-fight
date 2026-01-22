import { useGameLoop } from "./hooks/useGameLoop";
import { useSaveSystem } from "./hooks/useSaveSystem";
import { CharacterSection } from "./components/CharacterSection";
import { EnemySection } from "./components/EnemySection";
import { ProgressionBar } from "./components/ProgressionBar";
import { PauseWidget } from "./components/PauseWidget";
import { DebugPanel } from "./components/DebugPanel";
import { Sidebar } from "./components/Sidebar";

function App() {
  useSaveSystem();
  useGameLoop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 p-4">
          <div className="max-w-5xl">
            {/* Debug Panel */}
            <DebugPanel />

            {/* Progression Display and Pause Widget */}
            <div className="flex gap-4 items-start">
              <div className="w-2/3">
                <ProgressionBar />
              </div>
              <div className="w-1/3">
                <PauseWidget />
              </div>
            </div>

            {/* Battle Arena */}
            <div className="flex gap-4 mt-2">
              <CharacterSection />
              <EnemySection />
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
