import { useGameStore } from "../store/gameStore";

const SAVE_KEY = "idle-fight-save";

export function saveGame() {
  try {
    const gameState = useGameStore.getState();
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
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

    const data = JSON.parse(saveData);
    useGameStore.setState(data);
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
