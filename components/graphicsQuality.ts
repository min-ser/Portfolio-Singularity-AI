// Adaptive graphics policy. Pure functions keep browser timing and decisions testable.
export type GraphicsTier='LOW'|'BALANCED'|'HIGH';
export type QualityMode='AUTO'|GraphicsTier;
export type DeviceHint={mobile:boolean;logicalPixels:number;deviceMemory?:number;hardwareConcurrency?:number;webgl2:boolean};
export function initialTier(h:DeviceHint):GraphicsTier{
 if(!h.webgl2||h.mobile||h.logicalPixels>4_500_000||h.deviceMemory!==undefined&&h.deviceMemory<=4)return 'LOW';
 if(h.logicalPixels>2_500_000||h.hardwareConcurrency!==undefined&&h.hardwareConcurrency<=4)return 'BALANCED';
 return 'HIGH'; // optimistic: sustained frame measurements can downgrade it.
}
export function nextTier(current:GraphicsTier,frames:number[],secondsSinceChange:number,secondsSinceStart:number):GraphicsTier{
 if(secondsSinceStart<9||secondsSinceChange<9||frames.length<6)return current;
 const sorted=[...frames].sort((a,b)=>a-b);
 const median=sorted[Math.floor(sorted.length/2)];
 const low=sorted[Math.floor(sorted.length*.20)];
 // Fast downgrade, conservative upgrades; capped at one tier per evaluation.
 if(median<28||low<20)return current==='HIGH'?'BALANCED':'LOW';
 if(median<43&&current==='HIGH')return 'BALANCED';
 if(median>=57&&low>=49){if(current==='LOW')return 'BALANCED';if(current==='BALANCED')return 'HIGH';}
 return current;
}
export function deviceHint():DeviceHint{
 const nav=navigator as Navigator & {deviceMemory?:number};
 let webgl2=false;
 try{const canvas=document.createElement('canvas');webgl2=!!canvas.getContext('webgl2');}catch{}
 return {mobile:matchMedia('(pointer:coarse)').matches||innerWidth<=760,logicalPixels:innerWidth*innerHeight*devicePixelRatio**2,deviceMemory:nav.deviceMemory,hardwareConcurrency:navigator.hardwareConcurrency,webgl2};
}
