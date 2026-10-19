import { useState } from "react";
import type { Character, Item, ItemRarity } from "../types";
import {
  SMITH_INPUTS,
  SMITH_NEXT,
  getSellValue,
  getSmithSlot,
  smithItems,
} from "../logic/shopActions";
import { Tooltip } from "./Tooltip";
import { ItemDetails, ItemIconBox, ItemTooltip, RARITY_TEXT } from "./ItemCard";

const SMITH_RARITIES = Object.keys(SMITH_NEXT) as ItemRarity[];

export function SmithPanel({ character }: { character: Character }) {
  const [rarity, setRarity] = useState<ItemRarity>("common");
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<Item | null>(null);

  const candidates = character.items.filter((i) => i.rarity === rarity);
  const pickedItems = candidates.filter((i) => picked.includes(i.id));
  const sameSlot = pickedItems.length === SMITH_INPUTS ? getSmithSlot(pickedItems) : undefined;
  const next = SMITH_NEXT[rarity]!;

  const toggle = (id: string) =>
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length < SMITH_INPUTS ? [...p, id] : p,
    );

  // the four least valuable items of this rarity
  const pickWeakest = () =>
    setPicked(
      [...candidates]
        .sort((a, b) => getSellValue(a) - getSellValue(b))
        .slice(0, SMITH_INPUTS)
        .map((i) => i.id),
    );

  return (
    <div className="flex flex-col gap-2 min-h-0">
      <div className="text-xs text-gray-400">
        Melt {SMITH_INPUTS} items of one rarity into a random item of the next, as strong as the
        average of the four, with one bonus stat a drop would not have. Use {SMITH_INPUTS} of the
        same slot to keep that slot.
      </div>

      <div className="flex flex-wrap gap-1">
        {SMITH_RARITIES.map((r) => {
          const count = character.items.filter((i) => i.rarity === r).length;
          return (
            <button
              key={r}
              onClick={() => {
                setRarity(r);
                setPicked([]);
              }}
              className={`px-2 py-1 rounded text-xs capitalize ${
                r === rarity ? "bg-slate-500 ring-1 ring-white" : "bg-slate-600 hover:bg-slate-500"
              }`}
            >
              <span className={RARITY_TEXT[r]}>{r}</span> ({count})
            </button>
          );
        })}
      </div>

      <div className="bg-gray-900 border-2 border-gray-600 rounded p-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {Array.from({ length: SMITH_INPUTS }).map((_, i) => {
            const item = pickedItems[i];
            return (
              <div
                key={i}
                className="w-12 h-12 rounded border-2 border-dashed border-slate-500 cursor-pointer"
                onClick={() => item && toggle(item.id)}
              >
                {item && <ItemIconBox item={item} />}
              </div>
            );
          })}
          <span className="text-xl text-gray-400">→</span>
          <span className={`text-sm font-bold capitalize ${RARITY_TEXT[next]}`}>
            {sameSlot ? `${next} ${sameSlot}` : next}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={pickWeakest}
            disabled={candidates.length < SMITH_INPUTS}
            className="flex-1 py-1 rounded text-xs font-semibold bg-slate-600 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Pick weakest {SMITH_INPUTS}
          </button>
          <button
            onClick={() => {
              setResult(smithItems(picked) ?? null);
              setPicked([]);
            }}
            disabled={pickedItems.length !== SMITH_INPUTS}
            className="flex-1 py-1 rounded text-xs font-semibold bg-orange-700 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Combine
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-gray-900 border-2 border-orange-500 rounded p-2 text-sm">
          <div className="text-xs font-bold text-orange-300 mb-1">
            Forged! Now in your inventory:
          </div>
          <ItemDetails item={result} />
        </div>
      )}

      <div className="bg-gray-800 rounded p-2">
        {candidates.length === 0 ? (
          <div className="text-xs text-gray-400 text-center py-4">
            No <span className="capitalize">{rarity}</span> items in your inventory.
          </div>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 gap-2">
            {candidates.map((item) => (
              <div
                key={item.id}
                className={`aspect-square rounded border-2 ${
                  picked.includes(item.id) ? "border-white" : "border-gray-600"
                }`}
              >
                <Tooltip
                  hoverOnly
                  className="w-full h-full"
                  content={<ItemTooltip item={item} equippedSlots={character.equippedSlots} />}
                >
                  <div
                    className={`w-full h-full cursor-pointer ${picked.includes(item.id) ? "opacity-50" : "hover:opacity-80"}`}
                    onClick={() => toggle(item.id)}
                  >
                    <ItemIconBox item={item} />
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
