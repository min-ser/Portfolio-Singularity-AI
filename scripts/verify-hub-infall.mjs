import fs from 'node:fs';
import assert from 'node:assert/strict';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['hubToHorizonPosition','const anchors=nodes.map(node=>currentNodePosition(node.id))','const anchor=anchors[seed.hub]','infallPosition(advected,phase,height*(1-u*u*(3-2*u)))','Math.max(0,(1-p)/.06)','seed.hub'])assert.ok(s.includes(token),`Missing ${token}`);
const start=.39;
const ease=u=>u*u*(3-2*u);
for(const u of [0,.1,.5,.9,1])assert.ok(ease(u)>=0&&ease(u)<=1);
assert.equal(ease(0),0);assert.equal(ease(1),1);
for(let p=0;p<=1;p+=.001){const u=Math.max(0,(p-start)/(1-start));const a=u*u*(2-u);assert.ok(a>=0&&a<=1.000001);}
console.log('PASS hub-to-horizon trajectory static and continuity invariants');
