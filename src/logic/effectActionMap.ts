import { useGameStore } from "../store/gameStore";
import { Character, CombatStat, EffectType } from "../types";
import { Combatant } from "../types/combatant";
import { getCombatant } from "../utils/getCombatant";

type EffectApplier = () => void;

export function recalculateCombatStatTotal(
  combatant: Combatant,
  stat: CombatStat,
  effectType: EffectType,
): number {
  const activeEffects =
    combatant.appliedEffects[effectType].filter((x) => x.effect.priority === "normal") || [];

  let total = stat.base;

  const flatEffects = activeEffects.filter((ae) => ae.effect.valueType === "flat");

  flatEffects.forEach((ae) => {
    // For percentage-based stats, divide by 100 to convert from percentage to decimal
    const isPercentageStat =
      effectType === "critChance" ||
      effectType === "itemDropChance" ||
      effectType === "critMultiplier";
    const value = isPercentageStat ? ae.effect.value / 100 : ae.effect.value;
    total += value;
  });

  const percentageEffects = activeEffects.filter((ae) => ae.effect.valueType === "percentage");
  let totalPercentChange = 0;
  percentageEffects.forEach((ae) => {
    totalPercentChange += ae.effect.value;
  });

  if (totalPercentChange !== 0) {
    total +=
      effectType === "critMultiplier"
        ? (total * totalPercentChange) / 100
        : Math.trunc((total * totalPercentChange) / 100);
  }

  const setMin = combatant.appliedEffects[effectType]
    .filter((ae) => ae.effect.priority === "set")
    .sort((a, b) => b.effect.value - a.effect.value)[0];

  if (setMin) {
    total = setMin.effect.value;
  }
  return total;
}

export function getEffectMap(combatant: Combatant): Record<string, EffectApplier> {
  return {
    damage: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.attack.total = recalculateCombatStatTotal(target, target.attack, "damage");
      });
    },
    defense: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;

        const newTotal = recalculateCombatStatTotal(target, target.defense, "defense");
        target.defense.total = newTotal;
        target.defense.current = newTotal;
      });
    },
    health: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        const newval = recalculateCombatStatTotal(target, target.maxHealth, "health");
        target.health.total = newval < 1 ? 1 : newval;
        target.maxHealth.total = newval < 1 ? 1 : newval;
        target.health.current = Math.min(target.health.current, target.health.total);
      });
    },
    shield: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        const newTotal = recalculateCombatStatTotal(target, target.maxShield, "shield");
        target.shield.current = newTotal;
        target.maxShield.total = newTotal;
      });
    },
    speed: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        const newTotal = recalculateCombatStatTotal(target, target.speed, "speed");
        target.speed.total = newTotal;
        target.speed.current = newTotal;
      });
    },
    healthRegen: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;

        const val = recalculateCombatStatTotal(target, target.healthRegen, "healthRegen");
        target.healthRegen.total = val;
      });
    },
    shieldRegen: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.shieldRegen.total = recalculateCombatStatTotal(
          target,
          target.shieldRegen,
          "shieldRegen",
        );
      });
    },
    mana: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.mana.total = recalculateCombatStatTotal(target, target.mana, "mana");
        target.maxMana.total = recalculateCombatStatTotal(target, target.maxMana, "mana");
      });
    },
    manaRegen: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.manaRegen.total = recalculateCombatStatTotal(target, target.manaRegen, "manaRegen");
      });
    },
    manaCost: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.manaCost.total = recalculateCombatStatTotal(target, target.manaCost, "manaCost");
      });
    },
    healthLeech: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.healthLeech.total = recalculateCombatStatTotal(
          target,
          target.healthLeech,
          "healthLeech",
        );
      });
    },
    manaLeech: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.manaLeech.total = recalculateCombatStatTotal(target, target.manaLeech, "manaLeech");
      });
    },
    itemDropChance: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state) as Character;
        if (!target) return;
        target.itemDropChance.total = recalculateCombatStatTotal(
          target,
          target.itemDropChance,
          "itemDropChance",
        );
      });
    },
    critChance: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.critChance.total = recalculateCombatStatTotal(
          target,
          target.critChance,
          "critChance",
        );
      });
    },
    critMultiplier: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.critMultiplier.total = recalculateCombatStatTotal(
          target,
          target.critMultiplier,
          "critMultiplier",
        );
      });
    },
    poison: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.statusStats.poison.total = recalculateCombatStatTotal(
          target,
          target.statusStats.poison,
          "poison",
        );
      });
    },
    bleed: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.statusStats.bleed.total = recalculateCombatStatTotal(
          target,
          target.statusStats.bleed,
          "bleed",
        );
      });
    },
    fire: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.statusStats.fire.total = recalculateCombatStatTotal(
          target,
          target.statusStats.fire,
          "fire",
        );
      });
    },
    ice: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.statusStats.ice.total = recalculateCombatStatTotal(
          target,
          target.statusStats.ice,
          "ice",
        );
      });
    },
    lightning: () => {
      useGameStore.setState((state) => {
        const target = getCombatant(combatant.id, state);
        if (!target) return;
        target.statusStats.lightning.total = recalculateCombatStatTotal(
          target,
          target.statusStats.lightning,
          "lightning",
        );
      });
    },
  };
}
