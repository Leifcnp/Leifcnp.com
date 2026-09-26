# Repository guide

## Project

- This repository is being rebuilt as a bespoke sailing portfolio with Vite, TypeScript, and Three.js. The user authorized replacing the Hugo website on 2026-09-24.
- Phase 5 was reviewed and the user authorized the next wave-interaction release on 2026-09-24. WEB-010 / Phase 6 is published and publicly verified: bounded wave forces, hull response, and contact effects. The user subsequently selected WEB-013 clearer waves/wake ahead of WEB-011; Phase 7 is published, publicly verified and accepted. The user then authorized the next obvious step; WEB-011 / Phase 8 offshore storm is published and publicly verified; the user then authorized WEB-012 / Phase 9 wind sailing is now published and publicly verified, including WEB-014 tighter turns, a larger cambered main without jib, and WEB-018 wind-driven heel. The user then authorized the next queued task; WEB-015 / Phase 10 translucent drawers is published and publicly verified. The user accepted WEB-020 auto-trim/manual boost as Phase 11 on 2026-09-25; it is now published and publicly verified. The user requested the next task on 2026-09-25; WEB-021 stronger heel/rail wash/bow spray is published and publicly verified as Phase 12. Harbours/zoom remain deferred. The user requested “ok next go ahead” on 2026-09-25; WEB-019 wind cues is published and publicly verified as Phase 13. Stop after the Phase 13 release for review. WEB-017 incoming-wave variation/direction is low-priority Backlog. Complete one phase, verify it, and stop for review before implementing the next phase.
- Read [PLAN.md](PLAN.md), [WEBSITE_TODO.md](WEBSITE_TODO.md), and the relevant `plans/WEB-NNN/plan.md` before work.
- Source lives in `src/`, `index.html`, and `public/`. Portfolio content belongs in a separate `src/content/` data file.
- Vite generates `docs/`, which remains tracked for GitHub Pages. Preserve `public/CNAME` (`leifcnp.com`), the generated `docs/CNAME`, and the custom-domain configuration.
- The former Hugo source, theme checkout, configuration, deploy script, résumé, and legacy generated pages were removed from the working tree on 2026-09-24 after archival verification. The prior version remains recoverable in Git history at commit `863b788`; do not reintroduce it into the new site by default.

## Website access

- User-confirmed working browser URL on 2026-09-16: [http://leifcnp.com/](http://leifcnp.com/) (HTTP, without `www`).
- The user reports that GoDaddy is already set up. This is user-provided context, not an independent DNS verification.
- The former Hugo configuration used `baseURL = "https://www.leifcnp.com/"`; that configuration was removed with the legacy working tree. The current Vite build uses relative asset paths and retains `docs/CNAME` as `leifcnp.com`.
- Earlier restricted-environment HTTP/HTTPS curl checks failed DNS resolution for both `leifcnp.com` and `www.leifcnp.com`, and web fetches failed. These results do not establish that HTTPS or `www` is broken; the user reports the non-www HTTP address open in their browser.
- External checks on 2026-09-24 observed HTTP 200 from `http://leifcnp.com/`. The authorized Phase 1 push replaced the old Hugo output; public HTML/assets matched the new build, and Pages reported success for application commit `41813c8`. Apex HTTPS failed hostname certificate verification. Public Actions/Pages evidence identifies `master` and the tracked `docs/` output as the deployment path; unauthenticated settings inspection is unavailable. Do not bypass TLS warnings or change DNS/domain settings merely to reconcile these observations; WEB-001 remains the separate investigation.
- Follow-up investigation is tracked as `WEB-001` in [WEBSITE_TODO.md](WEBSITE_TODO.md). Do not change domain, DNS, or site configuration merely to reconcile these observations.

## Website to-do list

- The canonical website to-do list is [WEBSITE_TODO.md](WEBSITE_TODO.md) at the repository root. Read it before website work.
- Interpret requests such as "add things to the website todo list" as instructions to update that file. Append requested tasks to Backlog without automatically executing them, unless the user also requests execution.
- Check all sections for duplicates before adding a task; update an existing matching task when appropriate.
- Use stable IDs in the form `WEB-001`, allocating the next unused number above the highest existing ID. Never renumber or reuse IDs.
- Keep tasks in Backlog, In progress, Blocked, or Done. Each task uses a checkbox, a concise description, and acceptance criteria. Use unchecked boxes until complete and checked boxes in Done.
- Move the same task entry as its status changes. Record progress and a concrete next step for unfinished work; for blocked work, also record the blocker and what is needed to resume.
- When resuming, read the task's acceptance criteria, progress, blocker, and next step, and confirm current repository state before continuing. Listing a task is not authorization to execute it.
- Mark a task Done only after appropriate verification; record the completion date and verification evidence. Preserve completed entries and their IDs as history.

## Working conventions

### Verified commands (2026-09-24)

- Runtime: Node 24.19.0 and pnpm 11.19.0. This VM exposes them through the bundled runtime, not the default shell PATH. Use the PATH and `PNPM_CONFIG_STORE_DIR` / `PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN` setup in README.md.
- Install: `pnpm install --frozen-lockfile`. A fresh temporary checkout-equivalent install passed against the locked packages using the local cache; the command sandbox initially blocked esbuild's subprocess, and the same install succeeded with tool escalation.
- Development: `pnpm run dev --host 127.0.0.1 --port 5173 --strictPort`.
- Type check: `pnpm run typecheck`.
- Tests: `pnpm test` (Node 24 native TypeScript; 148 individual data, geometry, wind/trim/boost, steering, audio/wake, hull-contact, storm, wave, pose, input, camera, navigation, and proximity tests). In this VM, the command sandbox can suppress child-test detail; use an authorized escalated run to confirm all individual cases execute.
- Production build: `pnpm run build` (includes type checking), generating `docs/`.
- Built-site preview: `pnpm run preview --host 127.0.0.1 --port 4173 --strictPort`.
- Local servers require permission to bind loopback through the actual Codex command sandbox; VirtualBox isolation does not grant that permission.
- Verification record: [artifacts/phase1/VERIFICATION.md](artifacts/phase1/VERIFICATION.md). Chromium software-rendered browser checks passed; the embedded browser's VM graphics driver failed WebGL initialization. Do not mistake that specific failure for a site or domain outage.
- Public release verification: [artifacts/phase1-deployment/VERIFICATION.md](artifacts/phase1-deployment/VERIFICATION.md). Real-domain browser checks cover desktop/mobile layouts, motion, keyboard, reduced motion, and WebGL fallback.
- Phase 2 verification: [artifacts/phase2/VERIFICATION.md](artifacts/phase2/VERIFICATION.md), including six viewport sizes, readable projected labels, data/geometry tests, and unchanged custom-domain metadata.
- Phase 3 verification: [artifacts/phase3/VERIFICATION.md](artifacts/phase3/VERIFICATION.md), including keyboard/multitouch, wave pose, pause/reset, camera following/coverage, and six viewport sizes.

- Phase 4 public verification: [artifacts/phase4/VERIFICATION.md](artifacts/phase4/VERIFICATION.md), including safe scanner routes, cancellation/pause, drawer focus/scrolling, six layouts, touch, and fallback content. Exact-SHA Pages, byte-identical public assets, and the public interaction suite passed.

- Phase 5 public verification: [artifacts/phase5/VERIFICATION.md](artifacts/phase5/VERIFICATION.md), including custom-geometry provenance, hull/landmark bounds, pooled wake lifecycle, and measured VM rendering counts/timings. Exact-SHA Pages, byte-identical public assets, and public interaction checks passed.

- WEB-010 / Phase 6 verification: [artifacts/phase6/VERIFICATION.md](artifacts/phase6/VERIFICATION.md), including shared wave timing/forces, real hull pose, contact effects, scanner mooring/manual release, and exact-SHA public deployment checks.

- WEB-013 / Phase 7 verification: [artifacts/phase7/VERIFICATION.md](artifacts/phase7/VERIFICATION.md), including normal-camera before/after motion, coherent hull contact, bounded curved wake, browser shader/lifecycle checks, 61 native tests, public six-layout interactions and exact-SHA deployment.

- WEB-011 / Phase 8 verification: [artifacts/phase8/VERIFICATION.md](artifacts/phase8/VERIFICATION.md), including 76 native tests, offshore recovery, shared storm hull contact, camera/route safety, bounded resources and exact-SHA/public interaction/voyage checks.

### Implementation discipline

- Build mechanics intentionally from the ground up; do not introduce an all-in-one game template.
- WEB-013 builds on WEB-010 with travelling swell shading/crest ribbons, stronger hull support, powered uphill resistance, and bounded curved wake/bow effects using the shared sampler. The custom boat geometry remains owned. Scanner arrivals are horizontally held until helm input; reduced motion suppresses added forces, dynamic pitch/heel, and contact effects. Preserve navigation/UI contracts; the published WEB-011 storm extends this shared sampler and preserves the calm central view.
- Do not edit generated files under `docs/` by hand; regenerate them with the package build command.
- Install dependencies using the checked-in package-manager lockfile; consult README.md for setup and commands.
- Verify types, production build, and local browser behavior before marking work Done. Verify motion controls, reduced motion, resize, and WebGL fallback where relevant.
- Keep local development and generated output on the Ubuntu guest filesystem. Never place credentials in source or logs.
- Keep commits focused and do not push or deploy unrelated changes.
- WEB-013 was verified and published through the existing `master` / `docs/` GitHub Pages setup with the domain preserved. The user accepted the swells and authorized WEB-011, which is now verified and published through the same workflow. WEB-020 auto-trim/manual boost is published and accepted; WEB-021 is now authorized through the same workflow. WEB-019 is now authorized as Phase 13 through the same publication workflow; stop for review afterward. A routine local build alone is not blanket authorization for unrelated future publication.

- Phase 9 / WEB-012, WEB-014 and WEB-018 verification: [artifacts/phase9/VERIFICATION.md](artifacts/phase9/VERIFICATION.md), including 101 native tests, quantitative steering, 6,528 actual hull-contact frames, keyboard/touch tacks, six local/public layouts and exact-SHA Pages/asset verification. Phase 9 was reviewed and the user authorized WEB-015 next.

- Phase 10 / WEB-015 verification: [artifacts/phase10/VERIFICATION.md](artifacts/phase10/VERIFICATION.md). For drawer work, check the strict production build, six viewport/category interactions, keyboard/touch scrolling, contrast and reduced-transparency/forced-color/WebGL fallbacks, plus actual boat visibility. No physics, model or dependency changes belong to this phase.

- Phase 11 / WEB-020 verification: [artifacts/phase11/VERIFICATION.md](artifacts/phase11/VERIFICATION.md). WASD/arrows use screen-relative target headings; Q/E trim manually, M/Auto trim restores 75% assistance, Space spills, F explores. Manual trim stays latched. Preserve normalized efficiency, no-go/tacks, bounded boost/cooldown, gesture-gated sound and existing pool/renderer budgets.

- Phase 12 / WEB-021 verification: [artifacts/phase12/VERIFICATION.md](artifacts/phase12/VERIFICATION.md). Visible hull/contact/spray sample rendered water triangles through `waterSurfaceGrid.ts`; horizontal forces retain the analytic field. Preserve 20° sail-only / 0.4-radian total heel, actual rail/deck guards, the 48-particle spray lifecycle and original boat geometry. Exact-SHA Pages, byte-identical public assets and public desktop/mobile interactions pass. Stop for review.

- Published Phase 13 / WEB-019: original true-wind breeze streams and a fixed Shipyard flag plus apparent-wind boat pennant. Reuse WEB-021 bow/rail spray; no force/wave/steering/harbour changes. Read its updated plan before editing.

- Phase 13 wind cues use true velocity for the world field/land flag and true wind minus vessel velocity for the masthead pennant. Flags trail downwind while the HUD names wind-from. `createWindStreams.ts` uses a seeded 128-unit world-periodic pattern with 32 strokes and a 44–58 radius fade before ±64 wrapping. Preserve camera-stable world positions, whole-stroke island clearance, reduced-motion static flags/hidden streams, shared clock and disposal.

- Phase 13 evidence: [artifacts/phase13/VERIFICATION.md](artifacts/phase13/VERIFICATION.md). 148 native tests, six production layouts, direction/lifecycle checks, exact-SHA Pages and matching public assets pass. Stop for user review before another backlog phase.
