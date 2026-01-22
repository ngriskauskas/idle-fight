import { useGameStore } from "../store/gameStore";
import { resetEnemies } from "./enemyActions";
import { logKill } from "./logActions";

export function levelUpCharacter(): void {
  useGameStore.setState((state) => {
    state.character.level += 1;
    state.character.experience = 0;
    state.character.experienceNeeded *= 2;
    state.talentPoints += 1;
    state.spellPoints += 1;
  });
}

export function gainXp(amount: number): void {
  useGameStore.setState((state) => {
    state.character.experience += amount;
  });

  if (
    useGameStore.getState().character.experience >=
    useGameStore.getState().character.experienceNeeded
  ) {
    levelUpCharacter();
  }
}

export function killCharacter(): void {
  logKill(useGameStore.getState().character, 0);
  useGameStore.setState((state) => {
    state.character.currentRespawnTime = state.character.respawnTime;
  });
  resetEnemies();
}

export function respawnCharacter(): void {
  useGameStore.setState((state) => {
    state.character.health = state.character.maxHealth;
    state.character.currentRespawnTime = 0;
    state.character.spells.forEach((spell) => {
      spell.currentAttackCost = 0;
    });
  });
}

export function tickRespawn(): void {
  const state = useGameStore.getState();
  if (state.character.currentRespawnTime > 0) {
    useGameStore.setState((s) => {
      s.character.currentRespawnTime -= 1;
    });

    if (useGameStore.getState().character.currentRespawnTime <= 0) {
      respawnCharacter();
    }
  }
}
