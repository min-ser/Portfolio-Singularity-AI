import fs from 'node:fs';
import assert from 'node:assert/strict';
const scene=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
const version=fs.readFileSync(new URL('../components/version.ts',import.meta.url),'utf8');
const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));
assert.match(scene,/function HubIdentityBeacon\(/);
for(const id of ['profile','career','projects','portfolio','github','expertise','training','archive']){
 assert.ok(scene.includes(`id==='${id}'`),`Missing unique emblem: ${id}`);
}
assert.match(scene,/Solid, depth-tested medallion/);
assert.match(scene,/cylinderGeometry args=\{\[\.48,\.50,\.085,8\]\}/);
assert.match(scene,/meshStandardMaterial color="#071725"/);
assert.match(scene,/toneMapped=\{false\}/);
assert.match(scene,/quality==='LOW'/);
assert.ok(version.includes(pkg.version));
assert.match(pkg.version,/^0\.0\.\d+$/); // historical regression: do not pin to old release
console.log('Hub identity contrast and version checks passed.');
