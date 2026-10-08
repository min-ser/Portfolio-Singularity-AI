import fs from 'node:fs';import assert from 'node:assert/strict';
const s=fs.readFileSync('components/WebGLScene.tsx','utf8');
for(const token of ['function useOrbitalViewportAnchor','function RemoteSpiralVortex','function OrbitalSpaceStation','locate(.872,.167,9.9,pos)','locate(.862,.695,8.6,pos)','<RemoteSpiralVortex quality={quality}/>','<OrbitalSpaceStation quality={quality}/>',"quality==='LOW'?360:quality==='BALANCED'?850:1500",'root.current.position.copy(pos)']) assert.ok(s.includes(token),token);
console.log('Orbital visual detail and viewport anchors: PASS');
