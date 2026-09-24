# WEB-009 — Retire Hugo and publish Phase 1

## Goal and authorization

The user requested publication of the existing Phase 1 prototype on 2026-09-24 for external mobile/web testing and explicitly requested removal of obsolete Hugo files. Publish this reviewed slice using the existing GitHub Pages repository. Do not implement Phase 2 or migrate hosting.

## Scope and ownership

- Remove obsolete Hugo source/config/theme/deployment/archive files from the current tree. Git history retains the previous website at `863b788`; do not rewrite history.
- Preserve current app source, separate mock data, task/planning history, and `leifcnp.com` in public/generated CNAME.
- Refresh current setup instructions; historical verification remains factual and dated.
- Rebuild `docs/` through Vite. Never hand-edit generated output.
- Commit and push to existing `origin/master`, without force, then verify the exact commit's public Pages deployment.
- Address concrete dependency alerts discovered during the push using the smallest compatible patch. Keep runtime code and phase scope unchanged; rerun dependency audits and the build before publishing that maintenance change.
- No DNS/registrar changes, new hosting platform, new phase, or unrelated files.

## Execution steps

1. Inspect working changes, remote branch, current public response, and GitHub deployment metadata.
2. Verify legacy archived files against their Git originals before removing their known paths and empty directories.
3. Rebuild/type-check, check generated asset references/CNAME/.nojekyll, and review the complete source and deletion set.
4. Stage only the intended website deliverable, documentation, and generated output. Review staged diff/stat and whitespace. Commit with a focused message.
5. Push normally. If the branch advanced, fetch and integrate without discarding remote or user changes.
6. Follow public GitHub Actions/Pages deployment for the pushed SHA. Fetch live HTML and hashed JS/CSS/favicon, comparing bytes to the local build. Check removed Hugo routes are no longer served.
7. Run a bounded public-browser smoke check for desktop/mobile and motion if available. Existing local Phase 1 regression evidence remains in `artifacts/phase1/`.
8. Record actual deployment and limitations in the canonical to-do and a deployment verification record. Stop for external feedback before Phase 2.

## Known environment findings

- Existing remote: `git@github.com:Leifcnp/Leifcnp.com.git`, branch `master`.
- Existing successful public Pages deployment uses `master` and the `github-pages` environment.
- Before this push, `http://leifcnp.com/` returned HTTP 200 serving the old Hugo site. `https://leifcnp.com/` failed hostname verification. WEB-001 retains the domain investigation; do not bypass TLS warnings or change domain settings to hide the issue.
- The VM embedded browser cannot create WebGL, while a separate Chromium test browser with software rendering can verify the actual scene.

## Completion criteria

Hugo is absent from the active tree/build dependencies, the intended commit is on `origin/master`, Pages reports successful deployment for it, public HTTP content/assets match the build, and the user receives a usable testing URL plus the HTTPS limitation. Domain repair is tracked separately and must not be claimed complete.

## Status

Completed on 2026-09-24. Legacy paths are removed; type checking/build and reviewed staged changes passed. Application commit `41813c8` was pushed to `origin/master`, and its Pages run `36057874116` succeeded. Public HTML, JS, CSS, and favicon match the local build; obsolete routes return 404. Public Chromium desktop/mobile/motion/fallback checks passed. See [deployment verification](../../artifacts/phase1-deployment/VERIFICATION.md). HTTPS remains tracked separately in WEB-001. Phase 2 is still gated on user review.

Release maintenance: GitHub's push-time alert count did not match the current lockfile audit. The original production audit was clean; six direct Vite 7.1.7 development-server advisories were reproducible. Vite was patched within the same major to 7.3.6, with its permitted esbuild 0.28.2 dependency. Frozen-lockfile installation passed. Both final full and production audits report zero vulnerabilities; audit snapshots are saved with the deployment verification.
