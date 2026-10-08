import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('components/WebGLScene.tsx','utf8');
for(const token of ['function CinematicCornerAsteroids','<CinematicCornerAsteroids quality={quality}/>','vec3 galaxy(vec2 uv','float corner=smoothstep(.38,.85,center)','float lane=','uDetail.value=quality','quality===\'LOW\'?8:quality===\'BALANCED\'?19:34']) assert.ok(source.includes(token),token);
console.log('Corner galaxy/nebula/asteroid quality checks PASS');
