# Phase 3 verification — 2026-09-24

## Delivered slice

A temporary cream block vessel with a coral bow marker, forward and reverse thrust, braking, rudder yaw, hydrodynamic drag, shared-wave heave/pitch/roll, and an orthographic isometric camera that follows horizontal movement. Keyboard and hold-button touch input use the same intent contract. Reset returns the boat and camera to the clear starting point and remains available while paused.

No proximity prompt, category navigation, content drawer, scanner autopilot, sailboat artwork, or wake is implemented. Stop for steering review before Phase 4.

## Mechanics and boundaries

- Pure immutable kinematics in `src/world/vessel/kinematics.ts`; the scene integrates at 1/120 second with a 0.1-second / 12-step frame cap. Thrust, longitudinal/lateral drag, braking, and damped speed-responsive yaw are explicit tuning constants.
- Local `+Z` is the bow. Heading zero travels along world `+Z`; positive heading turns toward `+X`. Right/starboard rudder applies negative yaw ahead and reverses while backing.
- The primitive measures 5.2 × 2.6 × 1.2 world units. A conservative 3.2-unit collision radius keeps it outside island land radii and within the ±180 playable boundary. Forward/reverse speed caps are 14/7 world units per second.
- The unchanged shared wave function lives in `src/world/waves.ts`. Four hull samples drive damped pose. The hull sits partly submerged; the camera follows only X/Z and never inherits wave bobbing.
- The water background extends to ±360 with the existing 76 segments / 11,552 triangles. Camera-ray tests verify coverage at all playable corners across six viewport sizes. Compact landscape uses a closer view so the bow stays readable.

## Checks

- `pnpm test`: **25 individual tests pass** under Node 24.19.0. This includes prior data/landmark checks plus thrust/reverse/drag/braking, rudder signs, frame subdivision, invalid/long frames, island/world boundaries, input intent, camera following/orientation/framing/coverage, and disposal.
- `pnpm run build`: strict TypeScript checking and Vite 7.3.6 production bundling pass. No dependency or lockfile changes. Vite emits its default warning for the approximately 512 kB minified JavaScript chunk (approximately 132 kB gzip); this is not a build failure.
- `git diff --check`: clean. `docs/` is regenerated, custom-domain metadata is preserved, asset references resolve, and stale Hugo routes remain absent. See [build asset hashes](build-assets.json).

## Browser verification

Chromium 151 with SwiftShader checks the built site at `http://127.0.0.1:4173/`; [results](checks.json) and screenshots are alongside this record.

- Keyboard thrust/rudder works after the Resume button has focus; the scene and projected island labels move as the camera follows.
- Pause freezes rendered pixels and disables movement. Reset restores the camera and vessel; reduced motion starts still, with explicit Resume enabling sailing.
- Desktop 1440×900, phone 390×844, small phone 320×568, tall phone 360×915, landscape 844×390, and wide 2560×1080: canvas fits, controls are at least 44px, labels avoid the header/helm/boat, and no horizontal overflow occurs.
- Actual simultaneous touch contacts on Forward and Turn right drive the rendered scene. Cancelling a gesture releases held input.
- No console errors or uncaught page errors with WebGL available. Simulated unavailable WebGL preserves the readable island guide and hides/disables sailing controls and the bow note.

Additional browser fixtures load the actual source modules through Vite without shipping test globals:

- [Input checks](input-checks.json): independent keyboard aliases, modifiers/editable focus, keyboard button holds/focus loss, actual multitouch and independent release/cancellation, blur, pause, reset while paused, secondary mouse buttons, and idempotent disposal.
- [World checks](world-checks.json): forward/reverse movement, rudder direction, camera projection updates, frozen state/pixels, reset clearing input and velocity, and complete repeated disposal.
- [Pose checks](pose-checks.json): wave pitch/roll signs at four headings and three times, partial submersion, damped heave, immutable pose snapshots, and exactly-once GPU-resource disposal.

Visual review corrected hull height, bow-marker placement, compact landscape scale, reset's paused water refresh, input focus/cancellation behavior, and CSS visibility of fallback elements. Islands can leave the frame while sailing; the camera now follows the boat instead of fitting the entire archipelago.

## Limits and release

Software-rendered browser tests verify behavior and phone viewport layouts, not physical phone GPU performance or subjective steering feel. The existing HTTPS hostname mismatch remains WEB-001; use the explicit HTTP testing URL. No DNS, certificate, or hosting settings changed.

Application commit `85482079b04dae785915dedaa049832c5503db15` was pushed to `origin/master`. [Pages run 36065708258](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36065708258) succeeded for that exact SHA. The established publishing path remains `master` / `docs/`.

The [public HTTP site](http://leifcnp.com/) returned HTTP 200, and its HTML, JavaScript, CSS, and favicon match the reviewed build byte for byte with expected MIME types; see [public asset evidence](public-assets.json). The full keyboard/touch and six-viewport browser suite also passed against the real domain; see [public browser results](public-checks.json).

WEB-006 is complete. Phase 4 remains unimplemented and awaits steering review.
