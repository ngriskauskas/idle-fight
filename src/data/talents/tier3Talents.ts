import { Talent } from "../../types";
import { HEALTH_REGEN } from "../spells/auras";

export const ARCANE_OVERLOAD: Talent = {
  id: "arcane-overload",
  name: "Arcane Overload",
  icon: "🌀",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "utility",
  effects: [],
  triggers: [
    {
      id: "arcane-overload-crit",
      type: "onKill",
      action: "castAura",
      spell: {
        id: "overcharge-inline",
        name: "Overcharge",
        description: "Dramatically increase your speed until you are hit.",
        icon: "bolt",
        spellType: "aura",
        damage: { base: 0, total: 0, current: 0 },
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0, total: 0, current: 0 },
        critMultiplier: { base: 1, total: 1, current: 1 },
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: false,
        statusStats: {},
        auraEffect: {
          id: "overcharge-inline",
          name: "Overcharge",
          icon: "bolt",
          isFragile: true,
          effects: [
            { type: "speed", value: 5, valueType: "flat", priority: "normal" },
            {
              type: "speed",
              value: 20,
              valueType: "percentage",
              priority: "normal",
            },
          ],
          baseTime: 8,
          currentTime: 8,
          totalTime: 8,
          stacks: 1,
        },
      },
    },
  ],
};

export const BLOOD_PACT: Talent = {
  id: "blood-pact",
  name: "Blood Pact",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "attack",
  effects: [
    { type: "damage", value: 40, valueType: "percentage", priority: "normal" },
    {
      type: "health",
      value: -50,
      valueType: "percentage",
      priority: "normal",
    },
  ],
  triggers: [
    {
      id: "blood-pact-kill",
      type: "onKill",
      action: "castSpell",
      spell: {
        id: "crushing-weight-inline",
        name: "Crushing Weight",
        description:
          "A slow, heavy attack that deals huge damage and inflicts a massive bleed.",
        icon: "anvil",
        spellType: "physical",
        damage: { base: 15, total: 15, current: 15 },
        attackCost: { base: 150, total: 150, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0.05, total: 0.05, current: 0.05 },
        critMultiplier: { base: 2.2, total: 2.2, current: 2.2 },
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: false,
        statusStats: {
          bleed: { base: 20, total: 20, current: 20 },
        },
      },
    },
  ],
};

export const STORM_CHANNELER: Talent = {
  id: "storm-channeler",
  name: "Storm Channeler",
  icon: "🌩️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "status",
  effects: [
    {
      type: "manaCost",
      value: 20,
      valueType: "percentage",
      priority: "normal",
    },
    {
      type: "lightning",
      value: 10,
      valueType: "percentage",
      priority: "normal",
    },
    { type: "speed", value: -10, valueType: "percentage", priority: "normal" },
  ],
  triggers: [
    {
      id: "storm-channeler-damage",
      type: "onTakeDamage",
      action: "castSpell",
      spell: {
        id: "lightning-bolt-inline",
        name: "Lightning Bolt",
        description: "Strike with a powerful bolt of electricity",
        icon: "lightning",
        spellType: "magic",
        damage: { base: 2, total: 2, current: 2 },
        attackCost: { base: 80, total: 80, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0.11, total: 0.11, current: 0.11 },
        critMultiplier: { base: 1.6, total: 1.6, current: 1.6 },
        manaCost: { base: 7, total: 7, current: 0 },
        isAoe: false,
        statusStats: {
          lightning: { base: 6, total: 6, current: 6 },
        },
      },
    },
  ],
};

export const VENOMOUS_ENTRANCE: Talent = {
  id: "venomous-entrance",
  name: "Venomous Entrance",
  icon: "☠️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "venomous-entrance-poison",
      type: "onEnemySpawn",
      action: "poisonAll",
      value: 5,
    },
  ],
};

export const BLOOD_RUSH: Talent = {
  id: "blood-rush",
  name: "Blood Rush",
  icon: "💉",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "speed",
  effects: [
    { type: "healthRegen", value: -10, valueType: "flat", priority: "set" },
    {
      type: "healthLeech",
      value: 10,
      valueType: "flat",
      priority: "normal",
    },
    {
      type: "healthLeech",
      value: 100,
      valueType: "percentage",
      priority: "normal",
    },
    { type: "speed", value: 50, valueType: "percentage", priority: "normal" },
  ],
};

export const STASIS_SURVIVAL: Talent = {
  id: "stasis-survival",
  name: "Stasis Survival",
  icon: "🛑",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "utility",
  effects: [],
  triggers: [
    {
      id: "stasis-survival-stasis",
      type: "onLowHealth",
      action: "castAuraAll",
      spell: {
        id: "stasis-aura-inline",
        name: "Stasis",
        description: "No one can attack while this aura is active.",
        icon: "pause",
        spellType: "aura",
        damage: { base: 0, total: 0, current: 0 },
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0, total: 0, current: 0 },
        critMultiplier: { base: 1, total: 1, current: 1 },
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: true,
        statusStats: {},
        auraEffect: {
          id: "stasis-aura-inline",
          name: "Stasis",
          icon: "pause",
          effects: [
            { type: "speed", value: -999, valueType: "flat", priority: "set" },
          ],
          baseTime: 4,
          currentTime: 4,
          totalTime: 4,
          stacks: 1,
        },
      },
    },
    {
      id: "stasis-survival-regen",
      type: "onLowHealth",
      action: "castAura",
      spell: {
        ...HEALTH_REGEN,
        name: "Health Regen",
        auraEffect: {
          ...HEALTH_REGEN.auraEffect!,
          baseTime: 4,
          currentTime: 4,
          totalTime: 4,
        },
      },
    },
  ],
};
