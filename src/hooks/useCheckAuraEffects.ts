import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { AuraEffect, AuraSpell } from "../types";
import { getCombatant } from "../utils/getCombatant";
import { addEffect, removeEffect, updateEffect } from "../logic/effectActions";

export function useCheckAuraEffects() {
  const combatantAuraEffects = useGameStore((state) => [
    ...state.friends.map((f) => ({ combatantId: f.id, auraEffects: f.auraEffects })),
    ...state.enemies.map((e) => ({ combatantId: e.id, auraEffects: e.auraEffects })),
  ]);

  useEffect(() => {
    combatantAuraEffects.forEach(({ combatantId, auraEffects }) => {
      auraEffects
        .filter((aura) => aura.currentTime <= 0)
        .forEach((aura) => {
          expireAuraEffect(aura, combatantId);
          updateEffects(aura, combatantId);
        });
    });
  }, [combatantAuraEffects]);
}

export function applyAuraEffect(aura: AuraSpell, combatantId: string) {
  let isNew = true;
  useGameStore.setState((state) => {
    const target = getCombatant(combatantId, state);
    if (!target) return;

    const existingAura = target.auraEffects.find((a) => a.id === aura.auraEffect.id);

    if (existingAura) {
      existingAura.stacks += aura.auraEffect.stacks;
      isNew = false;
    } else {
      const newAura: AuraEffect = {
        ...aura.auraEffect,
        currentTime: aura.auraEffect.totalTime,
      };
      target.auraEffects.push(newAura);
    }
  });

  if (isNew) {
    aura.auraEffect.effects.forEach((effect) =>
      addEffect(
        getCombatant(combatantId, useGameStore.getState())!,
        effect,
        `aura-${aura.auraEffect.id}-effect${effect.type}-${effect.valueType}`,
        aura.auraEffect.name,
        "aura",
      ),
    );
  } else {
    updateEffects(aura.auraEffect, combatantId);
  }
}

export function removeFragileAuras(targetId: string): void {
  useGameStore.setState((state) => {
    const combatantState = getCombatant(targetId, state);
    if (!combatantState) return;
    combatantState.auraEffects = combatantState.auraEffects.filter((a) => !a.isFragile);
  });

  const combatant = getCombatant(targetId, useGameStore.getState())!;
  combatant.auraEffects.filter((a) => a.isFragile).forEach((aura) => updateEffects(aura, targetId));
}

export function removeCharacterAuraEffect(auraId: string) {
  useGameStore.setState((state) => {
    const combatantState = getCombatant("main", state)!;
    combatantState.auraEffects = combatantState.auraEffects.filter((a) => a.id !== auraId);
  });

  const combatant = getCombatant("main", useGameStore.getState())!;
  combatant.auraEffects
    .filter((a) => a.id === auraId)
    .forEach((aura) => updateEffects(aura, "main"));
}

function expireAuraEffect(auraEffect: AuraEffect, combatantId: string) {
  useGameStore.setState((state) => {
    const combantantState = getCombatant(combatantId, state)!;
    const auraEffectState = combantantState.auraEffects.find((a) => a.id === auraEffect.id)!;
    auraEffectState.stacks -= 1;
    if (auraEffectState.stacks <= 0) {
      combantantState.auraEffects = combantantState.auraEffects.filter(
        (a) => a.id !== auraEffect.id,
      );
    } else {
      auraEffectState.currentTime = auraEffectState.totalTime;
    }
  });
}

function updateEffects(auraEffect: AuraEffect, combatantId: string) {
  const combatant = getCombatant(combatantId, useGameStore.getState())!;
  const existingAura = combatant.auraEffects.find((a) => a.id === auraEffect.id);
  const isExpired = !existingAura;

  if (isExpired) {
    auraEffect.effects.forEach((effect) =>
      removeEffect(
        combatant,
        effect,
        `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
      ),
    );
  } else {
    const multiplier = existingAura.scaling ? existingAura.stacks * existingAura.scaling : 1;
    auraEffect.effects.forEach((effect) =>
      updateEffect(
        combatant,
        { ...effect, value: effect.value * multiplier },
        `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
      ),
    );
  }
}
