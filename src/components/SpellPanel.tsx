import { useGameStore } from "../store/gameStore";
import { SpellItem } from "./SpellItem";

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
  const character = useGameStore((state) => state.character);
  const allSpells = useGameStore((state) => state.spells);
  const spellPoints = useGameStore((state) => state.spellPoints);
  const equippedSpells = character.spells;

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
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Spells</h2>
        <div className="text-sm font-bold text-blue-300">
          Points: {spellPoints}
        </div>
      </div>

      {/* Equipped Spells Summary */}
      <div className="mb-4 pb-4 border-b border-slate-500">
        <div className="text-sm font-bold text-gray-300 mb-2">
          Equipped ({equippedSpells.length}):
        </div>
        <div className="flex flex-wrap gap-2">
          {equippedSpells.length === 0 ? (
            <span className="text-xs text-gray-400">No spells equipped</span>
          ) : (
            equippedSpells.map((spell) => {
              const isUnlocked = spell.unlocked;
              return (
                <SpellItem
                  key={spell.id}
                  spell={spell}
                  isEquipped={true}
                  isUnlocked={isUnlocked}
                  spellPoints={spellPoints}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Spells by Type */}
      <div className="overflow-y-auto flex-1 pr-2 space-y-4">
        {spellTypeOrder.map((type) => {
          const spells = spellsByType[type];
          if (!spells || spells.length === 0) return null;

          return (
            <div key={type}>
              <h3
                className={`text-sm font-bold ${getSpellTypeColor(type)} mb-2`}
              >
                {getSpellTypeName(type)}
              </h3>
              <div className="grid grid-cols-4 gap-2 p-2">
                {spells.map((spell) => {
                  const isEquipped = equippedSpells.some(
                    (s) => s.id === spell.id,
                  );
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
