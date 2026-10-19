import type { Item, EquipSlot, ItemSlot, Effect } from "../types";
import { ICON_MAP } from "../data/iconMap";
import { EffectsDisplay, EFFECT_COLORS, EFFECT_LABELS } from "./EffectsDisplay";
import { TriggersDisplay } from "./TriggersDisplay";
import { formatNumber } from "../utils/format";

export const RARITY_COLORS: Record<string, string> = {
  common: "bg-gray-400",
  uncommon: "bg-green-400",
  rare: "bg-blue-400",
  epic: "bg-purple-400",
  legendary: "bg-yellow-400",
  unique: "bg-orange-500",
};

export const RARITY_TEXT: Record<string, string> = {
  common: "text-gray-300",
  uncommon: "text-green-400",
  rare: "text-blue-400",
  epic: "text-purple-400",
  legendary: "text-yellow-400",
  unique: "text-orange-400",
};

export const SLOT_DISPLAY: Record<string, string> = {
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

// the equipment slots an item of each kind can go in
export const EQUIP_SLOTS: Record<ItemSlot, EquipSlot[]> = {
  weapon: ["weapon1", "weapon2"],
  ring: ["ring1", "ring2"],
  body: ["body"],
  helmet: ["helmet"],
  legs: ["legs"],
  boots: ["boots"],
  amulet: ["amulet"],
};

export function GoldAmount({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`font-bold text-amber-300 ${className}`}>{formatNumber(value)}g</span>;
}

// Coloured square with the item's icon and level
export function ItemIconBox({ item, size = 22 }: { item: Item; size?: number }) {
  const Icon = item.icon ? ICON_MAP[item.icon] : undefined;
  return (
    <div
      className={`w-full h-full ${RARITY_COLORS[item.rarity]} rounded flex flex-col items-center justify-center p-0.5`}
    >
      <div>{Icon && <Icon size={size} color="#1e293b" />}</div>
      <div className="text-[0.5rem] font-bold text-gray-900">Lv {item.level}</div>
    </div>
  );
}

export function ItemDetails({ item }: { item: Item }) {
  return (
    <div>
      <h4 className={`font-bold mb-1 ${RARITY_TEXT[item.rarity]}`}>
        {item.name} <span className="text-gray-400 text-xs">Lv {item.level}</span>
      </h4>
      <div className="text-xs text-gray-400 mb-2 capitalize">
        {item.slot} • {item.rarity}
      </div>
      {item.triggers && item.triggers.length > 0 && (
        <div className="mb-2">
          <div className="text-xs font-bold text-gray-300 mb-1">Triggers</div>
          <TriggersDisplay triggers={item.triggers} size="sm" />
        </div>
      )}
      {item.mainEffects.length > 0 && (
        <div className="mb-2">
          <div className="text-xs font-bold text-gray-300 mb-1">Main Effects</div>
          <EffectsDisplay effects={item.mainEffects} size="sm" />
        </div>
      )}
      {item.secondaryEffects.length > 0 && (
        <div>
          <div className="text-xs font-bold text-gray-300 mb-1">Secondary Effects</div>
          <EffectsDisplay effects={item.secondaryEffects} size="sm" />
        </div>
      )}
    </div>
  );
}

function isPercent(type: string, valueType: string) {
  return valueType === "percentage" || type === "critChance" || type === "itemDropChance";
}

function sumEffects(item: Item | null | undefined): Map<string, number> {
  const sums = new Map<string, number>();
  if (!item) return sums;
  // like equipItem: only the first main and the first secondary effect of a type apply
  [item.mainEffects, item.secondaryEffects].forEach((effects) => {
    const seen = new Set<string>();
    effects.forEach((e: Effect) => {
      if (seen.has(e.type)) return;
      seen.add(e.type);
      const key = `${e.type}|${e.valueType}`;
      sums.set(key, (sums.get(key) ?? 0) + e.value);
    });
  });
  return sums;
}

// What changes if `item` replaces `equipped`: one row per stat that differs
export function ItemComparison({ item, equipped }: { item: Item; equipped: Item | null }) {
  const next = sumEffects(item);
  const current = sumEffects(equipped);
  const keys = [...new Set([...next.keys(), ...current.keys()])];
  const rows = keys
    .map((key) => {
      const [type, valueType] = key.split("|");
      return {
        type,
        valueType,
        delta: (next.get(key) ?? 0) - (current.get(key) ?? 0),
      };
    })
    .filter((r) => Math.abs(r.delta) > 1e-9);
  const lostTriggers = equipped?.triggers?.length && equipped.name !== item.name;

  return (
    <div className="text-xs space-y-0.5">
      {rows.length === 0 && !lostTriggers && <div className="text-gray-400">No stat changes</div>}
      {rows.map(({ type, valueType, delta }) => {
        const percent = isPercent(type, valueType);
        // a percentage bonus and a flat one are different stats, so label which is which
        const label = EFFECT_LABELS[type] + (valueType === "percentage" ? " %" : "");
        return (
          <div key={`${type}-${valueType}`} className="flex justify-between gap-3">
            <span className={EFFECT_COLORS[type]}>{label}</span>
            <span className={`font-bold ${delta > 0 ? "text-green-400" : "text-red-400"}`}>
              {delta > 0 ? "▲ +" : "▼ "}
              {formatNumber(delta)}
              {percent ? "%" : ""}
            </span>
          </div>
        );
      })}
      {lostTriggers ? <div className="text-red-400">Loses {equipped!.name}'s triggers</div> : null}
    </div>
  );
}

// Tooltip body: the item, then what it would change against each equipped item it could replace
export function ItemTooltip({
  item,
  equippedSlots,
}: {
  item: Item;
  equippedSlots?: Record<EquipSlot, Item | null>;
}) {
  const slots = equippedSlots ? EQUIP_SLOTS[item.slot] : [];
  return (
    <div className="bg-gray-900 border-2 border-gray-600 rounded p-3 w-60 max-w-full text-sm">
      <ItemDetails item={item} />
      {slots.map((slot) => (
        <div key={slot} className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-xs font-bold text-gray-300 mb-1">
            vs {SLOT_DISPLAY[slot]}:{" "}
            {equippedSlots![slot] ? (
              <span className={RARITY_TEXT[equippedSlots![slot]!.rarity]}>
                {equippedSlots![slot]!.name}
              </span>
            ) : (
              <span className="text-gray-500">empty</span>
            )}
          </div>
          <ItemComparison item={item} equipped={equippedSlots![slot]} />
        </div>
      ))}
    </div>
  );
}
