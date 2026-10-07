import { useState } from "react";
import { useGameLoop } from "./hooks/useGameLoop";
import { useSaveSystem } from "./hooks/useSaveSystem";
import { EnemySection } from "./components/EnemySection";
import { ProgressionBar } from "./components/ProgressionBar";
import { PauseWidget } from "./components/PauseWidget";
import { DebugPanel } from "./components/DebugPanel";
import { Sidebar } from "./components/Sidebar";
import { useCombatEngine } from "./hooks/useCombatEngine";
import { FriendSection } from "./components/FriendSection";

function App() {
  useSaveSystem();
  useGameLoop();
  useCombatEngine();
  // below lg the fight and the sidebar panels share the screen, one at a time
  const [showFight, setShowFight] = useState(true);

  return (
    <div className="h-app bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <div
          className={`${showFight ? "" : "hidden"} lg:block flex-1 min-h-0 min-w-0 p-2 sm:p-4 overflow-y-auto`}
        >
          <div className="max-w-6xl">
            <DebugPanel />

            <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-start">
              <div className="sm:flex-1 sm:min-w-0">
                <ProgressionBar />
              </div>
              <div className="sm:flex-none">
                <PauseWidget />
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 mt-2">
              <FriendSection />
              <EnemySection />
            </div>
          </div>
        </div>

        <div
          className={`${showFight ? "" : "flex-1"} lg:flex-none lg:w-[360px] min-h-0 bg-slate-700 border-t lg:border-t-0 lg:border-l border-slate-600 overflow-hidden flex-shrink-0`}
        >
          <Sidebar showFight={showFight} onShowFight={setShowFight} />
        </div>
      </div>
    </div>
  );
}

export default App;
