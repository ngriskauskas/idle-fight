import { Talent } from "../../types";

export const WARRIOR_TRAINING: Talent = {
  id: "warrior-training",
  name: "Warrior Training",
  icon: "⚔️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "attack",
  effects: [
    { type: "damage", value: 2, valueType: "flat", priority: "normal" },
    { type: "damage", value: 15, valueType: "percentage", priority: "normal" },
  ],
};

export const IRON_CONSTITUTION: Talent = {
  id: "iron-constitution",
  name: "Iron Constitution",
  icon: "❤️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [
    { type: "health", value: 6, valueType: "flat", priority: "normal" },
    { type: "health", value: 10, valueType: "percentage", priority: "normal" },
  ],
};

export const STONE_WALL: Talent = {
  id: "stone-wall",
  name: "Stone Wall",
  icon: "🛡️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "defense",
  effects: [
    { type: "defense", value: 2, valueType: "flat", priority: "normal" },
    { type: "defense", value: 10, valueType: "percentage", priority: "normal" },
  ],
};

export const QUICKSTEP: Talent = {
  id: "quickstep",
  name: "Quickstep",
  icon: "🏃",
  unlocked: false,
  level: 0,
  maxLevel: 30,
  cost: 1,
  tier: 1,
  category: "speed",
  effects: [{ type: "speed", value: 3, valueType: "flat", priority: "normal" }],
};

export const ARCANE_AFFINITY: Talent = {
  id: "arcane-affinity",
  name: "Arcane Affinity",
  icon: "🌀",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [
    { type: "manaCost", value: 3, valueType: "flat", priority: "normal" },
    { type: "manaCost", value: 10, valueType: "percentage", priority: "normal" },
  ],
};

export const REGENERATION: Talent = {
  id: "health-regen",
  name: "Regeneration",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [
    { type: "healthRegen", value: 2, valueType: "flat", priority: "normal" },
    { type: "healthRegen", value: 10, valueType: "percentage", priority: "normal" },
  ],
};

export const MANA_EFFICIENCY: Talent = {
  id: "mana-efficiency",
  name: "Mana Efficiency",
  icon: "💫",
  unlocked: false,
  level: 0,
  maxLevel: 50,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [
    { type: "manaRegen", value: 3, valueType: "flat", priority: "normal" },
    { type: "manaRegen", value: 10, valueType: "percentage", priority: "normal" },
  ],
};

export const SHIELD_BEARER: Talent = {
  id: "shield-bearer",
  name: "Shield Bearer",
  icon: "🔰",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "defense",
  effects: [
    { type: "shield", value: 5, valueType: "flat", priority: "normal" },
    { type: "shieldRegen", value: 0.5, valueType: "flat", priority: "normal" },
    { type: "shield", value: 10, valueType: "percentage", priority: "normal" },
  ],
};
