import type { AuraEffect } from "../types/aura";
import { ICON_MAP } from "../data/iconMap";
import { EffectsDisplay } from "./EffectsDisplay";
import { TriggersDisplay } from "./TriggersDisplay";

interface AuraEffectDisplayProps {
  auras: AuraEffect[];
  size?: "sm" | "md" | "lg";
}

export function AuraEffectDisplay({
  auras,
  size = "md",
}: AuraEffectDisplayProps) {
  if (!auras || auras.length === 0) {
    return null;
  }

  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={`${sizeClass} space-y-2`}>
      {auras.map((aura) => {
        const Icon = ICON_MAP[aura.icon as keyof typeof ICON_MAP];
        const timePercent = (aura.currentTime / aura.totalTime) * 100;

        return (
          <div
            key={aura.id}
            className="bg-blue-900 border border-blue-700 rounded p-2 mt-2"
          >
            <div className="flex items-center gap-2 mb-1">
              {Icon && <Icon size={16} color="#60a5fa" />}
              <span className="font-semibold text-blue-400">{aura.name}</span>
              {aura.stacks > 1 && (
                <span className="text-xs bg-blue-700 rounded px-1">
                  x{aura.stacks}
                </span>
              )}
              <span className="text-xs text-blue-300 ml-auto">
                {aura.currentTime}s
              </span>
            </div>

            {/* Time bar */}
            <div className="w-full bg-blue-950 rounded h-1.5 mb-1 overflow-hidden">
              <div
                className="bg-blue-400 h-full transition-all"
                style={{ width: `${timePercent}%` }}
              />
            </div>

            {/* Effects */}
            {aura.effects.length > 0 && (
              <EffectsDisplay effects={aura.effects} size="sm" />
            )}
            {aura.scaling && (
              <div className="text-xs text-blue-300 mt-1 align-right">
                Scaling: +{aura.scaling}x per stack ({aura.stacks})
              </div>
            )}
            {aura.tickTriggers && aura.tickTriggers.length > 0 && (
              <div className="mt-1">
                <TriggersDisplay triggers={aura.tickTriggers} size="sm" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
