import type { Spell } from "../types/spell";

const getSpellTypeColor = (spellType: string): string => {
  const colors: Record<string, string> = {
    physical: "text-red-400",
    magic: "text-blue-400",
    aura: "text-green-400",
  };
  return colors[spellType] || "text-gray-400";
};

export function SpellTooltip({ spell }: { spell: Spell }) {
  const EFFECT_COLORS: Record<string, string> = {
    damage: "text-red-400",
    defense: "text-blue-400",
    health: "text-green-400",
    maxHealth: "text-green-500",
    shield: "text-cyan-400",
    speed: "text-yellow-400",
    mana: "text-purple-400",
    manaRegen: "text-purple-300",
    manaCost: "text-purple-500",
    critChance: "text-yellow-400",
    critMultiplier: "text-yellow-300",
    healthRegen: "text-lime-400",
    shieldRegen: "text-sky-400",
    healthLeech: "text-red-300",
    manaLeech: "text-blue-300",
    itemDropChance: "text-amber-400",
    poison: "text-purple-400",
    bleed: "text-rose-400",
    fire: "text-orange-400",
    ice: "text-blue-300",
    lightning: "text-yellow-300",
  };

  const EFFECT_LABELS: Record<string, string> = {
    damage: "Damage",
    defense: "Defense",
    health: "Health",
    maxHealth: "Max Health",
    shield: "Shield",
    speed: "Speed",
    mana: "Mana",
    manaRegen: "Mana Regen",
    manaCost: "Mana Cost",
    critChance: "Crit Chance",
    critMultiplier: "Crit Multiplier",
    healthRegen: "Health Regen",
    shieldRegen: "Shield Regen",
    healthLeech: "Health Leech",
    manaLeech: "Mana Leech",
    itemDropChance: "Item Drop Chance",
    poison: "Poison",
    bleed: "Bleed",
    fire: "Fire",
    ice: "Ice",
    lightning: "Lightning",
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-48 text-sm">
      <h4 className="font-bold text-white mb-1">{spell.name}</h4>
      <p className={`text-xs ${getSpellTypeColor(spell.spellType)} mb-1`}>
        {spell.spellType.charAt(0).toUpperCase() + spell.spellType.slice(1)}
      </p>
      <p className="text-gray-300 text-xs mb-2">{spell.description}</p>
      <div className="text-xs text-gray-400 space-y-1">
        <div>Time: {spell.attackCost.base}</div>
        <div>Mana Cost: {spell.manaCost.base}</div>
        {spell.spellType === "aura" && spell.auraEffect ? (
          <>
            <div>Duration: {spell.auraEffect.baseTime}s</div>
            <div className="pt-1 border-t border-gray-700 text-xxs space-y-0.5 mt-1">
              <div className="text-gray-300 font-semibold">Effects:</div>
              {spell.auraEffect.effects.map((effect, idx) => (
                <div
                  key={idx}
                  className={`${EFFECT_COLORS[effect.type] || "text-gray-400"}`}
                >
                  <span className="font-semibold">
                    {EFFECT_LABELS[effect.type] || effect.type}
                  </span>
                  : {effect.value > 0 ? "+" : ""}
                  {effect.value}
                  {effect.valueType === "percentage" ? "%" : ""}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div>
              {spell.spellType === "magic" ? (
                <>
                  <div>Damage Multiplier: {spell.damage.base}</div>
                  <div className="text-xs text-gray-300 font-semibold">
                    = {spell.damage.base} × {spell.manaCost.base}
                  </div>
                </>
              ) : (
                <div>Damage: {spell.damage.base}</div>
              )}
            </div>
            {spell.isAoe && (
              <div className="text-green-400 font-semibold">AOE</div>
            )}
            <div className="pt-1 border-t border-gray-700 text-xxs space-y-0.5 mt-1">
              <div className="text-yellow-400">
                Crit Chance: {(spell.critChance.base * 100).toFixed(1)}%
              </div>
              <div className="text-yellow-400">
                Crit Mult: {spell.critMultiplier.base.toFixed(2)}x
              </div>
            </div>
          </>
        )}
        {spell.statusStats &&
          Object.entries(spell.statusStats).map(([key, value]) =>
            value && value.base > 0 ? (
              <div key={key} className={EFFECT_COLORS[key] || "text-gray-400"}>
                <span className="font-semibold">
                  {EFFECT_LABELS[key] ||
                    key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                : <span className="font-bold">{value.base}</span>
              </div>
            ) : null,
          )}
      </div>
    </div>
  );
}
