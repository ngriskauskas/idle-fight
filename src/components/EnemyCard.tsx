import { useState } from "react";
import type { Enemy } from "../types/enemy";
import { ICON_MAP } from "../data/iconMap";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { AuraEffectDisplay } from "./AuraEffectDisplay";
import { SpellSection } from "./SpellSection";
import { DetailedStatsModal } from "./DetailedStatsModal";
import { CombatLogAnimation } from "./CombatLogAnimation";
import { formatNumber } from "../utils/format";

interface EnemyCardProps {
  enemy: Enemy;
}
export function EnemyCard({ enemy }: EnemyCardProps) {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const Icon = ICON_MAP[enemy.icon as keyof typeof ICON_MAP];
  return (
    <div
      className={`relative bg-slate-700 rounded-lg p-4 border ${enemy.isBoss ? "border-orange-500" : "border-red-600"}`}
    >
      <CombatLogAnimation combatant={enemy} />
      <h3 className="text-xl font-bold mb-3 text-center flex items-center justify-center gap-2">
        {Icon ? <Icon size={26} color="#fff" /> : null}
        <span>{enemy.name}</span>
        <span className="text-sm font-normal text-gray-400 ml-2">
          Lvl {enemy.level}
        </span>
        <button
          onClick={() => setShowStatsModal(true)}
          className="ml-2 px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-bold text-cyan-400 transition"
          title="View detailed stats"
        >
          Stats
        </button>
      </h3>

      <DetailedStatsModal
        combatant={enemy}
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />
      {/* Rewards Display */}
      <div className="bg-slate-600 rounded p-3 mb-4 text-xs space-y-1">
        <div className="text-yellow-300 flex justify-between">
          <span className="font-semibold">XP Reward</span>
          <span>
            {formatNumber(enemy.xpReward)} × {formatNumber(enemy.xpMultiplier)}{" "}
            = {formatNumber(Math.ceil(enemy.xpReward * enemy.xpMultiplier))}
          </span>
        </div>
        <div className="text-blue-300 flex justify-between">
          <span className="font-semibold">Drop Rate</span>
          <span>+{enemy.itemDropRateBonus}%</span>
        </div>
      </div>
      {/* Shield Bar */}
      {enemy.maxShield.total > 0 && (
        <ProgressBar
          current={enemy.shield.current}
          max={enemy.maxShield.total}
          label="Shield"
          colorClass="bg-gradient-to-r from-blue-400 to-blue-500"
          size="md"
        />
      )}
      {/* Health Bar */}
      <ProgressBar
        current={enemy.health.current}
        max={enemy.maxHealth.total}
        label="Health"
        colorClass="bg-gradient-to-r from-red-500 to-red-600"
        size="md"
      />

      {/* Mana Bar */}
      <ProgressBar
        current={enemy.mana.current}
        max={enemy.maxMana.total}
        label="Mana"
        colorClass="bg-gradient-to-r from-blue-500 to-blue-600"
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
      {/* Aura Effects */}
      <AuraEffectDisplay auras={enemy.auraEffects} />

      {/* Status Effects */}
      <StatusEffectDisplay effects={enemy.statusEffects} />
    </div>
  );
}
