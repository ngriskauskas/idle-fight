import type { Character, Combatant, CombatStat, EffectType } from "../types";
import { ICON_MAP } from "../data/iconMap";
import { Tooltip } from "./Tooltip";
import { formatNumber, formatPercent } from "../utils/format";
import { TriggersDisplay } from "./TriggersDisplay";

interface StatLineProps {
  label: string;
  stat: CombatStat;
  effectType: EffectType;
  combatant: Combatant;
  format: (value: number) => string;
}

function StatLine({
  label,
  stat,
  effectType,
  combatant,
  format,
}: StatLineProps) {
  const activeEffects = combatant.appliedEffects[effectType] || [];
  const flatEffects = activeEffects.filter(
    (ae) => ae.effect.valueType === "flat",
  );
  const percentageEffects = activeEffects.filter(
    (ae) => ae.effect.valueType === "percentage",
  );

  const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case "talent":
        return "text-purple-400";
      case "item":
        return "text-yellow-400";
      case "aura":
        return "text-pink-400";
      default:
        return "text-gray-400";
    }
  };

  const tooltipContent = (
    <div className="bg-slate-900 border border-slate-700 rounded p-4 text-xs w-48">
      <div className="flex justify-between mb-2">
        <span>Base</span>
        <span className="font-mono">{format(stat.base)}</span>
      </div>

      {flatEffects.map((ae) => {
        const isPercentageStat =
          effectType === "critChance" || effectType === "itemDropChance";
        const displayValue =
          ae.effect.priority === "set"
            ? `=${ae.effect.value}`
            : isPercentageStat
              ? `${ae.effect.value > 0 ? "+" : ""}${(ae.effect.value / 100) * 100}%`
              : `${ae.effect.value > 0 ? "+" : ""}${format(ae.effect.value)}`;
        return (
          <div key={ae.id} className="flex justify-between">
            <span className={getTypeColor(ae.type)}>
              {ae.type.charAt(0).toUpperCase() + ae.type.slice(1)}: {ae.name}
            </span>
            <span className="font-mono text-green-400">{displayValue}</span>
          </div>
        );
      })}

      {percentageEffects.map((ae) => (
        <div key={ae.id} className="flex justify-between">
          <span className={getTypeColor(ae.type)}>
            {ae.type.charAt(0).toUpperCase() + ae.type.slice(1)}: {ae.name}
          </span>
          <span className="font-mono text-blue-400">
            {ae.effect.value > 0 ? "+" : ""}
            {ae.effect.value}%
          </span>
        </div>
      ))}

      {
        <>
          <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-600 mt-2">
            <span>Total</span>
            <span className="font-mono">{format(stat.total)}</span>
          </div>
        </>
      }
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div className="border border-slate-700 rounded mb-2 px-3 py-2 flex justify-between items-center text-sm hover:bg-slate-700">
        <span>{label}</span>
        <span className="font-mono font-bold">{format(stat.total)}</span>
      </div>
    </Tooltip>
  );
}

interface DetailedStatsModalProps {
  combatant: Combatant;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailedStatsModal({
  combatant,
  isOpen,
  onClose,
}: DetailedStatsModalProps) {
  if (!isOpen) return null;

  const format = formatNumber;
  const percentFormat = formatPercent;
  const Icon = ICON_MAP[combatant.icon as keyof typeof ICON_MAP];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg p-6 border-2 border-slate-600 max-w-6xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {Icon && <Icon size={40} color="#fff" />}
            <div>
              <h2 className="text-3xl font-bold text-white">
                {combatant.name}
              </h2>
              <p className="text-sm text-gray-400">Level {combatant.level}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Combat Stats */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-3">Combat</h3>
            <StatLine
              label="Attack"
              stat={combatant.attack}
              effectType="damage"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Defense"
              stat={combatant.defense}
              effectType="defense"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Speed"
              stat={combatant.speed}
              effectType="speed"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Crit Chance"
              stat={combatant.critChance}
              effectType="critChance"
              combatant={combatant}
              format={percentFormat}
            />
            <StatLine
              label="Crit Multiplier"
              stat={combatant.critMultiplier}
              effectType="critMultiplier"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Mana Cost"
              stat={combatant.manaCost}
              effectType="manaCost"
              combatant={combatant}
              format={format}
            />
          </div>

          {/* Health & Resources */}
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-3">
              Health & Resources
            </h3>
            <StatLine
              label="Health"
              stat={combatant.maxHealth}
              effectType="health"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Shield"
              stat={combatant.maxShield}
              effectType="shield"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Mana"
              stat={combatant.maxMana}
              effectType="mana"
              combatant={combatant}
              format={format}
            />
          </div>

          {/* Regeneration */}
          <div>
            <h3 className="text-lg font-bold text-green-500 mb-3">
              Regeneration
            </h3>
            <StatLine
              label="Health Regen"
              stat={combatant.healthRegen}
              effectType="healthRegen"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Shield Regen"
              stat={combatant.shieldRegen}
              effectType="shieldRegen"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Mana Regen"
              stat={combatant.manaRegen}
              effectType="manaRegen"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Health Leech"
              stat={combatant.healthLeech}
              effectType="healthLeech"
              combatant={combatant}
              format={format}
            />
            <StatLine
              label="Mana Leech"
              stat={combatant.manaLeech}
              effectType="manaLeech"
              combatant={combatant}
              format={format}
            />
          </div>

          {/* Costs & Drops */}
          {combatant.isMainCharacter && (
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Other</h3>
              <StatLine
                label="Drop Chance"
                stat={(combatant as Character).itemDropChance}
                effectType="itemDropChance"
                combatant={combatant}
                format={percentFormat}
              />
            </div>
          )}

          {/* Status Stats */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold text-red-400 mb-3">
              Status Effects
            </h3>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <StatLine
                label="Poison"
                stat={combatant.statusStats.poison}
                effectType="poison"
                combatant={combatant}
                format={format}
              />
              <StatLine
                label="Bleed"
                stat={combatant.statusStats.bleed}
                effectType="bleed"
                combatant={combatant}
                format={format}
              />
              <StatLine
                label="Fire"
                stat={combatant.statusStats.fire}
                effectType="fire"
                combatant={combatant}
                format={format}
              />
              <StatLine
                label="Ice"
                stat={combatant.statusStats.ice}
                effectType="ice"
                combatant={combatant}
                format={format}
              />
              <StatLine
                label="Lightning"
                stat={combatant.statusStats.lightning}
                effectType="lightning"
                combatant={combatant}
                format={format}
              />
            </div>
          </div>
        </div>

        {/* Section to display all triggers for a combatant */}
        {combatant.triggers &&
          Object.values(combatant.triggers).flat().length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">Triggers</h3>
              <TriggersDisplay
                triggers={Object.values(combatant.triggers || {}).flat()}
                size="md"
              />
            </div>
          )}
      </div>
    </div>
  );
}
