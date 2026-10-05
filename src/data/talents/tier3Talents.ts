import { Talent } from "../../types";
import { HEALTH_REGEN, WAR_CRY } from "../spells/auras";

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
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: false,
        isSelfTargeted: true,
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
    { type: "healthRegen", value: 0, valueType: "flat", priority: "set" },
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
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        manaCost: { base: 0, total: 0, current: 0 },
        isAoe: true,
        isSelfTargeted: true,
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

export const SHATTER: Talent = {
  id: "shatter",
  name: "Shatter",
  description: "Crits consume all ice on your target, dealing 3 damage per stack. Ends the slow.",
  icon: "💎",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "shatter-ice",
      type: "onCrit",
      action: "shatterStatus",
      status: "ice",
      value: 3,
    },
  ],
};

export const TOXIC_BLOOD: Talent = {
  id: "toxic-blood",
  name: "Toxic Blood",
  description: "Poison on you heals more than it hurts. Poison yourself on purpose.",
  icon: "🧪",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "status",
  effects: [],
  triggers: [
    {
      id: "toxic-blood-heal",
      type: "tickTrigger",
      action: "healPerOwnStatus",
      status: "poison",
      value: 2,
    },
  ],
};

export const BATTLE_TRANCE: Talent = {
  id: "battle-trance",
  name: "Battle Trance",
  description: "Hits have a chance to grant a stack of War Cry. Fast attacks stack it quickly.",
  icon: "🥁",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "attack",
  effects: [],
  triggers: [
    {
      id: "battle-trance-war-cry",
      type: "onHit",
      action: "castAura",
      chance: 15,
      spell: WAR_CRY,
    },
  ],
};

export const BLOODLETTING: Talent = {
  id: "bloodletting",
  name: "Bloodletting",
  description: "Losing health makes you bleed, but pushes all your attacks forward.",
  icon: "🗡️",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "speed",
  effects: [],
  triggers: [
    {
      id: "bloodletting-bleed",
      type: "onTakeDamage",
      action: "applyStatusSelf",
      status: "bleed",
      value: 2,
    },
    {
      id: "bloodletting-speed",
      type: "onTakeDamage",
      action: "speedBoost",
      value: 15,
    },
  ],
};

export const SPIKED_SHIELD: Talent = {
  id: "spiked-shield",
  name: "Spiked Shield",
  description: "Every attack against you is answered with a Riposte. Best when you can afford to be hit.",
  icon: "🔱",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 2,
  tier: 3,
  category: "defense",
  effects: [],
  triggers: [
    {
      id: "spiked-shield-riposte",
      type: "onTakeAttack",
      action: "castSpell",
      spell: {
        id: "riposte-inline",
        name: "Riposte",
        description: "Strike back at your attacker.",
        icon: "bigShield",
        spellType: "physical",
        damage: { base: 2, total: 2, current: 2 },
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0, total: 0, current: 0 },
        critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
        isAoe: false,
        statusStats: {},
      },
    },
  ],
};

export const SPLIT_MIND: Talent = {
  id: "split-mind",
  name: "Split Mind",
  description:
    "Needs level 14. One more spell slot. Pays off with on-hit and on-kill talents, which every extra spell feeds.",
  icon: "🧠",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 4,
  tier: 3,
  category: "utility",
  requiredLevel: 14,
  spellSlots: 1,
  effects: [],
};
