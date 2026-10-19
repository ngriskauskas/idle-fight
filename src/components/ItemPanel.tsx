import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import type { Item, EquipSlot, ItemRarity } from "../types/item";
import { ICON_MAP } from "../data/iconMap";
import { equipItem, unequipItem } from "../logic/itemActions";
import { getSellValue, sellItems } from "../logic/shopActions";
import { Character } from "../types";
import { Tooltip } from "./Tooltip";
import {
  EQUIP_SLOTS,
  GoldAmount,
  ItemComparison,
  ItemDetails,
  ItemIconBox,
  ItemTooltip,
  RARITY_COLORS,
  RARITY_TEXT,
  SLOT_DISPLAY,
} from "./ItemCard";
import { ShopPanel } from "./ShopPanel";
import { SmithPanel } from "./SmithPanel";

type ItemTab = "inventory" | "shop" | "smith";

const ITEM_TABS: { id: ItemTab; label: string }[] = [
  { id: "inventory", label: "Inventory" },
  { id: "shop", label: "Shop" },
  { id: "smith", label: "Smith" },
];

const BULK_SELL_RARITIES: ItemRarity[] = ["common", "uncommon", "rare"];

function EquipmentSlot({ slot, item }: { slot: EquipSlot; item?: Item }) {
  const Icon = item?.icon ? ICON_MAP[item.icon] : undefined;
  const box = (
    <div
      className="aspect-square bg-gray-700 border-2 border-gray-600 rounded cursor-pointer hover:border-gray-500 flex items-center justify-center"
      onClick={() => unequipItem(slot)}
    >
      {item ? (
        <div
          className={`w-full h-full ${
            RARITY_COLORS[item.rarity]
          } rounded flex flex-col items-center justify-center p-1`}
        >
          <div className="text-center text-2xl">{Icon && <Icon size={28} color="#1e293b" />}</div>
          <div className="text-[0.5rem] font-bold text-gray-900">Lv {item.level}</div>
        </div>
      ) : (
        <div className="text-center text-xs text-gray-500">{SLOT_DISPLAY[slot]}</div>
      )}
    </div>
  );

  return (
    <div className="w-16">
      {item ? (
        // keyed by item so the tooltip closes when the slot's item changes
        <Tooltip key={item.id} content={<ItemTooltip item={item} />}>
          {box}
        </Tooltip>
      ) : (
        box
      )}
    </div>
  );
}

// The picked inventory item, what it changes against each slot it fits, and what to do with it
function SelectedItem({
  item,
  equippedSlots,
  onDone,
}: {
  item: Item;
  equippedSlots: Record<EquipSlot, Item | null>;
  onDone: () => void;
}) {
  const slots = EQUIP_SLOTS[item.slot];
  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 text-sm">
      <div className="flex justify-between items-start gap-2">
        <ItemDetails item={item} />
        <button onClick={onDone} className="text-gray-400 hover:text-white px-1" title="Close">
          ✕
        </button>
      </div>
      <div
        className={`grid gap-3 mt-2 pt-2 border-t border-gray-700 ${slots.length > 1 ? "grid-cols-2" : ""}`}
      >
        {slots.map((slot) => {
          const equipped = equippedSlots[slot];
          return (
            <div key={slot} className="flex flex-col gap-1 min-w-0">
              <div className="text-xs font-bold text-gray-300 truncate">
                vs {SLOT_DISPLAY[slot]}:{" "}
                {equipped ? (
                  <span className={RARITY_TEXT[equipped.rarity]}>{equipped.name}</span>
                ) : (
                  <span className="text-gray-500">empty</span>
                )}
              </div>
              <div className="flex-1">
                <ItemComparison item={item} equipped={equipped} />
              </div>
              <button
                onClick={() => {
                  equipItem(item.id, slot);
                  onDone();
                }}
                className="mt-1 py-1 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold"
              >
                Equip{slots.length > 1 ? ` in ${SLOT_DISPLAY[slot]}` : ""}
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          sellItems([item.id]);
          onDone();
        }}
        className="mt-2 w-full py-1 rounded bg-amber-700 hover:bg-amber-600 text-xs font-semibold"
      >
        Sell for <GoldAmount value={getSellValue(item)} className="text-amber-100" />
      </button>
    </div>
  );
}

// Sells every inventory item of a rarity. The first click asks, the second sells.
function BulkSell({ items }: { items: Item[] }) {
  const [confirming, setConfirming] = useState<ItemRarity | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs">
      <span className="text-gray-400">Sell all:</span>
      {BULK_SELL_RARITIES.map((rarity) => {
        const matching = items.filter((i) => i.rarity === rarity);
        const value = matching.reduce((sum, i) => sum + getSellValue(i), 0);
        const isConfirming = confirming === rarity;
        return (
          <button
            key={rarity}
            disabled={matching.length === 0}
            onClick={() => {
              if (!isConfirming) return setConfirming(rarity);
              sellItems(matching.map((i) => i.id));
              setConfirming(null);
            }}
            onBlur={() => setConfirming(null)}
            className={`px-2 py-1 rounded capitalize disabled:opacity-40 disabled:cursor-not-allowed ${
              isConfirming ? "bg-red-700 hover:bg-red-600" : "bg-slate-600 hover:bg-slate-500"
            }`}
          >
            {isConfirming ? (
              <>
                Sell {matching.length} for <GoldAmount value={value} />?
              </>
            ) : (
              <>
                <span className={RARITY_TEXT[rarity]}>{rarity}</span> ({matching.length})
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

function InventoryView({ character }: { character: Character }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const unequippedItems = character.items.filter((i) => !i.equipped);
  const selected = unequippedItems.find((i) => i.id === selectedId);
  const slot = (name: EquipSlot) => (
    <EquipmentSlot slot={name} item={character.equippedSlots[name] ?? undefined} />
  );

  return (
    <>
      {/* Equipment Slots - Character Layout */}
      <div className="bg-gray-800 rounded p-2 w-fit mx-auto">
        {/* Amulet + Helmet (aligned with body below) + spacer */}
        <div className="flex gap-2 mb-2 justify-center">
          {slot("amulet")}
          {slot("helmet")}
          <div className="w-16"></div>
        </div>

        {/* Weapons + Body */}
        <div className="flex gap-2 mb-2 justify-center">
          {slot("weapon1")}
          {slot("body")}
          {slot("weapon2")}
        </div>

        {/* Rings + Legs */}
        <div className="flex gap-2 mb-2 justify-center">
          {slot("ring1")}
          {slot("legs")}
          {slot("ring2")}
        </div>

        {/* Boots */}
        <div className="flex justify-center">{slot("boots")}</div>
      </div>

      {selected && (
        <SelectedItem
          item={selected}
          equippedSlots={character.equippedSlots}
          onDone={() => setSelectedId(null)}
        />
      )}

      {/* Inventory */}
      <div className="flex-1 flex flex-col min-h-[12rem] gap-2">
        <div className="flex flex-wrap justify-between items-center gap-1">
          <span className="text-xs text-gray-400">
            {unequippedItems.length} items • click one to compare, equip or sell
          </span>
          <BulkSell items={unequippedItems} />
        </div>
        <div className="bg-gray-800 rounded p-2 flex-1 overflow-y-auto">
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 gap-2">
            {Array.from({ length: Math.max(60, unequippedItems.length) }).map((_, slotIndex) => {
              const item = unequippedItems[slotIndex];
              const isSelected = item && item.id === selectedId;
              return (
                <div
                  key={slotIndex}
                  className={`aspect-square bg-gray-700 border-2 rounded flex items-center justify-center ${
                    isSelected ? "border-white" : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {item ? (
                    <Tooltip
                      key={item.id}
                      hoverOnly
                      className="w-full h-full"
                      content={<ItemTooltip item={item} equippedSlots={character.equippedSlots} />}
                    >
                      <div
                        className="w-full h-full cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedId(isSelected ? null : item.id)}
                      >
                        <ItemIconBox item={item} />
                      </div>
                    </Tooltip>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemPanel() {
  const character = useGameStore((state) =>
    state.friends.find((f) => f.id === "main"),
  )! as Character;
  const gold = useGameStore((state) => state.gold);
  const [tab, setTab] = useState<ItemTab>("inventory");

  return (
    <div className="flex flex-col h-full gap-3 p-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {ITEM_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-1 rounded text-xs font-semibold ${
                tab === t.id
                  ? "bg-amber-600 text-white"
                  : "bg-slate-600 text-slate-300 hover:bg-slate-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <GoldAmount value={gold} className="text-sm" />
      </div>

      {tab === "inventory" && <InventoryView character={character} />}
      {tab === "shop" && <ShopPanel character={character} />}
      {tab === "smith" && <SmithPanel character={character} />}
    </div>
  );
}
