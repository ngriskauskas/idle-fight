import { useGameStore } from "../store/gameStore";
import { DEFAULT_ENEMIES } from "../data/enemyData";
import type { Enemy } from "../types/enemy";
import { progressEnemy } from "./progressionActions";
import { gainXp } from "./characterActions";
import { dropItem } from "./itemActions";
import { logKill } from "./logActions";

let enemyIdCounter = 1;

export function spawnNewEnemies() {
  useGameStore.setState((state) => {
    const goblinPreset = DEFAULT_ENEMIES.find((e) => e.id === "goblin")!;
    const newEnemy: Enemy = {
      isMainCharacter: false,
      id: (enemyIdCounter++).toString(),
      name: goblinPreset.name,
      presetId: goblinPreset.id,
      isBoss: false,
      xpReward: 1, //todo use level
      xpMultiplier: goblinPreset.xpMultiplier || 1,
      itemDropRateBonus: goblinPreset.itemDropRateBonus || 0,
      icon: goblinPreset.icon,
      health: goblinPreset.baseHealth,
      maxHealth: goblinPreset.baseHealth,
      shield: goblinPreset.baseShield || 0,
      maxShield: goblinPreset.baseShield || 0,
      attack: goblinPreset.baseAttack,
      currentAttack: goblinPreset.baseAttack,
      defense: goblinPreset.baseDefense,
      currentDefense: goblinPreset.baseDefense,
      speed: 10,
      level: 1,
      healthRegen: goblinPreset.baseHealthRegen || 0,
      shieldRegen: goblinPreset.baseShieldRegen || 0,
      statusEffects: [],
      statusStats: {
        poison: 0,
        bleed: 0,
        fire: 0,
        ice: 0,
        lightning: 0,
      },
      auraEffects: [],
      spells: goblinPreset.spells,
    };
    state.enemies.push(newEnemy);
  });
}

export function killEnemy(enemyIndex: number): void {
  const state = useGameStore.getState();
  const enemy = state.enemies[enemyIndex];
  const xpReward = enemy.xpReward;
  const enemyLevel = enemy.level;

  logKill(enemy, xpReward);

  useGameStore.setState((state) => {
    state.enemies.splice(enemyIndex, 1);
  });

  gainXp(xpReward);
  dropItem(enemyLevel);

  if (useGameStore.getState().enemies.length === 0) {
    progressEnemy();
    spawnNewEnemies();
  }
}

export function resetEnemies(): void {
  useGameStore.setState((state) => {
    state.enemies = [];
  });
  spawnNewEnemies();
}
