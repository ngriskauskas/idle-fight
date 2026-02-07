import type { Effect } from "../types/effect";

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

interface EffectsDisplayProps {
  effects: Effect[];
  size?: "sm" | "md" | "lg";
}

export function EffectsDisplay({ effects, size = "md" }: EffectsDisplayProps) {
  if (!effects || effects.length === 0) {
    return null;
  }

  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={`${sizeClass} space-y-1`}>
      {effects.map((effect, index) => {
        const isPercentage =
          effect.valueType === "percentage" ||
          effect.type === "itemDropChance" ||
          effect.type === "critChance";

        const isSet = effect.priority === "set";

        const displayValue = isPercentage ? `${effect.value}%` : effect.value;
        const prefix = isSet ? "=" : effect.value < 0 ? "" : "+";

        return (
          <div
            key={`${effect.type}-${effect.valueType}-${index}`}
            className="flex justify-between"
          >
            <span className={EFFECT_COLORS[effect.type]}>
              {EFFECT_LABELS[effect.type]}:
            </span>
            <span className="font-semibold text-white">
              {prefix}
              {displayValue}
            </span>
          </div>
        );
      })}
    </div>
  );
}
