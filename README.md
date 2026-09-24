# Leif Pedersen — Under way

The portfolio is being rebuilt as a small Vite + TypeScript + Three.js scene. Phase 6 strengthens the custom sailboat’s interaction with the water: gentle wave-driven drift, hull support sampling, speed pitch/turn heel, and wave-sensitive bow/side foam. Shoreline landmarks and the accessible category scanner/content drawers remain in place. Content lives in `src/content/portfolio.ts`; `src/content/islands.ts` defines island coordinates, land and docking radii, categories, and content references independently of the renderer.

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

The repository publishes the tracked `docs/` directory from the `master` branch. The release path is to run `pnpm run build`, inspect the generated diff and `docs/CNAME`/`docs/.nojekyll`, smoke-test with `pnpm run preview`, and then commit and push the reviewed output. No Hugo build, theme checkout, configuration, or deploy script is involved. On 2026-09-24 the user approved WEB-010 after reviewing the custom sailboat phase; this continues the external-testing workflow. Future phases still require review.

Phase 6 / WEB-010 is published and verified at [http://leifcnp.com/](http://leifcnp.com/); see the [release evidence](artifacts/phase6/VERIFICATION.md). Stronger water interaction is ready for sailing-feel review. The earlier [Phase 5 evidence](artifacts/phase5/VERIFICATION.md) is retained as history. Use the explicit HTTP link for now: HTTPS currently has a certificate hostname mismatch, tracked in WEB-001.

## Phase boundary and review

The custom low-poly sailboat has a pointed hull, wood deck, mast/boom, cream sails, and coral bow markings. Forward/reverse thrust, braking, rudder steering, drag, shared-wave heave/pitch/roll, and smooth camera following retain the approved controls. The camera keeps its isometric angle and follows horizontal movement; islands and labels can leave the view as you sail. Conservative collision circles keep the hull outside land and inside the playable world.

- **W / Up:** forward thrust. **S / Down:** slow down, then reverse.
- **A / Left** and **D / Right:** steer relative to the bow. The rudder reverses its effect when backing.
- **Space:** brake. Releasing thrust lets the boat coast and slow through drag.
- **Touch/mouse:** hold the labeled helm buttons; combine Forward/Reverse with a turn button using two touches.
- **R / Reset boat:** return to the starting point and clear movement; reset also works while paused.
- **Pause motion / P:** freeze water, vessel, and camera. The P shortcut works when the page body has focus.

Reduced motion starts paused with movement controls disabled; explicit Resume enables sailing. Switching a system preference back off does not override a paused scene. Losing focus or cancelling a gesture releases held controls.

The top scanner navigation reaches résumé (Chartroom), projects (Shipyard), writing (Logbook), and media (Signal Cove). Selecting a category immediately opens its mock content and sends the boat along a safe route. Choose another category to replace travel, or steer to cancel it. Docking inside an island's ring reveals an **Explore** prompt; **E** opens nearby content without starting another journey.

The content drawer is non-modal: top navigation stays accessible while reading. Close or **Escape** returns focus to the triggering control. Keyboard input inside the drawer is reserved for reading. Closing the drawer leaves scanner travel running. Reset clears navigation, content, and proximity.

Pause cancels scanner travel at the current position. Category navigation while paused or with reduced motion places the boat/camera at the safe destination immediately without resuming animation. If WebGL is unavailable, the same category navigation and content remain usable. All entries remain clearly marked placeholders in the separate content file. The boat model and all new art are generated from original geometry in this repository, with no downloaded model or texture assets. See [artwork provenance](ASSETS.md). A fixed pool supplies stern wake, split bow foam, and outer-turn wash, with contact strength tied to the active swell encounter; pause freezes it and reset/instant travel clears it. Reduced motion suppresses foam and added wave drift/speed pitch/turn heel even when sailing is explicitly resumed. While sailing freely, wave slopes add a gentle bounded drift; thrust, rudder, brake, and collision limits retain authority. Scanner arrivals stay horizontally alongside their island while reading, until helm input releases the hold. Hull buoyancy continues to follow the same water surface.

See [PLAN.md](PLAN.md), the canonical [to-do list](WEBSITE_TODO.md), and the per-task `plans/WEB-NNN/plan.md` files. WEB-010 adds stronger boat–wave coupling; stop for sailing-feel review before the offshore storm boundary in WEB-011.


## Verification and VM graphics

Phase 6 passes 52 native tests plus source-browser checks for wave-force timing, scanner mooring and handoff, actual hull pose/geometry, contact response, wake lifecycle, and disposal. Production and public browser suites cover six viewport sizes, scanner travel and cancellation, content/focus, real multi-touch, pause/reset/reduced motion, and WebGL fallback. Renderer counts and software-VM frame timings are recorded in [artifacts/phase6/VERIFICATION.md](artifacts/phase6/VERIFICATION.md). Earlier phase evidence is retained as history.

See [Phase 1 verification](artifacts/phase1/VERIFICATION.md) and its desktop/mobile screenshots. The production scene passed browser checks in Chromium 151 using SwiftShader software rendering. The Codex embedded browser in this VirtualBox guest failed WebGL context creation through Mesa; it correctly displays the fallback instead of the scene. Open the preview in a browser with working WebGL2 to review live motion. No browser or VM graphics settings were changed.

The screenshot tests cover mobile layouts, not performance on physical mobile hardware. No DNS or certificate settings were changed during publication.
