import type { StatusType } from "./statusEffects";

export type ItemEffectType =
  | "flatDamage"
  | "percentDamage"
  | "flatDefense"
  | "percentDefense"
  | "flatHealth"
  | "percentHealth"
  | "flatSpeed"
  | "percentSpeed"
  | "itemDropChance"
  | StatusType;

export type ItemEffect = Partial<Record<ItemEffectType, number>>;

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type ItemSlot =
  | "body"
  | "helmet"
  | "legs"
  | "boots"
  | "weapon"
  | "ring"
  | "amulet";

export interface ItemTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  slot: ItemSlot;
  itemEffectTypes: ItemEffectType[];
}

export interface Item extends ItemTemplate {
  level: number;
  rarity: Rarity;
  equipped: boolean;
  mainEffects: ItemEffect[];
  secondaryEffects: ItemEffect[];
}

export const ITEM_TEMPLATES: ItemTemplate[] = [
  {
    id: "iron-sword",
    name: "Iron Sword",
    description: "+2 Attack",
    icon: "⚔️",
    slot: "weapon",
    itemEffectTypes: ["flatDamage"],
  },
  {
    id: "steel-sword",
    name: "Steel Sword",
    description: "+5 Attack",
    icon: "⚔️",
    slot: "weapon",
    itemEffectTypes: ["flatDamage"],
  },
  {
    id: "legendary-sword",
    name: "Legendary Sword",
    description: "+10 Attack",
    icon: "⚔️",
    slot: "weapon",
    itemEffectTypes: ["flatDamage"],
  },
  {
    id: "iron-plate",
    name: "Iron Plate",
    description: "+3 Defense",
    icon: "🛡️",
    slot: "body",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "steel-plate",
    name: "Steel Plate",
    description: "+8 Defense",
    icon: "🛡️",
    slot: "body",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "iron-helm",
    name: "Iron Helm",
    description: "+2 Defense",
    icon: "🪖",
    slot: "helmet",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "steel-helm",
    name: "Steel Helm",
    description: "+5 Defense",
    icon: "🪖",
    slot: "helmet",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "iron-boots",
    name: "Iron Boots",
    description: "+2 Defense",
    icon: "👢",
    slot: "boots",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "steel-boots",
    name: "Steel Boots",
    description: "+4 Defense",
    icon: "👢",
    slot: "boots",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "ring-of-power",
    name: "Ring of Power",
    description: "+3 Attack",
    icon: "💍",
    slot: "ring",
    itemEffectTypes: ["flatDamage"],
  },
  {
    id: "iron-leggings",
    name: "Iron Leggings",
    description: "+3 Defense",
    icon: "🦵",
    slot: "legs",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "steel-leggings",
    name: "Steel Leggings",
    description: "+6 Defense",
    icon: "🦵",
    slot: "legs",
    itemEffectTypes: ["flatDefense"],
  },
  {
    id: "amulet-of-health",
    name: "Amulet of Health",
    description: "+100 Max Health",
    icon: "💎",
    slot: "amulet",
    itemEffectTypes: ["flatHealth"],
  },
];
