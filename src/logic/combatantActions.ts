import { useGameStore } from "../store/gameStore";
import type { Combatant, Spell } from "../types";
import { castSpell } from "./combatActions";

function tickSpell(spell: Spell, combatant: Combatant): boolean {
  let castSpell = false;
  useGameStore.setState((state) => {
    const targetSpell = combatant.isMainCharacter
      ? state.character.spells.find((s) => s.id === spell.id)!
      : state.enemies
          .find((e) => e.id === combatant.id)
          ?.spells.find((s) => s.id === spell.id);

    if (targetSpell) {
      targetSpell.currentAttackCost += 1;
      if (targetSpell.currentAttackCost >= targetSpell.baseAttackCost) {
        targetSpell.currentAttackCost = 0;
        castSpell = true;
      }
    }
  });
  return castSpell;
}

export function tickSpells(): void {
  const tickCombatant = (combatant: Combatant) => {
    combatant.spells.forEach((spell) => {
      if (tickSpell(spell, combatant)) {
        castSpell(spell, combatant);
      }
    });
  };

  const state = useGameStore.getState();
  tickCombatant(state.character);
  state.enemies.forEach(tickCombatant);
}
