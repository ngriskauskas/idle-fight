import type { ItemTemplate } from "../types/item";

const WEAPONS: ItemTemplate[] = [
  {
    id: "dagger",
    name: "Dagger",
    icon: "sword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 2, valueType: "flat", priority: "normal" },
      { type: "speed", value: 3, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "axe",
    name: "Battleaxe",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 5, valueType: "flat", priority: "normal" },
      {
        type: "critMultiplier",
        value: 50,
        valueType: "flat",
        priority: "normal",
      },
    ],
  },
  {
    id: "hammer",
    name: "Warhammer",
    icon: "hammer",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 7, valueType: "flat", priority: "normal" },
      { type: "defense", value: 1, valueType: "flat", priority: "normal" },
      { type: "speed", value: -2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "greatsword",
    name: "Greatsword",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 6, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 2, valueType: "flat", priority: "normal" },
      { type: "speed", value: -1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "wand",
    name: "Wand",
    icon: "wand",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 15, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
      { type: "speed", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "staff",
    name: "Arcane Staff",
    icon: "staff",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 25, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 2, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "spellbook",
    name: "Spellbook",
    icon: "book",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 20, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 5, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "shield",
    name: "Shield",
    icon: "shield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 4, valueType: "flat", priority: "normal" },
      { type: "shield", value: 5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "tower-shield",
    name: "Tower Shield",
    icon: "bigShield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 6, valueType: "flat", priority: "normal" },
      { type: "shield", value: 10, valueType: "flat", priority: "normal" },
      { type: "speed", value: -5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "magic-shield",
    name: "Arcane Shield",
    icon: "checkedSield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat", priority: "normal" },
      { type: "shield", value: 8, valueType: "flat", priority: "normal" },
      { type: "shieldRegen", value: 2, valueType: "flat", priority: "normal" },
      { type: "mana", value: 10, valueType: "flat", priority: "normal" },
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
      { type: "defense", value: 5, valueType: "flat", priority: "normal" },
      { type: "health", value: 10, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "plate-armor-speed-boost-on-hit",
        type: "onHit",
        action: "speedBoost",
        value: 30,
      },
    ],
  },
  {
    id: "cloth-robes",
    name: "Cloth Robes",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat", priority: "normal" },
      { type: "speed", value: 2, valueType: "flat", priority: "normal" },
      { type: "mana", value: 10, valueType: "flat", priority: "normal" },
      {
        type: "health",
        value: 10,
        valueType: "percentage",
        priority: "normal",
      },
    ],
  },
  {
    id: "leather-armor",
    name: "Leather Armor",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 3, valueType: "flat", priority: "normal" },
      { type: "speed", value: 1, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "dragon-scale",
    name: "Dragon Scale Mail",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 6, valueType: "flat", priority: "normal" },
      { type: "health", value: 15, valueType: "flat", priority: "normal" },
      { type: "fire", value: 2, valueType: "flat", priority: "normal" },
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
      { type: "defense", value: 3, valueType: "flat", priority: "normal" },
      { type: "health", value: 5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "mage-hood",
    name: "Mage Hood",
    icon: "wizardHat",
    slot: "helmet",
    itemEffects: [
      { type: "mana", value: 12, valueType: "flat", priority: "normal" },
      { type: "speed", value: 1, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 3, valueType: "flat", priority: "normal" },
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
      { type: "defense", value: 3, valueType: "flat", priority: "normal" },
      { type: "health", value: 8, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "leather-leggings",
    name: "Leather Leggings",
    icon: "legArmor",
    slot: "legs",
    itemEffects: [
      { type: "defense", value: 2, valueType: "flat", priority: "normal" },
      { type: "speed", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "silk-leggings",
    name: "Silk Leggings",
    icon: "legArmor",
    slot: "legs",
    itemEffects: [
      { type: "speed", value: 3, valueType: "flat", priority: "normal" },
      { type: "mana", value: 8, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 4, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 1, valueType: "flat", priority: "normal" },
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
      { type: "defense", value: 2, valueType: "flat", priority: "normal" },
      { type: "health", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "swift-boots",
    name: "Swift Boots",
    icon: "sonicShoes",
    slot: "boots",
    itemEffects: [
      { type: "speed", value: 4, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "enchanted-boots",
    name: "Enchanted Boots",
    icon: "sonicShoes",
    slot: "boots",
    itemEffects: [
      { type: "speed", value: 2, valueType: "flat", priority: "normal" },
      { type: "mana", value: 10, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 3, valueType: "flat", priority: "normal" },
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
    itemEffects: [
      { type: "damage", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-defense",
    name: "Ring of Defense",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "defense", value: 1.5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-vitality",
    name: "Ring of Vitality",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "health", value: 5, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-speed",
    name: "Ring of Speed",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "speed", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-mana",
    name: "Ring of Mana",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "mana", value: 8, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-poison",
    name: "Ring of Poison",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "poison", value: 2, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-elements",
    name: "Ring of Elements",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "fire", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "ice", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "lightning", value: 1.5, valueType: "flat", priority: "normal" },
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
      { type: "health", value: 8, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-mana",
    name: "Amulet of Mana",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "mana", value: 15, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 2, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 7, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-luck",
    name: "Amulet of Luck",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      {
        type: "itemDropChance",
        value: 0.1,
        valueType: "flat",
        priority: "normal",
      },
      { type: "critChance", value: 5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-life-leech",
    name: "Amulet of Life Leech",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "healthLeech", value: 3, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-shield",
    name: "Amulet of Shield",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "shield", value: 8, valueType: "flat", priority: "normal" },
      { type: "shieldRegen", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-plague",
    name: "Amulet of Plague",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "poison", value: 1, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 1, valueType: "flat", priority: "normal" },
      { type: "fire", value: 1, valueType: "flat", priority: "normal" },
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
