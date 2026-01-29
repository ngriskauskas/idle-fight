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
      targetSpell.attackCost.current += 1;
      if (targetSpell.attackCost.current >= targetSpell.attackCost.total) {
        if (combatant.mana.current < targetSpell.manaCost.total) {
          castSpell = false;
          targetSpell.attackCost.current = targetSpell.attackCost.total;
        } else {
          targetSpell.attackCost.current = 0;
          castSpell = true;
        }
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
  state.enemies.filter((e) => !e.isDead).forEach(tickCombatant);
}

export function recalcCharacterSpellSpeeds(): void {
  useGameStore.setState((state) => {
    state.character.spells.forEach((spell) => {
      spell.attackCost.total = Math.max(
        1,
        spell.attackCost.base - state.character.speed.current,
      );
    });
  });
}

export function recalcCharacterSpellCosts(): void {
  useGameStore.setState((state) => {
    state.character.spells.forEach((spell) => {
      spell.manaCost.total =
        spell.manaCost.base + state.character.manaCost.total;
    });
  });
}

export function recalcEnemySpellSpeeds(): void {
  useGameStore.setState((state) => {
    state.enemies.forEach((enemy) => {
      enemy.spells.forEach((spell) => {
        spell.attackCost.total = Math.max(
          1,
          spell.attackCost.base - enemy.speed.current,
        );
      });
    });
  });
}

export function recalcEnemySpellCosts(): void {
  useGameStore.setState((state) => {
    state.enemies.forEach((enemy) => {
      enemy.spells.forEach((spell) => {
        spell.manaCost.total = spell.manaCost.base + enemy.manaCost.total;
      });
    });
  });
}
export function tickRegen(): void {
  const tickCombatant = (combatant: Combatant) => {
    useGameStore.setState((state) => {
      const target = combatant.isMainCharacter
        ? state.character
        : state.enemies.find((e) => e.id === combatant.id)!;

      if (target.health.current < target.maxHealth.total) {
        target.health.current = Math.min(
          target.health.current + target.healthRegen.total,
          target.maxHealth.total,
        );
      }

      if (target.shield.current < target.maxShield.total) {
        target.shield.current = Math.min(
          target.shield.current + target.shieldRegen.total,
          target.maxShield.total,
        );
      }

      if (target.mana.current < target.maxMana.total) {
        target.mana.current = Math.min(
          target.mana.current + target.manaRegen.total,
          target.maxMana.total,
        );
      }
    });
  };

  const state = useGameStore.getState();
  tickCombatant(state.character);
  state.enemies.filter((e) => !e.isDead).forEach(tickCombatant);
}
