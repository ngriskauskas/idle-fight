import { useGameStore } from "../store/gameStore";
import {
  recalcCharacterSpellSpeeds,
  recalcCharacterSpellCosts,
} from "./combatantActions";
import { removeAura } from "./auraActions";

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
        if (
          removedSpell &&
          removedSpell.spellType === "aura" &&
          removedSpell.auraEffect
        ) {
          auraIdToRemove = removedSpell.auraEffect.id;
        }
      }

      const equippedSpell = {
        ...spell,
        auraEffect: spell.auraEffect ? { ...spell.auraEffect } : undefined,
        statusStats: { ...spell.statusStats },
      };

      state.character.spells.push(equippedSpell);
    });

    if (auraIdToRemove) {
      removeAura(auraIdToRemove);
    }
    recalcCharacterSpellSpeeds();
    recalcCharacterSpellCosts();
  },

  unequipSpell: (spellId: string) => {
    let auraIdToRemove: string | null = null;

    useGameStore.setState((state) => {
      const spell = state.character.spells.find((s) => s.id === spellId);

      if (spell && spell.spellType === "aura" && spell.auraEffect) {
        auraIdToRemove = spell.auraEffect.id;
      }

      state.character.spells = state.character.spells.filter(
        (spell) => spell.id !== spellId,
      );
    });

    if (auraIdToRemove) {
      removeAura(auraIdToRemove);
    }
  },
};
