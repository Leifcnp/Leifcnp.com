# Phase 9 — Wind, single mainsail, tighter turns and heel

Date: 2026-09-24. Tasks: WEB-012, WEB-014 and WEB-018.

## Delivered behavior

- Stable wind replaces manual forward/reverse thrust. W/Up trims in, S/Down
  eases out, A/D steer and Space spills wind. Released trim retains its angle;
  the wind keeps driving. A no-go transition requires tacking to travel upwind.
- The original main has a 68% larger outline, a taller mast, real low-poly camber,
  a coral boom/clew and no jib or bowsprit. It rotates leeward with the chosen
  angle. No third-party models, art, textures or dependencies were added.
- Wind loading produces up to 0.26 radians (~15°) of leeward heel. Shared wave
  and turning response remain; a bounded 0.1-unit buoyancy correction preserves
  the leeward deck under extreme combined loading. Spill/no-go/mooring remove
  the load; reduced motion suppresses added heel.
- Manual turns are tighter with smooth acceleration and release. Scanner routes
  remain explicitly labelled assisted passages with immediate content access.
  Docking holds position until manual input; paused/reduced scanner placement
  remains instant. Content and wave variation remain separate future tasks.

## Verification

- **101/101 native tests pass**, including new wind trajectories, sail geometry,
  steering, signed load heel and real transformed contact. See `native-tests.txt`.
- **Strict type check and production build pass.** Final JS is 564.08 kB,
  149.82 kB gzip; CSS 12.22 kB, 3.30 kB gzip. The existing >500 kB chunk warning
  remains; no dependency upgrades or code-splitting changes are part of this phase.
- `steering-metrics.json`: at an initial 8-unit/s cruise, full-rudder 90° time
  improves 4.50→2.43 seconds and approximate path-arc radius 22.39→12.53 units.
  At initial 0.6-unit/s speed, 90° time improves 5.23→2.95 seconds and radius
  20.20→9.57. These are changing-speed trajectories, not constant-radius circles.
- `heel-contact.json`: 4,608 static frames cover both tacks, three yaw rates,
  eight headings and calm/storm samples in loaded/spilled/reduced modes. Another
  1,920 frames exercise actual sailing, alternating hard turns and spill recovery
  through pose smoothing. Every frame checks deck clearance and hull immersion.
  Minimum loaded stress-case deck clearance is 0.0216 units; dynamic minimum
  is 0.3280. Hull contact is retained in every sampled frame.
- `helm-checks.json`: actual keyboard input trims to 45°, retains sail power after
  release, crosses a powerless no-go zone, changes tack and makes net upwind
  progress. Real simultaneous touch trims and turns; cancel/blur release held
  input. Scanner reading focus, manual takeover, paused reset and hints pass.
- `world-checks.json`: fixed 120Hz wind/trim/wave integration at 30/60/120 render
  rates, paused/hidden clocks, rig/heel freeze, reduced motion, safe mooring,
  scanner handoff, 4,542 finite collision-safe state samples, shader rendering
  and idempotent teardown. Renderer: 53 calls, 33,000 triangles, 39 geometries
  and zero textures (slightly lower than Phase 8).
- `checks.json`: production preview at 1440×900, 390×844, 320×568, 360×915,
  844×390 and 2560×1080. Scanner categories, content/focus, docking, mobile
  targets, touch, reduced motion and WebGL fallback. Screenshots retain the
  reviewed layouts and custom rig. `baseline-*` preserves the earlier flat rig.

## Publication

Application commit `b73f434` is published on `origin/master`; [Pages run 36083098095](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36083098095) succeeded for the exact SHA. Public HTTP HTML, JS, CSS and favicon match
`docs/` byte for byte (`public-assets.json`). The public six-layout interaction
suite passes (`public-checks.json`); `public-sailing.json` additionally exercises
the unmodified production bundle through real trim input, a no-go-zone tack and
spill control. Public captures are retained alongside local evidence.


## Limits and review boundary

Browser evidence uses Chromium/SwiftShader in the Ubuntu VirtualBox guest. It
verifies rendering and interaction, not physical-phone GPU performance. No DNS,
TLS or custom-domain settings changed; use http://leifcnp.com/ while the previously
recorded HTTPS hostname issue remains WEB-001. Existing geometry/foam budgets stay
bounded. Stop for review of this combined phase; WEB-015 transparent drawers,
WEB-016 submenu harbours and low-priority WEB-017 wave variation remain Backlog.
