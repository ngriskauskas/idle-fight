import { Enemy } from "../enemyStore";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { CombatantStats } from "./CombatantStats";
import { StatusStatsDisplay } from "./StatusStatsDisplay";
import { SpellSection } from "./SpellSection";

interface EnemyCardProps {
  enemy: Enemy;
}

export function EnemyCard({ enemy }: EnemyCardProps) {
  return (
    <div
      className={`bg-slate-700 rounded-lg p-4 border ${
        enemy.isBoss ? "border-orange-500" : "border-red-600"
      }`}
    >
      <h3 className="text-xl font-bold mb-3 text-center">
        {enemy.name}
        {enemy.isBoss && (
          <span className="text-orange-400 font-bold text-lg ml-2">BOSS</span>
        )}
        <span className="text-sm font-normal text-gray-400 ml-2">
          Lvl {enemy.level}
        </span>
      </h3>

      {/* Enemy Stats */}
      <div className="mb-4">
        <CombatantStats stats={enemy} showDecimals={true} />
      </div>

      {/* Status Stats */}
      <div className="mb-4">
        <StatusStatsDisplay statusStats={enemy.statusStats} showNone={false} />
      </div>

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
