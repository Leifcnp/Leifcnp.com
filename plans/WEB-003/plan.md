# WEB-003 — Empty animated water field and true isometric camera

## Goal

Render a stylized, low-poly water field with gentle deterministic wave displacement in a true isometric orthographic view. The field stays empty so camera, scale, animation, pause, resize, and reduced-motion behavior can be reviewed independently.

## Dependencies

- WEB-002’s Vite/TypeScript/Three runtime and `createWaterWorld` API.
- A browser capable of WebGL2, with a graceful message if WebGL initialization fails.

## Scope and exclusions

In scope: one subdivided plane or grid mesh, lightweight vertex displacement, a calm color/material, orthographic camera, ambient/directional lighting if needed for the chosen material, render loop, resize handling, pause control, and reduced-motion handling.

Keep the water completely empty. Exclude islands, boundary rings, vessel geometry, collision/proximity logic, camera tracking, navigation HUD, drawer, autopilot, foam, textures, and final art.

## Steps

1. Keep the current exported `sampleWaterHeight(x, z, timeSeconds)` function in `src/world/createWaterWorld.ts` as the Phase 1 sampler contract. Use fixed wave constants and no random per-frame mutation so future buoyancy can reproduce the same surface. If the implementation later extracts it to a `waves.ts` module, preserve the existing import/re-export contract for consumers.
2. Build a bounded grid with enough subdivisions for gentle displacement; update only vertex positions (and normals if the material needs them) each animation frame. Keep the mesh footprint and camera framing responsive to viewport size.
3. Create an orthographic camera with equal-magnitude horizontal and vertical world directions, elevated above the origin, and a consistent diagonal view (for example, position `(d, d, d)` looking at the origin). Document the chosen azimuth/elevation so “isometric” is deliberate rather than an accidental perspective view.
4. Use a simple untextured material and restrained lighting/colors. The scene should read as a water field without a horizon asset or environmental decoration.
5. Implement the render loop with a clamped delta, pause state, and `prefers-reduced-motion`: reduced motion may freeze the wave phase while retaining a responsive static field. Expose only the factory API required by WEB-002.
6. On resize, update renderer pixel ratio within a safe cap, canvas dimensions, orthographic frustum, and camera projection. On dispose, cancel animation, remove listeners, dispose geometry/material/renderer, and detach the canvas.

## Module boundaries and APIs

`src/world/createWaterWorld.ts` currently owns the pure exported `sampleWaterHeight(x, z, timeSeconds)` sampler as well as scene, camera, mesh, loop, resize, pause, and cleanup. A later extraction to `waves.ts` is an implementation option, not a present module or a new required API. Its factory API is:

```ts
createWaterWorld(
  container: HTMLElement,
  options?: { reducedMotion?: boolean }
): {
  setPaused(paused: boolean): void;
  dispose(): void;
}
```

Do not expose Three.js objects to `main.ts`; future modules may share the wave sampler but should not reach into the scene internals.

## Acceptance checks

- At desktop and mobile viewport sizes, the camera is orthographic and the field is visibly isometric, with no perspective convergence.
- Water vertices animate gently and deterministically; pausing freezes phase and resuming continues without a jump larger than the normal clamped frame delta.
- `prefers-reduced-motion: reduce` produces a static or strongly reduced animation while leaving the scene usable.
- Resize and device-pixel-ratio changes do not stretch the field or create runaway GPU memory.
- Scene disposal leaves no animation/listener leak and no console warnings during hot reload or page teardown.
- The scene contains only the water field and expected camera/light helpers; no islands, boat, HUD, or content drawer appear.

## Risks and alternatives

- A very dense grid can overwhelm low-end mobile GPUs; start conservative and measure before increasing subdivisions.
- Recomputing normals every frame costs CPU; use a basic unlit material initially or a controlled normal update, then profile before optimizing.
- A perfectly mathematical isometric angle can reduce depth cues; preserve the orthographic projection and adjust only the documented azimuth/elevation if readability needs it.
- WebGL may be unavailable; show a small accessible fallback message rather than failing silently.

## Deliverables

- Pure deterministic wave sampler with future buoyancy-compatible output.
- Empty animated water world using an orthographic isometric camera.
- Pause, reduced-motion, resize, and disposal behavior wired to the Phase 1 shell.

## Review gate

The visual review must confirm water-only composition and the isometric framing at the target viewport sizes. Once accepted, freeze the Phase 1 camera/wave contract before planning code for islands or a vessel.

## Implementation status

Implemented and verified on 2026-09-24. Animated frame differences, pause/resume, reduced motion, and desktop/mobile/wide output passed browser checks. Orthographic isometric camera, geometry bounds, shared wave sampler, and lifecycle were code-reviewed. Final surface uses shared jittered grid coordinates and restrained per-face teal variation. See [Phase 1 verification](../../artifacts/phase1/VERIFICATION.md).
