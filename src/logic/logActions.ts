import { useGameStore } from "../store/gameStore";
import type { DamageLog, KillLog, ItemDropLog, Item, Log } from "../types";
import { Combatant, Spell, Attack } from "../types";
import { AnimationOccurrence } from "../types/animation";

function generateLogId(state: any): string {
  const id = `log_${Date.now()}_${state.logIdCounter || 0}`;
  state.logIdCounter = (state.logIdCounter || 0) + 1;
  return id;
}

export function logDamage(
  source: Combatant,
  targets: Combatant[],
  spell: Spell,
  damage: number,
  attack: Attack,
): void {
  useGameStore.setState((state) => {
    targets.forEach((target) => {
      const log: DamageLog = {
        id: generateLogId(state),
        timestamp: Date.now(),
        type: "damage",
        source,
        target,
        spell,
        damage,
        attack: {
          isAoe: attack.isAoe,
          damage: attack.damage,
          isCrit: attack.isCrit,
          statusStats: { ...attack.statusStats },
        },
      };
      state.logs.push(log);
      state.animationQueue.push({ type: "damage", log });
    });
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
    state.animationQueue.push({ type: "kill", log });
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
