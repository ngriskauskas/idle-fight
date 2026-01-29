// ============ NEW PHYSICAL SPELLS (NO CUSTOM EFFECTS) ============

export const CRUSHING_WEIGHT: Spell = {
  id: "crushing_weight",
  name: "Crushing Weight",
  description:
    "A slow, heavy attack that deals huge damage and inflicts a massive bleed.",
  icon: "anvil",
  spellType: "physical",
  damage: { base: 15, total: 15, current: 15 },
  attackCost: { base: 150, total: 150, current: 0 },
  unlockCost: 8,
  unlocked: false,
  critChance: { base: 0.05, total: 0.05, current: 0.05 },
  critMultiplier: { base: 2.2, total: 2.2, current: 2.2 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    bleed: { base: 20, total: 20, current: 20 },
  },
};

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

// ============ NEW AURA SPELLS (NO CUSTOM EFFECTS) ============

export const OVERCHARGE: Spell = {
  id: "overcharge",
  name: "Overcharge",
  description:
    "Dramatically increase your speed and crit chance, but reduce your defense to zero.",
  spellType: "aura",
  icon: "bolt",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 60, total: 60, current: 0 },
  unlockCost: 7,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 35, total: 35, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "overcharge",
    name: "Overcharge",
    icon: "bolt",
    effects: [
      { type: "speed", value: 50, valueType: "flat" },
      { type: "critChance", value: 40, valueType: "flat" },
      { type: "defense", value: -999, valueType: "flat" },
    ],
    baseTime: 8,
    currentTime: 8,
    totalTime: 8,
    stacks: 1,
  },
};

export const FORTIFIED_BLOOD: Spell = {
  id: "fortified_blood",
  name: "Fortified Blood",
  description:
    "Massively increase your health and health regen, but reduce your speed and crit chance.",
  spellType: "aura",
  icon: "heart",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 80, total: 80, current: 0 },
  unlockCost: 8,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 50, total: 50, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "fortified_blood",
    name: "Fortified Blood",
    icon: "heart",
    effects: [
      { type: "health", value: 100, valueType: "flat" },
      { type: "healthRegen", value: 20, valueType: "flat" },
      { type: "speed", value: -20, valueType: "flat" },
      { type: "critChance", value: -20, valueType: "flat" },
    ],
    baseTime: 12,
    currentTime: 12,
    totalTime: 12,
    stacks: 1,
  },
};
import type { Spell } from "../types/spell";

// ============ PHYSICAL SPELLS ============

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
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.13, total: 0.13, current: 0.13 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 0, total: 0, current: 0 },
  isAoe: false,
  statusStats: {
    poison: { base: 3, total: 3, current: 3 },
  },
};

// ============ MAGIC SPELLS ============

export const FIREBALL: Spell = {
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

export const ICE_SPIKE: Spell = {
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

export const LIGHTNING_BOLT: Spell = {
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

export const METEOR: Spell = {
  id: "meteor",
  name: "Meteor",
  description: "Call down fiery meteors on enemies",
  spellType: "magic",
  icon: "meteor",
  damage: { base: 3, total: 3, current: 3 },
  attackCost: { base: 105, total: 105, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0.08, total: 0.08, current: 0.08 },
  critMultiplier: { base: 1.7, total: 1.7, current: 1.7 },
  manaCost: { base: 12, total: 12, current: 0 },
  isAoe: true,
  statusStats: {
    fire: { base: 8, total: 8, current: 8 },
  },
};

export const INFERNO: Spell = {
  id: "inferno",
  name: "Inferno",
  description: "Engulf an area in raging flames",
  spellType: "magic",
  icon: "fire2",
  damage: { base: 4, total: 4, current: 4 },
  attackCost: { base: 125, total: 125, current: 0 },
  unlockCost: 6,
  unlocked: false,
  critChance: { base: 0.09, total: 0.09, current: 0.09 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 15, total: 15, current: 0 },
  isAoe: true,
  statusStats: {
    fire: { base: 10, total: 10, current: 10 },
  },
};

export const FROSTBOLT: Spell = {
  id: "frostbolt",
  name: "Frostbolt",
  description: "Freeze a wide area with arctic magic",
  spellType: "magic",
  icon: "frostFire",
  damage: { base: 3, total: 3, current: 3 },
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

export const ARCANE_MISSILE: Spell = {
  id: "arcane-missile",
  name: "Arcane Missile",
  description: "Fire multiple arcane projectiles",
  spellType: "magic",
  icon: "handSpell",
  damage: { base: 1, total: 1, current: 1 },
  attackCost: { base: 60, total: 60, current: 0 },
  unlockCost: 1,
  unlocked: false,
  critChance: { base: 0.15, total: 0.15, current: 0.15 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  manaCost: { base: 5, total: 5, current: 0 },
  isAoe: false,
  statusStats: {},
};

export const CHAIN_LIGHTNING: Spell = {
  id: "chain-lightning",
  name: "Chain Lightning",
  description: "Lightning that jumps between enemies",
  spellType: "magic",
  icon: "bolt",
  damage: { base: 2, total: 2, current: 2 },
  attackCost: { base: 95, total: 95, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0.12, total: 0.12, current: 0.12 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  manaCost: { base: 10, total: 10, current: 0 },
  isAoe: true,
  statusStats: {
    lightning: { base: 5, total: 5, current: 5 },
  },
};

// ============ AURA SPELLS ============

export const REGENERATION: Spell = {
  id: "regeneration",
  name: "Regeneration",
  description: "Enhance your health regeneration for a time",
  spellType: "aura",
  icon: "heal",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 70, total: 70, current: 0 },
  unlockCost: 0,
  unlocked: true,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 25, total: 25, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "regeneration",
    name: "Regeneration",
    icon: "heal",
    effects: [
      {
        type: "healthRegen",
        value: 8,
        valueType: "flat",
      },
    ],
    baseTime: 10,
    currentTime: 10,
    totalTime: 10,
    stacks: 1,
  },
};

// ============ AURA SPELLS ============

export const BATTLE_CRY: Spell = {
  id: "battle_cry",
  name: "Battle Cry",
  description: "Boost your attack power and critical chance",
  spellType: "aura",
  icon: "shout",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 80, total: 80, current: 0 },
  unlockCost: 2,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 30, total: 30, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "battle_cry",
    name: "Battle Cry",
    icon: "shout",
    effects: [
      {
        type: "damage",
        value: 3,
        valueType: "flat",
      },
      {
        type: "critChance",
        value: 20,
        valueType: "flat",
      },
      {
        type: "critMultiplier",
        value: 1.5,
        valueType: "flat",
      },
    ],
    baseTime: 30,
    currentTime: 30,
    totalTime: 30,
    stacks: 1,
  },
};

export const FORTITUDE: Spell = {
  id: "fortitude",
  name: "Fortitude",
  description: "Increase your defense and reduce damage taken",
  spellType: "aura",
  icon: "shield",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 75, total: 75, current: 0 },
  unlockCost: 3,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 35, total: 35, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "fortitude",
    name: "Fortitude",
    icon: "shield",
    effects: [
      {
        type: "defense",
        value: 4,
        valueType: "flat",
      },
      {
        type: "shield",
        value: 10,
        valueType: "flat",
      },
      {
        type: "shieldRegen",
        value: 2,
        valueType: "flat",
      },
    ],
    baseTime: 10,
    currentTime: 10,
    totalTime: 10,
    stacks: 1,
  },
};

export const ARCANE_BOOST: Spell = {
  id: "arcane_boost",
  name: "Arcane Boost",
  description: "Enhance your mana regeneration and spell efficiency",
  spellType: "aura",
  icon: "wand",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 70, total: 70, current: 0 },
  unlockCost: 4,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 20, total: 20, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "arcane_boost",
    name: "Arcane Boost",
    icon: "wand",
    effects: [
      {
        type: "mana",
        value: 50,
        valueType: "flat",
      },
      {
        type: "manaRegen",
        value: 6,
        valueType: "flat",
      },
      {
        type: "manaCost",
        value: 10,
        valueType: "flat",
      },
    ],
    baseTime: 100,
    currentTime: 100,
    totalTime: 100,
    stacks: 1,
  },
};

export const CURSE: Spell = {
  id: "curse",
  name: "Curse",
  description: "Curse yourself, doubling damage but slowly speed and defense",
  spellType: "aura",
  icon: "skull",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 60, total: 60, current: 0 },
  unlockCost: 5,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 40, total: 40, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "curse",
    name: "Curse",
    icon: "skull",
    effects: [
      {
        type: "damage",
        value: 100,
        valueType: "percentage",
      },
      {
        type: "defense",
        value: -5,
        valueType: "flat",
      },
      {
        type: "speed",
        value: -25,
        valueType: "flat",
      },
    ],
    baseTime: 150,
    currentTime: 150,
    totalTime: 150,
    stacks: 1,
  },
};

export const LIFESTEAL: Spell = {
  id: "lifesteal",
  name: "Lifesteal",
  description: "Drain enemy health to restore your own",
  spellType: "aura",
  icon: "bloodKnife",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 85, total: 85, current: 0 },
  unlockCost: 6,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 50, total: 50, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "lifesteal",
    name: "Lifesteal",
    icon: "bloodKnife",
    effects: [
      {
        type: "healthLeech",
        value: 20,
        valueType: "flat",
      },
    ],
    baseTime: 90,
    currentTime: 90,
    totalTime: 90,
    stacks: 1,
  },
};

// ============ NEW PHYSICAL SPELLS ============

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
  // Special effect: destroys all enemy shield (to be handled in logic)
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
  // Special effect: hits 6 times (to be handled in logic)
};

// ============ NEW AURA SPELLS ============

export const GLASS_CANNON: Spell = {
  id: "glass_cannon",
  name: "Glass Cannon",
  description:
    "Greatly increase your damage, but reduce your health to 1 for a short time.",
  spellType: "aura",
  icon: "crystal",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 50, total: 50, current: 0 },
  unlockCost: 7,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 40, total: 40, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "glass_cannon",
    name: "Glass Cannon",
    icon: "crystal",
    effects: [
      { type: "damage", value: 200, valueType: "percentage" },
      { type: "health", value: -9999, valueType: "flat" },
    ],
    baseTime: 6,
    currentTime: 6,
    totalTime: 6,
    stacks: 1,
  },
};

export const IMMORTALITY: Spell = {
  id: "immortality",
  name: "Immortality",
  description:
    "Become nearly invulnerable (massive defense & shield), but unable to attack or heal for a short time.",
  spellType: "aura",
  icon: "shield",
  damage: { base: 0, total: 0, current: 0 },
  attackCost: { base: 100, total: 100, current: 0 },
  unlockCost: 8,
  unlocked: false,
  critChance: { base: 0, total: 0, current: 0 },
  critMultiplier: { base: 1, total: 1, current: 1 },
  manaCost: { base: 60, total: 60, current: 0 },
  isAoe: false,
  statusStats: {},
  auraEffect: {
    id: "immortality",
    name: "Immortality",
    icon: "shield",
    effects: [
      { type: "defense", value: 9999, valueType: "flat" }, // Effectively invulnerable
      { type: "shield", value: 9999, valueType: "flat" }, // Massive shield
      { type: "damage", value: -100, valueType: "percentage" }, // Can't attack
      { type: "healthRegen", value: -9999, valueType: "flat" }, // Can't heal
    ],
    baseTime: 5,
    currentTime: 5,
    totalTime: 5,
    stacks: 1,
  },
};

export const DEFAULT_SPELLS: Spell[] = [
  STRIKE,
  SLASH,
  REND,
  EXECUTE,
  WHIRLWIND,
  POISON_STAB,
  SHATTERING_BLOW,
  FRENZIED_FLURRY,
  CRUSHING_WEIGHT,
  BLOOD_FRENZY,
  REGENERATION,
  BATTLE_CRY,
  FORTITUDE,
  ARCANE_BOOST,
  CURSE,
  LIFESTEAL,
  GLASS_CANNON,
  IMMORTALITY,
  OVERCHARGE,
  FORTIFIED_BLOOD,
  FIREBALL,
  ICE_SPIKE,
  LIGHTNING_BOLT,
  METEOR,
  INFERNO,
  FROSTBOLT,
  ARCANE_MISSILE,
  CHAIN_LIGHTNING,
];
