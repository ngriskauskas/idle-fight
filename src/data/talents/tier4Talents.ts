import { Talent } from "../../types";

export const MANA_OVERFLOW: Talent = {
  id: "mana-overflow",
  name: "Mana Overflow",
  description: "When your mana fills up it all erupts as an Arcane Nova. Only fills if you are not spending it.",
  icon: "💥",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 3,
  tier: 4,
  category: "utility",
  effects: [],
  triggers: [
    {
      id: "mana-overflow-nova",
      type: "onFullMana",
      action: "castSpell",
      spell: {
        id: "arcane-nova-inline",
        name: "Arcane Nova",
        description: "Unspent mana erupts, hitting every enemy.",
        icon: "handSpell",
        spellType: "magic",
        damage: { base: 1, total: 1, current: 1 },
        attackCost: { base: 0, total: 0, current: 0 },
        unlockCost: 0,
        unlocked: true,
        critChance: { base: 0.1, total: 0.1, current: 0.1 },
        critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
        manaCost: { base: 30, total: 30, current: 0 },
        isAoe: true,
        statusStats: {},
      },
    },
    {
      id: "mana-overflow-drain",
      type: "onFullMana",
      action: "gainMana",
      value: -100000,
    },
  ],
};

export const BULWARK: Talent = {
  id: "bulwark",
  name: "Bulwark",
  description: "Being attacked restores shield. Useless without a shield to fill.",
  icon: "🏰",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 4,
  category: "defense",
  effects: [],
  triggers: [
    {
      id: "bulwark-shield",
      type: "onTakeAttack",
      action: "gainShield",
      value: 4,
    },
  ],
};

export const SIPHON: Talent = {
  id: "siphon",
  name: "Siphon",
  description: "Kills restore mana. The more enemies, the more you can cast.",
  icon: "🌀",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 4,
  category: "utility",
  effects: [],
  triggers: [
    {
      id: "siphon-mana",
      type: "onKill",
      action: "gainMana",
      value: 6,
    },
  ],
};

export const GRAND_REPERTOIRE: Talent = {
  id: "grand-repertoire",
  name: "Grand Repertoire",
  description:
    "Needs level 20. One more spell slot. Six points is two other tier 4 talents, so take it when a spell completes the build.",
  icon: "🎼",
  unlocked: false,
  level: 0,
  maxLevel: 1,
  cost: 6,
  tier: 4,
  category: "utility",
  requiredLevel: 20,
  spellSlots: 1,
  effects: [],
};
