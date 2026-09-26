# WEB-017 refinement audit

Sources compared: approved `72a9d476`, rejected `cb100d62`, and the current
corrected sampler. Spatial runner: `/tmp/leifcnp-phase14-spatial-compare.mjs`.
Ocean/crest runner: `/tmp/leifcnp-phase14-ocean-audit.mjs`.

## Spatial comparison

Samples cover a 31×31 grid from -120 to 120 at 8-unit spacing over 0–180
seconds, plus a 1-unit front cross-section. Crosswind energy is the fraction
of slope-square energy in `slopeZ`; coherence is Pearson correlation at
20/30/40-unit separations.

| metric | approved baseline | rejected bands | corrected sampler |
|---|---:|---:|---:|
| components | 4 | 6 | 4 |
| amplitude sum | 1.80 | 1.80 | 1.80 |
| sampled height min / max | -2.354 / 2.368 | -2.290 / 2.181 | -2.359 / 2.343 |
| max slope | 0.4068 | 0.5277 | 0.4441 |
| max vertical velocity | 2.6949 | 2.7804 | 2.8284 |
| crosswind slope energy | 0.3519 | 0.00134 | 0.3534 |
| X coherence at 20/30/40 | -0.701/0.463/0.031 | -0.327/0.772/-0.416 | -0.685/0.429/0.063 |
| Z coherence at 20/30/40 | -0.076/-0.527/-0.903 | 0.987/0.969/0.946 | -0.051/-0.457/-0.818 |
| front crossings / median spacing | 22 / 17 | 24 / 14 | 22 / 17 |
| temporal pulses / median spacing | 30 / 5.6s | 31 / 5.6s | 32 / 5.6s |

The corrected field is numerically close to the approved spatial signature,
while retaining seeded variation. Alternate seed `seed ^ 0x9e3779b9` changed
all 961 sampled heights at `t=37`, with mean absolute difference 0.2507 and
maximum 1.3830. This confirms the optional seed is active; it does not prove
that either seed looks natural in the browser.

## CPU and crest continuity

The ocean runner performed 50 warm-up updates and then 1,000 timed updates,
followed by 1,801 updates at 10 Hz across 180 seconds. The same Node 24
software runtime and 14,641-vertex mesh were used for both sources.

| metric | approved baseline | corrected sampler |
|---|---:|---:|
| water vertices | 14,641 | 14,641 |
| crest quads | 726 | 726 |
| update median | 3.895 ms | 5.474 ms |
| update p95 | 4.276 ms | 6.067 ms |
| update max | 6.512 ms | 7.950 ms |
| active in-play-area samples | 34,383 | 73,482 |
| calm first-20s active samples | 3,429 | 7,439 |
| shoulder-support ratio | 100% | 100% |
| max visible center displacement | 0.518 | 1.450 world units |
| detected visible jumps >8 units | 0 | 0 |

The corrected sampler costs about 1.41× baseline median and 1.42× p95 in this
Node-only run. The 3-minute crest carrier audit found no large visible jump;
the largest observed active ribbon-center step was 1.45 units at 10 Hz. The
support test compares each active ribbon center to its two shoulders and is an
implementation-level continuity signal, not rendered visual proof. Browser
review remains necessary for whether the seeded warping reads as natural water.
