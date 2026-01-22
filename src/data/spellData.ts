import type { Spell } from "../types/spell";

export const STRIKE: Spell = {
  id: "strike",
  name: "Strike",
  description: "A basic melee attack",
  icon: "sword",
  spellType: "physical",
  damage: 3,
  baseAttackCost: 70,
  attackCost: 70,
  currentAttackCost: 0,
  unlockCost: 0,
  unlocked: true,
  statusStats: {},
};

export const QUICK_STRIKE: Spell = {
  id: "quick-strike",
  name: "Quick Strike",
  description: "A fast but lighter attack",
  icon: "zeusSword",
  spellType: "physical",
  damage: 1,
  baseAttackCost: 45,
  attackCost: 45,
  currentAttackCost: 0,
  unlockCost: 2,
  unlocked: false,
  statusStats: {},
};

export const FIREBALL: Spell = {
  id: "fireball",
  name: "Fireball",
  description: "Launch a ball of fire dealing damage",
  spellType: "magic",
  icon: "fire",
  damage: 2,
  baseAttackCost: 85,
  attackCost: 85,
  currentAttackCost: 0,
  unlockCost: 4,
  unlocked: true,
  statusStats: {
    fire: 4,
  },
};

export const ICE_BOLT: Spell = {
  id: "ice-bolt",
  name: "Ice Bolt",
  description: "Freeze enemies with magical ice",
  spellType: "magic",
  icon: "ice",
  damage: 2,
  baseAttackCost: 90,
  attackCost: 90,
  currentAttackCost: 0,
  unlockCost: 4,
  unlocked: true,
  statusStats: {
    ice: 4,
  },
};

export const LIGHTNING_STRIKE: Spell = {
  id: "lightning-strike",
  name: "Lightning Strike",
  spellType: "magic",
  description: "Strike with the power of thunder",
  icon: "lightning",
  baseAttackCost: 80,
  attackCost: 80,
  damage: 2,
  currentAttackCost: 0,
  unlockCost: 5,
  unlocked: true,
  statusStats: {
    lightning: 4,
  },
};

export const POISON_STRIKE: Spell = {
  id: "poison-strike",
  name: "Poison Strike",
  spellType: "physical",
  description: "Coat your weapon with deadly poison",
  icon: "poison",
  damage: 2,
  baseAttackCost: 88,
  attackCost: 88,
  currentAttackCost: 0,
  unlockCost: 4,
  unlocked: true,
  statusStats: {
    poison: 4,
  },
};

export const BLUDGEON: Spell = {
  id: "bludgeon",
  spellType: "physical",
  name: "Bludgeon",
  description: "A heavy crushing blow",
  icon: "hammer",
  damage: 5,
  baseAttackCost: 115,
  attackCost: 115,
  currentAttackCost: 0,
  unlockCost: 6,
  unlocked: true,
  statusStats: {
    bleed: 3,
  },
};

export const HEAL: Spell = {
  id: "heal",
  name: "Heal",
  description: "Boost your health regeneration",
  icon: "heal",
  spellType: "aura",
  damage: 0,
  baseAttackCost: 95,
  attackCost: 95,
  currentAttackCost: 0,
  unlockCost: 5,
  unlocked: false,
  statusStats: {},
};

export const DEFAULT_SPELLS: Spell[] = [
  STRIKE,
  QUICK_STRIKE,
  FIREBALL,
  ICE_BOLT,
  LIGHTNING_STRIKE,
  POISON_STRIKE,
  BLUDGEON,
  HEAL,
];
