import type { ItemTemplate } from "../types/item";

const UNIQUE_WEAPONS: ItemTemplate[] = [
  {
    id: "bloodletter",
    name: "Bloodletter",
    icon: "sword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 8, valueType: "flat" },
      { type: "healthLeech", value: 5, valueType: "flat" },
      { type: "bleed", value: 4, valueType: "flat" },
      { type: "critChance", value: 10, valueType: "percentage" },
    ],
  },
  {
    id: "frostbrand",
    name: "Frostbrand",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 6, valueType: "flat" },
      { type: "ice", value: 8, valueType: "flat" },
      { type: "speed", value: 2, valueType: "flat" },
      { type: "critMultiplier", value: 40, valueType: "percentage" },
    ],
  },
  {
    id: "inferno-edge",
    name: "Inferno Edge",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 9, valueType: "flat" },
      { type: "fire", value: 6, valueType: "flat" },
      {
        type: "healthLeech",
        value: 4,
        valueType: "flat",
      },
    ],
  },
  {
    id: "storm-caller",
    name: "Storm Caller",
    icon: "hammer",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 7, valueType: "flat" },
      { type: "lightning", value: 7, valueType: "flat" },
      { type: "speed", value: 4, valueType: "flat" },
      { type: "manaRegen", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "venom-fang",
    name: "Venom Fang",
    icon: "dagger",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 4, valueType: "flat" },
      { type: "poison", value: 10, valueType: "flat" },
      { type: "speed", value: 5, valueType: "flat" },
      { type: "critChance", value: 15, valueType: "percentage" },
    ],
  },
  {
    id: "spire-of-power",
    name: "Spire of Power",
    icon: "staff",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 40, valueType: "flat" },
      { type: "manaCost", value: 7, valueType: "flat" },
      { type: "manaRegen", value: 4, valueType: "flat" },
      { type: "manaLeech", value: 5, valueType: "flat" },
    ],
  },
  {
    id: "soulrender",
    name: "Soulrender",
    icon: "wand",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 5, valueType: "flat" },
      { type: "mana", value: 30, valueType: "flat" },
      { type: "healthLeech", value: 3, valueType: "flat" },
      { type: "manaLeech", value: 4, valueType: "flat" },
    ],
  },
  {
    id: "eternal-aegis",
    name: "Eternal Aegis",
    icon: "bigShield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 10, valueType: "flat" },
      { type: "shield", value: 15, valueType: "flat" },
      { type: "shieldRegen", value: 3, valueType: "flat" },
      { type: "health", value: 20, valueType: "flat" },
    ],
  },
];

const UNIQUE_ARMOR: ItemTemplate[] = [
  {
    id: "deathbringer-plate",
    name: "Deathbringer Plate",
    icon: "armor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 8, valueType: "flat" },
      { type: "damage", value: 6, valueType: "flat" },
      { type: "health", value: 15, valueType: "flat" },
      { type: "bleed", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "robe-of-elements",
    name: "Robe of Elements",
    icon: "cloth",
    slot: "body",
    itemEffects: [
      { type: "mana", value: 35, valueType: "flat" },
      { type: "fire", value: 3, valueType: "flat" },
      { type: "ice", value: 3, valueType: "flat" },
      { type: "lightning", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "shadow-mantle",
    name: "Shadow Mantle",
    icon: "leather",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 5, valueType: "flat" },
      { type: "speed", value: 6, valueType: "flat" },
      { type: "poison", value: 5, valueType: "flat" },
      { type: "healthLeech", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "dragonscale-mail",
    name: "Dragonscale Mail",
    icon: "armor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 12, valueType: "flat" },
      { type: "health", value: 25, valueType: "flat" },
      { type: "fire", value: 4, valueType: "flat" },
      { type: "shield", value: 8, valueType: "flat" },
    ],
  },
];

const UNIQUE_HELMETS: ItemTemplate[] = [
  {
    id: "crown-of-intellect",
    name: "Crown of Intellect",
    icon: "crown",
    slot: "helmet",
    itemEffects: [
      { type: "mana", value: 30, valueType: "flat" },
      { type: "manaCost", value: 4, valueType: "flat" },
      { type: "manaRegen", value: 3, valueType: "flat" },
      { type: "defense", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "helm-of-rage",
    name: "Helm of Rage",
    icon: "helmet",
    slot: "helmet",
    itemEffects: [
      { type: "damage", value: 10, valueType: "flat" },
      { type: "critChance", value: 12, valueType: "percentage" },
      { type: "critMultiplier", value: 25, valueType: "percentage" },
    ],
  },
  {
    id: "mask-of-poisons",
    name: "Mask of Poisons",
    icon: "helmet",
    slot: "helmet",
    itemEffects: [
      { type: "poison", value: 8, valueType: "flat" },
      { type: "bleed", value: 6, valueType: "flat" },
      { type: "defense", value: 4, valueType: "flat" },
      { type: "speed", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "crown-of-eternity",
    name: "Crown of Eternity",
    icon: "crown",
    slot: "helmet",
    itemEffects: [
      { type: "health", value: 30, valueType: "flat" },
      { type: "defense", value: 6, valueType: "flat" },
      { type: "healthRegen", value: 3, valueType: "flat" },
      { type: "mana", value: 20, valueType: "flat" },
    ],
  },
];

const UNIQUE_RINGS: ItemTemplate[] = [
  {
    id: "ring-of-execution",
    name: "Ring of Execution",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "damage", value: 7, valueType: "flat" },
      { type: "critChance", value: 20, valueType: "percentage" },
      { type: "critMultiplier", value: 50, valueType: "percentage" },
    ],
  },
  {
    id: "ring-of-lifespan",
    name: "Ring of Lifespan",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "health", value: 40, valueType: "flat" },
      { type: "healthLeech", value: 5, valueType: "flat" },
      { type: "healthRegen", value: 2, valueType: "flat" },
    ],
  },
  {
    id: "ring-of-thunder",
    name: "Ring of Thunder",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "lightning", value: 10, valueType: "flat" },
      { type: "speed", value: 8, valueType: "flat" },
      { type: "damage", value: 5, valueType: "percentage" },
    ],
  },
  {
    id: "ring-of-ancient-wisdom",
    name: "Ring of Ancient Wisdom",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "mana", value: 50, valueType: "flat" },
      { type: "manaRegen", value: 5, valueType: "flat" },
      { type: "manaLeech", value: 4, valueType: "flat" },
    ],
  },
];

const UNIQUE_AMULETS: ItemTemplate[] = [
  {
    id: "amulet-of-champions",
    name: "Amulet of Champions",
    icon: "amulet",
    slot: "amulet",
    itemEffects: [
      { type: "damage", value: 8, valueType: "flat" },
      { type: "defense", value: 4, valueType: "flat" },
      { type: "health", value: 15, valueType: "flat" },
      { type: "speed", value: 3, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-apocalypse",
    name: "Amulet of Apocalypse",
    icon: "amulet",
    slot: "amulet",
    itemEffects: [
      { type: "fire", value: 6, valueType: "flat" },
      { type: "ice", value: 6, valueType: "flat" },
      { type: "lightning", value: 6, valueType: "flat" },
      { type: "poison", value: 6, valueType: "flat" },
      { type: "damage", value: 10, valueType: "flat" },
    ],
  },
  {
    id: "amulet-of-sustenance",
    name: "Amulet of Sustenance",
    icon: "amulet",
    slot: "amulet",
    itemEffects: [
      { type: "health", value: 35, valueType: "flat" },
      { type: "healthRegen", value: 3, valueType: "flat" },
      { type: "mana", value: 25, valueType: "flat" },
      { type: "manaRegen", value: 2, valueType: "flat" },
    ],
  },
];

export const UNIQUE_ITEMS: ItemTemplate[] = [
  ...UNIQUE_WEAPONS,
  ...UNIQUE_ARMOR,
  ...UNIQUE_HELMETS,
  ...UNIQUE_RINGS,
  ...UNIQUE_AMULETS,
];
