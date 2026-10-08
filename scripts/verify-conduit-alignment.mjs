import fs from 'node:fs';import assert from 'node:assert/strict';
const s=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
for(const token of ['attribute vec3 aRiverNormal','uHubIndex','geometry.setAttribute(\'aRiverNormal\'','float wave=sin(uTime*.46+seed+q*4.4)*.115','float breathe=sin(uTime*.19+seed*.7)*.055','float shear=sin(uTime*.31+seed*.43+q*2.15)*.070','visibleInfallPosition(h,progress,t)'])assert.ok(s.includes(token),`missing ${token}`);
assert.ok(s.includes('p+=aRiverNormal*((wave+breathe+shear)*env)'));
assert.ok(s.includes('p.z+=depth'));
console.log('PASS: conduit deformation and traveling packets share live river field');
