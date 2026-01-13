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
    <div className="space-y-2 bg-slate-800 rounded p-4 border border-purple-700">
      <div className="text-sm font-bold text-purple-400 mb-2">Status Stats</div>
      {statusStats.poison > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-purple-400">Poison</span>
          <span className="font-bold">{statusStats.poison}</span>
        </div>
      )}
      {statusStats.bleed > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-red-400">Bleed</span>
          <span className="font-bold">{statusStats.bleed}</span>
        </div>
      )}
      {statusStats.fire > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-orange-400">Fire</span>
          <span className="font-bold">{statusStats.fire}</span>
        </div>
      )}
      {statusStats.ice > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-cyan-400">Ice</span>
          <span className="font-bold">{statusStats.ice}</span>
        </div>
      )}
      {statusStats.lightning > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-yellow-400">Lightning</span>
          <span className="font-bold">{statusStats.lightning}</span>
        </div>
      )}
      {!hasAnyStats && showNone && (
        <div className="text-sm text-gray-400">None</div>
      )}
    </div>
  );
}
