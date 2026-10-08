import assert from 'node:assert/strict';
import fs from 'node:fs';
const src=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
assert.match(src,/const bow=Math\.sin\(Math\.PI\*u\)\*\*2\*\.22/);
assert.match(src,/const eased=u\*u\*\(3-2\*u\)/);
assert.match(src,/const advected=u\*u\*\(2-u\)/);
const join=.39, outer=4.10, inner=.65*1.012, phase=.43, height=.05;
const radius=p=>(outer**1.5+(inner**1.5-outer**1.5)*p)**(2/3);
const angle=p=>{const q0=outer**1.5,q1=inner**1.5,q=q0+(q1-q0)*p;return phase-4.3*Math.sqrt(1.15)*Math.log(q0/q)/(q0-q1)*q0;};
function spiral(p,h){const r=radius(p),a=angle(p),x=r*Math.cos(a),ly=r*Math.sin(a),y=ly*Math.cos(.69)-h*Math.sin(.69),z=ly*Math.sin(.69)+h*Math.cos(.69);return [x*Math.cos(-.24)-y*Math.sin(-.24),x*Math.sin(-.24)+y*Math.cos(-.24),z];}
function path(anchor,p){const entry=spiral(0,height);if(p<=join){const u=p/join,e=u*u*(3-2*u),bow=Math.sin(Math.PI*u)**2*.22;return [anchor[0]+(entry[0]-anchor[0])*e-bow*Math.sin(phase),anchor[1]+(entry[1]-anchor[1])*e+bow*Math.cos(phase),anchor[2]+(entry[2]-anchor[2])*e+bow*.5];}const u=(p-join)/(1-join);return spiral(u*u*(2-u),height*(1-u*u*(3-2*u)));}
const anchors=[[-4,2,-.3],[3.9,-2,-.3],[0,3.5,-.4]];
const norm=v=>Math.hypot(...v), diff=(a,b)=>a.map((x,i)=>x-b[i]);
for(const a of anchors){assert(norm(diff(path(a,0),a))<1e-9,'hub start anchor');const j=path(a,join);assert(norm(diff(j,spiral(0,height)))<1e-9,'join position');const h=1e-5;const left=diff(j,path(a,join-h)).map(v=>v/h),right=diff(path(a,join+h),j).map(v=>v/h);assert(norm(diff(left,right))<.01,`C1 join tangent discontinuity: ${norm(diff(left,right))}`);assert(norm(diff(path(a,1),spiral(1,0)))<1e-9,'horizon endpoint');}
console.log('PASS: three hub anchors, exact endpoints, C0 and C1 capture continuity');
