import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const versionSource = read('components/version.ts');
const roadmap = read('IMPLEMENTATION_ROADMAP.md');
const roadmapHistory = read('docs/ROADMAP_HISTORY_THROUGH_v0.0.125.md');
const nextConfig = read('next.config.ts');
const networkScene = read('components/NetworkScene.tsx');
const versionMatch = versionSource.match(/APP_VERSION\s*=\s*'([^']+)'/);
const releaseMatch = versionSource.match(/RELEASE_NAME\s*=\s*'([^']+)'/);
const guardMatch = versionSource.match(/PERF_GUARD\s*=\s*'([^']+)'/);
const sourceVersion = versionMatch?.[1];
const failures = [];
const checks = [
  [`package/version source agree (${pkg.version})`, sourceVersion === pkg.version],
  ['release label is present', Boolean(releaseMatch?.[1])],
  ['performance guard is present', Boolean(guardMatch?.[1])],
  ['static export is enabled', nextConfig.includes("output: 'export'")],
  ['basePath is environment-driven', nextConfig.includes('NEXT_PUBLIC_BASE_PATH')],
  ['assetPrefix follows basePath', nextConfig.includes('assetPrefix: basePath')],
  ['roadmap contains 0.0.1 history', roadmapHistory.includes('| 0.0.1 |')],
  ['roadmap contains 0.0.40 history', roadmapHistory.includes('0.0.40')],
  [`roadmap contains current version ${pkg.version}`, roadmap.includes(pkg.version)],
  ['NetworkScene consumes shared version metadata', networkScene.includes("from './version'")],
];
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) failures.push(name); }
const hardcoded = [...networkScene.matchAll(/v?0\.0\.\d+/g)].map(m=>m[0]);
if (hardcoded.length) { failures.push(`hard-coded UI versions: ${[...new Set(hardcoded)].join(', ')}`); console.log(`FAIL  hard-coded UI versions: ${[...new Set(hardcoded)].join(', ')}`); }
else console.log('PASS  no hard-coded UI version in NetworkScene');
if (failures.length) { console.error(`\nValidation failed: ${failures.length} issue(s).`); process.exit(1); }
console.log(`\nValidation passed for ${pkg.version} — ${releaseMatch?.[1]} / Guard ${guardMatch?.[1]}.`);
