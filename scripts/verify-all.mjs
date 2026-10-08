import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
const scripts=fs.readdirSync(new URL('./',import.meta.url)).filter(x=>x.startsWith('verify-')&&x.endsWith('.mjs')&&x!=='verify-all.mjs');
let failures=0;
for(const script of ['validate.mjs',...scripts]){const result=spawnSync(process.execPath,[new URL(script,import.meta.url).pathname],{encoding:'utf8'});const status=result.status===0?'PASS':'FAIL';console.log(`${status} ${script}`);if(result.status!==0){failures++;process.stderr.write(result.stderr||result.stdout||'Unknown error\n');}}
console.log(`Source-level checks: ${scripts.length+1-failures}/${scripts.length+1} passed`);
if(failures)process.exit(1);
