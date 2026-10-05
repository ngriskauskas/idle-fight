import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Character, Enemy, Spell, Talent, Log, Combatant } from "../types";
import { DEFAULT_SPELLS } from "../data/spells";
import { DEFAULT_TALENTS } from "../data/talents/index";
import { AnimationOccurrence } from "../types/animation";
import { STRIKE } from "../data/spells/physSpells";
import { HEALTH_REGEN } from "../data/spells/auras";

export interface GameState {
  enemies: Enemy[];
  friends: Combatant[];
  itemIdCounter: number;
  logIdCounter: number;
  logs: Log[];
  selectedLogTypes: Record<string, boolean>;

  progress: {
    enemy: number;
    wave: number;
    world: number;
    highest: {
      enemy: number;
      wave: number;
      world: number;
    };
  };
  spells: Spell[];
  talents: Talent[];
  talentPoints: number;
  spellPoints: number;

  isPaused: boolean;
  showDebugPanel: boolean;
  animationQueue: AnimationOccurrence[];
}

const initialCharacter: Character = {
  id: "main",
  name: "Player",
  icon: "sword",
  isDead: false,
  isMainCharacter: true,
  isEnemy: false,
  health: { base: 40, total: 40, current: 40 },
  maxHealth: { base: 40, total: 40, current: 40 },
  shield: { base: 0, total: 0, current: 0 },
  maxShield: { base: 0, total: 0, current: 0 },
  attack: { base: 3, total: 3, current: 3 },
  defense: { base: 0, total: 0, current: 0 },
  speed: { base: 0, total: 0, current: 0 },
  level: 1,
  healthRegen: { base: 0, total: 0, current: 0 },
  shieldRegen: { base: 0, total: 0, current: 0 },
  healthLeech: { base: 0, total: 0, current: 0 },
  manaLeech: { base: 0, total: 0, current: 0 },
  critChance: { base: 0.1, total: 0.1, current: 0.1 },
  critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
  statusEffects: [],
  statusStats: {
    poison: { base: 0, total: 0, current: 0 },
    bleed: { base: 0, total: 0, current: 0 },
    fire: { base: 0, total: 0, current: 0 },
    ice: { base: 0, total: 0, current: 0 },
    lightning: { base: 0, total: 0, current: 0 },
  },
  auraEffects: [],
  experience: 0,
  experienceNeeded: 5,
  itemDropChance: { base: 0.1, total: 0.1, current: 0.1 },
  respawnTime: 4,
  currentRespawnTime: 0,
  items: [],
  equippedSlots: {
    body: null,
    helmet: null,
    legs: null,
    boots: null,
    weapon1: null,
    weapon2: null,
    ring1: null,
    ring2: null,
    amulet: null,
  },
  spells: [STRIKE, HEALTH_REGEN],
  spellCount: 2,
  mana: { base: 50, total: 50, current: 50 },
  maxMana: { base: 50, total: 50, current: 50 },
  manaRegen: { base: 2, total: 2, current: 2 },
  manaCost: { base: 0, total: 0, current: 0 },
  appliedEffects: {
    damage: [],
    defense: [],
    health: [],
    shield: [],
    speed: [],
    mana: [],
    manaRegen: [],
    manaCost: [],
    critChance: [],
    critMultiplier: [],
    healthRegen: [],
    shieldRegen: [],
    healthLeech: [],
    manaLeech: [],
    itemDropChance: [],
    poison: [],
    bleed: [],
    fire: [],
    ice: [],
    lightning: [],
  },
  triggers: {
    onHit: [],
    onCrit: [],
    onKill: [],
    onTakeDamage: [],
    onEnemySpawn: [],
    onLowHealth: [],
    onFullMana: [],
    onTakeAttack: [],
    tickTrigger: [],
    onDeath: [],
    onBleedChange: [],
  },
};

export const testCompanion: Combatant = {
  id: "companion-1",
  name: "Test Companion",
  icon: "shield",
  isDead: false,
  isMainCharacter: false,
  isEnemy: false,
  health: { base: 20, total: 20, current: 20 },
  maxHealth: { base: 20, total: 20, current: 20 },
  shield: { base: 0, total: 0, current: 0 },
  maxShield: { base: 0, total: 0, current: 0 },
  attack: { base: 2, total: 2, current: 2 },
  defense: { base: 1, total: 1, current: 1 },
  speed: { base: 0, total: 0, current: 0 },
  level: 1,
  healthRegen: { base: 0, total: 0, current: 0 },
  shieldRegen: { base: 0, total: 0, current: 0 },
  healthLeech: { base: 0, total: 0, current: 0 },
  manaLeech: { base: 0, total: 0, current: 0 },
  critChance: { base: 0.05, total: 0.05, current: 0.05 },
  critMultiplier: { base: 1.3, total: 1.3, current: 1.3 },
  statusEffects: [],
  statusStats: {
    poison: { base: 0, total: 0, current: 0 },
    bleed: { base: 0, total: 0, current: 0 },
    fire: { base: 0, total: 0, current: 0 },
    ice: { base: 0, total: 0, current: 0 },
    lightning: { base: 0, total: 0, current: 0 },
  },
  auraEffects: [],
  spells: [STRIKE],
  appliedEffects: {
    damage: [],
    defense: [],
    health: [],
    shield: [],
    speed: [],
    mana: [],
    manaRegen: [],
    manaCost: [],
    critChance: [],
    critMultiplier: [],
    healthRegen: [],
    shieldRegen: [],
    healthLeech: [],
    manaLeech: [],
    itemDropChance: [],
    poison: [],
    bleed: [],
    fire: [],
    ice: [],
    lightning: [],
  },
  triggers: {
    onHit: [],
    onCrit: [],
    onKill: [],
    onTakeDamage: [],
    onEnemySpawn: [],
    onLowHealth: [],
    onFullMana: [],
    onTakeAttack: [],
    tickTrigger: [],
    onDeath: [],
    onBleedChange: [],
  },
  mana: { base: 30, total: 30, current: 30 },
  maxMana: { base: 30, total: 30, current: 30 },
  manaRegen: { base: 0, total: 0, current: 0 },
  manaCost: { base: 0, total: 0, current: 0 },
};

export const useGameStore = create<GameState>()(
  immer(
    (): GameState => ({
      enemies: [],
      friends: [initialCharacter],
      itemIdCounter: 0,
      logIdCounter: 0,
      logs: [],
      selectedLogTypes: {
        damage: true,
        kill: true,
        itemDrop: true,
      },
      spells: DEFAULT_SPELLS,
      talents: DEFAULT_TALENTS,
      talentPoints: 0,
      spellPoints: 0,

      progress: {
        enemy: 1,
        wave: 1,
        world: 1,
        highest: {
          enemy: 1,
          wave: 1,
          world: 1,
        },
      },

      isPaused: false,
      showDebugPanel: false,
      animationQueue: [],
    }),
  ),
);
