import type { Spell } from "../types/spell";
import {
  QUICK_STRIKE,
  FIREBALL,
  ICE_BOLT,
  LIGHTNING_STRIKE,
  POISON_STRIKE,
  BLUDGEON,
} from "./spellData";

export interface BossPreset {
  id: string;
  name: string;
  description: string;
  wave: number;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  spells: Spell[];
  xpMultiplier: number;
  itemDropRateBonus: number;
  icon: string;
}

export const BOSSES: BossPreset[] = [
  {
    id: "goblin-king",
    name: "Goblin King",
    description: "Ruler of the goblin warrens",
    wave: 1,
    baseHealth: 40,
    baseAttack: 8,
    baseDefense: 2,
    spells: [QUICK_STRIKE, BLUDGEON],
    xpMultiplier: 2,
    itemDropRateBonus: 8,
    icon: "goblinHead",
  },
  {
    id: "bone-warden",
    name: "Bone Warden",
    description: "Commander of the undead",
    wave: 2,
    baseHealth: 50,
    baseAttack: 12,
    baseDefense: 4,
    spells: [ICE_BOLT, POISON_STRIKE],
    xpMultiplier: 2.2,
    itemDropRateBonus: 10,
    icon: "boneGnawer",
  },
  {
    id: "warlord",
    name: "Orc Warlord",
    description: "Brutal leader of the orc clans",
    wave: 3,
    baseHealth: 65,
    baseAttack: 16,
    baseDefense: 5,
    spells: [BLUDGEON, LIGHTNING_STRIKE],
    xpMultiplier: 2.5,
    itemDropRateBonus: 12,
    icon: "orcHead",
  },
  {
    id: "shadow-assassin",
    name: "Shadow Assassin",
    description: "Master of dark arts",
    wave: 4,
    baseHealth: 55,
    baseAttack: 18,
    baseDefense: 3,
    spells: [POISON_STRIKE, QUICK_STRIKE],
    xpMultiplier: 2.3,
    itemDropRateBonus: 11,
    icon: "hoodedAssassin",
  },
  {
    id: "inferno-lord",
    name: "Inferno Lord",
    description: "Lord of flames and destruction",
    wave: 5,
    baseHealth: 70,
    baseAttack: 20,
    baseDefense: 4,
    spells: [FIREBALL, LIGHTNING_STRIKE],
    xpMultiplier: 2.7,
    itemDropRateBonus: 13,
    icon: "celebrationFire",
  },
  {
    id: "frost-queen",
    name: "Frost Queen",
    description: "Mistress of eternal winter",
    wave: 6,
    baseHealth: 68,
    baseAttack: 19,
    baseDefense: 5,
    spells: [ICE_BOLT, ICE_BOLT],
    xpMultiplier: 2.6,
    itemDropRateBonus: 13,
    icon: "coldHeart",
  },
  {
    id: "storm-titan",
    name: "Storm Titan",
    description: "Bearer of thunderous power",
    wave: 7,
    baseHealth: 75,
    baseAttack: 22,
    baseDefense: 4,
    spells: [LIGHTNING_STRIKE, LIGHTNING_STRIKE],
    xpMultiplier: 2.8,
    itemDropRateBonus: 14,
    icon: "lightningTree",
  },
  {
    id: "plague-master",
    name: "Plague Master",
    description: "Spreader of pestilence",
    wave: 8,
    baseHealth: 72,
    baseAttack: 21,
    baseDefense: 3,
    spells: [POISON_STRIKE, POISON_STRIKE],
    xpMultiplier: 2.7,
    itemDropRateBonus: 14,
    icon: "poisonGas",
  },
  {
    id: "dragon-lord",
    name: "Dragon Lord",
    description: "Ancient and terrible dragon",
    wave: 9,
    baseHealth: 120,
    baseAttack: 28,
    baseDefense: 7,
    spells: [FIREBALL, LIGHTNING_STRIKE],
    xpMultiplier: 3.2,
    itemDropRateBonus: 16,
    icon: "drakkarDragon",
  },
  {
    id: "shadow-emperor",
    name: "Shadow Emperor",
    description: "Ruler of darkness itself",
    wave: 10,
    baseHealth: 140,
    baseAttack: 32,
    baseDefense: 8,
    spells: [POISON_STRIKE, LIGHTNING_STRIKE, FIREBALL],
    xpMultiplier: 3.5,
    itemDropRateBonus: 18,
    icon: "sharpedTeethSkull",
  },
];

export function getBossForWave(wave: number): BossPreset {
  return BOSSES.find((boss) => boss.wave === wave)!;
}
