import { useGameStore } from "../store/gameStore";
import type {
  Item,
  EquipSlot,
  ItemRarity,
  ItemSlot,
  EffectType,
  Effect,
  EffectPriority,
  Character,
} from "../types";
import type { ItemTemplate } from "../types/item";
import { ITEM_TEMPLATES } from "../data/itemData";
import { UNIQUE_ITEMS } from "../data/uniqueItemData";
import { logItemDrop } from "./logActions";
import { addEffect, removeEffect } from "./effectActions";
import { getScaleMulti } from "./progressionActions";
import { addTrigger, removeTrigger } from "./triggerActions";
import { getCombatant } from "../utils/getCombatant";

const RARITY_WEIGHTS: Record<ItemRarity, number> = {
  common: 0.6,
  uncommon: 0.21,
  rare: 0.1,
  epic: 0.05,
  legendary: 0.02,
  unique: 0.002,
};

// Secondary effect count per rarity
const SECONDARY_EFFECT_COUNT: Record<ItemRarity, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
  unique: 0,
};

const SLOT_WEIGHTS: Record<ItemSlot, number> = {
  weapon: 0.38,
  body: 0.2,
  helmet: 0.12,
  legs: 0.1,
  boots: 0.1,
  ring: 0.06,
  amulet: 0.04,
};

// Secondary effects available per item slot
const SECONDARY_EFFECTS_BY_SLOT: Record<ItemSlot, EffectType[]> = {
  weapon: ["damage", "critChance", "critMultiplier", "speed", "healthLeech", "manaLeech"],
  body: ["defense", "health", "healthRegen", "shield", "shieldRegen"],
  helmet: ["defense", "health", "critChance", "itemDropChance", "healthRegen"],
  legs: ["defense", "speed", "itemDropChance", "health", "healthRegen"],
  boots: ["speed", "itemDropChance", "defense", "health", "healthRegen"],
  ring: [
    "damage",
    "defense",
    "health",
    "critChance",
    "critMultiplier",
    "speed",
    "manaRegen",
    "mana",
    "healthRegen",
    "healthLeech",
    "manaLeech",
    "itemDropChance",
    "manaCost",
    "shieldRegen",
    "shield",
    "poison",
    "bleed",
    "fire",
    "ice",
    "lightning",
  ],
  amulet: [
    "damage",
    "defense",
    "health",
    "mana",
    "manaRegen",
    "healthRegen",
    "manaCost",
    "itemDropChance",
    "healthLeech",
    "manaLeech",
    "critChance",
    "critMultiplier",
    "speed",
    "shield",
    "shieldRegen",
    "poison",
    "bleed",
    "fire",
    "ice",
    "lightning",
  ],
};

// Stats that are ratios or timings. They must not grow with the world scale, or they
// outgrow enemies (whose speed and crit do not scale).
const RATIO_STATS: EffectType[] = ["speed", "critChance", "critMultiplier", "itemDropChance", "ice"];

// Flat secondary roll for a ratio stat at item level 1; grows 10% per item level.
const RATIO_SECONDARY_BASE: Partial<Record<EffectType, number>> = {
  speed: 2,
  critChance: 3,
  critMultiplier: 10,
  itemDropChance: 2,
  ice: 1,
};

// Size of a flat secondary roll per item level, relative to the enemy scale. Pools
// (health, mana) roll big, per-second and per-hit stats roll small, so no affix is
// worth more than the slot's own main stat.
const SECONDARY_WEIGHT: Partial<Record<EffectType, number>> = {
  damage: 0.4,
  defense: 0.4,
  health: 1.2,
  shield: 1,
  mana: 2,
  manaCost: 0.4,
  manaRegen: 0.06,
  healthRegen: 0.06,
  shieldRegen: 0.08,
  healthLeech: 0.15,
  manaLeech: 0.2,
  poison: 0.06,
  bleed: 0.06,
  fire: 0.06,
  lightning: 0.06,
};

function ratioLevelMulti(level: number): number {
  return 1 + (level - 1) * 0.1;
}

function getRandomRarity(): ItemRarity {
  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight * 100;
    if (roll < cumulative) {
      return rarity as ItemRarity;
    }
  }

  return "common";
}

function getRandomItem(rarity?: ItemRarity) {
  // Use unique items for unique rarity
  const pool = rarity === "unique" ? UNIQUE_ITEMS : ITEM_TEMPLATES;

  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const [slot, weight] of Object.entries(SLOT_WEIGHTS)) {
    cumulative += weight * 100;
    if (roll < cumulative) {
      const slot_ = slot as ItemSlot;
      const itemsInSlot = pool.filter((item) => item.slot === slot_);
      if (itemsInSlot.length === 0) {
        // Fallback if slot not available in pool
        return pool[Math.floor(Math.random() * pool.length)];
      }
      return itemsInSlot[Math.floor(Math.random() * itemsInSlot.length)];
    }
  }

  // Fallback
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateItem(
  level: number,
  fixed?: { template: ItemTemplate; rarity: ItemRarity },
): Item {
  const randomRarity = fixed?.rarity ?? getRandomRarity();
  const randomTemplate = fixed?.template ?? getRandomItem(randomRarity);
  const scaleMulti = getScaleMulti();
  const itemId = `item_${useGameStore.getState().itemIdCounter}`;

  useGameStore.setState((state) => {
    state.itemIdCounter += 1;
  });

  const mainEffects = randomTemplate.itemEffects.map((baseEffect) => {
    const statMulti =
      RATIO_STATS.includes(baseEffect.type) || baseEffect.valueType === "percentage"
        ? ratioLevelMulti(level)
        : scaleMulti;
    const scaledValue = Math.trunc(baseEffect.value * statMulti);
    const variancePercent = Math.random() * 0.2 - 0.1; // -10% to +10%
    const randomVariance = Math.trunc(scaledValue * variancePercent);
    const finalValue =
      baseEffect.value < 0
        ? Math.min(-1, scaledValue + randomVariance)
        : Math.max(1, scaledValue + randomVariance);
    return {
      type: baseEffect.type,
      value: finalValue,
      valueType: baseEffect.valueType,
      priority: "normal" as EffectPriority,
    };
  });

  // Generate secondary effects based on rarity
  const secondaryEffectCount = SECONDARY_EFFECT_COUNT[randomRarity];
  const secondaryEffects = [];

  for (let i = 0; i < secondaryEffectCount; i++) {
    const secondaryEffectType =
      SECONDARY_EFFECTS_BY_SLOT[randomTemplate.slot][
        Math.floor(Math.random() * SECONDARY_EFFECTS_BY_SLOT[randomTemplate.slot].length)
      ];

    const isPercentage =
      secondaryEffectType === "critChance" || secondaryEffectType === "itemDropChance"
        ? false
        : Math.random() < 0.4;

    const variance = 1 + (Math.random() * 0.2 - 0.1); // -10% to +10%
    const ratioBase = RATIO_SECONDARY_BASE[secondaryEffectType];
    let value: number;
    if (isPercentage) {
      // percent rolls depend on item level only: 6% at level 1 up to 24% at level 10
      value = (4 + level * 2) * variance;
    } else if (ratioBase !== undefined) {
      value = ratioBase * ratioLevelMulti(level) * variance;
    } else {
      const weight = SECONDARY_WEIGHT[secondaryEffectType] ?? 0.5;
      value = level * scaleMulti * weight * variance;
    }

    secondaryEffects.push({
      type: secondaryEffectType as EffectType,
      value: Math.max(1, Math.ceil(value)),
      valueType: isPercentage ? "percentage" : "flat",
      priority: "normal" as EffectPriority,
    } as Effect);
  }

  const item: Item = {
    ...randomTemplate,
    id: itemId,
    level: level,
    rarity: randomRarity,
    equipped: false,
    mainEffects,
    secondaryEffects,
    triggers: randomTemplate.triggers,
  };

  return item;
}

export function dropItem(enemyLevel: number): void {
  const item = generateItem(enemyLevel);
  useGameStore.setState((state) => {
    const character = getCombatant("main", state)! as Character;
    character.items.push(item);
  });
  logItemDrop(item);
}

// Put one named item in the inventory, rolled at the current wave like a drop.
// Returns false for an unknown template. Used by the playtest harness for QA.
export function grantItem(templateId: string, level: number, rarity?: ItemRarity): boolean {
  const unique = UNIQUE_ITEMS.find((t) => t.id === templateId);
  const template = unique ?? ITEM_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return false;
  const item = generateItem(level, {
    template,
    rarity: unique ? "unique" : (rarity ?? "common"),
  });
  useGameStore.setState((state) => {
    const character = getCombatant("main", state)! as Character;
    character.items.push(item);
  });
  return true;
}

export function removeItem(itemId: string): void {
  useGameStore.setState((state) => {
    const character = getCombatant("main", state)! as Character;

    character.items = character.items.filter((item) => item.id !== itemId);
  });
}

export function equipItem(itemId: string, slot: EquipSlot): void {
  const state = useGameStore.getState();
  const character = getCombatant("main", state)! as Character;
  const item = character.items.find((i) => i.id === itemId);
  if (!item) return;

  const existingItem = character.equippedSlots[slot];
  if (existingItem) {
    existingItem.mainEffects.forEach((effect) =>
      removeEffect(character, effect, `item-${existingItem.id}-main`),
    );
    existingItem.secondaryEffects.forEach((effect) =>
      removeEffect(character, effect, `item-${existingItem.id}-secondary`),
    );

    existingItem.triggers?.forEach((trigger) => {
      removeTrigger(trigger, character);
    });
  }

  useGameStore.setState((state) => {
    const character = getCombatant("main", state)! as Character;

    const existingItem = character.equippedSlots[slot];
    if (existingItem) {
      character.items.push(existingItem);
    }

    character.equippedSlots[slot] = item;
    character.items = character.items.filter((i) => i.id !== itemId);
  });

  item.mainEffects.forEach((effect) =>
    addEffect(character, effect, `item-${item.id}-main`, item.name, "item"),
  );
  item.secondaryEffects.forEach((effect) =>
    addEffect(character, effect, `item-${item.id}-secondary`, item.name, "item"),
  );
  item.triggers?.forEach((trigger) => {
    addTrigger(trigger, character);
  });
}

export function unequipItem(slot: EquipSlot): void {
  const state = useGameStore.getState();
  const character = getCombatant("main", state)! as Character;
  const item = character.equippedSlots[slot];

  if (item) {
    item.mainEffects.forEach((effect) => removeEffect(character, effect, `item-${item.id}-main`));
    item.secondaryEffects.forEach((effect) =>
      removeEffect(character, effect, `item-${item.id}-secondary`),
    );
    item.triggers?.forEach((trigger) => {
      removeTrigger(trigger, character);
    });
  }

  useGameStore.setState((state) => {
    const character = getCombatant("main", state)! as Character;
    const item = character.equippedSlots[slot];

    if (item) {
      character.items.push(item);
    }

    character.equippedSlots[slot] = null;
  });
}
