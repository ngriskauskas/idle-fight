import { Effect } from "./effect";
import { Trigger } from "./triggers";

export type EquipSlot =
  | "body"
  | "helmet"
  | "legs"
  | "boots"
  | "weapon1"
  | "weapon2"
  | "ring1"
  | "ring2"
  | "amulet";

export type ItemSlot =
  | "body"
  | "helmet"
  | "legs"
  | "boots"
  | "weapon"
  | "ring"
  | "amulet";

export type ItemRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "unique";

export interface ItemTemplate {
  id: string;
  name: string;
  icon: string;
  slot: ItemSlot;
  itemEffects: Effect[];
  triggers?: Trigger[];
}

export interface Item extends ItemTemplate {
  level: number;
  rarity: ItemRarity;
  equipped: boolean;
  mainEffects: Effect[];
  secondaryEffects: Effect[];
}
