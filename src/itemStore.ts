import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_ITEMS } from "./items";

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  slot: "body" | "helmet" | "legs" | "boots" | "weapon" | "ring" | "amulet";
  equipped: boolean;
  onEquip: () => void;
  onUnequip: () => void;
}

interface ItemStore {
  items: Item[];
  equippedSlots: Record<string, string | null>;
  equipItem: (itemId: string) => void;
  unequipItem: (slot: string) => void;
  getItemById: (itemId: string) => Item | undefined;
  getEquippedInSlot: (slot: string) => Item | undefined;
  addItem: (item: Item) => void;
  calcDropItem: (enemyLevel: number) => Item | null;
}

export const useItemStore = create<ItemStore>()(
  immer((set, get) => ({
    items: DEFAULT_ITEMS,
    equippedSlots: {
      body: null,
      helmet: null,
      legs: null,
      boots: null,
      weapon1: null,
      weapon2: null,
      ring1: null,
      ring2: null,
      amulet: null,
    },
    equipItem: (itemId: string) => {
      set((state) => {
        const item = state.items.find((i) => i.id === itemId);
        if (item) {
          const slotType = item.slot;
          let targetSlot: string;

          // For weapons and rings, find the next available slot
          if (slotType === "weapon") {
            targetSlot = state.equippedSlots["weapon1"] ? "weapon2" : "weapon1";
          } else if (slotType === "ring") {
            targetSlot = state.equippedSlots["ring1"] ? "ring2" : "ring1";
          } else {
            targetSlot = slotType;
          }

          // Unequip whatever is in this slot
          const previouslyEquipped = state.equippedSlots[targetSlot];
          if (previouslyEquipped) {
            const prevItem = state.items.find(
              (i) => i.id === previouslyEquipped
            );
            if (prevItem) {
              prevItem.equipped = false;
              prevItem.onUnequip();
            }
          }
          // Equip new item
          item.equipped = true;
          state.equippedSlots[targetSlot] = itemId;
          item.onEquip();
        }
      });
    },
    unequipItem: (slot: string) => {
      set((state) => {
        const itemId = state.equippedSlots[slot];
        if (itemId) {
          const item = state.items.find((i) => i.id === itemId);
          if (item) {
            item.equipped = false;
            item.onUnequip();
            state.equippedSlots[slot] = null;
          }
        }
      });
    },
    getItemById: (itemId: string) => {
      return get().items.find((i) => i.id === itemId);
    },
    getEquippedInSlot: (slot: string) => {
      const itemId = get().equippedSlots[slot];
      return itemId ? get().getItemById(itemId) : undefined;
    },
    addItem: (item: Item) => {
      set((state) => {
        const newItem = {
          ...item,
          id: `${item.id}-${Date.now()}-${Math.random()}`,
          equipped: false,
        };
        state.items.push(newItem);
      });
    },
    calcDropItem: (enemyLevel: number) => {
      if (Math.random() > 0.3) return null;

      const allItems = get().items;

      const validItems = allItems.filter(
        (item) => Math.abs(item.level - enemyLevel) <= 2
      );

      if (validItems.length === 0) return null;

      const rarityChances = {
        common: 0.4,
        uncommon: 0.3,
        rare: 0.2,
        epic: 0.08,
        legendary: 0.02,
      };

      if (enemyLevel > 10) {
        rarityChances.legendary = 0.05;
        rarityChances.epic = 0.15;
        rarityChances.rare = 0.15;
        rarityChances.uncommon = 0.2;
        rarityChances.common = 0.45;
      }

      const rand = Math.random();
      let selectedRarity: Item["rarity"] = "common";
      let cumulative = 0;

      for (const [rarity, chance] of Object.entries(rarityChances) as [
        Item["rarity"],
        number
      ][]) {
        cumulative += chance;
        if (rand <= cumulative) {
          selectedRarity = rarity;
          break;
        }
      }

      const itemsOfRarity = validItems.filter(
        (item) => item.rarity === selectedRarity
      );

      if (itemsOfRarity.length === 0) return null;

      return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
    },
  }))
);
