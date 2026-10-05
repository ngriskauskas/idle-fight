import type { ItemTemplate } from "../types/item";
import { WAR_CRY } from "./spells/auras";

const UNIQUE_WEAPONS: ItemTemplate[] = [
  {
    id: "bloodletter",
    name: "Bloodletter",
    icon: "sword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 8, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 5, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 2, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 10, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "frostbrand",
    name: "Frostbrand",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 6, valueType: "flat", priority: "normal" },
      { type: "ice", value: 8, valueType: "flat", priority: "normal" },
      { type: "speed", value: 2, valueType: "flat", priority: "normal" },
      { type: "critMultiplier", value: 40, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "inferno-edge",
    name: "Inferno Edge",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 9, valueType: "flat", priority: "normal" },
      { type: "fire", value: 3, valueType: "flat", priority: "normal" },
      {
        type: "healthLeech",
        value: 4,
        valueType: "flat",
        priority: "normal",
      },
    ],
  },
  {
    id: "storm-caller",
    name: "Storm Caller",
    icon: "hammer",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 7, valueType: "flat", priority: "normal" },
      { type: "lightning", value: 3.5, valueType: "flat", priority: "normal" },
      { type: "speed", value: 4, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "venom-fang",
    name: "Venom Fang",
    icon: "dagger",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 4, valueType: "flat", priority: "normal" },
      { type: "poison", value: 5, valueType: "flat", priority: "normal" },
      { type: "speed", value: 5, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 15, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "spire-of-power",
    name: "Spire of Power",
    icon: "staff",
    slot: "weapon",
    itemEffects: [
      { type: "mana", value: 40, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 7, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 2, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "soulrender",
    name: "Soulrender",
    icon: "wand",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 5, valueType: "flat", priority: "normal" },
      { type: "mana", value: 30, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 3, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 4, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "eternal-aegis",
    name: "Eternal Aegis",
    icon: "bigShield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 10, valueType: "flat", priority: "normal" },
      { type: "shield", value: 15, valueType: "flat", priority: "normal" },
      { type: "shieldRegen", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "health", value: 20, valueType: "flat", priority: "normal" },
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
      { type: "defense", value: 8, valueType: "flat", priority: "normal" },
      { type: "damage", value: 6, valueType: "flat", priority: "normal" },
      { type: "health", value: 15, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 1.5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "robe-of-elements",
    name: "Robe of Elements",
    icon: "cloth",
    slot: "body",
    itemEffects: [
      { type: "mana", value: 35, valueType: "flat", priority: "normal" },
      { type: "fire", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "ice", value: 3, valueType: "flat", priority: "normal" },
      { type: "lightning", value: 1.5, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "shadow-mantle",
    name: "Shadow Mantle",
    icon: "leather",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 5, valueType: "flat", priority: "normal" },
      { type: "speed", value: 6, valueType: "flat", priority: "normal" },
      { type: "poison", value: 2.5, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "dragonscale-mail",
    name: "Dragonscale Mail",
    icon: "armor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 12, valueType: "flat", priority: "normal" },
      { type: "health", value: 25, valueType: "flat", priority: "normal" },
      { type: "fire", value: 2, valueType: "flat", priority: "normal" },
      { type: "shield", value: 8, valueType: "flat", priority: "normal" },
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
      { type: "mana", value: 30, valueType: "flat", priority: "normal" },
      { type: "manaCost", value: 4, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "defense", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "helm-of-rage",
    name: "Helm of Rage",
    icon: "helmet",
    slot: "helmet",
    itemEffects: [
      { type: "damage", value: 10, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 12, valueType: "percentage", priority: "normal" },
      { type: "critMultiplier", value: 25, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "mask-of-poisons",
    name: "Mask of Poisons",
    icon: "helmet",
    slot: "helmet",
    itemEffects: [
      { type: "poison", value: 4, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 3, valueType: "flat", priority: "normal" },
      { type: "defense", value: 4, valueType: "flat", priority: "normal" },
      { type: "speed", value: 2, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "crown-of-eternity",
    name: "Crown of Eternity",
    icon: "crown",
    slot: "helmet",
    itemEffects: [
      { type: "health", value: 30, valueType: "flat", priority: "normal" },
      { type: "defense", value: 6, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "mana", value: 20, valueType: "flat", priority: "normal" },
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
      { type: "damage", value: 7, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 20, valueType: "percentage", priority: "normal" },
      { type: "critMultiplier", value: 50, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "ring-of-lifespan",
    name: "Ring of Lifespan",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "health", value: 40, valueType: "flat", priority: "normal" },
      { type: "healthLeech", value: 5, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "ring-of-thunder",
    name: "Ring of Thunder",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "lightning", value: 5, valueType: "flat", priority: "normal" },
      { type: "speed", value: 8, valueType: "flat", priority: "normal" },
      { type: "damage", value: 5, valueType: "percentage", priority: "normal" },
    ],
  },
  {
    id: "ring-of-ancient-wisdom",
    name: "Ring of Ancient Wisdom",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "mana", value: 50, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 2.5, valueType: "flat", priority: "normal" },
      { type: "manaLeech", value: 4, valueType: "flat", priority: "normal" },
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
      { type: "damage", value: 8, valueType: "flat", priority: "normal" },
      { type: "defense", value: 4, valueType: "flat", priority: "normal" },
      { type: "health", value: 15, valueType: "flat", priority: "normal" },
      { type: "speed", value: 3, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-apocalypse",
    name: "Amulet of Apocalypse",
    icon: "amulet",
    slot: "amulet",
    itemEffects: [
      { type: "fire", value: 3, valueType: "flat", priority: "normal" },
      { type: "ice", value: 6, valueType: "flat", priority: "normal" },
      { type: "lightning", value: 3, valueType: "flat", priority: "normal" },
      { type: "poison", value: 3, valueType: "flat", priority: "normal" },
      { type: "damage", value: 10, valueType: "flat", priority: "normal" },
    ],
  },
  {
    id: "amulet-of-sustenance",
    name: "Amulet of Sustenance",
    icon: "amulet",
    slot: "amulet",
    itemEffects: [
      { type: "health", value: 35, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "mana", value: 25, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
    ],
  },
];

// Build-defining uniques: each one carries a trigger
const UNIQUE_BUILD_ITEMS: ItemTemplate[] = [
  {
    id: "butchers-cleaver",
    name: "Butcher's Cleaver",
    icon: "broadsword",
    slot: "weapon",
    itemEffects: [
      { type: "damage", value: 6, valueType: "flat", priority: "normal" },
      { type: "bleed", value: 2.5, valueType: "flat", priority: "normal" },
      { type: "critChance", value: 10, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "butchers-cleaver-bleed",
        type: "onCrit",
        action: "multiplyStatus",
        status: "bleed",
        value: 1.5,
      },
    ],
  },
  {
    id: "plaguebearers-mask",
    name: "Plaguebearer's Mask",
    icon: "hornedHelm",
    slot: "helmet",
    itemEffects: [
      { type: "poison", value: 3, valueType: "flat", priority: "normal" },
      { type: "health", value: 25, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "plaguebearers-mask-poison",
        type: "onTakeDamage",
        action: "applyStatusAoe",
        status: "poison",
        value: 3,
      },
    ],
  },
  {
    id: "cinder-crown",
    name: "Cinder Crown",
    icon: "visoredHelm",
    slot: "helmet",
    itemEffects: [
      { type: "fire", value: 3, valueType: "flat", priority: "normal" },
      { type: "mana", value: 25, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "cinder-crown-fire",
        type: "onKill",
        action: "applyStatusAoe",
        status: "fire",
        value: 6,
      },
    ],
  },
  {
    id: "stormcoil-ring",
    name: "Stormcoil Ring",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "lightning", value: 3, valueType: "flat", priority: "normal" },
      { type: "speed", value: 5, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "stormcoil-ring-arc",
        type: "onCrit",
        action: "applyStatusAoe",
        status: "lightning",
        value: 4,
      },
    ],
  },
  {
    id: "glacial-ward",
    name: "Glacial Ward",
    icon: "bigShield",
    slot: "weapon",
    itemEffects: [
      { type: "defense", value: 6, valueType: "flat", priority: "normal" },
      { type: "shield", value: 12, valueType: "flat", priority: "normal" },
      { type: "ice", value: 4, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "glacial-ward-chill",
        type: "onTakeAttack",
        action: "applyStatusAoe",
        status: "ice",
        value: 2,
      },
    ],
  },
  {
    id: "warlords-horn",
    name: "Warlord's Horn",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "damage", value: 15, valueType: "percentage", priority: "normal" },
      { type: "health", value: 15, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "warlords-horn-war-cry",
        type: "onKill",
        action: "castAura",
        spell: WAR_CRY,
      },
    ],
  },
  {
    id: "thornmail",
    name: "Thornmail",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "defense", value: 8, valueType: "flat", priority: "normal" },
      { type: "shield", value: 10, valueType: "flat", priority: "normal" },
      { type: "speed", value: -4, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "thornmail-shield",
        type: "onTakeAttack",
        action: "gainShield",
        value: 3,
      },
      {
        id: "thornmail-bleed",
        type: "onTakeAttack",
        action: "applyStatus",
        status: "bleed",
        value: 2,
      },
    ],
  },
  {
    id: "leyline-band",
    name: "Leyline Band",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      { type: "mana", value: 30, valueType: "flat", priority: "normal" },
      { type: "manaRegen", value: 1, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "leyline-band-mana",
        type: "onHit",
        action: "gainMana",
        value: 1,
      },
    ],
  },
];

export const UNIQUE_ITEMS: ItemTemplate[] = [
  ...UNIQUE_WEAPONS,
  ...UNIQUE_ARMOR,
  ...UNIQUE_HELMETS,
  ...UNIQUE_RINGS,
  ...UNIQUE_AMULETS,
  ...UNIQUE_BUILD_ITEMS,
];
