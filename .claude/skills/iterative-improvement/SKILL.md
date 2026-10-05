---
name: iterative-improvement
description: Runs the Idle Fight improvement loop - playtest with subagents, fix what they found (balance, bugs, pacing), playtest again - for a few rounds inside a time budget. Use when asked to "run iterative improvement", to improve the game from playtests, or to tune balance over several rounds. Optional args - a time budget in minutes (default 45) and a focus (e.g. "early game", "casters").
---

# Iterative improvement

The goal is to make the game more fun to play, as judged against `DESIGN.md`, by alternating
playtests and fixes. Each round should leave the game measurably better on the problems the
last round's testers reported. You make the changes yourself; the playtesters only play and report.

## How this game is tuned

These are the owner's rules. They decide what kind of fix is allowed.

- **Tune through build paths.** When a run is stuck or too slow, the fix is in the pieces a
  player chooses: a talent's numbers, a spell's cost or effect, what an item offers, when a
  piece becomes reachable. Ask which build path should have carried the player past that
  point and why it did not, then make that path work.
- **Nothing of the player's scales with the wave.** Player power comes from item drops,
  levels, talents and spells. Do not make spell damage, aura bonuses, status ticks or
  anything else on the player grow with the current wave or world. Enemies and item drops
  are what scale with the wave.
- **Death sends the player back to world 1 wave 1.** Growth shows as clearing early waves
  faster. Do not soften the death penalty to fix pacing.
- **The game stays hard.** Death should be common, and beating a new boss or reaching a
  new furthest wave should feel like an event. A run where the player rarely dies, or
  where new waves fall one after another without a fight, is too easy even if testers
  enjoyed it. A wall is a problem only when no build path gets past it, when the death
  cannot be read, or when the wait between new bests is filled with nothing to decide.
  Fix those; do not remove the wall.
- **Leave the rules alone unless asked.** The death rule, how levels and points are earned,
  and global formulas are design decisions. A broken formula (a crash, an exploit, numbers
  that run away) is a bug and can be fixed; a rule that makes the game harder is not. If a
  rule looks like the real problem, say so in the summary and leave it for the owner.

## Before the first round

1. Read `DESIGN.md` (it decides what counts as a problem: slow pace is intended, one-shotting
   everything is not) and the newest reports in `playtest/reports/`.
2. Note the start time with `date`. The time budget covers everything: your fixes and the
   testers' runs. Default 45 minutes. Check the clock before starting each round and stop
   launching testers when less than about 8 minutes remain.
3. If there are no recent reports, start with a playtest round rather than guessing.

## One round

1. **Pick what to fix.** From the reports, take the problems that block the most other things
   first. A broken curve (enemies die in one hit, or the player cannot leave wave 1) hides
   every other finding, so fix it before tuning individual spells or talents. Prefer the cause
   over the symptom: if three items are too strong because one formula scales wrongly, fix the
   formula. Confirmed bugs go in the same round.
2. **Make the changes** in the game source. Keep reactive logic inside `useCombatEngine` and
   the tick functions so the harness exercises it. Check new or changed content against the
   `DESIGN.md` checklist. Run `npx tsc --noEmit -p .` and one short harness run
   (`npm run -s playtest -- new <name>` then `run`) before spending tester time on a build
   that does not start.
3. **Playtest.** Launch 3 playtesters in parallel in one message, each with a different build
   and seed, with run names `i<round>-<build>`. Use the `playtester` agent type; if it is not
   registered in the session, use `general-purpose` and tell it to read
   `.claude/agents/playtester.md` and follow it. Tell every tester:
   - the game-time budget and a cap on `run` calls (see the ramp below);
   - what changed since the last round, so they judge whether it landed;
   - what numbers to report (kills per minute per stretch, hits to kill, deaths and what
     caused them, mana starvation, what each new piece changed);
   - to say whether the game was hard enough: how often they died, how long between new
     furthest waves, and whether beating each new boss felt earned or handed to them;
   - to comment on enemy design: which enemies and bosses asked something of the build,
     which were only bigger numbers, which were unfair or unreadable;
   - a short report (about 45 lines) at `playtest/reports/<date>-<run name>.md`.
   Do not edit game source or the harness while testers are running: the harness rebuilds
   from source on each command, so a mid-run edit corrupts their comparison.
4. **Read the reports** and compare them with the previous round on the same questions. Say
   plainly which fixes landed, which did not, and what new problems appeared. A fix that made
   one build better and another unplayable has not landed.

## The evaluator, QA, the UX evaluator and the proposer

Four more agents sit beside the playtesters. Use the agent types `evaluator`, `qa`,
`ux-evaluator` and `proposer`; if one is not registered in the session, use `general-purpose` and tell it to
read its file under `.claude/agents/` and follow it.

- **Evaluator.** After a round's reports are in, launch one evaluator on that round. It
  reads the reports, the game's content and mechanics and `DESIGN.md`, checks testers'
  claims against the source, and writes a ranked verdict to `playtest/evaluations/`. Use its
  ranking to pick what to fix: it sees across builds and into the code, where each tester
  saw one run. It can run while you make fixes that are already clear, and alongside the
  next round's testers, since it only reads. Tell it what you changed after the reports it
  is judging were written. Give it the question you most need answered.
- **QA.** Playtesters only see what an honest run reaches, so late talents, uniques,
  the last bosses, the second world and anything changed after their runs stay unknown.
  Launch a `qa` agent (`.claude/agents/qa.md`) on those: the evaluator's "could not
  judge" list, every "not tested" in the reports, and each fix you made that no run has
  confirmed. It sets up controlled pairs in the harness (it may grant items, add points
  and jump to a wave, which playtesters may not) and writes pass or fail per item to
  `playtest/qa/`. It creates its own `qa-` runs, so it can run alongside testers, but not
  while you are editing the source. Run it at least once per loop, and always before
  reporting a fix as confirmed when no playtest covered it.
- **UX evaluator.** The harness prints numbers; nobody else looks at the screen. Launch a
  `ux-evaluator` (`.claude/agents/ux-evaluator.md`) once per loop, and again whenever a
  round's changes add something a player has to see: a new boss trait, a new lock on a
  talent, a new cost on a spell, a changed death rule. It starts its own dev server on
  port 5199, opens the game in the browser, loads played runs to see mid and late states,
  and writes a review to `playtest/ux/` with ranked recommendations from small details to
  structural changes. Give it the round's gameplay changes as its focus, so it checks the
  interface caught up with them. It opens tabs in the owner's browser, so run one at a
  time. Fix the faults it finds (wrong values, broken displays, text that no longer
  matches the rules) inside the loop; report its larger recommendations in the summary
  for the owner to choose from.
- **Proposer.** Launch one when a round shows a gap that tuning numbers cannot close: an
  archetype with no payoff, bosses that ask nothing, levels with nothing to choose. Give
  it that gap as its focus and the newest evaluation to read. It writes checked proposals
  to `playtest/proposals/`. Do not build its proposals inside the loop unless the owner
  asked for new content: new pieces are the owner's call. Report its top picks in the
  summary instead. Once per loop is usually enough.

## The ramp: early game first

Early-game problems make later minutes untestable, so test length grows only as the early
game holds up.

| Stage | Game time per tester | `run` calls | Move on when |
|---|---|---|---|
| 1. First minutes | 25 min | up to 14 | every build leaves wave 1 within about 10 minutes, deaths have a visible cause, and there is a choice to make at each level |
| 2. First hour | 60 min | up to 20 | every build dies regularly (several deaths an hour) and still sets a new furthest wave every 10 to 20 minutes, each wall has a build path past it, none one-shots everything, and at least two builds feel different |
| 3. Long run | 3 hours | up to 40 | used for late-game checks: do tradeoffs stay real, is there still something to work toward |

### Starting further along

Once the early game holds up, later content should not cost an hour of replay per tester.
The harness can start a run past the beginning:

- `new <name> --level L [--world W] --wave N [--drops K]` makes a character of that level
  at that wave, with all points unspent and K drops (default 20) from the waves before it.
  It goes through the game's own level-up and drop code, so it always matches the current
  balance. Use it to test a part of the game directly: for example `--level 12 --world 2
  --wave 1` for the start of world 2, or `--level 9 --wave 8` for the end of world 1.
- `new <name> --from <run>` copies another run's character and progress. It keeps a real
  played build, but the copy carries the numbers from when that run was played, so do not
  fork across a balance change.

Pick the level a fresh run reaches at that wave (the newest fresh reports say). A start that
is too rich or too poor tells you about the start, not the game. Each round, keep at least
one tester on a fresh start so the early game stays covered, and tell the others exactly
which `new` command to use. A tester on a later start first spends the points and equips the
stash, which is itself a test of whether the choices at that level are interesting.

Stay at a stage for another round if its exit condition fails. Give at least one tester a
caster and one a status or aura build in every round; physical builds are the easiest to
make work and hide problems the others have.

## What to keep in mind

- Fun over balance. Do not flatten something testers enjoyed because it is strong; bound it
  so it stops erasing the rest of the game, and keep the feeling.
- Tradeoffs must cost something at every gear level. Watch for penalties that vanish as
  numbers grow.
- Change values in one place. If a number needs a comment to explain why it is what it is,
  write that comment.
- Enemy design is part of the fun. Carry the testers' comments on enemies into the summary,
  and treat "every wave feels the same" or "this enemy cannot be answered by any build" as
  findings on the same footing as a weak talent.

## When the budget is used

Stop launching testers, finish any fix in progress, and make sure the tree typechecks and a
harness run starts. Then report to the user:

- what changed, grouped by problem, with file references;
- for each change, whether a playtest confirmed it, contradicted it, or never tested it;
- the before and after numbers that show the difference;
- what is still broken or untested, most important first, and which stage the next loop
  should start at;
- whether the game is still hard: deaths per hour and time between new furthest waves for
  each build, and any build that stopped dying;
- what the testers said about enemy design;
- the evaluator's verdict in a few lines, QA's passes and failures, the UX evaluator's
  verdict and top recommendations, and the proposer's top picks, with the paths of the
  documents;
- any rule that looks like the real cause of a problem, left unchanged for the owner to decide.

Do not commit unless asked.
