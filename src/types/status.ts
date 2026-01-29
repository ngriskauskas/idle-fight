import { CombatStat } from "./combatStat";

export interface StatusStats {
  poison: CombatStat;
  bleed: CombatStat;
  fire: CombatStat;
  ice: CombatStat;
  lightning: CombatStat;
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
