export interface Attack {
  damage: number;
  statusStats: Partial<{
    poison: number;
    bleed: number;
    fire: number;
    ice: number;
    lightning: number;
  }>;
}
