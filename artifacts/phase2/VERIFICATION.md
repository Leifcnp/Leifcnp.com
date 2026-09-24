# Phase 2 verification — 2026-09-24

## Delivered slice

Four mock landmarks (Chartroom, Shipyard, Logbook, Signal Cove), distinct primitive landforms, dashed docking rings, and static category labels on the existing animated water. Island coordinates, collision/docking radii, palettes, and content IDs are data in `src/content/islands.ts`; copy remains in `src/content/portfolio.ts`.

No boat, proximity action, category navigation, content drawer, or autopilot is implemented. Review this island layout before Phase 3.

## Code and build checks

- `pnpm test`: all eight individual tests pass under Node 24.19.0. They check valid mock data; rejection of duplicate IDs, overlapping zones, invalid radii/bounds, wrong-category references, and duplicate content; every land vertex staying inside its collision radius; exact docking-ring radii/positions/anchor IDs; and complete, idempotent geometry/material disposal.
- `pnpm run build`: strict TypeScript check and Vite 7.3.6 production build pass. Dependencies and lockfile are unchanged in this phase.
- `git diff --check`: clean. Generated output is rebuilt, not hand edited.
- `docs/CNAME` remains `leifcnp.com`; `.nojekyll` exists, asset references resolve, and stale Hugo routes are absent. [Asset sizes and hashes](build-assets.json) describe the reviewed output.

## Browser checks

Chromium 151 with SwiftShader tested the production preview at `http://127.0.0.1:4173/`. [Raw results](checks.json) and captures are in this directory.

- Desktop 1440×900, phone 390×844, small phone 320×568, tall phone 360×915, landscape 844×390, and wide 2560×1080: all four labels visible, no label-to-label/header/legend overlap, no horizontal overflow, full-size canvas, and a motion button at least 44px high.
- Visual review: distinct landforms and rings; labels below land; water fills tall portrait frames. Camera uses actual per-island bounds and remains fixed/isometric. Chartroom spacing keeps its label clear of Logbook on small screens.
- Pixel comparisons: water changes while animated, freezes when paused, and resumes through keyboard Enter.
- Reduced motion starts still; explicit Resume works.
- Supported WebGL rendering emits no console errors or uncaught page errors.
- Simulated unavailable WebGL displays all four island names/categories, hides projected labels, and disables motion control.

The larger water footprint uses the same 76 segments and 11,552 triangles as Phase 1. Initial QA exposed label obstruction, vertical-inset direction, camera near-plane clipping, and finite water corners; these were fixed before release. A VM screenshot timed out while checking animated wide-screen reduced motion; that behavioral check now runs at a phone size, with wide-screen layout still tested separately.

## Limits and publication

These checks cover browser behavior and mobile viewport layout, not physical phone GPU performance. The embedded VM browser's graphics limitation and the outstanding HTTPS hostname mismatch remain recorded in WEB-001 and the Phase 1 verification. Test using the explicit HTTP URL; no DNS, registrar, or certificate settings changed.

Application commit `fa2e9ecb8cd46418b0277cbfe6456ac6a8abc5ed` was pushed to `origin/master`. [Pages run 36062066091](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36062066091) completed successfully for that exact SHA. The existing `master` / `docs/` publishing path and custom domain are unchanged.

The public [HTTP site](http://leifcnp.com/) returned HTTP 200. Its HTML, JavaScript, CSS, and favicon match the reviewed local build byte for byte, with expected MIME types; see [public asset evidence](public-assets.json).

The same six-viewport browser suite also passed against the public URL, including motion, keyboard resume, reduced motion, and unavailable-WebGL behavior. See [public browser results](public-checks.json). WEB-005 is complete; Phase 3 awaits user review.
