export interface Attack {
  damage: number;
  isCrit: boolean;
  isAoe: boolean;
  statusStats: Partial<{
    poison: number;
    bleed: number;
    fire: number;
    ice: number;
    lightning: number;
  }>;
}
