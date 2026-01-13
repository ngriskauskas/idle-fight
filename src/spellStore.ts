import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Spell } from "./spellTypes";
import { useEnemyStore } from "./enemyStore";
import { useCharacterStore } from "./characterStore";

interface SpellStore {
  spells: Spell[];
  equippedSpells: string[];
  maxEquippedSpells: number;
  setSpells: (spells: Spell[]) => void;
  equipSpell: (spellId: string) => void;
  unequipSpell: (spellId: string) => void;
  getSpellById: (spellId: string) => Spell | undefined;
  getEquippedSpells: () => Spell[];
  canEquipSpell: (spellId: string) => boolean;
  tickAndCastSpells: () => void;
  resetSpellCooldowns: () => void;
  recalculateEquippedSpellCosts: () => void;
}

export const useSpellStore = create<SpellStore>()(
  immer((set, get) => ({
    spells: [],
    equippedSpells: [],
    maxEquippedSpells: 2,

    setSpells: (spells: Spell[]) => {
      set((state) => {
        state.spells = spells;
      });
    },

    equipSpell: (spellId: string) => {
      set((state) => {
        const spell = state.spells.find((s) => s.id === spellId);
        if (
          spell &&
          !state.equippedSpells.includes(spellId) &&
          state.equippedSpells.length < state.maxEquippedSpells
        ) {
          // Calculate effective attack cost: base cost + character speed
          const characterStore = useCharacterStore.getState();
          spell.attackCost =
            spell.baseAttackCost + characterStore.character.speed;
          state.equippedSpells.push(spellId);
        }
      });
    },

    unequipSpell: (spellId: string) => {
      set((state) => {
        state.equippedSpells = state.equippedSpells.filter(
          (id) => id !== spellId
        );
        state.spells.find((s) => s.id === spellId)!.currentAttackCost = 0;
      });
    },

    getSpellById: (spellId: string) => {
      return get().spells.find((s) => s.id === spellId);
    },

    getEquippedSpells: () => {
      return get()
        .equippedSpells.map((id) => get().getSpellById(id))
        .filter((spell): spell is Spell => spell !== undefined);
    },

    canEquipSpell: (spellId: string) => {
      const state = get();
      return (
        state.equippedSpells.length < state.maxEquippedSpells ||
        state.equippedSpells.includes(spellId)
      );
    },

    tickAndCastSpells: (): void => {
      const equippedSpells = get().getEquippedSpells();
      const character = useCharacterStore.getState().character;

      equippedSpells.forEach((spell) => {
        if (spell.currentAttackCost >= spell.attackCost) {
          const attack = spell.onCast(character);

          set((state) => {
            const spellToReset = state.spells.find((s) => s.id === spell.id);
            if (spellToReset) {
              spellToReset.currentAttackCost = 0;
            }
          });

          const enemyStore = useEnemyStore.getState();
          enemyStore.damageFirstEnemy(attack);
        } else {
          set((state) => {
            const spellToTick = state.spells.find((s) => s.id === spell.id);
            if (spellToTick) {
              spellToTick.currentAttackCost = Math.min(
                spellToTick.attackCost,
                spellToTick.currentAttackCost + 1
              );
            }
          });
        }
      });
    },

    resetSpellCooldowns: () => {
      set((state) => {
        state.spells.forEach((spell) => {
          spell.currentAttackCost = 0;
        });
      });
    },

    recalculateEquippedSpellCosts: () => {
      set((state) => {
        const characterStore = useCharacterStore.getState();
        const characterSpeed = characterStore.character.speed;

        state.equippedSpells.forEach((spellId) => {
          const spell = state.spells.find((s) => s.id === spellId);
          if (spell) {
            spell.attackCost = spell.baseAttackCost + characterSpeed;
          }
        });
      });
    },
  }))
);
