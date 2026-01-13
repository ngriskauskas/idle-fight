import { useProgressionStore } from "../progressionStore";

export function ProgressionBar() {
  const { world, wave, enemyNumber, isBoss } = useProgressionStore();

  return (
    <div className="bg-slate-800 rounded-lg p-2 border border-slate-600 mb-6">
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-1">
          <div className="flex gap-6">
            <div>
              <p className="text-gray-400 text-xs">Enemy</p>
              <p className="text-lg font-bold text-cyan-400">
                {enemyNumber} / 10
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Wave</p>
              <p className="text-lg font-bold text-purple-400">{wave} / 10</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">World</p>
              <p className="text-lg font-bold text-blue-400">{world}</p>
            </div>
          </div>
        </div>

        {isBoss && (
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-1 rounded-lg font-bold text-sm animate-pulse">
            ⚔️ BOSS ⚔️
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="flex justify-between mb-1 text-xs text-gray-400">
          <span>Progress to Next World</span>
          <span>{wave} / 10</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden border border-slate-600">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${(wave / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
