import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Item } from "./items";
import { calcItemDrop } from "./itemHelpers";
import { useCharacterStore } from "./characterStore";
import { useSpellStore } from "./spellStore";

interface ItemStore {
  items: Item[];
  equippedSlots: Record<string, string | null>;
  equipItem: (itemId: string) => void;
  unequipItem: (slot: string) => void;
  getItemById: (itemId: string) => Item | undefined;
  getEquippedInSlot: (slot: string) => Item | undefined;
  addItem: (item: Item) => void;
  calcDropItem: (enemyLevel: number) => void;
  applyItemEffects: (item: Item, operation: "add" | "remove") => void;
}

export const useItemStore = create<ItemStore>()(
  immer((set, get) => ({
    items: [],
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
    applyItemEffects: (item: Item, operation: "add" | "remove") => {
      useCharacterStore.setState((state) => {
        const allEffects = [...item.mainEffects, ...item.secondaryEffects];
        const isRemove = operation === "remove";

        allEffects.forEach((effect) => {
          if (effect.flatDamage !== undefined) {
            const value = isRemove ? -effect.flatDamage : effect.flatDamage;
            state.character.attack += value;
            state.character.currentAttack += value;
          }
          if (effect.percentDamage !== undefined) {
            const multiplier = 1 + effect.percentDamage / 100;
            state.character.attack = Math.round(
              isRemove
                ? state.character.attack / multiplier
                : state.character.attack * multiplier
            );
            state.character.currentAttack = Math.round(
              isRemove
                ? state.character.currentAttack / multiplier
                : state.character.currentAttack * multiplier
            );
          }
          if (effect.flatDefense !== undefined) {
            const value = isRemove ? -effect.flatDefense : effect.flatDefense;
            state.character.defense += value;
            state.character.currentDefense += value;
          }
          if (effect.percentDefense !== undefined) {
            const multiplier = 1 + effect.percentDefense / 100;
            state.character.defense = Math.round(
              isRemove
                ? state.character.defense / multiplier
                : state.character.defense * multiplier
            );
            state.character.currentDefense = Math.round(
              isRemove
                ? state.character.currentDefense / multiplier
                : state.character.currentDefense * multiplier
            );
          }
          if (effect.flatHealth !== undefined) {
            const value = isRemove ? -effect.flatHealth : effect.flatHealth;
            state.character.maxHealth += value;
            state.character.health = Math.max(
              0,
              state.character.health + value
            );
          }
          if (effect.percentHealth !== undefined) {
            const multiplier = 1 + effect.percentHealth / 100;
            state.character.maxHealth = Math.round(
              isRemove
                ? state.character.maxHealth / multiplier
                : state.character.maxHealth * multiplier
            );
            state.character.health = Math.round(
              isRemove
                ? state.character.health / multiplier
                : state.character.health * multiplier
            );
          }
          if (effect.flatSpeed !== undefined) {
            const value = isRemove ? -effect.flatSpeed : effect.flatSpeed;
            state.character.speed += value;
          }
          if (effect.percentSpeed !== undefined) {
            const multiplier = 1 + effect.percentSpeed / 100;
            state.character.speed = Math.round(
              isRemove
                ? state.character.speed / multiplier
                : state.character.speed * multiplier
            );
          }
          if (effect.poison !== undefined) {
            const value = isRemove ? -effect.poison : effect.poison;
            state.character.statusStats.poison += value;
          }
          if (effect.bleed !== undefined) {
            const value = isRemove ? -effect.bleed : effect.bleed;
            state.character.statusStats.bleed += value;
          }
          if (effect.fire !== undefined) {
            const value = isRemove ? -effect.fire : effect.fire;
            state.character.statusStats.fire += value;
          }
          if (effect.ice !== undefined) {
            const value = isRemove ? -effect.ice : effect.ice;
            state.character.statusStats.ice += value;
          }
          if (effect.lightning !== undefined) {
            const value = isRemove ? -effect.lightning : effect.lightning;
            state.character.statusStats.lightning += value;
          }
          if (effect.itemDropChance !== undefined) {
            const value = isRemove
              ? -effect.itemDropChance
              : effect.itemDropChance;
            state.character.itemDropChance += value;
          }
        });
      });

      useSpellStore.getState().recalculateEquippedSpellCosts();
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
              get().applyItemEffects(prevItem, "remove");
            }
          }
          // Equip new item
          item.equipped = true;
          state.equippedSlots[targetSlot] = itemId;
          get().applyItemEffects(item, "add");
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
            get().applyItemEffects(item, "remove");
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
      const characterStore = useCharacterStore.getState();
      const dropChance = characterStore.character.itemDropChance / 100;

      if (Math.random() > dropChance) return;

      const droppedItem = calcItemDrop(enemyLevel);
      get().addItem(droppedItem);
    },
  }))
);
