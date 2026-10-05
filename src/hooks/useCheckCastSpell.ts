import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { AuraSpell, Combatant, MagicSpell, PhysicalSpell, Spell } from "../types";
import { getCombatant } from "../utils/getCombatant";
import { launchMagicAttack, launchPhysicalAttack } from "../logic/attackActions";
import { applyAuraEffect } from "./useCheckAuraEffects";

const AURA_REFRESH_SECONDS = 3;

export function useCheckCastSpell() {
  const casterSpells = useGameStore((state) => [
    ...state.friends.map((f) => ({ casterId: f.id, spells: f.spells })),
    ...state.enemies.map((e) => ({ casterId: e.id, spells: e.spells })),
  ]);

  useEffect(() => {
    casterSpells.forEach(({ casterId, spells }) => {
      spells
        .filter((spell) => spell.attackCost.current >= spell.attackCost.total)
        .forEach((spell) => {
          const caster = getCombatant(casterId, useGameStore.getState());
          if (!caster || caster.isDead) return;
          castSpell(spell, casterId);
        });
    });
  }, [JSON.stringify(casterSpells)]);
}

export function castSpell(spell: Spell, casterId: string) {
  if (spell.spellType === "aura") {
    castAuraSpell(spell, casterId);
  } else if (spell.spellType === "physical") {
    castPhysicalSpell(spell, casterId);
  } else if (spell.spellType === "magic") {
    castMagicSpell(spell, casterId);
  }
}

// An enemy can list the same spell twice. Reset every copy, or the second one stays
// ready forever and casts on every tick.
function resetCast(caster: Combatant, spellId: string) {
  caster.spells
    .filter((s) => s.id === spellId)
    .forEach((s) => {
      s.attackCost.current = 0;
    });
}

function castPhysicalSpell(spell: Spell, casterId: string) {
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    resetCast(casterState, spell.id);
  });

  launchPhysicalAttack(spell as PhysicalSpell, casterId);
}

function checkUseMana(spell: MagicSpell | AuraSpell, caster: Combatant): boolean {
  if (caster.mana.current < spell.manaCost.total) {
    spell.attackCost.current = spell.attackCost.total;
    return false;
  }
  caster.mana.current -= spell.manaCost.total;
  return true;
}

function castMagicSpell(spell: Spell, casterId: string) {
  let cast = false;
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    const spellState = casterState.spells.find((s) => s.id === spell.id)! as MagicSpell;

    if (!checkUseMana(spellState, casterState)) return;
    cast = true;
    resetCast(casterState, spell.id);
  });
  if (!cast) return;
  launchMagicAttack(spell as MagicSpell, casterId);
}

function getAuraTargetIds(spell: AuraSpell, casterId: string): string[] {
  if (spell.isSelfTargeted) return [casterId];
  const state = useGameStore.getState();
  const caster = getCombatant(casterId, state)!;
  const opponents = (caster.isEnemy ? state.friends : state.enemies).filter((c) => !c.isDead);
  return (spell.isAoe ? opponents : opponents.slice(0, 1)).map((c) => c.id);
}

function castAuraSpell(spell: Spell, casterId: string) {
  const aura = (spell as AuraSpell).auraEffect;
  const targetIds = getAuraTargetIds(spell as AuraSpell, casterId).filter((targetId) => {
    // a non-stacking aura that is still running is held ready instead of wasting mana
    const target = getCombatant(targetId, useGameStore.getState());
    const active = target?.auraEffects.find((a) => a.id === aura.id);
    if (!active) return true;
    if (!aura.scaling) return false;
    // a stacking aura at its cap only recasts to keep its timer from running out
    const atCap = aura.maxStacks !== undefined && active.stacks >= aura.maxStacks;
    return !atCap || active.currentTime <= AURA_REFRESH_SECONDS;
  });
  if (targetIds.length === 0) return;
  let cast = false;
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    const spellState = casterState.spells.find((s) => s.id === spell.id)! as AuraSpell;

    if (!checkUseMana(spellState, casterState)) return;
    cast = true;
    resetCast(casterState, spell.id);
  });
  if (!cast) return;
  targetIds.forEach((targetId) => applyAuraEffect(spell as AuraSpell, targetId));
}
