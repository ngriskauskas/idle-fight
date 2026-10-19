import { useGameStore } from "../store/gameStore";
import type { Character, Item, ItemRarity, ItemSlot } from "../types";
import { SHOP_ITEMS } from "../data/shopItemData";
import { UNIQUE_ITEMS } from "../data/uniqueItemData";
import { generateItem, getRandomItem, hasTemplateFor } from "./itemActions";
import { getScaleAt, getScaleMulti } from "./progressionActions";
import { getCombatant } from "../utils/getCombatant";

// Gold an item sells for per point of enemy scale it was rolled at. Rarer items are
// worth roughly the commons it takes to find one.
const SELL_VALUE: Record<ItemRarity, number> = {
  common: 2,
  uncommon: 5,
  rare: 12,
  epic: 30,
  legendary: 75,
  // half what the merchant asks for one, so swapping uniques is not free
  unique: 75,
};
// The merchant charges this many times what he would pay for the same item. Uniques
// carry less markup, so one is a long save rather than out of reach.
const BUY_MARKUP = 3;
const UNIQUE_BUY_MARKUP = 2;
// Gold per kill, per point of the current enemy scale. Bosses pay more. Drops are
// random, so this keeps the shop within reach of an unlucky run.
const KILL_GOLD = 0.25;
const BOSS_KILL_GOLD_MULTI = 10;
// Seconds of play between restocks
export const SHOP_RESTOCK_SECONDS = 600;
// A reroll costs this many commons' worth of gold at the shop's scale
const REROLL_COST = 25;

export const SMITH_INPUTS = 4;
const SMITH_BONUS_SECONDARIES = 1;
export const SMITH_NEXT: Partial<Record<ItemRarity, ItemRarity>> = {
  common: "uncommon",
  uncommon: "rare",
  rare: "epic",
  epic: "legendary",
  legendary: "unique",
};

// Items from saves before items stored their scale: assume world 1 at their level
function itemScale(item: Item): number {
  return item.scale ?? getScaleAt(1, item.level);
}

export function getSellValue(item: Item): number {
  return Math.max(1, Math.round(SELL_VALUE[item.rarity] * itemScale(item)));
}

export function getBuyPrice(item: Item): number {
  return getSellValue(item) * (item.rarity === "unique" ? UNIQUE_BUY_MARKUP : BUY_MARKUP);
}

export function gainKillGold(isBoss: boolean): void {
  const gold = Math.max(
    1,
    Math.round(KILL_GOLD * getScaleMulti() * (isBoss ? BOSS_KILL_GOLD_MULTI : 1)),
  );
  useGameStore.setState((state) => {
    state.gold += gold;
  });
}

// The shop stocks at the furthest wave reached, so it keeps up with the player
// even right after a death sends them back to world 1.
function shopScale(): { level: number; scale: number } {
  const { world, wave } = useGameStore.getState().progress.highest;
  return { level: wave, scale: getScaleAt(world, wave) };
}

export function getRerollCost(): number {
  return Math.round(SELL_VALUE.common * REROLL_COST * shopScale().scale);
}

const pick = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

// Six wares: two merchant-only uniques, one ordinary unique and three good rolled items.
// A held ware stays through restocks until it is bought or let go.
export function restockShop(): void {
  const { level, scale } = shopScale();
  const { items, heldId } = useGameStore.getState().shop;
  const held = items.filter((i) => i.id === heldId);
  const merchantOnly = [...SHOP_ITEMS].sort(() => Math.random() - 0.5).slice(0, 2);
  const stock: Item[] = [
    ...merchantOnly.map((template) => generateItem(level, { template, rarity: "unique" }, scale)),
    generateItem(level, { template: pick(UNIQUE_ITEMS), rarity: "unique" }, scale),
    ...(["rare", "epic", "legendary"] as ItemRarity[]).map((rarity) =>
      generateItem(level, { rarity }, scale),
    ),
  ];
  useGameStore.setState((state) => {
    state.shop.items = [...held, ...stock];
    if (held.length === 0) state.shop.heldId = undefined;
    state.shop.restockIn = SHOP_RESTOCK_SECONDS;
  });
}

export function tickShop(): void {
  const { shop } = useGameStore.getState();
  if (shop.restockIn <= 1) {
    restockShop();
    return;
  }
  useGameStore.setState((state) => {
    state.shop.restockIn -= 1;
  });
}

export function rerollShop(): boolean {
  const cost = getRerollCost();
  if (useGameStore.getState().gold < cost) return false;
  useGameStore.setState((state) => {
    state.gold -= cost;
  });
  restockShop();
  return true;
}

export function toggleHoldItem(itemId: string): void {
  useGameStore.setState((state) => {
    state.shop.heldId = state.shop.heldId === itemId ? undefined : itemId;
  });
}

export function buyItem(itemId: string): boolean {
  const state = useGameStore.getState();
  const item = state.shop.items.find((i) => i.id === itemId);
  if (!item || state.gold < getBuyPrice(item)) return false;
  useGameStore.setState((state) => {
    state.gold -= getBuyPrice(item);
    state.shop.items = state.shop.items.filter((i) => i.id !== itemId);
    if (state.shop.heldId === itemId) state.shop.heldId = undefined;
    (getCombatant("main", state) as Character).items.push(item);
  });
  return true;
}

// Sells inventory items (never equipped ones). Returns the gold gained.
export function sellItems(itemIds: string[]): number {
  const character = getCombatant("main", useGameStore.getState()) as Character;
  const sold = character.items.filter((i) => itemIds.includes(i.id));
  const gold = sold.reduce((sum, item) => sum + getSellValue(item), 0);
  useGameStore.setState((state) => {
    const character = getCombatant("main", state) as Character;
    character.items = character.items.filter((i) => !itemIds.includes(i.id));
    state.gold += gold;
  });
  return gold;
}

// Four inventory items of one rarity become one random item of the next rarity, at the
// inputs' average level and scale, so junk cannot ride on one strong input. Four of one
// slot keep that slot when the next rarity has an item for it.
// the slot a smith result keeps, if any
export function getSmithSlot(inputs: Item[]): ItemSlot | undefined {
  const next = SMITH_NEXT[inputs[0]?.rarity];
  const slot = inputs[0]?.slot;
  if (!next || !inputs.every((i) => i.slot === slot)) return undefined;
  return hasTemplateFor(next, slot) ? slot : undefined;
}

export function smithItems(itemIds: string[]): Item | undefined {
  const character = getCombatant("main", useGameStore.getState()) as Character;
  const inputs = character.items.filter((i) => itemIds.includes(i.id));
  if (inputs.length !== SMITH_INPUTS) return undefined;
  const rarity = SMITH_NEXT[inputs[0].rarity];
  if (!rarity || inputs.some((i) => i.rarity !== inputs[0].rarity)) return undefined;

  const slot = getSmithSlot(inputs);
  const level = Math.round(inputs.reduce((sum, i) => sum + i.level, 0) / inputs.length);
  const scale = inputs.reduce((sum, i) => sum + itemScale(i), 0) / inputs.length;
  // forged items carry one secondary more than a drop of their rarity: the reason to
  // smith rather than sell, without adding to the sell value
  const result = generateItem(
    level,
    { template: getRandomItem(rarity, slot), rarity, extraSecondaries: SMITH_BONUS_SECONDARIES },
    scale,
  );

  useGameStore.setState((state) => {
    const character = getCombatant("main", state) as Character;
    character.items = character.items.filter((i) => !itemIds.includes(i.id));
    character.items.push(result);
  });
  return result;
}
