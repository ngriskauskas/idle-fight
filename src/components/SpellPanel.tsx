import { useState } from "react";
import { useSpellStore } from "../spellStore";
import { useCharacterStore } from "../characterStore";
import { Spell } from "../spellTypes";

function SpellTooltip({ spell }: { spell: Spell }) {
  const character = useCharacterStore((state) => state.character);
  const totalDamage = spell.damage + Math.floor(character.currentAttack);

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
      <p className="text-gray-300 text-xs mb-2">{spell.description}</p>
      <div className="text-xs text-gray-400 space-y-1">
        <div>Time: {spell.baseAttackCost}</div>
        <div>Damage: {totalDamage}</div>
        {spell.statusStats &&
          Object.entries(spell.statusStats).map(([key, value]) =>
            value > 0 ? (
              <div key={key}>
                <span className={getStatusEffectColor(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                : <span className="font-bold">{value}</span>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

export function SpellPanel() {
  const [hoveredSpell, setHoveredSpell] = useState<Spell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const spells = useSpellStore((state) => state.spells);
  const equippedSpells = useSpellStore((state) => state.equippedSpells);
  const maxEquippedSpells = useSpellStore((state) => state.maxEquippedSpells);
  const equipSpell = useSpellStore((state) => state.equipSpell);
  const unequipSpell = useSpellStore((state) => state.unequipSpell);
  const canEquipSpell = useSpellStore((state) => state.canEquipSpell);
  const character = useCharacterStore((state) => state.character);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    spell: Spell
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
      <h2 className="text-xl font-bold mb-4">Spells</h2>

      {/* Equipped Spells Summary */}
      <div className="mb-4 pb-4 border-b border-slate-500">
        <div className="text-sm font-bold text-gray-300 mb-2">
          Equipped ({equippedSpells.length}/{maxEquippedSpells}):
        </div>
        <div className="flex flex-wrap gap-2">
          {equippedSpells.length === 0 ? (
            <span className="text-xs text-gray-400">No spells equipped</span>
          ) : (
            equippedSpells.map((spellId) => {
              const spell = spells.find((s) => s.id === spellId);
              return spell ? (
                <div
                  key={spellId}
                  className="bg-slate-600 px-2 py-1 rounded text-xs font-semibold"
                >
                  {spell.icon} {spell.name}
                </div>
              ) : null;
            })
          )}
        </div>
      </div>

      {/* Spells Grid */}
      <div className="space-y-3 overflow-y-auto flex-1">
        {spells.map((spell) => {
          const isEquipped = equippedSpells.includes(spell.id);
          const canEquip = canEquipSpell(spell.id);

          return (
            <div
              key={spell.id}
              className="relative"
              onMouseEnter={(e) => handleMouseEnter(e, spell)}
              onMouseLeave={() => setHoveredSpell(null)}
            >
              <div
                className={`p-3 rounded border-2 cursor-pointer transition-all ${
                  isEquipped
                    ? "bg-blue-600 border-white shadow-lg"
                    : "bg-slate-600 border-slate-500 hover:bg-slate-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{spell.icon}</span>
                      <div>
                        <div className="font-bold text-sm">{spell.name}</div>
                        <div className="text-xs text-gray-200">
                          Damage:{" "}
                          {spell.damage + Math.floor(character.currentAttack)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (isEquipped) {
                        unequipSpell(spell.id);
                      } else if (canEquip) {
                        equipSpell(spell.id);
                      }
                    }}
                    disabled={!canEquip && !isEquipped}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      isEquipped
                        ? "bg-red-600 hover:bg-red-500 text-white"
                        : canEquip
                        ? "bg-green-600 hover:bg-green-500 text-white"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {isEquipped ? "Unequip" : canEquip ? "Equip" : "Full"}
                  </button>
                </div>
              </div>

              {/* Tooltip */}
              {hoveredSpell?.id === spell.id && (
                <div
                  className="fixed z-50 pointer-events-none"
                  style={{
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y}px`,
                  }}
                >
                  <SpellTooltip spell={spell} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
