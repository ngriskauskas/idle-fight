import { removeCharacterAuraEffect } from "../hooks/useCheckAuraEffects";
import { useGameStore } from "../store/gameStore";
import { AuraSpell, Character } from "../types";
import { getCombatant } from "../utils/getCombatant";

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
      const character = getCombatant("main", state)! as Character;

      if (character.spells.length >= character.spellCount) {
        const removedSpell = character.spells.pop();
        if (removedSpell && removedSpell.spellType === "aura") {
          auraIdToRemove = (removedSpell as AuraSpell).auraEffect.id;
        }
      }

      character.spells.push(spell);
    });

    if (auraIdToRemove) {
      removeCharacterAuraEffect(auraIdToRemove);
    }
  },

  unequipSpell: (spellId: string) => {
    let auraIdToRemove: string | null = null;

    useGameStore.setState((state) => {
      const character = getCombatant("main", state)! as Character;
      const spell = character.spells.find((s) => s.id === spellId);

      if (spell && spell.spellType === "aura") {
        auraIdToRemove = (spell as AuraSpell).auraEffect.id;
      }

      character.spells = character.spells.filter((spell) => spell.id !== spellId);
    });

    if (auraIdToRemove) {
      removeCharacterAuraEffect(auraIdToRemove);
    }
  },
};
