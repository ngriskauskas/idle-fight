import { useGameStore } from "../store/gameStore";
import { callTriggerAction, callTriggers } from "./triggerActions";
import { statusEffectMap } from "./statusActions";

export function tickSpells(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.speedBoostCooldown = Math.max(0, (combatant.speedBoostCooldown ?? 0) - 1);
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

  const state = useGameStore.getState();
  [...state.enemies, ...state.friends].forEach((combatant) => {
    if (combatant.maxMana.total > 0 && combatant.mana.current >= combatant.maxMana.total) {
      callTriggers("onFullMana", combatant.id);
    }
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

  const state = useGameStore.getState();
  const allCombatants = [...state.enemies, ...state.friends];
  allCombatants.forEach((combatant) => {
    callTriggers("tickTrigger", combatant.id);
    combatant.auraEffects.forEach((aura) => {
      if (aura.tickTriggers && aura.tickTriggers.length > 0) {
        aura.tickTriggers.forEach((trigger) => {
          callTriggerAction(trigger, combatant);
        });
      }
    });
  });
}

// Share of a status's stacks that wears off each second. A status deals its stacks as
// damage each second, so one application deals about 1 / decay times its stacks.
const STATUS_DECAY = 0.2;
// Bleed is the slow, sustained status: it lingers twice as long, which pays off on
// anything that survives, such as bosses.
const BLEED_DECAY = 0.1;

export function tickStatusEffects(): void {
  useGameStore.setState((state) => {
    const allCombatants = [...state.enemies, ...state.friends];
    allCombatants.forEach((combatant) => {
      combatant.statusEffects.forEach((status) => {
        if (status.stacks <= 0) {
          // spent: useCheckStatuses clears it
          status.stacks = -1;
          return;
        }
        if (!combatant.isDead && status.type !== "ice") {
          statusEffectMap[status.type](combatant, status.stacks);
        }
        const decay = status.type === "bleed" ? BLEED_DECAY : STATUS_DECAY;
        status.stacks -= Math.max(1, Math.ceil(status.stacks * decay));
        status.stacks = Math.max(0, status.stacks);
      });
    });
  });
}
