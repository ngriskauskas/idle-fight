import { useGameStore } from "../store/gameStore";
import { resetEnemies } from "./enemyActions";
import { logKill } from "./logActions";
import { resetProgression } from "./progressionActions";
import { removeEffect } from "./effectActions";

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
  resetProgression();
  resetEnemies();
}

export function respawnCharacter(): void {
  const auraEffects = useGameStore.getState().character.auraEffects;
  const character = useGameStore.getState().character;
  auraEffects.forEach((aura) => {
    aura.effects.forEach((effect) =>
      removeEffect(character, effect, `aura-${aura.id}-effect${effect.type}`),
    );
  });

  useGameStore.setState((state) => {
    state.character.health.current = state.character.maxHealth.total;
    state.character.currentRespawnTime = 0;
    state.character.mana.current = state.character.maxMana.total;
    state.character.spells.forEach((spell) => {
      spell.attackCost.current = 0;
    });
    state.character.statusEffects = [];
    state.character.auraEffects = [];
    state.character.speed.current = state.character.speed.total;
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
