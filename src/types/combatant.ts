import type { StatusEffect, StatusStats } from "./status";
import type { AuraEffect } from "./aura";
import type { Spell } from "./spell";

export interface Combatant {
  id: string;
  name: string;
  icon: string;
  isMainCharacter: boolean;
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  attack: number;
  currentAttack: number;
  defense: number;
  currentDefense: number;
  speed: number;
  level: number;
  healthRegen: number;
  shieldRegen: number;

  statusEffects: StatusEffect[];
  statusStats: StatusStats;
  auraEffects: AuraEffect[];
  spells: Spell[];
}
