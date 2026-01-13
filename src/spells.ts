import type { Spell } from "./spellTypes";
import { createSpellAttack, type Combatant } from "./utils/combatCalculations";

export const FIREBALL: Spell = {
  id: "fireball",
  name: "Fireball",
  description: "Launch a ball of fire dealing damage",
  icon: "🔥",
  level: 1,
  damage: 15,
  baseAttackCost: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 2,
  },
  onCast: (caster: Combatant) => {
    return createSpellAttack(caster, 15, { fire: 2 });
  },
};

export const ICE_BOLT: Spell = {
  id: "ice-bolt",
  name: "Ice Bolt",
  description: "Freeze enemies with magical ice",
  icon: "❄️",
  level: 3,
  damage: 18,
  baseAttackCost: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    ice: 3,
  },
  onCast: (caster: Combatant) => {
    return createSpellAttack(caster, 18, { ice: 3 });
  },
};

export const LIGHTNING_STRIKE: Spell = {
  id: "lightning-strike",
  name: "Lightning Strike",
  description: "Strike with the power of thunder",
  icon: "⚡",
  level: 5,
  baseAttackCost: 100,
  damage: 22,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    lightning: 3,
  },
  onCast: (caster: Combatant) => {
    return createSpellAttack(caster, 22, { lightning: 3 });
  },
};

export const METEOR_SHOWER: Spell = {
  id: "meteor-shower",
  name: "Meteor Shower",
  description: "Rain meteors from the sky",
  icon: "☄️",
  level: 10,
  baseAttackCost: 100,
  damage: 40,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 3,
  },
  onCast: (caster: Combatant) => {
    const attack = createSpellAttack(caster, 40, { fire: 3 });
    return { ...attack, isAoe: true };
  },
};

export const ARCANE_BURST: Spell = {
  id: "arcane-burst",
  name: "Arcane Burst",
  description: "Release pure arcane energy",
  icon: "✨",
  level: 7,
  baseAttackCost: 100,
  damage: 35,
  attackCost: 100,
  currentAttackCost: 0,
  onCast: (caster: Combatant) => {
    return createSpellAttack(caster, 35);
  },
};

export const INFERNO: Spell = {
  id: "inferno",
  name: "Inferno",
  description: "Engulf everything in flames",
  icon: "🌪️",
  baseAttackCost: 100,
  level: 15,
  damage: 60,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 5,
  },
  onCast: (caster: Combatant) => {
    const attack = createSpellAttack(caster, 60, { fire: 5 });
    return { ...attack, isAoe: true };
  },
};

export const ABSOLUTE_ZERO: Spell = {
  id: "absolute-zero",
  name: "Absolute Zero",
  description: "Reduce all heat to nothing",
  icon: "🧊",
  baseAttackCost: 100,
  level: 15,
  damage: 60,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    ice: 5,
  },
  onCast: (caster: Combatant) => {
    const attack = createSpellAttack(caster, 60, { ice: 5 });
    return { ...attack, isAoe: true };
  },
};

export const APOCALYPSE: Spell = {
  id: "apocalypse",
  name: "Apocalypse",
  description: "The ultimate destructive spell",
  baseAttackCost: 100,
  icon: "💀",
  level: 20,
  damage: 100,
  attackCost: 100,
  currentAttackCost: 0,
  statusStats: {
    fire: 3,
    lightning: 3,
  },
  onCast: (caster: Combatant) => {
    const attack = createSpellAttack(caster, 100, { fire: 3, lightning: 3 });
    return { ...attack, isAoe: true };
  },
};

export const DEFAULT_SPELLS: Spell[] = [
  FIREBALL,
  ICE_BOLT,
  LIGHTNING_STRIKE,
  METEOR_SHOWER,
  ARCANE_BURST,
  INFERNO,
  ABSOLUTE_ZERO,
  APOCALYPSE,
];
