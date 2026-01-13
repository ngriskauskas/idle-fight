import { Combatant } from "../utils/combatCalculations";

interface CombatantStatsProps {
  stats: Combatant;
  showDecimals?: boolean;
}

export function CombatantStats({
  stats,
  showDecimals = false,
}: CombatantStatsProps) {
  const format = (value: number) => (showDecimals ? value : Math.floor(value));

  return (
    <div className="space-y-2 bg-slate-800 rounded p-4 text-sm">
      <div className="flex justify-between">
        <span>Attack</span>
        <span className="font-bold">
          {format(stats.attack)}
          {stats.currentAttack < stats.attack && (
            <span className="text-cyan-400 ml-2">
              - {format(stats.attack - stats.currentAttack)} ={" "}
              {format(stats.currentAttack)}
            </span>
          )}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Defense</span>
        <span className="font-bold">
          {format(stats.defense)}
          {stats.currentDefense < stats.defense && (
            <span className="text-red-400 ml-2">
              - {format(stats.defense - stats.currentDefense)} ={" "}
              {format(stats.currentDefense)}
            </span>
          )}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Speed</span>
        <span className="font-bold">{format(stats.speed)}</span>
      </div>
    </div>
  );
}
