import type { Combatant, StatusEffectType } from "../types";

function poisonEffect(target: Combatant, stacks: number): void {
  target.health.current = target.health.current - stacks;
}

function bleedEffect(target: Combatant, stacks: number): void {
  target.health.current = target.health.current - stacks;
  target.defense.current = target.defense.current - stacks;
}

function fireEffect(target: Combatant, stacks: number): void {
  target.health.current = target.health.current - stacks;
}

function iceEffect(target: Combatant, stacks: number): void {
  target.speed.current = target.speed.total - stacks;
}

function lightningEffect(target: Combatant, stacks: number): void {
  target.health.current = target.health.current - stacks;
}

export const statusEffectMap: Record<
  StatusEffectType,
  (target: Combatant, stacks: number) => void
> = {
  poison: poisonEffect,
  bleed: bleedEffect,
  fire: fireEffect,
  ice: iceEffect,
  lightning: lightningEffect,
};
