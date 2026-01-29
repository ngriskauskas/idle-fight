import type { ItemTemplate } from "../types/item";

const WEAPONS: ItemTemplate[] = [
  {
    id: "dagger",
    name: "Dagger",
    icon: "sword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 2, valueType: "flat" },
      { type: "speed", value: 3, valueType: "flat" },
      { type: "critChance", value: 5, valueType: "flat" },
    ],
  },
  {
    id: "axe",
    name: "Battleaxe",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 5, valueType: "flat" },
      { type: "critMultiplier", value: 50, valueType: "flat" },
    ],
  },
  {
    id: "hammer",
    name: "Warhammer",
    icon: "hammer",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 7, valueType: "flat" },
      { type: "defense", value: 1, valueType: "flat" },
      { type: "speed", value: -2, valueType: "flat" },
    ],
  },
  {
    id: "greatsword",
    name: "Greatsword",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 6, valueType: "flat" },
      { type: "healthLeech", value: 2, valueType: "flat" },
      { type: "speed", value: -1, valueType: "flat" },
    ],
  },
  {
    id: "wand",
    name: "Wand",
    icon: "wand",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 15, valueType: "flat" },
      { type: "manaRegen", value: 1, valueType: "flat" },
      { type: "speed", value: 1, valueType: "flat" },
    ],
  },
  {
    id: "staff",
    name: "Arcane Staff",
    icon: "staff",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 25, valueType: "flat" },
      { type: "manaRegen", value: 2, valueType: "flat" },
      { type: "manaLeech", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "spellbook",
    name: "Spellbook",
    icon: "book",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 20, valueType: "flat" },
      { type: "manaCost", value: 5, valueType: "flat" },
      { type: "manaLeech", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "shield",
    name: "Shield",
    icon: "shield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 4, valueType: "flat" },
      { type: "shield", value: 5, valueType: "flat" },
    ],
  },
  {
    id: "tower-shield",
    name: "Tower Shield",
    icon: "bigShield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 6, valueType: "flat" },
      { type: "shield", value: 10, valueType: "flat" },
      { type: "speed", value: -5, valueType: "flat" },
    ],
  },
  {
    id: "magic-shield",
    name: "Arcane Shield",
    icon: "checkedSield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat" },
      { type: "shield", value: 8, valueType: "flat" },
      { type: "shieldRegen", value: 2, valueType: "flat" },
      { type: "mana", value: 10, valueType: "flat" },
    ],
  },
];

// Body Armor - mix of defense, health, and utility effects
const ARMOR: ItemTemplate[] = [
  {
    id: "plate-armor",
    name: "Plate Armor",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 5, valueType: "flat" },
      { type: "health", value: 10, valueType: "flat" },
    ],
  },
  {
    id: "cloth-robes",
    name: "Cloth Robes",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat" },
      { type: "speed", value: 2, valueType: "flat" },
      { type: "mana", value: 10, valueType: "flat" },
      { type: "health", value: 10, valueType: "percentage" },
    ],
  },
  {
    id: "leather-armor",
    name: "Leather Armor",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 3, valueType: "flat" },
      { type: "speed", value: 1, valueType: "flat" },
      { type: "healthLeech", value: 1, valueType: "flat" },
    ],
  },
  {
    id: "dragon-scale",
    name: "Dragon Scale Mail",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 6, valueType: "flat" },
      { type: "health", value: 15, valueType: "flat" },
      { type: "fire", value: 2, valueType: "flat" },
    ],
  },
];

// Helmets - mix of defense, mana support, and utility
const HELMETS: ItemTemplate[] = [
  {
    id: "iron-helm",
    name: "Iron Helm",
    icon: "visoredHelm",
    slot: "helmet",
    itemEffects: [
      { type: "defense", value: 3, valueType: "flat" },
      { type: "health", value: 5, valueType: "flat" },
    ],
  },
  {
    id: "mage-hood",
    name: "Mage Hood",
    icon: "wizardHat",
    slot: "helmet",
    itemEffects: [
      { type: "mana", value: 12, valueType: "flat" },
      { type: "speed", value: 1, valueType: "flat" },
      { type: "manaCost", value: 3, valueType: "flat" },
    ],
  },
];

// Leggings - balance defense, health, and speed
const LEGS: ItemTemplate[] = [
  {
    id: "plate-leggings",
    name: "Plate Leggings",
    icon: "legArmor",
    slot: "legs",
    itemEffects: [
      { type: "defense", value: 3, valueType: "flat" },
      { type: "health", value: 8, valueType: "flat" },
    ],
  },
  {
    id: "leather-leggings",
    name: "Leather Leggings",
    icon: "legArmor",
    slot: "legs",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat" },
      { type: "speed", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "silk-leggings",
    name: "Silk Leggings",
    icon: "legArmor",
    slot: "legs",
    itemEffects: [
      { type: "speed", value: 3, valueType: "flat" },
      { type: "mana", value: 8, valueType: "flat" },
      { type: "manaCost", value: 4, valueType: "flat" },
      { type: "manaLeech", value: 1, valueType: "flat" },
    ],
  },
];

// Boots - focus on speed and mobility
const BOOTS: ItemTemplate[] = [
  {
    id: "heavy-boots",
    name: "Heavy Boots",
    icon: "boots",
    slot: "boots",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat" },
      { type: "health", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "swift-boots",
    name: "Swift Boots",
    icon: "sonicShoes",
    slot: "boots",
    itemEffects: [
      { type: "speed", value: 4, valueType: "flat" },
      { type: "healthLeech", value: 1, valueType: "flat" },
    ],
  },
  {
    id: "enchanted-boots",
    name: "Enchanted Boots",
    icon: "sonicShoes",
    slot: "boots",
    itemEffects: [
      { type: "speed", value: 2, valueType: "flat" },
      { type: "mana", value: 10, valueType: "flat" },
      { type: "manaRegen", value: 1, valueType: "flat" },
      { type: "manaCost", value: 3, valueType: "flat" },
    ],
  },
];

// Rings - varied single effects and dual effects
const RINGS: ItemTemplate[] = [
  {
    id: "ring-of-power",
    name: "Ring of Power",
    icon: "ring",
    slot: "ring",
    itemEffects: [{ type: "damage", value: 2, valueType: "flat" }],
  },
  {
    id: "ring-of-defense",
    name: "Ring of Defense",
    icon: "ring",
    slot: "ring",
    itemEffects: [{ type: "defense", value: 1.5, valueType: "flat" }],
  },
  {
    id: "ring-of-vitality",
    name: "Ring of Vitality",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "health", value: 5, valueType: "flat" },
      { type: "healthRegen", value: 1, valueType: "flat" },
    ],
  },
  {
    id: "ring-of-speed",
    name: "Ring of Speed",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "speed", value: 1.5, valueType: "flat" },
      { type: "critChance", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "ring-of-mana",
    name: "Ring of Mana",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "mana", value: 8, valueType: "flat" },
      { type: "manaRegen", value: 1, valueType: "flat" },
      { type: "manaCost", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "ring-of-poison",
    name: "Ring of Poison",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "poison", value: 2, valueType: "flat" },
      { type: "bleed", value: 1, valueType: "flat" },
    ],
  },
  {
    id: "ring-of-elements",
    name: "Ring of Elements",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "fire", value: 1.5, valueType: "flat" },
      { type: "ice", value: 1.5, valueType: "flat" },
      { type: "lightning", value: 1.5, valueType: "flat" },
    ],
  },
];

// Amulets - powerful utility and combination effects
const AMULETS: ItemTemplate[] = [
  {
    id: "amulet-of-health",
    name: "Amulet of Health",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "health", value: 8, valueType: "flat" },
      { type: "healthRegen", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-mana",
    name: "Amulet of Mana",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "mana", value: 15, valueType: "flat" },
      { type: "manaRegen", value: 2, valueType: "flat" },
      { type: "manaCost", value: 7, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-luck",
    name: "Amulet of Luck",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "itemDropChance", value: 0.1, valueType: "flat" },
      { type: "critChance", value: 5, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-life-leech",
    name: "Amulet of Life Leech",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "healthLeech", value: 3, valueType: "flat" },
      { type: "manaLeech", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-shield",
    name: "Amulet of Shield",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "shield", value: 8, valueType: "flat" },
      { type: "shieldRegen", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-plague",
    name: "Amulet of Plague",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "poison", value: 1, valueType: "flat" },
      { type: "bleed", value: 1, valueType: "flat" },
      { type: "fire", value: 1, valueType: "flat" },
    ],
  },
];

export const ITEM_TEMPLATES: ItemTemplate[] = [
  ...WEAPONS,
  ...ARMOR,
  ...HELMETS,
  ...LEGS,
  ...BOOTS,
  ...RINGS,
  ...AMULETS,
];
