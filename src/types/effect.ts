export type EffectType =
  | "damage"
  | "defense"
  | "health"
  | "shield"
  | "speed"
  | "mana"
  | "manaRegen"
  | "manaCost"
  | "critChance"
  | "critMultiplier"
  | "healthRegen"
  | "shieldRegen"
  | "healthLeech"
  | "manaLeech"
  | "itemDropChance"
  | "poison"
  | "bleed"
  | "fire"
  | "ice"
  | "lightning";

export type EffectValue = "percentage" | "flat";

export type EffectPriority = "set" | "normal";

export interface Effect {
  type: EffectType;
  value: number;
  valueType: EffectValue;
  priority: EffectPriority;
}
