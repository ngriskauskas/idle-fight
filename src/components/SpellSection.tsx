import type { Spell } from "../types/spell";
import { SpellCard } from "./SpellCard";
import type { Combatant } from "../types/combatant";

interface SpellSectionProps {
  spells: Spell[];
  colorClass?: string;
  caster?: Combatant;
}

export function SpellSection({
  spells,
  colorClass = "bg-gradient-to-r from-purple-500 to-purple-600",
  caster,
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
              caster={caster}
            />
          ))}
        </div>
      )}
    </div>
  );
}
