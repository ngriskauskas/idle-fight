# QA: i5 SpeedBoost Cooldown

## Summary

Tested one item: **1 pass with a note, 0 fails, 0 item-level could-not-test verdicts**. The code now enforces a shared 10-fast-tick SpeedBoost gate and decrements it per fast tick. In a matched 120-second pair, enabling Plate Armor's on-hit trigger increased Quick Strike from 49 to 56 casts and from 109 to 124 damage, with no deaths in either run. Exact activation cadence and a behavior-observed cooldown-expiry boundary remain unmeasured because the harness has no activation counter or timer trace.

Confidence: **moderate** for the measured cast/damage difference (one clean pair); **high, code-confirmed** for the 10-tick gate and decrement behavior.

## Results

| Item                                                                     | Expected                                                                                                                                                                   | Observed                                                                                                                                                                                                                                            | Verdict                                                                |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| SpeedBoost cooldown with Plate Armor, Quick Strike, and Adrenaline Surge | An accepted speedBoost sets a 10-fast-tick lockout; Plate adds up to 6 ticks to each spell's readiness timer. The cooldown should expire through per-fast-tick decrements. | Same-seed 120s pair: Quick Strike 56 casts / 124 damage with Plate trigger vs 49 / 109 without it; all spells 322 vs 283 direct damage. Both stayed alive at world 1 wave 3 enemy 2. Final cooldown snapshots were 0 vs 6, not an activation trace. | Pass with a note; moderate behavior confidence, high source confidence |

## Details

**Code-confirmed behavior.** `SPEED_BOOST_COOLDOWN_TICKS` is 10; the action returns when the combatant cooldown is positive, otherwise sets it to 10 and advances each equipped spell's `attackCost.current` by the trigger value, capped at `attackCost.total - 1` ([src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L24), [src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L67), [src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L69), [src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L74)). `tickSpells()` decrements the value by one, clamped at zero, once per fast tick ([src/logic/tickActions.ts](../../src/logic/tickActions.ts#L9)). The game loop's fast interval is 100 ms, so 10 fast ticks correspond to about one second ([src/hooks/useGameLoop.ts](../../src/hooks/useGameLoop.ts#L18)).

Plate Armor supplies `onHit -> speedBoost 6`; Quick Strike has a base attack cost of 25 ticks; Adrenaline Surge supplies `onCrit -> speedBoost 10` ([src/data/itemData.ts](../../src/data/itemData.ts#L123), [src/data/spells/physSpells.ts](../../src/data/spells/physSpells.ts#L138), [src/data/talents/tier2Talents.ts](../../src/data/talents/tier2Talents.ts#L117)). Attack handling calls `onHit` before `onCrit` ([src/logic/attackActions.ts](../../src/logic/attackActions.ts#L131), [src/logic/attackActions.ts](../../src/logic/attackActions.ts#L133)). Consequently, with Plate Armor equipped, its `onHit` trigger wins the shared gate on a critical hit: if the gate is open it sets the cooldown before Adrenaline is called; if already closed, Adrenaline also sees it closed. This interaction is source-confirmed, not directly counted by harness telemetry.

**Behavior-tested pair.** Both runs started as forks of the same level 10, world 1 wave 3 base (seed 4816; zero starting drops), with common Plate Armor item_0 equipped, Quick Strike equipped, the same five tier-1 talents spent to open tier 2, and Adrenaline Surge 1/1. The control retained the same armor and stats but had only `plate-armor-speed-boost-on-hit` removed from the main combatant's active `onHit` trigger list in its QA run state; the setup mutation was recorded in the run action history. Adrenaline's `onCrit` trigger remained in both.

Both runs advanced 120 seconds (`--no-stop`, 1,200 harness ticks). With Plate's trigger: Quick Strike 56 casts / 124 damage; Strike 28 / 198; 17 crits; total direct damage 322; one kill, zero deaths; health average 100%, lowest 98%. Without Plate's trigger: Quick Strike 49 / 109; Strike 25 / 174; 15 crits; total direct damage 283; one kill, zero deaths; health average 100%, lowest 99%. Both ended at world 1 wave 3 enemy 2. Quick Strike increased by 7 casts (14.3%) and 15 damage (13.8%). This demonstrates an observable combat-rate increase, not the number or timing of individual activations; the different cast and crit totals also make the result a single-seed comparison.

The persisted endpoint snapshots had `speedBoostCooldown` 0 with Plate and 6 without it. Adrenaline remains active in the control, so its cooldown can be nonzero there. These values only describe the final sampled state and do not establish activation cadence or independently prove the exact expiry boundary.

A second-seed repeat was attempted, but the shared terminal returned output from another `i5-*` run and the expected `qa-speedboost-*-8805.json` files were not created. No second-pair result is claimed.

## Bugs

None observed in the controlled stretch. Harness output does not expose SpeedBoost activation events or timer transitions, so it cannot verify the exact runtime cadence or boundary directly.

## Could not test

- Exact activation count/cadence and a behavior-observed 10th-tick expiry boundary. The harness needs an activation counter or cooldown transition trace; the saved cooldown endpoint alone is insufficient.
- A second-seed behavior pair. The attempted forks were not created while the shared terminal was returning unrelated run output.

## Runs kept

- `qa-speedboost-base`: level-10 wave-3 setup with Plate Armor, Quick Strike, and Adrenaline Surge.
- `qa-speedboost-on`: treatment run, seed 4816, 120 seconds.
- `qa-speedboost-off`: matched control, seed 4816, 120 seconds; only the active Plate Armor trigger was removed.
