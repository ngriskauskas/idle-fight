import { useGameStore } from "../store/gameStore";
import type { AuraEffect, Combatant, Effect } from "../types";
import { Trigger } from "../types/triggers";
import { addEffect, removeEffect } from "./effectActions";
import { callTriggerAction } from "./triggerActions";

export function applyAuraEffect(
  target: Combatant,
  auraEffect: AuraEffect,
): void {
  let effectsToAdd: Effect[] = [];
  let effectsToRemove: Effect[] = [];
  let stacks = 0;

  useGameStore.setState((state) => {
    const stateTarget = target.isMainCharacter
      ? state.character
      : state.enemies.find((e) => e.id === target.id)!;

    const existingAura = stateTarget.auraEffects.find(
      (a) => a.id === auraEffect.id,
    );

    if (existingAura) {
      existingAura.stacks += auraEffect.stacks;
      stacks = existingAura.stacks;
      effectsToAdd = auraEffect.effects;
      effectsToRemove = existingAura.effects.map((e) => ({ ...e }));
    } else {
      const newAura: AuraEffect = {
        ...auraEffect,
        currentTime: auraEffect.totalTime,
      };
      stateTarget.auraEffects.push(newAura);
      stacks = newAura.stacks;
      effectsToAdd = newAura.effects;
    }
  });

  const multiplier = auraEffect.scaling ? stacks * auraEffect.scaling : 1;

  effectsToRemove.forEach((effect) =>
    removeEffect(
      target,
      effect,
      `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
    ),
  );

  effectsToAdd.forEach((effect) =>
    addEffect(
      target,
      { ...effect, value: effect.value * multiplier },
      `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
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

  const effectsToAdd: {
    effect: Effect;
    stacks: number;
    auraEffect: AuraEffect;
    combatant: Combatant;
  }[] = [];

  const auraTickTriggers: { trigger: Trigger; combatant: Combatant }[] = [];

  useGameStore.setState((state) => {
    const processCombatant = (target: Combatant) => {
      for (const aura of target.auraEffects) {
        aura.currentTime -= 1;

        if (aura.tickTriggers) {
          auraTickTriggers.push(
            ...aura.tickTriggers.map((trigger) => ({
              trigger: { ...trigger },
              combatant: { ...target },
            })),
          );
        }
      }

      const expiredAuras = target.auraEffects.filter((a) => a.currentTime <= 0);
      expiredAuras.forEach((aura) => {
        aura.stacks -= 1;
        aura.effects.forEach((effect) => {
          effect.value =
            effect.value * (aura.scaling ? aura.stacks * aura.scaling : 1);
          effectsToRemove.push({
            effect: { ...effect },
            auraId: aura.id,
            combatant: { ...target },
          });
          effectsToAdd.push({
            effect: { ...effect },
            stacks: aura.stacks,
            auraEffect: { ...aura },
            combatant: { ...target },
          });
        });
        if (aura.stacks > 0) {
          aura.currentTime = aura.totalTime;
        }
      });

      target.auraEffects = target.auraEffects.filter(
        (a) => a.currentTime > 0 && a.stacks > 0,
      );
    };

    processCombatant(state.character);
    state.enemies.forEach(processCombatant);
  });

  effectsToRemove.forEach(({ effect, auraId, combatant }) => {
    if (combatant)
      removeEffect(
        combatant,
        effect,
        `aura-${auraId}-effect${effect.type}-${effect.valueType}`,
      );
  });

  effectsToAdd.forEach(({ effect, stacks, auraEffect, combatant }) =>
    addEffect(
      combatant,
      {
        ...effect,
        value:
          effect.value * (auraEffect.scaling ? stacks * auraEffect.scaling : 1),
      },
      `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
      auraEffect.name,
      "aura",
    ),
  );

  auraTickTriggers.forEach(({ trigger, combatant }) => {
    callTriggerAction(trigger, combatant);
  });
}

export function removeFragileAuras(target: Combatant): void {
  const state = useGameStore.getState();
  const stateTarget = target.isMainCharacter
    ? state.character
    : state.enemies.find((e) => e.id === target.id)!;

  const fragileAuras = stateTarget.auraEffects.filter((a) => a.isFragile);
  fragileAuras.forEach((aura) => {
    removeAura(aura.id);
  });
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
    removeEffect(
      character,
      effect,
      `aura-${auraId}-effect${effect.type}-${effect.valueType}`,
    ),
  );
}
