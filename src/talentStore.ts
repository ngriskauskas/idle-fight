import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useCharacterStore } from "./characterStore";
import { useSpellStore } from "./spellStore";

export interface Talent {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  category: "attack" | "defense" | "speed" | "status";
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
  },
  {
    id: "poison-strike",
    name: "Poison Strike",
    description: "+1 Poison damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
  },
  {
    id: "flame-strike",
    name: "Flame Strike",
    description: "+2 Fire damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
  },
  {
    id: "lightning-strike",
    name: "Lightning Strike",
    description: "+3 Lightning damage per attack level",
    level: 0,
    maxLevel: 5,
    category: "status",
  },
  {
    id: "iron-skin",
    name: "Iron Skin",
    description: "+1 Defense per level",
    level: 0,
    maxLevel: 10,
    category: "defense",
  },
  {
    id: "nimble-feet",
    name: "Nimble Feet",
    description: "+1 Speed per level",
    level: 0,
    maxLevel: 5,
    category: "speed",
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

          // Apply talent effects based on ID
          switch (talentId) {
            case "increased-attack":
              useCharacterStore.setState((charState) => {
                charState.character.attack += 1;
                charState.character.currentAttack += 1;
              });
              break;
            case "poison-strike":
              useCharacterStore.setState((charState) => {
                charState.character.statusStats.poison += 1;
              });
              break;
            case "flame-strike":
              useCharacterStore.setState((charState) => {
                charState.character.statusStats.fire += 2;
              });
              break;
            case "lightning-strike":
              useCharacterStore.setState((charState) => {
                charState.character.statusStats.lightning += 3;
              });
              break;
            case "iron-skin":
              useCharacterStore.setState((charState) => {
                charState.character.defense += 1;
                charState.character.currentDefense += 1;
              });
              break;
            case "nimble-feet":
              useCharacterStore.setState((charState) => {
                charState.character.speed += 1;
              });
              useSpellStore.getState().recalculateEquippedSpellCosts();
              break;
          }
        }
      });
    },
    getTalentById: (talentId: string) => {
      return get().talents.find((t) => t.id === talentId);
    },
  }))
);
