import { removeCharacterAuraEffect } from "../hooks/useCheckAuraEffects";
import { useGameStore } from "../store/gameStore";
import { AuraSpell } from "../types";

export const spellActions = {
  unlockSpell: (spellId: string) => {
    useGameStore.setState((state) => {
      const spell = state.spells.find((s) => s.id === spellId)!;
      if (state.spellPoints >= spell.unlockCost) {
        spell.unlocked = true;
        state.spellPoints -= spell.unlockCost;
      }
    });
  },

  equipSpell: (spellId: string) => {
    let auraIdToRemove: string | null = null;

    useGameStore.setState((state) => {
      const spell = state.spells.find((s) => s.id === spellId)!;

      if (state.character.spells.length >= state.character.spellCount) {
        const removedSpell = state.character.spells.pop();
        if (removedSpell && removedSpell.spellType === "aura") {
          auraIdToRemove = (removedSpell as AuraSpell).auraEffect.id;
        }
      }

      state.character.spells.push(spell);
    });

    if (auraIdToRemove) {
      removeCharacterAuraEffect(auraIdToRemove);
    }
  },

  unequipSpell: (spellId: string) => {
    let auraIdToRemove: string | null = null;

    useGameStore.setState((state) => {
      const spell = state.character.spells.find((s) => s.id === spellId);

      if (spell && spell.spellType === "aura") {
        auraIdToRemove = (spell as AuraSpell).auraEffect.id;
      }

      state.character.spells = state.character.spells.filter((spell) => spell.id !== spellId);
    });

    if (auraIdToRemove) {
      removeCharacterAuraEffect(auraIdToRemove);
    }
  },
};
