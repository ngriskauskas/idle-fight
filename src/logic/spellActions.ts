import { useGameStore } from "../store/gameStore";

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
    useGameStore.setState((state) => {
      if (state.character.spells.length < state.character.spellCount) {
        const spell = state.spells.find((s) => s.id === spellId)!;
        state.character.spells.push(spell);
      }
    });
  },

  unequipSpell: (spellId: string) => {
    useGameStore.setState((state) => {
      state.character.spells = state.character.spells.filter(
        (spell) => spell.id !== spellId,
      );
    });
  },
};
