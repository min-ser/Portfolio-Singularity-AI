import fs from 'node:fs';
import assert from 'node:assert/strict';
const src=fs.readFileSync('components/WebGLScene.tsx','utf8');
for(const name of ['CINEMATIC_SPACE_FRAGMENT','CinematicSpaceClouds','AccretionDustFilaments','galaxy(vec2 uv','amberArm'])assert.ok(src.includes(name),name);
assert.ok(src.includes('<CinematicSpaceClouds quality={quality}/>'));
assert.ok(src.includes('<AccretionDustFilaments activation={activation} quality={quality}/>'));
assert.match(src,/quality==='LOW'\?360:quality==='BALANCED'\?950:1900/);
console.log('Cinematic backdrop, spiral dust and quality budgets: PASS');
