import { Spell } from "../../types";

export const BLOOD_FRENZY: Spell = {
  id: "blood_frenzy",
  name: "Blood Frenzy",
  description:
    "A wild attack that deals moderate damage and inflicts heavy bleed.",
  icon: "bloodSword",
  spellType: "physical",
  damage: { base: 6, total: 6, current: 6 },
  attackCost: { base: 80, total: 80, current: 0 },
  unlockCost: 7,
  unlocked: false,
  critChance: { base: 0.18, total: 0.18, current: 0.18 },
  critMultiplier: { base: 1.7, total: 1.7, current: 1.7 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    bleed: { base: 15, total: 15, current: 15 },
  },
};

export const STRIKE: Spell = {
  id: "strike",
  name: "Strike",
  description: "A reliable basic melee attack",
  icon: "sword",
  spellType: "physical",
  damage: { base: 3, total: 3, current: 3 },
  attackCost: { base: 60, total: 60, current: 0 },
  unlockCost: 0,
  unlocked: true,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {},
};

export const SLASH: Spell = {
  id: "slash",
  name: "Slash",
  description: "A quick slashing attack with moderate damage",
  icon: "zeusSword",
  spellType: "physical",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 40, total: 40, current: 0 },
  unlockCost: 1,
  unlocked: false,
  critChance: { base: 0.12, total: 0.12, current: 0.12 },
  critMultiplier: { base: 1.4, total: 1.4, current: 1.4 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {},
};

export const REND: Spell = {
  id: "rend",
  name: "Rend",
  description: "A devastating strike that tears flesh",
  icon: "bloodSword",
  spellType: "physical",
  damage: { base: 4, total: 4, current: 4 },
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0.15, total: 0.15, current: 0.15 },
  critMultiplier: { base: 1.6, total: 1.6, current: 1.6 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    bleed: { base: 6, total: 6, current: 6 },
  },
};

export const EXECUTE: Spell = {
  id: "execute",
  name: "Execute",
  description: "A powerful overhead strike meant to finish enemies",
  icon: "hammer",
  spellType: "physical",
  damage: { base: 10, total: 6, current: 6 },
  attackCost: { base: 120, total: 120, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.8, total: 1.8, current: 1.8 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    bleed: { base: 10, total: 4, current: 4 },
  },
};

export const WHIRLWIND: Spell = {
  id: "whirlwind",
  name: "Whirlwind",
  description: "Spin around striking all nearby enemies",
  icon: "wind",
  spellType: "physical",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 110, total: 110, current: 0 },
  unlockCost: 6,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: true,
  statusStats: {},
};

export const POISON_STAB: Spell = {
  id: "poison-stab",
  name: "Poison Stab",
  description: "A quick stab coated with deadly venom",
  icon: "poison",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.13, total: 0.13, current: 0.13 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    poison: { base: 6, total: 6, current: 6 },
  },
};

export const POISON_GAS: Spell = {
  id: "poison-gas",
  name: "Poison Gas",
  description:
    "Release a cloud of toxic gas that poisons all enemies in the area",
  icon: "poisonGas",
  spellType: "physical",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 90, total: 90, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: true,
  statusStats: {
    poison: { base: 3, total: 3, current: 3 },
  },
};

export const SHATTERING_BLOW: Spell = {
  id: "shattering_blow",
  name: "Shattering Blow",
  description:
    "A mighty strike that deals massive damage and destroys enemy shield entirely.",
  icon: "hammer",
  spellType: "physical",
  damage: { base: 12, total: 12, current: 12 },
  attackCost: { base: 130, total: 130, current: 0 },
  unlockCost: 7,
  unlocked: false,
  critChance: { base: 0.07, total: 0.07, current: 0.07 },
  critMultiplier: { base: 2.0, total: 2.0, current: 2.0 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {},
};

export const FRENZIED_FLURRY: Spell = {
  id: "frenzied_flurry",
  name: "Frenzied Flurry",
  description:
    "Unleash a rapid barrage of 6 weak attacks, each with high crit chance.",
  icon: "wind",
  spellType: "physical",
  damage: { base: 1, total: 1, current: 1 },
  attackCost: { base: 90, total: 90, current: 0 },
  unlockCost: 6,
  unlocked: false,
  critChance: { base: 0.45, total: 0.45, current: 0.45 },
  critMultiplier: { base: 1.2, total: 1.2, current: 1.2 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {},
};
