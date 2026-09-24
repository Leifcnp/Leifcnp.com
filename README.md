# Leif Pedersen — Under way

The portfolio is being rebuilt as a small Vite + TypeScript + Three.js scene. Phase 3 adds a steerable primitive vessel, wave response, and a smoothly following isometric camera to the four-island water field. Content lives in `src/content/portfolio.ts`; `src/content/islands.ts` defines island coordinates, land and docking radii, categories, and content references independently of the renderer.

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

The repository publishes the tracked `docs/` directory from the `master` branch. The release path is to run `pnpm run build`, inspect the generated diff and `docs/CNAME`/`docs/.nojekyll`, smoke-test with `pnpm run preview`, and then commit and push the reviewed output. No Hugo build, theme checkout, configuration, or deploy script is involved. On 2026-09-24 the user approved Phase 3 after the published Phase 2 handoff; this continues the external-testing workflow. Future phases still require review.

Phase 3 is published at [http://leifcnp.com/](http://leifcnp.com/). The [Phase 3 verification](artifacts/phase3/VERIFICATION.md) records the successful Pages run, public asset comparisons, and public desktop/mobile browser checks. The earlier [Phase 1 deployment record](artifacts/phase1-deployment/VERIFICATION.md) is retained as history. Use the explicit HTTP link for now: HTTPS currently has a certificate hostname mismatch, tracked in WEB-001.

## Phase boundary and review

Phase 3 is implemented: a cream block vessel with a coral bow, forward/reverse thrust, braking, rudder steering, drag, shared-wave heave/pitch/roll, and a smooth camera follow. The camera keeps its isometric angle and follows horizontal movement; islands and labels can leave the view as you sail. Conservative collision circles keep the hull outside land and inside the playable world.

- **W / Up:** forward thrust. **S / Down:** slow down, then reverse.
- **A / Left** and **D / Right:** steer relative to the bow. The rudder reverses its effect when backing.
- **Space:** brake. Releasing thrust lets the boat coast and slow through drag.
- **Touch/mouse:** hold the labeled helm buttons; combine Forward/Reverse with a turn button using two touches.
- **R / Reset boat:** return to the starting point and clear movement; reset also works while paused.
- **Pause motion / P:** freeze water, vessel, and camera. The P shortcut works when the page body has focus.

Reduced motion starts paused with movement controls disabled; explicit Resume enables sailing. Switching a system preference back off does not override a paused scene. Losing focus or cancelling a gesture releases held controls.

The island categories are résumé (Chartroom), projects (Shipyard), writing (Logbook), and media (Signal Cove). Their rings show future interaction boundaries; they do not respond to clicks yet. Mock content is referenced and validated but will be displayed in Phase 4. The boat is deliberately a primitive placeholder until the later art phase.

See [PLAN.md](PLAN.md), the canonical [to-do list](WEBSITE_TODO.md), and the per-task `plans/WEB-NNN/plan.md` files. Stop for Phase 3 steering review before implementing proximity interactions and scanner navigation.

## Verification and VM graphics

Phase 3 checks are recorded in [artifacts/phase3/VERIFICATION.md](artifacts/phase3/VERIFICATION.md). `pnpm test` checks data, geometry, steering behavior, input intent, and camera invariants without additional test dependencies. Browser verification covers six viewport sizes, keyboard and real multi-touch input, wave pose, pause/reset/reduced motion, and the readable island fallback. [Phase 2 evidence](artifacts/phase2/VERIFICATION.md) is retained as history.

See [Phase 1 verification](artifacts/phase1/VERIFICATION.md) and its desktop/mobile screenshots. The production scene passed browser checks in Chromium 151 using SwiftShader software rendering. The Codex embedded browser in this VirtualBox guest failed WebGL context creation through Mesa; it correctly displays the fallback instead of the scene. Open the preview in a browser with working WebGL2 to review live motion. No browser or VM graphics settings were changed.

The screenshot tests cover mobile layouts, not performance on physical mobile hardware. No DNS or certificate settings were changed during publication.
