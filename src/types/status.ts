export interface StatusStats {
  poison: number;
  bleed: number;
  fire: number;
  ice: number;
  lightning: number;
}

export interface StatusEffect {
  type: StatusEffectType;
  stacks: number;
}

export type StatusEffectType =
  | "poison"
  | "bleed"
  | "fire"
  | "ice"
  | "lightning";
