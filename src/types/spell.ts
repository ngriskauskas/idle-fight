export interface Spell {
  id: string;
  name: string;
  description: string;
  damage: number;
  baseAttackCost: number;
  attackCost: number;
  currentAttackCost: number;
  spellType: "physical" | "magic" | "aura";
  unlocked: boolean;
  unlockCost: number;
  statusStats: Partial<{
    poison: number;
    bleed: number;
    fire: number;
    ice: number;
    lightning: number;
  }>;
  icon: string;
}
