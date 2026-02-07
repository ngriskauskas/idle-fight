import type { Effect } from "./effect";
import { Trigger } from "./triggers";

export interface AuraEffect {
  id: string;
  name: string;
  icon: string;
  effects: Effect[];
  baseTime: number;
  currentTime: number;
  totalTime: number;
  stacks: number;
  scaling?: number;
  isFragile?: boolean;
  tickTriggers?: Trigger[];
}
