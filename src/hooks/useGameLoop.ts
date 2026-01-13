import { useEffect } from "react";
import { useCharacterStore } from "../characterStore";
import { useEnemyStore } from "../enemyStore";
import { useSpellStore } from "../spellStore";

export function useGameLoop() {
  const {
    character,
    tickStatusEffects: charTickStatusEffects,
    tickRespawnTimer,
  } = useCharacterStore();
  const { tickAndCastEnemySpells, tickStatusEffects: enemyTickStatusEffects } =
    useEnemyStore();
  const { tickAndCastSpells } = useSpellStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (character.currentRespawnTime === 0) {
        tickAndCastSpells();
        tickAndCastEnemySpells();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [tickAndCastSpells, tickAndCastEnemySpells, character.currentRespawnTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (character.currentRespawnTime === 0) {
        charTickStatusEffects();
        enemyTickStatusEffects();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    charTickStatusEffects,
    enemyTickStatusEffects,
    character.currentRespawnTime,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      tickRespawnTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickRespawnTimer]);
}
