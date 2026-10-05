import type { Effect } from "./effect";
import { Trigger } from "./triggers";

export interface Talent {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  unlocked: boolean;
  level: number;
  maxLevel: number;
  cost: number;
  tier: number;
  category: "attack" | "defense" | "speed" | "status" | "utility";
  effects: Effect[];
  // character level needed before the talent can be taken
  requiredLevel?: number;
  // extra spell slots granted per talent level
  spellSlots?: number;
  triggers?: Trigger[];
}
