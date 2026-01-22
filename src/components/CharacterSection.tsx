import { useGameStore } from "../store/gameStore";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { CombatantStats } from "./CombatantStats";
import { StatusStatsDisplay } from "./StatusStatsDisplay";
import { SpellSection } from "./SpellSection";

export function CharacterSection() {
  const character = useGameStore((state) => state.character);
  return (
    <div className="flex-initial w-96 bg-slate-700 rounded-lg p-6 border border-slate-600 self-start">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        <span>Your Character</span>
        <span className="text-blue-400">Lvl {character.level}</span>
      </h2>

      {/* Experience Bar */}
      <ProgressBar
        current={character.experience}
        max={character.experienceNeeded}
        label="Exp"
        colorClass="bg-gradient-to-r from-yellow-500 to-amber-600"
        size="md"
      />

      {/* Character Stats */}
      <div className="mb-4 mt-4">
        <CombatantStats stats={character} />
      </div>

      {/* Status Stats */}
      <div className="mb-4">
        <StatusStatsDisplay
          statusStats={character.statusStats}
          showNone={false}
        />
      </div>

      {/* Shield Bar */}
      {character.maxShield > 0 && (
        <ProgressBar
          current={character.shield}
          max={character.maxShield}
          label="Shield"
          colorClass="bg-gradient-to-r from-blue-400 to-blue-500"
          size="lg"
        />
      )}

      {/* Health Bar */}
      <ProgressBar
        current={character.health}
        max={character.maxHealth}
        label="Health"
        colorClass="bg-gradient-to-r from-green-500 to-green-600"
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

      {/* Status Effects */}
      <StatusEffectDisplay effects={character.statusEffects} />
    </div>
  );
}
