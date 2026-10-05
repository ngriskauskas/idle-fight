import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { Spell } from "../types/spell";
import { SpellCard } from "./SpellCard";
import type { Combatant } from "../types/combatant";
import { ICON_MAP } from "../data/iconMap";

interface SpellSlots {
  total: number;
  nextLevel?: number;
}

interface SpellSectionProps {
  spells: Spell[];
  colorClass?: string;
  caster: Combatant;
  // when given, the section gets a header with slot pips and can be collapsed
  slots?: SpellSlots;
}

const SLOT_UNLOCK_FLASH_MS = 5000;

// true for a few seconds after the slot count goes up
function useSlotUnlocked(total: number | undefined): boolean {
  const prevTotal = useRef(total);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const increased =
      total !== undefined && prevTotal.current !== undefined && total > prevTotal.current;
    prevTotal.current = total;
    if (!increased) return;
    setUnlocked(true);
    const timeout = setTimeout(() => setUnlocked(false), SLOT_UNLOCK_FLASH_MS);
    return () => clearTimeout(timeout);
  }, [total]);

  return unlocked;
}

function CompactSpellRow({ spell, colorClass }: { spell: Spell; colorClass: string }) {
  const Icon = ICON_MAP[spell.icon as keyof typeof ICON_MAP];
  const percentage = Math.min(100, (spell.attackCost.current / spell.attackCost.total) * 100);

  return (
    <div className="flex items-center gap-2 bg-slate-800 rounded px-2 py-1">
      <span className="w-4 flex-shrink-0">{Icon ? <Icon size={16} color="#fff" /> : null}</span>
      <span className="w-28 text-xs font-semibold truncate">{spell.name}</span>
      <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-600">
        <div
          className={`h-full transition-all duration-100 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function SpellSection({
  spells,
  colorClass = "bg-gradient-to-r from-purple-500 to-purple-600",
  caster,
  slots,
}: SpellSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const slotUnlocked = useSlotUnlocked(slots?.total);
  const freeSlots = slots ? Math.max(0, slots.total - spells.length) : 0;

  return (
    <div className="mt-6">
      {slots && (
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-left text-sm font-bold text-gray-300 hover:text-white transition"
          title={collapsed ? "Expand spells" : "Collapse spells"}
        >
          {collapsed ? <FaChevronRight size={10} /> : <FaChevronDown size={10} />}
          <span>Spells</span>
          <span className={`flex items-center gap-1 ${slotUnlocked ? "animate-pulse" : ""}`}>
            {Array.from({ length: slots.total }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full border ${
                  i < spells.length
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-transparent border-yellow-400"
                }`}
              />
            ))}
          </span>
          <span className={`text-xs ${freeSlots > 0 ? "text-yellow-300" : "text-gray-400"}`}>
            {spells.length}/{slots.total}
          </span>
          <span className="ml-auto text-xs font-normal whitespace-nowrap">
            {slotUnlocked ? (
              <span className="font-bold text-yellow-300 animate-pulse">New slot!</span>
            ) : freeSlots > 0 ? (
              <span className="text-yellow-300">{freeSlots} free</span>
            ) : slots.nextLevel !== undefined ? (
              <span className="text-gray-400">Next slot: Lvl {slots.nextLevel}</span>
            ) : null}
          </span>
        </button>
      )}
      {spells.length === 0 ? (
        <div className="p-4 bg-slate-800 rounded text-center text-gray-400 text-sm">No spells</div>
      ) : slots && collapsed ? (
        <div className="space-y-1">
          {spells.map((spell) => (
            <CompactSpellRow key={spell.id} spell={spell} colorClass={colorClass} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {spells.map((spell) => (
            <SpellCard key={spell.id} spell={spell} colorClass={colorClass} caster={caster} />
          ))}
        </div>
      )}
    </div>
  );
}
