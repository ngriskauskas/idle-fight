import type { Combatant, StatusEffectType } from "../types";

// Status damage ignores defense but is soaked by shield first.
function damageEffect(target: Combatant, stacks: number): void {
  const shieldDamage = Math.min(target.shield.current, stacks);
  target.shield.current -= shieldDamage;
  target.health.current = Math.max(0, target.health.current - (stacks - shieldDamage));
}

// Speed lost per ice stack. Ice never grows with gear or wave, so each stack has to count:
// Ice Spike's 7 stacks add about 2 seconds to every cast until they wear off.
const ICE_SLOW_PER_STACK = 3;

function iceEffect(target: Combatant, stacks: number): void {
  target.speed.current = target.speed.total - stacks * ICE_SLOW_PER_STACK;
}

export const statusEffectMap: Record<
  StatusEffectType,
  (target: Combatant, stacks: number) => void
> = {
  poison: damageEffect,
  bleed: damageEffect,
  fire: damageEffect,
  ice: iceEffect,
  lightning: damageEffect,
};
