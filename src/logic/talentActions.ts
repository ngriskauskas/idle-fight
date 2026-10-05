import { useGameStore } from "../store/gameStore";
import { getCombatant } from "../utils/getCombatant";
import { addEffect, removeEffect } from "./effectActions";
import { addTrigger, removeTrigger } from "./triggerActions";
import { getSpellCount } from "./characterActions";
import { Character } from "../types";

export function unlockTalent(talentId: string) {
  let wasUnlocked = false;

  useGameStore.setState((state) => {
    const talent = state.talents.find((t) => t.id === talentId)!;
    const character = getCombatant("main", state) as Character;
    const levelMet = character.level >= (talent.requiredLevel ?? 0);
    if (levelMet && state.talentPoints >= talent.cost && talent.maxLevel > talent.level) {
      talent.unlocked = true;
      state.talentPoints -= talent.cost;
      talent.level += 1;
      character.spellCount = Math.max(
        character.spellCount,
        getSpellCount(character.level, state.talents),
      );
      wasUnlocked = true;
    }
  });

  if (wasUnlocked) {
    const state = useGameStore.getState();
    const character = getCombatant("main", state)!;
    const talent = state.talents.find((t) => t.id === talentId)!;

    talent.effects.forEach((effect) => {
      removeEffect(character, effect, `talent-${talent.id}-${effect.valueType}`);

      addEffect(
        character,
        {
          ...effect,
          value: effect.priority === "set" ? effect.value : effect.value * talent.level,
        },
        `talent-${talent.id}-${effect.valueType}`,
        talent.name,
        "talent",
      );
    });

    talent.triggers?.forEach((trigger) => {
      removeTrigger(trigger, character);

      addTrigger(
        {
          ...trigger,
          value: trigger.value ? trigger.value * talent.level : trigger.value,
        },
        character,
      );
    });
  }
}
