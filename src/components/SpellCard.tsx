import type { Spell } from "../types/spell";
import { ProgressBar } from "./ProgressBar";
import { useGameStore } from "../store/gameStore";
import type { Combatant } from "../types/combatant";
import { ICON_MAP } from "../data/iconMap";
import { EffectsDisplay } from "./EffectsDisplay";
import { formatNumber } from "../utils/format";

const getSpellTypeColor = (
  spellType: string,
): { border: string; text: string } => {
  const colors: Record<string, { border: string; text: string }> = {
    physical: { border: "border-red-600", text: "text-red-400" },
    magic: { border: "border-blue-600", text: "text-blue-400" },
    aura: { border: "border-green-600", text: "text-green-400" },
  };
  return (
    colors[spellType] || { border: "border-slate-600", text: "text-slate-400" }
  );
};

interface SpellCardProps {
  spell: Spell;
  colorClass?: string;
  caster?: Combatant;
}

export function SpellCard({
  spell,
  colorClass = "bg-gradient-to-r from-purple-500 to-purple-600",
  caster,
}: SpellCardProps) {
  const character = useGameStore((state) => state.character);
  const actualCaster = caster || character;
  const statsToUse = actualCaster.statusStats;
  const totalDamage =
    spell.spellType === "magic"
      ? spell.damage.total * spell.manaCost.total
      : spell.damage.total + Math.floor(actualCaster.attack.total);
  const totalCritChance =
    actualCaster.critChance.total + spell.critChance.total;
  const totalCritMultiplier =
    actualCaster.critMultiplier.total + spell.critMultiplier.total - 1;
  const critDamage = Math.floor(
    totalDamage *
      (actualCaster.critMultiplier.total + spell.critMultiplier.total - 1),
  );
  const typeColors = getSpellTypeColor(spell.spellType);

  const Icon = ICON_MAP[spell.icon as keyof typeof ICON_MAP];
  return (
    <div className={`bg-slate-800 rounded p-3 border-2 ${typeColors.border}`}>
      {/* Spell Header */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">
          {Icon ? <Icon size={24} color="#fff" /> : null}
        </span>
        <div className="flex-1 flex items-center gap-2">
          <span className="font-semibold text-base">{spell.name}</span>
          <span className={`text-xs px-2 py-1 rounded ${typeColors.text}`}>
            {spell.spellType.charAt(0).toUpperCase() + spell.spellType.slice(1)}
          </span>
        </div>
        <div className="bg-blue-600 rounded px-1 text-sm font-bold text-white">
          {spell.manaCost.total}
        </div>
      </div>

      {/* Spell Stats */}
      <div className="mb-2 space-y-1 text-xs bg-slate-900 rounded p-2">
        {spell.spellType === "aura" && spell.auraEffect ? (
          <>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Duration:</span>
              <span className="font-bold text-cyan-400">
                {spell.auraEffect.totalTime}s
              </span>
            </div>
            <div className="border-t border-slate-700 pt-2">
              <EffectsDisplay effects={spell.auraEffect.effects} size="sm" />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-gray-300">Damage:</span>
              <span className="font-bold text-orange-400">
                {formatNumber(totalDamage)}
              </span>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-700 text-xxs space-y-0.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Crit Chance:</span>
                <span className="font-bold text-yellow-400">
                  {(totalCritChance * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Crit Multiplier:</span>
                <span className="font-bold text-yellow-400">
                  {totalCritMultiplier.toFixed(2)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Crit Damage:</span>
                <span className="font-bold text-amber-400">
                  {formatNumber(critDamage)}
                </span>
              </div>
            </div>
            {(spell.statusStats ||
              Object.values(statsToUse).some((v) => v.total > 0)) && (
              <div className="mt-1 pt-1 border-t border-slate-700 space-y-1">
                {spell.spellType === "physical" && (
                  <>
                    {(spell.statusStats?.poison?.total || 0) +
                      statsToUse.poison.total >
                    0 ? (
                      <div className="flex justify-between">
                        <span className="text-purple-400">Poison:</span>
                        <span className="font-bold">
                          {(spell.statusStats?.poison?.total || 0) +
                            statsToUse.poison.total}
                        </span>
                      </div>
                    ) : null}
                    {(spell.statusStats?.bleed?.total || 0) +
                      statsToUse.bleed.total >
                    0 ? (
                      <div className="flex justify-between">
                        <span className="text-red-400">Bleed:</span>
                        <span className="font-bold">
                          {(spell.statusStats?.bleed?.total || 0) +
                            statsToUse.bleed.total}
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
                {spell.spellType === "magic" && (
                  <>
                    {(spell.statusStats?.fire?.total || 0) +
                      statsToUse.fire.total >
                    0 ? (
                      <div className="flex justify-between">
                        <span className="text-orange-400">Fire:</span>
                        <span className="font-bold">
                          {(spell.statusStats?.fire?.total || 0) +
                            statsToUse.fire.total}
                        </span>
                      </div>
                    ) : null}
                    {(spell.statusStats?.ice?.total || 0) +
                      statsToUse.ice.total >
                    0 ? (
                      <div className="flex justify-between">
                        <span className="text-cyan-400">Ice:</span>
                        <span className="font-bold">
                          {(spell.statusStats?.ice?.total || 0) +
                            statsToUse.ice.total}
                        </span>
                      </div>
                    ) : null}
                    {(spell.statusStats?.lightning?.total || 0) +
                      statsToUse.lightning.total >
                    0 ? (
                      <div className="flex justify-between">
                        <span className="text-yellow-400">Lightning:</span>
                        <span className="font-bold">
                          {(spell.statusStats?.lightning?.total || 0) +
                            statsToUse.lightning.total}
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Cast Progress */}
      <ProgressBar
        current={spell.attackCost.current}
        max={spell.attackCost.total}
        label=""
        colorClass={colorClass}
        showReady={true}
        size="sm"
      />
    </div>
  );
}
