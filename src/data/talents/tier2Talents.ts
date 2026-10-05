import { Talent } from "../../types";
import { WAR_CRY } from "../spells/auras";

export const SHIELD_SPECIAIST: Talent = {
  id: "shield-specialist",
  name: "Shield Specialist",
  icon: "🛡️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "defense",
  effects: [
    { type: "shield", value: 100, valueType: "percentage", priority: "normal" },
    {
      type: "shieldRegen",
      value: 25,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "health",
      value: 1,
      valueType: "flat",
      priority: "set",
    },
  ],
};

export const SPEED_SPECIALIST: Talent = {
  id: "speed-specialist",
  name: "Speed Specialist",
  icon: "🏃",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "speed",
  effects: [
    { type: "speed", value: 100, valueType: "percentage", priority: "normal" },
    {
      type: "damage",
      value: -35,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "manaCost",
      value: -35,
      valueType: "percentage",
      priority: "normal",
    },
  ],
};

export const PHYSICAL_SPECIALIST: Talent = {
  id: "physical-specialist",
  name: "Physical Specialist",
  icon: "💪",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "attack",
  effects: [
    { type: "damage", value: 60, valueType: "percentage", priority: "normal" },
    {
      type: "manaCost",
      value: 0,
      valueType: "flat",
      priority: "set",
    },
    // the cost: no mana regen, so auras run on the starting pool and mana leech only
    { type: "manaRegen", value: 0, valueType: "flat", priority: "set" },
  ],
};

export const MAGICAL_SPECIALIST: Talent = {
  id: "magical-specialist",
  name: "Magical Specialist",
  icon: "🪄",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "attack",
  effects: [
    { type: "damage", value: 0, valueType: "flat", priority: "set" },
    // the cost: a quarter of your health
    { type: "health", value: -25, valueType: "percentage", priority: "normal" },
    {
      type: "manaCost",
      value: 60,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "mana",
      value: 50,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "manaRegen",
      value: 25,
      valueType: "percentage",
      priority: "normal",
    },
  ],
};

export const ADRENALINE_SURGE: Talent = {
  id: "adrenaline-surge",
  name: "Adrenaline Surge",
  icon: "⚡",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "speed",
  effects: [],
  triggers: [
    {
      id: "on-crit-speed-up-trigger",
      type: "onCrit",
      action: "speedBoost",
      value: 10,
    },
  ],
};

export const EPIDEMIC: Talent = {
  id: "epidemic",
  name: "Epidemic",
  icon: "☣️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "epidemic-poison-spread",
      type: "onDeath",
      action: "poisonSpread",
    },
  ],
};

export const CRITICAL_TOXIN: Talent = {
  id: "critical-toxin",
  name: "Critical Toxin",
  icon: "💀",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "critical-toxin-multiply",
      type: "onCrit",
      action: "multiplyPoison",
      value: 1.5,
    },
  ],
};

export const DEEP_WOUNDS: Talent = {
  id: "deep-wounds",
  name: "Deep Wounds",
  description: "Crits double the bleed on your target. Does nothing without bleed and crit.",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "deep-wounds-multiply",
      type: "onCrit",
      action: "multiplyStatus",
      status: "bleed",
      value: 2,
    },
  ],
};

export const WILDFIRE: Talent = {
  id: "wildfire",
  name: "Wildfire",
  description: "When a burning enemy dies, its fire jumps to every other enemy.",
  icon: "🔥",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "wildfire-spread",
      type: "onDeath",
      action: "spreadStatus",
      status: "fire",
    },
  ],
};

export const CHAIN_REACTION: Talent = {
  id: "chain-reaction",
  name: "Chain Reaction",
  description: "Crits arc lightning to every enemy.",
  icon: "🌩️",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "chain-reaction-arc",
      type: "onCrit",
      action: "applyStatusAoe",
      status: "lightning",
      value: 3,
    },
  ],
};

export const FROSTBITE: Talent = {
  id: "frostbite",
  name: "Frostbite",
  description: "Every hit chills your target, slowing its attacks. Fast attacks keep it frozen.",
  icon: "❄️",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "frostbite-chill",
      type: "onHit",
      action: "applyStatus",
      status: "ice",
      value: 1,
    },
  ],
};

export const BLOODLUST: Talent = {
  id: "bloodlust",
  name: "Bloodlust",
  description: "Kills grant a stack of War Cry. Stacks are lost when you lose health.",
  icon: "😤",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 2,
  category: "attack",
  effects: [],
  triggers: [
    {
      id: "bloodlust-war-cry",
      type: "onKill",
      action: "castAura",
      spell: WAR_CRY,
    },
  ],
};

export const STEADY_HAND: Talent = {
  id: "steady-hand",
  name: "Steady Hand",
  description: "You can never crit. Much more damage. Kills every on-crit effect you have.",
  icon: "🎯",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "attack",
  effects: [
    { type: "damage", value: 40, valueType: "percentage", priority: "normal" },
    { type: "critChance", value: -1, valueType: "flat", priority: "set" },
  ],
};

export const WIDENED_FOCUS: Talent = {
  id: "widened-focus",
  name: "Widened Focus",
  description:
    "Needs level 8. One more spell slot. Room for an aura next to your attacks, or a second status to combine with the first.",
  icon: "📖",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 2,
  category: "utility",
  requiredLevel: 8,
  spellSlots: 1,
  effects: [],
};

export const RAMPAGE: Talent = {
  id: "rampage",
  name: "Rampage",
  description:
    "Kills push all your attacks forward, more per level. Speeds up clearing weak waves, and turns slow, heavy hits into chains.",
  icon: "🐗",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 1,
  tier: 2,
  category: "speed",
  effects: [],
  triggers: [
    {
      id: "rampage-speed",
      type: "onKill",
      action: "speedBoost",
      value: 30,
    },
  ],
};

export const BLOOD_TRAIL: Talent = {
  id: "blood-trail",
  name: "Blood Trail",
  description:
    "Bleed spreads to every surviving enemy when its target dies. Pairs with Rend and Deep Wounds; needs a way to apply bleed.",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "blood-trail-spread",
      type: "onDeath",
      action: "spreadStatus",
      status: "bleed",
    },
  ],
};

export const COLD_SNAP: Talent = {
  id: "cold-snap",
  name: "Cold Snap",
  description:
    "Kills chill every surviving enemy. Pairs with Frostbite and Shatter, but costs speed even between kills.",
  icon: "❄️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [{ type: "speed", value: -5, valueType: "flat", priority: "normal" }],
  triggers: [
    {
      id: "cold-snap-chill",
      type: "onKill",
      action: "applyStatusAoe",
      status: "ice",
      value: 6,
    },
  ],
};
