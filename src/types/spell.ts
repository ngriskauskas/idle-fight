import { AuraEffect } from "./aura";
import { CombatStat } from "./combatStat";

export type SpellType = "physical" | "magic" | "aura";

export interface PhysicalSpell extends Spell {
  spellType: "physical";
  critChance: CombatStat;
  critMultiplier: CombatStat;
  damage: CombatStat;
  // share of the caster's attack added to each hit (1 when omitted). Slow spells get more.
  attackScale?: number;
  statusStats: Partial<{
    poison: CombatStat;
    bleed: CombatStat;
  }>;
}

export interface MagicSpell extends Spell {
  spellType: "magic";
  critChance: CombatStat;
  critMultiplier: CombatStat;
  manaCost: CombatStat;
  damage: CombatStat;
  statusStats: Partial<{
    fire: CombatStat;
    ice: CombatStat;
    lightning: CombatStat;
  }>;
}

export interface AuraSpell extends Spell {
  spellType: "aura";
  auraEffect: AuraEffect;
  manaCost: CombatStat;
  isSelfTargeted: boolean;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  attackCost: CombatStat;
  spellType: SpellType;
  unlocked: boolean;
  unlockCost: number;
  isAoe: boolean;
  icon: string;
}
