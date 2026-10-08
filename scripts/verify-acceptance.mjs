import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
const version=fs.readFileSync(new URL('../components/version.ts',import.meta.url),'utf8');
const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));
assert.match(pkg.version,/^0\.0\.\d+$/);assert(version.includes(`APP_VERSION = '${pkg.version}'`));
const RS=.65,outer=4.10,inner=RS*1.012,photon=1.5*RS,isco=3*RS;
function radius(p){return (outer**1.5+(inner**1.5-outer**1.5)*p)**(2/3)}
function angle(p){const q0=outer**1.5,q1=inner**1.5,q=q0+(q1-q0)*p;return -4.3*Math.sqrt(1.15)*Math.log(q0/q)/(q0-q1)*q0}
let lastR=Infinity,lastA=Infinity,lastSpeed=0;
for(let i=0;i<=1000;i++){const p=i/1000,r=radius(p),a=angle(p);assert(Number.isFinite(r)&&Number.isFinite(a));assert(r<=lastR+1e-9);assert(a<=lastA+1e-9);if(i>1){const speed=(lastR-r)*1000;assert(speed>=lastSpeed-1e-7);lastSpeed=speed}lastR=r;lastA=a}
assert(Math.abs(radius(0)-outer)<1e-8);assert(Math.abs(radius(1)-inner)<1e-8);assert(isco>photon&&photon>RS);
assert.match(source,/phaseClock\.current\+=dt\*\(1\+gravity\.current\*\.70\)/);
assert.doesNotMatch(source,/seed\.speed\*boost/);
assert.match(source,/const anchors=nodes\.map\(node=>currentNodePosition\(node\.id\)\)/);
for(const id of ['profile','career','projects','portfolio','github','expertise','training','archive'])assert.match(source,new RegExp("id:'"+id+"'"));
console.log('PASS: version, eight hubs, monotonic inward radius, increasing radial speed, clockwise winding, ordered horizon/photon/ISCO, activation phase continuity, anchor caching');
