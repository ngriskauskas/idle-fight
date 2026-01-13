import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useProgressionStore } from "./progressionStore";
import { useCharacterStore } from "./characterStore";
import { DEFAULT_ENEMIES } from "./enemies";
import { Combatant, Attack, resolveAttack } from "./utils/combatCalculations";
import { StatusEffect, createStatusEffect } from "./statusEffects";
import { Spell } from "./spellTypes";
import { useItemStore } from "./itemStore";

export interface Enemy extends Combatant {
  id: number;
  name: string;
  presetId: string;
  isBoss: boolean;
  xpReward: number;
  spells: Spell[];
}

interface EnemyStore {
  enemies: Enemy[];
  updateEnemies: (enemies: Enemy[]) => void;
  spawnNewEnemy: () => void;
  resetEnemies: () => void;
  tickAndCastEnemySpells: () => void;
  tickStatusEffects: () => void;
  damageFirstEnemy: (attack: Attack) => void;
  takeDamage: (enemyIndex: number, damage: number) => void;
  onEnemyDeath: (enemyIndex: number) => void;
  applyStatus: (enemyIndex: number, effects: StatusEffect[]) => void;
}

const createEnemyForProgression = (
  id: number,
  world: number,
  wave: number,
  isBoss: boolean
): Enemy => {
  const level = (world - 1) * 10 + wave;
  const baseMult = isBoss ? 1.5 : 1;

  // Select a random enemy preset
  const preset =
    DEFAULT_ENEMIES[Math.floor(Math.random() * DEFAULT_ENEMIES.length)];

  // Scale preset stats by level
  const health = (preset.baseHealth + level * 10) * baseMult;
  const defense = (preset.baseDefense + level) * baseMult;
  const attack = (preset.baseAttack + level * 5) * baseMult;
  const speed = Math.max(1, 10 - Math.floor(level / 5));

  // Random status stats based on level
  const getRandomStatus = (max: number) => {
    return Math.random() < 0.8 ? Math.floor(Math.random() * max) : 0;
  };

  const statusLevel = Math.max(1, level);

  // Clone spells and scale them by level
  const scaledSpells = preset.spells.map((spell) => ({
    ...spell,
    damage: spell.damage + level * 2,
    baseAttackCost: spell.baseAttackCost,
    attackCost: spell.baseAttackCost + speed,
    currentAttackCost: 0,
  }));

  return {
    id,
    name: preset.name,
    presetId: preset.id,
    health,
    maxHealth: health,
    attack,
    currentAttack: attack,
    defense,
    currentDefense: defense,
    speed,
    level,
    isBoss,
    xpReward: isBoss ? 500 : 100,
    spells: scaledSpells,
    statusEffects: [],
    statusStats: {
      poison: getRandomStatus(Math.floor(statusLevel * 0.5)),
      bleed: getRandomStatus(Math.floor(statusLevel * 0.5)),
      fire: getRandomStatus(Math.floor(statusLevel * 0.5)),
      ice: getRandomStatus(Math.floor(statusLevel * 0.5)),
      lightning: getRandomStatus(Math.floor(statusLevel * 0.5)),
    },
  };
};

export const useEnemyStore = create<EnemyStore>()(
  immer((set, get) => ({
    enemies: [createEnemyForProgression(1, 1, 1, false)],
    updateEnemies: (enemies: Enemy[]) => set({ enemies }),
    spawnNewEnemy: () =>
      set((state) => {
        const progression = useProgressionStore.getState();
        progression.progressToNextLevel();

        const newProgression = useProgressionStore.getState();
        let maxId = Math.max(...state.enemies.map((e) => e.id), 0);

        const spawnCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < spawnCount; i++) {
          maxId++;
          state.enemies.push(
            createEnemyForProgression(
              maxId,
              newProgression.world,
              newProgression.wave,
              newProgression.isBoss
            )
          );

          if (i < spawnCount - 1) {
            progression.progressToNextLevel();
          }
        }
      }),
    resetEnemies: () =>
      set((state) => {
        state.enemies = [createEnemyForProgression(1, 1, 1, false)];
      }),
    tickAndCastEnemySpells: (): void => {
      const characterStore = useCharacterStore.getState();

      get().enemies.forEach((enemy) => {
        enemy.spells.forEach((spell) => {
          if (spell.currentAttackCost >= spell.attackCost) {
            const attack = spell.onCast(enemy);
            characterStore.takeAttack(attack);

            set((state) => {
              const stateEnemy = state.enemies.find((e) => e.id === enemy.id);
              if (stateEnemy) {
                const stateSpell = stateEnemy.spells.find(
                  (s) => s.id === spell.id
                );
                if (stateSpell) {
                  stateSpell.currentAttackCost = 0;
                }
              }
            });
          } else {
            set((state) => {
              const stateEnemy = state.enemies.find((e) => e.id === enemy.id);
              if (stateEnemy) {
                const stateSpell = stateEnemy.spells.find(
                  (s) => s.id === spell.id
                );
                if (stateSpell) {
                  stateSpell.currentAttackCost = Math.min(
                    stateSpell.attackCost,
                    stateSpell.currentAttackCost + 1
                  );
                }
              }
            });
          }
        });
      });
    },
    damageFirstEnemy: (attack: Attack) => {
      const enemy = get().enemies[0];
      if (!enemy) return;

      const result = resolveAttack(enemy, attack);

      set((state) => {
        state.enemies[0].statusEffects = result.statusEffects;
      });

      if (result.damage > 0) {
        get().takeDamage(0, result.damage);
      }
    },
    takeDamage: (enemyIndex: number, damage: number): void => {
      set((state) => {
        if (state.enemies[enemyIndex]) {
          state.enemies[enemyIndex].health = Math.max(
            0,
            state.enemies[enemyIndex].health - damage
          );
        }
      });

      const updated = get();
      if (
        updated.enemies[enemyIndex] &&
        updated.enemies[enemyIndex].health <= 0
      ) {
        get().onEnemyDeath(enemyIndex);
      }
    },
    onEnemyDeath: (enemyIndex: number) => {
      const deadEnemy = get().enemies[enemyIndex];

      const characterStore = useCharacterStore.getState();
      characterStore.gainExperience(deadEnemy.xpReward);

      // Calculate item drop
      const itemStore = useItemStore.getState();
      const droppedItem = itemStore.calcDropItem(deadEnemy.level);
      if (droppedItem) {
        itemStore.addItem(droppedItem);
      }

      set((state) => {
        state.enemies = state.enemies.filter((e) => e.health > 0);
      });

      const updated = get();
      if (updated.enemies.length === 0) {
        get().spawnNewEnemy();
      }
    },
    tickStatusEffects: (): void => {
      get().enemies.forEach((enemy, index) => {
        enemy.statusEffects.forEach((effect) => {
          effect.tickEnemyEffect(effect, index);
        });
      });
      set((state) => {
        state.enemies.forEach((enemy) => {
          enemy.statusEffects.forEach((effect) => {
            if (effect.stacks >= 0) {
              effect.stacks--;
            }
          });
          enemy.statusEffects = enemy.statusEffects.filter(
            (effect) => effect.stacks >= 0
          );
        });
      });
    },
    applyStatus: (enemyIndex: number, effects: StatusEffect[]): void => {
      set((state) => {
        const enemy = state.enemies[enemyIndex];
        if (!enemy) return;

        effects.forEach((newEffect) => {
          const existingEffectIndex = enemy.statusEffects.findIndex(
            (e) => e.type === newEffect.type
          );

          if (existingEffectIndex >= 0) {
            const existing = enemy.statusEffects[existingEffectIndex];
            enemy.statusEffects[existingEffectIndex] = createStatusEffect(
              existing,
              existing.stacks + newEffect.stacks
            );
          } else {
            enemy.statusEffects.push(newEffect);
          }
        });
      });
    },
  }))
);
