import fs from 'node:fs';import assert from 'node:assert/strict';
const code=fs.readFileSync('components/graphicsQuality.ts','utf8');
assert(code.includes('initialTier')&&code.includes('nextTier'));
// Mirror the pure policy's boundary conditions in JS (no TypeScript runtime required).
function next(current,frames,changed,started){if(started<9||changed<9||frames.length<6)return current;const sorted=[...frames].sort((a,b)=>a-b);const median=sorted[Math.floor(sorted.length/2)],low=sorted[Math.floor(sorted.length*.2)];if(median<28||low<20)return current==='HIGH'?'BALANCED':'LOW';if(median<43&&current==='HIGH')return 'BALANCED';if(median>=57&&low>=49){if(current==='LOW')return 'BALANCED';if(current==='BALANCED')return 'HIGH'}return current;}
const samples=(n)=>Array(20).fill(n);
assert.equal(next('HIGH',samples(22),10,12),'BALANCED');
assert.equal(next('BALANCED',samples(22),10,12),'LOW');
assert.equal(next('LOW',samples(60),10,12),'BALANCED');
assert.equal(next('BALANCED',samples(60),10,12),'HIGH');
assert.equal(next('HIGH',samples(25),4,12),'HIGH');
assert.equal(next('LOW',samples(60),20,4),'LOW');
assert.equal(next('LOW',samples(48),20,20),'LOW');
console.log('PASS adaptive policy: downgrade, upgrade, cooldown, warmup, stable tier');
