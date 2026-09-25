# Leif Pedersen — Under way

The portfolio uses Vite, TypeScript and Three.js. Phase 9 combines wind-driven sailing (WEB-012), tighter turns (WEB-014) and wind-load heel (WEB-018). Trim the larger original mainsail, steer across the wind and tack to make progress upwind. The shared swells, curved wake, offshore storm and accessible scanner remain. Content lives in `src/content/portfolio.ts`; `src/content/islands.ts` defines island coordinates, land/docking radii and content references independently of rendering.

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

The repository publishes the tracked `docs/` directory from the `master` branch. The release path is to run `pnpm run build`, inspect the generated diff and `docs/CNAME`/`docs/.nojekyll`, smoke-test with `pnpm run preview`, and then commit and push the reviewed output. No Hugo build, theme checkout, configuration, or deploy script is involved. On 2026-09-24 the user authorized the next phase after the published storm; WEB-012 wind sailing continues this external-testing workflow. Future phases still require review.

Phase 9 is published and publicly verified at [http://leifcnp.com/](http://leifcnp.com/). See [Phase 9 release evidence](artifacts/phase9/VERIFICATION.md). Earlier release evidence remains under `artifacts/`. Use the explicit HTTP link for now: HTTPS has a certificate hostname mismatch, tracked separately in WEB-001.

## Phase boundary and review

The custom low-poly sailboat has a pointed hull, wood deck, a taller mast, one cream mainsail and coral bow markings. The main is 68% larger, the jib is removed, and a contrasting coral boom/clew makes trim visible on the boat. The curved main and boom rotate together around the mast; all art is original geometry. Wind, apparent wind and sail trim determine manual propulsion. The isometric camera follows the vessel. Shared waves drive heave/pitch/roll, and conservative collision circles keep the hull outside land and inside the playable world.

- **W / Up:** trim the main in. **S / Down:** ease it out. Release to hold the chosen angle; the wind keeps driving the boat.
- **A / Left** and **D / Right:** steer relative to the bow. Tighter, smooth steering lets you tack and manoeuvre at low speed; significant backwards drift reverses rudder response.
- **Space / Spill wind:** hold to remove sail power and slow down. Release to catch the wind again; ease the main to reduce ongoing drive.
- **Touch/mouse:** hold the labelled helm buttons. Trim and turn together with two touches.
- **R / Reset boat:** return to the start with the main fully eased; reset also works while paused.
- **Pause motion / P:** freeze water, trim, vessel and camera. The shortcut works when the page body has focus.

To get going, trim from 85° toward the HUD's suggested angle. Its bow-up dial shows where the wind comes from relative to the boat. Sail on alternating diagonals to travel upwind, steering through the wind between them. Drive fades through a 32–48° no-go transition; direct head-to-wind has no sail power. The underlying wind is steady at 9 world units/second (metres/second in the simplified simulation), blowing from world +X toward −X. The dial and speed readout show apparent wind, including vessel velocity; the HUD suggests trim for that encounter. Trim spans 8–85° at 25° per second. Loaded sails heel the boat away from the wind by up to about 15° in addition to shared wave/turn response. Spilling wind removes that load; reduced motion suppresses added heel. The measured cruising 90° turn improves from 4.50s to 2.43s, with approximate arc radius reducing from 22.39 to 12.53 world units. This is an approachable deterministic sailing model rather than a full aerodynamics simulator.

Reduced motion starts paused with movement controls disabled; explicit Resume enables sailing. Switching a system preference back off does not override a paused scene. Losing focus or cancelling a gesture releases held controls.

The top scanner navigation reaches résumé (Chartroom), projects (Shipyard), writing (Logbook), and media (Signal Cove). Selecting a category immediately opens its mock content and sends the boat along a safe, explicitly assisted route. Scanner assistance can cross the wind directly, while manual sailing requires tacks. Choose another category to replace travel, or trim/steer to cancel it. Manual trim is retained during assistance. Docking inside an island's ring reveals an **Explore** prompt; **E** opens nearby content without starting another journey.

The content drawer is non-modal: top navigation stays accessible while reading. Close or **Escape** returns focus to the triggering control. Keyboard input inside the drawer is reserved for reading. Closing the drawer leaves scanner travel running. Reset clears navigation, content, and proximity.

Pause cancels scanner travel at the current position. Category navigation while paused or with reduced motion places the boat/camera at the safe destination immediately without resuming animation. If WebGL is unavailable, the same category navigation and content remain usable. All entries remain clearly marked placeholders in the separate content file. The boat model and all new art are generated from original geometry in this repository, with no downloaded model or texture assets. See [artwork provenance](ASSETS.md). A fixed foam pool, bounded travel-history ribbons, and a sampled bow arc form the wake, with contact strength tied to the active swell encounter; pause freezes it and reset/instant travel clears it. Reduced motion suppresses foam and added wave drift/speed pitch/turn heel even when sailing is explicitly resumed. While sailing freely, wave slopes add bounded drift and opposing wave faces slow powered forward travel; sail trim, rudder, spill-wind braking and collision limits retain authority. Scanner arrivals stay horizontally alongside their island while reading, until helm input releases the hold. Hull buoyancy continues to follow the same water surface.

Sail away from the islands to reach the storm. Water darkens gradually between radii 142 and 172; the same wave shape grows by up to 40%. The inward current opposes outward sailing. Ease/spill the sail and steer inward, or select a scanner category to return to the islands. The storm adds no automatic steering or teleportation. Pause freezes it; reduced-motion sailing retains its boundary current. The opening view and island routes stay calm in the six verified layouts.

See [PLAN.md](PLAN.md), the canonical [to-do list](WEBSITE_TODO.md), and the per-task `plans/WEB-NNN/plan.md` files. Stop after Phase 9 for wind/trim review. Translucent drawers, submenu harbours and low-priority WEB-017 incoming-wave variation/direction remain separate backlog tasks.


## Verification and VM graphics

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
