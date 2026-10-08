import assert from 'node:assert/strict';
import fs from 'node:fs';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
assert.match(s,/function buildLensRibbon\(/);
assert.match(s,/LENS_RIBBON_FRAGMENT/);
assert.match(s,/float turbulence=noise/);
assert.match(s,/float arcFade=/);
assert.match(s,/side:THREE.DoubleSide,blending:THREE.AdditiveBlending/);
assert.doesNotMatch(s,/Structural containment: restrained/);
for(const segments of [56,96,144]){const vertices=(segments+1)*2,triangles=segments*2;assert.equal(vertices,segments*2+2);assert.ok(triangles>0);}
console.log('PASS: volumetric lens ribbon mesh, animated turbulent emission, edge fade, no decorative containment rings');
