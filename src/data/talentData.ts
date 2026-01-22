import type { Talent } from "../types/talent";

export const WARRIOR_TRAINING: Talent = {
  id: "warrior-training",
  name: "Warrior Training",
  description: "+3 Attack per level",
  icon: "⚔️",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 1,
  tier: 1,
  category: "attack",
};

export const VITALITY: Talent = {
  id: "vitality",
  name: "Vitality",
  description: "+5 Health per level",
  icon: "❤️",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 1,
  category: "utility",
};

export const FORTITUDE: Talent = {
  id: "fortitude",
  name: "Fortitude",
  description: "+2 Defense per level",
  icon: "🛡️",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 1,
  tier: 1,
  category: "defense",
};

export const SWIFT_MOVEMENTS: Talent = {
  id: "swift-movements",
  name: "Swift Movements",
  description: "+2 Speed per level",
  icon: "⚡",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 1,
  tier: 1,
  category: "speed",
};

export const VENOM_MASTERY: Talent = {
  id: "venom-mastery",
  name: "Venom Mastery",
  description: "+2 Poison per level",
  icon: "☠️",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 2,
  category: "status",
};

export const INFERNO_TOUCH: Talent = {
  id: "inferno-touch",
  name: "Inferno Touch",
  description: "+2 Fire per level",
  icon: "🔥",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 2,
  category: "status",
};

export const STORM_CALLING: Talent = {
  id: "storm-calling",
  name: "Storm Calling",
  description: "+2 Lightning per level",
  icon: "⛈️",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 2,
  category: "status",
};

export const GLACIAL_ARMOR: Talent = {
  id: "glacial-armor",
  name: "Glacial Armor",
  description: "+2 Ice + 1 Defense per level",
  icon: "❄️",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 2,
  category: "defense",
};

export const BLOODTHIRST: Talent = {
  id: "bloodthirst",
  name: "Bloodthirst",
  description: "+2 Bleed + 2 Attack per level",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 3,
  category: "attack",
};

export const DEFAULT_TALENTS: Talent[] = [
  WARRIOR_TRAINING,
  VITALITY,
  FORTITUDE,
  SWIFT_MOVEMENTS,
  VENOM_MASTERY,
  INFERNO_TOUCH,
  STORM_CALLING,
  GLACIAL_ARMOR,
  BLOODTHIRST,
];
