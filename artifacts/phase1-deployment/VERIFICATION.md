# Phase 1 public deployment — 2026-09-24

## Initial published build

- Repository: `Leifcnp/Leifcnp.com`, branch `master`, prebuilt directory `docs/`.
- Application commit: `41813c8d82361be410abf171974ec89da5de8840` — Replace Hugo site with Phase 1 sailing portfolio.
- [GitHub Pages run 36057874116](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36057874116) completed successfully for that exact SHA.
- Public testing URL: [http://leifcnp.com/](http://leifcnp.com/).
- No DNS, registrar, certificate, or hosting-provider settings changed.

## External HTTP checks

The live HTML returned HTTP 200 and matched `docs/index.html` byte for byte, with title `Open water — Leif Pedersen`. Its favicon, CSS, and JavaScript each returned HTTP 200 with the correct MIME type and matched the local files byte for byte.

| Asset | SHA-256 |
| --- | --- |
| `favicon.svg` | `876740c07ce5704d962fb4c539f67b66319c24f4518e53e178f4affb3122deaa` |
| `assets/index-_ib2CXRm.js` | `4e790b73799f82e3c4a3cdf97f7fa23879a3f65d5f3d9b1d132f428ca5d5d3c5` |
| `assets/index-K-KJ9W4B.css` | `eb39d8d2286eb9e67c95fd4aa83e029db889bf2aa060a1a65eb0f32b57e77a0a` |

Former Hugo routes `/blog/`, `/categories/`, and `/tags/` each returned HTTP 404 after deployment. The archive, theme submodule reference, configuration, old deployment script, previous resume, and other legacy source are removed from the working tree. Their old committed version remains recoverable at `863b788`.

## Public browser checks

Chromium 151.0.7922.34 with SwiftShader loaded the **public HTTP URL**, rather than localhost. The checks in [checks.json](checks.json) passed:

- Visible animated water; paused water stays still; keyboard Enter resumes.
- Canvas fits at desktop 1440×900, mobile 390×844 and 320×568, landscape 844×390, and wide 2560×1080, with no horizontal overflow and a motion button at least 44px tall.
- Reduced motion starts still, explicit Resume works, and a change to reduced motion pauses the scene.
- No console errors or uncaught page errors with WebGL available.
- Deliberately unavailable WebGL shows the fallback and disables motion control.

Motion pixel assertions isolate the unobstructed water area. An initial full-canvas screenshot assertion included the overlaid button's CSS transition; the corrected crop passed without changing application code.

Captures are saved alongside this record. These tests verify mobile viewport layouts; they do not measure physical mobile GPU performance. The VM embedded browser's graphics limitation remains documented in the [local verification](../phase1/VERIFICATION.md).

## Known domain limitation

Before and after deployment, `https://leifcnp.com/` failed TLS hostname verification: the served certificate did not match the apex hostname. HTTPS was not bypassed or repaired by this code deployment. Use the explicit HTTP testing link until WEB-001 resolves the certificate/domain configuration.

## Dependency maintenance

The initial push reported a GitHub alert total that was not reproducible from the current manifests. A direct lockfile audit identified six Vite development-server advisories and no production advisories. Vite was updated from 7.1.7 to 7.3.6; its allowed esbuild dependency resolves to 0.28.2. Direct Three.js, TypeScript, and type-package pins are unchanged. The final frozen-lockfile installation passed, and both [full audit](audit-full.json) and [production audit](audit-production.json) report zero vulnerabilities on 2026-09-24. No GitHub alert was manually dismissed.

The maintenance rebuild also passed type checking and Vite 7.3.6 production bundling. Its JavaScript is `assets/index-C25cnVRu.js` (477753 bytes), SHA-256 `303c293d683cd0c1845fc130f4fc7e2467bb1370a8b26009d8e9fee0946855f1`; CSS and favicon are unchanged. The initial-release asset table and full browser captures above describe `41813c8`; final publication of this maintenance bundle is checked separately after pushing. No application source changed in the maintenance patch.

Phase 2 remains unimplemented and requires user review.
