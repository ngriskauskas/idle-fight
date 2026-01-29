import { useGameStore } from "../store/gameStore";
import { DEFAULT_ENEMIES } from "../data/enemyData";
import { BOSSES } from "../data/bossData";
import type { Enemy, EnemyPreset } from "../types/enemy";
import { progressEnemy, getScaleMulti } from "./progressionActions";
import { gainXp } from "./characterActions";
import { dropItem } from "./itemActions";
import { logKill } from "./logActions";
import {
  recalcEnemySpellCosts,
  recalcEnemySpellSpeeds,
} from "./combatantActions";

let enemyIdCounter = 1;

// Map of enemy number (1-9) to max spawn count
const ENEMY_SPAWN_LIMITS: Record<number, number> = {
  1: 1, // Enemy 1: max 1
  2: 1, // Enemies 2-4: max 2
  3: 2,
  4: 2,
  5: 3, // Enemies 5-6: max 3
  6: 3,
  7: 4, // Enemies 7-9: max 4
  8: 4,
  9: 4,
};

export function createEnemy(
  preset: EnemyPreset,
  isBoss: boolean = false,
): Enemy {
  const scaleMulti = getScaleMulti();
  const scaledHealth = Math.floor(preset.baseHealth * scaleMulti);
  const scaledAttack = Math.floor(preset.baseAttack * scaleMulti);
  const scaledDefense = Math.floor(preset.baseDefense * scaleMulti);
  const scaledShield = Math.floor((preset.baseShield || 0) * scaleMulti);
  const scaledHealthRegen = Math.floor(
    (preset.baseHealthRegen || 0) * scaleMulti,
  );
  const scaledShieldRegen = Math.ceil(
    (preset.baseShieldRegen || 0) * scaleMulti,
  );
  const scaledMana =
    preset.baseMana !== undefined
      ? Math.floor(preset.baseMana * scaleMulti)
      : 0;
  const scaledManaCost =
    preset.baseManaCost !== undefined
      ? Math.floor(preset.baseManaCost * scaleMulti)
      : 0;
  const scaledManaRegen =
    preset.baseManaRegen !== undefined
      ? Math.floor(preset.baseManaRegen * scaleMulti)
      : 0;
  const xpReward = scaleMulti;
  const level = useGameStore.getState().progress.wave;

  return {
    isDead: false,
    deathTimer: 0,
    isMainCharacter: false,
    id: (enemyIdCounter++).toString(),
    name: preset.name,
    presetId: preset.id,
    isBoss,
    xpReward,
    xpMultiplier: preset.xpMultiplier || 1,
    itemDropRateBonus: preset.itemDropRateBonus || 0,
    icon: preset.icon,
    health: { base: scaledHealth, total: scaledHealth, current: scaledHealth },
    maxHealth: {
      base: scaledHealth,
      total: scaledHealth,
      current: scaledHealth,
    },
    shield: { base: scaledShield, total: scaledShield, current: scaledShield },
    maxShield: {
      base: scaledShield,
      total: scaledShield,
      current: scaledShield,
    },
    attack: { base: scaledAttack, total: scaledAttack, current: scaledAttack },
    defense: {
      base: scaledDefense,
      total: scaledDefense,
      current: scaledDefense,
    },
    speed: { base: 10, total: 10, current: 10 },
    level,
    healthRegen: {
      base: scaledHealthRegen,
      total: scaledHealthRegen,
      current: scaledHealthRegen,
    },
    shieldRegen: {
      base: scaledShieldRegen,
      total: scaledShieldRegen,
      current: scaledShieldRegen,
    },
    healthLeech: { base: 0, total: 0, current: 0 },
    manaLeech: { base: 0, total: 0, current: 0 },
    mana: { base: scaledMana, total: scaledMana, current: scaledMana },
    maxMana: { base: scaledMana, total: scaledMana, current: scaledMana },
    manaRegen: {
      base: scaledManaRegen,
      total: scaledManaRegen,
      current: scaledManaRegen,
    },
    manaCost: {
      base: scaledManaCost,
      total: scaledManaCost,
      current: scaledManaCost,
    },
    critChance: { base: 0, total: 0, current: 0 },
    critMultiplier: { base: 1.5, total: 1.5, current: 1.5 },
    statusEffects: [],
    statusStats: {
      poison: { base: 0, total: 0, current: 0 },
      bleed: { base: 0, total: 0, current: 0 },
      fire: { base: 0, total: 0, current: 0 },
      ice: { base: 0, total: 0, current: 0 },
      lightning: { base: 0, total: 0, current: 0 },
    },
    auraEffects: [],
    spells: preset.spells,
    appliedEffects: {
      damage: [],
      defense: [],
      health: [],
      shield: [],
      speed: [],
      mana: [],
      manaRegen: [],
      manaCost: [],
      critChance: [],
      critMultiplier: [],
      healthRegen: [],
      shieldRegen: [],
      healthLeech: [],
      manaLeech: [],
      itemDropChance: [],
      poison: [],
      bleed: [],
      fire: [],
      ice: [],
      lightning: [],
    },
  };
}

export function spawnNewEnemies() {
  const state = useGameStore.getState();
  const wave = state.progress.wave;
  const enemy = state.progress.enemy;
  const isBossWave = enemy === 10;

  // Special case: first enemy ever is always just 1 goblin
  if (enemy === 1 && wave === 1) {
    const goblin = DEFAULT_ENEMIES.find((e) => e.id === "goblin")!;
    const newEnemy = createEnemy(goblin, false);
    useGameStore.setState((state) => {
      state.enemies.push(newEnemy);
    });
    recalcEnemySpellCosts();
    recalcEnemySpellSpeeds();
    return;
  }

  useGameStore.setState((state) => {
    if (isBossWave) {
      const boss = BOSSES.find((b) => b.wave === wave)!;
      const bossEnemy = createEnemy(boss, true);
      state.enemies.push(bossEnemy);
    } else {
      const availableEnemies = DEFAULT_ENEMIES.filter(
        (e) => e.minWave && e.minWave <= wave,
      );

      if (availableEnemies.length === 0) return;

      const maxSpawns = ENEMY_SPAWN_LIMITS[enemy] || 4;
      const enemyCount = Math.floor(Math.random() * maxSpawns) + 1;

      for (let i = 0; i < enemyCount; i++) {
        const randomTemplate =
          availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        const enemy = createEnemy(randomTemplate, false);
        state.enemies.push(enemy);
      }
    }
  });
  recalcEnemySpellCosts();
  recalcEnemySpellSpeeds();
}

export function killEnemy(enemyIndex: number): void {
  const state = useGameStore.getState();
  const enemy = state.enemies[enemyIndex];
  const xpReward = Math.ceil(enemy.xpReward * enemy.xpMultiplier);
  const enemyLevel = enemy.level;

  logKill(enemy, xpReward);

  gainXp(xpReward);

  const totalDropChance =
    state.character.itemDropChance.total + enemy.itemDropRateBonus / 100;
  if (Math.random() < totalDropChance) {
    dropItem(enemyLevel);
  }

  useGameStore.setState((state) => {
    state.enemies[enemyIndex].deathTimer = 1;
    state.enemies[enemyIndex].isDead = true;
  });
}

export function removeEnemy(enemyIndex: number): void {
  useGameStore.setState((state) => {
    state.enemies.splice(enemyIndex, 1);
  });

  if (useGameStore.getState().enemies.length === 0) {
    progressEnemy();
    spawnNewEnemies();
  }
}

export function tickEnemyDeathTimers(): void {
  useGameStore.setState((state) => {
    state.enemies.forEach((enemy) => {
      enemy.deathTimer -= 0.1;
    });
  });

  useGameStore.getState().enemies.forEach((enemy, index) => {
    if (enemy.deathTimer <= 0 && enemy.isDead) {
      removeEnemy(index);
    }
  });
}

export function resetEnemies(): void {
  useGameStore.setState((state) => {
    state.enemies = [];
  });
  spawnNewEnemies();
}
