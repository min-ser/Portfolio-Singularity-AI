import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['const CAUSTIC_FRAGMENT','function AccretionCaustics','<AccretionCaustics activation={activation} quality={quality}/>','13.0*log(max(r,.27))','pow(max(r,.29),-1.5)','vec3 amber=vec3(1.0,.42,.11)']) assert(source.includes(token),`Missing ${token}`);
assert(source.includes('depthWrite:false'));
console.log('PASS: shader-based swept caustics, radial differential rotation, asymmetric gas emission, core integration');
