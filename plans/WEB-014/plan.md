# WEB-014 — Responsive turns and future windboat compatibility

## Goal and scheduling

Make tighter turns feel immediate at low speed while preserving the vessel's
existing hull safety, shoreline clearance, reverse behaviour, and readable
heading response. This is a future follow-up after the WEB-011 storm release
has been reviewed. The queue position is provisional and must be reconciled
with the future windboat work in WEB-012 before implementation.

## Dependencies and exclusions

Depends on the reviewed WEB-011 storm field and its final finite-world and
shore-collision contracts. Preserve the custom hull, collision radius,
scanner routes, pause/reset/reduced-motion behaviour, and the current
fixed-step simulation. Coordinate the tuning and heading conventions with
WEB-012 so a later sail or wind model can add force without replacing the
turning contract.

Exclude a full sailing simulator, instantaneous rotation, arbitrary spin
controls, new hull geometry, storm changes, and a wind model in this task.
Establish the baseline for whichever propulsion model is active. If WEB-012
has landed, verify turning through tacks and low sail power; otherwise measure
ahead/reverse travel and preserve a compatible path to wind-based controls.

## Execution steps

1. Record the current heading response at rest, low/medium/full ahead speed,
   reverse speed, full rudder, released rudder, braking, shoreline contact,
   and scanner travel. Capture turn radius, time to heading change, lateral
   clearance, and frame-rate sensitivity as the baseline.
2. Specify a pure bounded turn response with separate low-speed authority,
   ahead/reverse sign conventions, yaw acceleration, yaw drag, and a maximum
   yaw rate. Make low-speed rudder authority responsive without allowing a
   stopped boat to instant-spin or bypass collision resolution.
3. Test the resulting baseline through ahead and reverse trajectories,
   including rudder release and rapid direction changes. Compare it with a
   future tacking/wind-force model on paper or in a disposable fixture only;
   choose the model that leaves manual intent legible and can accept WEB-012
   wind forces without two competing heading authorities.
4. Apply the response before the existing finite bounds and shoreline
   collision resolution. Confirm that tighter turns do not enlarge the
   effective hull footprint, tunnel through islands, or make scanner routes
   unsafe. Keep all constants named and dimensioned in the pure kinematics
   module.
5. Integrate keyboard, touch, scanner handoff, pause/visibility suspension,
   reset, and reduced motion. A reset or scanner arrival must clear transient
   turn history and settle heading without a yaw spike.
6. Review slow/fast sailing, reverse manoeuvres, island approaches, and
   portrait/landscape layouts before deciding whether the change is ready for
   the next windboat phase.

## Module boundaries

The pure vessel kinematics module owns bounded yaw response and its tests.
Input adapters continue to provide normalized throttle/rudder intent. The
vessel renderer consumes heading and pose but does not mutate turn state.
Scanner navigation may request a heading, but it must use the same bounded
state transition and collision contract. WEB-012 owns wind force inputs and
must consume the agreed local-axis and sign conventions.

## Acceptance and verification

- Low-speed rudder input produces a prompt, smooth, bounded turn without an
  instant spin at rest or a discontinuity when throttle is released.
- Ahead and reverse turns have documented, tested signs and remain useful
  during braking and rudder release. Heading, velocity, and yaw rate remain
  finite under invalid and long frames.
- The complete hull keeps the existing collision radius and stays clear of
  islands and world edges through tight turns. Scanner travel and manual
  handoff remain safe.
- Fixed-step results remain close at 30/60/120 Hz, and reduced motion,
  pause, hidden tabs, reset, and disposal do not retain transient yaw.
- Pure tests cover rest/low-speed authority, ahead/reverse sign behaviour,
  bounded yaw, trajectory convergence, frame-rate stability, collision
  interaction, scanner handoff, and invalid inputs. Browser checks cover
  keyboard, multitouch, six layouts, and reduced motion.
- The selected response is documented so WEB-012 can add wind/tacking forces
  without changing hull safety or inventing a second heading convention.

## Risks and alternatives

Extra low-speed authority can make the boat feel like a motorized game piece;
use a smooth speed-dependent ramp and keep yaw acceleration bounded. A wind
model can make reverse and close-quarters manoeuvres less predictable; retain
the ahead/reverse baseline until a tacking prototype demonstrates a clearer
portfolio experience. If tighter turns threaten shoreline safety, reduce
turn radius through tuning rather than shrinking the collision radius.

## Review gate

Deliver tighter turns for review after WEB-011, either alongside WEB-012 or
as a focused follow-up. Do not impose a new queue order: choose the shared
heading/force contract when those future tasks become active.

