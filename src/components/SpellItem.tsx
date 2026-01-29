import type { Spell } from "../types/spell";
import { ICON_MAP } from "../data/iconMap";
import { spellActions } from "../logic/spellActions";
import { SpellTooltip } from "./SpellTooltip";
import { Tooltip } from "./Tooltip";

interface SpellItemProps {
  spell: Spell;
  isEquipped: boolean;
  isUnlocked: boolean;
  spellPoints: number;
}

const getSpellTypeColor = (spellType: string): string => {
  const colors: Record<string, string> = {
    physical: "border-red-600 bg-red-950 hover:bg-red-900",
    magic: "border-blue-600 bg-blue-950 hover:bg-blue-900",
    aura: "border-green-600 bg-green-950 hover:bg-green-900",
  };
  return (
    colors[spellType] || "border-slate-600 bg-slate-900 hover:bg-slate-800"
  );
};

export function SpellItem({
  spell,
  isEquipped,
  isUnlocked,
  spellPoints,
}: SpellItemProps) {
  const Icon = spell.icon ? ICON_MAP[spell.icon] : undefined;
  const canUnlock = isUnlocked || spellPoints >= spell.unlockCost;

  return (
    <Tooltip content={<SpellTooltip spell={spell} />}>
      <button
        onClick={() => {
          if (!canUnlock) return;
          if (!isUnlocked) {
            spellActions.unlockSpell(spell.id);
          } else if (isEquipped) {
            spellActions.unequipSpell(spell.id);
          } else {
            spellActions.equipSpell(spell.id);
          }
        }}
        className={`w-16 h-16 rounded border-2 flex flex-col items-center justify-center transition ${getSpellTypeColor(spell.spellType)} ${
          !isUnlocked
            ? "opacity-35"
            : isEquipped
              ? "opacity-100 ring-2 ring-yellow-400"
              : "opacity-100"
        } ${!canUnlock ? "cursor-not-allowed" : "cursor-pointer"}`}
        title={spell.name}
      >
        {Icon ? <Icon size={24} color="#fff" /> : null}
      </button>
    </Tooltip>
  );
}
