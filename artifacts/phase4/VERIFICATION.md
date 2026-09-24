# Phase 4 verification — 2026-09-24

## Result and scope

Phase 4 is implemented and locally verified. Publication is the remaining release step. Three Luna agents supplied pure navigation/proximity, the scene adapter, and the accessible content interface. Root reviewed the contracts, consolidated the scene onto the tested navigation modules, corrected responsive layering and proximity/focus edge cases, and verified the integrated result.

The published candidate adds four persistent category buttons, immediate mock content in a non-modal drawer, docking prompts with E/Explore, and safe interruptible scanner travel. The existing primitive vessel, islands, wave sampling, physics, and isometric camera remain. Final sailboat geometry, island details, and wake are still Phase 5.

## Automated and browser checks

- `pnpm test`: **40 individual tests passed**, across seven test files. New checks cover every island pair, world-edge starts, independently measured segment clearance, collision-boundary starts, docking annuli, blocked/invalid routes, cancellation/replacement, malformed/stationary scanner routes, and proximity hysteresis.
- `pnpm run build`: strict TypeScript and Vite 7.3.6 production build passed. No dependencies changed. The existing large-bundle warning remains: Three.js and application JavaScript total about 528 kB minified / 138 kB gzip. It is a warning, not a failed build.
- Production Chromium checks at 1440×900, 390×844, 320×568, 360×915, 844×390, and 2560×1080: full canvas coverage, no document overflow, helm clear of vessel, drawer separate from navigation, visible controls at least 44px, and pointer hit testing for every visible button. Screenshot pairs record the closed world and open drawer.
- All four category/content mappings, immediate content during travel, repeated navigation, manual cancellation, arrival prompts, E/Explore, reset, managed initial/return focus, and keyboard access to the persistent navigation passed.
- Real CDP two-finger touch still drives Forward + Turn right, and touch category selection opens content. Drawer reading keys do not steer. Reduced motion selects a destination immediately and keeps the scene paused. WebGL failure preserves all four content paths. Supported WebGL runs report no script/console errors.
- A source scene fixture checks real vessel state and camera output: paused/instant arrival, intermediate animated positions, replacement, cancellation, zero arrival velocity, safe annuli, invalid-route failure, invalid replacement stopping previous travel, simulated hidden-document suspension without catch-up, reset, and repeated disposal. Every sampled position respects hull clearance and finite bounds.
- A source HUD fixture checks long content scrolling with a stationary Close control, text-safe content rendering, changed proximity while reading, focus fallback when a prompt disappears, scroll reset on new content, and cleanup of pending focus/reading state.

## Evidence

- [Production browser checks](checks.json)
- [Scene lifecycle checks](world-checks.json)
- [Long-content and focus checks](hud-checks.json)
- [Build asset hashes](build-assets.json)
- [Desktop drawer](desktop-drawer.png), [small mobile drawer](small-drawer.png), [landscape drawer](landscape-drawer.png), [WebGL fallback](fallback.png)

## Release and limits

The existing GitHub Pages path remains `master` → tracked `docs/`. Vite regenerated output; `public/CNAME`, `docs/CNAME` (`leifcnp.com`) and `.nojekyll` remain intact. No Hugo files, domain settings, or DNS changes are part of this phase. Exact-SHA Pages status and public asset comparisons will be recorded after the push.

Browser verification used Chromium 151 with SwiftShader in the Ubuntu VM. Mobile viewport and touch checks do not establish physical phone GPU performance. The pre-existing HTTPS certificate mismatch remains WEB-001; external testing uses the explicit HTTP URL. Mock content and primitive geometry are intentional. Stop for Phase 4 interaction review before Phase 5.
