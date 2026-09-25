# WEB-020 — Auto-trim assist and manual trim rewards

## Request and scheduling

The user requested a future sailing-feel pass with two related goals: while
turning, the boat should auto-trim into roughly 70–80% of available sail
efficiency; a visitor who finds and holds the ideal manual trim should receive
a noticeable but bounded speed surge, white foam, and wind-rush sound. This is
planning only. WEB-015 translucent drawers remains the next selected task and
WEB-016 local harbours follows it. Do not implement WEB-020 until it is
explicitly selected for a review-gated phase.

WEB-012/014/018 are completed history. The current controls are A/D (or left /
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
trim remains authoritative while the selected keyboard/touch trim control is held. Accurate manual
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
3. Apply the assist through the existing sail target/smoothing API. A held
   trim command cancels assist immediately; releasing the command retains the
   chosen manual angle for a short, readable handoff before assist may resume
   on the next meaningful turn. No abrupt boom snap, force discontinuity, or
   input lockout is allowed.
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

- `src/world/vessel/sailResponse.ts` owns the efficiency/assist calculation
  and named bounds. `kinematics.ts` owns any bounded manual boost and retains
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
   count, and input state at 30/60/120 Hz.
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
