# WEB-018 — Wind-driven heel

## Authorized scope

The user requested a heel-over effect during the active Phase 9 sailing release
on 2026-09-24. Complete it alongside WEB-012 larger single mainsail and WEB-014
tighter turns, then stop for sailing-feel review. No new external art or dependency.

## Ownership and integration

1. Luna pose agent owns `vessel/pose.ts` and pure pose tests. Add optional
   `sailPower` (0–1) and `relativeWindAngle` (radians) dynamics. Existing callers
   with no sail input retain the exact wave/turn response.
2. Luna rig agent owns `createVessel.ts`, adds `setSailLoad(power, angle)` and
   passes those fields to the pose sampler. Reuse existing per-frame pose
   smoothing, geometry, renderer lifecycle and reduced-motion suppression.
3. Root world integration passes the actual sail response power and signed
   apparent-wind angle. Scanner/moored/spilled conditions must not imply a
   loaded sail when power is zero. No independent clock or random animation.
4. Root verifies real transformed hull/deck geometry against sampled water,
   screenshots both tacks and spill recovery, and repeats combined input and
   lifecycle tests before building/publishing.

## Pose contract

Positive wind-from angle means local +X, the existing port side; positive
roll lowers −X, away from that wind. Use bounded sail power times the crosswind
component to produce roughly 12–15° of visible load heel at strong beam reach.
Direct downwind should have little heel. Combine with wave and turn roll under
an overall bound; existing exponential filtering eases the lean and recovery.
Reduced motion suppresses added heel, while ordinary buoyancy remains shared.
Pause freezes pose. Reset and instant scanner placement snap consistently.

## Acceptance and verification

- Mirrored wind directions produce mirrored load heel with no change to heading.
- Full load is clearly visible at ordinary desktop/mobile scale; power zero
  removes only sail heel, leaving wave/turn response coherent.
- Finite inputs, extreme values and maximum wave/turn/load combinations remain
  bounded. Existing zero-load fixtures retain their results.
- Actual contact checks span both tacks, calm/storm samples, tight turns and
  reduced motion; assess leeward deck/freeboard and submerged hull, not just
  centre height. Adjust bounded support only if those checks justify it.
- Browser keyboard/touch trim changes the lean; tacks pass smoothly through
  upright; pause/reset/visibility and disposal retain their contracts.
- Record evidence and limitations with Phase 9 and stop for user review.

## Integration findings

Actual contact checks were expanded to include both beam winds crossed with all
three yaw signs, plus real wind-enabled trajectories. Extreme full sail plus
turn loading in storm water needed a bounded 0.1-unit heel-related buoyancy
correction. After correction, every sampled hull crosses the waterline and
every deck frame stays above it; reduced motion and zero-load behavior remain.
See Phase 9 contact evidence for the 6,528 sampled frames.

## Completion — 2026-09-24

Application commit `b73f434` is published on `origin/master`; [Pages run 36083098095](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36083098095) succeeded for the exact SHA.

All combined Phase 9 acceptance checks are recorded in
[the verification record](../../artifacts/phase9/VERIFICATION.md). Public
HTML/assets and browser controls were verified. Stop for user review before
implementing another backlog phase.
