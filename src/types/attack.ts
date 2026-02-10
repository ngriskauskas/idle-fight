export type AttackStatusStats = Partial<{
  poison: number;
  bleed: number;
  fire: number;
  ice: number;
  lightning: number;
}>;

export interface Attack {
  damage: number;
  isCrit: boolean;
  isAoe: boolean;
  statusStats: AttackStatusStats;
}
