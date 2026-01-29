import type { StatusEffect, StatusStats } from "./status";
import type { AuraEffect } from "./aura";
import type { Spell } from "./spell";
import type { ActiveEffect } from "./activeEffect";
import type { CombatStat } from "./combatStat";
import { EffectType } from "./effect";

export interface Combatant {
  id: string;
  name: string;
  icon: string;
  isMainCharacter: boolean;
  health: CombatStat;
  maxHealth: CombatStat;
  shield: CombatStat;
  maxShield: CombatStat;
  mana: CombatStat;
  maxMana: CombatStat;
  manaRegen: CombatStat;
  attack: CombatStat;
  defense: CombatStat;
  speed: CombatStat;
  level: number;
  healthRegen: CombatStat;
  shieldRegen: CombatStat;
  healthLeech: CombatStat;
  manaLeech: CombatStat;
  manaCost: CombatStat;
  critChance: CombatStat;
  critMultiplier: CombatStat;

  statusEffects: StatusEffect[];
  statusStats: StatusStats;
  auraEffects: AuraEffect[];
  spells: Spell[];
  appliedEffects: Record<EffectType, ActiveEffect[]>;
}
