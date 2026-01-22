import type { Combatant } from "../types/combatant";

interface CombatantStatsProps {
  stats: Combatant & { itemDropChance?: number };
  showDecimals?: boolean;
  hideZeroRegen?: boolean;
}

export function CombatantStats({
  stats,
  showDecimals = false,
  hideZeroRegen = false,
}: CombatantStatsProps) {
  const format = (value: number) => (showDecimals ? value : Math.floor(value));

  return (
    <div className="bg-slate-800 rounded p-3 border border-slate-700">
      <div className="grid grid-cols-2 gap-x-3 text-xs">
        <div className="flex justify-between">
          <span>Attack</span>
          <span className="font-bold">
            {format(stats.attack)}
            {stats.currentAttack < stats.attack && (
              <span className="text-cyan-400 ml-1">
                → {format(stats.currentAttack)}
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Defense</span>
          <span className="font-bold">
            {format(stats.defense)}
            {stats.currentDefense < stats.defense && (
              <span className="text-red-400 ml-1">
                → {format(stats.currentDefense)}
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Speed</span>
          <span className="font-bold">{format(stats.speed)}</span>
        </div>
        {(!hideZeroRegen || stats.healthRegen !== 0) && (
          <div className="flex justify-between">
            <span>Health Regen</span>
            <span className="font-bold text-green-400">
              {format(stats.healthRegen)}
            </span>
          </div>
        )}
        {(!hideZeroRegen || stats.shieldRegen !== 0) && (
          <div className="flex justify-between">
            <span>Shield Regen</span>
            <span className="font-bold text-blue-400">
              {format(stats.shieldRegen)}
            </span>
          </div>
        )}
        {stats.itemDropChance !== undefined && (
          <div className="flex justify-between">
            <span>Drop Chance</span>
            <span className="font-bold">{stats.itemDropChance}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
