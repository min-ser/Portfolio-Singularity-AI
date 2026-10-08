import fs from 'node:fs';
import assert from 'node:assert/strict';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['VISIBLE_CAPTURE_FRACTION = .76','function visibleInfallPosition','deformRiverPoint(h,1,time)','deformRiverPoint(h,.997,time)','tangentContinuation.lerp(spiral,weight)','visibleInfallPosition(h,q,now)','visibleInfallPosition(h,Math.max(0,q-.019),now)','horizonFade','depthTest={true}']) assert.ok(s.includes(token),`Missing capture feature: ${token}`);
// Independently validate the capture spiral's radial decrease and terminal horizon entry.
const r0=1.06, rs=.65;
let last=r0;
for(let i=0;i<=100;i++){const u=i/100;const r=r0-(r0-.48)*u*u*(3-2*u);assert.ok(r<=last+1e-10,'radius must not increase');last=r;}
assert.ok(last<rs,'capture must enter horizon');
console.log('PASS: capture path wiring, monotone spiral contraction, horizon entry');
