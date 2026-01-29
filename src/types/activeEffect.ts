import type { Effect } from "./effect";

export interface ActiveEffect {
  id: string;
  type: string;
  name: string;
  effect: Effect;
}
