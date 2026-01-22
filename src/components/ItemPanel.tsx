import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import type { Item, ItemEffect, EquipSlot } from "../types/item";
import { ICON_MAP } from "../data/iconMap";
import { equipItem, unequipItem } from "../logic/itemActions";

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

function ItemTooltip({ item }: { item: Item }) {
  const formatEffect = (effectType: string, value: number) => {
    const isPercent = effectType.startsWith("percent");
    const baseValue = value > 0 ? `+${value}` : `${value}`;
    return isPercent ? `${baseValue} %` : baseValue;
  };

  const formatEffectLabel = (effectType: string) => {
    if (effectType === "itemDropChance") return "Item Drop Chance";
    return effectType
      .replace(/^flat/, "")
      .replace(/^percent/, "")
      .replace(/([A-Z])/g, " $1")
      .trim();
  };

  const getStatusEffectColor = (effectType: string) => {
    const colors: Record<string, string> = {
      poison: "text-purple-400",
      bleed: "text-red-400",
      fire: "text-orange-400",
      ice: "text-blue-400",
      lightning: "text-yellow-400",
    };
    return colors[effectType] || "text-gray-400";
  };

  const isStatusEffect = (effectType: string) => {
    return ["poison", "bleed", "fire", "ice", "lightning"].includes(effectType);
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-56 text-sm">
      <h4 className="font-bold text-white mb-1">
        {item.name}{" "}
        <span className="text-gray-400 text-xs">Lv {item.level}</span>
      </h4>
      <div className="text-xs text-gray-400 mb-3">
        Slot: {item.slot} • Rarity: {item.rarity}
      </div>

      {/* Main Effects */}
      <div className="mb-3">
        <div className="text-xs font-bold text-gray-300 mb-1">Main Effects</div>
        {item.mainEffects.map((effect: ItemEffect, idx: number) => {
          const [effectType, value] = Object.entries(effect)[0];
          const colorClass = isStatusEffect(effectType)
            ? getStatusEffectColor(effectType)
            : "text-gray-400";
          const label = isStatusEffect(effectType)
            ? effectType.charAt(0).toUpperCase() + effectType.slice(1)
            : formatEffectLabel(effectType);
          return (
            <div key={idx} className={`text-xs ${colorClass}`}>
              {label}: {formatEffect(effectType, value as number)}
            </div>
          );
        })}
      </div>

      {/* Secondary Effects */}
      {item.secondaryEffects.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-bold text-gray-300 mb-1">
            Secondary Effects
          </div>
          {item.secondaryEffects.map((effect: ItemEffect, idx: number) => {
            const [effectType, value] = Object.entries(effect)[0];
            const colorClass = isStatusEffect(effectType)
              ? getStatusEffectColor(effectType)
              : "text-gray-500";
            const label = isStatusEffect(effectType)
              ? effectType.charAt(0).toUpperCase() + effectType.slice(1)
              : formatEffectLabel(effectType);
            return (
              <div key={idx} className={`text-xs ${colorClass}`}>
                {label}: {formatEffect(effectType, value as number)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ItemPanel() {
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const character = useGameStore((state) => state.character);
  const items = character.items;

  const handleMouseEnter = (
    item: Item,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    setHoveredItem(item);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left - 208, y: rect.top });
  };

  const EquipmentSlot = ({ slot }: { slot: EquipSlot }) => {
    const equippedItem = character.equippedSlots[slot];

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
            <div className="text-center text-2xl">
              {equippedItem.icon &&
                ICON_MAP[equippedItem.icon] &&
                (() => {
                  const Icon = ICON_MAP[equippedItem.icon];
                  return <Icon size={28} color="#1e293b" />;
                })()}
            </div>
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
              const unequippedItems = items.filter((i) => !i.equipped);
              const item = unequippedItems[slotIndex];
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
                        let targetSlot: EquipSlot = item.slot as EquipSlot;
                        if (item.slot === "weapon") {
                          targetSlot = character.equippedSlots.weapon1
                            ? "weapon2"
                            : "weapon1";
                        } else if (item.slot === "ring") {
                          targetSlot = character.equippedSlots.ring1
                            ? "ring2"
                            : "ring1";
                        }
                        equipItem(item.id, targetSlot);
                        setHoveredItem(null);
                      }}
                      onMouseEnter={(e) => handleMouseEnter(item, e)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="text-lg">
                        {item.icon &&
                          ICON_MAP[item.icon] &&
                          (() => {
                            const Icon = ICON_MAP[item.icon];
                            return <Icon size={22} color="#1e293b" />;
                          })()}
                      </div>
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
