import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scripts = join(projectRoot, 'scripts');
function git(cwd: string, args: string[]) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', shell: false });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}
function fixture(t: { after: (fn: () => void) => void }) {
  // Spaces and shell metacharacters exercise argv handling without invoking a shell.
  const parent = mkdtempSync(join(tmpdir(), 'workflow ; fixture-'));
  t.after(() => rmSync(parent, { recursive: true, force: true }));
  const root = join(parent, 'source');
  mkdirSync(root);
  git(root, ['init', '-b', 'master']);
  git(root, ['config', 'user.email', 'fixture@example.invalid']);
  git(root, ['config', 'user.name', 'Workflow fixture']);
  for (const dir of ['public', 'docs']) {
    mkdirSync(join(root, dir));
    writeFileSync(join(root, dir, 'CNAME'), 'leifcnp.com\n');
    writeFileSync(join(root, dir, '.nojekyll'), '');
  }
  writeFileSync(join(root, 'docs/index.html'), '<html>Built site</html>\n');
  writeFileSync(join(root, 'source.txt'), 'committed base\n');
  git(root, ['add', '.']);
  git(root, ['commit', '-m', 'Fixture base']);
  const baseSha = git(root, ['rev-parse', 'HEAD']);
  git(root, ['update-ref', 'refs/remotes/origin/master', baseSha]);
  return { root, parent, baseSha };
}
function run(root: string, script: string, args: string[] = []) {
  return spawnSync(process.execPath, [join(scripts, script), ...args], { cwd: root, encoding: 'utf8', shell: false });
}
function rejected(result: ReturnType<typeof run>, pattern: RegExp) {
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, pattern);
}

test('generated check accepts committed output and ignores unrelated source dirt', (t) => {
  const { root } = fixture(t);
  writeFileSync(join(root, 'source.txt'), 'uncommitted source\n');
  const result = run(root, 'check-generated.mjs');
  assert.equal(result.status, 0, result.stderr);
});

test('generated check rejects a tracked build change, including a staged change', (t) => {
  const { root } = fixture(t);
  writeFileSync(join(root, 'docs/index.html'), 'new build\n');
  rejected(run(root, 'check-generated.mjs'), /differ from HEAD/);
  git(root, ['add', 'docs/index.html']);
  rejected(run(root, 'check-generated.mjs'), /differ from HEAD/);
});

test('generated check rejects untracked build assets', (t) => {
  const { root } = fixture(t);
  mkdirSync(join(root, 'docs/assets'));
  writeFileSync(join(root, 'docs/assets/new.js'), 'new asset');
  rejected(run(root, 'check-generated.mjs'), /new\.js/);
});

test('generated check rejects ignored output that would be absent from a checkout', (t) => {
  const { root } = fixture(t);
  writeFileSync(join(root, '.gitignore'), '*.local\n');
  git(root, ['add', '.gitignore']);
  git(root, ['commit', '-m', 'Ignore local files']);
  writeFileSync(join(root, 'docs/stale.local'), 'ignored asset');
  rejected(run(root, 'check-generated.mjs'), /stale\.local/);
});

test('generated check rejects missing required domain metadata', (t) => {
  const { root } = fixture(t);
  rmSync(join(root, 'docs/.nojekyll'));
  rejected(run(root, 'check-generated.mjs'), /nojekyll/);
});

test('generated check rejects domain replacement even if both copies agree', (t) => {
  const { root } = fixture(t);
  for (const dir of ['public', 'docs']) writeFileSync(join(root, dir, 'CNAME'), 'other.example\n');
  rejected(run(root, 'check-generated.mjs'), /preserve leifcnp\.com/);
});

test('generated check rejects mismatched metadata and symlink substitutions', (t) => {
  const { root } = fixture(t);
  writeFileSync(join(root, 'docs/CNAME'), 'leifcnp.com');
  rejected(run(root, 'check-generated.mjs'), /differs from public/);
  rmSync(join(root, 'docs/CNAME'));
  symlinkSync('../public/CNAME', join(root, 'docs/CNAME'));
  rejected(run(root, 'check-generated.mjs'), /regular file/);
});

test('task worktree help succeeds outside a repository without changing files', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-help-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const result = run(root, 'task-worktree.mjs', ['--help']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Fetch separately/);
  assert.equal(existsSync(join(root, '.git')), false);
});

test('task worktree starts at resolved base and preserves dirty source exactly', (t) => {
  const { root, parent, baseSha } = fixture(t);
  writeFileSync(join(root, 'later.txt'), 'newer source commit');
  git(root, ['add', 'later.txt']);
  git(root, ['commit', '-m', 'Source beyond base']);
  const sourceHead = git(root, ['rev-parse', 'HEAD']);
  writeFileSync(join(root, 'source.txt'), 'dirty source\n');
  writeFileSync(join(root, 'untracked.txt'), 'never copied');
  const beforeStatus = git(root, ['status', '--porcelain=v1', '--untracked-files=all']);
  const target = join(parent, 'target ; literal');
  const result = run(root, 'task-worktree.mjs', ['WEB-023', 'tests', '--dir', target]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { branch: 'codex/WEB-023-tests', path: target, base: 'origin/master', baseSha });
  assert.equal(git(target, ['rev-parse', 'HEAD']), baseSha);
  assert.equal(git(target, ['status', '--porcelain=v1']), '');
  assert.equal(readFileSync(join(target, 'source.txt'), 'utf8'), 'committed base\n');
  assert.equal(existsSync(join(target, 'later.txt')), false);
  assert.equal(existsSync(join(target, 'untracked.txt')), false);
  assert.equal(git(root, ['status', '--porcelain=v1', '--untracked-files=all']), beforeStatus);
  assert.equal(git(root, ['rev-parse', 'HEAD']), sourceHead);
});

test('task worktree supports an explicit commit and default sibling destination', (t) => {
  const { root, parent, baseSha } = fixture(t);
  const result = run(root, 'task-worktree.mjs', ['WEB-023', 'explicit', '--base', baseSha]);
  assert.equal(result.status, 0, result.stderr);
  const target = join(parent, 'source-WEB-023-explicit');
  assert.equal(JSON.parse(result.stdout).path, target);
  assert.equal(git(target, ['rev-parse', 'HEAD']), baseSha);
});

test('task worktree refuses branch collision without creating a destination', (t) => {
  const { root, parent } = fixture(t);
  git(root, ['branch', 'codex/WEB-023-collision']);
  const target = join(parent, 'collision-target');
  rejected(run(root, 'task-worktree.mjs', ['WEB-023', 'collision', '--dir', target]), /Branch already exists/);
  assert.equal(existsSync(target), false);
});

test('task worktree refuses an existing destination without modifying it or creating a branch', (t) => {
  const { root, parent } = fixture(t);
  const target = join(parent, 'existing');
  mkdirSync(target);
  writeFileSync(join(target, 'keep.txt'), 'keep');
  rejected(run(root, 'task-worktree.mjs', ['WEB-023', 'existing', '--dir', target]), /Target already exists/);
  assert.equal(readFileSync(join(target, 'keep.txt'), 'utf8'), 'keep');
  assert.equal(git(root, ['for-each-ref', '--format=%(refname)', 'refs/heads/codex/WEB-023-existing']), '');
});

test('task worktree refuses nested repository paths, including symlink aliases', (t) => {
  const { root, parent } = fixture(t);
  rejected(run(root, 'task-worktree.mjs', ['WEB-023', 'nested', '--dir', join(root, 'nested')]), /overlaps a repository path/);
  const alias = join(parent, 'source-alias');
  symlinkSync(root, alias);
  rejected(run(root, 'task-worktree.mjs', ['WEB-023', 'alias', '--dir', join(alias, 'nested')]), /overlaps a repository path/);
});

test('task worktree refuses paths inside a different registered worktree', (t) => {
  const { root, parent, baseSha } = fixture(t);
  const other = join(parent, 'other');
  git(root, ['worktree', 'add', '--detach', other, baseSha]);
  rejected(run(root, 'task-worktree.mjs', ['WEB-023', 'other', '--dir', join(other, 'nested')]), /overlaps a repository path/);
  // The common git directory belongs to the source, even when invoked from a linked worktree.
  rejected(run(other, 'task-worktree.mjs', ['WEB-023', 'gitdir', '--dir', join(root, '.git/new')]), /overlaps a repository path/);
});

test('task worktree rejects invalid task names, options, and unresolved bases before mutation', (t) => {
  const { root, parent } = fixture(t);
  const before = git(root, ['worktree', 'list', '--porcelain']);
  const target = join(parent, 'invalid-target');
  for (const args of [
    ['WEB-023', 'bad;touch x'],
    ['WEB-023', 'safe', '--base', '--help'],
    ['WEB-023', 'safe', '--base', 'missing-ref'],
    ['WEB-023', 'safe', '--unknown', 'value'],
    ['WEB-023', 'safe', '--dir', target, '--dir', target],
    ['WEB-023', 'safe', '--base'],
  ]) {
    assert.equal(run(root, 'task-worktree.mjs', args).status, 1);
  }
  assert.equal(git(root, ['worktree', 'list', '--porcelain']), before);
  assert.equal(existsSync(target), false);
  assert.equal(git(root, ['for-each-ref', '--format=%(refname)', 'refs/heads/codex/']), '');
});
