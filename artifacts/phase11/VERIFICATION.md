# Phase 11 — Auto-trim and the manual sweet spot

Date: 2026-09-25. Task: WEB-020.

## Delivered behavior

- WASD/arrows and matching touch directions request screen-relative headings;
  diagonals are supported. Turns use bounded rudder/yaw dynamics. Release
  removes the turn command and the vessel keeps sailing.
- First steering or Auto trim engages automatic trim, targeting 75% of power
  attainable at the current heading/velocity. Trim moves at 25°/second. The
  wind polar, no-go transition, upwind tacking, drag and collision rules remain.
- Q/E and Trim in/Ease out latch manual trim; M/Auto trim explicitly hands back
  sail control. A visible meter reports actual normalized quality. Main, boom
  and trim display all use the same angle.
- Manual quality enters the sweet spot at 90% and retains to 78%. At forward
  speed ≥1.5, 0.35 seconds in the pocket earns up to 45% extra drive, decaying
  over 1.4 seconds. A five-second cooldown plus exit/re-entry prevents repeated
  rewards for holding ideal trim. Existing maximum speeds remain enforced.
- The reward widens/brightens original pooled white foam and optionally plays
  custom synthesized wind rush. Sound is initially off, with a lazy context
  created only by an explicit Sound action. No external artwork/audio/dependency
  was introduced. Pause/hiding/reset/scan/spill clear the reward; reduced
  motion suppresses optional foam/audio, including after explicit resume.
- Scanner content, translucent drawers and route safety remain. F now explores
  the nearby island, reserving E for manual trim. Docking prompts were moved
  clear of the larger touch helm; short landscape uses the open upper-left corner.

## Verification

- Strict type check and Vite production build pass. JS: 574.55 kB / 153.13 kB
  gzip; CSS: 13.67 kB / 3.60 kB gzip. Existing >500 kB bundle warning remains.
- All 120 native cases pass (`native-tests.txt`), covering input mapping,
  normalized auto targets, manual precedence, real mid-band hysteresis,
  rearming/cooldown, reverse/no-go behavior, bounded turns, foam and audio
  lifecycle alongside all existing wave/storm/collision/navigation cases.
- `sailing-metrics.json`: twelve-second distances are 92.04 (auto), 99.63
  (ideal manual without boost) and 101.07 (manual with reward). At three
  seconds the boost fixture reaches 9.13 versus 7.93 without the reward;
  steady ideal speed remains the same after the transient surge.
- The heading fixture reaches within 5° of a 90° target in 3.31 seconds from
  speed 8 and 3.83 seconds from speed 0.6. Both consecutive auto-trim tacks
  make positive upwind progress. These obstacle-free, wave-free pure fixtures
  isolate trim/steering; world tests below include the real waves/islands.
- `world-checks.json`: real W/Q/E/M/Space actions engage assistance, enter a
  manual surge, retain manual angle across turns and explicitly restore auto.
  Integrated trajectories match at 30/60/120 Hz. Scanner reading/handoff,
  pause/hidden-tab time discard, reduced motion, and idempotent disposal pass.
  Captures show normal auto sailing and the stronger white foam during boost.
- Rendering remains 53 calls, 33,000 triangles, 39 geometries, zero textures
  in the sampled view; wake retains 96 particles and 32 history samples.
- `checks.json`: six development layouts (1440×900, 390×844, 320×568,
  360×915, 844×390, 2560×1080), all four categories, focus, 44px targets,
  drawer reading, scanner replacement/arrival, F/Explore, simultaneous real
  touch, reduced motion and WebGL fallback pass with no console/script errors.
- `audio-checks.json`: actual Chromium Web Audio has zero contexts before
  Sound, one context/source/gain after explicit enable, bounded gain ≤0.075
  during a boost and zero targets on pause/hidden/reduced motion. Rapid
  toggles settle to the last request; disposal closes once. Missing audio
  shows Sound unavailable while sailing stays functional. Native tests also
  cover a mute arriving while resume is still pending.
- Luna agents implemented separate mechanics, input/UI and feedback pieces;
  root integrated and reviewed their changes. Independent final reviews found
  and resolved slow steering, stale startup wording and sound-toggle races.

## Publication

The production-preview six-layout suite passes (`production/checks.json`).
A targeted landscape docking check covers 844/640/568px widths, ensuring the
prompt clears the boat, helm, wind display and navigation. Exact-SHA
Pages/public asset verification is pending; WEB-020 remains In progress.

## Limits and review boundary

Chromium/SwiftShader in the Ubuntu VM validates rendering and interaction,
not physical-phone GPU performance or subjective sailing/audio feel. The
Web Audio probe checks graph behavior and gain, not speaker playback quality.
No DNS/TLS settings changed; WEB-001 remains separate. Stop for user review
of this phase. Stronger reach heel, wind streams and varied wave sets remain
Backlog; harbours/zoom remain deferred.
