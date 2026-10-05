import { useGameStore } from "../store/gameStore";

export function ProgressionBar() {
  const progress = useGameStore((state) => state.progress);

  return (
    <div className="bg-slate-800 rounded-lg p-2 border border-slate-600 mb-6">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex gap-6">
            <div>
              <p className="text-gray-400 text-xs">Enemy</p>
              <p className="text-lg font-bold text-cyan-400">
                {progress.enemy} / 10
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Wave</p>
              <p className="text-lg font-bold text-purple-400">
                {progress.wave} / 10
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">World</p>
              <p className="text-lg font-bold text-blue-400">
                {progress.world}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div>
            <p className="text-gray-500 text-xs">Highest Enemy</p>
            <p className="text-lg font-bold text-cyan-300">
              {progress.highest.enemy} / 10
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Highest Wave</p>
            <p className="text-lg font-bold text-purple-300">
              {progress.highest.wave} / 10
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Highest World</p>
            <p className="text-lg font-bold text-blue-300">
              {progress.highest.world}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="flex justify-between mb-1 text-xs text-gray-400">
          <span>Progress to Next World</span>
          <span>Wave {progress.wave} / 10</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden border border-slate-600">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{
              width: `${(((progress.wave - 1) * 10 + progress.enemy - 1) / 100) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
