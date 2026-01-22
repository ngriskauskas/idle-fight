import type { Enemy } from "../types/enemy";
import { ICON_MAP } from "../data/iconMap";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { CombatantStats } from "./CombatantStats";
import { StatusStatsDisplay } from "./StatusStatsDisplay";
import { SpellSection } from "./SpellSection";

interface EnemyCardProps {
  enemy: Enemy;
}

export function EnemyCard({ enemy }: EnemyCardProps) {
  const Icon = ICON_MAP[enemy.icon as keyof typeof ICON_MAP];
  return (
    <div
      className={`bg-slate-700 rounded-lg p-4 border ${enemy.isBoss ? "border-orange-500" : "border-red-600"}`}
    >
      <h3 className="text-xl font-bold mb-3 text-center flex items-center justify-center gap-2">
        {Icon ? <Icon size={26} color="#fff" /> : null}
        <span>{enemy.name}</span>
        <span className="text-sm font-normal text-gray-400 ml-2">
          Lvl {enemy.level}
        </span>
      </h3>
      {/* Rewards Display */}
      <div className="bg-slate-600 rounded p-3 mb-4 text-xs space-y-1">
        <div className="text-yellow-300 flex justify-between">
          <span className="font-semibold">XP Reward</span>
          <span>
            {Math.pow(1.5, enemy.level - 1).toFixed(1)} × {enemy.xpMultiplier} ={" "}
            {enemy.xpReward} XP
          </span>
        </div>
        <div className="text-blue-300 flex justify-between">
          <span className="font-semibold">Drop Rate</span>
          <span>+{enemy.itemDropRateBonus}%</span>
        </div>
      </div>
      {/* Enemy Stats */}
      <div className="mb-4">
        <CombatantStats
          stats={enemy}
          showDecimals={true}
          hideZeroRegen={true}
        />
      </div>
      {/* Status Stats */}
      <div className="mb-4">
        <StatusStatsDisplay statusStats={enemy.statusStats} showNone={false} />
      </div>
      {/* Shield Bar */}
      {enemy.maxShield > 0 && (
        <ProgressBar
          current={enemy.shield}
          max={enemy.maxShield}
          label="Shield"
          colorClass="bg-gradient-to-r from-blue-400 to-blue-500"
          size="md"
        />
      )}
      {/* Health Bar */}
      <ProgressBar
        current={enemy.health}
        max={enemy.maxHealth}
        label="Health"
        colorClass="bg-gradient-to-r from-red-500 to-red-600"
        size="md"
      />
      {/* Spells */}
      <SpellSection
        spells={enemy.spells}
        caster={enemy}
        colorClass={
          enemy.statusEffects.some((e) => e.type === "ice")
            ? "bg-gradient-to-r from-cyan-500 to-cyan-600"
            : "bg-gradient-to-r from-orange-500 to-orange-600"
        }
      />
      {/* Status Effects */}
      <StatusEffectDisplay effects={enemy.statusEffects} />
    </div>
  );
}
