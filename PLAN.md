# Sailing portfolio — delivery plan

## Current delivery

Deliver **Phase 1 only**: a runnable replacement website showing empty, gently animated low-poly water through a fixed isometric camera. The user authorized the rebuild and Luna implementation team on 2026-09-24, and has now authorized the reviewed Phase 1 output to be pushed for external testing. That release authorization does not skip phase reviews: stop before implementing Phase 2 and await the user's review.

The canonical status record is [WEBSITE_TODO.md](WEBSITE_TODO.md). Each task has a detailed `plan.md` below. Future phases are designed now and implemented only after review of their predecessor.

## Architecture and decisions

- **Vite + TypeScript + Three.js**, with ordinary semantic DOM for interface elements. This keeps the rendering loop and later boat mechanics explicit while allowing an accessible scanner interface independent of WebGL.
- **Orthographic isometric camera**, looking down the equal X/Y/Z diagonal. This produces a consistent map-like world scale. Perspective is a reviewable alternative if the user prefers depth foreshortening.
- **Procedural faceted water** with deterministic wave sampling. Later buoyancy must share the visible wave model instead of approximating it independently.
- **Decoupled mock content** under `src/content/`; future islands reference stable category/content IDs. Resume entries, projects, writing, and media do not belong in geometry or rendering code.
- **Tracked static output** remains in `docs/` for the existing GitHub Pages workflow. `public/CNAME` preserves `leifcnp.com`; relative asset URLs support the custom domain and project-path previews. No DNS changes.
- **Legacy site removed from the working tree** on 2026-09-24 after archival verification. The former source, theme checkout, configuration, deploy script, résumé, and generated pages remain recoverable in Git history at commit `863b788`; none are inputs to Vite or GitHub Pages.
- **Accessible motion**: gentle animation, pause/resume, reduced-motion preference, hidden-tab suspension, and a readable fallback if WebGL is unavailable. The Phase 4 navigation remains usable independently of boat controls.

## Publishing boundary

GitHub Pages consumes the tracked `docs/` directory from `master`. The authorized Phase 1 release sequence is: build with Vite, inspect the generated output and custom-domain metadata, run the production preview, then commit and push the reviewed result. Do not add Hugo setup or deployment steps. Remote publication is not considered complete until the external URL is checked; Phase 2 implementation and release remain blocked on user review.

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
| WEB-008 | 5 | Sailboat, landmarks, wake and visual polish | User review of Phase 4 | [plan](plans/WEB-008/plan.md) |

## Team and integration ownership

- Planning/integration lead: maintain canonical tasks and this plan, preserve repository history, integrate, inspect browser output, and enforce the phase boundary.
- Luna foundation agent: package setup, static build, entry point, restrained DOM shell, content data, README.
- Luna water agent: world creation, camera, water geometry, shared wave function, rendering lifecycle.
- Luna planning agent: detailed plans and alternatives for all task IDs. Once planning completes, independently review Phase 1 risks.
- Agents share a checkout with explicit file ownership. Dependencies are coordinated through a small scene lifecycle API; avoid parallel edits to the same files.

## Phase 1 completion evidence

1. Reproducible install from a lockfile; type check and production build succeed.
2. Dev and built previews load. Inspect both desktop and narrow layouts for clipping or overflow.
3. Water moves gently and visibly, pause holds it still, resume continues smoothly, reduced motion starts still, and unavailable WebGL produces useful text.
4. Fixed camera uses an isometric diagonal with proportional resize behavior. No later-phase objects or mechanics exist.
5. Generated `docs/` contains only the new app plus intended public assets, includes the unchanged CNAME, and has no stale Hugo pages.
6. Review source changes and generated output; record actual results and limitations in WEB-004's plan and to-do entry. Provide a local review URL and commands. **Stop before Phase 2.**

## Change discipline

Suggestions from agents are evaluated against the current phase's acceptance criteria. Improvements to the scene, accessibility, and build reliability may ship in Phase 1. Islands, boat physics, HUD category links, content drawers, and scanner travel stay in future plans. No all-in-one templates, remote content services, model downloads, analytics, or backend are needed for this prototype.
