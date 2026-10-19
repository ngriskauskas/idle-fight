import { useGameStore } from "../store/gameStore";
import type { Character, Item } from "../types";
import { SHOP_ITEMS } from "../data/shopItemData";
import {
  buyItem,
  getBuyPrice,
  getRerollCost,
  rerollShop,
  toggleHoldItem,
} from "../logic/shopActions";
import {
  EQUIP_SLOTS,
  GoldAmount,
  ItemComparison,
  ItemDetails,
  ItemIconBox,
  SLOT_DISPLAY,
} from "./ItemCard";

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Ware({
  item,
  character,
  gold,
  held,
}: {
  item: Item;
  character: Character;
  gold: number;
  held: boolean;
}) {
  const price = getBuyPrice(item);
  const canAfford = gold >= price;
  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-2 text-sm flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-12 h-12 flex-shrink-0">
          <ItemIconBox item={item} />
        </div>
        <div className="flex-1 min-w-0">
          {SHOP_ITEMS.some((t) => t.name === item.name) && (
            <div className="text-[0.65rem] font-bold uppercase tracking-wide text-amber-300">
              Merchant only
            </div>
          )}
          <ItemDetails item={item} />
        </div>
      </div>
      {EQUIP_SLOTS[item.slot].map((slot) => (
        <div key={slot} className="pt-1 border-t border-gray-700">
          <div className="text-xs font-bold text-gray-400 mb-0.5">vs {SLOT_DISPLAY[slot]}</div>
          <ItemComparison item={item} equipped={character.equippedSlots[slot]} />
        </div>
      ))}
      <div className="flex gap-2">
        <button
          onClick={() => toggleHoldItem(item.id)}
          title="A held ware stays through restocks"
          className={`px-2 py-1 rounded text-xs font-semibold ${
            held ? "bg-sky-700 hover:bg-sky-600" : "bg-slate-600 hover:bg-slate-500"
          }`}
        >
          {held ? "Held" : "Hold"}
        </button>
        <button
          onClick={() => buyItem(item.id)}
          aria-disabled={!canAfford}
          className={`flex-1 py-1 rounded text-xs font-semibold ${
            canAfford
              ? "bg-amber-600 hover:bg-amber-500"
              : "bg-slate-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Buy for <GoldAmount value={price} className={canAfford ? "text-amber-100" : ""} />
        </button>
      </div>
    </div>
  );
}

export function ShopPanel({ character }: { character: Character }) {
  const shop = useGameStore((state) => state.shop);
  const gold = useGameStore((state) => state.gold);
  const rerollCost = getRerollCost();

  return (
    <div className="flex flex-col gap-2 min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-gray-400">
          New stock in <span className="font-bold text-white">{formatClock(shop.restockIn)}</span> •
          priced for your furthest wave
        </span>
        <button
          onClick={() => rerollShop()}
          aria-disabled={gold < rerollCost}
          className={`px-2 py-1 rounded font-semibold ${
            gold >= rerollCost
              ? "bg-slate-600 hover:bg-slate-500"
              : "bg-slate-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Restock now <GoldAmount value={rerollCost} />
        </button>
      </div>
      <div className="text-xs text-gray-400">
        Kills pay a little gold and selling old gear in the Inventory tab pays more. Hold a ware to
        keep it through restocks while you save up.
      </div>
      {shop.items.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-6">
          Sold out. Come back after the restock.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          {shop.items.map((item) => (
            <Ware
              key={item.id}
              item={item}
              character={character}
              gold={gold}
              held={item.id === shop.heldId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
