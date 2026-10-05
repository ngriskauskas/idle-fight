import { AuraSpell, MagicSpell, PhysicalSpell } from "./spell";
import { StatusEffectType } from "./status";

export type TriggerType =
  | "onHit"
  | "onCrit"
  | "onKill"
  | "onTakeDamage"
  | "onTakeAttack"
  | "onEnemySpawn"
  | "onLowHealth"
  | "onFullMana"
  | "tickTrigger"
  | "onBleedChange"
  | "onDeath";

export type TriggerAction =
  | "speedBoost"
  | "castSpell"
  | "castAura"
  | "castAuraAll"
  | "poisonAll"
  | "poisonAoe"
  | "poisonSpread"
  | "multiplyPoison"
  | "healForBleedStacks"
  | "minusDefensePerBleedStack"
  | "applyStatus"
  | "applyStatusSelf"
  | "applyStatusAoe"
  | "multiplyStatus"
  | "spreadStatus"
  | "shatterStatus"
  | "healPerOwnStatus"
  | "gainShield"
  | "gainMana";

export interface Trigger {
  id: string;
  type: TriggerType;
  action: TriggerAction;
  chance?: number;
  value?: number;
  status?: StatusEffectType;
  spell?: PhysicalSpell | MagicSpell | AuraSpell;
}
