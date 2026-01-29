import type { Effect } from "./effect";

export interface Talent {
  id: string;
  name: string;
  description: string;
  icon?: string;
  unlocked: boolean;
  level: number;
  maxLevel: number;
  cost: number;
  tier: number;
  category: "attack" | "defense" | "speed" | "status" | "utility";
  effects: Effect[];
}
