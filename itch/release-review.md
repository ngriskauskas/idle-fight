# Release review: 0.1.0

- Baseline: origin/prod 0600848 (itch build prep, version 0.0.1). Candidate: release/0.1.0 built from prod plus the previously uncommitted work.
- Changes: Inventory selling (single, sell-all by rarity), a rotating merchant shop with gold from kills (hold a ware, reroll), a smith that turns 4 same-rarity items into 1 of the next rarity, merchant-only unique items, ItemCard/panel UI, shatter damage now logged, playtest harness updates. Answers the player report that a full inventory blocks drops.
- Save compatibility: no schema change. `gold` and `shop` are new fields; old saves keep their defaults on load (shallow setState merge). Items from older saves have no `scale`, which is optional.
- Debug exposure: DebugPanel and toggle stay removed (from prod). `grantItem` is only called by the playtest harness, not by UI. No query or localStorage flags.
- Checks: `tsc -b` clean, `npm run build` ok, `npm run package:itch` -> idle-fight-itch.zip (index.html at root, relative assets, 4 files). SHA-256 9d655c285f41cd2724f0be1d2dfa4e354ca0cdb7bb3fd386cad8fe1f5ef61ee5 (rebuild may differ).
- Runtime: packaged build served with `vite preview`: loads, combat runs, Items tab shows Inventory/Shop/Smith, no console errors. Existing-save migration reasoned from code, not run against a real save fixture. Not tested on a real device.
- Known issues from playtest/qa/2026-10-18-i1-economy.md: Overflowing Chalice is inverted for casters, Pyre Censer can cause a death loop on weak characters, no unique boots or legs for the smith's legendary tier, Miser's Ring value may differ from its notes. The smith level exploit was fixed by averaging.
