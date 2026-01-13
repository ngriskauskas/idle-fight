import { StatusEffect } from "../utils/combatCalculations";

interface StatusEffectDisplayProps {
  effects: StatusEffect[];
}

const getEffectColor = (type: string): string => {
  switch (type) {
    case "poison":
      return "bg-green-600";
    case "bleed":
      return "bg-red-600";
    case "fire":
      return "bg-orange-600";
    case "ice":
      return "bg-blue-600";
    case "lightning":
      return "bg-yellow-600";
    default:
      return "bg-slate-600";
  }
};

const getEffectLabel = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export function StatusEffectDisplay({ effects }: StatusEffectDisplayProps) {
  if (effects.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {effects.map((effect, idx) => (
        <div
          key={idx}
          className={`${getEffectColor(
            effect.type
          )} text-white px-2 py-1 rounded text-sm font-semibold`}
        >
          {getEffectLabel(effect.type)} x{effect.stacks}
        </div>
      ))}
    </div>
  );
}
