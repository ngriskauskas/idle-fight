# QA: open items (2026-10-04)

All 12 list items were reached in about 9 minutes of real time. Most results are one controlled pair (one seed), so read "pass" as "one clean pair" unless a count is given. Every run used `qa` setup commands (points, wave, grant-item); none is a fair playthrough.

## Summary

Of the 12 list items: 5 pass, 3 pass with a note, 3 fail, 1 is a lead only. Inside items 8 and 9, 4 of 14 talents and 7 of 8 unique triggers could not be confirmed.

What matters most:

1. **The last two bosses of world 1 still cannot be fought.** Dragon Lord killed every build sent at it (0 wins in 13 attempts, level 10 and 12, with and without Raise Shield) in 25 to 40 seconds with 60 to 75% of its health left. Shadow Emperor killed both level 11 builds in under 15 seconds, 6 of 6, with 88% of its health left.
2. **World 2 is not reachable with world 1 gear.** A level 12 caster in world 1 gear died at the third enemy of world 2 wave 1 and was one-shot by the world 2 Goblin King (284 into 233 health plus shield).
3. **Raise Shield is now a real choice**, and the shield refill fix holds for recasts, but **unequipping and re-equipping a shield item refills the shield** (0/84 to 77/84 in one swap).

## Results

| # | Item | Expected | What happened | Verdict |
|---|---|---|---|---|
| 1 | Raise Shield (5 stacks, 4 + 4%, 1 regen, -1 speed) | Costs something, buys something, on both builds | Phys: lowest health 86% -> 100% (trash), 56% -> 91% (boss stretch), casts 160 -> 146 and 112 -> 91; wave 9 without it died once, with it lowest 49%. Caster: lowest 78% -> 100%, 72% -> 95%, 66% -> 100%; direct damage -5 to -14%, paid in mana not speed | Pass with a note |
| 2 | Shield refill fix | Gaining max shield adds only the difference; recast does not refill | Recast at 5 stacks: shield rose only by regen (0 -> 5 -> 9 -> 14). Equip mid-fight: 8/12 -> 27/31. Shield Specialist: 31/31 -> 56/56 | Pass, plus one bug (swap refills) |
| 3 | Dragon Lord after the cut | Not a two-cast kill; some answer exists | Against 61 defense: Meteor 58 (crit 115), Inferno 107. Raw: Meteor 94 (crit 159), Inferno 150 (crit 225). Three to four casts to kill. 0 wins in 13 | Fail (no answer found) |
| 4 | Enemy crits about 1.5x | Crit / normal near 1.5 | Raw (0 defense): 1.39 to 1.69, equal to each spell's own multiplier. After 54 to 68 defense: 1.75 to 1.94 | Pass with a note |
| 5 | Wave 10 and Shadow Emperor | A level 11 build can fight it | Wave 10 trash is clearable (both builds reached the boss). Emperor: Inferno 190-196, Chain Lightning 106-110, Poison Stab 61-108. Dead in 10 to 15 s, 6 of 6 | Fail |
| 6 | World 2 at level 12 | Can fight on wave 1 | World 1 gear: died at enemy 3, both bosses one- or two-shot it. With the harness's world 2 drops: trash is safe (lowest 100%) but slow (1.8 kills/min) and both bosses kill it | Fail |
| 7 | Spell slot talents | Gates hold, +1 each, slot persists | Gates all held; level 20 went 6 -> 7 -> 8 -> 9; 9 after a death, 6/6 after 4 deaths in a 3h53m run. Level-up not observed (code only) | Pass |
| 8 | 14 tier 3 and 4 talents | Each does what it says | 9 work, 1 backfires (Blood Rush), 4 could not be shown | Mixed, see below |
| 9 | 8 uniques with triggers | Trigger fires | All 8 equip and change the numbers; only Warlord's Horn's trigger could be told apart from the item's stat line | Pass with a note |
| 10 | Critical Toxin | More poison with crit | Poison dealt 2638 -> 3725 (+41%) in 240 s, 58 and 70 crits | Pass |
| 11 | Ice slow, Shatter | Iced enemy deals less per minute; Shatter ends the slow | Storm Titan damage in 150 s: 2683 without ice, 2389 with Frostbite 3 (-11%), 2733 with Frostbite 3 + Shatter | Lead (one pair, small effect) |
| 12 | Rampage 1, 2, 3 | Faster clears per level | Wave 4 boss dead at 3m12s (none), 2m46s (1), 2m29s (2), 2m51s (3) | Lead: level 3 no better than 2 on one seed |

### Item 8, talent by talent

Base for most: level 12 physical build (Strike, Slash, Rend, Raise Shield, Health Regeneration), wave 7, 240 s, 7.5 kills/min, direct damage 9591.

| Talent | Result | Verdict |
|---|---|---|
| Bulwark (changed) | At 3 levels each attack restored 10.08 shield on an 84 shield = 12% of max, as coded. In a real build it changed nothing measurable (levels 1 and 3 gave identical runs) | Pass |
| Siphon (changed) | Caster: direct damage 14140 -> 15203 (1 level) -> 18986 (3 levels), kills 7.5 -> 8.8/min, Lightning Bolt casts 4 -> 12 -> 18 | Pass |
| Shatter (changed) | No damage line appears for it anywhere, so its damage could not be read. Ice test is consistent with it consuming stacks | Could not test |
| Blood Pact | Direct damage +31% (12575), Crushing Weight 822 over 8 hits from 32 kills, kills 8.0/min | Pass |
| Spiked Shield | Riposte 3298 over 50 hits, 23% of damage, kills 8.5/min | Pass |
| Battle Trance | War Cry 98% uptime at 15 stacks, direct damage +62% (15579), kills 9.5/min | Pass with a note |
| Mana Overflow | Phys: Arcane Nova 480 over 8 hits (4% of damage), mana average 89% -> 47%, could not cast 20% of the time. Caster: never fires (mana never fills) | Pass with a note |
| Arcane Overload | Overcharge up 77% of the time; damage 14140 -> 14433, kills 30 -> 28 | Pass with a note (no value seen on a mana-starved caster) |
| Storm Channeler | Wave 9: Lightning Bolt 348 over 8 hits (5% of damage) once health was lost; nothing while the shield held | Pass |
| Venomous Entrance | Poison dealt 552 -> 1649, kills unchanged. Poison taken by the player 129 -> 744 | Pass with a note (it poisons you too) |
| Blood Rush | Hits 146 -> 130 on wave 7; on wave 9 kills 6.3 -> 5.0/min, damage 7384 -> 5432, lowest health 100% -> 80% | Fail |
| Bloodletting | Run identical to base twice: health was never lost | Could not test |
| Stasis Survival | Run identical to base twice: health never got low | Could not test |
| Toxic Blood | With and without Venomous Entrance: lowest health 77% both times, nothing separable | Could not test |

## Details

### 1. Raise Shield: pass with a note
Setup: seed 1, level 12, wave 9 start (`qa-phys`, `qa-cast`), forked with and without the spell in the empty fifth slot, then `qa wave 1 7 1` 240 s, `qa wave 1 7 10` 150 s, `qa wave 1 9 1` 180 s. Only the first stretch is a strictly paired comparison; later stretches start from diverged states.

| | Phys without | Phys with | Caster without | Caster with |
|---|---|---|---|---|
| Wave 7 trash, lowest health | 86% | 100% | 78% | 100% |
| Wave 7 trash, kills/min | 7.5 | 7.5 | 7.8 | 7.5 |
| Wave 7 trash, attack casts | 160 | 146 | 58 | 51 |
| Boss stretch, lowest health | 56% | 91% | 72% | 95% |
| Boss stretch, kills/min | 6.8 | 5.6 | 6.4 | 6.4 |
| Wave 9, lowest health / deaths | 0% / 1 | 49% / 0 | 66% / 0 | 100% / 0 |

Not unkillable (49% on wave 9, and it did not save anyone from Dragon Lord or Shadow Emperor), not a trap (same kills on trash, fewer deaths). The note: on the caster the cost is mana, not speed. Lightning Bolt fell from 11 casts to 4 because the caster sits at 16% mana and Raise Shield takes a share. A caster with spare mana would pay almost nothing. Medium confidence.

### 2. Shield refill: pass, one bug
Setup: bare level 12 with Shield Bearer 2 and Raise Shield only, on the wave 3 boss, shield read from the run file every second. At 5 stacks the shield went 0, 5, 9, 14, 19, 24 across two recasts: regen only. Each new stack added 5 to 7 (the stack's own shield). Equipping a +15 Shield at 8/12 gave 27/31. Shield Specialist at full shield gave 56/56 (the difference; it was full before, so this one does not discriminate).

### 3. Dragon Lord: fail
`qa-dl`: seed 5, level 10 caster, 194 health, 61 defense, 31 shield, Fireball, Ice Spike, Arcane Missile. Three seeds without Raise Shield and three with: six deaths. Five-second trace with Raise Shield: dead between 20 and 25 s, boss at 3059 of 4291 with its 238 shield back up. Level 12 caster: dead by 40 s, boss at 2568. Level 12 physical: dead by 30 s, boss at 3197. The four Rampage runs (item 12) also all ended at wave 9 enemy 10. It is now a three to four cast kill instead of two, but no build got it below 60%.

### 4. Enemy crits: pass with a note
Zero-defense character with 880 health and no attack, 3-second stretches so each hit is read on its own:

| Boss | Spell | Normal | Crit | Ratio |
|---|---|---|---|---|
| Inferno Lord | Fireball | 46 | 64 | 1.39 |
| Storm Titan | Lightning Bolt | 64 | 102 | 1.59 |
| Storm Titan | Chain Lightning | 70 | 105 | 1.50 |
| Dragon Lord | Meteor | 94 | 159 | 1.69 |
| Dragon Lord | Inferno | 150 | 225 | 1.50 |
| Shadow Emperor | Poison Stab | 99 | 148 | 1.49 |

The note: defense is `damage^2 / (damage + defense)` (`src/logic/attackActions.ts`, `mitigateDamage`), so a bigger hit is blocked less. On the armoured builds the same Titan crits were 35 -> 67 (1.91) and 36 -> 64 (1.78). Players with defense still see close to 2x.

### 5. Shadow Emperor: fail
`qa-se` (seed 6, level 11 caster, 246 health, 92 defense, 59 shield plus Raise Shield) and `qa-sep` (physical, 359 health, 79 defense). Both cleared wave 10 trash in under 5 minutes and died on the boss. Traces: both dead between 10 and 15 s, boss at 5513 and 5580 of 6258. One rotation is Inferno 190 + Chain Lightning 106 + Poison Stab 61 = 357 after defense, more than either build's health plus shield. Curse showed on the player 3 to 23% of the time.

### 6. World 2: fail
The harness's 20 starting drops for `--world 2 --wave 1` include world 2 items (Plate Armor L1 with 391 health, Arcane Shield L1 with 305 shield). A player arriving from world 1 would not have them, so two builds were run from seed 7:

| | World 1 gear (`qa-w2b`: 164 health, 62 defense, 69 shield) | World 2 drops (`qa-w2`: 554 health, 260 defense, 338 shield) |
|---|---|---|
| World 2 wave 1 trash, 300 s | Died at enemy 3 (Giant Bat Slash 55, Goblin Slash 50, Giant Rat 35) | 1.8 kills/min, lowest 100%, hits 14 to 42 |
| World 1 wave 10 trash, 300 s | 6.0 kills/min, died at enemy 9 | 2.8 kills/min, lowest 100% |
| World 2 Goblin King (8940 health, 298 attack) | One hit: Slash 284 | Died: Slash 190, Rend 117, bleed 667 |
| World 2 Bone Warden (13969 health, 1164 shield) | Poison Stab 230, Ice Spike 222 | Died: Poison Stab 260, Ice Spike 140, poison 944 |

World 2 wave 1 trash is slower to kill than world 1 wave 10 trash (1.8 against 2.8 kills/min on the same build). Left for 3h53m of game time the world 2 geared build died 4 times and ended on world 1 wave 10.

### 7. Spell slots: pass
Refusals seen: Widened Focus with 0 points spent (tier) and at level 7 (level); Split Mind with 7 spent (tier) and at level 12 (level); Grand Repertoire at level 19 (level) and with 10 spent (tier). The tier check is in the harness (`cli.ts`), not in `unlockTalent` (`src/logic/talentActions.ts` checks level, points and max level only), so the tier gate in the real game rests on the UI. Value of one more spell at wave 7: physical 7.5 -> 9.5 kills/min and direct damage 10236 -> 16371 with Execute; caster 7.8 -> 7.5 kills/min with Arcane Missile, because it is out of mana either way.

### 8. Blood Rush: fail
Its +50% speed multiplies a negative speed. The physical base sits at -3 speed, -8 with five Raise Shield stacks; with Blood Rush `status` reads -12. Anyone wearing a hammer, plate or a Tower Shield gets slower.

### 8. Notes on the passes
- Battle Trance and Warlord's Horn both held War Cry at 15 stacks 96 to 98% of the time, because a shield keeps health from dropping and War Cry is only lost on health loss. Direct damage +62% and +120%.
- Venomous Entrance's `poisonAll` includes the player. It has no description saying so.
- The defensive talents could not show anything on this base because it never lost health on wave 7 (lowest 100%).

### 9. Uniques
All granted at wave 9 and equipped on the level 12 bases, wave 7, 240 s. Each item also carries the same status as a flat stat, and the harness cannot grant a twin without the trigger, so the trigger's share is unknown except where it has its own name.

| Unique | Change against base | Trigger seen |
|---|---|---|
| Warlord's Horn | War Cry 96% at 15 stacks; direct damage 9591 -> 21118; kills 7.5 -> 10.0/min | Yes |
| Stormcoil Ring | Lightning dealt 0 -> 11372, as much as all direct damage; kills 7.5 -> 10.8/min | Not separable from lightning +16 |
| Butcher's Cleaver | Bleed 3906 -> 11741; kills 7.5 -> 11.3/min | Not separable from bleed +14 and crit +18 |
| Plaguebearer's Mask | Poison 552 -> 5842; kills 8.3/min | Not separable from poison +16 |
| Cinder Crown | Fire 850 -> 4839; kills 7.5 -> 9.8/min | Not separable from fire +16 |
| Leyline Band | Mana average 16% -> 83%; direct damage 14140 -> 23829 | Not separable: the trigger is 1% of max mana a hit (about 2.5 mana/s here) beside +24 mana/s from its regen line |
| Thornmail | Bleed 3906 -> 4549 with fewer hits (146 -> 101); kills 6.5/min | Likely (bleed), shield gain not visible |
| Glacial Ward | Replaced the hammer: attack 57 -> 21, kills 4.3/min; ice has no output line | No |

### 11. Ice
5800 health, 0 defense, Quick Strike only (2.5 s, 1 damage), Storm Titan, 150 s, 60 hits each. Frostbite 3 puts 3 ice on per hit and cut the Titan's damage by 11%. The gap is about three boss casts, and one crit is 102, so this is a lead. With Shatter added the damage returned to the no-ice figure, which fits crits consuming the stacks.

### 12. Rampage
Level 12 physical build without Raise Shield from wave 1. Boss kill times, levels 0 / 1 / 2 / 3: wave 4 at 3m12s / 2m46s / 2m29s / 2m51s; wave 5 at 4m37s / 4m06s / 3m32s / 4m14s. Levels 1 and 2 help; level 3 was slower than level 2 on this seed. Needs two more seeds before calling it.

## Bugs

1. **Swapping a shield item refills the shield.** At 0/84 shield mid-fight: `unequip-item weapon1` gives 0/7, `equip-item` the same Tower Shield gives 77/84. Cause: `src/logic/effectActionMap.ts:92-94` grants the gained max as current shield, and an unequip only clamps. The same path gives back a Raise Shield stack's shield (about 7) each time a stack expires and is recast.
2. **Blood Rush slows builds with negative speed** (-8 becomes -12). Percent speed bonuses multiply the sign.
3. **Fractional shield and health.** With Bulwark the run file shows shield 65.08 and health 810.1600000000001; `gainShield` adds a percent without rounding (`src/logic/triggerActions.ts:253-257`), and the fraction carries into health.
4. **Venomous Entrance poisons the player** (poison taken 129 -> 744 in 240 s) and its catalog entry has no description.
5. **Shatter's damage is not logged**: it subtracts health directly (`triggerActions.ts:218-232`), so no report can show what it is worth, and a kill by Shatter may not count as a kill. Not checked.
6. **`unlockTalent` has no tier check**; only the harness and presumably the UI enforce it.
7. Harness: `new --world 2 --wave 1` hands out world 2 drops, which overstates what a player arriving there owns.

## Could not test

- **Shatter damage, Glacial Ward's ice**: need ice stacks and trigger damage in the `run` output.
- **Bloodletting, Stasis Survival, Toxic Blood**: need a base that loses health steadily without dying (lower defense, no Raise Shield, wave 5 or 6). The bases here stayed at 100%.
- **Trigger share of seven uniques**: needs a way to grant the item without its trigger, or a status-per-source line.
- **Slot persisting through a level-up**: 3h53m of game time gained 7179 of 10240 xp. By code it holds (`Math.max` in `levelUpCharacter`). A `qa xp` command would settle it.
- **Dragon Lord and Shadow Emperor answers** beyond Raise Shield and two more levels: Disarm, Exhaustion, Curse and a pure health build were not tried.
- **Rampage and ice** need two more seeds each.
- **Time of death** is not in the timeline; traces were built from 5-second stretches.

## Runs kept

`qa-phys`, `qa-cast` (level 12 bases), `qa-pb`, `qa-cb` (the same with tiers opened), `qa-dl` (level 10, Dragon Lord), `qa-se`, `qa-sep` (level 11, Shadow Emperor), `qa-w2`, `qa-w2b` (world 2), `qa-tank2` (ice and crit target), `qa-bw` (shield swap and Bulwark), `qa-gate20` (slots). All other `qa-` runs were deleted.
