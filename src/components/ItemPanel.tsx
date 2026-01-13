import { useState } from "react";
import { useItemStore } from "../itemStore";
import type { Item } from "../itemStore";

const RARITY_COLORS: Record<string, string> = {
  common: "bg-gray-400",
  uncommon: "bg-green-400",
  rare: "bg-blue-400",
  epic: "bg-purple-400",
  legendary: "bg-yellow-400",
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

const EQUIPMENT_SLOTS = [
  "helmet",
  "body",
  "legs",
  "boots",
  "weapon1",
  "weapon2",
  "ring1",
  "ring2",
  "amulet",
];

function ItemTooltip({ item }: { item: Item }) {
  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-48 text-sm">
      <h4 className="font-bold text-white mb-1">{item.name}</h4>
      <p className="text-gray-300 text-xs mb-2">{item.description}</p>
      <div className="text-xs text-gray-400">
        <div>Level: {item.level}</div>
        <div>Slot: {item.slot}</div>
        <div>Rarity: {item.rarity}</div>
      </div>
    </div>
  );
}

export function ItemPanel() {
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const items = useItemStore((state) => state.items);
  const equippedSlots = useItemStore((state) => state.equippedSlots);
  const getEquippedInSlot = useItemStore((state) => state.getEquippedInSlot);
  const equipItem = useItemStore((state) => state.equipItem);
  const unequipItem = useItemStore((state) => state.unequipItem);

  const handleMouseEnter = (
    item: Item,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredItem(item);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left - 208, y: rect.top });
  };

  const EquipmentSlot = ({ slot }: { slot: string }) => {
    const equippedItem = getEquippedInSlot(slot);
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      unequipItem(slot);
    };
    return (
      <div
        className="aspect-square bg-gray-700 border-2 border-gray-600 rounded cursor-pointer hover:border-gray-500 flex items-center justify-center pointer-events-auto"
        onPointerDown={handleClick}
        onMouseEnter={(e) => {
          if (equippedItem) {
            handleMouseEnter(equippedItem, e);
          }
        }}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {equippedItem ? (
          <div
            className={`w-full h-full ${
              RARITY_COLORS[equippedItem.rarity]
            } rounded flex flex-col items-center justify-center p-1 pointer-events-auto`}
            onPointerDown={handleClick}
          >
            <div className="text-center text-2xl">{equippedItem.icon}</div>
            <div className="text-[0.5rem] font-bold text-gray-900">
              Lv {equippedItem.level}
            </div>
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500">
            {SLOT_DISPLAY[slot]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-4 p-2">
      {/* Equipment Slots - Character Layout */}
      <div className="bg-gray-800 rounded p-2 w-fit mx-auto">
        {/* Amulet + Helmet (aligned with body below) + spacer */}
        <div className="flex gap-2 mb-2 justify-center">
          <div className="w-16">
            <EquipmentSlot slot="amulet" />
          </div>
          <div className="w-16">
            <EquipmentSlot slot="helmet" />
          </div>
          <div className="w-16"></div>
        </div>

        {/* Weapons + Body */}
        <div className="flex gap-2 mb-2 justify-center">
          <div className="w-16">
            <EquipmentSlot slot="weapon1" />
          </div>
          <div className="w-16">
            <EquipmentSlot slot="body" />
          </div>
          <div className="w-16">
            <EquipmentSlot slot="weapon2" />
          </div>
        </div>

        {/* Rings + Legs */}
        <div className="flex gap-2 mb-2 justify-center">
          <div className="w-16">
            <EquipmentSlot slot="ring1" />
          </div>
          <div className="w-16">
            <EquipmentSlot slot="legs" />
          </div>
          <div className="w-16">
            <EquipmentSlot slot="ring2" />
          </div>
        </div>

        {/* Boots */}
        <div className="flex justify-center">
          <div className="w-16">
            <EquipmentSlot slot="boots" />
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-gray-800 rounded p-2 flex-1 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {/* Create 120 slots (6x20 grid) */}
            {Array.from({ length: 120 }).map((_, slotIndex) => {
              const item = items.find(
                (i) =>
                  !i.equipped &&
                  items.filter((it) => !it.equipped).indexOf(i) === slotIndex
              );
              return (
                <div
                  key={slotIndex}
                  className="aspect-square bg-gray-700 border-2 border-gray-600 rounded hover:border-gray-500 flex items-center justify-center cursor-pointer"
                >
                  {item ? (
                    <div
                      className={`w-full h-full ${
                        RARITY_COLORS[item.rarity]
                      } rounded flex flex-col items-center justify-center p-0.5 cursor-pointer hover:opacity-80`}
                      onClick={() => {
                        equipItem(item.id);
                        setHoveredItem(null);
                      }}
                      onMouseEnter={(e) => handleMouseEnter(item, e)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="text-lg">{item.icon}</div>
                      <div className="text-[0.5rem] font-bold text-gray-900">
                        Lv {item.level}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <ItemTooltip item={hoveredItem} />
        </div>
      )}
    </div>
  );
}
