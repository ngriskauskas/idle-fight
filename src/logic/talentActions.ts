import { useGameStore } from "../store/gameStore";

export const talentActions = {
  unlockTalent: (talentId: string) => {
    useGameStore.setState((state) => {
      const talent = state.talents.find((t) => t.id === talentId);
      if (
        talent &&
        state.talentPoints >= talent.cost &&
        talent.maxLevel > talent.level
      ) {
        talent.unlocked = true;
        state.talentPoints -= talent.cost;
        talent.level += 1;
      }
    });
  },
};
