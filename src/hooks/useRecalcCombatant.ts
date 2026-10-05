import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { MagicSpell } from "../types";
import { getCombatant } from "../utils/getCombatant";

// Speed shortens a cast by a flat amount, but never below 30% of its base time.
const MIN_ATTACK_COST_RATIO = 0.3;

function getAttackCost(base: number, speed: number): number {
  return Math.max(1, Math.ceil(base * MIN_ATTACK_COST_RATIO), base - speed);
}

export function useRecalcCharacterSpells() {
  const speed = useGameStore((state) => state.friends.find((x) => x.id === "main")!.speed.current);
  const manaCost = useGameStore(
    (state) => state.friends.find((x) => x.id === "main")!.manaCost.total,
  );
  const spells = useGameStore((state) => state.friends.find((x) => x.id === "main")!.spells);

  useEffect(() => {
    useGameStore.setState((state) => {
      const character = getCombatant("main", state)!;

      character.spells.forEach((spell) => {
        spell.attackCost.total = getAttackCost(spell.attackCost.base, character.speed.current);
      });

      character.spells
        .filter((spell) => spell.spellType === "magic")
        .map((s) => s as MagicSpell)
        .forEach((spell) => {
          spell.manaCost.total = spell.manaCost.base + character.manaCost.total;
        });
    });
  }, [speed, spells, manaCost]);
}

export function useRecalcSpellCosts() {
  const combatantManaCosts = useGameStore((state) => [
    ...state.friends.map((f) => f.manaCost.total),
    ...state.enemies.map((e) => e.manaCost.total),
  ]);

  useEffect(() => {
    useGameStore.setState((state) => {
      const allCombatants = [...state.friends, ...state.enemies];
      allCombatants.forEach((combatant) => {
        combatant.spells
          .filter((spell) => spell.spellType === "magic")
          .map((spell) => spell as MagicSpell)
          .forEach((spell) => {
            spell.manaCost.total = spell.manaCost.base + combatant.manaCost.total;
          });
      });
    });
  }, [JSON.stringify(combatantManaCosts)]);
}

export function useRecalcSpellSpeeds() {
  const combantantSpeeds = useGameStore((state) => [
    ...state.friends.map((f) => f.speed.current),
    ...state.enemies.map((e) => e.speed.current),
  ]);

  useEffect(() => {
    useGameStore.setState((state) => {
      const allCombatants = [...state.friends, ...state.enemies];
      allCombatants.forEach((combatant) => {
        combatant.spells.forEach((spell) => {
          spell.attackCost.total = getAttackCost(spell.attackCost.base, combatant.speed.current);
        });
      });
    });
  }, [JSON.stringify(combantantSpeeds)]);
}
