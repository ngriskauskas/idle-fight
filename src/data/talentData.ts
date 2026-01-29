import type { Talent } from "../types/talent";

// ===== TIER 1: Foundation =====
export const WARRIOR_TRAINING: Talent = {
  id: "warrior-training",
  name: "Warrior Training",
  description: "+3 Damage per level",
  icon: "⚔️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "attack",
  effects: [{ type: "damage", value: 3, valueType: "flat" }],
};

export const IRON_CONSTITUTION: Talent = {
  id: "iron-constitution",
  name: "Iron Constitution",
  description: "+6 Health per level",
  icon: "❤️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [{ type: "health", value: 6, valueType: "flat" }],
};

export const STONE_WALL: Talent = {
  id: "stone-wall",
  name: "Stone Wall",
  description: "+2 Defense per level",
  icon: "🛡️",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "defense",
  effects: [{ type: "defense", value: 2, valueType: "flat" }],
};

export const QUICKSTEP: Talent = {
  id: "quickstep",
  name: "Quickstep",
  description: "+3 Speed per level",
  icon: "🏃",
  unlocked: false,
  level: 0,
  maxLevel: 30,
  cost: 1,
  tier: 1,
  category: "speed",
  effects: [{ type: "speed", value: 3, valueType: "flat" }],
};

export const ARCANE_AFFINITY: Talent = {
  id: "arcane-affinity",
  name: "Arcane Affinity",
  description: "+3 Mana Cost per level",
  icon: "🌀",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [{ type: "manaCost", value: 3, valueType: "flat" }],
};

export const REGENERATION: Talent = {
  id: "health-regen",
  name: "Regeneration",
  description: "+2 Health Regen per level",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [{ type: "healthRegen", value: 2, valueType: "flat" }],
};

export const MANA_EFFICIENCY: Talent = {
  id: "mana-efficiency",
  name: "Mana Efficiency",
  description: "+2 Mana Regen per level",
  icon: "💫",
  unlocked: false,
  level: 0,
  maxLevel: 50,
  cost: 1,
  tier: 1,
  category: "utility",
  effects: [{ type: "manaRegen", value: 2, valueType: "flat" }],
};

export const SHIELD_BEARER: Talent = {
  id: "shield-bearer",
  name: "Shield Bearer",
  description: "+3 Shield per level",
  icon: "🔰",
  unlocked: false,
  level: 0,
  maxLevel: 200,
  cost: 1,
  tier: 1,
  category: "defense",
  effects: [{ type: "shield", value: 3, valueType: "flat" }],
};

// ===== TIER 2: Specialization =====
export const VENOM_MASTERY: Talent = {
  id: "venom-mastery",
  name: "Venom Mastery",
  description: "+4 Poison per level",
  icon: "☠️",
  unlocked: false,
  level: 0,
  maxLevel: 20,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [{ type: "poison", value: 4, valueType: "flat" }],
};

export const INFERNO_TOUCH: Talent = {
  id: "inferno-touch",
  name: "Inferno Touch",
  description: "+4 Fire per level",
  icon: "🔥",
  unlocked: false,
  level: 0,
  maxLevel: 20,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [{ type: "fire", value: 4, valueType: "flat" }],
};

export const STORM_MASTERY: Talent = {
  id: "storm-mastery",
  name: "Storm Mastery",
  description: "+3% Damage + 1 Lightning per level",
  icon: "⚡",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [
    { type: "damage", value: 3, valueType: "percentage" },
    { type: "lightning", value: 1, valueType: "flat" },
  ],
};

export const WINTER_GRIP: Talent = {
  id: "winter-grip",
  name: "Winter Grip",
  description: "+3 Ice ",
  icon: "❄️",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 2,
  category: "status",
  effects: [{ type: "ice", value: 3, valueType: "flat" }],
};

export const FORTRESS: Talent = {
  id: "fortress",
  name: "Fortress",
  description: "+5% Defense per level",
  icon: "🏰",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 2,
  category: "defense",
  effects: [{ type: "defense", value: 5, valueType: "percentage" }],
};

export const SPIRIT_LINK: Talent = {
  id: "spirit-link",
  name: "Spirit Link",
  description: "+1.5 Mana + 1 Health Leech per level",
  icon: "✨",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 2,
  category: "utility",
  effects: [
    { type: "mana", value: 2, valueType: "flat" },
    { type: "healthLeech", value: 1, valueType: "flat" },
  ],
};

export const RAZOR_FOCUS: Talent = {
  id: "razor-focus",
  name: "Razor Focus",
  description: "+3 Damage + 1 Speed per level",
  icon: "🎯",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 1,
  tier: 2,
  category: "attack",
  effects: [
    { type: "damage", value: 3, valueType: "flat" },
    { type: "speed", value: 1, valueType: "flat" },
  ],
};

export const SHIELD_ECHO: Talent = {
  id: "shield-echo",
  name: "Shield Echo",
  description: "+4% Shield Regen per level",
  icon: "🌊",
  unlocked: false,
  level: 0,
  maxLevel: 9,
  cost: 1,
  tier: 2,
  category: "defense",
  effects: [{ type: "shieldRegen", value: 4, valueType: "percentage" }],
};

// ===== TIER 3: Advanced Combat =====
export const BLOODLUST: Talent = {
  id: "bloodlust",
  name: "Bloodlust",
  description: "+2 Bleed + 4% Damage per level",
  icon: "🩸",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 1,
  tier: 3,
  category: "attack",
  effects: [
    { type: "bleed", value: 2, valueType: "flat" },
    { type: "damage", value: 4, valueType: "percentage" },
  ],
};

export const PRECISION_STRIKE: Talent = {
  id: "precision-strike",
  name: "Precision Strike",
  description: "+4% Crit Chance per level",
  icon: "🎯",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 3,
  category: "attack",
  effects: [{ type: "critChance", value: 4, valueType: "flat" }],
};

export const FATAL_BLOW: Talent = {
  id: "fatal-blow",
  name: "Fatal Blow",
  description: "+15% Crit Multiplier per level",
  icon: "⚔️",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 1,
  tier: 3,
  category: "attack",
  effects: [{ type: "critMultiplier", value: 15, valueType: "percentage" }],
};

export const VAMPIRIC_STRIKE: Talent = {
  id: "vampiric-strike",
  name: "Vampiric Strike",
  description: "+1.5 Health Leech per level",
  icon: "🧛",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 3,
  category: "utility",
  effects: [{ type: "healthLeech", value: 2, valueType: "flat" }],
};

export const MANA_SURGE: Talent = {
  id: "mana-surge",
  name: "Mana Surge",
  description: "+2 Mana Regen + 6% Damage per level",
  icon: "💫",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 1,
  tier: 3,
  category: "utility",
  effects: [
    { type: "manaRegen", value: 2, valueType: "flat" },
    { type: "damage", value: 6, valueType: "percentage" },
  ],
};

export const SHADOW_DANCER: Talent = {
  id: "shadow-dancer",
  name: "Shadow Dancer",
  description: "+4 Speed + 2% Defense per level",
  icon: "🤸",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 1,
  tier: 3,
  category: "defense",
  effects: [
    { type: "speed", value: 4, valueType: "flat" },
    { type: "defense", value: 2, valueType: "percentage" },
  ],
};

export const RIPOSTE: Talent = {
  id: "riposte",
  name: "Riposte",
  description: "+3 Damage + 3 Defense per level",
  icon: "🔄",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 1,
  tier: 3,
  category: "attack",
  effects: [
    { type: "damage", value: 3, valueType: "flat" },
    { type: "defense", value: 3, valueType: "flat" },
  ],
};

export const ARCANE_SHIELD: Talent = {
  id: "arcane-shield",
  name: "Arcane Shield",
  description: "+3 Mana + 3 Shield per level",
  icon: "🌊",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 1,
  tier: 3,
  category: "utility",
  effects: [
    { type: "mana", value: 3, valueType: "flat" },
    { type: "shield", value: 3, valueType: "flat" },
  ],
};

// ===== TIER 4: Mastery =====
export const TITAN_STRENGTH: Talent = {
  id: "titan-strength",
  name: "Titan Strength",
  description: "+3 Health + 6% Damage per level",
  icon: "💪",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 2,
  tier: 4,
  category: "defense",
  effects: [
    { type: "health", value: 3, valueType: "flat" },
    { type: "damage", value: 6, valueType: "percentage" },
  ],
};

export const SPELL_WEAVER: Talent = {
  id: "spell-weaver",
  name: "Spell Weaver",
  description: "+8 Mana + 8% Mana Regen per level",
  icon: "📚",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 2,
  tier: 4,
  category: "utility",
  effects: [
    { type: "mana", value: 8, valueType: "flat" },
    { type: "manaRegen", value: 8, valueType: "percentage" },
  ],
};

export const MANA_CATALYST: Talent = {
  id: "mana-catalyst",
  name: "Mana Catalyst",
  description: "+1 Mana Cost per level",
  icon: "✨",
  unlocked: false,
  level: 0,
  maxLevel: 8,
  cost: 2,
  tier: 4,
  category: "attack",
  effects: [{ type: "manaCost", value: 1, valueType: "flat" }],
};

export const REGENERATIVE_SCALES: Talent = {
  id: "regenerative-scales",
  name: "Regenerative Scales",
  description: "+2 Shield Regen per level",
  icon: "🐉",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 2,
  tier: 4,
  category: "defense",
  effects: [{ type: "shieldRegen", value: 2, valueType: "flat" }],
};

export const SOUL_DRAIN: Talent = {
  id: "soul-drain",
  name: "Soul Drain",
  description: "+1 Mana Leech + 0.5 Health Leech per level",
  icon: "🔮",
  unlocked: false,
  level: 0,
  maxLevel: 7,
  cost: 2,
  tier: 4,
  category: "utility",
  effects: [
    { type: "manaLeech", value: 1, valueType: "flat" },
    { type: "healthLeech", value: 1, valueType: "flat" },
  ],
};

export const OBSIDIAN_SKIN: Talent = {
  id: "obsidian-skin",
  name: "Obsidian Skin",
  description: "+2 Health + 4 Defense per level",
  icon: "🏰",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 2,
  tier: 4,
  category: "defense",
  effects: [
    { type: "health", value: 2, valueType: "flat" },
    { type: "defense", value: 4, valueType: "flat" },
  ],
};

export const ETHEREAL_FLOW: Talent = {
  id: "ethereal-flow",
  name: "Ethereal Flow",
  description: "+3 Mana Regen + 10% Speed per level",
  icon: "⚙️",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 2,
  tier: 4,
  category: "utility",
  effects: [
    { type: "manaRegen", value: 3, valueType: "flat" },
    { type: "speed", value: 10, valueType: "percentage" },
  ],
};

export const SURGICAL_STRIKE: Talent = {
  id: "surgical-strike",
  name: "Surgical Strike",
  description: "+4 Damage + 6% Crit Mult per level",
  icon: "🔪",
  unlocked: false,
  level: 0,
  maxLevel: 6,
  cost: 2,
  tier: 4,
  category: "attack",
  effects: [
    { type: "damage", value: 4, valueType: "flat" },
    { type: "critMultiplier", value: 6, valueType: "percentage" },
  ],
};

// ===== TIER 5: Advancement =====
export const EXECUTIONER: Talent = {
  id: "executioner",
  name: "Executioner",
  description: "+5 Damage + 12% Crit Mult per level",
  icon: "🐗",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 5,
  category: "attack",
  effects: [
    { type: "damage", value: 5, valueType: "flat" },
    { type: "critMultiplier", value: 12, valueType: "percentage" },
  ],
};

export const ARCANE_MASTERY: Talent = {
  id: "arcane-mastery",
  name: "Arcane Mastery",
  description: "+12 Mana + 2 Mana Cost per level",
  icon: "👨‍🔬",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 5,
  category: "utility",
  effects: [
    { type: "mana", value: 12, valueType: "flat" },
    { type: "manaCost", value: 2, valueType: "flat" },
  ],
};

export const DRAGON_SCALES: Talent = {
  id: "dragon-scales",
  name: "Dragon Scales",
  description: "+6 Shield + 3 Defense per level",
  icon: "🤖",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 5,
  category: "defense",
  effects: [
    { type: "shield", value: 6, valueType: "flat" },
    { type: "defense", value: 3, valueType: "flat" },
  ],
};

export const ESSENCE_THIEF: Talent = {
  id: "essence-thief",
  name: "Essence Thief",
  description: "+2.5 Health Leech + 1 Mana Leech per level",
  icon: "🧛‍♂️",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 5,
  category: "utility",
  effects: [
    { type: "healthLeech", value: 3, valueType: "flat" },
    { type: "manaLeech", value: 1, valueType: "flat" },
  ],
};

export const CHAOS_INFUSION: Talent = {
  id: "chaos-infusion",
  name: "Chaos Infusion",
  description: "+2 Fire/Ice/Lightning/Poison per level",
  icon: "🌈",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 5,
  category: "status",
  effects: [
    { type: "fire", value: 2, valueType: "flat" },
    { type: "ice", value: 2, valueType: "flat" },
    { type: "lightning", value: 2, valueType: "flat" },
    { type: "poison", value: 2, valueType: "flat" },
  ],
};

export const HELLFIRE_STRIKE: Talent = {
  id: "hellfire-strike",
  name: "Hellfire Strike",
  description: "+3 Fire + 2 Bleed + 5% Crit Chance per level",
  icon: "🔥🩸",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 5,
  category: "status",
  effects: [
    { type: "fire", value: 3, valueType: "flat" },
    { type: "bleed", value: 2, valueType: "flat" },
    { type: "critChance", value: 5, valueType: "flat" },
  ],
};

export const FROSTBITE_CURSE: Talent = {
  id: "frostbite-curse",
  name: "Frostbite Curse",
  description: "+4 Ice + 3 Bleed + 5% Defense per level",
  icon: "❄️🩸",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 5,
  category: "status",
  effects: [
    { type: "ice", value: 4, valueType: "flat" },
    { type: "bleed", value: 3, valueType: "flat" },
    { type: "defense", value: 5, valueType: "percentage" },
  ],
};

export const PHANTOM_ASSAULT: Talent = {
  id: "phantom-assault",
  name: "Phantom Assault",
  description: "+5 Speed + 8% Crit Chance per level",
  icon: "🐺",
  unlocked: false,
  level: 0,
  maxLevel: 5,
  cost: 2,
  tier: 5,
  category: "attack",
  effects: [
    { type: "speed", value: 5, valueType: "flat" },
    { type: "critChance", value: 8, valueType: "flat" },
  ],
};

// ===== TIER 6: Apex =====
export const GODSLAYER: Talent = {
  id: "godslayer",
  name: "Godslayer",
  description: "+6 Damage + 15% Crit + 30% Crit Mult per level",
  icon: "👑",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "attack",
  effects: [
    { type: "damage", value: 6, valueType: "flat" },
    { type: "critChance", value: 15, valueType: "flat" },
    { type: "critMultiplier", value: 30, valueType: "percentage" },
  ],
};

export const ETERNAL_BULWARK: Talent = {
  id: "eternal-bulwark",
  name: "Eternal Bulwark",
  description: "+8 Health + 7 Defense + 10 Shield per level",
  icon: "🛡️👑",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "defense",
  effects: [
    { type: "health", value: 8, valueType: "flat" },
    { type: "defense", value: 7, valueType: "flat" },
    { type: "shield", value: 10, valueType: "flat" },
  ],
};

export const SPELLWEAVER_ASCENDANT: Talent = {
  id: "spellweaver-ascendant",
  name: "Spellweaver Ascendant",
  description: "+18 Mana + 4 Mana Cost + 15% Mana Regen per level",
  icon: "✨👑",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "utility",
  effects: [
    { type: "mana", value: 18, valueType: "flat" },
    { type: "manaCost", value: 4, valueType: "flat" },
    { type: "manaRegen", value: 15, valueType: "percentage" },
  ],
};

export const PESTILENCE: Talent = {
  id: "pestilence",
  name: "Pestilence",
  description: "+3 Poison/Bleed/Fire per level",
  icon: "☠️👑",
  unlocked: false,
  level: 0,
  maxLevel: 4,
  cost: 2,
  tier: 6,
  category: "status",
  effects: [
    { type: "poison", value: 3, valueType: "flat" },
    { type: "bleed", value: 3, valueType: "flat" },
    { type: "fire", value: 3, valueType: "flat" },
  ],
};

export const OMNIPOTENCE: Talent = {
  id: "omnipotence",
  name: "Omnipotence",
  description: "+2 all stats + 8% all damages per level",
  icon: "🌟",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "utility",
  effects: [
    { type: "damage", value: 2, valueType: "flat" },
    { type: "defense", value: 2, valueType: "flat" },
    { type: "health", value: 2, valueType: "flat" },
    { type: "mana", value: 2, valueType: "flat" },
    { type: "speed", value: 2, valueType: "flat" },
    { type: "damage", value: 8, valueType: "percentage" },
  ],
};

export const ABYSS_WALKER: Talent = {
  id: "abyss-walker",
  name: "Abyss Walker",
  description: "+5 Damage + 2 Poison/Bleed + 3 Health Leech per level",
  icon: "👻",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "attack",
  effects: [
    { type: "damage", value: 5, valueType: "flat" },
    { type: "poison", value: 2, valueType: "flat" },
    { type: "bleed", value: 2, valueType: "flat" },
    { type: "healthLeech", value: 3, valueType: "flat" },
  ],
};

export const COSMIC_FURY: Talent = {
  id: "cosmic-fury",
  name: "Cosmic Fury",
  description: "+3 Fire/Ice/Lightning + 2 Speed + 12% Damage per level",
  icon: "⚡👑",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "status",
  effects: [
    { type: "fire", value: 3, valueType: "flat" },
    { type: "ice", value: 3, valueType: "flat" },
    { type: "lightning", value: 3, valueType: "flat" },
    { type: "speed", value: 2, valueType: "flat" },
    { type: "damage", value: 12, valueType: "percentage" },
  ],
};

export const APOCALYPSE: Talent = {
  id: "apocalypse",
  name: "Apocalypse",
  description: "+7 Damage + 6 Health + 5 Defense + 20% Crit Mult per level",
  icon: "💥",
  unlocked: false,
  level: 0,
  maxLevel: 3,
  cost: 3,
  tier: 6,
  category: "attack",
  effects: [
    { type: "damage", value: 7, valueType: "flat" },
    { type: "health", value: 6, valueType: "flat" },
    { type: "defense", value: 5, valueType: "flat" },
    { type: "critMultiplier", value: 20, valueType: "percentage" },
  ],
};

export const DEFAULT_TALENTS: Talent[] = [
  // Tier 1
  WARRIOR_TRAINING,
  IRON_CONSTITUTION,
  STONE_WALL,
  QUICKSTEP,
  ARCANE_AFFINITY,
  REGENERATION,
  MANA_EFFICIENCY,
  SHIELD_BEARER,
  // Tier 2
  VENOM_MASTERY,
  INFERNO_TOUCH,
  STORM_MASTERY,
  WINTER_GRIP,
  FORTRESS,
  SPIRIT_LINK,
  RAZOR_FOCUS,
  SHIELD_ECHO,
  // Tier 3
  BLOODLUST,
  PRECISION_STRIKE,
  FATAL_BLOW,
  VAMPIRIC_STRIKE,
  MANA_SURGE,
  SHADOW_DANCER,
  RIPOSTE,
  ARCANE_SHIELD,
  // Tier 4
  TITAN_STRENGTH,
  SPELL_WEAVER,
  MANA_CATALYST,
  REGENERATIVE_SCALES,
  SOUL_DRAIN,
  OBSIDIAN_SKIN,
  ETHEREAL_FLOW,
  SURGICAL_STRIKE,
  // Tier 5
  EXECUTIONER,
  ARCANE_MASTERY,
  DRAGON_SCALES,
  ESSENCE_THIEF,
  CHAOS_INFUSION,
  HELLFIRE_STRIKE,
  FROSTBITE_CURSE,
  PHANTOM_ASSAULT,
  // Tier 6
  GODSLAYER,
  ETERNAL_BULWARK,
  SPELLWEAVER_ASCENDANT,
  PESTILENCE,
  OMNIPOTENCE,
  ABYSS_WALKER,
  COSMIC_FURY,
  APOCALYPSE,
];
