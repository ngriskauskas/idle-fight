import { MagicSpell } from "../../types";

export const FIREBALL: MagicSpell = {
  id: "fireball",
  name: "Fireball",
  description: "Conjure a blazing sphere of fire",
  spellType: "magic",
  icon: "fire",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 85, total: 85, current: 0 },
  unlockCost: 2,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 8, total: 8, current: 0 },
  isAoe: false,
  statusStats: {
    fire: { base: 5, total: 5, current: 5 },
  },
};

export const ICE_SPIKE: MagicSpell = {
  id: "ice-spike",
  name: "Ice Spike",
  description: "Launch a sharp shard of ice",
  spellType: "magic",
  icon: "ice",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 2,
  unlocked: false,
  critChance: { base: 0.12, total: 0.12, current: 0.12 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 6, total: 6, current: 0 },
  isAoe: false,
  statusStats: {
    ice: { base: 7, total: 7, current: 7 },
  },
};

export const LIGHTNING_BOLT: MagicSpell = {
  id: "lightning-bolt",
  name: "Lightning Bolt",
  description: "Strike with a powerful bolt of electricity",
  spellType: "magic",
  icon: "lightning",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 80, total: 80, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.11, total: 0.11, current: 0.11 },
  critMultiplier: { base: 1.6, total: 1.6, current: 1.6 },
  manaCost: { base: 7, total: 7, current: 0 },
  isAoe: false,
  statusStats: {
    lightning: { base: 6, total: 6, current: 6 },
  },
};

export const METEOR: MagicSpell = {
  id: "meteor",
  name: "Meteor",
  description: "Call down fiery meteors on enemies",
  spellType: "magic",
  icon: "meteor",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 105, total: 105, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.7, total: 1.7, current: 1.7 },
  manaCost: { base: 12, total: 12, current: 0 },
  isAoe: true,
  statusStats: {
    fire: { base: 6, total: 6, current: 6 },
  },
};

export const INFERNO: MagicSpell = {
  id: "inferno",
  name: "Inferno",
  description: "Engulf an area in raging flames",
  spellType: "magic",
  icon: "fire2",
  damage: { base: 3, total: 3, current: 3 },
  attackCost: { base: 125, total: 125, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.09, total: 0.09, current: 0.09 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 15, total: 15, current: 0 },
  isAoe: true,
  statusStats: {
    fire: { base: 8, total: 8, current: 8 },
  },
};

export const FROSTBOLT: MagicSpell = {
  id: "frostbolt",
  name: "Frostbolt",
  description: "Freeze a wide area with arctic magic",
  spellType: "magic",
  icon: "frostFire",
  damage: { base: 2.5, total: 2.5, current: 2.5 },
  attackCost: { base: 100, total: 100, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 11, total: 11, current: 0 },
  isAoe: true,
  statusStats: {
    ice: { base: 9, total: 9, current: 9 },
  },
};

export const ARCANE_MISSILE: MagicSpell = {
  id: "arcane-missile",
  name: "Arcane Missile",
  description: "Fire multiple arcane projectiles",
  spellType: "magic",
  icon: "handSpell",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 60, total: 60, current: 0 },
  unlockCost: 1,
  unlocked: false,
  critChance: { base: 0.15, total: 0.15, current: 0.15 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  manaCost: { base: 5, total: 5, current: 0 },
  isAoe: false,
  statusStats: {},
};

export const CHAIN_LIGHTNING: MagicSpell = {
  id: "chain-lightning",
  name: "Chain Lightning",
  description: "Lightning that jumps between enemies",
  spellType: "magic",
  icon: "bolt",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 95, total: 95, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.12, total: 0.12, current: 0.12 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 10, total: 10, current: 0 },
  isAoe: true,
  statusStats: {
    lightning: { base: 5, total: 5, current: 5 },
  },
};

export const IGNITE: MagicSpell = {
  id: "ignite",
  name: "Ignite",
  description: "A cheap spark. Little damage, a lot of fire",
  spellType: "magic",
  icon: "celebrationFire",
  damage: { base: 1.5, total: 1.5, current: 1.5 },
  attackCost: { base: 50, total: 50, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 5, total: 5, current: 0 },
  isAoe: false,
  statusStats: {
    fire: { base: 6, total: 6, current: 6 },
  },
};

export const FROST_NOVA: MagicSpell = {
  id: "frost-nova",
  name: "Frost Nova",
  description: "A burst of cold that slows every enemy. Barely hurts",
  spellType: "magic",
  icon: "coldHeart",
  damage: { base: 1, total: 1, current: 1 },
  attackCost: { base: 100, total: 100, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 10, total: 10, current: 0 },
  isAoe: true,
  statusStats: {
    ice: { base: 8, total: 8, current: 8 },
  },
};

export const STATIC_FIELD: MagicSpell = {
  id: "static-field",
  name: "Static Field",
  description: "A weak, cheap field that charges every enemy with lightning",
  spellType: "magic",
  icon: "lightningTree",
  damage: { base: 1, total: 1, current: 1 },
  attackCost: { base: 70, total: 70, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 6, total: 6, current: 0 },
  isAoe: true,
  statusStats: {
    lightning: { base: 5, total: 5, current: 5 },
  },
};
