import { useCharacterStore } from "./characterStore";
import { useEnemyStore } from "./enemyStore";
import { useSpellStore } from "./spellStore";

export type StatusType = "poison" | "bleed" | "fire" | "ice" | "lightning";

export interface StatusEffect {
  type: StatusType;
  stacks: number;
  tickEffect: (effect: StatusEffect) => void;
  tickEnemyEffect: (effect: StatusEffect, enemyIndex: number) => void;
}

export const createStatusEffect = (
  template: StatusEffect,
  stacks: number
): StatusEffect => ({
  type: template.type,
  stacks,
  tickEffect: template.tickEffect,
  tickEnemyEffect: template.tickEnemyEffect,
});

export const POISON_EFFECT: StatusEffect = {
  type: "poison",
  stacks: 0,
  tickEffect: (effect) => {
    useCharacterStore.getState().takeDamage(effect.stacks);
  },
  tickEnemyEffect: (effect, enemyIndex) => {
    useEnemyStore.getState().takeDamage(enemyIndex, effect.stacks);
  },
};

export const BLEED_EFFECT: StatusEffect = {
  type: "bleed",
  stacks: 0,
  tickEffect: (effect) => {
    useCharacterStore.getState().takeDamage(effect.stacks);
    useCharacterStore.setState((state) => {
      state.character.currentDefense = Math.max(
        0,
        state.character.defense - effect.stacks
      );
    });
  },
  tickEnemyEffect: (effect, enemyIndex) => {
    useEnemyStore.getState().takeDamage(enemyIndex, effect.stacks);
    useEnemyStore.setState((state) => {
      if (state.enemies[enemyIndex]) {
        state.enemies[enemyIndex].currentDefense = Math.max(
          0,
          state.enemies[enemyIndex].defense - effect.stacks
        );
      }
    });
  },
};

export const FIRE_EFFECT: StatusEffect = {
  type: "fire",
  stacks: 0,
  tickEffect: (effect) => {
    useCharacterStore.getState().takeDamage(effect.stacks);
  },
  tickEnemyEffect: (effect, enemyIndex) => {
    useEnemyStore.getState().takeDamage(enemyIndex, effect.stacks);

    // Fire spread
    const enemies = useEnemyStore.getState().enemies;
    enemies.forEach((_, otherIndex) => {
      if (otherIndex !== enemyIndex) {
        const spreadChance = 0.4 * effect.stacks;
        if (Math.random() < spreadChance) {
          useEnemyStore
            .getState()
            .applyStatus(otherIndex, [
              createStatusEffect(
                FIRE_EFFECT,
                Math.min(1, Math.floor(effect.stacks / 5))
              ),
            ]);
        }
      }
    });
  },
};

export const ICE_EFFECT: StatusEffect = {
  type: "ice",
  stacks: 0,
  tickEffect: (effect) => {
    // Ice slows down equipped spells by increasing their attack cost
    const characterSpeed = useCharacterStore.getState().character.speed;
    useSpellStore.setState((state) => {
      state.spells.forEach((spell) => {
        spell.attackCost =
          spell.baseAttackCost + characterSpeed + effect.stacks;
      });
    });
  },
  tickEnemyEffect: (effect, enemyIndex) => {
    // Ice slows down enemy spells by increasing their attack cost
    useEnemyStore.setState((state) => {
      if (state.enemies[enemyIndex]) {
        const enemy = state.enemies[enemyIndex];
        enemy.spells.forEach((spell) => {
          spell.attackCost = spell.baseAttackCost + enemy.speed + effect.stacks;
        });
      }
    });
  },
};

export const LIGHTNING_EFFECT: StatusEffect = {
  type: "lightning",
  stacks: 0,
  tickEffect: (effect) => {
    useCharacterStore.getState().takeDamage(effect.stacks);
  },
  tickEnemyEffect: (effect, enemyIndex) => {
    useEnemyStore.getState().takeDamage(enemyIndex, effect.stacks);

    // Lightning chain - deal damage to nearby enemies
    const enemies = useEnemyStore.getState().enemies;
    const baseChainDamage = Math.floor(effect.stacks / 5);
    if (baseChainDamage > 0) {
      enemies.forEach((_, otherIndex) => {
        if (otherIndex !== enemyIndex) {
          const distance = Math.abs(otherIndex - enemyIndex);
          const chainDamage = Math.max(
            1,
            Math.floor(baseChainDamage / distance)
          );
          useEnemyStore.getState().takeDamage(otherIndex, chainDamage);
        }
      });
    }
  },
};

export const ALL_STATUS_EFFECTS = [
  POISON_EFFECT,
  BLEED_EFFECT,
  FIRE_EFFECT,
  ICE_EFFECT,
  LIGHTNING_EFFECT,
];
