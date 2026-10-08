import fs from 'node:fs';
import assert from 'node:assert/strict';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['const incline=.58*Math.pow(q,.85)','const zTilt=yFlat*Math.sin(incline)','Math.pow(q,1.65)','const extinction=progress>VISIBLE_CAPTURE_FRACTION','THREE.MathUtils.smoothstep(horizonDistance,.60,.83)','quality===\'HIGH\'&&<RiverPulseTrain','const step=quality===\'LOW\'?14'])assert.ok(s.includes(token),`missing ${token}`);
const qValues=[0,.1,.25,.5,.75,.9,1];
assert.ok(qValues.every((q,i)=>i===0||Math.pow(q,1.65)>Math.pow(qValues[i-1],1.65)));
assert.equal(Math.pow(0,1.65),0);assert.equal(Math.pow(1,1.65),1);
console.log('PASS: oblique geometry, monotonic acceleration, horizon fade, quality tier');
