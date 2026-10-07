import { useState } from "react";
import type { Enemy } from "../types/enemy";
import type { Character } from "../types/character";
import { ICON_MAP } from "../data/iconMap";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { AuraEffectDisplay } from "./AuraEffectDisplay";
import { SpellSection } from "./SpellSection";
import { DetailedStatsModal } from "./DetailedStatsModal";
import { CombatLogAnimation } from "./CombatLogAnimation";
import { formatNumber } from "../utils/format";
import { Combatant } from "../types";
import { getNextSpellSlotLevel } from "../logic/characterActions";

interface CombatantCardProps {
  combatant: Combatant;
}
export function CombatantCard({ combatant }: CombatantCardProps) {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const Icon = ICON_MAP[combatant.icon as keyof typeof ICON_MAP];
  const borderClass = combatant.isMainCharacter
    ? "border-slate-600"
    : combatant.isEnemy
      ? (combatant as Enemy).isBoss
        ? "border-orange-500"
        : "border-red-600"
      : "border-green-600";

  return (
    <div className={`relative bg-slate-700 rounded-lg p-2 sm:p-4 border ${borderClass}`}>
      <CombatLogAnimation combatant={combatant} />
      <h3 className="text-base sm:text-xl font-bold mb-3 text-center flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {combatant.isMainCharacter ? (
          <span>Character</span>
        ) : (
          <>
            {Icon ? <Icon size={26} color="#fff" /> : null}
            <span>{combatant.name}</span>
          </>
        )}
        <span className="text-sm font-normal text-gray-400 sm:ml-2">Lvl {combatant.level}</span>
        <button
          onClick={() => setShowStatsModal(true)}
          className="sm:ml-2 px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-bold text-cyan-400 transition"
          title="View detailed stats"
        >
          Stats
        </button>
      </h3>

      <DetailedStatsModal
        combatant={combatant}
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />

      {/* Character-specific: Experience Bar */}
      {combatant.isMainCharacter && (
        <ProgressBar
          current={(combatant as Character).experience}
          max={(combatant as Character).experienceNeeded}
          label="Exp"
          colorClass="bg-gradient-to-r from-yellow-500 to-amber-600"
          size="md"
        />
      )}

      {/* Rewards Display */}
      {combatant.isEnemy && (
        <div className="bg-slate-600 rounded p-2 sm:p-3 mb-4 text-xs space-y-1">
          <div className="text-yellow-300 flex flex-wrap justify-between gap-x-2">
            <span className="font-semibold">XP Reward</span>
            <span>
              {formatNumber((combatant as Enemy).xpReward)} ×{" "}
              {formatNumber((combatant as Enemy).xpMultiplier)} ={" "}
              {formatNumber(
                Math.ceil((combatant as Enemy).xpReward * (combatant as Enemy).xpMultiplier),
              )}
            </span>
          </div>
          <div className="text-blue-300 flex flex-wrap justify-between gap-x-2">
            <span className="font-semibold">Drop Rate</span>
            <span>+{(combatant as Enemy).itemDropRateBonus}%</span>
          </div>
        </div>
      )}

      {/* Shield Bar */}
      {combatant.maxShield.total > 0 && (
        <ProgressBar
          current={combatant.shield.current}
          max={combatant.maxShield.total}
          label="Shield"
          colorClass="bg-gradient-to-r from-blue-400 to-blue-500"
          size="md"
        />
      )}

      {/* Health Bar */}
      <ProgressBar
        current={combatant.health.current}
        max={combatant.maxHealth.total}
        label="Health"
        colorClass="bg-gradient-to-r from-red-500 to-red-600"
        size="md"
      />

      {/* Mana Bar */}
      <ProgressBar
        current={combatant.mana.current}
        max={combatant.maxMana.total}
        label="Mana"
        colorClass="bg-gradient-to-r from-blue-500 to-blue-600"
        size="md"
      />

      {/* Character-specific: Respawn Timer */}
      {combatant.isMainCharacter && (combatant as Character).currentRespawnTime > 0 && (
        <div className="mt-4 p-2 sm:p-4 bg-red-900 border-2 border-red-500 rounded">
          <p className="text-red-400 font-bold text-center mb-3">
            Respawning in {(combatant as Character).currentRespawnTime}s
          </p>
          <div className="w-full bg-red-800 rounded-full h-2 overflow-hidden border border-red-600">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-100"
              style={{
                width: `${((combatant as Character).currentRespawnTime / (combatant as Character).respawnTime) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Spells */}
      <SpellSection
        spells={combatant.spells}
        caster={combatant}
        slots={
          combatant.isMainCharacter
            ? {
                total: (combatant as Character).spellCount,
                nextLevel: getNextSpellSlotLevel(combatant.level),
              }
            : undefined
        }
        colorClass={
          combatant.statusEffects.some((e) => e.type === "ice")
            ? "bg-gradient-to-r from-cyan-500 to-cyan-600"
            : "bg-gradient-to-r from-orange-500 to-orange-600"
        }
      />

      {/* Aura Effects */}
      <AuraEffectDisplay auras={combatant.auraEffects} />

      {/* Status Effects */}
      <StatusEffectDisplay effects={combatant.statusEffects} />
    </div>
  );
}
