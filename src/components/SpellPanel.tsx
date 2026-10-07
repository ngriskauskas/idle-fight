import { useGameStore } from "../store/gameStore";
import { SpellItem } from "./SpellItem";
import type { Character } from "../types/character";
import { FaLock } from "react-icons/fa";
import { getNextSpellSlotLevel } from "../logic/characterActions";

const getSpellTypeName = (type: string): string => {
  const names: Record<string, string> = {
    aura: "Auras",
    physical: "Physical",
    magic: "Magic",
  };
  return names[type] || type;
};

const getSpellTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    aura: "text-green-400",
    physical: "text-red-400",
    magic: "text-blue-400",
  };
  return colors[type] || "text-gray-400";
};

export function SpellPanel() {
  const character = useGameStore((state) => state.friends.find((c) => c.id === "main")!) as Character;
  const allSpells = useGameStore((state) => state.spells);
  const spellPoints = useGameStore((state) => state.spellPoints);
  const equippedSpells = character.spells;
  const freeSlots = Math.max(0, character.spellCount - equippedSpells.length);
  const nextSlotLevel = getNextSpellSlotLevel(character.level);

  // Group spells by type
  const spellsByType = allSpells.reduce(
    (acc, spell) => {
      if (!acc[spell.spellType]) {
        acc[spell.spellType] = [];
      }
      acc[spell.spellType].push(spell);
      return acc;
    },
    {} as Record<string, typeof allSpells>,
  );

  const spellTypeOrder = ["aura", "physical", "magic"];

  return (
    <div className="bg-slate-700 rounded-lg p-3 lg:p-4 border border-slate-600 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Spells</h2>
        <div className="text-sm font-bold text-blue-300">Points: {spellPoints}</div>
      </div>

      {/* Equipped Spells: one box per slot, then the next slot to unlock */}
      <div className="mb-4 pb-4 border-b border-slate-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-300">
            Spell Slots:{" "}
            <span className={freeSlots > 0 ? "text-yellow-300" : "text-gray-300"}>
              {equippedSpells.length} / {character.spellCount}
            </span>
          </span>
          {freeSlots > 0 && (
            <span className="text-xs font-bold text-yellow-300 animate-pulse">
              {freeSlots} free
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {equippedSpells.map((spell) => (
            <SpellItem
              key={spell.id}
              spell={spell}
              isEquipped={true}
              isUnlocked={spell.unlocked}
              spellPoints={spellPoints}
            />
          ))}
          {Array.from({ length: freeSlots }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-16 h-16 rounded border-2 border-dashed border-yellow-400/70 bg-slate-800 flex items-center justify-center text-xs text-yellow-300/80"
              title="Empty spell slot. Click an unlocked spell below to equip it"
            >
              Empty
            </div>
          ))}
          {nextSlotLevel !== undefined && (
            <div
              className="w-16 h-16 rounded border-2 border-dashed border-slate-500 bg-slate-800/50 flex flex-col items-center justify-center gap-1 text-xs text-gray-400"
              title={`Next spell slot unlocks at level ${nextSlotLevel}`}
            >
              <FaLock size={14} />
              <span>Lvl {nextSlotLevel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Spells by Type */}
      <div className="overflow-y-auto flex-1 min-h-[12rem] pr-2 space-y-4">
        {spellTypeOrder.map((type) => {
          const spells = spellsByType[type];
          if (!spells || spells.length === 0) return null;

          return (
            <div key={type}>
              <h3 className={`text-sm font-bold ${getSpellTypeColor(type)} mb-2`}>
                {getSpellTypeName(type)}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2 p-1 sm:p-2">
                {spells.map((spell) => {
                  const isEquipped = equippedSpells.some((s) => s.id === spell.id);
                  const isUnlocked = spell.unlocked;

                  return (
                    <SpellItem
                      key={spell.id}
                      spell={spell}
                      isEquipped={isEquipped}
                      isUnlocked={isUnlocked}
                      spellPoints={spellPoints}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
