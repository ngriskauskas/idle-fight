import type { Combatant } from "./combatant";
import { CombatStat } from "./combatStat";
import type { EquipSlot, Item } from "./item";

export interface Character extends Combatant {
  experience: number;
  experienceNeeded: number;
  itemDropChance: CombatStat;
  respawnTime: number;
  currentRespawnTime: number;
  spellCount: number;
  items: Item[];
  equippedSlots: Record<EquipSlot, Item | null>;
}
