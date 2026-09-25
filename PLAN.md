# Sailing portfolio — delivery plan

## Current delivery

**Phase 9 is published and awaiting review.** WEB-012 wind sailing now includes
an enlarged original cambered main with no jib, WEB-014 tighter turns and
WEB-018 wind-driven heel. Three Luna agents and root integration delivered the
release. [Local/public evidence](artifacts/phase9/VERIFICATION.md) covers the
combined controls, pose, geometry, navigation and publication. Stop here for
review; WEB-015 transparent drawers, WEB-016 subharbours and low-priority
WEB-017 wave variation remain Backlog.

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

GitHub Pages consumes the tracked `docs/` directory from `master`. The authorized WEB-012 release sequence is: build with Vite, inspect the generated output and custom-domain metadata, run the production preview, then commit and push the reviewed result. Do not add Hugo setup or deployment steps. Remote publication is not considered complete until the external URL is checked; stop for wind-sailing review before another backlog phase.

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
| WEB-015 | Future brainstorm | Translucent content drawers | Existing queue and readability review | [plan](plans/WEB-015/plan.md) |
| WEB-016 | Future brainstorm | Manual-arrival zoom and submenu harbours | Existing queue and one-island prototype review | [plan](plans/WEB-016/plan.md) |
| WEB-018 | Published Phase 9 | Visible wind-driven heel | WEB-012 sail response | [plan](plans/WEB-018/plan.md) |
| WEB-017 | Low priority | Varied incoming wave sets with one prevailing direction | Current queue and review gates | [plan](plans/WEB-017/plan.md) |

## Team and integration ownership

- Planning/integration lead: maintain canonical tasks and this plan, preserve repository history, integrate, inspect browser output, and enforce the phase boundary.
- Luna wind-physics agent: pure wind/sail response, propulsion and meaningful trajectory tests.
- Luna controls/pose agent: keyboard/touch trim, wind HUD, wind-load heel and real hull contact.
- Luna custom-rig agent: larger original cambered mainsail/coral boom, no jib, geometry/lifecycle tests.
- Root: fixed-step trim and scanner integration, review, browser checks and publication.
- Agents share a checkout with explicit file ownership. Dependencies are coordinated through a small scene lifecycle API; avoid parallel edits to the same files.

## Phase 1 completion evidence

1. Reproducible install from a lockfile; type check and production build succeed.
2. Dev and built previews load. Inspect both desktop and narrow layouts for clipping or overflow.
3. Water moves gently and visibly, pause holds it still, resume continues smoothly, reduced motion starts still, and unavailable WebGL produces useful text.
4. Fixed camera uses an isometric diagonal with proportional resize behavior. No later-phase objects or mechanics exist.
5. Generated `docs/` contains only the new app plus intended public assets, includes the unchanged CNAME, and has no stale Hugo pages.
6. Review source changes and generated output; record actual results and limitations in WEB-004's plan and to-do entry. Provide a local review URL and commands. **Stop before Phase 2.**

## Change discipline

Suggestions from agents are evaluated against the current phase's acceptance criteria. WEB-012 replaces manual motor thrust with wind and mainsail trim while preserving shared waves/storm, content access, safe assisted scanner routes and custom artwork. Stop for storm review before another backlog phase. No all-in-one templates, remote content services, model downloads, analytics, or backend are needed for this prototype.


## Brainstorming intake — 2026-09-24

The user explicitly requested saving WEB-012–WEB-016 for future work without jumping the current queue. The original queue placed WEB-011 next; the subsequent override below selects WEB-013 first. These entries are planning records, not authorization to implement them immediately. Continue using Luna sub-agents for bounded implementation/planning tasks with explicit file ownership; retain root integration and one-phase review gates.


Priority override: the user subsequently selected WEB-013 to run next because wave interaction was not clear. This overrides the earlier brainstorm queue only for waves/wake; all other brainstorm entries remain Backlog. The Luna team remains responsible for bounded implementation slices and root integrates/reviews/publishes.


Phase 8 authorization: after accepting the new swells, the user requested the next obvious step at root discretion. WEB-011 is selected. WEB-017 is saved as low priority and does not change this release.

Phase 9 authorization: the user requested the next phase after storm publication. WEB-012 replaces manual thrust with wind and trim; scanner access remains assisted.
