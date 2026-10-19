import type { ItemTemplate } from "../types/item";

// Uniques sold only by the merchant. Each is weak or harmful alone and pays off with
// the piece named beside it.
export const SHOP_ITEMS: ItemTemplate[] = [
  {
    // Toxic Blood turns the self-poison into healing; Plaguebearer's Mask adds more.
    // No +poison on the item: your own poison stat feeds the self-poison
    id: "martyrs-plate",
    name: "Martyr's Plate",
    icon: "chestArmor",
    slot: "body",
    itemEffects: [
      { type: "health", value: 30, valueType: "flat", priority: "normal" },
      { type: "healthRegen", value: 1, valueType: "flat", priority: "normal" },
      {
        type: "defense",
        value: -25,
        valueType: "percentage",
        priority: "normal",
      },
    ],
    triggers: [
      {
        id: "martyrs-plate-self-poison",
        type: "onTakeAttack",
        action: "applyStatusSelf",
        status: "poison",
        value: 2,
      },
    ],
  },
  {
    // pays a build that hoards mana instead of casting, like Mana Overflow; the damage
    // penalty is what such a build (a fighter) pays, while a caster rarely fills up
    id: "overflowing-chalice",
    name: "Overflowing Chalice",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      { type: "mana", value: 60, valueType: "flat", priority: "normal" },
      { type: "lightning", value: 3, valueType: "flat", priority: "normal" },
      {
        type: "damage",
        value: -15,
        valueType: "percentage",
        priority: "normal",
      },
    ],
    triggers: [
      {
        id: "overflowing-chalice-storm",
        type: "onFullMana",
        action: "applyStatusAoe",
        status: "lightning",
        value: 6,
      },
    ],
  },
  {
    // fragile alone; Raise Shield, Eternal Aegis or Thornmail cover the lost health
    id: "glass-pendant",
    name: "Glass Pendant",
    icon: "gemNecklace",
    slot: "amulet",
    itemEffects: [
      {
        type: "damage",
        value: 30,
        valueType: "percentage",
        priority: "normal",
      },
      {
        type: "critMultiplier",
        value: 40,
        valueType: "flat",
        priority: "normal",
      },
      {
        type: "health",
        value: -30,
        valueType: "percentage",
        priority: "normal",
      },
    ],
  },
  {
    // shatters what Frostbolt, Frost Nova or Frostbrand put down; Ring of Execution crits more
    id: "rimewalker-boots",
    name: "Rimewalker Boots",
    icon: "boots",
    slot: "boots",
    itemEffects: [
      { type: "ice", value: 6, valueType: "flat", priority: "normal" },
      { type: "speed", value: -3, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "rimewalker-boots-shatter",
        type: "onCrit",
        action: "shatterStatus",
        status: "ice",
        value: 2,
      },
    ],
  },
  {
    // burns you every second like Immolation; Ignite and Inferno feed the burning crowd.
    // Regen rather than fire on the item, since your own fire stat feeds the self-burn
    id: "pyre-censer",
    name: "Pyre Censer",
    icon: "visoredHelm",
    slot: "helmet",
    itemEffects: [
      { type: "healthRegen", value: 1.5, valueType: "flat", priority: "normal" },
      { type: "health", value: 15, valueType: "flat", priority: "normal" },
    ],
    triggers: [
      {
        id: "pyre-censer-burn-enemies",
        type: "tickTrigger",
        action: "applyStatusAoe",
        status: "fire",
        value: 2,
      },
      {
        id: "pyre-censer-burn-self",
        type: "tickTrigger",
        action: "applyStatusSelf",
        status: "fire",
        value: 1,
      },
    ],
  },
  {
    // more drops to sell and feed the smith, paid for in health so casters pay too
    id: "misers-ring",
    name: "Miser's Ring",
    icon: "ring",
    slot: "ring",
    itemEffects: [
      {
        type: "itemDropChance",
        value: 6,
        valueType: "flat",
        priority: "normal",
      },
      { type: "mana", value: 15, valueType: "flat", priority: "normal" },
      { type: "health", value: -15, valueType: "percentage", priority: "normal" },
    ],
  },
];
