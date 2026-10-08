import fs from 'node:fs';import assert from 'node:assert/strict';
const s=fs.readFileSync('components/WebGLScene.tsx','utf8');
for(const k of ['MINI_ACCRETION_VERTEX','MINI_ACCRETION_FRAGMENT','uniform float uTime','diskShader.current.uniforms.uTime.value=t','function RemoteSpiralVortex','function OrbitalSpaceStation','const docks=quality','Outer industrial truss','Independent docking modules','Engineering bridge and paired propulsion nacelles','Thin, transparent glass-edge accent']) assert.ok(s.includes(k),`Missing: ${k}`);
assert.ok(s.includes('root.current.rotation.set(.05,.06,-.26)'),'Mini disk orientation must remain fixed');
assert.ok(!s.includes('root.current.rotation.z=t*'),'Do not spin the whole mini black hole');
assert.ok(fs.existsSync('docs/ROADMAP_HISTORY_THROUGH_v0.0.125.md'));
console.log('Cinematic orbital geometry, animated accretion shader, roadmap archive: PASS');
