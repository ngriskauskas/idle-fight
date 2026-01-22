import { Character } from "./character";
import { Combatant } from "./combatant";
import { Item } from "./item";
import { Spell } from "./spell";
import { Attack } from "./attack";

export type LogType =
  | "damage"
  | "kill"
  | "levelUp"
  | "itemDrop"
  | "spellUnlock"
  | "status";

export interface BaseLog {
  id: string;
  timestamp: number;
  type: LogType;
}

export interface DamageLog extends BaseLog {
  type: "damage";
  source: Combatant;
  target: Combatant;
  spell: Spell;
  damage: number;
  attack: Attack;
}

export interface KillLog extends BaseLog {
  type: "kill";
  target: Combatant;
  xpGained: number;
}

export interface LevelUpLog extends BaseLog {
  type: "levelUp";
  combatant: Character;
}

export interface ItemDropLog extends BaseLog {
  type: "itemDrop";
  item: Item;
}

export type Log = DamageLog | KillLog | LevelUpLog | ItemDropLog;
