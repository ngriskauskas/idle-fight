import { useCheckHealth } from "./useCheckHealth";
import {
  useRecalcCharacterSpells,
  useRecalcSpellCosts,
  useRecalcSpellSpeeds,
} from "./useRecalcCombatant";
import { useCheckCastSpell } from "./useCheckCastSpell";
import { useCheckAuraEffects } from "./useCheckAuraEffects";
import { useCheckStatuses } from "./useCheckStatuses";

// Everything that reacts to game state. Shared by the app and the playtest harness.
export function useCombatEngine() {
  useCheckHealth();
  useRecalcCharacterSpells();
  useRecalcSpellCosts();
  useRecalcSpellSpeeds();
  useCheckCastSpell();
  useCheckAuraEffects();
  useCheckStatuses();
}
