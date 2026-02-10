import { useGameStore } from "../store/gameStore";
import type { Effect, ActiveEffect, Combatant } from "../types";
import { getCombatant } from "../utils/getCombatant";
import { getEffectMap } from "./effectActionMap";

export function updateEffect(combatant: Combatant, effect: Effect, effectId: string) {
  useGameStore.setState((state) => {
    const target = getCombatant(combatant.id, state);
    if (!target) return;

    const activeEffect = target.appliedEffects[effect.type].find((ae) => ae.id === effectId);
    if (!activeEffect) return;

    activeEffect.effect = effect;
  });

  const effectMap = getEffectMap(combatant);
  const applier = effectMap[effect.type]!;
  applier();
}

export function addEffect(
  combatant: Combatant,
  effect: Effect,
  effectId: string,
  effectName: string,
  effectSourceType: string,
): void {
  useGameStore.setState((state) => {
    const target = getCombatant(combatant.id, state);
    if (!target) return;

    const existingEffect = target.appliedEffects[effect.type].find((ae) => ae.id === effectId);
    if (existingEffect) return;

    const activeEffect: ActiveEffect = {
      id: effectId,
      type: effectSourceType,
      name: effectName,
      effect,
    };

    target.appliedEffects[effect.type].push(activeEffect);
  });

  const effectMap = getEffectMap(combatant);
  const applier = effectMap[effect.type]!;
  applier();
}

export function removeEffect(combatant: Combatant, effect: Effect, effectId: string): void {
  useGameStore.setState((state) => {
    const target = getCombatant(combatant.id, state);
    if (!target) return;

    const activeEffect = target.appliedEffects[effect.type].find((ae) => ae.id === effectId);
    if (!activeEffect) return;

    target.appliedEffects[effect.type] = target.appliedEffects[effect.type].filter(
      (ae) => ae.id !== effectId,
    );
  });

  const effectMap = getEffectMap(combatant);
  const applier = effectMap[effect.type]!;
  applier();
}
