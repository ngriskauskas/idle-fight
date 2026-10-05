# Idle Fight

Before designing or implementing any spell, aura, talent, item, enemy or mechanic, read `DESIGN.md` and check the new content against its checklist. Say so if something conflicts with it.

Content ideas live in `IDEAS.md`. Talents take a short `description` saying what they combine with.

## Playtesting

`npm run playtest` runs the game headless at high speed (see `playtest/harness/cli.ts` for commands). The `playtester` subagent plays a full run with it and writes a report to `playtest/reports/`. The harness runs the real game logic through `useCombatEngine` and the tick functions in `useGameLoop`, so keep new reactive logic inside those.
