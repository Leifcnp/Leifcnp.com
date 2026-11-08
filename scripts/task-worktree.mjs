#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, realpathSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';

const usage = 'Usage: node scripts/task-worktree.mjs WEB-NNN slice [--base origin/master] [--dir /new/path]';
function git(args, cwd = process.cwd()) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', shell: false });
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr.trim());
  return result.stdout.trim();
}
function contains(parent, child) {
  const suffix = relative(parent, child);
  return suffix === '' || (!suffix.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) && suffix !== '..' && !isAbsolute(suffix));
}
function canonicalFuturePath(path) {
  const tail = [];
  let parent = path;
  while (!existsSync(parent)) {
    tail.unshift(basename(parent));
    const next = dirname(parent);
    if (next === parent) throw new Error('Cannot resolve target parent');
    parent = next;
  }
  return join(realpathSync(parent), ...tail);
}

try {
  if (process.argv.length === 3 && process.argv[2] === '--help') {
    console.log(`${usage}\nCreates a clean worktree from a locally resolved base. Fetch separately to refresh origin/master.\nNever copies, stashes, resets, or cleans the source checkout. Refuses existing branches and paths.`);
    process.exit(0);
  }
  const [task, slice, ...options] = process.argv.slice(2);
  if (!/^WEB-\d{3,}$/.test(task ?? '') || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slice ?? '') || slice.length > 80) throw new Error(usage);
  let base = 'origin/master';
  let requestedDir;
  const seen = new Set();
  for (let i = 0; i < options.length; i += 2) {
    const option = options[i];
    if (!['--base', '--dir'].includes(option) || seen.has(option) || !options[i + 1]) throw new Error(usage);
    seen.add(option);
    if (option === '--base') base = options[i + 1];
    else requestedDir = options[i + 1];
  }
  if (base.startsWith('-') || /[\x00-\x1f\x7f]/.test(base)) throw new Error('Base must be a local commit/ref, not an option');
  const root = realpathSync(git(['rev-parse', '--show-toplevel']));
  const branch = `codex/${task}-${slice}`;
  git(['check-ref-format', '--branch', branch], root);
  const sha = git(['rev-parse', '--verify', '--end-of-options', `${base}^{commit}`], root);
  if (git(['for-each-ref', '--format=%(refname)', `refs/heads/${branch}`], root)) throw new Error(`Branch already exists: ${branch}`);
  const target = resolve(requestedDir ?? join(dirname(root), `${basename(root)}-${task}-${slice}`));
  try {
    lstatSync(target);
    throw new Error(`Target already exists: ${target}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const canonicalTarget = canonicalFuturePath(target);
  const worktrees = git(['worktree', 'list', '--porcelain', '-z'], root).split('\0')
    .filter((entry) => entry.startsWith('worktree ')).map((entry) => canonicalFuturePath(entry.slice(9)));
  const commonGit = realpathSync(resolve(root, git(['rev-parse', '--git-common-dir'], root)));
  for (const protectedPath of [...worktrees, commonGit]) {
    if (contains(protectedPath, canonicalTarget) || contains(canonicalTarget, protectedPath)) {
      throw new Error(`Target overlaps a repository path: ${protectedPath}`);
    }
  }
  git(['worktree', 'add', '-b', branch, '--', canonicalTarget, sha], root);
  console.log(JSON.stringify({ branch, path: canonicalTarget, base, baseSha: sha }, null, 2));
} catch (error) {
  console.error(`Worktree creation failed: ${error.message}`);
  process.exitCode = 1;
}
