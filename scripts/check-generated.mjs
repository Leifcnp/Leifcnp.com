#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { lstatSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function git(args, cwd = process.cwd()) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', shell: false });
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr.trim());
  return result.stdout;
}

try {
  if (process.argv.length !== 2) throw new Error('Usage: node scripts/check-generated.mjs (run after pnpm run build)');
  const root = git(['rev-parse', '--show-toplevel']).trim();
  for (const file of ['public/CNAME', 'public/.nojekyll', 'docs/CNAME', 'docs/.nojekyll']) {
    if (!lstatSync(join(root, file)).isFile()) throw new Error(`${file} must be a regular file`);
  }
  const sourceDomain = readFileSync(join(root, 'public/CNAME'));
  if (sourceDomain.toString().trim() !== 'leifcnp.com') throw new Error('public/CNAME must preserve leifcnp.com');
  if (!sourceDomain.equals(readFileSync(join(root, 'docs/CNAME')))) throw new Error('docs/CNAME differs from public/CNAME');
  if (!readFileSync(join(root, 'public/.nojekyll')).equals(readFileSync(join(root, 'docs/.nojekyll')))) {
    throw new Error('docs/.nojekyll differs from public/.nojekyll');
  }
  const changes = git(['status', '--porcelain=v1', '-z', '--untracked-files=all', '--ignored=matching', '--', 'docs/'], root);
  if (changes) throw new Error(`Generated docs/ differ from HEAD; build and commit the output. Git status entries: ${JSON.stringify(changes.split('\0').filter(Boolean))}`);
  console.log('Generated docs/ are committed and current; CNAME and .nojekyll are preserved.');
} catch (error) {
  console.error(`Generated-output check failed: ${error.message}`);
  process.exitCode = 1;
}
