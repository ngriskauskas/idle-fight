# i5 Enemy Design Proposals

## Focus

The i5 evaluation and its status/caster reports identify a focused enemy-design gap: ordinary enemies blur after the build accelerates, repeated bosses often resolve as health/damage checks, and neither tested build had to change spells for an enemy. Frost Queen's Frostbolt ended the status run for 66 damage without a satisfying response. Expensive-caster pressure is a desired test, but the i5 caster sample is only three minutes and confounds its talent changes; it is a design probe, not a conclusion about current balance.

The proposals below use the current enemy preset, spell, aura-effect, status, item, and trigger fields only. No death/progression rules change. The existing Frost Queen spell list starts with the lower attack-cost Ice Spike before Frostbolt, offering a named first impact; this is a narrow response window, not a true charge-up telegraph. A new pre-hit tell would need timing/trigger support not present in the current content model, so none is proposed.

## Top picks

1. **Gloam Siphoner, ordinary enemy:** a timed mana-regeneration debuff makes Arcane Boost, Leyline Band, Siphon, cheaper casts, or a quick kill relevant to a caster without punishing physical builds.
2. **Rimeguard, unique weapon:** pairs with Frost Queen's Ice Spike-then-Frostbolt opening and Shield Bearer/Fortitude to turn the first hit into a small shield buffer for the burst.
3. **Stoneback, ordinary enemy:** high defense and low offense make sustained status application a different answer from stacking direct-hit damage.

## Proposals

### Caster pressure and defense checks

#### Gloam Siphoner — ordinary enemy, wave 4

- **What it does:** `baseHealth: 28`, `baseAttack: 4`, `baseDefense: 1`, `baseMana: 60`, `baseManaCost: 5`, `baseManaRegen: 5`; spells `[ARCANE_MISSILE, WITHER_HEX]`. `WITHER_HEX` is a new target aura: `spellType: "aura"`, `manaCost: 20`, `attackCost: 60`, non-self-targeted and single-target; its aura has one `manaRegen` effect of `-2` flat for 8 seconds. The enemy aura scaling already scales hostile flat aura effects with wave. Compare the existing wave-4 Arcane Specter (28 health, 5 attack, 1 defense) and the existing Curse aura (40 mana cost, 60 attack cost, 30-second duration): this is a shorter, narrower caster check, not a tougher stat block.
- **Combines with:** Existing Arcane Boost counters the lost regeneration and reduces the player's mana cost; Mana Efficiency adds regeneration; Leyline Band returns mana on hit; Siphon returns mana on kill. A caster can also switch to a cheaper spell or physical damage while the hex is active.
- **What it costs:** The Siphoner spends a spell slot and 20 mana per hex, and its low attack/defense make it vulnerable while casting. The player pays damage or spell-slot tempo to counter it; taking the hit without counterplay can strand expensive casts. The penalty is time-limited, not a permanent resource drain.
- **How it plays:** A high-cost caster can front-load damage, sustain through regeneration/on-hit/kill returns, or switch to cheap attacks during the hex. A physical/status build can largely ignore the pressure and kill it normally.
- **Checklist:** Combines with Arcane Boost/Leyline Band/Siphon: **yes**. Existing mechanics only: **yes**, target aura and `manaRegen` effect. Tradeoff: **yes**, enemy loses attack stats and spends mana; player gives up tempo or a slot. Different play: **yes**, cast choice and target priority change. Real choice: **yes**, chiefly matters to mana spenders. Archetype: **mana/control**.
- **What it needs:** One new aura spell data entry and one enemy preset; no new action, field, trigger, or mechanic. Use the existing aura target and effect pipeline.
- **Risks:** Enemy aura flat effects scale with wave. Watch for later-wave regeneration penalties becoming a near-permanent caster lockout, Arcane Boost becoming mandatory, or the aura failing to matter because it does not overlap the player's spending window. The i5 caster run cannot validate this balance.

#### Stoneback — ordinary enemy, wave 3

- **What it does:** `baseHealth: 24`, `baseAttack: 3`, `baseDefense: 7`, `spells: [SLASH]`. No shield or regeneration. Compare the wave-3 Orc (32 health, 6 attack, 2 defense): the Stoneback is deliberately easier to kill in time and damage dealt, but direct hits lose value to its armor.
- **Combines with:** Poison Stab and Rend apply sustained status damage; Fire/Poison/bleed builds can keep damage moving while their direct hits are mitigated. It also gives status talents such as Epidemic, Deep Wounds, and Wildfire an ordinary-wave target that survives long enough for their payoff.
- **What it costs:** Its low attack makes the check less immediately lethal, but its defense taxes direct-hit builds through a slower kill. It has no extra health/regen safety net, so statuses are an advantage rather than a required unlock.
- **How it plays:** Players favor a status-applying attack or sustained damage over a string of high direct hits. Fast direct-hit builds still win, but lose some clear speed.
- **Checklist:** Combines with Poison Stab/Rend and status talents: **yes**. Existing mechanics only: **yes**, defense and status damage. Tradeoff: **yes**, slower kill against lower incoming damage. Different play: **yes**, favors status setup over raw hits. Real choice: **yes**, it only taxes low-status direct-hit builds. Archetype: **status**, with physical builds as the matchup it checks.
- **What it needs:** One enemy preset using existing stats and Slash; no new mechanics or player piece.
- **Risks:** High defense also taxes magic direct damage, so confirm status damage remains a practical answer and that this does not simply slow every build. If status builds erase it as quickly as other enemies, the defense check is too weak; if low-status builds stall, reduce defense before increasing any health.

### Frost Queen response

#### Rimeguard — unique weapon

- **What it does:** A shield weapon with `defense: +5`, `shield: +20`, `speed: -3`, and an `onTakeAttack` trigger using `gainShield` at `value: 10` (10% of maximum shield, rounded by the existing action). Compare Tower Shield (defense +6, shield +10, speed -5) and Glacial Ward (defense +6, shield +12, plus an on-hit ice application). Rimeguard trades some defense and speed for a larger shield pool and a refill after an enemy attack.
- **Combines with:** Frost Queen already has Ice Spike (attack cost 75) and Frostbolt (100), so Ice Spike is her first cast from a fresh combat start. Rimeguard's existing `onTakeAttack`/`gainShield` behavior can refill shield after that first impact; the shield can absorb part of the later Frostbolt. Shield Bearer, Fortitude, and shield-regeneration gear increase the pool that the trigger refills. Glacial Ward remains a competing counter that slows the Queen rather than restoring shield.
- **What it costs:** The weapon slot and `-3 speed` slow the player's attacks; it also gives less defense than Tower Shield/Glacial Ward. The refill only follows an attack and is capped by maximum shield, so it cannot erase the first hit or guarantee survival of Frostbolt.
- **How it plays:** Before a Frost Queen attempt, a player can trade clear speed for a shield pool that recovers after the lesser opening hit. The player must still bring enough health/defense or healing to survive that first hit and the burst.
- **Checklist:** Combines with Frost Queen's existing opening and Shield Bearer/Fortitude: **yes**. Existing mechanics only: **yes**, item effects and `onTakeAttack`/`gainShield`. Tradeoff: **yes**, weapon slot and speed for defense/shield recovery. Different play: **yes**, prep a shield build and survive through multiple hits. Real choice: **yes**, competes directly with other shield weapons and is weak outside hit-heavy fights. Archetype: **shield**, with a focused boss-defense use.
- **What it needs:** One unique-item entry; no new action or mechanic. It provides a partial, visible response after Ice Spike, not a pre-hit warning.
- **Risks:** The item may become a universal shield pick or, conversely, its refill may be too small to matter against Frostbolt. Test at realistic maximum-shield values, with and without Shield Bearer. Do not treat it as a substitute for a readable telegraph: the auto-combat player cannot react between casts, and one opening hit may still be lethal.

## Sets

- **Mana pressure:** Gloam Siphoner alone is the smallest useful test. Add no new player piece initially: Arcane Boost, Mana Efficiency, Leyline Band, and Siphon already provide distinct answers. Only add a counter item/talent if playtests show those options cannot answer the timed debuff.
- **Frost Queen:** Rimeguard alone is the smallest useful test, compared against existing Glacial Ward and ordinary shield/defense setups. Keep the current Ice Spike/Frostbolt order; do not add a telegraph mechanic under this scope.
- **Ordinary-wave variety:** Stoneback alone tests whether one low-offense, high-defense foe makes a status build answer visible without making status mandatory.

## Not proposed

- A mana-drain action or a mana-stealing enemy: `manaLeech` restores the attacker's mana from damage and does not drain the target; direct drain would require unsupported action behavior.
- A charged Frostbolt/interrupt/conditional follow-up: there is no pre-hit charge or reaction field in the current model, and adding one would be a new mechanic.
- More generic enemy health/damage or boss stat tuning: it would repeat the exact health-check pattern the reports identify.
- An additional generic shield-refill talent: Bulwark already provides `onTakeAttack`/`gainShield`; the minimal proposed counter is a weapon-slot choice with an explicit speed cost.

## Conflicts

- The evaluation asks for a readable Frost Queen response, but existing content has no pre-hit telegraph surface. Rimeguard gives an existing-mechanic response after her first, lower-cost Ice Spike; it does not warn the player before that hit. Meeting a stronger readability bar requires a separate request to add a tell/timing mechanic.
- The Gloam Siphoner adds hostile mana pressure even though current i5 caster evidence is weak. It should be treated as a testable enemy-design proposal, not a claim that current mana talents are balanced or that casters need a broad nerf.
- No proposal changes death reset, wave progression, player scaling, or unlock rules.
