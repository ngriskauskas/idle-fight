# QA: i4 SpeedBoost Cooldown

## Summary

Tested 4 checks: 1 failed, 2 passed with a note, and 1 could not be tested. The checked source has no per-combatant SpeedBoost cooldown, despite the fresh playtest's rate suggesting the loop was bounded. In the matched 60-second fork, the Plate Armor build made 115 Quick Strike hits versus 86 without the armor; these are spell hits, not proc activations. Exact activation cadence and timer deltas are not exposed by the harness.

## Results

| Item                    | Expected                                                                  | Observed                                                                                                                                                                              | Verdict                                                                         |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| SpeedBoost cooldown     | At most 1 activation/combatant/second (10 fast ticks)                     | Activation count unavailable; Plate fork: 115 Quick Strike hits/60s, no-Plate fork: 86/60s. Dispatcher/action has no cooldown gate.                                                   | Fail, high confidence in source; activation count unmeasured                    |
| Trigger timer advance   | Plate on-hit adds 6 ticks; Adrenaline Surge on-crit adds 10               | Source applies +6/+10 to each spell timer, capped at `total - 1`; downstream paired casts 115 vs 86. No timer event trace.                                                            | Pass with note, high confidence in arithmetic; not directly isolated in harness |
| No-trigger Quick Strike | A build without speedBoost triggers casts at its nominal 2.5-second timer | 24 Quick Strike hits/60s; no triggers equipped; 6 kills, 0 deaths.                                                                                                                    | Pass with note, medium confidence; fresh build, not a stat-matched pair         |
| Cooldown expiry         | Cooldown becomes available again after its duration                       | No cooldown state or duration exists in checked source; cannot observe expiry. Plate build continued casting (115 Quick Strike hits in 60s), but that does not prove cooldown expiry. | Could not test                                                                  |

## Details

**SpeedBoost and timer behavior.** Source expectations: Plate Armor's on-hit trigger is `speedBoost 6` ([src/data/itemData.ts](../../src/data/itemData.ts#L123)); Adrenaline Surge triggers `speedBoost 10` on crit ([src/data/talents/tier2Talents.ts](../../src/data/talents/tier2Talents.ts#L117)); Quick Strike's base timer is 25 ticks ([src/data/spells/physSpells.ts](../../src/data/spells/physSpells.ts#L138)). `fastTick` runs every 100ms, or 10 ticks/second ([src/hooks/useGameLoop.ts](../../src/hooks/useGameLoop.ts#L8)). The action adds each trigger's value to every spell's current timer, clamped to at most `total - 1` ([src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L62)). Thus the requested one-second limit is absent, and an activation near readiness can add less than the trigger value because of the clamp. Hits dispatch on-hit and on-crit triggers directly ([src/logic/attackActions.ts](../../src/logic/attackActions.ts#L127)); trigger dispatch has no rate gate ([src/logic/triggerActions.ts](../../src/logic/triggerActions.ts#L279)).

Controlled pair setup: forked `i4-fast` twice with `new --from i4-fast`. Both forks retained Quick Strike, Adrenaline Surge, all other gear, wave 1 boss state, and child seed 105740977; only one had Plate Armor unequipped. Ran each for 60 seconds with `--no-stop`. Plate: 115 Quick Strike hits, 1,467 Quick Strike damage, 36 kills, 0 deaths, reached wave 4. No Plate: 86 hits, 1,114 damage, 29 kills, 0 deaths, reached wave 3. This is one noisy pair: removing Plate also changed defense, health, and speed, and differing combat outcomes changed later RNG. It supports an observable acceleration, not an activation count or exact +6/+10 timer delta. The harness prints cast/hit totals and final state, but no SpeedBoost activations or timer transition log.

No-trigger control setup: `new qa-i4-speedboost-no-procs --seed 804 --level 8 --world 1 --wave 1 --drops 20`, then `qa ... points 0 3`, unlock/equip Quick Strike. No talents or gear equipped. Ran 60 seconds: 24 Quick Strike hits, exactly the nominal 1 cast per 2.5 seconds; 6 kills and 0 deaths. This verifies the ordinary Quick Strike cadence in a no-trigger build, but it is not gear/stat matched to the i4-fast pair.

The fresh `i4-fast` playtest is consistent with acceleration (its combined-trigger stretch reported 387 Quick Strike hits in five minutes), but it also reported that the harness lacks proc telemetry. DESIGN.md permits power spikes; this check does not establish that a cooldown bounds them.

## Bugs

- Requested one-per-second SpeedBoost cap is not present in the checked source. Reproduce by equipping Plate Armor and Adrenaline Surge, then observe `callTriggers` forwarding every hit/crit to `speedBoost` without a time check. Harness telemetry cannot quantify actual activations.
- No separate runtime or harness error reproduced.

## Could not test

- Exact activation ceiling, exact per-activation timer delta, and cooldown expiration: the harness has no activation/timer-transition telemetry, and the checked source has no cooldown state to expire. A per-combatant activation log or exposed cooldown/timer snapshots would make these directly testable.
- A fully matched no-proc build against the same i4-fast character: harness actions have no talent-respec operation. The fresh no-trigger run provides a nominal-cadence control instead.

## Runs kept

- `qa-i4-speedboost-plate` and `qa-i4-speedboost-no-plate`: identical-seed forks differing only in Plate Armor equipment.
- `qa-i4-speedboost-no-procs`: fresh Quick Strike baseline without trigger-bearing gear or talents.
