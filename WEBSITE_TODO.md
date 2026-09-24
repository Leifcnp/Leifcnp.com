# Website to-do list

Persistent website tasks. See [AGENTS.md](AGENTS.md) for access information and task-management rules.

Use `- [ ] WEB-NNN — Description` for unfinished tasks and `- [x]` for completed tasks. Each entry includes acceptance criteria; add progress, blockers, and a next step as needed. Done entries retain their completion date and verification evidence.

## Backlog

- [ ] WEB-001 — Investigate HTTPS, www, and custom-domain configuration with GoDaddy and GitHub Pages.
  - Context: On 2026-09-16, the user confirmed `http://leifcnp.com/` works in their browser and said GoDaddy is already set up. The repository sets `baseURL` to `https://www.leifcnp.com/`, while `docs/CNAME` contains `leifcnp.com`. Earlier restricted-environment curl checks failed DNS resolution for both hostnames and web fetches failed; this does not prove HTTPS or www is broken.
  - Acceptance criteria: Document observed DNS records, GitHub Pages custom-domain and HTTPS settings, and browser/HTTP results for HTTP and HTTPS on both hostnames from an environment with working DNS. Identify the intended canonical URL and any required alignment of redirects, `baseURL`, and `docs/CNAME`, recording remaining uncertainties and proposed changes.
  - Next step: When investigation is requested, inspect available GoDaddy DNS and GitHub Pages settings and verify all four URL variants. Keep this task to investigation; do not change DNS, domain, or site configuration as part of adding it to the list.
  - Rebuild note (2026-09-24): Hugo configuration is now available only in Git history (commit `863b788`). The new app preserves `leifcnp.com` in `public/CNAME` and uses relative asset URLs.
  - Deployment observation (2026-09-24): An unrestricted request to `http://leifcnp.com/` returned HTTP 200 from GitHub Pages. A verified TLS request to `https://leifcnp.com/` failed because the certificate did not match the hostname. Public Actions/deployment history confirms the `master` branch and `github-pages` environment. Pages settings require authenticated access; GoDaddy settings and the full hostname/redirect investigation remain outstanding. No DNS or certificate settings changed.
  - Plan: [plans/WEB-001/plan.md](plans/WEB-001/plan.md).


- [ ] WEB-011 — Add an offshore storm boundary that pushes the boat back toward the play area.
  - Requested (2026-09-24): A storm area outside the screen with darker, rougher water and waves that push the boat inward.
  - Acceptance criteria: The ordinary starting view stays calm; approaching the offshore perimeter gradually reveals darker storm water and larger waves. The storm applies a smooth inward force that returns the boat toward playable water without teleporting, trapping it, or breaking controls/camera. Keep island routes inside the calm region, retain a final finite-world safety boundary, and verify transitions, mobile cost, pause/reset, and reduced motion.
  - Progress: Backlog after WEB-010 so storm visuals and boat forces share one wave model. No storm implementation in Phase 5.
  - Next step: After the stronger boat/water coupling is reviewed, choose storm bounds from the camera footprint and playable world, prototype a gradual storm band, and verify inward recovery across headings and speeds.
  - Plan: [plans/WEB-011/plan.md](plans/WEB-011/plan.md).

## In progress

- [ ] WEB-010 — Deepen the boat’s physical and visible interaction with waves.
  - Requested (2026-09-24): “more wave/water interaction between the boat and the water.” This is a follow-up to Phase 5’s baseline wake/foam, not a prerequisite for that release.
  - Acceptance criteria: The hull visibly meets the sampled water and responds coherently to swell, speed, and turns. Add bounded wave-driven movement/response and contact effects without unpredictable steering, land penetration, or mismatch between visual water and the boat. Tune keyboard/touch feel, scanner handoff, pause/reset, reduced motion, and mobile cost together; preserve deterministic finite state.
  - Authorization (2026-09-24): User accepted the published Phase 5 and requested “lets go to the next level”; proceed with WEB-010 and the established external-testing release workflow.
  - Progress: Luna agents are implementing shared wave forces, bounded hull response, and pooled contact effects; root owns simulation integration, regression verification, and publishing.
  - Next step: Integrate fixed-step wave forcing and lifecycle behavior, verify steering/collisions/scanner/reduced motion, review desktop/mobile visuals, and publish for review before WEB-011.
  - Plan: [plans/WEB-010/plan.md](plans/WEB-010/plan.md).


## Blocked

No blocked tasks.

## Done

- [x] WEB-008 — Phase 5: replace the test block with a sailboat and add island details, wake, and polish.
  - Acceptance criteria: A coherent stylized low-poly sailboat replaces the block without changing controls. Primitive docks and beacons identify islands. Wake/foam reacts to movement and remains bounded in cost. Desktop/mobile visuals, motion preferences, readability, and interaction regressions pass review.
  - Authorization (2026-09-24): User approved “go with next phase” while Phase 4 publication was being verified. Continue the established external-testing workflow.
  - Completed: 2026-09-24. Three Luna agents and root integration delivered a custom procedural sailboat, grounded docks/beacons, and a fixed 96-instance wake/foam pool. No downloaded models, textures, or third-party art assets were used; see [provenance](ASSETS.md). Application commit `57e891f` is published on `origin/master`; [Pages run 36070256359](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36070256359) succeeded for the exact SHA.
  - Verification: Forty-one native tests, strict production build, boat/landmark bounds and pose checks, pooled-effect lifecycle/disposal checks, and local/public interaction checks across six viewports passed. Observed rendering stayed within the documented geometry/draw-call budget; software-VM frame timings and physical-phone limitations are recorded. Public HTML/assets match byte for byte. See [verification](artifacts/phase5/VERIFICATION.md), [public checks](artifacts/phase5/public-checks.json), and [asset evidence](artifacts/phase5/public-assets.json).
  - Review gate: Phase 5 is live for visual/interaction review. WEB-010 stronger boat/wave coupling and WEB-011 storm water are planned follow-ups; neither was implemented in this release.
  - Plan: [plans/WEB-008/plan.md](plans/WEB-008/plan.md).

- [x] WEB-007 — Phase 4: add proximity interactions, persistent scanner HUD, content drawer, and autopilot.
  - Acceptance criteria: Entering an island zone reveals an interaction prompt. A persistent top DOM navigation reaches every category. Clicking a category immediately opens its mock content and smoothly directs the boat/camera to the destination. Drawer keyboard/focus/close behavior, repeated navigation, travel interruption, and reduced-motion behavior are verified. HUD remains accessible to scanners without boat controls.
  - Authorization (2026-09-24): User confirmed basic controls work and explicitly requested the next phase. Continue the established publish-and-review workflow.
  - Completed: 2026-09-24. Three Luna agents and root integration delivered safe scanner routes, hysteretic docking prompts, persistent category navigation, and accessible mock-content drawers. Application commit `f67cc34` is published on `origin/master`; [Pages run 36068454972](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36068454972) succeeded for that exact SHA.
  - Verification: Forty tests, strict production build, source world/HUD fixtures, and local/public interaction checks across six viewports passed. Touch, focus/scrolling, manual cancellation, reduced motion, fallback content, and safe docking are verified. Public HTML/assets match the build byte for byte. See [verification](artifacts/phase4/VERIFICATION.md), [public checks](artifacts/phase4/public-checks.json), and [asset evidence](artifacts/phase4/public-assets.json).
  - Review gate: User approved Phase 5 during publication verification. Physical phone performance remains for external testing; stronger wave interaction and storm are separately scheduled in WEB-010/WEB-011.
  - Plan: [plans/WEB-007/plan.md](plans/WEB-007/plan.md).

- [x] WEB-006 — Phase 3: add the primitive vessel, steering, wave response, and camera tracking.
  - Acceptance criteria: A simple block has an unmistakable bow; forward thrust, reverse/braking, rudder yaw, and drag respond consistently to elapsed time. Shared wave sampling drives smooth heave/pitch. The isometric camera follows smoothly. Keyboard/mobile controls, input focus, and world boundaries have defined behavior.
  - Authorization (2026-09-24): User accepted proceeding with “ok go for next” after the Phase 2 live review handoff. Continue the established external-testing workflow and stop after Phase 3.
  - Completed: 2026-09-24. Three Luna agents implemented ground-up kinematics, the primitive vessel/wave pose/follow camera, and keyboard/touch controls. Root integrated and verified the release. Application commit `8548207` is published on `origin/master`; [Pages run 36065708258](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36065708258) succeeded for that exact SHA.
  - Verification: All 25 tests and strict production build pass. Local and public browser checks cover keyboard and simultaneous real touch, six viewport sizes, pause/reset/reduced motion, clear controls, and WebGL fallback. Additional source fixtures verify input cleanup, shared-wave tilt signs, state/camera reset, and disposal. Public HTML/JS/CSS/favicon match the build byte for byte. See [verification](artifacts/phase3/VERIFICATION.md), [public checks](artifacts/phase3/public-checks.json), and [asset evidence](artifacts/phase3/public-assets.json).
  - Review gate: Phase 3 is live at `http://leifcnp.com/`. Await steering/feel review before WEB-007 proximity, scanner navigation, and content drawers. Physical mobile performance and the existing WEB-001 HTTPS issue remain outside this verification.
  - Plan: [plans/WEB-006/plan.md](plans/WEB-006/plan.md).

- [x] WEB-005 — Phase 2: add mock island data, primitive landmasses, and visible docking zones.
  - Acceptance criteria: Separate typed data defines unique names, coordinates, radius, category, and mock portfolio content. Low-poly island geometry and visible zone rings agree with those coordinates/radii. All landmarks are distinct, readable, and compatible with water sampling. No vessel or Phase 4 interface yet.
  - Authorization (2026-09-24): User confirmed the published site is up and authorized proceeding with next steps. Implement and verify Phase 2, publish it to the existing external testing site, then stop at the next phase review gate.
  - Completed: 2026-09-24. Three Luna agents implemented the island data, primitive world, and static labels; root integrated responsive framing and completed release review. Application commit `fa2e9ec` is published on `origin/master`; [Pages run 36062066091](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36062066091) completed successfully for that SHA.
  - Verification: Eight data/geometry tests and strict production build pass. Local and public Chromium checks cover six viewport sizes, motion/keyboard/reduced-motion behavior, and WebGL fallback. Public HTML, JS, CSS, and favicon match the generated output byte for byte. See [verification](artifacts/phase2/VERIFICATION.md), [public browser checks](artifacts/phase2/public-checks.json), and [public asset evidence](artifacts/phase2/public-assets.json).
  - Review gate: Phase 2 is live at `http://leifcnp.com/`. Await island-layout feedback before WEB-006 vessel mechanics. Physical phone GPU performance and the existing WEB-001 HTTPS issue remain outside this verification.
  - Plan: [plans/WEB-005/plan.md](plans/WEB-005/plan.md).

- [x] WEB-009 — Remove obsolete Hugo files and publish Phase 1 for external testing.
  - Authorization: On 2026-09-24 the user explicitly requested pushing Phase 1 to `leifcnp.com` for mobile/web testing and removing obsolete Hugo files.
  - Acceptance criteria: Remove the legacy source archive, theme reference, Hugo configuration, obsolete deployment script, and generated Hugo pages. Keep current source/plans and `leifcnp.com` custom-domain metadata. Build/type checks pass; commit and push the reviewed Phase 1 source and generated `docs/` to the existing Pages branch without forcing. Verify the exact commit's Pages deployment and public HTML/assets, and record domain/browser limitations. Phase 2 remains unimplemented.
  - Completed: 2026-09-24. Verified obsolete source against Git history and removed all legacy/archive/theme paths. Application commit `41813c8` was pushed to `origin/master`; Pages run `36057874116` completed successfully. Public HTTP HTML, JS, CSS, and favicon matched the built output; removed Hugo routes returned 404.
  - Verification: Type check/build and public Chromium desktop/mobile/motion/reduced-motion/fallback checks passed. Evidence: [deployment record](artifacts/phase1-deployment/VERIFICATION.md) and [browser checks](artifacts/phase1-deployment/checks.json). Vite development-server advisories discovered during push were addressed with Vite 7.3.6 and its allowed esbuild 0.28.2 dependency; final full and production lockfile audits both report zero vulnerabilities.
  - Remaining limitation: Use `http://leifcnp.com/` for testing while HTTPS certificate mismatch remains in WEB-001. Physical mobile GPU behavior needs external-user feedback. Phase 2 remains unimplemented.
  - Plan: [plans/WEB-009/plan.md](plans/WEB-009/plan.md).

- [x] WEB-002 — Phase 1: replace the active Hugo site with a runnable Vite, TypeScript, and Three.js foundation.
  - Acceptance criteria: Fresh locked dependency install, dev/preview/build commands, strict type checking, separate mock portfolio content, and clear README. Vite regenerates tracked `docs/`, preserves `leifcnp.com`, and removes stale generated Hugo routes. Legacy source is archived outside public assets. Existing user instruction/task history is preserved.
  - Completed: 2026-09-24. Luna foundation implemented the Vite/TypeScript/Three app, minimal DOM shell, separate typed mock content, locked dependencies, and generated Pages output. Former source is archived under `archive/hugo/`; all eight files match Git originals. Existing instruction/task history was retained.
  - Verification: Fresh frozen-lockfile installation succeeded; type check and final production build passed. Generated asset references, CNAME, .nojekyll, and removal of stale Hugo routes passed checks. Verified commands are in AGENTS.md and README.md.
  - Plan: [plans/WEB-002/plan.md](plans/WEB-002/plan.md).

- [x] WEB-003 — Phase 1: build the empty animated water field and fixed isometric camera.
  - Acceptance criteria: Ground-up low-poly/stylized water has gentle real vertex displacement. A fixed orthographic camera views the X/Z plane on an isometric diagonal; framing responds to viewport size. Water contains no islands, boats, zones, or later-phase features. Wave sampling is reusable, DPR and geometry are bounded, and motion/visibility/disposal are handled.
  - Completed: 2026-09-24. Luna scene agent implemented the empty faceted teal field, shared deterministic wave sampler, true isometric orthographic camera, capped DPR, visibility handling, resize, and disposal. Two visual revisions improved visible wave shading and removed a repeating lattice pattern.
  - Verification: Production-browser pixel checks prove animation changes, pause freezes, and resume restarts. Desktop, mobile, landscape, and wide captures were visually inspected. Reduced-motion initialization/override/change behavior passed. Scene contents and lifecycle cleanup were reviewed.
  - Plan: [plans/WEB-003/plan.md](plans/WEB-003/plan.md).

- [x] WEB-004 — Phase 1: integrate, verify, and hand off the runnable scene for review.
  - Acceptance criteria: Type checks and production build pass; browser inspection covers desktop/mobile, actual animated frames, pause/resume, reduced motion, and WebGL fallback. Generated CNAME/static assets are checked, concrete evidence and limitations are recorded, and a preview plus run instructions are provided. Stop before implementing Phase 2.
  - Completed: 2026-09-24. Integration and independent review complete; all eight per-task plans are written. User review remains the next phase gate, not authorization to publish.
  - Verification: Final build/type check and Chromium 151 software-rendered checks passed, including responsive framing, motion, keyboard resume, reduced motion, console errors, and WebGL fallback. See [verification record](artifacts/phase1/VERIFICATION.md) and [raw checks](artifacts/phase1/checks.json). The embedded VM browser cannot initialize WebGL; physical mobile GPU performance remains unmeasured.
  - Review gate: Phase 1 was delivered locally; await user review before WEB-005. Subsequent publication for external testing is tracked separately in WEB-009.
  - Plan: [plans/WEB-004/plan.md](plans/WEB-004/plan.md).
