# Leif Pedersen — Under way

The portfolio uses Vite, TypeScript and Three.js. Phase 13 adds visible true-wind breeze streams, an original Shipyard flag and an apparent-wind masthead pennant. Phase 12 adds nonlinear wind-load heel up to 20 degrees, authored top-rail and deck contact checks, and a shared rendered-triangle water sampler; it keeps the original hull, wave field and water geometry. Phase 11 adds screen-relative steering, 75% auto-trim and a manual sweet-spot surge with white foam and optional synthesized wind rush. Phase 10 adds translucent content drawers and a compact phone reading sheet, keeping the boat visible during scanner voyages. Phase 9 combines wind-driven sailing (WEB-012), tighter turns (WEB-014) and wind-load heel (WEB-018). Trim the larger original mainsail, steer across the wind and tack to make progress upwind. The shared swells, curved wake, offshore storm and accessible scanner remain. Content lives in `src/content/portfolio.ts`; `src/content/islands.ts` defines island coordinates, land/docking radii and content references independently of rendering.

The former Hugo source, theme checkout, configuration, deploy script, résumé, and legacy generated pages were removed from the working tree on 2026-09-24 after the Phase 1 archival checks. The old version remains recoverable in Git history at commit `863b788`; it is not part of the current build or deployment path.

## Local development

Use Node.js 24 and pnpm 11 (verified here with Node 24.19.0 and pnpm 11.19.0).

The repository currently uses the bundled runtime in this environment. If `node` and `pnpm` are not on your `PATH`, use:

```sh
export PATH="/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
# Optional in a normal install; these keep pnpm inside the repository in this VM.
export PNPM_CONFIG_STORE_DIR="$PWD/.pnpm-store"
export PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=warn
```

Install dependencies and start the Vite server:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open the URL Vite prints, usually `http://localhost:5173/`.

## Checks and production build

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm test
pnpm run build
pnpm run preview
```

`pnpm run build` type-checks the source and writes the GitHub Pages artifact to `docs/`. `public/CNAME` and `public/.nojekyll` are copied into that output. Review the generated site with `pnpm run preview` before publishing.

The production preview normally opens at `http://localhost:4173/`. The default build uses relative asset paths and preserves the existing `leifcnp.com` custom domain. Do not edit `docs/` by hand.

## GitHub Pages publishing

The repository publishes the tracked `docs/` directory from the `master` branch. The release path is to run `pnpm run build`, inspect the generated diff and `docs/CNAME`/`docs/.nojekyll`, smoke-test with `pnpm run preview`, and then commit and push the reviewed output. No Hugo build, theme checkout, configuration, or deploy script is involved. On 2026-09-25 the user accepted Phase 11 and authorized WEB-021 heel/contact as Phase 12 through this external-testing workflow. Future phases still require review.

Phase 12 is published and publicly verified at [http://leifcnp.com/](http://leifcnp.com/). See [Phase 12 release evidence](artifacts/phase12/VERIFICATION.md). Earlier release evidence remains under `artifacts/`. Use the explicit HTTP link for now: HTTPS has a certificate hostname mismatch, tracked separately in WEB-001.

## Phase boundary and review

The custom low-poly sailboat has a pointed hull, wood deck, a taller mast, one cream mainsail and coral bow markings. The main is 68% larger, the jib is removed, and a contrasting coral boom/clew makes trim visible on the boat. The curved main and boom rotate together around the mast; all art is original geometry. Wind, apparent wind and sail trim determine manual propulsion. The isometric camera follows the vessel. Shared waves drive heave/pitch/roll, and conservative collision circles keep the hull outside land and inside the playable world.

- **WASD / arrows:** hold a direction to steer toward it on screen; combinations choose diagonals. Release to keep sailing on the current course. Heading changes use the boat’s bounded rudder response.
- **Q / Trim in** and **E / Ease out:** take over the sail manually. Release to keep that angle; manual mode stays latched while turning.
- **M / Auto trim:** return sail control to the assist. It smoothly aims for 75% of the available power for the current heading and apparent wind.
- **Space / Spill:** hold to remove sail power and slow down. Release to catch the wind again.
- **Touch/mouse:** hold the labelled helm buttons; direction and trim can be used together with two touches.
- **R / Reset boat:** return to the start with the main fully eased; reset also works while paused.
- **Sound:** off initially; opt in for the wind rush during a manual surge. Unsupported audio leaves sailing functional.
- **Pause motion / P:** freeze water, trim, vessel and camera. The shortcut works when the page body has focus.

To get going, hold a direction or choose Auto trim. The bow-up dial shows where wind comes from relative to the boat. To sail faster, use Q/E or the trim buttons to approach the displayed Aim angle: the efficiency meter and Sweet spot label show trim quality. Staying in the pocket for 0.35 seconds while moving forward earns a 1.4-second decaying drive bonus, stronger white foam and optional wind rush. The reward requires a five-second cooldown and leaving/re-entering the pocket; ideal trim itself remains faster than assisted trim. Boosts preserve the existing speed and collision limits and clear on spill, no-go, scanner travel, pause, hiding or reset.

Sail on alternating diagonals to travel upwind. Drive fades through a 32–48° no-go transition; direct head-to-wind has no sail power, including with auto-trim. True wind is steady at 9 world units/second, from world +X toward −X; the dial reports apparent wind including vessel velocity. Trim spans 8–85° at 25°/second. Existing sail-load heel, wave forces, drag and collision bounds remain. The new heading controller reaches within 5° of a 90° target in about 3.31 seconds at cruising speed and 3.83 seconds from low speed in the pure sailing fixture. This is an approachable deterministic sailing model.

Reduced motion starts paused with movement controls disabled; explicit Resume enables sailing. Switching a system preference back off does not override a paused scene. Losing focus or cancelling a gesture releases held controls.

The top scanner navigation reaches résumé (Chartroom), projects (Shipyard), writing (Logbook), and media (Signal Cove). Selecting a category immediately opens its mock content and sends the boat along a safe, explicitly assisted route. Scanner assistance can cross the wind directly, while manual sailing requires tacks. Choose another category to replace travel, or trim/steer to cancel it. Manual trim is retained during assistance. Docking inside an island's ring reveals an **Explore** prompt; **F** opens nearby content without starting another journey.

The content drawer is non-modal: top navigation stays accessible while reading. Its warm paper surface is translucent, with opaque text and a solid fallback for greater contrast, reduced transparency or unavailable WebGL. Phone portrait layouts use a compact bottom sheet so the boat stays in view above it; desktop and short landscape use a side panel. Tab past Close into the labelled content region to scroll long entries with Page Up/Down or arrow keys. Close or **Escape** returns focus to the triggering control. Keyboard input inside the drawer is reserved for reading. Closing the drawer leaves scanner travel running. Reset clears navigation, content, and proximity.

Pause cancels scanner travel at the current position. Category navigation while paused or with reduced motion places the boat/camera at the safe destination immediately without resuming animation. If WebGL is unavailable, the same category navigation and content remain usable. All entries remain clearly marked placeholders in the separate content file. The boat model and all new art are generated from original geometry in this repository, with no downloaded model or texture assets. See [artwork provenance](ASSETS.md). A fixed foam pool, bounded travel-history ribbons, and a sampled bow arc form the wake, with contact strength tied to the active swell encounter; pause freezes it and reset/instant travel clears it. Reduced motion suppresses foam and added wave drift/speed pitch/turn heel even when sailing is explicitly resumed. While sailing freely, wave slopes add bounded drift and opposing wave faces slow powered forward travel; sail trim, rudder, spill-wind braking and collision limits retain authority. Scanner arrivals stay horizontally alongside their island while reading, until helm input releases the hold. Hull buoyancy continues to follow the same water surface.

Read wind directly from the scene: the Shipyard flag and faint moving breeze streams trail downwind. The small coral/cream masthead pennant shows apparent wind, including the boat’s velocity; the HUD continues to describe where wind comes from. The fixed stream field stays in world space as the camera follows, fading near land and at its edges. Pausing freezes the cues. Reduced motion removes moving breeze and flag flutter while keeping the flags’ direction visible. The original contact spray remains shared with the stronger heel/water response.

Sail away from the islands to reach the storm. Water darkens gradually between radii 142 and 172; the same wave shape grows by up to 40%. The inward current opposes outward sailing. Ease/spill the sail and steer inward, or select a scanner category to return to the islands. The storm adds no automatic steering or teleportation. Pause freezes it; reduced-motion sailing retains its boundary current. The opening view and island routes stay calm in the six verified layouts.

See [PLAN.md](PLAN.md), the canonical [to-do list](WEBSITE_TODO.md), and the per-task `plans/WEB-NNN/plan.md` files. WEB-019 is the active Phase 13 after the user requested the next step on 2026-09-25. Stop after this wind-cue phase for review. WEB-017 incoming-wave variation/direction and WEB-022 shoreline interaction remain queued; WEB-016 harbours/zoom remains deferred.


## Verification and VM graphics

Phase 13 verification is recorded in [artifacts/phase13/VERIFICATION.md](artifacts/phase13/VERIFICATION.md). The original boat and all physics/wave tuning remain unchanged. Publication is pending.

Phase 12 passes 137 native cases, typecheck and production build. It verifies
bounded nonlinear sail heel up to 20 degrees with combined roll capped at 0.4
radians, authored rail/deck clearances, and the shared faceted-water sampler
over the existing grid without changing geometry or wave forces. The working
deck, cockpit and mast retain at least 0.12 units of dry clearance; outer-edge
rail wash is limited to 0.06 units. Pause/reset/hidden/reduced-motion cleanup
and the original fixed spray pool are covered. Six production layouts, actual keyboard/touch/scanner/lifecycle behavior and
normal-camera hull-contact scenes pass. Exact-SHA Pages, matching public assets
and public desktop/mobile interactions are verified. See
[Phase 12 verification](artifacts/phase12/VERIFICATION.md).

Phase 11 passes 120 native cases, strict build, deterministic auto/manual/tack
and lifecycle checks, six local/production layouts and public desktop/mobile
interactions. Actual Web Audio checks confirm gesture gating, bounded gain,
muting and disposal. The deployed HTML/assets match the tested build. See
[Phase 11 verification](artifacts/phase11/VERIFICATION.md).

Phase 9 passes 101 native tests, strict build, quantitative tighter-turn checks,
6,528 transformed hull/contact frames and browser keyboard/touch tacks. Source
fixtures verify matching frame-rate trajectories, pause/reset/reduced motion,
scanner mooring/handoff and disposal. Local and public production suites cover
six viewport sizes, content/focus, touch, fallback and an actual published sail.
Public HTML/assets match the deployed build. Rendering remains bounded at 53
calls, 33,000 triangles, 39 geometries and zero textures in the sampled view.
Details are in [artifacts/phase9/VERIFICATION.md](artifacts/phase9/VERIFICATION.md).


See [Phase 1 verification](artifacts/phase1/VERIFICATION.md) and its desktop/mobile screenshots. The production scene passed browser checks in Chromium 151 using SwiftShader software rendering. The Codex embedded browser in this VirtualBox guest failed WebGL context creation through Mesa; it correctly displays the fallback instead of the scene. Open the preview in a browser with working WebGL2 to review live motion. No browser or VM graphics settings were changed.

The screenshot tests cover mobile layouts, not performance on physical mobile hardware. No DNS or certificate settings were changed during publication.
