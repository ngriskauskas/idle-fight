import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { callTriggers } from "../logic/triggerActions";

export function useCheckCharacterMana() {
  const character = useGameStore((state) => state.character);

  useEffect(() => {
    if (!character) return;
    if (character.mana.current >= character.mana.total) {
      callTriggers("onFullMana", character);
    }
  }, [character.mana.current, character.mana.total]);
}

// export function useCheckEnemiesMana() {
//   const enemies = useGameStore((state) => state.enemies);

//   useEffect(() => {
//     enemies.forEach((enemy) => {
//       if (enemy.mana.current >= enemy.mana.total) {
//         callTriggers("onFullMana", enemy);
//       }
//     });
//   }, [enemies]);
// }
