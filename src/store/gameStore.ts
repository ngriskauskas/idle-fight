import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { Character, Enemy, Spell, Talent, Log } from "../types";
import { DEFAULT_SPELLS, STRIKE } from "../data/spellData";
import { DEFAULT_TALENTS } from "../data/talentData";

enableMapSet();

export interface GameState {
  character: Character;
  enemies: Enemy[];
  itemIdCounter: number;
  logIdCounter: number;
  logs: Log[];
  selectedLogTypes: Set<string>;

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
}

const initialCharacter: Character = {
  id: "player",
  name: "Player",
  icon: "sword",
  isMainCharacter: true,
  health: 100,
  maxHealth: 100,
  shield: 0,
  maxShield: 0,
  attack: 5,
  currentAttack: 5,
  defense: 2,
  currentDefense: 2,
  speed: 10,
  level: 1,
  healthRegen: 0,
  shieldRegen: 0,
  statusEffects: [],
  statusStats: {
    poison: 0,
    bleed: 0,
    fire: 0,
    ice: 0,
    lightning: 0,
  },
  auraEffects: [],
  experience: 0,
  experienceNeeded: 10,
  itemDropChance: 0.1,
  respawnTime: 5,
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
  spells: [STRIKE],
  spellCount: 1,
};

export const useGameStore = create<GameState>()(
  immer(
    (): GameState => ({
      character: initialCharacter,
      enemies: [],
      itemIdCounter: 0,
      logIdCounter: 0,
      logs: [],
      selectedLogTypes: new Set(["damage", "kill", "levelUp", "itemDrop"]),
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
    }),
  ),
);
