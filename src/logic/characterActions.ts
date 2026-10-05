import { useGameStore } from "../store/gameStore";
import { resetEnemies } from "./enemyActions";
import { logKill } from "./logActions";
import { resetProgression } from "./progressionActions";
import { removeAllAuraEffects } from "../hooks/useCheckAuraEffects";
import { getCombatant } from "../utils/getCombatant";
import { Character, Talent } from "../types";

const BASE_SPELL_SLOTS = 2;
const SPELL_SLOT_LEVELS = [3, 6, 10, 15];

export function getSpellCount(level: number, talents: Talent[] = []): number {
  const fromLevels = BASE_SPELL_SLOTS + SPELL_SLOT_LEVELS.filter((l) => level >= l).length;
  const fromTalents = talents.reduce((sum, t) => sum + (t.spellSlots ?? 0) * t.level, 0);
  return fromLevels + fromTalents;
}

export function levelUpCharacter(): void {
  useGameStore.setState((state) => {
    const character = getCombatant("main", state) as Character;
    character.level += 1;
    character.spellCount = Math.max(
      character.spellCount,
      getSpellCount(character.level, state.talents),
    );
    character.experience = 0;
    character.experienceNeeded *= 2;
    state.talentPoints += 1;
    state.spellPoints += 1;
  });
}

export function gainXp(amount: number): void {
  useGameStore.setState((state) => {
    const character = getCombatant("main", state) as Character;

    character.experience += amount;
  });
  const character = getCombatant("main", useGameStore.getState()) as Character;

  if (character.experience >= character.experienceNeeded) {
    levelUpCharacter();
  }
}

export function killFriend(id: string) {
  const friend = getCombatant(id, useGameStore.getState());
  if (!friend) return;
  logKill(friend, 0);
  useGameStore.setState((state) => {
    const friendState = state.friends.find((f) => f.id === id);
    if (friendState) {
      friendState.isDead = true;
    }
  });
  if (friend.isMainCharacter) {
    killCharacter();
  }
}

export function killCharacter(): void {
  useGameStore.setState((state) => {
    const character = getCombatant("main", state) as Character;
    //character.isDead = true;
    character.currentRespawnTime = character.respawnTime;
  });
  resetProgression();
  resetEnemies();
}

export function respawnCharacter(): void {
  removeAllAuraEffects("main");

  useGameStore.setState((state) => {
    const characterState = getCombatant("main", state) as Character;
    characterState.health.current = characterState.maxHealth.total;
    characterState.shield.current = characterState.maxShield.total;
    characterState.currentRespawnTime = 0;
    characterState.mana.current = characterState.maxMana.total;
    characterState.spells.forEach((spell) => {
      spell.attackCost.current = 0;
    });
    characterState.statusEffects = [];
    characterState.speed.current = characterState.speed.total;
    characterState.isDead = false;
  });
}

export function tickRespawn(): void {
  const character = getCombatant("main", useGameStore.getState()) as Character;
  if (character.currentRespawnTime > 0) {
    useGameStore.setState((s) => {
      const characterState = getCombatant("main", s) as Character;
      characterState.currentRespawnTime -= 1;
    });
    const character = getCombatant("main", useGameStore.getState()) as Character;
    if (character.currentRespawnTime <= 0) {
      respawnCharacter();
    }
  }
}
