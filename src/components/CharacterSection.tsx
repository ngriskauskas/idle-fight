import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { AuraEffectDisplay } from "./AuraEffectDisplay";
import { SpellSection } from "./SpellSection";
import { DetailedStatsModal } from "./DetailedStatsModal";
import { Combatant } from "../types";
import { CombatLogAnimation } from "./CombatLogAnimation";

export function CharacterSection() {
  const character = useGameStore((state) => state.character);
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <div className="relative flex-initial w-96 bg-slate-700 rounded-lg p-6 border border-slate-600 self-start">
      <CombatLogAnimation combatant={character as Combatant} />
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        <span>Your Character</span>
        <span className="text-blue-400">Lvl {character.level}</span>
        <button
          onClick={() => setShowStatsModal(true)}
          className="ml-2 px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs font-bold text-cyan-400 transition"
          title="View detailed stats"
        >
          Stats
        </button>
      </h2>

      <DetailedStatsModal
        combatant={character as Combatant}
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />

      {/* Experience Bar */}
      <ProgressBar
        current={character.experience}
        max={character.experienceNeeded}
        label="Exp"
        colorClass="bg-gradient-to-r from-yellow-500 to-amber-600"
        size="md"
      />

      {/* Shield Bar */}
      {character.maxShield.total > 0 && (
        <ProgressBar
          current={character.shield.current}
          max={character.maxShield.total}
          label="Shield"
          colorClass="bg-gradient-to-r from-blue-400 to-blue-500"
          size="lg"
        />
      )}

      {/* Health Bar */}
      <ProgressBar
        current={character.health.current}
        max={character.maxHealth.total}
        label="Health"
        colorClass="bg-gradient-to-r from-green-500 to-green-600"
        size="lg"
      />

      {/* Mana Bar */}
      <ProgressBar
        current={character.mana.current}
        max={character.maxMana.total}
        label="Mana"
        colorClass="bg-gradient-to-r from-blue-500 to-blue-600"
        size="lg"
      />

      {/* Respawn Timer */}
      {character.currentRespawnTime > 0 && (
        <div className="mt-4 p-4 bg-red-900 border-2 border-red-500 rounded">
          <p className="text-red-400 font-bold text-center mb-3">
            Respawning in {character.currentRespawnTime}s
          </p>
          <div className="w-full bg-red-800 rounded-full h-2 overflow-hidden border border-red-600">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-100"
              style={{
                width: `${
                  (character.currentRespawnTime / character.respawnTime) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Unlocked Spells */}
      <SpellSection spells={character.spells} />

      {/* Aura Effects */}
      <AuraEffectDisplay auras={character.auraEffects} />

      {/* Status Effects */}
      <StatusEffectDisplay effects={character.statusEffects} />
    </div>
  );
}
