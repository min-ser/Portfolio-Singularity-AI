import fs from 'node:fs';
import assert from 'node:assert/strict';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['aRiverCenter','aRiverNormal','uHubOffset','float torn=smoothstep(.25,.76,coverage)','const radius=layer===0?.082:.022','const turbulence=Math.sin(q*91.','visibleInfallPosition(h,progress,t)','ConduitEnergyPackets','BraidedPlasmaStrands'])assert.ok(s.includes(token),`Missing ${token}`);
assert.ok(!s.includes('centers[vertex*3]=center.x;centers[vertex*3+1]=center.y;centers[vertex*3+2]=center.z;\n const normal='),'Unexpected malformed declaration');
console.log('PASS: plasma integration invariants');
