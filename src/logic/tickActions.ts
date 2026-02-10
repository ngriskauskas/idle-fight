import { useGameStore } from "../store/gameStore";

export function tickSpells(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.spells.forEach((spell) => {
        spell.attackCost.current += 1;
      });
    });
  });
}

export function tickRegen(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.health.current = Math.min(
        combatant.health.current + combatant.healthRegen.total,
        combatant.maxHealth.total,
      );

      combatant.shield.current = Math.min(
        combatant.shield.current + combatant.shieldRegen.total,
        combatant.maxShield.total,
      );

      combatant.mana.current = Math.min(
        combatant.mana.current + combatant.manaRegen.total,
        combatant.maxMana.total,
      );
    });
  });
}

export function tickAuraEffects(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.auraEffects.forEach((aura) => {
        aura.currentTime -= 1;
      });
    });
  });

  //TODO trigger aura tick triggers
}

export function tickStatusEffects(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.statusEffects.forEach((status) => {
        status.stacks -= 1;
      });
    });
  });
}
