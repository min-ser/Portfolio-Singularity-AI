import assert from 'node:assert/strict';
const rs=.65,outer=4.10,inner=rs*1.045;
const radius=p=>inner+(outer-inner)*(1-p)**1.20;
const angle=p=>-(.90*p+2.8*((outer/radius(p))**.60-1));
const omega=r=>Math.sqrt(1.15/r**3);
let minRadius=Infinity,maxRadius=0;
for(let i=1;i<=1000;i++){
 const p0=(i-1)/1000,p1=i/1000;
 assert(radius(p1)<radius(p0),'radius must decrease toward horizon');
 assert(angle(p1)<angle(p0),'angular motion must be clockwise');
 assert(omega(radius(p1))>omega(radius(p0)),'Kepler angular speed must increase');
 minRadius=Math.min(minRadius,radius(p1));
 maxRadius=Math.max(maxRadius,radius(p0));
}
assert(inner>rs && outer>4);
const inclination=.69,roll=-.24;
function project(p,phase,h){
 const r=radius(p),a=phase+angle(p);
 const ly=r*Math.sin(a)*Math.cos(inclination)-h*Math.sin(inclination);
 return [r*Math.cos(a)*Math.cos(roll)-ly*Math.sin(roll),
 r*Math.cos(a)*Math.sin(roll)+ly*Math.cos(roll),
 r*Math.sin(a)*Math.sin(inclination)+h*Math.cos(inclination)];
}
const a=project(.4,0,.2),b=project(.4,0,-.2);
assert(Math.abs(a[2]-b[2])>.2,'finite 3D disk thickness must be observable');
console.log('PASS 1000-step monotonic inward radius, clockwise winding, angular acceleration');
console.log('PASS 3D disk inclination, thickness and horizon exclusion');
console.log(`r outer=${maxRadius.toFixed(3)} inner=${minRadius.toFixed(3)} horizon=${rs}`);
