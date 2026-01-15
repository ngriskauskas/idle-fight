import { StatusStats } from "../utils/combatCalculations";

interface StatusStatsDisplayProps {
  statusStats: StatusStats;
  showNone?: boolean;
}

export function StatusStatsDisplay({
  statusStats,
  showNone = true,
}: StatusStatsDisplayProps) {
  const hasAnyStats = Object.values(statusStats).some((v) => v > 0);

  if (!hasAnyStats && !showNone) {
    return null;
  }

  return (
    <div className="bg-slate-800 rounded p-3 border border-purple-700">
      <div className="text-xs font-bold text-purple-400 mb-3">Status Stats</div>
      <div className="grid grid-cols-2 gap-x-3 text-xs">
        {statusStats.poison > 0 && (
          <div className="flex justify-between">
            <span className="text-purple-400">Poison</span>
            <span className="font-bold">{statusStats.poison}</span>
          </div>
        )}
        {statusStats.bleed > 0 && (
          <div className="flex justify-between">
            <span className="text-red-400">Bleed</span>
            <span className="font-bold">{statusStats.bleed}</span>
          </div>
        )}
        {statusStats.fire > 0 && (
          <div className="flex justify-between">
            <span className="text-orange-400">Fire</span>
            <span className="font-bold">{statusStats.fire}</span>
          </div>
        )}
        {statusStats.ice > 0 && (
          <div className="flex justify-between">
            <span className="text-cyan-400">Ice</span>
            <span className="font-bold">{statusStats.ice}</span>
          </div>
        )}
        {statusStats.lightning > 0 && (
          <div className="flex justify-between">
            <span className="text-yellow-400">Lightning</span>
            <span className="font-bold">{statusStats.lightning}</span>
          </div>
        )}
        {!hasAnyStats && showNone && (
          <div className="text-gray-400 col-span-2">None</div>
        )}
      </div>
    </div>
  );
}
