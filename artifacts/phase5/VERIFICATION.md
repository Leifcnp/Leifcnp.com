# Phase 5 verification — 2026-09-24

## Scope and provenance

Phase 5 is implemented and locally verified; release verification is pending. Three Luna agents supplied the custom sailboat, island details, and pooled wake. Root integrated the effect lifecycle, corrected visual readability and dock details, and verified the complete experience.

The boat is custom-built from original hull/deck vertices, sail triangles, and mast/boom/cockpit primitives. No downloaded models, textures, mesh snippets, or third-party art were used. [ASSETS.md](../../ASSETS.md) records provenance and the user's requirement. The established Three.js dependency is the renderer, not a source of boat artwork.

Chartroom has a small tower, Shipyard a shoreline dock, Logbook a marker, and Signal Cove a lit beacon. Their complete geometry remains inside declared land collision radii. A fixed 96-instance foam pool provides two diverging stern trails and restrained bow contact foam. Stronger physical wave interaction and offshore storm water are separately scheduled as WEB-010 and WEB-011; neither is implemented in this phase.

## Verification

- Native tests: **41 individual tests passed** across seven files. Coverage includes landmark geometry/support/disposal, route clearance and world bounds, scanner state, proximity, kinematics, input, and camera behavior.
- Strict TypeScript and Vite production build passed without dependency changes. The existing bundle-size warning remains: about 543 kB JavaScript minified / 142 kB gzip. It does not fail the build.
- Production interaction checks cover six viewport sizes: 1440×900, 390×844, 320×568, 360×915, 844×390, and 2560×1080. They verify full canvas coverage, readable/clickable category buttons, 44px targets, drawer focus and keyboard access, scanner replacement/cancellation, docking prompts, E/Explore, real two-finger touch, reset, reduced motion, fallback content, and no console/script errors.
- The actual scene fixture verifies gradual travel, safe docking and zero arrival speed, manual/pause cancellation, invalid replacement stopping prior travel, hidden-document suspension without catch-up, reset, and disposal.
- The custom vessel fixture verifies heave/pitch/roll agreement at four headings and three times, damping, a partly submerged hull, immutable pose snapshots, full hull X/Z clearance, bounded mesh/triangle counts, and one disposal per unique resource. An upward-normal check guards the deck winding.
- Wake lifecycle testing ran 1,200 moving updates with turns using the same geometry/material/mesh. At most 56 of the 96 slots were active in that fixture. Stopping fades all foam; reverse produces no false forward wake; reduced motion clears and suppresses effects; reset clears them. Mesh/geometry/material each dispose exactly once.
- The integrated effect fixture proves pause freezes all foam matrices and pixels, instant navigation clears old trails, and reduced motion suppresses foam even after explicit sailing resume. All teardown paths leave no scene children/canvas or errors.

## Bounded rendering and limits

The sailboat uses 11 lightweight meshes. Sampled desktop rendering used 50 draw calls and 14,005 triangles; mobile viewport rendering used 41 calls and 13,769 triangles. The scene reported 38 geometries and zero textures. These stay within this phase's inspection thresholds of 100 calls and 16,000 triangles; wake geometry/resources do not grow over time.

Chromium 151 used SwiftShader software rendering in this VM. Sampled desktop median frame interval was about 56 ms (p95 139 ms), and the mobile viewport about 28 ms (p95 60 ms). These are VM diagnostics, not a hardware-mobile performance guarantee; the run does not demonstrate 60 fps. Physical phone GPU behavior remains part of external user testing. Full timing/count evidence is retained below.

## Evidence and release

- [Production interaction checks](checks.json)
- [World/scanner regression checks](world-checks.json)
- [Vessel pose and geometry](pose-checks.json)
- [Wake lifecycle](wake-lifecycle.json)
- [Integrated effects and rendering measurements](effects-checks.json)
- [Build hashes](build-assets.json)
- [Desktop sailing/wake](wake-desktop.png), [mobile sailing/wake](wake-mobile.png), [desktop interface](desktop.png), [small-screen drawer](small-drawer.png)

Vite regenerated the tracked `docs/` output; CNAME and `.nojekyll` remain intact. The authorized release uses the existing `master` → `docs/` Pages path. Public exact-SHA deployment, byte comparison, and browser checks remain the final release step. No DNS/domain settings or Hugo files changed. The pre-existing HTTPS certificate mismatch stays in WEB-001; use the explicit HTTP test URL.

Stop after publishing Phase 5 for visual/interaction review. The new water and storm requests remain recorded in their own plans and backlog entries.
