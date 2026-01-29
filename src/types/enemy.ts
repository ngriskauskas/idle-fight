import type { Combatant } from "./combatant";
import { Spell } from "./spell";

export interface Enemy extends Combatant {
  presetId: string;
  isBoss: boolean;
  xpReward: number;
  xpMultiplier: number;
  itemDropRateBonus: number;
  deathTimer: number;
  isDead: boolean;
}

export interface EnemyPreset {
  id: string;
  name: string;
  description: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  baseShield?: number;
  baseShieldRegen?: number;
  baseHealthRegen?: number;
  baseMana?: number;
  baseManaCost?: number;
  baseManaRegen?: number;
  spells: Spell[];
  xpMultiplier?: number;
  itemDropRateBonus?: number;
  minWave?: number;
  icon: string;
}
