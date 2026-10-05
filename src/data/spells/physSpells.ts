import { PhysicalSpell } from "../../types";

//PHYS

export const STRIKE: PhysicalSpell = {
  id: "strike",
  name: "Strike",
  description: "A reliable basic melee attack",
  icon: "sword",
  spellType: "physical",
  damage: { base: 3, total: 3, current: 3 },
  attackScale: 1,
  attackCost: { base: 50, total: 50, current: 0 },
  unlockCost: 0,
  unlocked: true,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  isAoe: false,
  statusStats: {},
};

export const SLASH: PhysicalSpell = {
  id: "slash",
  name: "Slash",
  description: "A quick slashing attack with moderate damage",
  icon: "zeusSword",
  spellType: "physical",
  damage: { base: 2, total: 2, current: 2 },
  attackScale: 0.8,
  attackCost: { base: 40, total: 40, current: 0 },
  unlockCost: 1,
  unlocked: false,
  critChance: { base: 0.12, total: 0.12, current: 0.12 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  isAoe: false,
  statusStats: {},
};

export const WHIRLWIND: PhysicalSpell = {
  id: "whirlwind",
  name: "Whirlwind",
  description: "Spin around striking all nearby enemies",
  icon: "wind",
  spellType: "physical",
  damage: { base: 2, total: 2, current: 2 },
  attackScale: 0.9,
  attackCost: { base: 110, total: 110, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  isAoe: true,
  statusStats: {},
};

//POISON
export const POISON_STAB: PhysicalSpell = {
  id: "poison-stab",
  name: "Poison Stab",
  description: "A quick stab coated with deadly venom",
  icon: "poison",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackScale: 0.6,
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 2,
  unlocked: false,
  critChance: { base: 0.13, total: 0.13, current: 0.13 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  isAoe: false,
  statusStats: {
    poison: { base: 6, total: 6, current: 6 },
  },
};

export const POISON_GAS: PhysicalSpell = {
  id: "poison-gas",
  name: "Poison Gas",
  description: "Release a cloud of toxic gas that poisons all enemies in the area",
  icon: "poisonGas",
  spellType: "physical",
  damage: { base: 0, total: 0, current: 0 },
  attackScale: 0.2,
  attackCost: { base: 90, total: 90, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  isAoe: false,
  statusStats: {
    poison: { base: 3, total: 3, current: 3 },
  },
};

//BLEED

export const REND: PhysicalSpell = {
  id: "rend",
  name: "Rend",
  description: "A devastating strike that tears flesh",
  icon: "bloodSword",
  spellType: "physical",
  damage: { base: 4, total: 4, current: 4 },
  attackScale: 0.8,
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.15, total: 0.15, current: 0.15 },
  critMultiplier: { base: 1.6, total: 1.6, current: 1.6 },
  isAoe: false,
  statusStats: {
    bleed: { base: 8, total: 8, current: 8 },
  },
};

export const EXECUTE: PhysicalSpell = {
  id: "execute",
  name: "Execute",
  description: "A powerful overhead strike meant to finish enemies",
  icon: "hammer",
  spellType: "physical",
  damage: { base: 10, total: 6, current: 6 },
  attackScale: 2.2,
  attackCost: { base: 120, total: 120, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.8, total: 1.8, current: 1.8 },
  isAoe: false,
  statusStats: {
    bleed: { base: 10, total: 4, current: 4 },
  },
};

//GENERIC

export const QUICK_STRIKE: PhysicalSpell = {
  id: "quick-strike",
  name: "Quick Strike",
  description: "A very fast, very weak jab. Triggers on-hit effects often",
  icon: "sword",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackScale: 0.45,
  attackCost: { base: 25, total: 25, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  isAoe: false,
  statusStats: {},
};

export const BLUDGEON: PhysicalSpell = {
  id: "bludgeon",
  name: "Bludgeon",
  description: "A very slow, crushing blow with a huge critical hit",
  icon: "hammer",
  spellType: "physical",
  damage: { base: 10, total: 10, current: 10 },
  attackScale: 2.4,
  attackCost: { base: 140, total: 140, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.05, total: 0.05, current: 0.05 },
  critMultiplier: { base: 2.5, total: 2.5, current: 2.5 },
  isAoe: false,
  statusStats: {},
};

//BLEED

export const LACERATE: PhysicalSpell = {
  id: "lacerate",
  name: "Lacerate",
  description: "A fast shallow cut that keeps a bleed going",
  icon: "bloodKnife",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackScale: 0.4,
  attackCost: { base: 45, total: 45, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  isAoe: false,
  statusStats: {
    bleed: { base: 4, total: 4, current: 4 },
  },
};

export const HEMORRHAGE: PhysicalSpell = {
  id: "hemorrhage",
  name: "Hemorrhage",
  description: "A slow sweeping cut that makes every enemy bleed",
  icon: "blood",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackScale: 0.6,
  attackCost: { base: 130, total: 130, current: 0 },
  unlockCost: 6,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  isAoe: true,
  statusStats: {
    bleed: { base: 6, total: 6, current: 6 },
  },
};
