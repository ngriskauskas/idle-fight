import { Log } from "./log";

export interface AnimationOccurrence {
  type: "damage" | "kill";
  log: Log;
}
