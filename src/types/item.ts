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

export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ItemEffect {
  flatDamage?: number;
  percentDamage?: number;
  flatDefense?: number;
  percentDefense?: number;
  flatHealth?: number;
  percentHealth?: number;
  flatSpeed?: number;
  percentSpeed?: number;
  flatShield?: number;
  percentShield?: number;
  poison?: number;
  bleed?: number;
  fire?: number;
  ice?: number;
  lightning?: number;
  itemDropChance?: number;
  healthRegen?: number;
  shieldRegen?: number;
}

export type ItemEffectType =
  | "flatDamage"
  | "percentDamage"
  | "flatDefense"
  | "percentDefense"
  | "flatHealth"
  | "percentHealth"
  | "flatShield"
  | "percentShield"
  | "healthRegen"
  | "shieldRegen"
  | "flatSpeed"
  | "percentSpeed"
  | "itemDropChance"
  | "poison"
  | "bleed"
  | "fire"
  | "ice"
  | "lightning";

export interface ItemTemplate {
  id: string;
  name: string;
  icon: string;
  slot: ItemSlot;
  itemEffectTypes: ItemEffectType[];
}

export interface Item extends ItemTemplate {
  level: number;
  rarity: ItemRarity;
  equipped: boolean;
  mainEffects: ItemEffect[];
  secondaryEffects: ItemEffect[];
}
