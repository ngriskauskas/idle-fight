import { useGameStore } from "../store/gameStore";
import type { Item, EquipSlot } from "../types/item";
import { ICON_MAP } from "../data/iconMap";
import { equipItem, unequipItem } from "../logic/itemActions";
import { EffectsDisplay } from "./EffectsDisplay";
import { TriggersDisplay } from "./TriggersDisplay";
import { Character } from "../types";
import { Tooltip } from "./Tooltip";

const RARITY_COLORS: Record<string, string> = {
  common: "bg-gray-400",
  uncommon: "bg-green-400",
  rare: "bg-blue-400",
  epic: "bg-purple-400",
  legendary: "bg-yellow-400",
  unique: "bg-orange-500",
};

const SLOT_DISPLAY: Record<string, string> = {
  helmet: "Helmet",
  body: "Body",
  legs: "Legs",
  boots: "Boots",
  weapon1: "Weapon 1",
  weapon2: "Weapon 2",
  ring1: "Ring 1",
  ring2: "Ring 2",
  amulet: "Amulet",
};

function ItemTooltip({ item }: { item: Item }) {
  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-56 max-w-full text-sm">
      <h4 className="font-bold text-white mb-1">
        {item.name} <span className="text-gray-400 text-xs">Lv {item.level}</span>
      </h4>
      <div className="text-xs text-gray-400 mb-3">
        Slot: {item.slot} • Rarity: {item.rarity}
      </div>

      {/* Main Effects */}
      {item.triggers && item.triggers.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-bold text-gray-300 mb-1">Triggers</div>
          <TriggersDisplay triggers={item.triggers} size="sm" />
        </div>
      )}

      {/* Main Effects */}
      {item.mainEffects.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-bold text-gray-300 mb-1">Main Effects</div>
          <EffectsDisplay effects={item.mainEffects} size="sm" />
        </div>
      )}

      {/* Secondary Effects */}
      {item.secondaryEffects.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-bold text-gray-300 mb-1">Secondary Effects</div>
          <EffectsDisplay effects={item.secondaryEffects} size="sm" />
        </div>
      )}
    </div>
  );
}

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
          <div className="text-center text-2xl">
            {Icon && <Icon size={28} color="#1e293b" />}
          </div>
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

export function ItemPanel() {
  const character = useGameStore((state) =>
    state.friends.find((f) => f.id === "main"),
  )! as Character;
  const unequippedItems = character.items.filter((i) => !i.equipped);
  const slot = (name: EquipSlot) => (
    <EquipmentSlot slot={name} item={character.equippedSlots[name] ?? undefined} />
  );

  return (
    <div className="flex flex-col h-full gap-4 p-2">
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

      {/* Inventory */}
      <div className="flex-1 flex flex-col min-h-[12rem]">
        <div className="bg-gray-800 rounded p-2 flex-1 overflow-y-auto">
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 gap-2">
            {/* Create 120 slots (6x20 grid) */}
            {Array.from({ length: 120 }).map((_, slotIndex) => {
              const item = unequippedItems[slotIndex];
              const Icon = item?.icon ? ICON_MAP[item.icon] : undefined;
              return (
                <div
                  key={slotIndex}
                  className="aspect-square bg-gray-700 border-2 border-gray-600 rounded hover:border-gray-500 flex items-center justify-center cursor-pointer"
                >
                  {item ? (
                    <Tooltip
                      key={item.id}
                      className="w-full h-full"
                      content={<ItemTooltip item={item} />}
                    >
                      <div
                        className={`w-full h-full ${
                          RARITY_COLORS[item.rarity]
                        } rounded flex flex-col items-center justify-center p-0.5 cursor-pointer hover:opacity-80`}
                        onClick={() => {
                          let targetSlot: EquipSlot = item.slot as EquipSlot;
                          if (item.slot === "weapon") {
                            targetSlot = character.equippedSlots.weapon1 ? "weapon2" : "weapon1";
                          } else if (item.slot === "ring") {
                            targetSlot = character.equippedSlots.ring1 ? "ring2" : "ring1";
                          }
                          equipItem(item.id, targetSlot);
                        }}
                      >
                        <div className="text-lg">{Icon && <Icon size={22} color="#1e293b" />}</div>
                        <div className="text-[0.5rem] font-bold text-gray-900">Lv {item.level}</div>
                      </div>
                    </Tooltip>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
