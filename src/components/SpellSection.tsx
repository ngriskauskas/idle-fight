import { Spell } from "../spellTypes";
import { SpellCard } from "./SpellCard";
import { StatusStats } from "../utils/combatCalculations";

interface SpellSectionProps {
  spells: Spell[];
  colorClass?: string;
  combatantStats?: StatusStats;
}

export function SpellSection({
  spells,
  colorClass = "bg-gradient-to-r from-purple-500 to-purple-600",
  combatantStats,
}: SpellSectionProps) {
  return (
    <div className="mt-6">
      {spells.length === 0 ? (
        <div className="p-4 bg-slate-800 rounded text-center text-gray-400 text-sm">
          No spells
        </div>
      ) : (
        <div className="space-y-3">
          {spells.map((spell) => (
            <SpellCard
              key={spell.id}
              spell={spell}
              colorClass={colorClass}
              combatantStats={combatantStats}
            />
          ))}
        </div>
      )}
    </div>
  );
}
