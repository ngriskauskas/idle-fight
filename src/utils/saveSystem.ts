import { getSpellCount } from "../logic/characterActions";
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
    // saves from before onBleedChange existed are missing its trigger list
    [...(data.friends ?? []), ...(data.enemies ?? [])].forEach((combatant) => {
      combatant.triggers.onBleedChange ??= [];
    });
    const defaults = useGameStore.getInitialState();
    const withNew = <T extends { id: string }>(saved: T[] = [], current: T[]) => [
      ...saved,
      ...current.filter((c) => !saved.some((s) => s.id === c.id)),
    ];
    data.spells = withNew(data.spells, defaults.spells);
    data.talents = withNew(data.talents, defaults.talents);
    const character = data.friends?.find((f: { id: string }) => f.id === "main");
    if (character) {
      character.spellCount = Math.max(
        character.spellCount,
        getSpellCount(character.level, data.talents),
      );
    }
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
