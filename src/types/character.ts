import type { Combatant } from "./combatant";
import type { EquipSlot, Item } from "./item";

export interface Character extends Combatant {
  experience: number;
  experienceNeeded: number;
  itemDropChance: number;
  respawnTime: number;
  currentRespawnTime: number;
  spellCount: number;
  items: Item[];
  equippedSlots: Record<EquipSlot, Item | null>;
}
