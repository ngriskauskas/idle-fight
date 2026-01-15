import type { Spell } from "./spellTypes";

export const STRIKE: Spell = {
  id: "strike",
  name: "Strike",
  description: "A basic melee attack",
  icon: "👊",
  damage: 1000,
  baseAttackCost: 50,
  attackCost: 50,
  currentAttackCost: 0,
  statusStats: {},
};

export const FIREBALL: Spell = {
  id: "fireball",
  name: "Fireball",
  description: "Launch a ball of fire dealing damage",
  icon: "🔥",
  damage: 15,
  baseAttackCost: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 2,
  },
};

export const ICE_BOLT: Spell = {
  id: "ice-bolt",
  name: "Ice Bolt",
  description: "Freeze enemies with magical ice",
  icon: "❄️",
  damage: 18,
  baseAttackCost: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    ice: 3,
  },
};

export const LIGHTNING_STRIKE: Spell = {
  id: "lightning-strike",
  name: "Lightning Strike",
  description: "Strike with the power of thunder",
  icon: "⚡",
  baseAttackCost: 100,
  damage: 22,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    lightning: 3,
  },
};

export const METEOR_SHOWER: Spell = {
  id: "meteor-shower",
  name: "Meteor Shower",
  description: "Rain meteors from the sky",
  icon: "☄️",
  baseAttackCost: 100,
  damage: 40,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 3,
  },
};

export const ARCANE_BURST: Spell = {
  id: "arcane-burst",
  name: "Arcane Burst",
  description: "Release pure arcane energy",
  icon: "✨",
  baseAttackCost: 100,
  damage: 35,
  attackCost: 100,
  currentAttackCost: 0,
};

export const INFERNO: Spell = {
  id: "inferno",
  name: "Inferno",
  description: "Engulf everything in flames",
  icon: "🌪️",
  baseAttackCost: 100,
  damage: 60,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 5,
  },
};

export const ABSOLUTE_ZERO: Spell = {
  id: "absolute-zero",
  name: "Absolute Zero",
  description: "Reduce all heat to nothing",
  icon: "🧊",
  baseAttackCost: 100,
  damage: 60,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    ice: 5,
  },
};

export const APOCALYPSE: Spell = {
  id: "apocalypse",
  name: "Apocalypse",
  description: "The ultimate destructive spell",
  baseAttackCost: 100,
  icon: "💀",
  damage: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 3,
    lightning: 3,
  },
};

export const DEFAULT_SPELLS: Spell[] = [
  STRIKE,
  FIREBALL,
  ICE_BOLT,
  LIGHTNING_STRIKE,
  METEOR_SHOWER,
  ARCANE_BURST,
  INFERNO,
  ABSOLUTE_ZERO,
  APOCALYPSE,
];
