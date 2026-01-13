import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useCharacterStore } from "./characterStore";

export interface Talent {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  category: "attack" | "defense" | "speed" | "status";
  onLevelUp: () => void;
}

interface TalentStore {
  talents: Talent[];
  availablePoints: number;
  addTalentPoint: () => void;
  levelUpTalent: (talentId: string) => void;
  getTalentById: (talentId: string) => Talent | undefined;
}

const DEFAULT_TALENTS: Talent[] = [
  {
    id: "increased-attack",
    name: "Increased Attack",
    description: "+1 Attack per level",
    level: 0,
    maxLevel: 10,
    category: "attack",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.attack += 1;
        state.character.currentAttack += 1;
      });
    },
  },
  {
    id: "poison-strike",
    name: "Poison Strike",
    description: "+1 Poison damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.statusStats.poison += 1;
      });
    },
  },
  {
    id: "flame-strike",
    name: "Flame Strike",
    description: "+2 Fire damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.statusStats.fire += 2;
      });
    },
  },
  {
    id: "lightning-strike",
    name: "Lightning Strike",
    description: "+3 Lightning damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.statusStats.lightning += 3;
      });
    },
  },
  {
    id: "iron-skin",
    name: "Iron Skin",
    description: "+1 Defense per level",
    level: 0,
    maxLevel: 10,
    category: "defense",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 1;
        state.character.currentDefense += 1;
      });
    },
  },
  {
    id: "nimble-feet",
    name: "Nimble Feet",
    description: "-5 Attack cost per level",
    level: 0,
    maxLevel: 5,
    category: "speed",
    onLevelUp: () => {
      useCharacterStore.setState((state) => {
        state.character.attackCost -= 5;
        state.character.currentAttackCost -= 5;
      });
    },
  },
];

export const useTalentStore = create<TalentStore>()(
  immer((set, get) => ({
    talents: DEFAULT_TALENTS,
    availablePoints: 0,
    addTalentPoint: () => {
      set((state) => {
        state.availablePoints += 1;
      });
    },
    levelUpTalent: (talentId: string) => {
      set((state) => {
        const talent = state.talents.find((t) => t.id === talentId);
        if (
          talent &&
          talent.level < talent.maxLevel &&
          state.availablePoints > 0
        ) {
          talent.level += 1;
          state.availablePoints -= 1;
          talent.onLevelUp();
        }
      });
    },
    getTalentById: (talentId: string) => {
      return get().talents.find((t) => t.id === talentId);
    },
  }))
);
