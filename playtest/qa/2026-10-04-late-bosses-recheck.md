# QA: late bosses recheck (2026-10-04)

Re-test of the three failures in `2026-10-04-open-items.md` plus Blood Rush, after: world scale jump 2.5 (was 4), boss health multiplier 1.5 (was 2), Dragon Lord mana cost 22 (was 30), Shadow Emperor mana cost 22 (was 44) and attack 16 (was 22), percent bonuses no longer deepening a negative stat.

Every run is a fork of a kept `qa-` base with a new `--seed`, moved with `qa wave` so the enemy is created with the new numbers. None is a fair playthrough. Boss fights were stepped 5 seconds at a time, so times are to the nearest 5 s and "boss health left" is the reading up to 5 s before the death.

## Summary

4 items: 2 pass (Dragon Lord, Blood Rush), 1 pass with a note (Shadow Emperor, slightly too hard), 1 split (world 2 wave 1: trash passes, Goblin King fails).

1. **Dragon Lord is about right.** 22 wins in 36 attempts. The level 10 caster wins 0 of 6 without Raise Shield and 3 of 6 with it; level 12 builds win 7 of 12 without it and 12 of 12 with it. Before: 0 of 13.
2. **Shadow Emperor is winnable but still a little too hard.** The level 11 caster won 2 of 7 (finishing at 2% and 5% health), the level 11 physical build 0 of 7 with the boss at 40 to 68%. Before: 0 of 6 with the boss at 88%.
3. **World 2's Goblin King is far too hard.** 0 wins in 19; every build died in 6 to 10 seconds with the boss at 94 to 100% health. World 2 wave 1 trash, on the other hand, is now a breather for a build in wave 10 gear.

## Results

| # | Item | Expected | What happened | Verdict |
|---|---|---|---|---|
| 1 | Dragon Lord (3218 health, 119 attack, 41 defense, 238 shield; was 4291 health) | A level 10 to 11 build wins sometimes | Level 10 caster: 0/6 without Raise Shield, 3/6 with. Level 12 caster: 5/6 and 6/6. Level 12 physical: 2/6 and 6/6. Wins take 45 to 70 s | Pass. About right |
| 2 | Shadow Emperor (4693 health, 119 attack, 59 defense; was 6258 health) | A level 11 to 12 build wins sometimes | Level 11 caster 2/7, level 11 physical 0/7, level 12 builds in wave 9 or mixed gear 0/18 | Pass with a note. Too hard by roughly 15 to 25% |
| 3a | World 2 wave 1 trash | Easier than world 1 wave 10 | Wave 10 geared builds: all 9 trash dead without a death, hardest trash hit 37 to 40 (wave 10 trash: 51 to 53). The weak 164 health build dies on both | Pass. A breather for wave 10 gear |
| 3b | World 2 Goblin King (4190 health, 186 attack, 46 defense) | A little harder than Shadow Emperor | 0/19. Dead in 6 to 10 s, boss at 94 to 100%. Shadow Emperor takes 15 to 40 s to kill the same builds | Fail. Too hard by roughly 3 to 4 times |
| 4 | Blood Rush on negative speed | Speed no longer gets worse | Speed -3 stays -3, and -8 at five Raise Shield stacks stays -8 (was -12). Hits 41/54/37 in both copies | Pass |

## Details

### 1. Dragon Lord: pass, about right

Six seeds (11 to 16) per build, `qa wave 1 9 10`, 5 s steps. `qa-dlr`, `qa-castr`, `qa-physr` are `qa-dl`, `qa-cast`, `qa-phys` with Raise Shield in the fifth slot.

| Build | Wins | Time to kill | Time to die | Boss health left on a loss | Player lowest health on a win |
|---|---|---|---|---|---|
| Level 10 caster (`qa-dl`: 194 health, 61 defense, 31 shield) | 0/6 | - | 20 to 40 s | 16%, 54%, 54%, 55%, 59%, 60% | - |
| Same with Raise Shield (`qa-dlr`) | 3/6 | 45 to 55 s | 25 to 50 s | 0.6% (18 health), 37%, 63% | 16%, 26%, 32% |
| Level 12 caster (`qa-cast`: 183 health, 54 defense, 55 shield) | 5/6 | 45 to 60 s | 50 s | 18% | 11% to 84% |
| Same with Raise Shield (`qa-castr`) | 6/6 | 55 to 70 s | - | - | 61% to 100% |
| Level 12 physical (`qa-phys`: 244 health, 68 defense, 35 shield) | 2/6 | 55 s | 35 to 50 s | 11%, 23%, 33%, 48% | 7%, 7% |
| Same with Raise Shield (`qa-physr`) | 6/6 | 55 to 60 s | - | - | 48% to 78% |

Hits after defense: Meteor 41 to 45 typical, 85 to 91 on a crit; Inferno 80 to 86 typical, 135 to 143 on a crit. The boss casts Meteor about every 10 s and Inferno about every 10 s, so one 10 s rotation is about 125 before crits. Losses are decided by an Inferno crit in the first two rotations (every `qa-dl` loss under 30 s had one).

Reading: the level 10 build with the defensive spell is at 50%, which is the target. Without Raise Shield it is 0 of 6, so the fight currently asks for that spell (or an equivalent) at level 10. At level 12 with Raise Shield it is 12 of 12 with health to spare, which is fine for two levels over. If anything is off it is the gap between "no Raise Shield" and "Raise Shield" on the same character (0/6 against 3/6, 2/6 against 6/6): Raise Shield is close to required here. High confidence on the overall verdict (36 attempts), medium on any single cell (6).

One attempt (`qa-cast` seed 12 in the parallel batch) started on wave 9 trash instead of the boss and was thrown away and rerun alone (a win at 45 s). See Bugs.

### 2. Shadow Emperor: pass with a note, slightly too hard

Six seeds (21 to 26) per build, `qa wave 1 10 10`, plus one 240 s run per level 11 build from wave 10 enemy 1 (seed 61) that reached the boss on its own.

| Build | Wins | Time to kill | Time to die | Boss health left on a loss |
|---|---|---|---|---|
| Level 11 caster with Raise Shield (`qa-se`: 246 health, 92 defense, 59 shield) | 2/7 | 35 s | 25 to 40 s | 9%, 10%, 21%, 50%, 50% |
| Level 11 physical with Raise Shield (`qa-sep`: 359 health, 79 defense, no shield item) | 0/7 | - | 25 to 35 s | 40%, 44%, 45%, 47%, 56%, 68% |
| Level 12 caster, wave 9 gear (`qa-castr`) | 0/6 | - | 15 to 25 s | 73% to 91% |
| Level 12 physical, wave 9 gear (`qa-physr`) | 0/6 | - | 20 to 25 s | 80% to 88% |
| Level 12 caster, mixed gear, 164 health (`qa-w2b`) | 0/6 | - | 15 to 30 s | 67% to 95% |

Both wins ended with the player at 2% and 5% health. Hits after 92 defense: Poison Stab 39 (crit 68), Chain Lightning 48 (crit 84), Inferno 97 (crit 162). After 54 to 68 defense: Poison Stab 44 to 48 (crit 76 to 81), Chain Lightning 54 to 59 (crit 92 to 98), Inferno 106 to 112 (crit 168 to 176). Poison Stab lands about every 5 s, the other two about every 10 s, so a rotation is about 220 on the level 11 caster (it was 357).

Reading: it has gone from impossible to barely possible. The best level 11 build wins about 1 in 4 and three of its five losses were within 21% of the boss's health; the physical build never got the boss under 40%. For "a sensible level 11 to 12 build wins sometimes" it is on the hard edge: roughly 15 to 25% less boss health or damage would bring the caster to about half and give the physical build a chance. Note that the level 12 results here say little, because those bases wear wave 9 gear and have less health and defense than the level 11 ones; a level 12 character in wave 10 gear was not built. Medium confidence.

### 3. World 2 wave 1: trash passes, Goblin King fails

World 2 wave 1 trash now prints Goblin 1047 health, 46 attack, 0 defense (it was 1676 health). World 1 wave 10 trash prints 961 to 1341 health, 59 to 67 attack, 22 to 29 defense.

Trash, one 240 s run each from enemy 1 (seed 61) for the two builds in wave 10 gear, and two 300 s runs each (seeds 31, 32) for the weak build:

| Build | World 2 wave 1 trash | World 1 wave 10 trash |
|---|---|---|
| `qa-se` (level 11 caster, wave 10 gear) | All 9 dead, no death; hardest trash hit Giant Bat Slash 37; poison taken 401. Died to Goblin King | All 9 dead, no death; hardest trash hit Frostbolt 51; then beat Shadow Emperor at 2% health |
| `qa-sep` (level 11 physical, wave 10 gear) | All 9 dead, no death; hardest trash hit 40; poison taken 889. Died to Goblin King | All 9 dead; hardest trash hit 53; died to Shadow Emperor |
| `qa-w2b` (level 12 caster, 164 health, 62 defense, 69 shield) | Died at enemy 8 once (poison taken 2219), reached the boss once and died to it | Died at enemy 7 and enemy 8 |

So for a character that can clear wave 10, world 2 wave 1 trash hits about 25% softer and has no defense: a breather, as intended. The one thing to watch is Giant Rat poison, which ignores defense: the weak build took 1672 to 2219 poison in 5 minutes and that is what killed it at enemy 8. Before the change the same build died at enemy 3.

Goblin King, `qa wave 2 1 10`, six seeds per build:

| Build | Wins | Time to die | Boss health left | Hits taken |
|---|---|---|---|---|
| `qa-se` (seeds 51 to 56, plus the trash run) | 0/7 | 6 to 10 s | 100% | Slash 94 (crit 147), Rend 96 (crit 178) |
| `qa-sep` (seeds 51 to 56, plus the trash run) | 0/7 | under 10 s | 94 to 98% | Slash 100 (crit 154), Rend 101 (crit 185) |
| `qa-w2b` (seeds 41 to 46) | 0/6 | under 10 s | 100% | Slash 108 (crit 164), Rend 109 (crit 195) |

A 2 s trace on `qa-se`: Slash 94 by 4 s, Slash crit 147 by 6 s, Rend 96 and dead by 8 s. The caster (speed 4) had not finished one cast.

Against Shadow Emperor: Goblin King has less health (4190 against 4693) and less defense (46 against 59), but 186 attack against 119 and it attacks about every 2 s instead of every 5 to 10 s. The same builds last 25 to 40 s against Shadow Emperor and 6 to 10 s here, so it does roughly 3 to 4 times the damage per second. It is not "a little harder"; no world 1 build can take more than three of its hits. Its health is in the right place; its attack (or its cast rate) would need to come down to about a third for the fight to last as long as Shadow Emperor's. This is a wave 1 boss with fast, cheap physical spells carried up by the 2.5 jump, where Shadow Emperor's damage is held back by mana. High confidence (19 of 19, all the same shape).

World 2's second boss (Bone Warden) was not re-tested.

### 4. Blood Rush: pass

`qa-br0` and `qa-br1`: forks of `qa-physr` (level 12 physical, Warhammer and Plate Armor, speed -3), seed 71, `qa points 2`, Blood Rush taken on `qa-br1` only, `qa wave 1 7 1`, 240 s.

| | Without | With Blood Rush |
|---|---|---|
| Speed at rest | -3 | -3 |
| Speed at five Raise Shield stacks | -8 | -8 (was -12 in the last report) |
| Hits (Strike / Slash / Rend) | 41 / 54 / 37 | 41 / 54 / 37 |
| Direct damage | 8416 | 8416 |
| Kills per minute | 7.0 | 7.0 |
| Leech | 0 | 20 |
| Health regen with Regeneration up | 6/s | 0/s |

The cause is the new guard in `src/logic/effectActionMap.ts` (`if (total > 0 && ...)` in `recalculateCombatStatTotal`): a percent effect is skipped when the flat total is zero or negative. The note: on a character with negative speed Blood Rush's +50% speed now does nothing at all, so that character buys only the leech (10 flat, doubled) and loses its health regen. The same guard means any percent bonus on any stat whose flat total is not positive is ignored, including percent penalties; nothing else was seen to depend on that, and it was not checked further.

## Bugs

1. **Harness, lead only.** With six `fight` loops running in parallel, one fork (`new qa-f-qa-cast-12 --from qa-cast --seed 12`, then `qa wave 1 9 10`) fought wave 9 trash from enemy 1 instead of the boss. The same commands run alone put it on the boss. Not reproduced a second time in about 100 parallel forks. Likely a race between concurrent CLI processes; check each `qa wave` result when scripting.
2. Nothing new in the game itself. The fractional shield and health from the last report was not re-checked (Bulwark and Siphon rounding was not on the list).

## Could not test

- **A level 12 character in full world 1 wave 10 gear** against Shadow Emperor and Goblin King. The level 12 bases on disk wear wave 9 or mixed gear and are weaker than the level 11 ones. Needs `new --level 12 --wave 10` and a build; about two more minutes.
- **Bone Warden** (world 2's other wave 1 boss) with the new scale.
- **Bulwark and Siphon rounding**: changed, not on the list, not run.
- **Exact time of death**: still not in the timeline; times here are 5 s steps (2 s for the Goblin King trace).

## Runs kept

`qa-dlr`, `qa-castr`, `qa-physr` (the level 10 and 12 bases with Raise Shield equipped), `qa-br0`, `qa-br1` (Blood Rush pair, after their 240 s run). All earlier kept runs (`qa-dl`, `qa-se`, `qa-sep`, `qa-w2`, `qa-w2b`, `qa-tank2`, `qa-phys`, `qa-cast`, `qa-pb`, `qa-cb`, `qa-bw`, `qa-gate20`) are untouched. All `qa-f-*` and `qa-tr*` forks were deleted.
