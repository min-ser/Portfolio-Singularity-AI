import fs from 'node:fs';
import assert from 'node:assert/strict';
const scene=fs.readFileSync(new URL('../components/WebGLScene.tsx',import.meta.url),'utf8');
const start=scene.indexOf('function HubIdentityBeacon(');
const end=scene.indexOf('function GitBlogEmblem(',start);
assert.ok(start>=0 && end>start,'Foreground emblem component exists');
const emblem=scene.slice(start,end);
for(const id of ['profile','career','projects','portfolio','github','expertise','training','archive']) {
 assert.ok(emblem.includes(`id==='${id}'`),`${id} has its own foreground silhouette`);
}
assert.ok(scene.includes('<HubIdentityBeacon id={id} tone={tone}/>'),'All hubs render emblem');
assert.ok(scene.includes('function SaturnPlanetRings(') && !scene.slice(scene.indexOf('function Hub({'),scene.indexOf('\nfunction ',scene.indexOf('function Hub({')+10)).includes('<mesh ref={ringB}'),'Crossed foreground orbits replaced by planet ring planes');
console.log('PASS: 8 unique foreground emblems, shared rendering, restrained orbit occlusion');
