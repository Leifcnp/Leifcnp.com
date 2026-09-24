# Phase 1 verification — 2026-09-24

## Result

Phase 1 is complete and ready for external testing. Only the empty water scene and minimal identity/motion controls are implemented. No Phase 2 islands or later navigation/mechanics are present. The initial verification snapshot recorded that nothing had been committed, pushed, or deployed; the legacy working-tree cleanup happened subsequently on 2026-09-24. This record does not claim that the current authorized remote publication has completed.

## Build and repository checks

- Node 24.19.0, pnpm 11.19.0, TypeScript 5.9.2, Vite 7.1.7, Three.js 0.179.1.
- `pnpm install --frozen-lockfile --offline` passed in the working repository and in a fresh temporary directory containing only package/config/source/public inputs. The fresh install needed command-sandbox escalation for esbuild's validation subprocess; no lockfile change was needed.
- `pnpm run typecheck` passed. Final `pnpm run build` also ran type checking and passed: 7 modules, approximately 478 kB JS / 121 kB gzip, 2.43 kB CSS.
- `git diff --check` passed.
- Every asset referenced by generated `docs/index.html` exists. Asset URLs are relative.
- `docs/CNAME` retains `leifcnp.com`; `docs/.nojekyll` exists. Old Hugo blog/category/tag routes, styles, scripts, sitemap, and personal images are absent from generated output.
- Eight legacy source/config/media files were checked byte-for-byte against Git originals after archival. On 2026-09-24, the former source, theme checkout, configuration, deploy script, résumé, and legacy generated pages were removed from the working tree. The prior version remains recoverable at Git commit `863b788`; no theme checkout or Hugo installation is required for the current site.

## Browser verification

Target: production build at `http://127.0.0.1:4173/`. Browser: Chrome for Testing 151.0.7922.34, headless Chromium with SwiftShader (`--use-angle=swiftshader`). The dev site was also inspected during integration.

| Check | Evidence |
| --- | --- |
| Water actually moves | Canvas PNG bytes differ between animated frames. |
| Pause works | Canvas PNG bytes remain identical after pause across separated captures. |
| Keyboard resume | Enter on Resume restarts changing frames. |
| Desktop | 1440 × 900; water visible, title/control readable. |
| Mobile | 390 × 844 and 320 × 568; canvas fits, no horizontal overflow, control at least 44px tall. |
| Landscape | 844 × 390; canvas fits, no overflow. |
| Wide | 2560 × 1080; water covers viewport, canvas aspect correct. |
| Reduced motion | Starts still; explicit Resume overrides initial preference; changing preference to reduce pauses a running scene. |
| Console | No uncaught page errors or console errors with supported WebGL. |
| WebGL unavailable | Test denying WebGL context creation shows readable fallback and disables the motion button. |

Raw results are in [checks.json](checks.json). Captures: [desktop](desktop.png), [mobile](mobile.png), [small](small.png), [landscape](landscape.png), [wide](wide.png), [fallback](webgl-fallback.png). The captures show the paused state so they are stable for review.

## Code review

- Camera is orthographic at `(58, 58, 58)` looking at the origin: equal components establish true isometric projection.
- Scene contains one water mesh plus lighting/background; no later-phase objects.
- Shared deterministic `sampleWaterHeight(x, z, timeSeconds)` drives actual vertex displacement and is exported for future vessel buoyancy.
- Geometry is bounded: 76 × 76 cells, 11,552 triangles, 34,656 non-indexed vertices; pixel ratio is capped at 1.75. Adjacent triangles share the same jittered grid positions, preventing cracks.
- Reviewed visibility suspension, ResizeObserver plus window resize, idempotent resource disposal, explicit motion override, bfcache-preserving pagehide handling, and Vite cleanup of scene/listeners. These lifecycle paths were code-reviewed; bfcache/GPU memory were not profiled through a prolonged stress test.

## Limits and review gate

The Codex embedded browser in this VirtualBox guest failed to create a WebGL context through Mesa (`BindToCurrentSequence failed`). Its fallback was observed directly. A separate software-rendered test browser verified the real scene; no global browser/VM security or graphics settings were changed. Live review needs a browser with working WebGL2. Physical mobile GPU performance and cross-browser GPU drivers remain unmeasured.

Visual acceptance belongs to the user. Stop here before Phase 2. Domain/HTTPS investigation WEB-001 remains in the backlog, unchanged in scope. Verify the external URL separately after the authorized Pages push; this artifact is not remote deployment evidence.
