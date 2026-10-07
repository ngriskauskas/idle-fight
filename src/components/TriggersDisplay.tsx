import type { Trigger, TriggerAction, TriggerType } from "../types/triggers";
import { SpellTooltip } from "./SpellTooltip";
import { Tooltip } from "./Tooltip";

interface TriggersDisplayProps {
  triggers: Trigger[];
  size?: "sm" | "md";
}

export function TriggersDisplay({ triggers, size = "md" }: TriggersDisplayProps) {
  if (!triggers || triggers.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      {triggers.map((trigger) => (
        <div key={trigger.id} className="flex flex-wrap items-center gap-x-2">
          <span className="font-bold text-blue-400">
            {TRIGGER_TYPE_LABELS[trigger.type] || trigger.type}
          </span>
          <span className="text-gray-300">→</span>
          <span className="font-bold text-green-400">
            {TRIGGER_ACTION_LABELS[trigger.action] || trigger.action}
          </span>
          {trigger.status && <span className="text-orange-300 capitalize">{trigger.status}</span>}
          {trigger.chance !== undefined && (
            <span className="text-yellow-300 ml-2">{trigger.chance}%</span>
          )}
          {trigger.value !== undefined && (
            <span className="text-cyan-300 ml-2"> {trigger.value}</span>
          )}
          {trigger.spell && (
            <Tooltip content={<SpellTooltip spell={trigger.spell} />}>
              <span className="text-purple-300 ml-2 underline ">{trigger.spell.name}</span>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
}

const TRIGGER_TYPE_LABELS: Record<TriggerType, string> = {
  onHit: "On Hit",
  onCrit: "On Crit",
  onKill: "On Kill",
  onTakeDamage: "On Take Damage",
  onTakeAttack: "On Take Attack",
  onEnemySpawn: "On Enemy Spawn",
  onLowHealth: "On Low Health",
  onFullMana: "On Full Mana",
  tickTrigger: "Aura Per Tick",
  onDeath: "On Enemy Death",
  onBleedChange: "On Bleed Change",
};

const TRIGGER_ACTION_LABELS: Record<TriggerAction, string> = {
  speedBoost: "Speed Boost",
  castSpell: "Cast Spell",
  castAura: "Cast Aura",
  poisonAll: "Poison All",
  castAuraAll: "Cast Aura All",
  poisonAoe: "Poison AoE",
  poisonSpread: "Poison Spread",
  multiplyPoison: "Multiply Poison",
  healForBleedStacks: "Heal per Bleed",
  minusDefensePerBleedStack: "-Defense per Bleed",
  applyStatus: "Apply",
  applyStatusSelf: "Apply to Self",
  applyStatusAoe: "Apply to All Enemies",
  multiplyStatus: "Multiply",
  spreadStatus: "Spread to Others",
  shatterStatus: "Shatter (Damage per Stack)",
  healPerOwnStatus: "Heal per Own Stack",
  gainShield: "Gain Shield",
  gainMana: "Gain Mana",
};
