# WEB-004 — Phase 1 integration, verification, and review gate

## Goal

Prove that the new scaffold and empty water world form a runnable, deployable Phase 1 slice, then stop for user review before any island or vessel work.

## Dependencies

- WEB-002 scaffold and WEB-003 water/camera implementation.
- A clean dependency install and a browser for visual inspection.

## Scope and exclusions

In scope: static type checks, production build, local preview, browser smoke checks, output metadata verification, lifecycle checks, and a concise Phase 1 handoff.

Exclude feature additions. This gate must not introduce islands, data-driven markers, vessel controls, proximity zones, HUD navigation, drawer behavior, autopilot, or polish assets.

## Steps

1. Install from the committed lockfile and run typecheck/build scripts from a clean state.
2. Inspect the generated `docs/` diff, confirm `docs/CNAME` and `docs/.nojekyll`, and ensure no legacy output or build step is being accidentally relied upon.
3. Run the production preview and inspect first load, reload, viewport resize, device-pixel-ratio behavior, pause/resume, and reduced-motion behavior.
4. Check browser console for errors, uncaught promise rejections, WebGL warnings, and repeated listener/render-loop symptoms after reload or hot module replacement.
5. Exercise keyboard access to the identity/pause control and verify focus visibility and an accessible label; confirm that no Phase 4 HUD is present.
6. Record the exact commands, browser/viewport, result, and known limitations in the task handoff. Leave future tasks planned but unimplemented.

### Planned verification matrix

- Viewports: desktop landscape, narrow mobile portrait, and a resized desktop window.
- Motion: normal preference, reduced-motion preference, manual pause/resume, hidden-tab return, and WebGL fallback.
- Lifecycle: initial load, reload, Vite hot reload, resize, and page teardown; check for duplicate canvases, active loops, and console errors.
- Output: generated asset URLs, `docs/CNAME`, `docs/.nojekyll`, and absence of stale legacy runtime dependencies.

## Module boundaries and APIs

No new runtime module is required. This gate validates `main.ts` integration with `createWaterWorld(container, { reducedMotion? })`, including `setPaused` and `dispose`, and validates the generated deployment tree.

## Acceptance checks

- Clean install, typecheck, and production build pass.
- Preview shows only empty animated water in the intended isometric orthographic framing.
- Pause, reduced-motion, resize, reload, and disposal behaviors work without console errors.
- `docs/CNAME` and `.nojekyll` survive generation and no untracked build dependency is required.
- Minimal DOM identity and pause control are keyboard-usable.
- No island, boat, HUD, drawer, proximity, or autopilot behavior has slipped into Phase 1.

## Risks and alternatives

- Browser-only rendering bugs may evade unit checks; use a repeatable preview smoke pass and record the browser used.
- GitHub Pages may apply a different base path than local preview; verify the built asset URLs and custom-domain root before publishing.
- If WebGL is unavailable in the review environment, capture the fallback result and repeat in a supported browser; do not expand scope to a second renderer.

## Deliverables

- Verification record with commands and browser observations.
- Reviewable `docs/` output and a Phase 1 handoff describing what is intentionally absent.

## Review gate

Stop here and wait for the user’s review. Phase 2 begins only after explicit acceptance or requested changes to the Phase 1 scaffold/water.

## Implementation status

Completed on 2026-09-24. The production build and browser verification matrix passed in Chromium 151 with SwiftShader. The embedded VM browser fails WebGL initialization and correctly presents the fallback; this limitation is recorded. [Verification record](../../artifacts/phase1/VERIFICATION.md) and [raw checks](../../artifacts/phase1/checks.json) contain evidence. Phase 1 is ready for the authorized external-testing push; Phase 2 remains unimplemented and still awaits user review.
