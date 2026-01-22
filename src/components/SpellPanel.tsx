import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { spellActions } from "../logic/spellActions";
import type { Spell } from "../types/spell";
import { ICON_MAP } from "../data/iconMap";

const getSpellTypeColor = (spellType: string): string => {
  const colors: Record<string, string> = {
    physical: "text-red-400",
    magic: "text-blue-400",
    aura: "text-green-400",
  };
  return colors[spellType] || "text-gray-400";
};

const getSpellTypeBorderColor = (spellType: string): string => {
  const colors: Record<string, string> = {
    physical: "border-red-600",
    magic: "border-blue-600",
    aura: "border-green-600",
  };
  return colors[spellType] || "border-slate-600";
};

function SpellTooltip({ spell }: { spell: Spell }) {
  const getStatusEffectColor = (effectType: string) => {
    const colors: Record<string, string> = {
      poison: "text-purple-400",
      bleed: "text-red-400",
      fire: "text-orange-400",
      ice: "text-cyan-400",
      lightning: "text-yellow-400",
    };
    return colors[effectType] || "text-gray-400";
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-48 text-sm">
      <h4 className="font-bold text-white mb-1">{spell.name}</h4>
      <p className={`text-xs ${getSpellTypeColor(spell.spellType)} mb-1`}>
        {spell.spellType.charAt(0).toUpperCase() + spell.spellType.slice(1)}
      </p>
      <p className="text-gray-300 text-xs mb-2">{spell.description}</p>
      <div className="text-xs text-gray-400 space-y-1">
        <div>Time: {spell.baseAttackCost}</div>
        <div>Damage: {spell.damage}</div>
        {spell.statusStats &&
          Object.entries(spell.statusStats).map(([key, value]) =>
            value > 0 ? (
              <div key={key}>
                <span className={getStatusEffectColor(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                : <span className="font-bold">{value}</span>
              </div>
            ) : null,
          )}
      </div>
    </div>
  );
}

export function SpellPanel() {
  const [hoveredSpell, setHoveredSpell] = useState<Spell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const character = useGameStore((state) => state.character);
  const allSpells = useGameStore((state) => state.spells);
  const spellPoints = useGameStore((state) => state.spellPoints);
  const equippedSpells = character.spells;

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    spell: Spell,
  ) => {
    setHoveredSpell(spell);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left - 200,
      y: rect.top,
    });
  };

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
              const Icon = spell.icon ? ICON_MAP[spell.icon] : undefined;
              return (
                <div
                  key={spell.id}
                  className={`rounded flex flex-col items-center justify-center text-xs font-semibold border-2 ${getSpellTypeBorderColor(spell.spellType)}`}
                  style={{ width: 48, height: 48 }}
                  title={spell.name}
                >
                  {Icon ? <Icon size={22} color="#fff" /> : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Spells Grid */}
      <div className="space-y-3 overflow-y-auto flex-1">
        {allSpells.map((spell) => {
          const isEquipped = equippedSpells.some((s) => s.id === spell.id);
          const isUnlocked = spell.unlocked;
          const Icon = spell.icon ? ICON_MAP[spell.icon] : undefined;

          return (
            <div
              key={spell.id}
              className="relative"
              onMouseEnter={(e) => handleMouseEnter(e, spell)}
              onMouseLeave={() => setHoveredSpell(null)}
            >
              <div
                className={`p-3 rounded border-2 cursor-pointer transition-all ${
                  !isUnlocked
                    ? `bg-slate-800 ${getSpellTypeBorderColor(spell.spellType)} opacity-75`
                    : isEquipped
                      ? `bg-blue-600 ${getSpellTypeBorderColor(spell.spellType)} shadow-lg`
                      : `bg-slate-600 ${getSpellTypeBorderColor(spell.spellType)} hover:bg-slate-500`
                }`}
              >
                <div className="flex justify-between items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    {Icon ? <Icon size={24} color="#fff" /> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{spell.name}</div>
                    <div
                      className={`text-xs py-0.5 rounded inline-block ${getSpellTypeColor(spell.spellType)}`}
                    >
                      {spell.spellType.charAt(0).toUpperCase() +
                        spell.spellType.slice(1)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => {
                        if (!isUnlocked) {
                          spellActions.unlockSpell(spell.id);
                        } else if (isEquipped) {
                          spellActions.unequipSpell(spell.id);
                        } else {
                          spellActions.equipSpell(spell.id);
                        }
                      }}
                      disabled={!isUnlocked && spellPoints < spell.unlockCost}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                        !isUnlocked
                          ? spellPoints >= spell.unlockCost
                            ? "bg-green-600 hover:bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300 cursor-not-allowed"
                          : isEquipped
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                      }`}
                    >
                      {!isUnlocked
                        ? "Unlock"
                        : isEquipped
                          ? "Unequip"
                          : "Equip"}
                    </button>
                    {!isUnlocked && (
                      <div className="text-xs text-gray-300 text-center pr-3">
                        Cost: {spell.unlockCost}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip - positioned outside scroll container */}
      {hoveredSpell && (
        <div
          className="fixed z-50"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <SpellTooltip spell={hoveredSpell} />
        </div>
      )}
    </div>
  );
}
