# Procedural artwork provenance

The Phase 5 boat was custom-built specifically for this portfolio on 2026-09-24. No downloaded boat model, mesh, texture, material image, third-party artwork, or asset-pack content is used.

- `src/world/createVessel.ts`: original hull/deck vertices and faces, sail triangles, coral markings, and primitive mast/boom/cockpit geometry. Geometry and flat-color materials are generated locally in code.
- `src/world/createLandmarks.ts`: code-built island landforms, docks, towers, markers, and lighthouse/lantern primitives.
- `src/world/effects/createWake.ts`: procedural instanced foam polygons in a fixed pool; no sprite images or textures.
- `src/world/waves.ts` and `src/world/createWaterWorld.ts`: mathematical water displacement and vertex colors; no water texture downloads.

Three.js is the existing rendering library, not a source of third-party boat art. There are no new external art dependencies, asset services, or model downloads in Phase 5. Future model/texture additions must preserve the user's requirement to build the boat in this repository rather than importing someone else's model.

WEB-010 / Phase 6 retains the original sailboat geometry and extends only its mathematical water response and procedural foam. No external model, texture, or artwork was added.

WEB-013 / Phase 7 adds an original indexed wave surface, short procedural crest ribbons, travelled-path wake strips, and a bow-wave arc. All geometry and shaders are authored in this repository; no models, sprites, water textures, or other external artwork were added.

WEB-011 / Phase 8 changes only mathematical storm intensity/forces, existing wave amplitude, procedural water colors and hull support limits. No imported boat art, weather textures, sprites, models or new dependencies were added.

WEB-012 / Phase 9 enlarges the original main by 68%, removes the jib/bowsprit and pivots the main, shade, coral clew panel and coral boom around a taller original mast. The wind dial is DOM/CSS geometry. No boat art, textures, models or dependencies were imported.

WEB-018 wind-driven heel uses the same original hull, shared water samples and bounded pose math. No artwork was imported.

WEB-020 / Phase 11 reuses the original wake geometry with a bounded white-foam surge. The optional wind rush is generated in `src/audio/createWindRush.ts` from deterministic noise through Web Audio; no sound recordings, samples, sprites, textures, models or dependencies were imported. The custom boat remains unchanged.

WEB-021 / Phase 12 keeps the custom boat, water geometry and wave forces unchanged. Nonlinear wind heel reaches 20 degrees while combined roll remains bounded at 0.4 radians. Authored top-rail and deck contact samples use a shared rendered-triangle water sampler; outer-edge wash is limited to 0.06 units and the working deck, cockpit and mast retain at least 0.12 units of dry clearance. The original wake's 96 foam instances remain; the new bow/rail spray is an original 48-particle instanced pool with two transparent draw passes and no textures or downloads. Rail wash requires forward sail load near the water, while bow spray requires closing water contact. Scanner/moored, pause, reset, hidden and reduced-motion states clear the effects.

WEB-019 / Phase 13 adds original code-built breeze strips (32 fixed strokes in one buffer), segmented coral/cream masthead and Shipyard pennants, and one primitive land flagpole. All geometry, vertex colors, transparency and flutter are authored here; no models, textures or sound files were downloaded. The boat pennant attaches to the existing transformed masthead without changing the original hull, main, boom or mast. The existing 48-particle bow/rail spray remains the only hull-spray pool.

Review correction (2026-09-25): The WEB-019 over-water breeze strips were removed at the user’s request because they resembled wave crests. Flags/pennants, wave-crest foam, wake and contact spray remain original code-built assets.
