# Sailing portfolio — delivery plan

## Current delivery

**Phase 12 is published and verified: WEB-021 stronger reach heel, shallow rail wash and bow spray.**
The user accepted proceeding after Phase 11 on 2026-09-25. Luna agents own
pose/contact, a shared bounded spray pool, and independent contact measurements;
root integrated, visually reviewed, verified and published the phase. See
[Phase 12 evidence](artifacts/phase12/VERIFICATION.md). Await user review.

Target readable 15–20° heel on loaded reaches, mirrored smoothly across tacks.
A shallow leeward rail dip may wet the outer margin while the central working
deck, cockpit and mast stay visible. Original spray starts at actual transformed
hull/water encounters and drifts with the existing wind. Preserve Phase 11
steering/trim/boost, shared waves/storm, safe scanner routes and motion controls.
Stop after this phase for review; harbours/zoom and wind streams remain deferred.

Phase 11 is preserved in [its verification record](artifacts/phase11/VERIFICATION.md).

Phase 2 remains recorded in its [verification record](artifacts/phase2/VERIFICATION.md).

The canonical status record is [WEBSITE_TODO.md](WEBSITE_TODO.md). Each task has a detailed `plan.md` below. Future phases are designed now and implemented only after review of their predecessor.

## Architecture and decisions

- **Vite + TypeScript + Three.js**, with ordinary semantic DOM for interface elements. This keeps the rendering loop and later boat mechanics explicit while allowing an accessible scanner interface independent of WebGL.
- **Orthographic isometric camera**, looking down the equal X/Y/Z diagonal. This produces a consistent map-like world scale. Perspective is a reviewable alternative if the user prefers depth foreshortening.
- **Procedural faceted water** with deterministic wave sampling. Hull buoyancy, crest accents, and wake share the visible wave model.
- **Decoupled mock content** under `src/content/`; future islands reference stable category/content IDs. Resume entries, projects, writing, and media do not belong in geometry or rendering code.
- **Tracked static output** remains in `docs/` for the existing GitHub Pages workflow. `public/CNAME` preserves `leifcnp.com`; relative asset URLs support the custom domain and project-path previews. No DNS changes.
- **Legacy site removed from the working tree** on 2026-09-24 after archival verification. The former source, theme checkout, configuration, deploy script, résumé, and generated pages remain recoverable in Git history at commit `863b788`; none are inputs to Vite or GitHub Pages.
- **Accessible motion**: gentle animation, pause/resume, reduced-motion preference, hidden-tab suspension, and a readable fallback if WebGL is unavailable. The Phase 4 navigation remains usable independently of boat controls.

## Publishing boundary

GitHub Pages consumes the tracked `docs/` directory from `master`. The authorized WEB-021 release sequence is: build with Vite, inspect the generated output and custom-domain metadata, run the production preview, then commit and push the reviewed result. Do not add Hugo setup or deployment steps. Remote publication is not considered complete until the external URL is checked; stop for sailing-feel review before another backlog phase.

## Work packages and review gates

| Task | Phase | Deliverable | Depends on | Detailed plan |
| --- | --- | --- | --- | --- |
| WEB-001 | Separate backlog | Investigate domain/HTTPS observations | Explicit investigation request | [plan](plans/WEB-001/plan.md) |
| WEB-002 | 1 | New app scaffold, content separation, Pages build | Repository audit | [plan](plans/WEB-002/plan.md) |
| WEB-003 | 1 | Empty animated water and isometric camera | WEB-002 interface contract | [plan](plans/WEB-003/plan.md) |
| WEB-004 | 1 | Integration, verification, runnable handoff | WEB-002 + WEB-003 | [plan](plans/WEB-004/plan.md) |
| WEB-009 | 1 release | Remove obsolete Hugo tree and publish reviewed Phase 1 for external testing | Phase 1 verification and explicit release authorization | [plan](plans/WEB-009/plan.md) |
| WEB-005 | 2 | Mock islands, landmasses, docking zones | User review of Phase 1 | [plan](plans/WEB-005/plan.md) |
| WEB-006 | 3 | Primitive vessel, steering, buoyancy, tracking | User review of Phase 2 | [plan](plans/WEB-006/plan.md) |
| WEB-007 | 4 | Proximity, persistent HUD, drawer, scanner autopilot | User review of Phase 3 | [plan](plans/WEB-007/plan.md) |
| WEB-008 | 5 | Sailboat, landmarks, wake and visual polish | Approved after Phase 4 | [plan](plans/WEB-008/plan.md) |
| WEB-010 | Follow-up | Stronger boat/wave coupling and contact | Phase 5 visual review | [plan](plans/WEB-010/plan.md) |
| WEB-011 | Published Phase 8 | Offshore storm and inward recovery | Accepted WEB-013 | [plan](plans/WEB-011/plan.md) |
| WEB-012 | Published Phase 9 | Wind propulsion, mainsail trim, tacking | Accepted WEB-011 | [plan](plans/WEB-012/plan.md) |
| WEB-013 | Published Phase 7 | Clearly moving waves, continuous wake, and stronger hull response | User reprioritized before WEB-011; compare WEB-010 baseline | [plan](plans/WEB-013/plan.md) |
| WEB-014 | Published Phase 9 | Tighter turns and harbour manoeuvring | Existing queue; coordinate WEB-012 | [plan](plans/WEB-014/plan.md) |
| WEB-015 | Published Phase 10 | Translucent content drawers | Existing queue and readability review | [plan](plans/WEB-015/plan.md) |
| WEB-016 | Deferred for boat feel | Manual-arrival zoom and submenu harbours | Existing queue and one-island prototype review | [plan](plans/WEB-016/plan.md) |
| WEB-018 | Published Phase 9 | Visible wind-driven heel | WEB-012 sail response | [plan](plans/WEB-018/plan.md) |
| WEB-017 | Low priority | Varied incoming wave sets with one prevailing direction | Current queue and review gates | [plan](plans/WEB-017/plan.md) |
| WEB-019 | Backlog | Flags, translucent wind streams and wind-carried spray | Existing wind field; coordinate WEB-017 | [plan](plans/WEB-019/plan.md) |
| WEB-020 | Published Phase 11 | Auto-trim with manual sweet-spot speed, foam and sound reward | Existing wind sailing; coordinate WEB-019/WEB-021 | [plan](plans/WEB-020/plan.md) |
| WEB-021 | Published Phase 12 | Stronger reach heel, rail dip and bow spray | Published WEB-018; coordinate WEB-019 | [plan](plans/WEB-021/plan.md) |
| WEB-022 | Backlog | Wave interaction with islands and shorelines | Shared wave field and island geometry review | [plan](plans/WEB-022/plan.md) |

## Team and integration ownership

- Planning/integration lead: maintain canonical tasks and this plan, preserve repository history, integrate, inspect browser output, and enforce the phase boundary.
- Luna physics agent: pure heel/load response, transformed rail/deck/bow contact, vessel pose and contact tests.
- Luna audit agent: independent baseline and final contact measurements across real sailing scenarios.
- Luna feedback agent: one reusable contact-driven bow/rail spray pool, deterministic lifecycle and effects tests.
- Root: world integration, queue/docs, quantitative sailing and browser checks, release verification.
- Agents share a checkout with explicit file ownership. Dependencies are coordinated through a small scene lifecycle API; avoid parallel edits to the same files.

## Phase 1 completion evidence

1. Reproducible install from a lockfile; type check and production build succeed.
2. Dev and built previews load. Inspect both desktop and narrow layouts for clipping or overflow.
3. Water moves gently and visibly, pause holds it still, resume continues smoothly, reduced motion starts still, and unavailable WebGL produces useful text.
4. Fixed camera uses an isometric diagonal with proportional resize behavior. No later-phase objects or mechanics exist.
5. Generated `docs/` contains only the new app plus intended public assets, includes the unchanged CNAME, and has no stale Hugo pages.
6. Review source changes and generated output; record actual results and limitations in WEB-004's plan and to-do entry. Provide a local review URL and commands. **Stop before Phase 2.**

## Change discipline

Suggestions from agents are evaluated against the current phase's acceptance criteria. WEB-021 improves hull heel and water contact while preserving shared waves/storm, wind sailing, content access, safe assisted scanner routes and custom artwork. Stop for Phase 12 heel/contact review before another backlog phase. No all-in-one templates, remote content services, model downloads, analytics, or backend are needed for this prototype.


## Brainstorming intake — 2026-09-24

The user explicitly requested saving WEB-012–WEB-016 for future work without jumping the current queue. The original queue placed WEB-011 next; the subsequent override below selects WEB-013 first. These entries are planning records, not authorization to implement them immediately. Continue using Luna sub-agents for bounded implementation/planning tasks with explicit file ownership; retain root integration and one-phase review gates.


Priority override: the user subsequently selected WEB-013 to run next because wave interaction was not clear. This overrides the earlier brainstorm queue only for waves/wake; all other brainstorm entries remain Backlog. The Luna team remains responsible for bounded implementation slices and root integrates/reviews/publishes.


Phase 8 authorization: after accepting the new swells, the user requested the next obvious step at root discretion. WEB-011 is selected. WEB-017 is saved as low priority and does not change this release.

Phase 9 authorization: the user requested the next phase after storm publication. WEB-012 replaces manual thrust with wind and trim; scanner access remains assisted.

Phase 10 authorization: user requested the next task after saving new sailing ideas; root selected WEB-015. WEB-020/WEB-021 and expanded WEB-019 remain Backlog.

Priority update (2026-09-25): User deferred harbours/zoom and requested a review of boat-feel todos. Recommend WEB-020 first; WEB-021, WEB-019, WEB-017 and WEB-022 remain related backlog work. No new phase started.

Phase 11 authorization (2026-09-25): User accepted WEB-020. Complete one assist/control/feedback phase and stop; WEB-016 remains deferred.

Phase 12 authorization (2026-09-25): User requested the next task after Phase 11. WEB-021 is selected; preserve the deferred harbour/zoom boundary and stop for review after publishing.

Phase 12 release (2026-09-25): `d7dac1c`, exact-SHA Pages and matching public assets verified; public desktop/mobile checks pass. WEB-021 is Done. Stop for review before WEB-019 or other backlog work.
