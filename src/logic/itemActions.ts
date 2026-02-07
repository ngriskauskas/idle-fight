import { useGameStore } from "../store/gameStore";
import type {
  Item,
  EquipSlot,
  ItemRarity,
  ItemSlot,
  EffectType,
  Effect,
  EffectPriority,
} from "../types";
import { ITEM_TEMPLATES } from "../data/itemData";
import { UNIQUE_ITEMS } from "../data/uniqueItemData";
import { logItemDrop } from "./logActions";
import { addEffect, removeEffect } from "./effectActions";
import { getScaleMulti } from "./progressionActions";
import { addTrigger, removeTrigger } from "./triggerActions";

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
  weapon: [
    "damage",
    "critChance",
    "critMultiplier",
    "speed",
    "healthLeech",
    "manaLeech",
  ],
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

function generateItem(level: number): Item {
  const randomRarity = getRandomRarity();
  const randomTemplate = getRandomItem(randomRarity);
  const scaleMulti = getScaleMulti();
  const itemId = `item_${useGameStore.getState().itemIdCounter}`;

  useGameStore.setState((state) => {
    state.itemIdCounter += 1;
  });

  const mainEffects = randomTemplate.itemEffects.map((baseEffect) => {
    const scaledValue = Math.floor(baseEffect.value * scaleMulti);
    const variancePercent = Math.random() * 0.2 - 0.1; // -10% to +10%
    const randomVariance = Math.floor(scaledValue * variancePercent);
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
        Math.floor(
          Math.random() * SECONDARY_EFFECTS_BY_SLOT[randomTemplate.slot].length,
        )
      ];

    const isPercentage =
      secondaryEffectType === "critChance" ||
      secondaryEffectType === "itemDropChance"
        ? false
        : Math.random() < 0.4;

    const baseSecondaryValue = level * scaleMulti;
    const variancePercent = Math.random() * 0.2 - 0.1; // -10% to +10%
    const randomVariance = Math.floor(baseSecondaryValue * variancePercent);
    const scaledValue = baseSecondaryValue + randomVariance;

    secondaryEffects.push({
      type: secondaryEffectType as EffectType,
      value: isPercentage
        ? Math.max(1, Math.ceil((scaledValue * 10) / 2))
        : Math.max(1, Math.ceil(scaledValue / 2)),
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
    state.character.items.push(item);
  });
  logItemDrop(item);
}

export function removeItem(itemId: string): void {
  useGameStore.setState((state) => {
    state.character.items = state.character.items.filter(
      (item) => item.id !== itemId,
    );
  });
}

export function equipItem(itemId: string, slot: EquipSlot): void {
  const state = useGameStore.getState();
  const character = state.character;
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
    const existingItem = state.character.equippedSlots[slot];
    if (existingItem) {
      state.character.items.push(existingItem);
    }

    state.character.equippedSlots[slot] = item;
    state.character.items = state.character.items.filter(
      (i) => i.id !== itemId,
    );
  });

  item.mainEffects.forEach((effect) =>
    addEffect(character, effect, `item-${item.id}-main`, item.name, "item"),
  );
  item.secondaryEffects.forEach((effect) =>
    addEffect(
      character,
      effect,
      `item-${item.id}-secondary`,
      item.name,
      "item",
    ),
  );
  item.triggers?.forEach((trigger) => {
    addTrigger(trigger, character);
  });
}

export function unequipItem(slot: EquipSlot): void {
  const state = useGameStore.getState();
  const character = state.character;
  const item = character.equippedSlots[slot];

  if (item) {
    item.mainEffects.forEach((effect) =>
      removeEffect(character, effect, `item-${item.id}-main`),
    );
    item.secondaryEffects.forEach((effect) =>
      removeEffect(character, effect, `item-${item.id}-secondary`),
    );
    item.triggers?.forEach((trigger) => {
      removeTrigger(trigger, character);
    });
  }

  useGameStore.setState((state) => {
    const item = state.character.equippedSlots[slot];

    if (item) {
      state.character.items.push(item);
    }

    state.character.equippedSlots[slot] = null;
  });
}
