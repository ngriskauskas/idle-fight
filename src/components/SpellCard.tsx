import type { Spell } from "../types/spell";
import { ProgressBar } from "./ProgressBar";
import { useGameStore } from "../store/gameStore";
import type { Combatant } from "../types/combatant";
import { ICON_MAP } from "../data/iconMap";

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
  const totalDamage = spell.damage + Math.floor(actualCaster.currentAttack);
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
      </div>

      {/* Spell Stats */}
      <div className="mb-2 space-y-1 text-xs bg-slate-900 rounded p-2">
        <div className="flex justify-between">
          <span className="text-gray-300">Damage:</span>
          <span className="font-bold text-orange-400">{totalDamage}</span>
        </div>
        {(spell.statusStats ||
          Object.values(statsToUse).some((v) => v > 0)) && (
          <div className="mt-1 pt-1 border-t border-slate-700 space-y-1">
            {(spell.statusStats?.poison || 0) + statsToUse.poison > 0 ? (
              <div className="flex justify-between">
                <span className="text-purple-400">Poison:</span>
                <span className="font-bold">
                  {(spell.statusStats?.poison || 0) + statsToUse.poison}
                </span>
              </div>
            ) : null}
            {(spell.statusStats?.bleed || 0) + statsToUse.bleed > 0 ? (
              <div className="flex justify-between">
                <span className="text-red-400">Bleed:</span>
                <span className="font-bold">
                  {(spell.statusStats?.bleed || 0) + statsToUse.bleed}
                </span>
              </div>
            ) : null}
            {(spell.statusStats?.fire || 0) + statsToUse.fire > 0 ? (
              <div className="flex justify-between">
                <span className="text-orange-400">Fire:</span>
                <span className="font-bold">
                  {(spell.statusStats?.fire || 0) + statsToUse.fire}
                </span>
              </div>
            ) : null}
            {(spell.statusStats?.ice || 0) + statsToUse.ice > 0 ? (
              <div className="flex justify-between">
                <span className="text-cyan-400">Ice:</span>
                <span className="font-bold">
                  {(spell.statusStats?.ice || 0) + statsToUse.ice}
                </span>
              </div>
            ) : null}
            {(spell.statusStats?.lightning || 0) + statsToUse.lightning > 0 ? (
              <div className="flex justify-between">
                <span className="text-yellow-400">Lightning:</span>
                <span className="font-bold">
                  {(spell.statusStats?.lightning || 0) + statsToUse.lightning}
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Cast Progress */}
      <ProgressBar
        current={spell.currentAttackCost}
        max={spell.attackCost}
        label=""
        colorClass={colorClass}
        showReady={true}
        size="sm"
      />
    </div>
  );
}
