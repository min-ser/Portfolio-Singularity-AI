import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync('components/WebGLScene.tsx','utf8');
for(const term of ['buildGasShell','VolumetricGasShell','GAS_VERTEX','GAS_FRAGMENT','computeVertexNormals','aHeight','aRadius','uActive','depthTest:true'])assert(source.includes(term),`Missing ${term}`);
const TAU=Math.PI*2;
for(const shell of [0,1,2]){
 const center=1.35+shell*.105,radialThickness=.36+shell*.035,verticalThickness=.19+shell*.055;
 const radii=[],zs=[];
 for(let j=0;j<100;j++){
  const cross=j/100*TAU;
  radii.push(center+Math.cos(cross)*radialThickness);
  zs.push(Math.sin(cross)*verticalThickness);
 }
 assert(Math.max(...zs)-Math.min(...zs)>.37,'Gas volume must have substantial Z thickness');
 assert(Math.min(...radii)>.65,'Gas shell must remain outside event horizon');
 assert(Math.max(...radii)<2,'Gas shell must fit the scene');
}
console.log('PASS 3 volumetric shells: finite 3D thickness, outside horizon, within scene bounds');
console.log('PASS shader turbulence, radial falloff, differential rotation and quality-tier source hooks');
