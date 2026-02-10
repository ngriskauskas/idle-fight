import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { AuraSpell, Combatant, MagicSpell, PhysicalSpell, Spell } from "../types";
import { getCombatant } from "../utils/getCombatant";
import { launchMagicAttack, launchPhysicalAttack } from "../logic/attackActions";
import { applyAuraEffect } from "./useCheckAuraEffects";

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
          if (!caster) return;
          castSpell(spell, casterId);
        });
    });
  }, [casterSpells]);
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

function castPhysicalSpell(spell: Spell, casterId: string) {
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    const spellState = casterState.spells.find((s) => s.id === spell.id)!;

    spellState.attackCost.current = 0;
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
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    const spellState = casterState.spells.find((s) => s.id === spell.id)! as MagicSpell;

    if (!checkUseMana(spellState, casterState)) return;

    spellState.attackCost.current = 0;
  });

  launchMagicAttack(spell as MagicSpell, casterId);
}

function castAuraSpell(spell: Spell, casterId: string) {
  useGameStore.setState((state) => {
    const casterState = getCombatant(casterId, state)!;
    const spellState = casterState.spells.find((s) => s.id === spell.id)! as AuraSpell;

    if (!checkUseMana(spellState, casterState)) return;

    spellState.attackCost.current = 0;
  });

  applyAuraEffect(spell as AuraSpell, casterId);
}
