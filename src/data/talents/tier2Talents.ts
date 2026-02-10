import { AuraSpell, Talent } from "../../types";

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
      value: -50,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "manaCost",
      value: -50,
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
    { type: "damage", value: 100, valueType: "percentage", priority: "normal" },
    {
      type: "manaCost",
      value: 0,
      valueType: "flat",
      priority: "set",
    },
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
    {
      type: "manaCost",
      value: 100,
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
      value: 50,
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

export const MANA_OVERLOAD: Talent = {
  id: "mana-overload",
  name: "Mana Overload",
  icon: "💥",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 1,
  tier: 2,
  category: "utility",
  effects: [],
  triggers: [
    {
      id: "mana-overload-full",
      type: "onFullMana",
      action: "castAura",
      spell: {
        id: "mana-overload-aura",
        name: "Mana Overload",
        description: "Increase mana cost significantly for a short duration.",
        icon: "💥",
        spellType: "aura",
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: false,
        auraEffect: {
          id: "mana-overload-aura-effect",
          name: "Mana Overload Effect",
          icon: "💥",
          effects: [
            {
              type: "manaCost",
              value: 10,
              valueType: "flat",
              priority: "normal",
            },
            {
              type: "manaCost",
              value: 200,
              valueType: "percentage",
              priority: "normal",
            },
          ],
          baseTime: 10,
          currentTime: 10,
          stacks: 1,
          totalTime: 5,
        },
      } as AuraSpell,
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
