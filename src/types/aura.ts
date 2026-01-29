import type { Effect } from "./effect";

export interface AuraEffect {
  id: string;
  name: string;
  icon: string;
  effects: Effect[];
  baseTime: number;
  currentTime: number;
  totalTime: number;
  stacks: number;
}
