# Proposal Content QA (2026-10-04)

## Summary

4 passed, 0 failed, 0 could not be tested. Blood Trail and Cold Snap both produced their expected kill-triggered effects. Rimeguard restored shield to its cap after identical incoming hits. Stoneback is eligible from wave 3 with the catalogued preset and appeared in a real wave-3 encounter. Blood Trail's measured pair is the noisiest result because the talent changed progression during the stretch; verdict confidence is moderate. The other trigger checks are high confidence for the observed behavior, with one seed each.

## Results

| Item        | Expected                                                                                                    | Observed                                                                                                                                               | Verdict                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Blood Trail | Bleed on a dying enemy spreads to surviving enemies.                                                        | Same seed/base, 15s: control 1 kill and 9 bleed damage; talent 3 kills and 51 bleed damage. Both made 2 Rend hits.                                     | Pass, moderate confidence; one paired seed and progression diverged after the trigger.              |
| Cold Snap   | Each kill applies 6 ice to every survivor; player speed -5.                                                 | Same seed/base, 20s: 1 kill each; control survivors had 0 ice, talent branch's 3 surviving Goblins had 1 ice each after decay. Speed 0 vs -5.          | Pass, high confidence for trigger; one paired seed.                                                 |
| Stoneback   | Eligible starting wave 3; preset 24 health, 3 attack, 7 defense, Slash.                                     | `qa enemies` and source agree. Real L3 encounter: 75 max HP, 49 HP remaining after 30s; player dealt 26 in 6 Strike hits.                              | Pass, high confidence for eligibility/stats and encounter. Slow kill pace is a note, not a failure. |
| Rimeguard   | Equipped item grants shield/defense and -3 speed; each incoming hit restores 10% max shield, capped at max. | Two identical non-crit Stoneback Slashes per branch. Equipped: 31/31 shield before and after, speed -3. Control: 0/0 shield before and after, speed 0. | Pass, high confidence for this item level and matched hit sequence; one seed.                       |

## Details

### Blood Trail

Source: [tier2Talents.ts](../../src/data/talents/tier2Talents.ts#L348) registers `onDeath -> spreadStatus bleed`; [triggerActions.ts](../../src/logic/triggerActions.ts#L185) copies the dying combatant's remaining stacks to every living ally on its side.

Setup: level 10, world 1 wave 1 enemy 9; Stone Wall 5, Rend and Health Regeneration equipped. The shared base was moved to the wave-1 pack before forking; only the talent branch learned Blood Trail. Seed 503984280. In the 15s pair, both branches made 2 Rend hits and survived. The control killed 1 enemy and dealt 9 bleed damage; Blood Trail killed 3 and dealt 51 bleed damage, reaching the wave's boss position while control remained in enemy 9. This is consistent with the death handoff producing additional bleed and kills. The branch's extra crit (2 vs 1) and faster progress make the damage delta noisy, so confidence is moderate rather than a clean estimate of talent value.

A longer 45s same-base pair also moved in the expected direction: control 3 kills / 130 bleed damage, talent 5 kills / 170 bleed damage; both made 6 Rend hits. This confirms value over a longer stretch but is not an independent seed and progression diverged. No deaths occurred in either branch.

### Cold Snap

Source: [tier2Talents.ts](../../src/data/talents/tier2Talents.ts#L370) specifies flat speed -5 and `onKill -> applyStatusAoe ice 6`.

Setup: level 10, wave 1 enemy 9, Strike, Stone Wall 5 and Health Regeneration 5; same saved base and seed -2023358400, 20s. Each branch killed one enemy without dying. The harness summary does not print enemy ice, so the saved combat states were checked: control had three surviving Goblins with no statuses; Cold Snap had three surviving Goblins, each with 1 ice stack. The six-stack application had decayed by the 20s endpoint. Player speed was 0 without the talent and -5 with it. Direct damage was 30 over 4 hits in control and 18 over 3 hits with Cold Snap; enemy incoming totals were 20 vs 21. These attack counts are a single-seed, timing-sensitive observation, not a stable estimate of the speed cost. The saved states directly confirm the trigger.

### Stoneback

Source: [enemyData.ts](../../src/data/enemyData.ts#L145) sets `minWave: 3`, base health 24, attack 3, defense 7, and Slash. `qa qa-proposal-stone-direct enemies` independently printed `stoneback | wave 3 | 24, 3, 7 | - | slash`.

Real encounter: level 10, world 1 wave 3 enemy 1, Stone Wall 5 and Health Regeneration 5, Strike equipped. The generated enemy was Stoneback L3 with 75 max HP. Over 30s the player dealt 26 damage in 6 hits; Stoneback remained at 49/75 HP. It landed Slash attacks totaling 20 damage before the player's shield, hardest individual hit 2. No kill or death occurred in that interval. Eligibility and stats pass; the encounter is real and survivable, though this build's damage is slow.

### Rimeguard

Source: [uniqueItemData.ts](../../src/data/uniqueItemData.ts#L395) defines the weapon with defense +5, shield +20, speed -3 and `onTakeAttack -> gainShield 10`. [triggerActions.ts](../../src/logic/triggerActions.ts#L258) defines `gainShield` as 10% of max shield, rounded up and capped at max.

Setup: level 10, world 1 wave 3 enemy 1. Granted and equipped Rimeguard as `item_0` on `qa-proposal-rime-seed`, then saved/forked that exact equipped state. Unequipped Strike in the shared pre-fork setup so player attacks could not alter the enemy random stream; after the fork, the control's only change was unequipping Rimeguard. Both branches fought the same Stoneback for 8s.

The L3 item instance reported defense +7, max shield 31, speed -3. Baseline and final equipped branch: shield 31/31 (current/max), speed -3. Baseline and final control: shield 0/0, speed 0. Each branch recorded exactly two Stoneback Slash hits, each the same 5-damage non-crit attack before player mitigation; the equipped branch took 1 per hit after defense, control 2 per hit. With max shield 31, the trigger adds `ceil(31 * 0.10) = 4` per hit. The equipped branch's shield ending at 31 after both hits confirms the refill is active and capped. The comparison also shows the item's +7 defense reducing these identical hits; -3 speed is the measured tradeoff.

## Bugs

None observed in the four checks. The harness summary omits enemy ice stacks, but the saved run state exposes them; this is a reporting limitation, not a gameplay failure.

## Could not test

None. The pre-existing Blood Trail runs had no kill in their stretch and were not used as evidence. The earlier Rimeguard on/off branches were also not used: the item had been granted only on the equipped branch, and their incoming totals differed. The exact-state matched probe above replaces that evidence.

## Runs kept

- Blood Trail: `qa-proposal-blood-testbase`, `qa-proposal-blood-finaloff`, `qa-proposal-blood-finalon`, `qa-proposal-blood-testoff1`, `qa-proposal-blood-teston1`.
- Cold Snap: `qa-proposal-cold-core`, `qa-proposal-cold-off`, `qa-proposal-cold-on`.
- Stoneback: `qa-proposal-stone-direct`.
- Rimeguard: `qa-proposal-rime-seed`, `qa-proposal-rime-idle-base`, `qa-proposal-rime-idle-on`, `qa-proposal-rime-idle-control`.

Pre-existing QA runs were left untouched. Unused setup runs created in this session and the superseded unequal-hit Rimeguard pair were removed.
