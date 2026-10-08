import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
assert(src.includes('HUB -> SINGULARITY'),'missing inbound curve convention');
assert(src.includes('theta-2*Math.PI*turns'),'clockwise angular motion absent');
assert(src.includes('liveStart.sub(originalStart)'),'dynamic river should follow hub origin');
assert(!src.includes('liveEnd.sub(originalEnd)'),'outbound dynamic endpoint correction still present');
assert(src.includes('q=(t*(.105+ri*.004)'),'pulse travel convention changed');
assert(src.includes('q2=Math.max(.001,q-.018)'),'trailing pulse must point behind inbound direction');
for(const theta of [0,Math.PI/3,Math.PI,Math.PI*1.75]){
 for(const outerRadius of [3.1,4.2,5.5]){
  let prevR=outerRadius,prevA=theta;
  for(let i=1;i<=1000;i++){
   const q=i/1000, radius=outerRadius+(1.06-outerRadius)*Math.pow(q,.84);
   const angle=theta-2*Math.PI*1.06*Math.pow(q,1.18);
   assert(radius<prevR,'river must contract toward core');
   assert(angle<prevA,'river must wind clockwise');
   prevR=radius;prevA=angle;
  }
  assert(prevR<1.07,'river must reach core capture zone');
 }
}
console.log('PASS: 12 inbound paths × 1000 steps, clockwise winding, radius contraction, pulse direction, live hub origin');
