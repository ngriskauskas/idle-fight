import { useCharacterStore } from "../characterStore";
import { useEnemyStore } from "../enemyStore";
import { useSpellStore } from "../spellStore";
import { useItemStore } from "../itemStore";
import { useTalentStore } from "../talentStore";
import { useProgressionStore } from "../progressionStore";

export interface SaveData {
  character: ReturnType<typeof useCharacterStore.getState>;
  enemies: ReturnType<typeof useEnemyStore.getState>;
  spells: ReturnType<typeof useSpellStore.getState>;
  items: ReturnType<typeof useItemStore.getState>;
  talents: ReturnType<typeof useTalentStore.getState>;
  progression: ReturnType<typeof useProgressionStore.getState>;
}

const SAVE_KEY = "idle-fight-save";

export function saveGame() {
  try {
    const saveData: SaveData = {
      character: useCharacterStore.getState(),
      enemies: useEnemyStore.getState(),
      spells: useSpellStore.getState(),
      items: useItemStore.getState(),
      talents: useTalentStore.getState(),
      progression: useProgressionStore.getState(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error("Failed to save game:", error);
    return false;
  }
}

export function loadGame() {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (!saveData) return false;

    const data = JSON.parse(saveData) as SaveData;

    // Load all store states
    useCharacterStore.setState(data.character);
    useEnemyStore.setState(data.enemies);
    useSpellStore.setState(data.spells);
    useItemStore.setState(data.items);
    useTalentStore.setState(data.talents);
    useProgressionStore.setState(data.progression);

    return true;
  } catch (error) {
    console.error("Failed to load game:", error);
    return false;
  }
}

export function wipeSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to wipe save:", error);
    return false;
  }
}
