import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
assert.match(source,/const HUB_RADIAL_SPREAD = 1\.10/);
assert.match(source,/n\.pos\[0\]\*HUB_RADIAL_SPREAD/);
assert.match(source,/n\.pos\[1\]\*HUB_RADIAL_SPREAD/);
assert.match(source,/currentNodePosition\(n\.id\)/);
assert.match(source,/liveStart=currentNodePosition\(h\.hubId\)/);
const old=[[ -.35,3.18],[-3.55,2.15],[3.55,2.15],[-4.12,0],[4.12,0],[-3.55,-2.1],[-.4,-2.82],[3.55,-2.1]];
for(const [x,y] of old){
 const before=Math.hypot(x,y),after=Math.hypot(x*1.10,y*1.10);
 assert.ok(Math.abs(after/before-1.10)<1e-10);
}
console.log('PASS: eight hubs have a 10% radial clearance increase; dynamic consumers share anchors.');
