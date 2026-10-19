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
  return colors[spellType] || "border-slate-600 bg-slate-900 hover:bg-slate-800";
};

export function SpellItem({ spell, isEquipped, isUnlocked, spellPoints }: SpellItemProps) {
  const Icon = spell.icon ? ICON_MAP[spell.icon] : undefined;
  const canUnlock = isUnlocked || spellPoints >= spell.unlockCost;

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <SpellTooltip spell={spell} />
          {!isUnlocked && (
            <div className="bg-gray-900 border-2 border-gray-600 rounded px-3 py-2 w-48 text-xs">
              <div className="font-bold text-blue-300">
                Unlock: {spell.unlockCost} spell {spell.unlockCost === 1 ? "point" : "points"}
              </div>
              <div className={spellPoints >= spell.unlockCost ? "text-green-400" : "text-red-400"}>
                You have {spellPoints}.{" "}
                {spellPoints >= spell.unlockCost ? "Click to unlock." : "You get 1 per level."}
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="relative">
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
        {!isUnlocked && (
          // outside the button so the cost stays readable while the locked spell is faded
          <span
            className={`pointer-events-none absolute bottom-1 right-1 px-1 rounded text-[0.65rem] font-bold leading-tight ${
              canUnlock ? "bg-blue-500 text-white" : "bg-slate-900 text-gray-300"
            }`}
          >
            {spell.unlockCost} pt
          </span>
        )}
      </div>
    </Tooltip>
  );
}
