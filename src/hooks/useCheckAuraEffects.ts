import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { AuraEffect, AuraSpell, Effect } from "../types";
import { getScaleMulti } from "../logic/progressionActions";
import { ENEMY_MANA_COST_SCALE } from "../logic/enemyActions";
import { getCombatant } from "../utils/getCombatant";
import { addEffect, removeEffect, updateEffect } from "../logic/effectActions";
import { addTrigger, removeTrigger } from "../logic/triggerActions";

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
  }, [JSON.stringify(combatantAuraEffects)]);
}

// Stats whose aura bonuses are amounts (health, damage...) rather than ratios or timings.
const UNSCALED_AURA_STATS = ["speed", "critChance", "critMultiplier", "itemDropChance", "ice"];

// An enemy's flat aura bonuses grow with its wave, like its stats. A player's never do.
function scaleAuraEffects(effects: Effect[], casterIsEnemy: boolean): Effect[] {
  if (!casterIsEnemy) return effects;
  const scaleMulti = getScaleMulti();
  return effects.map((effect) =>
    effect.valueType === "flat" &&
    effect.priority === "normal" &&
    !UNSCALED_AURA_STATS.includes(effect.type)
      ? {
          ...effect,
          value: Math.round(
            effect.value * scaleMulti * (effect.type === "manaCost" ? ENEMY_MANA_COST_SCALE : 1),
          ),
        }
      : effect,
  );
}

export function applyAuraEffect(aura: AuraSpell, combatantId: string, casterIsEnemy?: boolean) {
  let isNew = true;
  const target = getCombatant(combatantId, useGameStore.getState());
  // without a named caster: a self aura was cast by its target, any other by the opposing side
  const byEnemy = casterIsEnemy ?? (aura.isSelfTargeted ? !!target?.isEnemy : !target?.isEnemy);
  const scaledEffects = scaleAuraEffects(aura.auraEffect.effects, byEnemy);
  useGameStore.setState((state) => {
    const target = getCombatant(combatantId, state);
    if (!target) return;

    const existingAura = target.auraEffects.find((a) => a.id === aura.auraEffect.id);

    if (existingAura) {
      if (existingAura.scaling) {
        existingAura.stacks = Math.min(
          existingAura.maxStacks ?? Infinity,
          existingAura.stacks + aura.auraEffect.stacks,
        );
      }
      // stacks only mean something on scaling auras; any re-application refreshes the timer
      existingAura.currentTime = existingAura.totalTime;
      existingAura.effects = scaledEffects;
      isNew = false;
    } else {
      const newAura: AuraEffect = {
        ...aura.auraEffect,
        effects: scaledEffects,
        currentTime: aura.auraEffect.totalTime,
      };
      target.auraEffects.push(newAura);
    }
  });

  if (isNew) {
    const combatant = getCombatant(combatantId, useGameStore.getState())!;
    scaledEffects.forEach((effect) => {
      addEffect(
        combatant,
        effect,
        `aura-${aura.auraEffect.id}-effect${effect.type}-${effect.valueType}`,
        aura.auraEffect.name,
        "aura",
      );
    });
    aura.auraEffect.triggers?.forEach((trigger) => addTrigger(trigger, combatant));
  } else {
    updateEffects(aura.auraEffect, combatantId);
  }
}

export function removeFragileAuras(targetId: string): void {
  const combatant = getCombatant(targetId, useGameStore.getState());
  if (!combatant) return;
  const fragileAuras = combatant.auraEffects.filter((a) => a.isFragile);
  if (fragileAuras.length === 0) return;

  useGameStore.setState((state) => {
    const combatantState = getCombatant(targetId, state);
    if (!combatantState) return;
    combatantState.auraEffects = combatantState.auraEffects.filter((a) => !a.isFragile);
  });

  fragileAuras.forEach((aura) => updateEffects(aura, targetId));
}

export function removeCharacterAuraEffect(auraId: string) {
  const combatant = getCombatant("main", useGameStore.getState())!;
  const removedAuras = combatant.auraEffects.filter((a) => a.id === auraId);

  useGameStore.setState((state) => {
    const combatantState = getCombatant("main", state)!;
    combatantState.auraEffects = combatantState.auraEffects.filter((a) => a.id !== auraId);
  });

  removedAuras.forEach((aura) => updateEffects(aura, "main"));
}

export function removeAllAuraEffects(combatantId: string) {
  const combatant = getCombatant(combatantId, useGameStore.getState());
  if (!combatant) return;
  const removedAuras = combatant.auraEffects;

  useGameStore.setState((state) => {
    const combatantState = getCombatant(combatantId, state)!;
    combatantState.auraEffects = [];
  });

  removedAuras.forEach((aura) => updateEffects(aura, combatantId));
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
    auraEffect.triggers?.forEach((trigger) => removeTrigger(trigger, combatant));
    if (auraEffect.triggers?.some((t) => t.action === "minusDefensePerBleedStack")) {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatantId, state);
        if (combatantState) combatantState.defense.current = combatantState.defense.total;
      });
    }
  } else {
    const multiplier = existingAura.scaling ? existingAura.stacks * existingAura.scaling : 1;
    existingAura.effects.forEach((effect) =>
      updateEffect(
        combatant,
        { ...effect, value: effect.value * multiplier },
        `aura-${auraEffect.id}-effect${effect.type}-${effect.valueType}`,
      ),
    );
  }
}
