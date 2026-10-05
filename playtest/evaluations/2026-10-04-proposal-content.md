# Proposal Content Evaluation: Final k3 Implementation

## Verdict

Keep the final three-piece implementation: Blood Trail, Cold Snap, and Stoneback. They fit the existing mechanics and add distinct Bleed, Ice, and enemy-counterplay choices; Stoneback's current description now names both Poison Stab and Rend, fixing the missing named interaction from the earlier draft. This is a content/behavior pass, not balance clearance: the probes show Blood Trail can amplify bleed, Cold Snap's utility is still unproven, and Stoneback may be a long time tax for weak direct-hit builds. Keep Rimeguard deferred: its QA pass proves its shield refill works, while the matched-hit result reinforces the prior concern that its sustain may dominate attrition for too little cost.

## Evidence base

Read `DESIGN.md`, `CLAUDE.md`, the proposal, current source, and [the proposal QA report](../qa/2026-10-04-proposal-content.md). The four checks were Blood Trail (15s and 45s paired stretches, same seed), Cold Snap (20s, one seed), Stoneback (one 30s wave-3 encounter), and Rimeguard (one matched 8s item-on/off sequence). None is a full build/progression run; only Stoneback tests a real encounter, and that setup was a level-10 Strike build with Stone Wall and Health Regeneration. There were no deaths. The QA establishes observed behavior, not survival balance, independent-seed repeatability, natural item acquisition, or a fair comparison among builds. Current source registers Blood Trail and Cold Snap, Stoneback at wave 3, and no Rimeguard in `UNIQUE_ITEMS`.

## Difficulty

- **Blood Trail:** no deaths in either short paired stretch. At 15s, control recorded 1 kill / 9 bleed damage; talent recorded 3 / 51. At 45s, control recorded 3 / 130 and talent 5 / 170. These were not independent runs and progression diverged; neither measures deaths per hour, a new furthest wave, or boss difficulty.
- **Cold Snap:** one kill in each 20s branch, no deaths. The talent branch's three surviving Goblins had 1 ice stack each at the endpoint; player speed was 5 lower. Timing-sensitive hit/damage differences do not establish its effect on run difficulty.
- **Stoneback:** the L3 enemy had 75 max HP and 49 remaining after 30s; the player dealt 26 in six Strike hits. Stoneback's Slash attacks totaled 20 before the player's shield, with a hardest hit of 2. No kill or death occurred, so this indicates slow progress in this setup, not a wall or danger level for other builds.
- **Rimeguard, deferred:** two matched Stoneback hits in 8s; no survival or progression test. Both branches took the same two 5-damage pre-mitigation hits. Equipped Rimeguard stayed at 31/31 shield while control stayed at 0/0; the equipped character took 1 rather than 2 damage per hit and had speed -3.

## Problems, ranked

1. **Blood Trail may become an automatic point in Bleed builds.** At 15s its branch had 51 vs 9 bleed damage and reached three kills vs one; at 45s the gap narrowed to 170 vs 130 and five vs three kills. Rend hits matched within each pair, but crits and progression diverged, and both comparisons share one seed. The trigger is confirmed; the size and source of the payoff are not isolated. A tier-2 point that only works with Bleed is a real off-archetype cost, but may not be a real choice inside Bleed. This risks the design's non-linear choices. **Confidence: medium** on substantial payoff, low on overperformance. If repeated full runs make it compulsory or snowball too hard, tune Blood Trail's payoff, not the spread rule.
2. **Cold Snap's permanent speed cost may exceed its demonstrated value.** It applies six flat Ice stacks to survivors on a kill, but the single-kill QA branch ended 20s later with one stack on each of three survivors. The same check confirms speed -5, not a reliable combat penalty estimate. It has no kill trigger to seed Ice in a lone boss fight, while Ice stacks do not scale with gear. This risks a weak or situational choice, contrary to the checklist's distinct-play and meaningful-tradeoff goals. **Confidence: medium** that boss/low-kill utility is limited; low on overall balance. If full Ice builds show the cost is not repaid, tune the talent's numbers/pacing.
3. **Stoneback could impose too much time on weak direct-hit builds without posing danger.** In the only real encounter, a level-10 Strike setup removed 26 of 75 HP in 30s and took only 2 damage from its hardest attack. That could be the intended prompt to use status, heavy hits, or defense reduction, or merely a slow fight with little danger; no alternate build was tested. It supports distinct enemy counterplay, but does not establish that the choice is readable or that another build clears it at a fair pace. **Confidence: low-medium.** Compare direct-hit, Poison Stab/Rend, and other status builds before changing Stoneback's stats.
4. **Rimeguard remains an unresolved sustain risk and is correctly deferred.** The removed item granted L3 +7 defense, +31 max shield, and speed -3; its 10% max-shield trigger restored 4 shield per hit, capped at maximum. In the matched two-hit check it stayed full while halving damage taken from 2 to 1 per hit. That proves the effect, not that it is balanced across sustained attacks, boss bursts, item alternatives, or natural progression. It is not in the current `UNIQUE_ITEMS`. This is a plausible violation of hard-earned danger and real tradeoffs, but no longer blocks keeping the three active pieces. **Confidence: high** on the probe result, low on whole-game dominance. Keep it out until survival comparisons show its sustain cost bites.

## Four QA results

| Piece       | QA result                                                                                                                                                                                                                                           | What it establishes / does not establish                                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blood Trail | **Pass, moderate confidence.** Same-seed 15s pair: control 1 kill / 9 bleed damage; talent 3 / 51, with two Rend hits each. The 45s pair: control 3 / 130; talent 5 / 170, with six Rend hits each.                                                 | Remaining bleed spreads on death and is consistent with added kills/damage. Branch crits/progression diverged; same seed and no deaths, so this is not an isolated balance estimate.      |
| Cold Snap   | **Pass, high confidence for trigger.** Same-base 20s pair had one kill each. Control's three surviving Goblins had no Ice; talent branch's three had 1 stack each at the endpoint. Speed was 0 vs -5.                                               | Confirms kill applies Ice AoE and the speed cost. One kill/seed; endpoint stacks and attack timings do not show sustained control or overall value.                                       |
| Stoneback   | **Pass, high confidence for eligibility/stats and encounter.** QA/source agree: wave 3, base 24 health / 3 attack / 7 defense, Slash. A real L3 Stoneback had 75 HP; after 30s it had 49, with 26 damage dealt in six Strike hits.                  | Confirms eligibility and a real encounter. No kill/death; this is one defensive Strike setup, not a pacing comparison.                                                                    |
| Rimeguard   | **Pass, high confidence for this item level and matched hits.** L3 item: +7 defense, 31 max shield, speed -3. Two identical 5-damage Stoneback hits per branch; equipped shield remained 31/31 and took 1 per hit, control remained 0/0 and took 2. | Confirms defense and capped 10%-of-max shield refill (4 per hit). QA does not prove balance; item was removed from the active registry after the sustain concern. Deferred, not retained. |

## Six-question checklist

| Piece       | Named combination?                                                                                         | Existing mechanics?                                                                     | Gain costs something?                                                                                                                     | Distinct play?                                                                                                                                  | Real choice?                                                                                                                                           | Archetype / bridge?                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Blood Trail | Yes: Rend and Deep Wounds in its description; also needs a Bleed source.                                   | Yes: `onDeath` + `spreadStatus`; copies remaining Bleed to living enemies on that side. | One tier-2 point, with no value without Bleed.                                                                                            | Yes: kill handoffs carry Bleed through a wave and potentially into a boss.                                                                      | Outside Bleed, yes; within a Bleed build it risks becoming an automatic pick. QA is too confounded to settle that.                                     | Bleed.                                                                                      |
| Cold Snap   | Yes: Frostbite and Shatter in its description.                                                             | Yes: `onKill` + AoE Ice; existing Ice slows attacks/casts.                              | Permanent flat speed -5, even when no kill occurs.                                                                                        | Potentially: kills chill survivors and can prepare Shatter; QA confirms the trigger but not a felt play difference.                             | Narrow to Ice/Shatter builds; boss-only and low-kill value may be poor. Whether the speed cost is fair remains open.                                   | Ice.                                                                                        |
| Stoneback   | Yes: its updated description says, “Stone hide turns aside weak blows; Poison Stab and Rend wear it down.” | Yes: defense, Slash, and existing status damage. Status damage bypasses defense.        | Enemy has high defense (7) but low base health/attack (24/3); player trades hit volume/time for status, heavy hits, or defense reduction. | Yes in intent: changes which attacks are efficient. Only Strike was tested, so the counterplay has not been demonstrated in a build comparison. | Potentially: status, heavy hit, defense reduction, or endure a slow clear. Must check it is a decision rather than a mandatory slot or harmless delay. | Enemy pressure on Bleed/Poison/status and heavy-hit answers; not a player archetype itself. |

## What is working

- All three retained pieces reuse existing trigger, status, and defense systems; none adds a new mechanic.
- Blood Trail gives Bleed a kill-to-kill and wave-to-boss route using an existing spread action.
- Cold Snap creates a group-control/Shatter setup and accepts an explicit, always-on speed penalty rather than hiding its cost.
- Stoneback is eligible early and names the player answers directly. The description now meets the named-synergy checklist; the old “no named interaction” concern is resolved.
- QA found no trigger/eligibility failures. Rimeguard's exclusion keeps a plausible sustain-dominant piece from being mistaken for balance-cleared content.

## Against DESIGN.md

- **Pace:** Stoneback can slow a Strike clear; only one 30s window exists. No evidence that the delay is an unavoidable wall. Slow pacing itself is not a fault.
- **Where power comes from:** These pieces use player talent choices/status and enemy stats; no new player stat scales automatically with wave. QA is too short to assess death/re-clear pacing.
- **Fun over balance:** Blood Trail's wave handoff is a promising payoff; keep the possibility of a strong, fun Bleed build in view while testing.
- **Builds:** Blood Trail and Cold Snap support distinct Bleed and Ice plans; Stoneback asks for varied answers. The QA does not show those builds survive or play differently over a run.
- **Synergy:** All active pieces now name an existing interaction, and all use existing mechanics. Stoneback's Poison Stab/Rend names are confirmed in current source.
- **Progression:** They add tier-2 build choices / an early enemy, not new unlock structure. Whether choices dry up later is outside these probes.
- **Archetypes:** The retained content directly touches Bleed, Ice, Poison and physical/status counterplay. It neither tests nor fills the other archetypes' gaps.
- **Checklist:** Named combinations and existing mechanics pass. Costs exist on paper; distinct feel and real choice are strongest for Blood Trail/Stoneback in concept, weakest/least evidenced for Cold Snap's payoff. Rimeguard is deferred rather than counted as a passing active piece.

## Archetypes

- **Bleed:** partial; Blood Trail works and can amplify Rend-applied Bleed, but long-run share, boss carryover, and point competition are untested.
- **Poison:** untested as a build; Poison Stab is named as an answer to Stoneback, but QA used Strike only.
- **Fire:** untested in this QA.
- **Ice:** partial; Cold Snap's AoE trigger works, but sustained slow/Shatter impact and boss utility are untested.
- **Lightning:** untested in this QA.
- **War Cry:** untested in this QA.
- **Shield:** defensive setup appeared in Stoneback QA, but no Shield build balance tested; Rimeguard remains deferred.
- **Mana:** untested in this QA.
- **Control:** partial by intended counterplay (Stoneback's defense can be bypassed by status); no control build tested.

## Enemies

Stoneback is the only new enemy evidence: high defense gives status/heavy-hit/defense-reduction approaches a reason to exist, while its low attack in the tested encounter made the result a time check rather than a threat. Poison Stab and Rend are now explicitly named, but neither answer was exercised in QA. No new boss or roster-wide conclusion follows from these probes.

## Risks in the mechanics

- Blood Trail copies remaining Bleed on each death to all surviving enemies. Successive kills can hand off growing accumulated stacks, so multi-kill waves may snowball; QA shows a lead but not an independent-seed estimate. This is a numbers/pacing risk in a build piece, not a reason to change the spread rule absent stronger evidence.
- Cold Snap adds flat Ice, which does not grow with gear; it depends on repeated kills to renew control and provides no kill-triggered setup in a lone boss fight.
- Rimeguard's historical trigger is proportional to max shield and fires per incoming attack. Faster attackers therefore offered more frequent refill opportunities; no sustained/boss test quantified the risk. It is absent from the current active unique list.

## Open questions

- In independent full Bleed runs, how much damage does Blood Trail contribute on waves and bosses, and does it crowd out other tier-2 choices?
- Does Cold Snap's Ice delay enough enemy attacks/casts or improve Shatter enough to repay speed -5, especially at low kill cadence and against bosses?
- Do Poison Stab, Rend, heavy hits, and defense reduction make Stoneback materially faster than Strike, while keeping it threatening enough not to be a harmless delay?
- For any future Rimeguard reconsideration, compare deaths and health/shield uptime against sustained multi-hit enemies and boss bursts, at realistic gear levels and against alternative weapon-slot choices. Its QA pass alone is not evidence to restore it.
