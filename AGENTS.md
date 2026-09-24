# Repository guide

## Project

- This repository is being rebuilt as a bespoke sailing portfolio with Vite, TypeScript, and Three.js. The user authorized replacing the Hugo website on 2026-09-24.
- Phase 2 (islands and docking zones) is published and verified. On 2026-09-24 the user approved the next phase; the current delivery is Phase 3 vessel mechanics, buoyancy, and camera following. Complete one phase, verify it, and stop for review before implementing the next phase.
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
- Tests: `pnpm test` (Node 24 native TypeScript; 25 individual data, geometry, vessel, input, and camera tests). In this VM, the command sandbox can suppress child-test detail; use an authorized escalated run to confirm all individual cases execute.
- Production build: `pnpm run build` (includes type checking), generating `docs/`.
- Built-site preview: `pnpm run preview --host 127.0.0.1 --port 4173 --strictPort`.
- Local servers require permission to bind loopback through the actual Codex command sandbox; VirtualBox isolation does not grant that permission.
- Verification record: [artifacts/phase1/VERIFICATION.md](artifacts/phase1/VERIFICATION.md). Chromium software-rendered browser checks passed; the embedded browser's VM graphics driver failed WebGL initialization. Do not mistake that specific failure for a site or domain outage.
- Public release verification: [artifacts/phase1-deployment/VERIFICATION.md](artifacts/phase1-deployment/VERIFICATION.md). Real-domain browser checks cover desktop/mobile layouts, motion, keyboard, reduced motion, and WebGL fallback.
- Phase 2 verification: [artifacts/phase2/VERIFICATION.md](artifacts/phase2/VERIFICATION.md), including six viewport sizes, readable projected labels, data/geometry tests, and unchanged custom-domain metadata.
- Phase 3 verification: [artifacts/phase3/VERIFICATION.md](artifacts/phase3/VERIFICATION.md), including keyboard/multitouch, wave pose, pause/reset, camera following/coverage, and six viewport sizes.

### Implementation discipline

- Build mechanics intentionally from the ground up; do not introduce an all-in-one game template.
- Use primitive geometry through Phase 4. Phase 3 adds a temporary block vessel, keyboard/touch controls, wave response, simple collision boundaries, and camera following. Keep proximity behavior, scanner navigation, content drawers, final sailboat art, and wake in their later phases.
- Do not edit generated files under `docs/` by hand; regenerate them with the package build command.
- Install dependencies using the checked-in package-manager lockfile; consult README.md for setup and commands.
- Verify types, production build, and local browser behavior before marking work Done. Verify motion controls, reduced motion, resize, and WebGL fallback where relevant.
- Keep local development and generated output on the Ubuntu guest filesystem. Never place credentials in source or logs.
- Keep commits focused and do not push or deploy unrelated changes.
- The instruction to proceed continues the published external-testing workflow: verify and publish Phase 3 through the existing `master` / `docs/` GitHub Pages setup with the domain preserved. Stop before Phase 4. A routine local build alone is not blanket authorization for unrelated future publication.
