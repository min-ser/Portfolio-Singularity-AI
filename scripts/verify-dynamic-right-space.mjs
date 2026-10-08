import fs from 'node:fs';import assert from 'node:assert/strict';
const s=fs.readFileSync('components/WebGLScene.tsx','utf8');
for(const key of ['function RemoteSpiralVortex','function OrbitalSpaceStation','<RemoteSpiralVortex quality={quality}/>','<OrbitalSpaceStation quality={quality}/>','quality===\'LOW\'?360:quality===\'BALANCED\'?850:1500','root.current.position.copy(pos)','antenna.current.rotation.y=t*.25'])assert.ok(s.includes(key),key);
console.log('Dynamic mini vortex and orbiting space station: PASS');
