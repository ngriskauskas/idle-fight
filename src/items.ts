import { useCharacterStore } from "./characterStore";
import type { Item } from "./itemStore";

export const DEFAULT_ITEMS: Item[] = [
  {
    id: "iron-sword",
    name: "Iron Sword",
    description: "+2 Attack",
    icon: "⚔️",
    level: 1,
    rarity: "common",
    slot: "weapon",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack += 2;
        state.character.currentAttack += 2;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack -= 2;
        state.character.currentAttack -= 2;
      });
    },
  },
  {
    id: "steel-sword",
    name: "Steel Sword",
    description: "+5 Attack",
    icon: "⚔️",
    level: 5,
    rarity: "uncommon",
    slot: "weapon",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack += 5;
        state.character.currentAttack += 5;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack -= 5;
        state.character.currentAttack -= 5;
      });
    },
  },
  {
    id: "legendary-sword",
    name: "Legendary Sword",
    description: "+10 Attack",
    icon: "⚔️",
    level: 15,
    rarity: "legendary",
    slot: "weapon",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack += 10;
        state.character.currentAttack += 10;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack -= 10;
        state.character.currentAttack -= 10;
      });
    },
  },
  {
    id: "iron-plate",
    name: "Iron Plate",
    description: "+3 Defense",
    icon: "🛡️",
    level: 1,
    rarity: "common",
    slot: "body",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 3;
        state.character.currentDefense += 3;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 3;
        state.character.currentDefense -= 3;
      });
    },
  },
  {
    id: "steel-plate",
    name: "Steel Plate",
    description: "+8 Defense",
    icon: "🛡️",
    level: 8,
    rarity: "uncommon",
    slot: "body",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 8;
        state.character.currentDefense += 8;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 8;
        state.character.currentDefense -= 8;
      });
    },
  },
  {
    id: "iron-helm",
    name: "Iron Helm",
    description: "+2 Defense",
    icon: "🪖",
    level: 1,
    rarity: "common",
    slot: "helmet",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 2;
        state.character.currentDefense += 2;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 2;
        state.character.currentDefense -= 2;
      });
    },
  },
  {
    id: "steel-helm",
    name: "Steel Helm",
    description: "+5 Defense",
    icon: "🪖",
    level: 5,
    rarity: "uncommon",
    slot: "helmet",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 5;
        state.character.currentDefense += 5;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 5;
        state.character.currentDefense -= 5;
      });
    },
  },
  {
    id: "iron-boots",
    name: "Iron Boots",
    description: "+2 Defense",
    icon: "👢",
    level: 1,
    rarity: "common",
    slot: "boots",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 2;
        state.character.currentDefense += 2;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 2;
        state.character.currentDefense -= 2;
      });
    },
  },
  {
    id: "steel-boots",
    name: "Steel Boots",
    description: "+4 Defense",
    icon: "👢",
    level: 5,
    rarity: "uncommon",
    slot: "boots",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 4;
        state.character.currentDefense += 4;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 4;
        state.character.currentDefense -= 4;
      });
    },
  },
  {
    id: "ring-of-power",
    name: "Ring of Power",
    description: "+3 Attack",
    icon: "💍",
    level: 3,
    rarity: "uncommon",
    slot: "ring",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack += 3;
        state.character.currentAttack += 3;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.attack -= 3;
        state.character.currentAttack -= 3;
      });
    },
  },
  {
    id: "ring-of-protection",
    name: "Ring of Protection",
    description: "+3 Defense",
    icon: "💍",
    level: 3,
    rarity: "uncommon",
    slot: "ring",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense += 3;
        state.character.currentDefense += 3;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.defense -= 3;
        state.character.currentDefense -= 3;
      });
    },
  },
  {
    id: "amulet-of-health",
    name: "Amulet of Health",
    description: "+100 Max Health",
    icon: "💎",
    level: 10,
    rarity: "rare",
    slot: "amulet",
    equipped: false,
    onEquip: () => {
      useCharacterStore.setState((state) => {
        state.character.maxHealth += 100;
        state.character.health += 100;
      });
    },
    onUnequip: () => {
      useCharacterStore.setState((state) => {
        state.character.maxHealth -= 100;
        state.character.health = Math.min(
          state.character.health,
          state.character.maxHealth
        );
      });
    },
  },
];
