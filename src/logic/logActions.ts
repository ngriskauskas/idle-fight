import { useGameStore } from "../store/gameStore";
import type { DamageLog, KillLog, ItemDropLog, Item } from "../types";
import { Combatant, Spell, Attack } from "../types";

function generateLogId(state: any): string {
  const id = `log_${Date.now()}_${state.logIdCounter || 0}`;
  state.logIdCounter = (state.logIdCounter || 0) + 1;
  return id;
}

export function logDamage(
  source: Combatant,
  target: Combatant,
  spell: Spell,
  damage: number,
  attack: Attack,
): void {
  useGameStore.setState((state) => {
    const log: DamageLog = {
      id: generateLogId(state),
      timestamp: Date.now(),
      type: "damage",
      source,
      target,
      spell,
      damage,
      attack: {
        damage: attack.damage,
        statusStats: { ...attack.statusStats },
      },
    };
    state.logs.push(log);
    if (state.logs.length > 25) {
      state.logs = state.logs.slice(-25);
    }
  });
}

export function logKill(target: Combatant, xpGained: number): void {
  useGameStore.setState((state) => {
    const log: KillLog = {
      id: generateLogId(state),
      timestamp: Date.now(),
      type: "kill",
      target,
      xpGained,
    };
    state.logs.push(log);
    if (state.logs.length > 25) {
      state.logs = state.logs.slice(-25);
    }
  });
}

export function logItemDrop(item: Item): void {
  useGameStore.setState((state) => {
    const log: ItemDropLog = {
      id: generateLogId(state),
      timestamp: Date.now(),
      type: "itemDrop",
      item,
    };
    state.logs.push(log);
    if (state.logs.length > 25) {
      state.logs = state.logs.slice(-25);
    }
  });
}

export function clearLogs(): void {
  useGameStore.setState((state) => {
    state.logs = [];
  });
}
