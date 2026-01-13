import type { Attack, Combatant } from "./utils/combatCalculations";

export interface Spell {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  damage: number;
  baseAttackCost: number;
  attackCost: number;
  currentAttackCost: number;
  statusStats?: {
    poison?: number;
    bleed?: number;
    fire?: number;
    ice?: number;
    lightning?: number;
  };
  onCast: (caster: Combatant) => Attack;
}
