import { useGameStore } from "../store/gameStore";
import type { Item, EquipSlot } from "../types";
import { ITEM_TEMPLATES } from "../data/itemData";
import { logItemDrop } from "./logActions";

function generateItem(enemyLevel: number): Item {
  const rarities: Array<"common" | "uncommon" | "rare" | "epic" | "legendary"> =
    ["common", "uncommon", "rare", "epic", "legendary"];

  const randomTemplate =
    ITEM_TEMPLATES[Math.floor(Math.random() * ITEM_TEMPLATES.length)];
  const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
  const itemId = `item_${useGameStore.getState().itemIdCounter}`;

  useGameStore.setState((state) => {
    state.itemIdCounter += 1;
  });

  const item: Item = {
    ...randomTemplate,
    id: itemId,
    level: enemyLevel,
    rarity: randomRarity,
    equipped: false,
    mainEffects: [],
    secondaryEffects: [],
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

export function addItem(item: Item): void {
  useGameStore.setState((state) => {
    state.character.items.push(item);
  });
}

export function removeItem(itemId: string): void {
  useGameStore.setState((state) => {
    state.character.items = state.character.items.filter(
      (item) => item.id !== itemId,
    );
  });
}

export function equipItem(itemId: string, slot: EquipSlot): void {
  useGameStore.setState((state) => {
    const item = state.character.items.find((i) => i.id === itemId);
    if (!item) return;

    const existingItem = state.character.equippedSlots[slot];
    if (existingItem) {
      state.character.items.push(existingItem);
    }

    state.character.equippedSlots[slot] = item;
    state.character.items = state.character.items.filter(
      (i) => i.id !== itemId,
    );
  });
}

export function unequipItem(slot: EquipSlot): void {
  useGameStore.setState((state) => {
    const item = state.character.equippedSlots[slot];

    if (item) {
      state.character.items.push(item);
    }

    state.character.equippedSlots[slot] = null;
  });
}
