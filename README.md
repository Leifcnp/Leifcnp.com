# Leif Pedersen — Open water

The portfolio is being rebuilt as a small Vite + TypeScript + Three.js scene. Phase 01 is intentionally spare: an isometric water field with an editorial overlay and a motion control. Content is kept in `src/content/portfolio.ts` so later islands and drawers can consume it without coupling copy to the scene.

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
pnpm run build
pnpm run preview
```

`pnpm run build` type-checks the source and writes the GitHub Pages artifact to `docs/`. `public/CNAME` and `public/.nojekyll` are copied into that output. Review the generated site with `pnpm run preview` before publishing.

The production preview normally opens at `http://localhost:4173/`. The default build uses relative asset paths and preserves the existing `leifcnp.com` custom domain. Do not edit `docs/` by hand.

## GitHub Pages publishing

The repository publishes the tracked `docs/` directory from the `master` branch. The release path is to run `pnpm run build`, inspect the generated diff and `docs/CNAME`/`docs/.nojekyll`, smoke-test with `pnpm run preview`, and then commit and push the reviewed Phase 1 output. No Hugo build, theme checkout, configuration, or deploy script is involved. A local build does not by itself authorize publication; the current external-testing push is authorized for Phase 1 only. This README does not claim that the remote deployment has completed until the hosting result is verified.

## Phase boundary and review

Only Phase 1 is implemented: empty water, actual wave displacement, a fixed isometric orthographic camera, and a small identity/motion overlay. Pause/resume works by button or the `P` key when the page body has focus. Reduced motion starts paused; an explicit Resume opts into motion. Switching a system preference back off does not override a paused scene.

Mock resume entries, projects, writing, and media are in `src/content/portfolio.ts`; they are not displayed yet.

See [PLAN.md](PLAN.md), the canonical [to-do list](WEBSITE_TODO.md), and the per-task `plans/WEB-NNN/plan.md` files. Phase 2 must wait for user review.

## Verification and VM graphics

See [Phase 1 verification](artifacts/phase1/VERIFICATION.md) and its desktop/mobile screenshots. The production scene passed browser checks in Chromium 151 using SwiftShader software rendering. The Codex embedded browser in this VirtualBox guest failed WebGL context creation through Mesa; it correctly displays the fallback instead of the scene. Open the preview in a browser with working WebGL2 to review live motion. No browser or VM graphics settings were changed.

The screenshot tests cover mobile layouts, not performance on physical mobile hardware. This record does not establish remote deployment or DNS state; verify the external URL after the authorized push.
