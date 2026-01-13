import type { StatusEffect } from "../statusEffects";
import {
  POISON_EFFECT,
  BLEED_EFFECT,
  FIRE_EFFECT,
  ICE_EFFECT,
  LIGHTNING_EFFECT,
  createStatusEffect,
} from "../statusEffects";

export interface StatusStats {
  poison: number;
  bleed: number;
  fire: number;
  ice: number;
  lightning: number;
}

export interface Combatant {
  health: number;
  maxHealth: number;
  attack: number;
  currentAttack: number;
  defense: number;
  currentDefense: number;
  speed: number;
  level: number;
  statusEffects: StatusEffect[];
  statusStats: StatusStats;
}

export interface Attack {
  damage: number;
  isCrit: boolean;
  isAoe: boolean;
  effects: StatusEffect[];
}

export const isDead = (combatant: Combatant): boolean => {
  return combatant.health <= 0;
};

const STATUS_EFFECT_MAP = {
  poison: POISON_EFFECT,
  bleed: BLEED_EFFECT,
  fire: FIRE_EFFECT,
  ice: ICE_EFFECT,
  lightning: LIGHTNING_EFFECT,
} as const;

type StatusEffectType = keyof typeof STATUS_EFFECT_MAP;

const addStatusEffect = (
  effects: StatusEffect[],
  type: StatusEffectType,
  stacks: number
): void => {
  if (stacks <= 0) return;

  const existingIndex = effects.findIndex((e) => e.type === type);
  if (existingIndex >= 0) {
    effects[existingIndex] = {
      ...effects[existingIndex],
      stacks: effects[existingIndex].stacks + stacks,
    };
  } else {
    effects.push(createStatusEffect(STATUS_EFFECT_MAP[type], stacks));
  }
};

export const createSpellAttack = (
  caster: Combatant,
  spellDamage: number,
  spellStatusStats?: {
    poison?: number;
    bleed?: number;
    fire?: number;
    ice?: number;
    lightning?: number;
  }
): Attack => {
  const effects: StatusEffect[] = [];

  // Add character's inherent status stats
  (Object.keys(STATUS_EFFECT_MAP) as StatusEffectType[]).forEach((type) => {
    addStatusEffect(effects, type, caster.statusStats[type]);
  });

  // Add spell's inherent status stats
  if (spellStatusStats) {
    (Object.keys(STATUS_EFFECT_MAP) as StatusEffectType[]).forEach((type) => {
      const spellStacks = spellStatusStats[type];
      if (spellStacks && spellStacks > 0) {
        addStatusEffect(effects, type, spellStacks);
      }
    });
  }

  return {
    damage: caster.currentAttack + spellDamage,
    isCrit: false,
    isAoe: false,
    effects,
  };
};

export const resolveStatusEffects = (
  currentEffects: StatusEffect[],
  newEffects: StatusEffect[]
): StatusEffect[] => {
  const result = [...currentEffects];

  newEffects.forEach((newEffect) => {
    const existingIndex = result.findIndex((e) => e.type === newEffect.type);
    if (existingIndex >= 0) {
      result[existingIndex] = {
        ...result[existingIndex],
        stacks: result[existingIndex].stacks + newEffect.stacks,
      };
    } else {
      result.push(newEffect);
    }
  });

  return result;
};

export const resolveAttack = (
  defender: Combatant,
  attack: Attack
): {
  damage: number;
  statusEffects: StatusEffect[];
} => {
  const damage = Math.max(0, attack.damage - defender.currentDefense);

  const statusEffects = resolveStatusEffects(
    defender.statusEffects,
    attack.effects
  );

  return {
    damage,
    statusEffects,
  };
};
