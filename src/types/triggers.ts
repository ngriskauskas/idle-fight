import { Spell } from "./spell";

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
  | "onDeath";

export type TriggerAction =
  | "speedBoost"
  | "castSpell"
  | "castAura"
  | "castAuraAll"
  | "poisonAll"
  | "poisonAoe"
  | "poisonSpread";

export interface Trigger {
  id: string;
  type: TriggerType;
  action: TriggerAction;
  chance?: number;
  value?: number;
  spell?: Spell;
}
