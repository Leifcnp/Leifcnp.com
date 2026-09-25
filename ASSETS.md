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
