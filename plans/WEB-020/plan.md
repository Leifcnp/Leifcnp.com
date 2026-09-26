# WEB-020 — Auto-trim assist and manual trim rewards

## Request and scheduling

The user requested a future sailing-feel pass with two related goals: while
turning, the boat should auto-trim into roughly 70–80% of available sail
efficiency; a visitor who finds and holds the ideal manual trim should receive
a noticeable but bounded speed surge, white foam, and wind-rush sound. This is
active Phase 11. On 2026-09-25 the user deferred harbours/zoom, reviewed the
boat-feel queue and accepted WEB-020: “yes lets do that”. Continue the existing
verified build/publication workflow and stop for review afterward.

WEB-012/014/018 are completed history. Before Phase 11 the controls were A/D (or left /
right) for rudder and W/S (or up / down) for trim, with touch equivalents.
The user also wants simple WASD to steer directly toward a desired heading.
The first prototype must compare direct-heading WASD steering with the
current rudder scheme, choose a clear keyboard/touch contract, and provide
separate discoverable manual-trim controls if steering uses all four keys.
This does not imply W/S motor throttle or removal of upwind tacking. Do not
freeze the existing bindings at the expense of the requested simple steering.

## Goal

Make ordinary steering forgiving without removing the value of learning trim.
When a visitor steers into a new reach, a gentle assist may move the sail
toward a target that delivers 70–80% of the reachable sail efficiency. Manual
trim remains authoritative until the visitor explicitly restores auto mode. Accurate manual
trim should be the fastest and most expressive state, with matching visual and
audio feedback.

## Scope and behavior

1. Define an assist target from the existing apparent-wind response and
   `suggestedAngle`. The target must be scored by the same polar used for
   propulsion, not by a second angle heuristic. Clamp the selected efficiency
   to a named 0.70–0.80 band, with a smooth fallback when speed or apparent
   wind is too small to measure it.
2. Enter assist only when the vessel is manually steering and there is no
   active trim intent. Do not move a sail merely because the boat is idle.
   Scanner travel may use its existing assisted trim path and should not be
   relabeled as manual auto-trim.
3. Apply the assist through the existing sail target/smoothing API. Manual
   input immediately latches manual mode and release retains that angle until
   M/Auto trim is selected. Smooth automatic movement avoids boom snaps;
   manual ownership prevents assist from fighting deliberate trim.
4. Preserve the soft no-go zone. Auto-trim may optimize a reach and help a tack
   settle, but it must not create drive inside the no-go zone or steer the
   vessel. Rudder input and tacking remain the visitor's responsibility.
5. Define a manual-trim quality value from the existing response power and
   angle error. On entering the ideal pocket with manual input and nonzero forward motion,
   trigger a noticeable short, bounded surge (a capped drive bonus or drag
   reduction) with hysteresis/cooldown so key jitter cannot retrigger it. Keep the authored maximum speed and
   collision recovery contracts; a perfect trim should feel rewarding rather
   than become a new propulsion mode.
6. Tie white foam to the same quality, speed, and water-contact signals used by
   the pooled wake. Foam must fade when the sail is spilled, the vessel stops,
   reduced motion is active, or the hull is in an assisted static placement.
7. Add a restrained wind-rush cue driven by apparent wind speed and manual
   quality. Use a lazy, code-generated Web Audio source or bounded noise node;
   no downloaded sound assets are required. Creation must wait for a user
   gesture or an explicit unmute action. Pause ramps the gain to zero, reset
   clears transient state, dispose closes every node, and a browser without
   audio support keeps sailing fully functional.
8. Keep the HUD concise: identify when trim assist is active, show when manual
   trim is in the fast band, and retain the existing wind-from, no-go, and
   scanner language. Do not add a modal tutorial or hide the boat behind UI.

## Dependencies and ownership

- `src/world/vessel/sailResponse.ts` owns the sailing polar and drive bounds;
  `trimAssist.ts` owns normalized quality, smooth auto targets and boost state. `kinematics.ts` owns any bounded manual boost and retains
  no-go, speed, collision, and fixed-step contracts.
- `createWaterWorld.ts` owns steering/trim state transitions, scanner and
  mooring exclusions, and the shared fixed simulation clock.
- `vesselInput.ts`, `main.ts`, and the HUD owner define simple WASD steering and manual
  trim controls, preserving touch holds, reading focus, pause, and reset behavior. Any mapping
  change must be reviewed as an explicit interface decision.
- `createWake.ts` or a small effects helper owns pooled perfect-trim foam;
  reuse WEB-019's future wind/spray ownership instead of creating a second
  spray system.
- A focused audio helper may own Web Audio nodes and lifecycle. Root owns the
  user-gesture/unmute UI, browser fallback, and release review.
- Coordinate wave direction and seeded variation with WEB-017, flags and
  wind-carried effects with WEB-019, and the completed WEB-018 heel contract.
  Do not alter hull geometry or the current camera to make the boost readable.

## Implementation sequence

1. Capture baseline routes at idle, beam reach, broad reach, close reach, tack,
   scanner travel, and spilled wind. Record power, trim error, speed, foam
   count, and input state at 30/60/120 Hz. Also baseline rudder response,
   turning radius, acceleration/coasting and stall/tack recovery with keyboard
   and touch. WEB-014 tighter turns is completed history; assess how the new
   assist affects that tuning rather than reopening it as an unfinished task.
2. Add a pure assist/quality function with finite invalid-input behavior,
   explicit no-go handling, and deterministic partition tests. Compare its
   target against the existing suggested angle across both tacks.
3. Integrate steering-triggered assist and manual cancellation through the
   existing sail target API. Verify that an idle boat keeps its chosen trim
   and that scanner/reduced-motion placement stays instant.
4. Add the bounded perfect-trim drive cue, then connect foam and audio to the
   same quality signal. Tune each cue separately so the physics remains
   legible without requiring sound or foam.
5. Add concise HUD state and a discoverable mute/unmute affordance. Start
   silent and enable sound through the visitor’s explicit sound gesture. Test keyboard,
   simultaneous touch, focus reading, pause, visibility, reduced motion, and
   disposal before visual review.

## Acceptance and tests

- Steering with no trim intent converges toward 70–80% available efficiency
  on both tacks, with no assist while idle and immediate manual override.
- A manually near-perfect trim produces a measured, bounded speed improvement
  and stronger pooled white foam; spilling or easing away removes both cues.
- No-go sailing remains unpowered, tacking remains required for upwind progress,
  and the assist never steers or bypasses island/bound collision handling.
- Pure tests cover assist entry/exit, manual precedence, efficiency bands,
  no-go and zero-apparent-wind behavior, invalid/long frames, mirrored tacks,
  30/60/120 Hz partitioning, and maximum-speed bounds.
- Effects tests cover deterministic foam allocation/reuse, zero emission during
  pause or reduced motion, reset, hidden-tab suspension, scanner placement,
  and idempotent disposal.
- Audio tests or browser probes cover user-gesture gating, mute/unmute,
  reduced-motion suppression, pause gain ramp, and closed-node cleanup. The
  site must remain usable if Web Audio is unavailable.
- Browser review covers normal desktop/mobile camera scale, trim readability,
  both tacks, a turn with assist, perfect manual trim, spilled wind, scanner
  navigation, drawer reading, fallback content, and six supported layouts.

## Risks and review gate

Auto-trim can make steering feel like hidden autopilot, while a large boost can
make trim irrelevant. Start with a narrow assist band, short target smoothing,
and a modest bonus below the existing speed ceiling. Sound can be distracting
or blocked by browser policy, so it must be optional, gesture-gated, and fully
suppressed by reduced motion preferences. Foam must remain a contact cue, not
a particle budget expansion.

Deliver one deterministic assist/feedback candidate for sailing-feel review,
record speed and effect budgets, and stop before adding weather variation or
new control modes.

## Phase 11 implementation decision

- WASD/arrows command screen-relative heading, including diagonal combinations;
  the heading controller uses bounded rudder authority, never heading snaps.
  Q/E trim in/out, M restores auto, Space spills wind, R resets, F explores.
  Touch exposes the same directional and trim/mode actions at 44px or larger.
- Opening/reset remains still with the main eased. First steering or explicit
  Auto trim engages sailing. Thereafter automatic trim follows the wind as the
  boat turns, targeting 75% of attainable power for that heading/velocity.
- Manual trim is latched until M/Auto trim. This supersedes the earlier proposal
  to resume assist automatically after a turn: explicit ownership prevents the
  sail from fighting a visitor who is finding or holding the sweet spot.
- A stable, powered manual sweet spot earns one short surge; cooldown and
  exit/re-entry hysteresis prevent farming it by jittering keys. Spilling,
  no-go, scanner takeover, pause, hiding and reset clear transient feedback.
- Root owns `createWaterWorld.ts`; Luna physics owns pure helpers/kinematics;
  Luna controls owns input/main/CSS; Luna feedback owns wake and audio. Content,
  model geometry, wave field and island routes retain their existing contracts.
- Validate assist efficiency, speed/acceleration/coasting and heading/tacks,
  manual precedence, bounded boosts, scanner/mooring, pause/hidden/reset and
  six desktop/mobile layouts. Sound starts muted and only explicit sound input
  may create/resume its audio context; physical-device performance stays an
  external review item.

## Selected tuning and local evidence

- Auto target: 75% of the peak from the same apparent-wind polar, approached
  at 25°/second. Manual pocket enters at 90% and retains down to 78%.
- Reward: at least 1.5 forward units/second, 0.35-second dwell, up to 45% extra
  drive decaying over 1.4 seconds, then five-second cooldown and pocket re-entry.
- Screen-heading controller: gain 2.5 and yaw damping 1.0 inside the existing
  1.1 radian/second maximum yaw bound. No heading snap or new motor drive.
- Twelve-second fixture distance: auto 92.04, ideal manual 99.63, manual with
  reward 101.07 world units. Both auto-trim tacks make net upwind progress.
- Resources remain 96 pooled foam particles / 32 wake history samples; audio
  uses one lazy context, one looped noise source, low-pass filter and gain.
- Integration/production/public verification is recorded in
  [Phase 11 evidence](../../artifacts/phase11/VERIFICATION.md).
