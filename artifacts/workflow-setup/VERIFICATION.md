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
  relocated archive links. Repair round1 adds strict server-side up-to-date
  protection/admin enforcement/no bypass, base ancestry and no deferred merges;
  removes stale wording and repairs the relative archive links.

## Independent final review

Final exact head/base verdict must be stored outside the candidate commit and
attached to the MR. This document is evidence, not its own SHA-bound approval.
Implementation review is separate from post-merge delivery verification.

## Remote gates and limits

GitHub connector confirms owner/admin repository access. Public branch metadata
observed master at the baseline with protection disabled. Connector tools support
MR creation/merge but expose no branch-protection write operation; the available
GitHub browser session was signed out. Root requested browser sign-in, without
collecting credentials. `work/branch-protection.json` is the concrete reviewed
baseline to apply after the setup check is demonstrated; preserve stronger rules.

MR creation, remote CI, strict branch protection, merge and resulting-SHA Pages/
public verification are pending. Autonomous merge stays blocked until protection
is observed; no direct push to master or protection bypass is allowed. Record
remote outcomes externally on the MR rather than claiming them here in advance.

No visual browser suite was run: this task makes no site-code/output changes,
and hash/diff comparisons establish the website build is unchanged. Existing
Vite >500kB chunk advisory remains; splitting application code is outside scope.
Physical-device performance, HTTPS/DNS investigation and website backlog features
are not part of workflow setup.
