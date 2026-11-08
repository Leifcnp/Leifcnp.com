# WEB-024 independent sampler evidence

Oracle: Git commit `812e02fc2517d02165241289f31ea58a644e4fc0`. The harness reconstructs its five original world modules with `git show` into a temporary directory, snapshots the candidate modules separately, records SHA-256 hashes, imports each independently, and removes its temporary directory afterward. Neither source tree is instrumented. Dependencies are the repository's locked Three.js installation.

From the repository root, with the bundled Node 24 runtime on PATH:

```sh
node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs parity > artifacts/wave-performance/candidate6-parity.json
node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs bench > artifacts/wave-performance/candidate6-benchmark-1.json
PLAYWRIGHT_BROWSERS_PATH=/tmp/web022-browsers node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs browser > artifacts/wave-performance/candidate6-browser-benchmark-1.json
SHAM=1 node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs bench > artifacts/wave-performance/identical-baseline-benchmark.json
SHAM=1 PLAYWRIGHT_BROWSERS_PATH=/tmp/web022-browsers node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs browser > artifacts/wave-performance/identical-baseline-browser-benchmark.json
```

Repeat the real Node benchmark as `-2.json`, and the real browser benchmark as `-2.json` and `-3.json`. Serialize all CPU benchmarks and avoid builds/browser-rendering checks concurrently. Browser mode starts a temporary loopback server, strips TypeScript types with Node's built-in stripper, and evaluates the same benchmark function in Chromium. It uses the bundled Playwright core package; `PLAYWRIGHT_MODULE` can override that module path. No Vite changes or production debug hooks are involved.

Each workload gets 10 warm-up AB iterations, then 40 timed alternating AB/BA rounds. Each ocean batch executes six complete real `createOceanSurface.update` calls, including crest search, colors and positions. Production computes normals at construction; the separate `oceanWithNormals` workload additionally recomputes vertex normals after every update. Other batches execute 20,000 height-only, scattered full-surface hull or incoherent coordinate/seed height queries. Times normalize to one ocean update or 10,000 queries. Checksums prevent unused results and match between variants. The incoherent workload exercises cold locality; the final candidate has no cache or growing state.

`candidate6-parity.json` records 1,272,078 exact `Object.is` scalar comparisons. Coverage includes original noise, height, primary phase, analytic surface, positive finite-difference mode and invalid distance, arbitrary/fractional/huge/signed/nonfinite seeds, signed zero and huge/nonfinite coordinates/times, lattice edges, storm radii 142/172, interleaved calls, new spatial projection versus the original full surface, supplied-target identity, retained-result independence, and complete ocean/crest typed arrays at six times.

`candidate6-summary.json` contains raw-result references, source hashes, environment, distributions, checksums, paired medians and deterministic bootstrap intervals. Paired changes use the same round's candidate/base times. Negative percentages mean faster. The descriptive 95% intervals use 5,000 bootstrap resamples of the paired median with fixed seed 2468; scheduling/autocorrelation and JIT variability limit inference.

The three Chromium ocean paired median changes are −3.67%, −4.84%, and −4.11%; each interval excludes zero. Byte-identical baseline Chromium calibration is −0.18%, with an interval spanning zero. Public scattered-contact medians stay stable, with browser p95 changes between −4.72% and +4.92% in these repetitions. Node results are mixed, and byte-identical Node calibration itself shows a positive timing bias. Do not subtract calibration numerically.

This supports a modest reproducible browser CPU reduction for the complete ocean update in this Ubuntu VM. It does not establish a broad Node speedup, FPS improvement, physical-device performance, GPU performance, or guaranteed p95 improvement. Root owns production screenshot/lifecycle checks and full build/test verification. Failed exploratory candidates 1–5 were moved outside the repository to `/tmp/web024-rejected-experiments`.
