# WEB-017 — Varied incoming wave sets with a common direction

## Intent and priority

The user likes Phase 7 swells, and requested less repetitive incoming waves that travel from the same direction. This is low-priority planning only; finish WEB-011 and retain the existing review gates before implementation.

## Design

Use one prevailing propagation direction. Vary packet amplitude, spacing, period and phase with a fixed seed or smooth deterministic envelopes, rather than introducing opposing swell directions or per-frame random values. The same world-space function must drive displacement, crest accents, hull support, foam and physical forces. Coordinate wind alignment with WEB-012 when that feature is designed; do not assume that storm return currents must change the prevailing wave direction.

## Implementation sequence

1. Capture baseline motion at ordinary camera scale and choose a small set of seeded packet/envelope alternatives.
2. Compare variation over several minutes, looking for repetition, direction changes, discontinuities or distracting noise.
3. Preserve bounded height/slope/velocity derivatives and continuity through the storm multiplier; update all consumers together.
4. Verify pause/reset/reduced motion, deterministic 30/60/120 Hz physics, hull contact and safe scanner paths.
5. Review desktop/mobile visuals and rendering cost, publish only within an authorized phase, then stop for review.

## Acceptance

- Incoming sets differ recognizably in timing/size while their common travel direction is clear.
- No jitter, phase mismatch, abrupt envelope edges, unbounded force or resource growth.
- Existing calm/storm, hull/wake and navigation contracts stay intact.
- Automated derivative/determinism checks and normal-camera multi-frame visual evidence support the chosen model.

## Ownership and exclusions

Use Luna subagents for bounded sampler/visual/test slices; root owns integration and release review. No remote weather, downloaded art, fluid solver or incidental wind-control redesign. This task remains unstarted until selected after the current queue.
