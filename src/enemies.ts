import type { Spell } from "./spellTypes";
import { FIREBALL, ICE_BOLT, LIGHTNING_STRIKE, INFERNO } from "./spells";

export interface EnemyPreset {
  id: string;
  name: string;
  description: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  spells: Spell[];
}

export const DEFAULT_ENEMIES: EnemyPreset[] = [
  {
    id: "goblin",
    name: "Goblin",
    description: "A mischievous goblin",
    baseHealth: 30,
    baseAttack: 8,
    baseDefense: 2,
    spells: [FIREBALL],
  },
  {
    id: "orc",
    name: "Orc",
    description: "A muscular orc warrior",
    baseHealth: 50,
    baseAttack: 12,
    baseDefense: 4,
    spells: [LIGHTNING_STRIKE],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "An undead skeleton",
    baseHealth: 40,
    baseAttack: 10,
    baseDefense: 3,
    spells: [ICE_BOLT],
  },
  {
    id: "dragon",
    name: "Dragon",
    description: "A fierce dragon",
    baseHealth: 100,
    baseAttack: 25,
    baseDefense: 8,
    spells: [INFERNO],
  },
  {
    id: "mage",
    name: "Dark Mage",
    description: "A powerful dark mage",
    baseHealth: 45,
    baseAttack: 14,
    baseDefense: 3,
    spells: [FIREBALL, LIGHTNING_STRIKE],
  },
];
