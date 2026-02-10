import { GameState } from "../store/gameStore";
import { Combatant } from "../types";

export function getCombatant(combatantId: string, state: GameState): Combatant | undefined {
  const combatant = state.friends.find((f) => f.id === combatantId);
  if (combatant) return combatant;
  return state.enemies.find((e) => e.id === combatantId);
}
