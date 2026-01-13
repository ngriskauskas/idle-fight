import { CharacterStats } from "../characterStore";
import { useSpellStore } from "../spellStore";
import { ProgressBar } from "./ProgressBar";
import { StatusEffectDisplay } from "./StatusEffectDisplay";
import { CombatantStats } from "./CombatantStats";
import { StatusStatsDisplay } from "./StatusStatsDisplay";
import { SpellSection } from "./SpellSection";

interface CharacterSectionProps {
  character: CharacterStats;
}

export function CharacterSection({ character }: CharacterSectionProps) {
  const equippedSpells = useSpellStore((state) => state.getEquippedSpells());

  return (
    <div className="flex-initial w-96 bg-slate-700 rounded-lg p-6 border border-slate-600 self-start">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Character{" "}
        <span className="text-blue-400">Lvl {character.level}</span>
      </h2>

      {/* Character Stats */}
      <div className="mb-4">
        <CombatantStats stats={character} />
      </div>

      {/* Status Stats */}
      <div className="mb-4">
        <StatusStatsDisplay statusStats={character.statusStats} />
      </div>

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

      {/* Experience Bar */}
      <ProgressBar
        current={character.experience}
        max={character.experienceNeeded}
        label="Exp"
        colorClass="bg-gradient-to-r from-yellow-500 to-amber-600"
        size="md"
      />

      {/* Equipped Spells */}
      <SpellSection spells={equippedSpells} />

      {/* Status Effects */}
      <StatusEffectDisplay effects={character.statusEffects} />
    </div>
  );
}
