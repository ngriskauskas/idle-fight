import type { StatusEffect, StatusStats } from "./status";
import type { AuraEffect } from "./aura";
import type { Spell } from "./spell";
import type { ActiveEffect } from "./activeEffect";
import type { CombatStat } from "./combatStat";
import { EffectType } from "./effect";
import { Trigger, TriggerType } from "./triggers";

export interface Combatant {
  id: string;
  name: string;
  icon: string;
  isDead: boolean;
  isMainCharacter: boolean;
  isEnemy: boolean;
  level: number;

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
  speedBoostCooldown?: number;
  appliedEffects: Record<EffectType, ActiveEffect[]>;
  triggers: Record<TriggerType, Trigger[]>;
}
