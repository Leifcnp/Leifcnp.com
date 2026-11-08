# WEB-022 — Shoreline rollout

Assigned 2026-11-07: finish/publish existing Shipyard prototype, then apply its
reviewed pattern to Chartroom, Logbook and Signal Cove. The user also assigns
WEB-016 one-island harbour/zoom after this rollout. No domain work is assigned.

Shipyard is published through [MR #9](https://github.com/Leifcnp/Leifcnp.com/pull/9)
as `907673941072e59335e9f16e5de97b393c575d53`. Its reviewed candidate tree matches
the merge; exact-SHA CI/Pages and four public asset bytes pass. 187 native tests,
strict build, quantitative checks and desktop/phone browser evidence pass.
See artifacts/phase15/VERIFICATION.md and the MR's external exact-SHA review.

## Current scope and acceptance

Base: `907673941072e59335e9f16e5de97b393c575d53`.
Branch: `codex/WEB-022-island-rollout`; managed worktree `web-022-rollout`.
Status: Done, 2026-11-07. MR #10 merged as `812e02f`; exact reviewed tree,
CI/Pages and matching public assets/interactions verified. Original changes preserved.

- Add matching submerged decagonal foundations and sparse directional shoreline
  response to the remaining three islands. Preserve Shipyard's dock gap.
- Keep one aggregate fixed foam geometry/material/mesh: 400 vertices, 320 triangles,
  no textures/growing caches. Sample the updated rendered ocean on the shared clock.
- Per island, prove exact face geometry, at least 0.20 normal clearance and corner
  gaps within Float32 tolerance; disclose sampled interior contact deviations.
- Preserve waves, boat physics, collisions, docking/scanner routes, content,
  wind/wake/spray, pause/reset/hidden/reduced-motion/fallback and idempotent disposal.
- Show normal-camera active/quiet desktop and phone views, including scanner arrival
  at each island; no constant ring, distracting density, land overlap or hidden labels.
- Run scoped geometry/lifecycle checks, bounded aggregate CPU/resource measurement,
  full verify and production-browser checks. No dependencies or domain changes.
- Separate non-author Sol 6.1 reviewer passes exact head/base and acceptance evidence;
  protected MR merge, exact-SHA CI/Pages and live assets/interactions verified.

## Ownership and evidence

- shoreline_finish: effect, landmarks/world integration and relevant tests.
- shoreline_validation: artifacts/phase15-rollout quantitative fixture/report.
- shoreline_browser_qa: focused production browser fixture/report and images.
- Root: plans/queue/ledger, dependency/build/Git, docs output and release.
- Separate Sol 6.1 reviewer: read-only final diff/evidence.

Use short briefs, exclusive paths, serialized builds/Git and three focused repair
rounds. Evidence lives in artifacts/phase15-rollout/VERIFICATION.md and the MR;
release proof does not require a separate paperwork MR per stage.

## Input incident

The reported W/fullscreen/new-window issue was isolated to regular Windows Chrome:
Incognito and local/public trusted-key tests steer normally without navigation,
fullscreen or popups. The user removed a keyboard-navigation extension and
confirmed the issue fixed. No speculative input change was shipped; controls,
camera and layout remain unchanged. Reproduce the clarified symptom before fixing.
