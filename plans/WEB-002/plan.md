# WEB-002 — Vite, TypeScript, and Three.js replacement scaffold

## Goal

Replace the legacy Hugo site with a small, maintainable Vite + TypeScript + Three.js application that can be published by GitHub Pages. Phase 1 owns the runtime shell and deployment shape; future phases add world features without coupling content to rendering.

## Dependencies

- User authorization to retire the legacy Hugo website, which is present in the current request.
- Node.js/npm available locally; inspect existing repository files and any package-manager constraints before installing.
- WEB-001 remains a separate investigation and does not gate local scaffolding. Preserve the user’s confirmed custom domain in the first generated output.

## Scope and exclusions

In scope: Vite project configuration, TypeScript strictness, Three.js dependency, `src/main.ts`, `src/styles.css`, the Phase 1 world module, a separate placeholder content module, and GitHub Pages output in tracked `docs/` with `public/CNAME` containing `leifcnp.com` and `public/.nojekyll`.

The Phase 1 DOM may contain a small site identity and pause control. Exclude islands, vessel physics, HUD navigation, drawers, scanner autopilot, project/resume presentation, final art, and real personal content. Do not add a framework when a direct Three.js integration is sufficient.

## Steps

1. Inventory the legacy Hugo source and generated files, preserve any user assets that are intentionally needed, then remove the obsolete entry points from the working tree. Keep the former version recoverable in Git history and avoid editing generated output by hand.
2. Add `package.json` scripts for `dev`, `build`, `preview`, and a strict type check; select one lockfile and keep dependency versions pinned by the package manager.
3. Configure Vite with `root` at the repository root, `build.outDir` as `docs`, `emptyOutDir: true`, and a base path compatible with the custom-domain deployment. Copy `public/` assets into `docs/`; use `public/CNAME` and `public/.nojekyll` so GitHub Pages preserves the custom domain and serves the generated tree directly.
4. Create the application entry point that owns the canvas container, minimal identity/pause DOM, resize lifecycle, and disposal. Keep rendering concerns in `src/world/createWaterWorld.ts`.
5. Add `src/content/portfolio.ts` containing typed mock entries and media links for later phases. Importing it in Phase 1 must not render islands or show a content drawer.
6. Update repository-local setup/build/preview guidance only where needed after the scaffold is runnable; do not update the canonical TODO from this sub-plan.

## Module boundaries and APIs

- `src/main.ts`: browser bootstrap, DOM shell, resize and pause wiring; no scene construction details.
- `src/world/createWaterWorld.ts`: the only Phase 1 scene factory; exports `createWaterWorld(container, options?)` and returns `{ setPaused(paused: boolean): void; dispose(): void }`.
- `src/world/createWaterWorld.ts`: Phase 1 scene factory and current exported deterministic `sampleWaterHeight` function; a future extraction to `waves.ts` is optional and must preserve the sampler contract.
- `src/content/portfolio.ts`: typed, decoupled placeholder content; no Three.js imports.
- `src/styles.css`: canvas/layout and minimal identity/pause styling; no Phase 4 HUD styles.
- `public/CNAME`, `public/.nojekyll`: deployment inputs copied to `docs/` by Vite.

## Acceptance checks

- `npm run typecheck` and `npm run build` succeed from a clean install.
- The generated `docs/index.html` loads the bundled application; `docs/CNAME` is exactly `leifcnp.com` and `docs/.nojekyll` exists.
- `npm run dev` or `npm run preview` displays a full-window canvas and minimal identity/pause control without console errors.
- No Hugo theme, template, or runtime is required to run the new site.
- Content remains in a separate typed module and is not hard-coded into scene geometry.
- Phase 1 exclusions remain visibly absent: no islands, vessel, HUD links, drawer, or autopilot.

## Risks and alternatives

- GitHub Pages project-site paths differ from a custom-domain root. Keep Vite `base` configurable and let WEB-001 determine any later canonical-host alignment; do not guess a domain migration here.
- Vite’s default empty output can remove tracked files in `docs`; verify `CNAME` and `.nojekyll` are public inputs before building, and review the diff immediately afterward.
- A framework could simplify UI later, but direct Three.js keeps ownership of render-loop and disposal mechanics clear for this deliberately ground-up build.
- Removing the legacy tree may remove useful content; preserve source history and the pre-removal inventory before deletion. The 2026-09-24 implementation completed this step; the former version is recoverable at Git commit `863b788`.

## Deliverables

- Runnable Vite + TypeScript + Three.js scaffold.
- Tracked GitHub Pages output generated in `docs/` with custom-domain metadata.
- Typed placeholder content module and minimal Phase 1 DOM shell.

## Review gate

After WEB-002 and WEB-003 land, run WEB-004 checks and present only Phase 1 for review. Stop before adding any Phase 2 island or Phase 3 vessel behavior.

## Implementation status

Implemented and verified on 2026-09-24. Frozen-lockfile install (including a fresh temporary source tree), type check, and production build passed. CNAME/static output and legacy removal were verified after the archival snapshot. The user may authorize the reviewed Phase 1 output for GitHub Pages external testing; Phase 2 still awaits user review. See [Phase 1 verification](../../artifacts/phase1/VERIFICATION.md).
