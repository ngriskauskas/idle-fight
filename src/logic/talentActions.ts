import { useGameStore } from "../store/gameStore";
import { addEffect, removeEffect } from "./effectActions";
import { addTrigger } from "./triggerActions";

export function unlockTalent(talentId: string) {
  let wasUnlocked = false;

  useGameStore.setState((state) => {
    const talent = state.talents.find((t) => t.id === talentId)!;
    if (state.talentPoints >= talent.cost && talent.maxLevel > talent.level) {
      talent.unlocked = true;
      state.talentPoints -= talent.cost;
      talent.level += 1;
      wasUnlocked = true;
    }
  });

  if (wasUnlocked) {
    const state = useGameStore.getState();
    const character = state.character;
    const talent = state.talents.find((t) => t.id === talentId)!;

    talent.effects.forEach((effect) => {
      removeEffect(character, effect, `talent-${talent.id}`);

      addEffect(
        character,
        {
          ...effect,
          value:
            effect.priority === "set"
              ? effect.value
              : effect.value * talent.level,
        },
        `talent-${talent.id}`,
        talent.name,
        "talent",
      );
    });

    talent.triggers?.forEach((trigger) => {
      addTrigger(trigger, character);
    });
  }
}
