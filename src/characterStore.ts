import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useProgressionStore } from "./progressionStore";
import { useTalentStore } from "./talentStore";
import { useSpellStore } from "./spellStore";
import { Attack, Combatant, resolveAttack } from "./utils/combatCalculations";

export interface CharacterStats extends Combatant {
  speed: number;
  experience: number;
  experienceNeeded: number;
  respawnTime: number;
  currentRespawnTime: number;
}

interface CharacterStore {
  character: CharacterStats;
  takeDamage: (damage: number) => void;
  gainExperience: (amount: number) => void;
  levelUp: () => void;
  takeAttack: (attack: Attack) => void;
  tickStatusEffects: () => void;
  tickRespawnTimer: () => void;
  resurrect: () => void;
  onDeath: () => void;
}

export const useCharacterStore = create<CharacterStore>()(
  immer((set, get) => ({
    character: {
      health: 200,
      maxHealth: 200,
      attack: 10,
      currentAttack: 10,
      defense: 100,
      currentDefense: 100,
      speed: 10,
      level: 1,
      experience: 0,
      experienceNeeded: 100,
      respawnTime: 5,
      currentRespawnTime: 0,
      statusEffects: [],
      statusStats: {
        poison: 0,
        bleed: 3,
        fire: 0,
        ice: 0,
        lightning: 3,
      },
    },
    takeDamage: (damage: number) => {
      set((state) => {
        state.character.health = Math.max(0, state.character.health - damage);
      });

      if (get().character.health <= 0) {
        get().onDeath();
      }
    },
    gainExperience: (amount: number) => {
      set((state) => {
        state.character.experience += amount;
      });

      if (get().character.experience >= get().character.experienceNeeded) {
        get().levelUp();
      }
    },
    levelUp: () => {
      set((state) => {
        state.character.experience = 0;
        state.character.level += 1;
        state.character.experienceNeeded = state.character.experienceNeeded * 2;
      });

      // Grant a talent point
      const talentStore = useTalentStore.getState();
      talentStore.addTalentPoint();
    },
    takeAttack: (attack: Attack) => {
      const result = resolveAttack(get().character, attack);

      set((state) => {
        state.character.statusEffects = result.statusEffects;
      });

      if (result.damage > 0) {
        get().takeDamage(result.damage);
      }
    },
    onDeath: (): void => {
      set((state) => {
        state.character.currentRespawnTime = state.character.respawnTime;
        state.character.statusEffects = [];
        // Reset stat modifications from status effects
        state.character.currentAttack = state.character.attack;
        state.character.currentDefense = state.character.defense;
      });

      const spellStore = useSpellStore.getState();
      spellStore.resetSpellCooldowns();
      spellStore.recalculateEquippedSpellCosts();

      const progressionStore = useProgressionStore.getState();
      progressionStore.resetToWorldStart();
    },
    tickRespawnTimer: (): void => {
      set((state) => {
        if (state.character.currentRespawnTime > 0) {
          state.character.currentRespawnTime--;
        }
      });

      if (
        get().character.currentRespawnTime === 0 &&
        get().character.health <= 0
      ) {
        get().resurrect();
      }
    },
    resurrect: (): void => {
      set((state) => {
        state.character.health = state.character.maxHealth;
        state.character.currentRespawnTime = 0;
      });
    },
    tickStatusEffects: (): void => {
      get().character.statusEffects.forEach((effect) => {
        effect.tickEffect(effect);
      });
      set((state) => {
        state.character.statusEffects.forEach((effect) => {
          if (effect.stacks >= 0) {
            effect.stacks--;
          }
        });
        state.character.statusEffects = state.character.statusEffects.filter(
          (effect) => effect.stacks >= 0
        );
      });
    },
  }))
);
