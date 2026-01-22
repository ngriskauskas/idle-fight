export type EffectType =
  | "damage"
  | "defense"
  | "health"
  | "shield"
  | "speed"
  | "healthRegen"
  | "shieldRegen"
  | "itemDropChance"
  | "poison"
  | "bleed"
  | "fire"
  | "ice"
  | "lightning";

export interface Effect {
  type: EffectType;
  value: number;
}

export type ActiveEffectMap = Record<EffectType, Effect>;
