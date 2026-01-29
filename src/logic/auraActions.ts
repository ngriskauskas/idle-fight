import { useGameStore } from "../store/gameStore";
import type { AuraEffect, Combatant, Effect } from "../types";
import { addEffect, removeEffect } from "./effectActions";
import {
  recalcCharacterSpellSpeeds,
  recalcEnemySpellSpeeds,
} from "./combatantActions";

export function applyAuraEffect(
  target: Combatant,
  auraEffect: AuraEffect,
): void {
  let effectsToAdd: typeof auraEffect.effects = [];

  useGameStore.setState((state) => {
    const stateTarget = target.isMainCharacter
      ? state.character
      : state.enemies.find((e) => e.id === target.id)!;

    const existingAura = stateTarget.auraEffects.find(
      (a) => a.id === auraEffect.id,
    );

    if (existingAura) {
      existingAura.stacks += auraEffect.stacks;
      existingAura.currentTime =
        existingAura.currentTime + existingAura.totalTime / 2;
    } else {
      const newAura: AuraEffect = {
        ...auraEffect,
        currentTime: auraEffect.totalTime,
      };
      stateTarget.auraEffects.push(newAura);
      effectsToAdd = newAura.effects;
    }
  });

  effectsToAdd.forEach((effect) =>
    addEffect(
      target,
      effect,
      `aura-${auraEffect.id}-effect${effect.type}`,
      auraEffect.name,
      "aura",
    ),
  );
}

export function tickAuraEffects(): void {
  const effectsToRemove: {
    effect: Effect;
    auraId: string;
    combatant: Combatant;
  }[] = [];

  useGameStore.setState((state) => {
    const processCombatant = (target: Combatant) => {
      for (const aura of target.auraEffects) {
        aura.currentTime -= 1;
      }

      const expiredAuras = target.auraEffects.filter((a) => a.currentTime <= 0);
      expiredAuras.forEach((aura) => {
        aura.effects.forEach((effect) => {
          effectsToRemove.push({
            effect: { ...effect },
            auraId: aura.id,
            combatant: { ...target },
          });
        });
      });

      target.auraEffects = target.auraEffects.filter((a) => a.currentTime > 0);
    };

    processCombatant(state.character);
    state.enemies.forEach(processCombatant);
  });

  effectsToRemove.forEach(({ effect, auraId, combatant }) => {
    if (combatant)
      removeEffect(combatant, effect, `aura-${auraId}-effect${effect.type}`);
  });

  recalcCharacterSpellSpeeds();
  recalcEnemySpellSpeeds();
}

export function removeAura(auraId: string): void {
  const effectsToRemove: { effect: Effect; auraId: string }[] = [];

  useGameStore.setState((state) => {
    const auraToRemove = state.character.auraEffects.find(
      (a) => a.id === auraId,
    );

    if (auraToRemove) {
      auraToRemove.effects.forEach((effect) => {
        effectsToRemove.push({ effect: { ...effect }, auraId });
      });

      state.character.auraEffects = state.character.auraEffects.filter(
        (a) => a.id !== auraId,
      );
    }
  });

  const character = useGameStore.getState().character;
  effectsToRemove.forEach(({ effect, auraId }) =>
    removeEffect(character, effect, `aura-${auraId}-effect${effect.type}`),
  );
  recalcCharacterSpellSpeeds();
}
