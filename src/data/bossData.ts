import type { Spell } from "../types/spell";
import {
  SLASH,
  REND,
  EXECUTE,
  POISON_STAB,
  FIREBALL,
  ICE_SPIKE,
  LIGHTNING_BOLT,
  METEOR,
  INFERNO,
  FROSTBOLT,
  CHAIN_LIGHTNING,
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
    spells: [SLASH, REND],
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
    spells: [ICE_SPIKE, POISON_STAB],
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
    spells: [REND, LIGHTNING_BOLT],
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
    spells: [POISON_STAB, SLASH],
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
    spells: [FIREBALL, INFERNO],
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
    spells: [ICE_SPIKE, FROSTBOLT],
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
    spells: [LIGHTNING_BOLT, CHAIN_LIGHTNING],
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
    spells: [POISON_STAB, POISON_STAB],
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
    spells: [METEOR, INFERNO],
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
    spells: [POISON_STAB, CHAIN_LIGHTNING, INFERNO],
    xpMultiplier: 3.5,
    itemDropRateBonus: 18,
    icon: "sharpedTeethSkull",
  },
];

export function getBossForWave(wave: number): BossPreset {
  return BOSSES.find((boss) => boss.wave === wave)!;
}
