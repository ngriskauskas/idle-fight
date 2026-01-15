import type {
  Item,
  ItemTemplate,
  ItemEffect,
  ItemEffectType,
  Rarity,
} from "./items";
import { ITEM_TEMPLATES } from "./items";

const SECONDARY_EFFECTS_BY_RARITY: Record<Rarity, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

function calculateEffectValue(
  effectType: ItemEffectType,
  level: number,
  rarity: Rarity
): number {
  const rarityMultiplier = {
    common: 1,
    uncommon: 1.2,
    rare: 1.5,
    epic: 1.8,
    legendary: 2.2,
  }[rarity];

  const baseValue = level * 2;
  return Math.floor(baseValue * rarityMultiplier);
}

function getRandomEffectTypes(
  count: number,
  exclude: ItemEffectType[]
): ItemEffectType[] {
  const allEffects: ItemEffectType[] = [
    "flatDamage",
    "percentDamage",
    "flatDefense",
    "percentDefense",
    "flatHealth",
    "percentHealth",
    "flatSpeed",
    "percentSpeed",
    "itemDropChance",
    "poison",
    "bleed",
    "fire",
    "ice",
    "lightning",
  ];
  const available = allEffects.filter((e) => !exclude.includes(e));
  const selected: ItemEffectType[] = [];

  for (let i = 0; i < count && available.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return selected;
}

export function createItemFromTemplate(
  template: ItemTemplate,
  level: number,
  rarity: Rarity
): Item {
  const mainEffects: ItemEffect[] = template.itemEffectTypes.map(
    (effectType) => ({
      [effectType]: calculateEffectValue(effectType, level, rarity),
    })
  );

  const secondaryCount = SECONDARY_EFFECTS_BY_RARITY[rarity];
  const secondaryEffectTypes = getRandomEffectTypes(
    secondaryCount,
    template.itemEffectTypes
  );
  const secondaryEffects: ItemEffect[] = secondaryEffectTypes.map(
    (effectType) => ({
      [effectType]: calculateEffectValue(effectType, level, rarity),
    })
  );

  return {
    ...template,
    level,
    rarity,
    equipped: false,
    mainEffects,
    secondaryEffects,
  };
}

function calculateDropRarity(): Rarity {
  const rand = Math.random();
  const rarityChance = {
    legendary: 0.01,
    epic: 0.05,
    rare: 0.15,
    uncommon: 0.4,
    common: 0.39,
  };

  let accumulated = 0;
  for (const [rarity, chance] of Object.entries(rarityChance)) {
    accumulated += chance;
    if (rand <= accumulated) {
      return rarity as Rarity;
    }
  }

  return "common";
}

export function calcItemDrop(level: number): Item {
  // Select random template
  const randomTemplate =
    ITEM_TEMPLATES[Math.floor(Math.random() * ITEM_TEMPLATES.length)];

  // Calculate drop rarity
  const rarity = calculateDropRarity();

  return createItemFromTemplate(randomTemplate, level, rarity);
}
