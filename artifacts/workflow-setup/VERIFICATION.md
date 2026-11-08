# WEB-023 workflow setup verification

Date: 2026-11-07 (America/Vancouver). Current delivery is setup only.

## Scope and baseline

Base `97902baf0e82c77e88e3417b8b44e051ddff5683`; branch
`codex/WEB-023-autonomous-mr-workflow`, managed isolated workflow worktree.
No app source, index/public assets, Vite config, lockfile or generated site changes.
Existing website work remains in the original checkout; all 20 changed/untracked
files match their pre-task SHA-256 values in `preserved-work.json`. The old detached
legacy worktree was not altered.

## Observed checks

- Installed runtime: Node v24.22.1, pnpm11.25.0. CI and package-manager metadata
  pin these versions; earlier README runtime versions were stale. App dependencies
  remain locked and unchanged.
- `pnpm install --frozen-lockfile`: passed using the configured package mirror.
  Offline installation first failed because supply-chain metadata for a transitive
  package was not cached; no check was disabled. Online frozen installation passed.
- `pnpm run verify`: passed **175 tests**, zero failed/skipped/cancelled, strict
  TypeScript + Vite production build, and generated-output/domain checks.
- The 15 new temp-repository tooling cases independently cover create-only
  worktrees, dirty-source preservation, base selection, branch/path/other-worktree
  and symlink collisions, malformed arguments/help, staged/untracked/ignored docs,
  missing/changed domain metadata and marker bytes. The independent reviewer
  reran the 15 cases and observed them pass.
- Fresh build leaves tracked/untracked `docs/` clean. `site-hashes.json` records
  unchanged HTML/JS/CSS/favicon/CNAME/nojekyll; no browser behavior changed.
- Official upstream action tags were resolved and raw action.yml interfaces checked:
  checkout v6.0.2, setup-node v6.3.0, pnpm/action-setup v6.0.1, pinned by full SHA.
- Initial independent review found a base-movement race, stale queue wording and
  relocated archive links. Repair round 1 adds strict server-side up-to-date
  protection/admin enforcement/no bypass, base ancestry and no deferred merges;
  removes stale wording and repairs the relative archive links.

## Independent final review

Final exact head/base verdict must be stored outside the candidate commit and
attached to the MR. This document is evidence, not its own SHA-bound approval.
Implementation review is separate from post-merge delivery verification.

## Verified release

- Implementation [MR #7](https://github.com/Leifcnp/Leifcnp.com/pull/7) squash-merged
  as `fd6ea26551b49c797a9a895962501a26b527aa99`. Its tree
  `6b9c39cf948aebaa71989b8dbff022dcd592c5fc` exactly matches the reviewed candidate.
- [Independent review](https://github.com/Leifcnp/Leifcnp.com/pull/7#issuecomment-6716934491)
  passes head `8bc2fd245fe211352d8909127ddc9305417211f5` / base
  `97902baf0e82c77e88e3417b8b44e051ddff5683`, after one focused repair round.
- [PR CI](https://github.com/Leifcnp/Leifcnp.com/actions/runs/42444454139),
  [merge-SHA CI](https://github.com/Leifcnp/Leifcnp.com/actions/runs/42444724579)
  and [merge-SHA Pages](https://github.com/Leifcnp/Leifcnp.com/actions/runs/42444724516)
  passed. No gate was bypassed.
- Applied master protection requires PRs, GitHub Actions' Repository verification
  (app 15368), strict up-to-date branches, conversation resolution, linear history,
  and admin enforcement/no bypass. Force push/deletion remain disabled. GitHub
  approval count is 0; the independent agent report is a distinct procedural gate.
  Public branch metadata confirms protection and enforcement for everyone.
- `public-assets.json`: HTTP200 and byte-identical HTML, JS, CSS and favicon from
  http://leifcnp.com/ after merge. App source/generated output did not change.

## Access and limitations

The owner/admin GitHub connector could read metadata but rejected MR creation403.
The user signed into the available browser; authorized browser operations created
and merged the MR and applied protection. No credentials were collected or app
access expanded. Do not infer connector write access from account admin metadata.

Normal fetch hit a stale internal Codex capture ref. A per-command
`fetch.hideRefs=refs/codex/` fetch succeeded, without deleting refs. The VM SSH
configuration owner check also required `core.sshCommand='ssh -F /dev/null -o
BatchMode=yes'`; normal host-key verification remained enabled. Exact commands
are documented in AGENTS/README; no global/system configuration changed.

No visual browser suite was run: this task makes no site-code/output changes,
and hash/diff comparisons establish the website build is unchanged. Existing
Vite >500kB chunk advisory remains. The push reported 11 existing dependency
alerts (3 high, 6 moderate, 2 low); these were not independently triaged and no
application dependency updates are included. Physical-device performance,
HTTPS/DNS investigation and feature backlog work remain outside this setup.

This closeout records completed implementation delivery, not a review of its own
containing commit. It follows the same separate review/MR/CI gates.
