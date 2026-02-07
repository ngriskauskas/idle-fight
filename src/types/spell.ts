import { AuraEffect } from "./aura";
import { CombatStat } from "./combatStat";

export interface Spell {
  id: string;
  name: string;
  description: string;
  attackCost: CombatStat;
  spellType: "physical" | "magic" | "aura";
  auraEffect?: AuraEffect;
  unlocked: boolean;
  unlockCost: number;
  critChance: CombatStat;
  critMultiplier: CombatStat;
  manaCost: CombatStat;
  damage: CombatStat;
  isAoe: boolean;
  isSelfTargeted?: boolean;
  statusStats: Partial<{
    poison: CombatStat;
    bleed: CombatStat;
    fire: CombatStat;
    ice: CombatStat;
    lightning: CombatStat;
  }>;
  icon: string;
}
