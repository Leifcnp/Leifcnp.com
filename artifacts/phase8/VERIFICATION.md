# WEB-011 / Phase 8 — offshore storm verification

Date: 2026-09-24. Node 24.19.0, pnpm 11.19.0, Chromium 151.0.7922.34.
Two Luna agents implemented the storm field/dynamics and water/hull packages. Root integrated them, strengthened the trajectory checks, reviewed the actual browser output and prepared publication.

## Delivered behavior

The reviewed central sea stays calm. Sailing offshore reveals a smooth navy/slate transition, larger swells and stronger crest accents. A bounded inward current and outward momentum damping resist further departure. Releasing the helm or steering inward returns toward calm water; scanner navigation can return directly to any island.

The storm is a smooth radial field centered on spawn `(0,0)`, with zero intensity through radius 142 and full intensity at 172. It scales the existing wave function up to 1.4× rather than adding a separate animation. Renderer, hull, wake, slopes and vertical velocity consume that shared surface. The hull support bound is raised to 2.52 units. The final safety square is ±220; rendering remains ±360. Island authoring bounds remain ±180.

Sustained outward thrust can balance the current around the soft boundary; it is not forcibly steered or teleported. Optional wave forces/foam remain suppressed under reduced motion, while explicitly resumed sailing retains the boundary current. Pause and hidden-tab suspension freeze the simulation. No dependencies, downloaded artwork, boat geometry, domain or UI contracts changed.

WEB-017 records the user's new low-priority request for varied incoming sets with one prevailing direction. Its plan is saved; that wave redesign is not implemented in this release.

## Visual review

Compare the [calm opening](opening-desktop.png), [approach](storm-approach.png), [transition](storm-desktop.png), [full storm](full-storm.png), and [portrait transition](storm-mobile.png). Also recorded: [returned to calm](returned-mobile.png) and [scanner return](scanner-return.png).

Root rejected the initial 30% color blend because it still read as ordinary turquoise. The final full navy/slate palette makes the offshore area clear while preserving a gradual boundary. Temporary per-vertex palette arrays were removed from the render loop without changing the approved colors. Geometry/effect budgets are unchanged.

## Verification

- `pnpm test`: **76 individual tests**, 13 files, zero failures. New tests cover storm smoothness/direction/gradient, opt-in behavior, eight radial approaches, powered/released/reverse/brake response, finite malicious-input handling, and 30/60/120 Hz trajectories. Root tightened comparisons to 1e-6 for every state component and checks every trajectory sample stays away from the hard boundary.
- `pnpm run build`: strict TypeScript and Vite production build pass. The existing large-chunk warning remains: JS 557.73 kB / 147.54 kB gzip. Final focused ocean/wave tests passed after the allocation cleanup. CNAME and `.nojekyll` are preserved.
- [Camera coverage](camera-coverage.json): all six supported opening views remain inside the calm region, including ±1.8-unit heights. Minimum margin: 4.08 units. At all expanded world edges/corners and ±2.52-unit storm heights, all corner rays stay over water; minimum water margin: 10.14 units. More extreme aspect ratios than the tested 2560×1080 / 360×915 limits may show distant storm at startup; the approved camera was not rescaled.
- Navigation tests verify all islands and all inter-island scanner routes stay calm, and all offshore sides/corners have collision-safe routes to each island.
- [Actual application storm checks](storm-checks.json): powered travel from radius 130 reached approximately 159.88, slowed and moved inward without hitting the hard boundary. Holding thrust settled near 158; releasing it returned to radius 125.27 after 18 seconds. Pause froze the storm, scanner returned from radius 182 to Projects, reset returned to spawn, and resumed reduced-motion sailing returned from radius 180 to 126.84 with foam suppressed. No script or shader errors.
- [Actual hull geometry](contact-trajectory.json): 12 eight-second paths (four offshore headings × 30/60/120 Hz), checking every transformed hull/deck frame. All 6,720 frames retained a dry deck and submerged hull point. Minimum deck freeboard was 0.287 units; maximum heave span was 3.717 units. These are representative trajectories, not a proof for every possible pose.
- [World regression](world-checks.json): exactly matching 30/60/120 Hz paths, 5,784 finite collision-safe samples, stable scanner mooring/manual release, pause/resume without catch-up, hidden-document suspension, reduced motion and idempotent teardown.
- [Production browser suite](checks.json): six desktop/mobile layouts; all scanner categories/content/focus, replacement/cancellation, docking/E/Explore, real multi-touch, 44 px controls, reduced motion and WebGL fallback passed without script/console errors.
- [Effect lifecycle and renderer diagnostics](effects-checks.json): bounded 96-slot foam, frozen pixels/matrices on pause, reset/instant travel cleanup, reverse/reduced suppression, and clean scene/canvas disposal.

## Resource and timing record

| Viewport | Calls | Triangles | Geometries | Textures | Median / p95 frame interval |
| --- | ---: | ---: | ---: | ---: | --- |
| Desktop 1440×900 | 55 | 33,021 | 41 | 0 | 65.9 / 149.6 ms |
| Portrait 390×844 | 46 | 32,785 | 41 | 0 | 34.4 / 63.1 ms |

These are short software-SwiftShader measurements in VirtualBox at DPR 1, not physical mobile performance or a claimed FPS target. Geometry/resource counts match Phase 7; VM timing varies. External hardware feedback remains useful before increasing scene complexity.

## Publication

Application commit `813d0691220c32fac84d0d9dcf6551ff5de802d3` is published on `origin/master`. [Pages run 36079090864](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36079090864) succeeded for that exact SHA. Public HTML, JavaScript, CSS and favicon returned HTTP 200 and matched the build byte for byte; see [deployment and asset hashes](public-assets.json). The [complete public six-layout browser suite](public-checks.json) passed.

A separate [published storm voyage](public-storm.json) held Forward from the actual spawn for 16 simulation seconds, captured [desktop](public-storm-desktop.png) and [portrait](public-storm-mobile.png), then released the helm for 18 seconds and captured the [return toward calm](public-return-mobile.png). This used the unmodified published application, without test positioning or source instrumentation. Root visually reviewed the captures; no browser script or shader errors occurred.

WEB-011 is Done and awaiting user review. WEB-017 remains low-priority Backlog. No DNS, certificate or Pages settings changed; the known HTTPS observation remains separately tracked in WEB-001.
