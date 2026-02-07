import type { Effect } from "./effect";
import { Trigger } from "./triggers";

export interface Talent {
  id: string;
  name: string;
  icon?: string;
  unlocked: boolean;
  level: number;
  maxLevel: number;
  cost: number;
  tier: number;
  category: "attack" | "defense" | "speed" | "status" | "utility";
  effects: Effect[];
  triggers?: Trigger[];
}
