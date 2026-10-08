'use client';
import * as THREE from 'three';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {Sparkles} from '@react-three/drei';
import {Bloom, EffectComposer, Vignette} from '@react-three/postprocessing';
import {ReactNode, useEffect, useLayoutEffect, useMemo, useRef} from 'react';

type Node3D={id:string;pos:[number,number,number];tone:string;kind:'azure'|'projects'|'fabric'|'data'|'study'|'aks'|'expertise';domains:string[]};
// v0.0.92: preserve the eight hub identities while clearing space around the lensing disk.
// The same anchors drive the hub meshes, moving orbits, highways, infall and HUD projection.
const HUB_RADIAL_SPREAD = 1.10;
const nodes:Node3D[]=[
 {id:'profile',kind:'azure',pos:[-0.35,3.18,-0.6],tone:'#36baff',domains:['PROFILE','NAVIGATION','PORTFOLIO']},
 {id:'career',kind:'projects',pos:[-3.55,2.15,-0.2],tone:'#4dbbff',domains:['CAREER','NAVIGATION','PORTFOLIO']},
 {id:'projects',kind:'projects',pos:[3.55,2.15,-0.2],tone:'#ffb35b',domains:['PROJECTS','NAVIGATION','PORTFOLIO']},
 {id:'portfolio',kind:'fabric',pos:[-4.12,0.0,-0.4],tone:'#2de9c7',domains:['PORTFOLIO','NAVIGATION','PORTFOLIO']},
 {id:'github',kind:'aks',pos:[4.12,0.0,-0.4],tone:'#a47aff',domains:['GITHUB','NAVIGATION','PORTFOLIO']},
 {id:'expertise',kind:'expertise',pos:[-3.55,-2.1,-0.3],tone:'#ff6da9',domains:['EXPERTISE','NAVIGATION','PORTFOLIO']},
 {id:'training',kind:'study',pos:[-0.4,-2.82,-0.5],tone:'#ffc56c',domains:['TRAINING','NAVIGATION','PORTFOLIO']},
 {id:'archive',kind:'data',pos:[3.55,-2.1,-0.3],tone:'#56dfff',domains:['ARCHIVE','NAVIGATION','PORTFOLIO']},
].map(n=>({...n,pos:[n.pos[0]*HUB_RADIAL_SPREAD,n.pos[1]*HUB_RADIAL_SPREAD,n.pos[2]] as [number,number,number]}));

// v0.0.22 composition correction: keep the complete network above the bottom HUD safe-zone.
const SCENE_Y_OFFSET = 0.56;
// v0.0.54: preserve the central focal corridor and spread hub anchors away from dense river junctions.

// v0.0.52 Motion Choreography — local motion remains autonomous, but every layer now has a distinct tempo family and easing envelope.
type OrbitConfig={rx:number;ry:number;phase:number;speed:number;zAmp:number;incline:number;direction:number};
const ORBITS:Record<string,OrbitConfig>={
 profile:{rx:.24,ry:.16,phase:2.62,speed:.245,zAmp:.11,incline:.04,direction:1},
 career:{rx:.24,ry:.17,phase:1.82,speed:.305,zAmp:.14,incline:-.03,direction:-1},
 projects:{rx:.23,ry:.17,phase:.43,speed:.218,zAmp:.13,incline:.04,direction:1},
 portfolio:{rx:.23,ry:.13,phase:-.36,speed:.166,zAmp:.09,incline:-.02,direction:-1},
 github:{rx:.23,ry:.18,phase:-1.36,speed:.338,zAmp:.16,incline:.05,direction:1},
 expertise:{rx:.21,ry:.145,phase:-2.63,speed:.151,zAmp:.10,incline:-.03,direction:1},
 training:{rx:.25,ry:.155,phase:3.08,speed:.192,zAmp:.095,incline:.03,direction:-1},
 archive:{rx:.20,ry:.14,phase:1.22,speed:.182,zAmp:.10,incline:.02,direction:-1},
};
const ORBIT_RUNTIME:Record<string,{angle:number;velocity:number;position:THREE.Vector3}>={};
nodes.forEach(n=>{const c=ORBITS[n.id];ORBIT_RUNTIME[n.id]={angle:c.phase,velocity:c.speed*c.direction,position:new THREE.Vector3(...n.pos)}});
function orbitPosition(id:string,t:number){const n=nodes.find(x=>x.id===id)!,c=ORBITS[id],r=ORBIT_RUNTIME[id];const a=r?.angle??(c.phase+t*c.speed*c.direction);return new THREE.Vector3(n.pos[0]+Math.cos(a)*c.rx,n.pos[1]+Math.sin(a)*c.ry+Math.sin(a*.73+c.phase)*c.incline,n.pos[2]+Math.sin(a)*c.zAmp)}
function currentNodePosition(id:string){return ORBIT_RUNTIME[id]?.position.clone()??new THREE.Vector3(...nodes.find(n=>n.id===id)!.pos)}
function IndependentOrbitController({activeId,profile}:{activeId:string|null;profile:string}){useFrame((state,delta)=>{const mobile=profile.startsWith('mobile'),t=state.clock.elapsedTime;for(const n of nodes){const c=ORBITS[n.id],r=ORBIT_RUNTIME[n.id];const focus=activeId===n.id;const personality=1+Math.sin(t*(.075+c.speed*.13)+c.phase*2.3)*.14+Math.sin(t*.033+c.phase)*.055;const focusEase=focus?.30:1;const target=c.speed*c.direction*personality*focusEase*(mobile?.72:1);r.velocity=THREE.MathUtils.damp(r.velocity,target,1.05,delta);r.angle=(r.angle+r.velocity*delta)%(Math.PI*2);r.position.copy(orbitPosition(n.id,t));}});return null}

function CoreParticles(){const ref=useRef<THREE.Points>(null!);const positions=useMemo(()=>{const a=new Float32Array(900*3);for(let i=0;i<900;i++){const u=(i+.5)/900,phi=Math.acos(1-2*u),theta=Math.PI*(1+Math.sqrt(5))*i,r=.72+(Math.sin(i*12.9898)*.5+.5)*.32;a[i*3]=r*Math.sin(phi)*Math.cos(theta);a[i*3+1]=r*Math.cos(phi);a[i*3+2]=r*Math.sin(phi)*Math.sin(theta)}return a},[]);useFrame((s,d)=>{const t=s.clock.elapsedTime;ref.current.rotation.y+=d*(.075+Math.sin(t*.11)*.012);ref.current.rotation.x=Math.sin(t*.145)*.105});return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#a9f4ff" size={.026} transparent opacity={.92} depthWrite={false} blending={THREE.AdditiveBlending}/></points>}
function Orbit({r,tube,color,rotation,speed}:{r:number;tube:number;color:string;rotation:[number,number,number];speed:number}){const ref=useRef<THREE.Mesh>(null!);useFrame((_,d)=>{ref.current.rotation.z+=d*speed});return <mesh ref={ref} rotation={rotation}><torusGeometry args={[r,tube,10,160]}/><meshBasicMaterial color={color} transparent opacity={.72} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>}
function PulseWaves(){const a=useRef<THREE.Mesh>(null!),b=useRef<THREE.Mesh>(null!);useFrame(s=>{const t=s.clock.elapsedTime;[[a.current,(t*.28)%1],[b.current,(t*.28+.5)%1]].forEach(([m,p])=>{const mesh=m as THREE.Mesh,q=p as number;mesh.scale.setScalar(1+q*2.4);(mesh.material as THREE.MeshBasicMaterial).opacity=(1-q)*.28})});return <group rotation={[Math.PI/2,0,0]}><mesh ref={a}><ringGeometry args={[1.05,1.075,128]}/><meshBasicMaterial color="#43dfff" transparent opacity={.25} side={THREE.DoubleSide} depthWrite={false}/></mesh><mesh ref={b}><ringGeometry args={[1.05,1.075,128]}/><meshBasicMaterial color="#5a8dff" transparent opacity={.2} side={THREE.DoubleSide} depthWrite={false}/></mesh></group>}
function CoreEnergyLattice(){
 const a=useRef<THREE.Group>(null!),b=useRef<THREE.Group>(null!);
 useFrame((state,delta)=>{const t=state.clock.elapsedTime;a.current.rotation.y+=delta*.16;a.current.rotation.x=Math.sin(t*.23)*.16;b.current.rotation.y-=delta*.11;b.current.rotation.z+=delta*.07});
 const nodes=useMemo(()=>Array.from({length:18},(_,i)=>{const phi=Math.acos(1-2*(i+.5)/18),theta=Math.PI*(1+Math.sqrt(5))*i;return [Math.sin(phi)*Math.cos(theta)*.55,Math.cos(phi)*.55,Math.sin(phi)*Math.sin(theta)*.55] as [number,number,number]}),[]);
 return <><group ref={a}>{nodes.map((p,i)=><mesh key={i} position={p} scale={i%3===0?.055:.032}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial color={i%3===0?'#eaffff':'#56dfff'} transparent opacity={.82} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>)}</group><group ref={b} scale={1.18}><mesh><icosahedronGeometry args={[.66,1]}/><meshBasicMaterial color="#3c86ff" wireframe transparent opacity={.13} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh></group></>
}
function CoreArcBands(){const g=useRef<THREE.Group>(null!);useFrame((state,delta)=>{g.current.rotation.y-=delta*.045;g.current.rotation.z=Math.sin(state.clock.elapsedTime*.16)*.12});return <group ref={g}>{[0,1,2,3].map(i=><mesh key={i} rotation={[.45+i*.42,.18+i*.61,.35+i*.27]}><torusGeometry args={[1.12+i*.10,.008+(i%2)*.004,6,128,Math.PI*(1.05+i*.12)]}/><meshBasicMaterial color={i%2?'#6d83ff':'#72efff'} transparent opacity={.28-i*.035} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>)}</group>}
// v0.0.74: shader-based luminous accretion field and preserved orbital light particles.
// A single GPU-drawn annulus replaces flat, nested tube rings. No postprocessing required on LOW.
const ACCRETION_VERTEX = `
 varying vec2 vUv;
 void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
const ACCRETION_FRAGMENT = `
 uniform float uTime;
 uniform float uActive;
 uniform float uLayer;
 varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 void main(){
  vec2 p=vUv*2.0-1.0;
  float r=length(p),theta=atan(p.y,p.x);
  if(r<0.315||r>0.985)discard;
  float time=uTime*(0.22+uActive*0.18);
  // Differential rotation: inner material sweeps faster than outer material.
  float omega=pow(max(r,0.32),-1.5);
  float azimuth=theta+time*omega;
  float swirl=azimuth*8.0-30.0*log(max(r,0.32));
  float turbulence=noise(vec2(azimuth*9.0+r*3.0,r*39.0-time*2.1+uLayer*3.7));
  float micro=noise(vec2(azimuth*27.0,r*89.0+time*1.3+uLayer*4.0));
  float filament=pow(.5+.5*sin(swirl+3.3*turbulence),7.0);
  float annulus=smoothstep(.34,.42,r)*(1.0-smoothstep(.86,.99,r));
  float temperature=pow(1.0-clamp((r-.33)/.67,0.0,1.0),1.5);
  float density=annulus*(.25+.85*filament+.50*turbulence+.22*micro);
  // Screen-side beaming approximation; boosted approaching side.
  float beaming=pow(1.0+0.30*cos(theta-.58),2.5);
  float hot=exp(-pow((r-.39)*14.0,2.0))*(.55+.45*pow(max(0.,cos(theta-.58)),2.0));
  vec3 outer=vec3(.09,.12,.48),blue=vec3(.04,.38,1.0),cyan=vec3(.11,.82,1.0),white=vec3(1.0,.96,.89);
  vec3 color=mix(outer,blue,clamp(turbulence*.65+filament*.5,0.0,1.0));
  color=mix(color,cyan,clamp(temperature*.85,0.0,1.0));
  float amberArm=pow(.5+.5*sin(swirl*.72+uLayer*1.7+1.1),4.0);
  color=mix(color,vec3(1.0,.27,.055),clamp(amberArm*(.35+.65*temperature)*.93,0.,.9));
  color=mix(color,white,clamp(hot*.82+micro*temperature*.20,0.0,1.0));
  float energy=density*beaming*(.48+temperature*.70)*(1.0+uActive*.58);
  // Uneven clumps and vertical sheets, not uniform concentric neon circles.
  energy*=.68+.32*sin(uLayer*1.71+theta*2.0+turbulence*3.0);
  gl_FragColor=vec4(color*min(energy*1.35,2.2),clamp(energy*.23,0.0,.39));
 }
`;
function AccretionField({active,quality,layer=0}:{active:{current:number};quality:'HIGH'|'BALANCED'|'LOW';layer?:number}){
 const material=useMemo(()=>new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uActive:{value:0},uLayer:{value:layer}},vertexShader:ACCRETION_VERTEX,fragmentShader:ACCRETION_FRAGMENT,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}),[]);
 useFrame((state)=>{material.uniforms.uTime.value=state.clock.elapsedTime+layer*.61;material.uniforms.uActive.value=active.current;});
 useLayoutEffect(()=>()=>material.dispose(),[material]);
 return <mesh position={[0,0,layer*.055]} scale={1+Math.abs(layer)*.028}><planeGeometry args={[3.9,3.9,1,1]}/><primitive object={material} attach="material"/></mesh>;
}
// v0.0.87: Actual volumetric geometry (toroidal gas shells), not extra 2D rings.
// A closed 3D gas volume has a cross-section, visible near/far faces and depth.
const GAS_VERTEX = `
 attribute float aRadius;
 attribute float aHeight;
 varying vec3 vLocal;
 varying float vRadial;
 varying float vHeight;
 void main(){
   vLocal=position;
   vRadial=aRadius;
   vHeight=aHeight;
   gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
 }
`;
const GAS_FRAGMENT = `
 uniform float uTime;
 uniform float uActive;
 uniform float uShell;
 varying vec3 vLocal;
 varying float vRadial;
 varying float vHeight;
 float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float n21(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
 void main(){
  float r=length(vLocal.xy);
  float angle=atan(vLocal.y,vLocal.x);
  // Differential angular velocity: inner gas advects faster than outer gas.
  float advect=uTime*(0.12+uActive*.14)*pow(max(r,.7),-1.5);
  float theta=angle+advect;
  float spiral=theta*7.-13.*log(max(r,.7));
  float turbulence=n21(vec2(theta*12.+uShell*7.,r*24.-uTime*.65));
  float detail=n21(vec2(theta*33.+r*9.,r*68.+uTime*.43));
  float filament=pow(.5+.5*sin(spiral+3.6*turbulence),3.5);
  float heightFade=pow(max(0.,1.-abs(vHeight)),1.25);
  float radialFade=smoothstep(.83,1.04,r)*(1.-smoothstep(1.68,1.93,r));
  float clump=clamp(.13+.58*filament+.55*turbulence+.22*detail,0.,1.);
  float beam=pow(1.+.42*cos(angle-.75),2.8);
  float heat=pow(clamp((1.95-r)/1.3,0.,1.),1.3);
  vec3 cold=vec3(.09,.12,.45),warm=vec3(.05,.48,1.0),hot=vec3(.58,.95,1.0);
  vec3 amber=vec3(1.0,.42,.11);
  vec3 color=mix(cold,warm,clamp(heat*.95+turbulence*.28,0.,1.));
  color=mix(color,hot,clamp(heat*filament*.9,0.,1.));
  color=mix(color,amber,pow(max(0.,cos(angle-.42)),5.)*(.30+.20*turbulence));
  float opacity=radialFade*heightFade*clump*beam*(.105+uActive*.075);
  opacity*=.72+.28*sin(uShell*2.5+theta*4.);
  if(opacity<.008)discard;
  gl_FragColor=vec4(color*(.65+heat*1.3),clamp(opacity,0.,.48));
 }
`;
function buildGasShell(shell:number,quality:'HIGH'|'BALANCED'|'LOW'){
 const sectors=quality==='HIGH'?224:quality==='BALANCED'?128:72;
 const tubes=quality==='HIGH'?20:quality==='BALANCED'?12:8;
 const vertices:number[]=[],radials:number[]=[],heights:number[]=[],indices:number[]=[];
 const center=1.35+shell*.105,radialThickness=.36+shell*.035;
 const verticalThickness=.19+shell*.055;
 for(let j=0;j<=tubes;j++){
  const cross=j/tubes*Math.PI*2;
  const rr=center+Math.cos(cross)*radialThickness;
  const hh=Math.sin(cross)*verticalThickness;
  for(let i=0;i<=sectors;i++){
   const theta=i/sectors*Math.PI*2;
   // 3D nonuniform torus: height is part of the geometry, not a flat sprite.
   const corrugation=1+.022*Math.sin(theta*11+shell*2.3)+.015*Math.cos(theta*19-shell);
   vertices.push(rr*corrugation*Math.cos(theta),rr*corrugation*Math.sin(theta),hh);
   radials.push(rr);heights.push(Math.sin(cross));
  }
 }
 for(let j=0;j<tubes;j++)for(let i=0;i<sectors;i++){
  const a=j*(sectors+1)+i,b=a+sectors+1;
  indices.push(a,b,a+1,b,b+1,a+1);
 }
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 geometry.setAttribute('aRadius',new THREE.Float32BufferAttribute(radials,1));
 geometry.setAttribute('aHeight',new THREE.Float32BufferAttribute(heights,1));
 geometry.setIndex(indices);
 geometry.computeVertexNormals();
 return geometry;
}
function VolumetricGasShell({shell,quality,activation}:{shell:number;quality:'HIGH'|'BALANCED'|'LOW';activation:{current:number}}){
 const geometry=useMemo(()=>buildGasShell(shell,quality),[shell,quality]);
 const material=useMemo(()=>new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0},uActive:{value:0},uShell:{value:shell}},
  vertexShader:GAS_VERTEX,fragmentShader:GAS_FRAGMENT,
  side:THREE.DoubleSide,transparent:true,depthWrite:false,depthTest:true,
  blending:THREE.AdditiveBlending
 }),[shell]);
 useFrame(state=>{material.uniforms.uTime.value=state.clock.elapsedTime;material.uniforms.uActive.value=activation.current;});
 useLayoutEffect(()=>()=>{geometry.dispose();material.dispose();},[geometry,material]);
 return <mesh geometry={geometry} material={material} renderOrder={1}/>;
}
// v0.0.85 — shared gravitational infall approximation.
// Schwarzschild reference scales + viscous drift and angular-momentum loss.
// The scene is cinematic: not a GR geodesic ray tracer or fluid simulation.
const TAU = Math.PI * 2;
const RS = .65;
const INFALL_OUTER = 4.10;
const INFALL_INNER = RS * 1.012;
const DISK_INCLINATION = 1.08;
const DISK_ROLL = -.40;
const GM_SCENE = 1.15;
const PHOTON_ORBIT = 1.5 * RS;
const ISCO = 3.0 * RS;
// Normalized time follows inward advection dr/dt = -k * r^-0.5.
// Integrating gives r^(3/2) linear in time. Thus inward radial speed grows.
function spiralRadius(progress:number){
 const p=THREE.MathUtils.clamp(progress,0,1);
 const outer=INFALL_OUTER**1.5,inner=INFALL_INNER**1.5;
 return Math.pow(outer+(inner-outer)*p,2/3);
}
// Integrate angular velocity omega(r) ~ sqrt(GM/r^3) over the radial drift.
// Since r^(3/2) changes linearly with progress, theta is logarithmic in r.
// Negative sign means clockwise in the default screen-facing XY projection.
function spiralAngle(progress:number,phase:number){
 const p=THREE.MathUtils.clamp(progress,0,1);
 const q0=INFALL_OUTER**1.5,q1=INFALL_INNER**1.5;
 const q=q0+(q1-q0)*p;
 const winding=4.3*Math.sqrt(GM_SCENE)*Math.log(q0/q)/(q0-q1)*q0;
 return phase-winding;
}
function infallPosition(progress:number,phase:number,height:number=0){
 const r=spiralRadius(progress),a=spiralAngle(progress,phase);
 const x=r*Math.cos(a),localY=r*Math.sin(a);
 const y=localY*Math.cos(DISK_INCLINATION)-height*Math.sin(DISK_INCLINATION);
 const z=localY*Math.sin(DISK_INCLINATION)+height*Math.cos(DISK_INCLINATION);
 return new THREE.Vector3(x*Math.cos(DISK_ROLL)-y*Math.sin(DISK_ROLL),x*Math.sin(DISK_ROLL)+y*Math.cos(DISK_ROLL),z);
}
// GPU point sprites: individually varying radii without one draw call per glowing sphere.
const LIGHT_VERTEX = `
 attribute float aSize;
 varying vec3 vColor;
 void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);
 gl_PointSize=clamp(aSize*(10.2/max(2.0,-mv.z)),2.0,30.0);
 gl_Position=projectionMatrix*mv;}
`;
const LIGHT_FRAGMENT = `
 varying vec3 vColor;
 void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;
 float core=1.0-smoothstep(.08,.43,d);
 float halo=(1.0-smoothstep(.30,1.0,d))*.36;
 float alpha=core+halo;
 if(alpha<.012)discard;
 gl_FragColor=vec4(vColor*(1.15+core*.65),min(alpha,.98));}
`;
function LuminousPoints({positions,colors,sizes,points}:{positions:Float32Array;colors:Float32Array;sizes:Float32Array;points:import("react").RefObject<THREE.Points|null>}){
 const mat=useMemo(()=>new THREE.ShaderMaterial({vertexShader:LIGHT_VERTEX,fragmentShader:LIGHT_FRAGMENT,transparent:true,depthWrite:false,vertexColors:true,blending:THREE.AdditiveBlending}),[]);
 useLayoutEffect(()=>()=>mat.dispose(),[mat]);
 return <points ref={points} frustumCulled={false}><bufferGeometry>
 <bufferAttribute attach="attributes-position" args={[positions,3]}/>
 <bufferAttribute attach="attributes-color" args={[colors,3]}/>
 <bufferAttribute attach="attributes-aSize" args={[sizes,1]}/>
 </bufferGeometry><primitive object={mat} attach="material"/></points>;
}
function SingularityOrbitLights({activation,quality}:{activation:{current:number};quality:'HIGH'|'BALANCED'|'LOW'}){
 const count=quality==='LOW'?40:quality==='BALANCED'?96:240;
 const points=useRef<THREE.Points>(null);
 const gravity=useRef(0);
 const phaseClock=useRef(0);
 const positions=useMemo(()=>new Float32Array(count*3),[count]);
 const sizes=useMemo(()=>Float32Array.from({length:count},(_,i)=>i%11===0?19:i%4===0?12:6+(i%5)),[count]);
 const colors=useMemo(()=>{const a=new Float32Array(count*3);for(let i=0;i<count;i++){const c=new THREE.Color(i%9===0?'#fff0c9':i%3===0?'#c6aaff':'#70e8ff');a.set([c.r,c.g,c.b],i*3);}return a;},[count]);
 useFrame((state)=>{const t=state.clock.elapsedTime;for(let i=0;i<count;i++){
 const phase=((i*.61803398875)%1)*TAU,r=1.03+((i*13)%37)/37*1.33,speed=.10+((i*17)%29)/29*.13;
 const theta=phase-t*speed*(1+activation.current*.35);
 const h=Math.sin(i*2.37)*.15;
 const y=r*Math.sin(theta)*Math.cos(DISK_INCLINATION)-h*Math.sin(DISK_INCLINATION);
 positions[i*3]=r*Math.cos(theta)*Math.cos(DISK_ROLL)-y*Math.sin(DISK_ROLL);
 positions[i*3+1]=r*Math.cos(theta)*Math.sin(DISK_ROLL)+y*Math.cos(DISK_ROLL);
 positions[i*3+2]=r*Math.sin(theta)*Math.sin(DISK_INCLINATION)+h*Math.cos(DISK_INCLINATION);
 }if(points.current)(points.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate=true;});
 return <LuminousPoints positions={positions} colors={colors} sizes={sizes} points={points}/>;
}
function InfallSpiralLanes({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const arms=quality==='LOW'?3:quality==='BALANCED'?5:8;
 const geometries=useMemo(()=>Array.from({length:arms},(_,arm)=>{
 const samples=quality==='LOW'?190:quality==='BALANCED'?320:520,vertices=new Float32Array(samples*3);
 for(let j=0;j<samples;j++){const p=j/(samples-1),r=spiralRadius(p),a=spiralAngle(p,arm*TAU/arms);
 const v=infallPosition(p,arm*TAU/arms,Math.sin(p*TAU*2+arm)*.06);
 vertices[j*3]=v.x;vertices[j*3+1]=v.y;vertices[j*3+2]=v.z;}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(vertices,3));return g;
 }),[arms,quality]);
 useLayoutEffect(()=>()=>geometries.forEach(g=>g.dispose()),[geometries]);
 return <group>{geometries.map((geometry,i)=><line key={i} geometry={geometry}><lineBasicMaterial color={['#49baff','#a68cff','#f7ae81','#73e5ff'][i]} transparent opacity={quality==='LOW'?.18:.24} depthWrite={false} blending={THREE.AdditiveBlending}/></line>)}</group>;
}
function SingularityInfallParticles({activation,quality}:{activation:{current:number};quality:'HIGH'|'BALANCED'|'LOW'}){
 const count=quality==='LOW'?208:quality==='BALANCED'?480:1152;
 const points=useRef<THREE.Points>(null);
 const gravity=useRef(0);
 const phaseClock=useRef(0);
 const positions=useMemo(()=>new Float32Array(count*3),[count]);
 const sizes=useMemo(()=>new Float32Array(count),[count]);
 const colors=useMemo(()=>{const data=new Float32Array(count*3);for(let i=0;i<count;i++){const c=new THREE.Color(i%17===0?'#ffe4b3':i%7===0?'#caa6ff':i%4===0?'#ffffff':'#68cfff');data.set([c.r,c.g,c.b],i*3);}return data;},[count]);
 const seeds=useMemo(()=>Array.from({length:count},(_,i)=>({phase:(i%5)*TAU/5+((i*37)%31)*.024,offset:(i*.754877666)%1,speed:.018+(i*17%23)/23*.018,tilt:(i%9-4)*.018,base:i%19===0?24:i%7===0?17:i%3===0?12:7+(i%5)})),[count]);
 useFrame((state,delta)=>{
 // Integrate a single travel clock: activation changes velocity, never phase position.
 const dt=Math.min(Math.max(delta,0),.06);
 gravity.current=THREE.MathUtils.damp(gravity.current,activation.current,2.0,dt);
 phaseClock.current+=dt*(1+gravity.current*.70);
 const t=phaseClock.current;
 for(let i=0;i<count;i++){
 const seed=seeds[i],progress=(seed.offset+t*seed.speed)%1,r=spiralRadius(progress),k=i*3;
 const height=seed.tilt*5+Math.sin(i*1.77+progress*12)*(.08+.16*(1-progress));
 const v=infallPosition(progress,seed.phase,height);
 positions[k]=v.x;positions[k+1]=v.y;positions[k+2]=v.z;
 // Perspective-independent size diversity; contraction and fade near event horizon.
 sizes[i]=seed.base*(.72+.40*Math.sin(i*1.47)**2)*(r<ISCO?1.12:.90)*(r<PHOTON_ORBIT?Math.max(.01,(r-INFALL_INNER)/(PHOTON_ORBIT-INFALL_INNER)):1)*(1+.12*Math.sin(t*1.3+i));
 }if(points.current){(points.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate=true;(points.current.geometry.getAttribute('aSize') as THREE.BufferAttribute).needsUpdate=true;}});
 return <LuminousPoints positions={positions} colors={colors} sizes={sizes} points={points}/>;
}
// v0.0.120 — flowing particulate filaments, not concentric torus rings.
// Batched point geometry; particles accelerate and contract toward the event horizon.
function AccretionDustFilaments({quality,activation}:{quality:'HIGH'|'BALANCED'|'LOW';activation:{current:number}}){
 const count=quality==='LOW'?360:quality==='BALANCED'?950:1900;
 const points=useRef<THREE.Points>(null);
 const positions=useMemo(()=>new Float32Array(count*3),[count]);
 const sizes=useMemo(()=>new Float32Array(count),[count]);
 const colors=useMemo(()=>{
  const out=new Float32Array(count*3);
  const palette=['#ff682b','#ffb15e','#fff1c7','#36baff','#87eaff','#bd86ff'];
  for(let i=0;i<count;i++){const c=new THREE.Color(palette[(Math.floor(i/7)+i%3)%palette.length]);out.set([c.r,c.g,c.b],i*3)}
  return out;
 },[count]);
 const seeds=useMemo(()=>Array.from({length:count},(_,i)=>({
  arm:i%9,offset:(i*.61803398875)%1,spread:((i*17)%37/37-.5)*.24,
  speed:.021+(i%13)*.0018,height:((i*23)%29/29-.5)*.22,
  brightness:(i%11===0?17:i%5===0?10:5)
 })),[count]);
 const elapsed=useRef(0);
 useFrame((_,delta)=>{
  elapsed.current+=Math.min(delta,.05)*(1+activation.current*.65);
  for(let i=0;i<count;i++){
   const seed=seeds[i],q=(seed.offset+elapsed.current*seed.speed)%1;
   const phase=seed.arm*Math.PI*2/9+seed.spread;
   const v=infallPosition(q,phase,seed.height*(1-q));
   const k=i*3;positions[k]=v.x;positions[k+1]=v.y;positions[k+2]=v.z;
   // Hot, fast inner material glows brighter; fade just before crossing horizon.
   const fade=Math.min(1,(1-q)*14);
   sizes[i]=seed.brightness*(.72+.55*q)*fade;
  }
  if(points.current){
   (points.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate=true;
   (points.current.geometry.getAttribute('aSize') as THREE.BufferAttribute).needsUpdate=true;
  }
 });
 return <LuminousPoints positions={positions} colors={colors} sizes={sizes} points={points}/>;
}

// v0.0.88 — continuous source-to-horizon trajectories. Each particle is born at
// its own live hub, joins the tilted accretion flow, and is swallowed at RS.
// The junction is C1-continuous (zero endpoint velocity on the bridge), avoiding
// the abrupt spatial reset in the previous linear hub-shear approximation.
const HUB_CAPTURE_START = .39;
function hubToHorizonPosition(anchor:THREE.Vector3,progress:number,phase:number,height:number){
 const p=THREE.MathUtils.clamp(progress,0,1);
 const entry=infallPosition(0,phase,height);
 if(p<=HUB_CAPTURE_START){
  const u=p/HUB_CAPTURE_START;
  const eased=u*u*(3-2*u);
  // Squared sine gives zero bow and zero bow derivative at both ends: C1 junction.
  const bow=Math.sin(Math.PI*u)**2*.22;
  return new THREE.Vector3(
   THREE.MathUtils.lerp(anchor.x,entry.x,eased)-bow*Math.sin(phase),
   THREE.MathUtils.lerp(anchor.y,entry.y,eased)+bow*Math.cos(phase),
   THREE.MathUtils.lerp(anchor.z,entry.z,eased)+bow*.5
  );
 }
 const u=(p-HUB_CAPTURE_START)/(1-HUB_CAPTURE_START);
 // Smooth acceleration from the capture interface, with faster radial fall later.
 const advected=u*u*(2-u);
 return infallPosition(advected,phase,height*(1-u*u*(3-2*u)));
}
function HubGravityInfall({quality,activated}:{quality:'HIGH'|'BALANCED'|'LOW';activated:boolean}){
 const count=quality==='LOW'?64:quality==='BALANCED'?176:384;
 const points=useRef<THREE.Points>(null);
 const gravity=useRef(0);
 const phaseClock=useRef(0);
 const positions=useMemo(()=>new Float32Array(count*3),[count]);
 const sizes=useMemo(()=>new Float32Array(count),[count]);
 const colors=useMemo(()=>{const a=new Float32Array(count*3);for(let i=0;i<count;i++){
  const c=new THREE.Color(nodes[i%nodes.length].tone);a.set([c.r,c.g,c.b],i*3);
 }return a;},[count]);
 const seeds=useMemo(()=>Array.from({length:count},(_,i)=>({
  hub:i%nodes.length,offset:(i*.61803398875)%1,
  phase:(i%nodes.length)*TAU/nodes.length+(i%7-3)*.065,
  speed:.020+(i%11)*.0018,height:((i%13)-6)*.024,
  base:i%19===0?17:i%7===0?12:6+i%5
 })),[count]);
 useFrame((state,delta)=>{
  // Integrate an activation-dependent travel clock: no teleport when switching modes.
  gravity.current=THREE.MathUtils.damp(gravity.current,activated?1:0,2.1,delta);
  const dt=Math.min(delta,.06);
  phaseClock.current+=dt*(1+gravity.current*2.3);
  const t=phaseClock.current;
  const anchors=nodes.map(node=>currentNodePosition(node.id));
  for(let i=0;i<count;i++){
   const seed=seeds[i],p=(seed.offset+t*seed.speed)%1;
   const anchor=anchors[seed.hub];
   const v=hubToHorizonPosition(anchor,p,seed.phase,seed.height);
   const k=i*3;positions[k]=v.x;positions[k+1]=v.y;positions[k+2]=v.z;
   // Occlude at the horizon rather than glowing through the black sphere.
   const r=p>HUB_CAPTURE_START?spiralRadius(((p-HUB_CAPTURE_START)/(1-HUB_CAPTURE_START))**2*(2-(p-HUB_CAPTURE_START)/(1-HUB_CAPTURE_START))):INFALL_OUTER;
   const fade=p>.94?Math.max(0,(1-p)/.06):1;
   sizes[i]=seed.base*(1+gravity.current*.48)*fade*(r<PHOTON_ORBIT?Math.max(0,(r-INFALL_INNER)/(PHOTON_ORBIT-INFALL_INNER)):1);
  }
  if(points.current){
   (points.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate=true;
   (points.current.geometry.getAttribute('aSize') as THREE.BufferAttribute).needsUpdate=true;
  }
 });
 return <LuminousPoints positions={positions} colors={colors} sizes={sizes} points={points}/>;
}
// v0.0.86: lens-map proxy for the far side of an inclined accretion disk.
// For a Schwarzschild black hole the weak-field bending is alpha ≈ 2 rs / b.
// Near the photon sphere that approximation diverges from reality, so we cap
// the deflection and render a continuous projected far-side arc, not concentric tori.
function lensDeflection(impact:number){
 const b=Math.max(impact,PHOTON_ORBIT*1.025);
 return Math.min(1.10,2*RS/b);
}
function lensedFarSidePoint(theta:number,radius:number,upper:boolean){
 const inclination=Math.cos(DISK_INCLINATION);
 const x=radius*Math.cos(theta);
 const y=radius*Math.sin(theta)*inclination;
 const impact=Math.hypot(x,y);
 const bend=lensDeflection(impact);
 // Stronger apparent lift close to the shadow, weaker far from the core.
 const lift=(upper?1:-1)*Math.sin(bend)*(.48+.25*(PHOTON_ORBIT/Math.max(impact,PHOTON_ORBIT)));
 const projectedY=y*.32+lift;
 return new THREE.Vector3(x,projectedY,-.47);
}
// v0.0.91: broad, textured far-side emission ribbons replace thin concentric lines.
// These are screen-space lens proxies, NOT a full GR ray-marching solution.
const LENS_RIBBON_VERTEX = `
 attribute float aArc;
 attribute float aRadial;
 varying float vArc;
 varying float vRadial;
 void main(){vArc=aArc;vRadial=aRadial;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
const LENS_RIBBON_FRAGMENT = `
 uniform float uTime;
 uniform float uActive;
 uniform float uBand;
 varying float vArc;
 varying float vRadial;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 void main(){
  float edge=pow(max(0.,1.-abs(vRadial*2.-1.)),1.7);
  float arcFade=pow(max(0.,sin(vArc*3.14159265)),.42);
  float turbulence=noise(vec2(vArc*31.-uTime*(.32+uBand*.08),vRadial*6.+uBand*4.));
  float streak=pow(.5+.5*sin(vArc*83.-uTime*(1.3+uBand*.22)+turbulence*4.),3.);
  float approaching=.55+.65*pow(max(0.,1.-vArc),1.7);
  float glow=edge*arcFade*(.24+.55*turbulence+.38*streak)*approaching;
  vec3 deep=vec3(.035,.15,.54),bright=vec3(.24,.77,1.0),hot=vec3(.78,.94,1.0);
  vec3 col=mix(deep,bright,clamp(turbulence*.85+streak*.3,0.,1.));
  col=mix(col,hot,clamp(streak*.58+uActive*.16,0.,1.));
  gl_FragColor=vec4(col*(.8+uActive*.48),clamp(glow*(.22+uActive*.12),0.,.52));
 }
`;
function buildLensRibbon(radius:number,upper:boolean,segments:number,width:number){
 const positions:number[]=[],arcs:number[]=[],radials:number[]=[],indices:number[]=[];
 for(let i=0;i<=segments;i++){
  const arc=i/segments,theta=(upper?0:Math.PI)+Math.PI*arc;
  for(let side=0;side<2;side++){
   const p=lensedFarSidePoint(theta,radius+(side-.5)*width,upper);
   positions.push(p.x,p.y,p.z-.008*side);arcs.push(arc);radials.push(side);
  }
 }
 for(let i=0;i<segments;i++){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 geometry.setAttribute('aArc',new THREE.Float32BufferAttribute(arcs,1));
 geometry.setAttribute('aRadial',new THREE.Float32BufferAttribute(radials,1));
 geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function LensedFarSideDisk({quality,activation}:{quality:'HIGH'|'BALANCED'|'LOW';activation:{current:number}}){
 const bands=quality==='HIGH'?3:quality==='BALANCED'?2:1;
 const segments=quality==='HIGH'?144:quality==='BALANCED'?96:56;
 const geometry=useMemo(()=>Array.from({length:bands},(_,i)=>buildLensRibbon(1.12+i*.20,i%2===0,segments,.24+i*.045)),[bands,segments]);
 const materials=useMemo(()=>geometry.map((_,i)=>new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uActive:{value:0},uBand:{value:i}},vertexShader:LENS_RIBBON_VERTEX,fragmentShader:LENS_RIBBON_FRAGMENT,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})),[geometry]);
 useFrame(state=>{for(const m of materials){m.uniforms.uTime.value=state.clock.elapsedTime;m.uniforms.uActive.value=activation.current;}});
 useLayoutEffect(()=>()=>{geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},[geometry,materials]);
 return <group rotation={[0,0,DISK_ROLL]}>{geometry.map((g,i)=><mesh key={i} geometry={g} material={materials[i]} renderOrder={2}/>)}</group>;
}
// v0.0.89: short-lived, energy-conserving-looking response to activation changes.
// Mesh stays hidden at standby; avoids an always-on artificial ring.
function GravityActivationFront({activated,quality}:{activated:boolean;quality:'HIGH'|'BALANCED'|'LOW'}){
 const ring=useRef<THREE.Mesh>(null!);
 const time=useRef(100);
 const previous=useRef(activated);
 useFrame((_,delta)=>{
  if(previous.current!==activated){previous.current=activated;time.current=0;}
  time.current=Math.min(4,time.current+Math.min(delta,.06));
  const p=time.current/2.3;
  if(!ring.current)return;
  const visible=activated&&p<1;
  ring.current.visible=visible;
  if(!visible)return;
  ring.current.scale.setScalar(.74+2.5*p*p);
  (ring.current.material as THREE.MeshBasicMaterial).opacity=.30*Math.sin(Math.PI*p)*(1-p);
 });
 return <mesh ref={ring} visible={false} rotation={[.25,0,0]}>
  <torusGeometry args={[.75,quality==='LOW'?.012:.022,6,quality==='HIGH'?144:72]}/>
  <meshBasicMaterial color="#8bdfff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending}/>
 </mesh>;
}
// v0.0.95: non-uniform, physically motivated photon-emission proxy.
// The shadow is opaque; the ring is a thin, turbulent and Doppler-asymmetric emissive sheet.
// It is NOT a relativistic geodesic solver.
const PHOTON_EMISSION_VERTEX = `
 varying vec2 vUv;
 void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
const PHOTON_EMISSION_FRAGMENT = `
 uniform float uTime;
 uniform float uActive;
 varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){
  vec2 p=(vUv-.5)*2.0;
  float r=length(p),a=atan(p.y,p.x);
  // Photon-orbit light is NOT a uniform torus: angular turbulence and beaming
  // create intermittent arcs with a brighter approaching hemisphere.
  float bend=.0038*sin(a*11.0-uTime*.37)+.0025*sin(a*23.0+uTime*.21);
  float core=exp(-pow((r-(.675+bend))/.013,2.0));
  float skirt=exp(-pow((r-.695)/.037,2.0))*.13;
  float beaming=pow(.66+.34*cos(a-.64),3.2);
  float filament=.72+.28*sin(a*19.0-uTime*.25+hash(vec2(floor(a*12.0),2.0))*2.0);
  float opacity=(core+skirt)*beaming*filament*(.44+uActive*.17);
  if(opacity<.005)discard;
  vec3 cold=vec3(.11,.42,.86),hot=vec3(.83,.95,1.0);
  vec3 color=mix(cold,hot,clamp(core*beaming,0.0,1.0));
  gl_FragColor=vec4(color*(1.0+uActive*.35),min(opacity,.72));
 }
`;
function PhotonEmission({activation,quality}:{activation:{current:number};quality:'HIGH'|'BALANCED'|'LOW'}){
 const material=useMemo(()=>new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0},uActive:{value:0}},vertexShader:PHOTON_EMISSION_VERTEX,
  fragmentShader:PHOTON_EMISSION_FRAGMENT,transparent:true,depthWrite:false,
  depthTest:true,side:THREE.DoubleSide,blending:THREE.AdditiveBlending
 }),[]);
 useFrame(state=>{material.uniforms.uTime.value=state.clock.elapsedTime;material.uniforms.uActive.value=activation.current;});
 useLayoutEffect(()=>()=>material.dispose(),[material]);
 return <mesh position={[0,0,.53]} renderOrder={4}>
  <planeGeometry args={[2,2,1,1]}/><primitive object={material} attach="material"/>
 </mesh>;
}

// v0.0.97: continuous, non-concentric accretion streams.
// A single GPU sheet creates azimuthally sheared caustic arms rather than more torus meshes.
const CAUSTIC_FRAGMENT = `
 uniform float uTime;
 uniform float uActive;
 varying vec2 vUv;
 float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise21(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
 mix(hash21(i+vec2(0.,1.)),hash21(i+vec2(1.,1.)),f.x),f.y);}
 void main(){
   vec2 p=(vUv-.5)*2.;
   float r=length(p),a=atan(p.y,p.x);
   if(r<.245||r>1.)discard;
   float omega=pow(max(r,.29),-1.5);
   float theta=a+uTime*(.11+uActive*.12)*omega;
   float turbulence=noise21(vec2(theta*9.,r*33.-uTime*.4));
   float arms=0.;
   for(int i=0;i<4;i++){
     float phase=float(i)*1.5707963;
     float spiral=theta*2.0-13.0*log(max(r,.27))+phase;
     float stripe=abs(sin(spiral+1.1*(turbulence-.5)));
     arms+=pow(max(0.,1.-stripe),10.)*(.65+.35*turbulence);
   }
   float envelope=smoothstep(.26,.36,r)*(1.-smoothstep(.79,1.,r));
   float glow=arms*envelope*(.38+.62*pow(1.-r,1.1));
   float beaming=pow(.72+.28*cos(a-.7),3.);
   float speckles=noise21(vec2(theta*31.,r*87.+uTime*.32));
   glow*=beaming*(.78+.22*speckles);
   vec3 blue=vec3(.05,.52,1.),violet=vec3(.56,.17,.92),gold=vec3(1.,.49,.14);
   vec3 color=mix(blue,violet,.5+.5*sin(theta*1.6+r*9.));
   color=mix(color,gold,pow(max(0.,cos(theta-.35)),5.)*.75);
   gl_FragColor=vec4(color*(1.15+uActive*.55),min(glow*(.55+uActive*.22),.66));
 }
`;
function AccretionCaustics({activation,quality}:{activation:{current:number};quality:'HIGH'|'BALANCED'|'LOW'}){
 const material=useMemo(()=>new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0},uActive:{value:0}},vertexShader:ACCRETION_VERTEX,
  fragmentShader:CAUSTIC_FRAGMENT,transparent:true,depthWrite:false,depthTest:true,
  side:THREE.DoubleSide,blending:THREE.AdditiveBlending
 }),[]);
 useFrame(st=>{material.uniforms.uTime.value=st.clock.elapsedTime;material.uniforms.uActive.value=activation.current;});
 useLayoutEffect(()=>()=>material.dispose(),[material]);
 return <mesh position={[0,0,-.075]} renderOrder={2}>
  <planeGeometry args={[quality==='LOW'?3.65:4.3,quality==='LOW'?3.65:4.3]}/>
  <primitive object={material} attach="material"/>
 </mesh>;
}

function SingularityCore({activated,quality}:{activated:boolean;quality:'HIGH'|'BALANCED'|'LOW'}){
 const disk=useRef<THREE.Group>(null!);
 const activation=useRef(0);
 useFrame((state,delta)=>{
  activation.current=THREE.MathUtils.damp(activation.current,activated?1:0,2.4,delta);
  const a=activation.current;
  disk.current.rotation.z-=delta*(.035+a*.075); // clockwise on screen, matching orbital and infall
 });
 const high=quality==='HIGH',segments=high?128:quality==='BALANCED'?96:64;
 return <group>
  <GravityActivationFront activated={activated} quality={quality}/>
  {/* The tilted glowing disk extends behind AND in front of the black event horizon. */}
  <group ref={disk} rotation={[DISK_INCLINATION,0,DISK_ROLL]}>
   {/* Volumetric disk: offset plasma sheets produce real front/back depth. */}
   <AccretionField active={activation} quality={quality} layer={0}/>
   <AccretionCaustics activation={activation} quality={quality}/>
   {quality!=='LOW'&&<AccretionField active={activation} quality={quality} layer={-1}/>}
   {quality==='HIGH'&&<>
    <AccretionField active={activation} quality={quality} layer={1}/>
    <AccretionField active={activation} quality={quality} layer={-2}/>
    <AccretionField active={activation} quality={quality} layer={2}/>
   </>}
   {/* True three-dimensional toroidal gas with finite cross-section and turbulent density. */}
   <VolumetricGasShell shell={0} quality={quality} activation={activation}/>
   {quality!=='LOW'&&<VolumetricGasShell shell={1} quality={quality} activation={activation}/>}
   {quality==='HIGH'&&<VolumetricGasShell shell={2} quality={quality} activation={activation}/>}
   {/* The original thin emission sheets remain as a restrained inner glow. */}
  </group>
  {/* An opaque dark horizon, edged with a high-contrast photon ring. */}
  <mesh position={[0,0,0]}><sphereGeometry args={[.65,segments,Math.max(16,segments/2)]}/><meshBasicMaterial color="#000106"/></mesh>
  <PhotonEmission activation={activation} quality={quality}/>
  {/* v0.0.86: projected far-side light paths; radius-dependent gravitational bending proxy. */}
  <LensedFarSideDisk quality={quality} activation={activation}/>
  {/* Real moving lights, not deleted: all are batched in one Points draw call. */}
  <SingularityOrbitLights activation={activation} quality={quality}/>
  {quality==='HIGH'&&<InfallSpiralLanes quality={quality}/>}
  <SingularityInfallParticles activation={activation} quality={quality}/>
  <AccretionDustFilaments activation={activation} quality={quality}/>
 </group>;
}

function HubGlyph({kind,tone}:{kind:Node3D['kind'];tone:string}){const mat=<meshStandardMaterial color="#061d35" emissive={tone} emissiveIntensity={1.8} metalness={.35} roughness={.22}/>;if(kind==='azure')return <><mesh><octahedronGeometry args={[.48,1]}/>{mat}</mesh><mesh scale={[.62,.16,.62]} position={[0,-.46,0]}><sphereGeometry args={[.5,24,12]}/>{mat}</mesh></>;if(kind==='fabric')return <group rotation={[0,0,.18]}><mesh position={[-.17,.08,0]} scale={[.62,1,.35]}><boxGeometry args={[.55,.7,.28]}/>{mat}</mesh><mesh position={[.17,-.08,.02]} scale={[.62,1,.35]}><boxGeometry args={[.55,.7,.28]}/>{mat}</mesh></group>;if(kind==='data')return <><mesh><cylinderGeometry args={[.43,.43,.58,32]}/>{mat}</mesh>{[-.18,0,.18].map((y,i)=><mesh key={i} position={[0,y+.02,.31]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.38,.012,6,48]}/><meshBasicMaterial color={tone}/></mesh>)}</>;if(kind==='aks')return <><mesh><dodecahedronGeometry args={[.48,0]}/>{mat}</mesh><mesh><torusKnotGeometry args={[.23,.045,72,8,2,3]}/><meshBasicMaterial color="#b9f8ff"/></mesh></>;if(kind==='projects')return <><mesh rotation={[.3,.5,.2]}><boxGeometry args={[.62,.62,.62]}/>{mat}</mesh><mesh rotation={[-.3,-.5,-.2]} scale={.62}><boxGeometry args={[.62,.62,.62]}/><meshBasicMaterial color={tone} wireframe/></mesh></>;if(kind==='expertise')return <><mesh><icosahedronGeometry args={[.48,1]}/>{mat}</mesh><mesh scale={1.25}><icosahedronGeometry args={[.48,1]}/><meshBasicMaterial color={tone} wireframe transparent opacity={.38}/></mesh></>;return <><mesh position={[-.2,0,0]} rotation={[0,.18,.08]}><boxGeometry args={[.34,.62,.08]}/>{mat}</mesh><mesh position={[.2,0,0]} rotation={[0,-.18,-.08]}><boxGeometry args={[.34,.62,.08]}/>{mat}</mesh></>}

type TopologyPoint={p:THREE.Vector3;label:string;micro:THREE.Vector3[]};
function topologyFor(n:Node3D,index:number):TopologyPoint[]{return n.domains.map((label,i)=>{const a=(i/6)*Math.PI*2+index*.31,r=.92+(i%2)*.14;const p=new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*(.68+(i%3)*.05),(i%2?-.20:.22));const micro=Array.from({length:4},(_,m)=>{const ma=a+(m-1.5)*.25,mr=.27+(m%2)*.07;return p.clone().add(new THREE.Vector3(Math.cos(ma)*mr,Math.sin(ma)*mr,(m-1.5)*.07))});return {p,label,micro}})}
function LocalTopology({n,index}:{n:Node3D;index:number}){const topo=useMemo(()=>topologyFor(n,index),[n,index]);return <>{topo.map((s,i)=><group key={`${n.id}-topology-${i}`}><line><bufferGeometry setFromPoints={[new THREE.Vector3(),s.p]}/><lineBasicMaterial color={n.tone} transparent opacity={.22}/></line><mesh position={s.p}><icosahedronGeometry args={[.055+(i%3)*.008,1]}/><meshBasicMaterial color={i%3===0?'#ffffff':n.tone}/></mesh><mesh position={s.p} rotation={[Math.PI/2,0,i*.37]}><torusGeometry args={[.14+(i%2)*.018,.006,5,28]}/><meshBasicMaterial color={n.tone} transparent opacity={.26} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>{s.micro.map((m,j)=><group key={j}><line><bufferGeometry setFromPoints={[s.p,m]}/><lineBasicMaterial color={n.tone} transparent opacity={.105}/></line><mesh position={m}><boxGeometry args={[.035,.035,.035]}/><meshBasicMaterial color={j===0?'#dffcff':n.tone} transparent opacity={.58}/></mesh></group>)}</group>)}</>}
// v0.0.47 Micro Network Detail — batched data pulses make each local topology read as an active relay system.
function HubMicroTraffic({n,index}:{n:Node3D;index:number}){
 const topo=useMemo(()=>topologyFor(n,index),[n,index]);
 const edges=useMemo(()=>topo.flatMap((s,si)=>s.micro.map((m,mi)=>({a:s.p,b:m,phase:(si*.173+mi*.241+index*.113)%1,rate:.18+(mi%3)*.035}))),[topo,index]);
 const ref=useRef<THREE.InstancedMesh>(null!),dummy=useMemo(()=>new THREE.Object3D(),[]),last=useRef(0);
 useFrame(st=>{const t=st.clock.elapsedTime;if(t-last.current<1/30)return;last.current=t;const mesh=ref.current;if(!mesh)return;edges.forEach((e,i)=>{const q=(e.phase+t*e.rate)%1;dummy.position.lerpVectors(e.a,e.b,q);const pulse=.018*(.72+.28*Math.sin(Math.PI*q));dummy.scale.setScalar(pulse);dummy.rotation.set(t*.35+i*.07,t*.22,0);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});mesh.instanceMatrix.needsUpdate=true});
 return <instancedMesh ref={ref} args={[undefined,undefined,edges.length]} frustumCulled><octahedronGeometry args={[1,0]}/><meshBasicMaterial color={n.tone} transparent opacity={.86} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
}
// v0.0.34 Local Moon System — each hub owns three moons with independent radius, phase, inclination and angular velocity.
// v0.0.43 Hub Identity Pass I — the first four portfolio domains now carry distinct structural silhouettes.
// v0.0.44 Hub Identity Pass II — AKS / AI Study / Expertise complete the seven-hub identity system.
// v0.0.45 Moon & Satellite System 2.0 — hub-specific satellite silhouettes, eccentric local orbits and visible trails.
function HubIdentityDetails({kind,tone}:{kind:Node3D['kind'];tone:string}){
 const g=useRef<THREE.Group>(null!);useFrame((_,d)=>{if(g.current)g.current.rotation.y+=d*(kind==='fabric'?.12:kind==='data'?.055:.075)});
 if(kind==='azure')return <group ref={g}>{[0,1,2].map(i=><mesh key={i} rotation={[0,i*Math.PI/3,.28+i*.08]}><torusGeometry args={[.50+i*.105,.012,6,64,Math.PI*1.25]}/><meshBasicMaterial color={i===1?'#d8fbff':tone} transparent opacity={.42-i*.07} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>)}<mesh position={[0,-.54,0]} scale={[1,.18,1]}><cylinderGeometry args={[.48,.62,.18,6]}/><meshStandardMaterial color="#041726" emissive={tone} emissiveIntensity={.65} metalness={.78} roughness={.2}/></mesh></group>;
 if(kind==='projects')return <group ref={g}>{[-1,0,1].map((x,i)=><mesh key={i} position={[x*.34,(i-1)*.12,0]} rotation={[.22,i*.52,.15]}><boxGeometry args={[.26,.26,.26]}/><meshPhysicalMaterial color="#071524" emissive={tone} emissiveIntensity={.82} metalness={.7} roughness={.18} clearcoat={1}/></mesh>)}{[-1,1].map((z,i)=><mesh key={'r'+i} position={[0,0,z*.22]} rotation={[Math.PI/2,0,.35]}><torusGeometry args={[.57,.012,6,64]}/><meshBasicMaterial color={i?'#ffd6a3':tone} transparent opacity={.42} depthWrite={false}/></mesh>)}</group>;
 if(kind==='fabric')return <group ref={g}>{[-.34,0,.34].map((x,i)=><mesh key={i} position={[x,(i-1)*.06,0]} rotation={[0,0,(i-1)*-.16]}><boxGeometry args={[.22,.82,.18]}/><meshPhysicalMaterial color="#031a25" emissive={i===1?'#d9ffff':tone} emissiveIntensity={1.0} metalness={.54} roughness={.16} clearcoat={1}/></mesh>)}<mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.58,.018,6,72]}/><meshBasicMaterial color={tone} transparent opacity={.55} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh></group>;
 if(kind==='data')return <group ref={g}>{[-.34,0,.34].map((y,i)=><mesh key={i} position={[0,y,0]} scale={[1-i*.08,.16,1-i*.08]}><cylinderGeometry args={[.50,.50,.18,32]}/><meshPhysicalMaterial color="#061827" emissive={tone} emissiveIntensity={.72+i*.12} metalness={.72} roughness={.2} clearcoat={.8}/></mesh>)}{[0,1,2,3].map(i=>{const a=i*Math.PI/2;return <mesh key={'p'+i} position={[Math.cos(a)*.64,.03,Math.sin(a)*.64]}><boxGeometry args={[.09,.26,.09]}/><meshBasicMaterial color={tone} transparent opacity={.62}/></mesh>})}</group>;
 // v0.0.44 Hub Identity Pass II — AKS is a control-plane wheel: six workload cells around a bright scheduler core.
 if(kind==='aks')return <group ref={g}><mesh><cylinderGeometry args={[.19,.19,.24,6]}/><meshPhysicalMaterial color="#06192d" emissive="#dff8ff" emissiveIntensity={1.35} metalness={.74} roughness={.14} clearcoat={1}/></mesh>{Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2;return <group key={i} position={[Math.cos(a)*.52,Math.sin(a)*.52,0]} rotation={[0,0,a]}><mesh><cylinderGeometry args={[.11,.11,.16,6]}/><meshPhysicalMaterial color="#06172a" emissive={tone} emissiveIntensity={1.0} metalness={.7} roughness={.18} clearcoat={1}/></mesh><mesh position={[-.20,0,0]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[.28,.025,.025]}/><meshBasicMaterial color={tone} transparent opacity={.55}/></mesh></group>})}<mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.52,.022,6,72]}/><meshBasicMaterial color={tone} transparent opacity={.72} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh></group>;
 // AI Study uses an open-book / neural-learning silhouette: paired knowledge panels with a pulsing neural nucleus.
 if(kind==='study')return <group ref={g}><mesh position={[-.25,0,0]} rotation={[0,.18,.12]}><boxGeometry args={[.36,.64,.07]}/><meshPhysicalMaterial color="#090d2b" emissive={tone} emissiveIntensity={.82} metalness={.38} roughness={.22} clearcoat={1}/></mesh><mesh position={[.25,0,0]} rotation={[0,-.18,-.12]}><boxGeometry args={[.36,.64,.07]}/><meshPhysicalMaterial color="#090d2b" emissive={tone} emissiveIntensity={.82} metalness={.38} roughness={.22} clearcoat={1}/></mesh><mesh><octahedronGeometry args={[.17,1]}/><meshBasicMaterial color="#e8e5ff" transparent opacity={.86} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>{[-1,0,1].map((x,i)=><mesh key={i} position={[x*.36,.37-(i%2)*.12,.05]}><sphereGeometry args={[.055,10,8]}/><meshBasicMaterial color={i===1?'#ffffff':tone}/></mesh>)}<mesh rotation={[Math.PI/2.5,.2,.15]}><torusGeometry args={[.58,.012,6,72,Math.PI*1.55]}/><meshBasicMaterial color={tone} transparent opacity={.48} depthWrite={false}/></mesh></group>;
 // Expertise is a faceted knowledge nexus with six specialist facets feeding a mint core.
 if(kind==='expertise')return <group ref={g}><mesh><icosahedronGeometry args={[.31,1]}/><meshPhysicalMaterial color="#061d20" emissive={tone} emissiveIntensity={1.2} metalness={.55} roughness={.14} clearcoat={1}/></mesh>{Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2,r=.55;return <group key={i} position={[Math.cos(a)*r,Math.sin(a)*r*.72,(i%2?-.12:.12)]}><mesh rotation={[a*.35,a,.25]}><tetrahedronGeometry args={[.12,0]}/><meshPhysicalMaterial color="#071c22" emissive={tone} emissiveIntensity={.92} metalness={.62} roughness={.18} clearcoat={1}/></mesh><mesh position={[-Math.cos(a)*.27,-Math.sin(a)*.19,0]} rotation={[0,0,a]}><boxGeometry args={[.30,.018,.018]}/><meshBasicMaterial color={tone} transparent opacity={.45}/></mesh></group>})}<mesh rotation={[Math.PI/2.15,.25,.2]}><torusGeometry args={[.66,.014,6,72]}/><meshBasicMaterial color="#a8ffe6" transparent opacity={.56} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh></group>;
 return null;
}
function HubSatellites({tone,index}:{tone:string;index:number}){
 const roots=useRef<THREE.Group[]>([]);
 // v0.0.45 Moon & Satellite System 2.0 — each hub gets a distinct local satellite family.
 const families=['cloud','module','ribbon','archive','pod','neural','facet'] as const;
 const family=families[index%families.length];
 const cfg=useMemo(()=>[0,1,2].map(i=>({
  r:.90+i*.22+(index%2)*.035,
  phase:index*.67+i*2.17,
  speed:(.145+i*.061)*(i===1?-1:1)*(1+(index%3)*.07),
  incline:.24+i*.13+(index%2)*.035,
  z:.10+(i-1)*.18,
  size:.095+i*.018+(index%3)*.004,
  eccentricity:.92+(i%2)*.12
 })),[index]);
 useFrame((s)=>{const t=s.clock.elapsedTime;roots.current.forEach((g,i)=>{if(!g)return;const c=cfg[i],a=c.phase+t*c.speed;g.position.set(Math.cos(a)*c.r*c.eccentricity,Math.sin(a)*c.r*c.incline,c.z+Math.sin(a*.73+c.phase)*.18);g.rotation.y=t*(.30+i*.09)*(i===1?-1:1);g.rotation.x=Math.sin(t*.23+i)*.24;g.rotation.z=-a*.18})});
 const body=(c:any,i:number)=>{
  const mat=<meshPhysicalMaterial color={i===0?'#e8fbff':'#9edfff'} emissive={tone} emissiveIntensity={1.35+i*.12} metalness={.42} roughness={.14} clearcoat={1} clearcoatRoughness={.08}/>;
  if(family==='cloud')return <group><mesh>{mat}<icosahedronGeometry args={[c.size,2]}/></mesh><mesh scale={[1.7,.38,1]} rotation={[.3,.2,.4]}><torusGeometry args={[c.size*1.1,.012,6,32]}/><meshBasicMaterial color={tone}/></mesh></group>;
  if(family==='module')return <group><mesh>{mat}<boxGeometry args={[c.size*1.55,c.size*.92,c.size*1.15]}/></mesh><mesh position={[c.size*1.05,0,0]}><boxGeometry args={[c.size*.75,c.size*.10,c.size*.9]}/><meshBasicMaterial color={tone}/></mesh></group>;
  if(family==='ribbon')return <group><mesh>{mat}<octahedronGeometry args={[c.size,1]}/></mesh><mesh rotation={[Math.PI/2.2,.2,0]}><torusGeometry args={[c.size*1.65,.009,5,36,Math.PI*1.55]}/><meshBasicMaterial color={tone}/></mesh></group>;
  if(family==='archive')return <group><mesh>{mat}<cylinderGeometry args={[c.size*1.05,c.size*1.05,c.size*.72,18]}/></mesh>{[-.28,.28].map((y,j)=><mesh key={j} position={[0,c.size*y,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[c.size*1.08,.008,5,28]}/><meshBasicMaterial color={tone}/></mesh>)}</group>;
  if(family==='pod')return <group><mesh>{mat}<dodecahedronGeometry args={[c.size,0]}/></mesh>{[0,1,2].map(j=><mesh key={j} rotation={[j*.9,j*.7,j*.4]}><torusGeometry args={[c.size*1.38,.007,5,28]}/><meshBasicMaterial color={tone} transparent opacity={.72}/></mesh>)}</group>;
  if(family==='neural')return <group><mesh>{mat}<icosahedronGeometry args={[c.size*.82,1]}/></mesh>{[0,1,2,3].map(j=>{const a=j*Math.PI/2;return <mesh key={j} position={[Math.cos(a)*c.size*1.35,Math.sin(a)*c.size*1.35,0]}><sphereGeometry args={[c.size*.22,8,6]}/><meshBasicMaterial color={tone}/></mesh>})}</group>;
  return <group><mesh>{mat}<tetrahedronGeometry args={[c.size*1.05,1]}/></mesh><mesh rotation={[.8,.2,.5]}><torusGeometry args={[c.size*1.45,.008,5,30]}/><meshBasicMaterial color={tone}/></mesh></group>;
 };
 return <group>{cfg.map((c,i)=><group key={i}>
  <mesh rotation={[Math.PI/2.25+i*.16,index*.11,0]}><torusGeometry args={[c.r,.006,5,96]}/><meshBasicMaterial color={tone} transparent opacity={.17} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>
  <group ref={g=>{if(g)roots.current[i]=g;else roots.current.splice(i,1)}}>{body(c,i)}<mesh rotation={[Math.PI/2.25+i*.17,0,0]}><torusGeometry args={[c.size*2.0,.006,5,36]}/><meshBasicMaterial color={tone} transparent opacity={.68} depthWrite={false}/></mesh><pointLight color={tone} intensity={.32} distance={1.05}/></group>
 </group>)}</group>
}
function EcosystemFocusAura({tone,enabled}:{tone:string;enabled:boolean}){
 const group=useRef<THREE.Group>(null!);const outer=useRef<THREE.Mesh>(null!);const inner=useRef<THREE.Mesh>(null!);
 useFrame(({clock},dt)=>{if(!group.current)return;const t=clock.elapsedTime;group.current.rotation.z+=dt*.18;group.current.rotation.y=Math.sin(t*.31)*.13;const target=enabled?1:0;const v=THREE.MathUtils.damp(group.current.scale.x,target,5,dt);group.current.scale.setScalar(Math.max(.001,v));if(outer.current)outer.current.rotation.z-=dt*.36;if(inner.current)inner.current.rotation.z+=dt*.48});
 return <group ref={group} scale={.001}><mesh ref={outer} rotation={[Math.PI/2.45,0,.35]}><torusGeometry args={[1.38,.018,6,96]}/><meshBasicMaterial color={tone} transparent opacity={.64} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh><mesh ref={inner} rotation={[Math.PI/2.15,.3,0]}><torusGeometry args={[1.13,.012,6,96]}/><meshBasicMaterial color="#d6faff" transparent opacity={.48} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh><mesh><sphereGeometry args={[1.04,24,16]}/><meshBasicMaterial color={tone} transparent opacity={.045} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh></group>
}
// v0.0.60: compact orbital station architecture, tied to the 8 GitBlog hubs.
// The structural silhouette is deliberately distinct from the old wireframe sphere.
function OrbitalStation({tone,index}:{tone:string;index:number}){
 const rotor=useRef<THREE.Group>(null!);
 const identity=index%8;
 useFrame((state,delta)=>{if(rotor.current){rotor.current.rotation.y+=delta*(.035+index*.003);rotor.current.rotation.z=Math.sin(state.clock.elapsedTime*.26+index)*.009;}});
 // Eight readable silhouettes, with a shared low-cost dock chassis.
 const petals=[4,6,3,8,5,7,6,4][identity];
 const armLength=[.33,.29,.42,.28,.36,.31,.25,.4][identity];
 return <group position={[0,-.49,0]}>
  <mesh position={[0,-.12,0]}><cylinderGeometry args={[.65,.72,.13,12]}/><meshStandardMaterial color="#355469" metalness={.84} roughness={.25} emissive={tone} emissiveIntensity={.26}/></mesh>
  <mesh position={[0,-.015,0]}><cylinderGeometry args={[.55,.59,.08,12]}/><meshStandardMaterial color="#183248" metalness={.86} roughness={.25}/></mesh>
  <mesh position={[0,.038,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.61,.022,6,48]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh>
  <mesh position={[0,-.20,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.70,.014,5,48]}/><meshBasicMaterial color={tone} transparent opacity={.62} depthWrite={false}/></mesh>
  <group ref={rotor}>{Array.from({length:petals},(_,i)=>{const a=i*Math.PI*2/petals;return <group key={i} position={[Math.cos(a)*.62,-.035,Math.sin(a)*.62]} rotation={[0,-a,0]}>
   <mesh position={[armLength*.33,0,0]}><boxGeometry args={[armLength,.085,.13]}/><meshStandardMaterial color="#44647a" metalness={.88} roughness={.25}/></mesh>
   <mesh position={[armLength*.79,.018,0]}><boxGeometry args={[.19,.16,.24]}/><meshStandardMaterial color="#28485f" metalness={.82} roughness={.27} emissive={tone} emissiveIntensity={.24}/></mesh>
   <mesh position={[armLength*.8,.105,0]}><boxGeometry args={[.11,.014,.15]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh>
  </group>})}</group>
  {identity===0||identity===5?<group>{[-1,1].map(side=><mesh key={side} position={[side*.3,.22,0]}><cylinderGeometry args={[.025,.035,.38,6]}/><meshStandardMaterial color="#7292a3" metalness={.9} roughness={.25}/></mesh>)}</group>:null}
  {identity===1||identity===4?<group>{[-1,1].map(side=><mesh key={side} position={[side*.31,.14,0]} rotation={[0,0,side*.24]}><boxGeometry args={[.16,.27,.1]}/><meshStandardMaterial color="#304d60" metalness={.88} roughness={.22}/></mesh>)}</group>:null}
  {identity===2||identity===7?<mesh position={[0,.15,0]}><boxGeometry args={[.42,.19,.34]}/><meshStandardMaterial color="#203b4e" metalness={.88} roughness={.26} emissive={tone} emissiveIntensity={.16}/></mesh>:null}
  {identity===3||identity===6?<mesh position={[0,.13,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.35,.055,6,32]}/><meshStandardMaterial color="#254b5d" metalness={.9} roughness={.23} emissive={tone} emissiveIntensity={.32}/></mesh>:null}
  <mesh position={[0,.13,0]}><cylinderGeometry args={[.22,.3,.12,12]}/><meshStandardMaterial color="#102e42" metalness={.88} roughness={.22} emissive={tone} emissiveIntensity={.35}/></mesh>
 </group>;
}
// v0.0.84: Identity architecture. Distinct silhouettes instead of generic cubes.
// Emblems face the camera-side of each orbital dock, with physical material + emissive highlights.
// v0.0.108 — eight independent orbital station silhouettes, with camera-facing identity glyphs.
// LOW uses the same silhouette but removes fine microstructure; no texture downloads or new draw loops.
function HubArchitecture({id,tone,quality}:{id:string;tone:string;quality:'HIGH'|'BALANCED'|'LOW'}){
 const fine=quality==='HIGH', detail=quality!=='LOW';
 const hull=<meshStandardMaterial color="#2c536b" emissive={tone} emissiveIntensity={.13} metalness={.88} roughness={.26}/>;
 const dark=<meshStandardMaterial color="#071521" metalness={.91} roughness={.24}/>;
 const neon=<meshBasicMaterial color={tone} transparent opacity={.70} depthWrite={false}/>;
 const white=<meshBasicMaterial color="#e5faff" toneMapped={false}/>;
 // v0.0.110: brighter front-facing identity surfaces, restrained emissive contrast.
 const trim=<meshStandardMaterial color="#7896a9" emissive={tone} emissiveIntensity={.20} metalness={.76} roughness={.32}/>;
 const glass=<meshPhysicalMaterial color={tone} emissive={tone} emissiveIntensity={.30} metalness={.38} roughness={.16} clearcoat={.8} transparent opacity={.82} depthWrite={true}/>;

 const bar=(key:string,pos:[number,number,number],size:[number,number,number],rotation:[number,number,number]=[0,0,0],glow=false)=><mesh key={key} position={pos} rotation={rotation}><boxGeometry args={size}/>{glow?neon:hull}</mesh>;
 const dot=(key:string,pos:[number,number,number],r=.055,bright=false)=><mesh key={key} position={pos}><icosahedronGeometry args={[r,1]}/>{bright?white:neon}</mesh>;
 const ring=(key:string,r:number,tube:number,rot:[number,number,number],color=false)=><mesh key={key} rotation={rot}><torusGeometry args={[r,tube,6,quality==='LOW'?28:56]}/>{color?neon:hull}</mesh>;
 return <group position={[0,.06,.08]} scale={.83}>
  {/* Structural frame is deliberately different for each section. */}
  {id==='profile'&&<group>
    <mesh position={[0,.02,0]}><icosahedronGeometry args={[.43,1]}/>{dark}</mesh>
    {ring('halo',.55,.035,[.37,.2,.12])}{ring('scan',.40,.013,[1.02,.1,-.2],true)}
    {dot('head',[0,.21,.46],.16,true)}
    <mesh position={[0,-.12,.45]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.26,.09,8,32,Math.PI]}/>{neon}</mesh>
    {[-1,1].map(v=>bar('wing'+v,[v*.49,-.08,.06],[.24,.07,.22],[0,0,v*.28]))}
    {detail&&[-1,1].map(v=>dot('beacon'+v,[v*.58,.18,.14],.055))}
  </group>}
  {id==='career'&&<group>
    {[-1,0,1].map((v,i)=><group key={i} position={[v*.28,-.09+i*.11,0]}>
      <mesh><cylinderGeometry args={[.12,.18,.42+i*.22,6]}/>{hull}</mesh>
      {bar('light'+i,[0,.23+i*.11,.02],[.23,.045,.23],[0,0,0],true)}
    </group>)}
    {bar('bridge',[0,-.37,.02],[1.06,.12,.45])}
    {ring('growth',.59,.022,[.25,.33,.2],true)}
    {detail&&dot('summit',[.30,.55,.03],.095,true)}
  </group>}
  {id==='projects'&&<group>
    {[[0,.36,0],[-.40,-.20,.07],[.40,-.20,.07]].map((v,i)=><group key={i} position={v as [number,number,number]} rotation={[.2,i*.5,.15]}>
      <mesh><octahedronGeometry args={[.24,0]}/>{hull}</mesh>
      <mesh scale={.62}><octahedronGeometry args={[.24,0]}/>{neon}</mesh>
    </group>)}
    {bar('edge1',[-.21,.07,0],[.55,.045,.08],[0,0,.9])}{bar('edge2',[.21,.07,0],[.55,.045,.08],[0,0,-.9])}
    {bar('edge3',[0,-.20,0],[.72,.045,.08])}
    {ring('assembly',.65,.025,[.7,.22,.13],true)}
  </group>}
  {id==='portfolio'&&<group>
    {[-1,0,1].map((v,i)=><group key={i} position={[v*.21,.04-i*.08,v*.09]} rotation={[0,v*.15,v*.12]}>
      {bar('panel'+i,[0,0,0],[.37,.59,.095])}
      {bar('display'+i,[0,.08,.052],[.27,.30,.012],[0,0,0],true)}
      {bar('footer'+i,[0,-.17,.055],[.26,.03,.018])}
    </group>)}
    {bar('dock',[0,-.40,0],[1.02,.12,.44])}
    {detail&&ring('exhibit',.68,.019,[.94,.1,.2],true)}
  </group>}
  {id==='github'&&<group>
    <mesh position={[0,.08,0]}><dodecahedronGeometry args={[.36,0]}/>{dark}</mesh>
    {dot('origin',[0,.34,.34],.12,true)}{dot('branchL',[-.46,-.21,.26],.11)}{dot('branchR',[.46,-.21,.26],.11)}
    {bar('stem',[0,.02,.24],[.075,.52,.08])}
    {bar('left',[-.22,-.12,.24],[.53,.07,.08],[0,0,-.65])}
    {bar('right',[.22,-.12,.24],[.53,.07,.08],[0,0,.65])}
    {ring('repository',.67,.025,[.53,.33,-.2],true)}
  </group>}
  {id==='expertise'&&<group>
    <mesh><icosahedronGeometry args={[.29,1]}/>{hull}</mesh>
    {Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return <group key={i}>
      {bar('spoke'+i,[Math.cos(a)*.32,Math.sin(a)*.32,0],[.39,.045,.07],[0,0,a])}
      {dot('node'+i,[Math.cos(a)*.55,Math.sin(a)*.55,.06],.095,i===0)}
    </group>})}
    {ring('knowledge',.66,.018,[.48,.15,.35],true)}
  </group>}
  {id==='training'&&<group>
    <mesh position={[0,.10,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.55,.55,.18]}/>{hull}</mesh>
    {bar('brim',[0,-.10,.16],[.90,.08,.37])}
    {bar('base',[0,-.35,0],[.62,.13,.43])}
    {bar('antenna',[.43,-.27,.18],[.03,.40,.03])}
    {dot('tip',[.43,-.47,.18],.055,true)}
    {ring('academy',.60,.024,[.62,.16,-.2],true)}
    {detail&&dot('core',[0,.13,.25],.10,true)}
  </group>}
  {id==='archive'&&<group>
    {bar('vault',[0,-.06,0],[.70,.64,.52])}
    {bar('cap',[0,.29,0],[.86,.11,.63])}
    {[-1,1].map((v,i)=><group key={i}>
      {bar('drawer'+i,[0,v*.145,.285],[.52,.11,.035])}
      {dot('lock'+i,[0,v*.145,.33],.035,true)}
    </group>)}
    {[-1,1].map(v=>bar('fin'+v,[v*.43,-.02,0],[.08,.54,.33]))}
    {ring('vaultOrbit',.68,.022,[.66,.3,.2],true)}
  </group>}
  {/* v0.0.109: distinct hard-surface silhouettes, lit insets and mechanical depth.
      Detail is tiered to avoid increasing GTX 660 LOW draw calls. */}
  {id==='profile'&&<group>
    <mesh position={[0,-.22,.57]}><capsuleGeometry args={[.13,.18,4,10]}/><meshStandardMaterial color="#9dc4d5" emissive={tone} emissiveIntensity={.16} metalness={.72} roughness={.3}/></mesh>
    {detail&&[-1,1].map(v=>bar('shoulder'+v,[v*.29,-.32,.42],[.23,.12,.15],[0,0,v*.24]))}
  </group>}
  {id==='career'&&<group>
    {[-1,0,1].map((v,i)=>bar('glass'+i,[v*.28,-.03+i*.13,.155],[.12,.19+i*.12,.025],[0,0,0],true))}
    {detail&&bar('skybridge',[0,.43,.08],[.90,.055,.16])}
  </group>}
  {id==='projects'&&<group>
    {[-1,1].map(v=>bar('projectDock'+v,[v*.62,-.34,.08],[.23,.15,.31]))}
    {detail&&dot('integration',[0,-.04,.32],.105,true)}
  </group>}
  {id==='portfolio'&&<group>
    {[-1,0,1].map((v,i)=>bar('screenTrim'+i,[v*.21,.27-i*.08,.17],[.31,.028,.025],[0,0,v*.12],true))}
    {detail&&bar('exhibitionHeader',[0,.48,0],[.85,.075,.18])}
  </group>}
  {id==='github'&&<group>
    {[-1,1].map(v=>bar('branchPlate'+v,[v*.43,-.30,.33],[.22,.09,.12]))}
    {detail&&dot('commit',[0,-.04,.38],.072,true)}
  </group>}
  {id==='expertise'&&<group>
    {detail&&Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return bar('module'+i,[Math.cos(a)*.60,Math.sin(a)*.60,.10],[.13,.13,.18],[0,0,a]);})}
    {dot('knowledgeCore',[0,0,.33],.12,true)}
  </group>}
  {id==='training'&&<group>
    {bar('learningScreen',[0,.09,.22],[.37,.29,.024],[0,0,Math.PI/4],true)}
    {detail&&[-1,1].map(v=>bar('studyWing'+v,[v*.49,-.34,.08],[.19,.08,.27]))}
  </group>}
  {id==='archive'&&<group>
    {[-1,0,1].map((v,i)=>bar('dataStripe'+i,[v*.17,-.07,.335],[.055,.38,.012],[0,0,0],true))}
    {detail&&bar('vaultShield',[0,-.43,.06],[.91,.11,.61])}
  </group>}
  {/* v0.0.110: camera-side focal architecture; unique readable silhouettes.
      LOW keeps the principal shape, while micro-details are optional. */}
  {id==='profile'&&<group>
    <mesh position={[0,-.33,.64]} scale={[.39,.21,.12]}><sphereGeometry args={[1,16,10]}/>{trim}</mesh>
    <mesh position={[0,.22,.65]}><sphereGeometry args={[.14,16,12]}/>{glass}</mesh>
    {detail&&[-1,1].map(v=>bar('collar'+v,[v*.22,-.38,.65],[.22,.07,.09],[0,0,v*.34],true))}
  </group>}
  {id==='career'&&<group>
    {[-1,0,1].map((v,i)=><mesh key={i} position={[v*.28,.13+i*.17,.20]}><boxGeometry args={[.18,.10,.16]}/>{trim}</mesh>)}
    {bar('growthArrow',[.32,.65,.16],[.18,.17,.12],[0,0,-.78],true)}
  </group>}
  {id==='projects'&&<group>
    {[-1,0,1].map((v,i)=><mesh key={i} position={[v*.40,i===1?.37:-.18,.32]} rotation={[0,.2*i,Math.PI/4]}><boxGeometry args={[.21,.21,.18]}/>{trim}</mesh>)}
    {dot('projectPulse',[0,-.05,.48],.07,true)}
  </group>}
  {id==='portfolio'&&<group>
    {[-1,0,1].map((v,i)=><mesh key={i} position={[v*.21,.02-i*.08,.23]} rotation={[0,v*.12,v*.12]}><boxGeometry args={[.29,.37,.025]}/>{glass}</mesh>)}
    {detail&&bar('galleryTrack',[0,-.45,.27],[1.10,.035,.10])}
  </group>}
  {id==='github'&&<group>
    {[-1,1].map(v=><mesh key={v} position={[v*.45,-.22,.41]}><sphereGeometry args={[.085,12,8]}/>{glass}</mesh>)}
    <mesh position={[0,.34,.45]}><sphereGeometry args={[.11,12,8]}/>{trim}</mesh>
    {bar('gitTrunk',[0,.03,.38],[.055,.43,.08],[0,0,0],true)}
  </group>}
  {id==='expertise'&&<group>
    <mesh position={[0,0,.41]}><icosahedronGeometry args={[.19,1]}/>{glass}</mesh>
    {detail&&Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return <mesh key={i} position={[Math.cos(a)*.55,Math.sin(a)*.55,.24]} rotation={[0,0,a]}><boxGeometry args={[.16,.09,.08]}/>{trim}</mesh>})}
  </group>}
  {id==='training'&&<group>
    <mesh position={[0,.12,.36]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.36,.36,.055]}/>{glass}</mesh>
    {bar('academyPlinth',[0,-.37,.20],[.84,.075,.21])}
    {detail&&dot('academyBeacon',[.42,-.48,.30],.05,true)}
  </group>}
  {id==='archive'&&<group>
    {[-1,0,1].map((v,i)=><mesh key={i} position={[0,v*.19,.37]}><boxGeometry args={[.48,.12,.055]}/>{trim}</mesh>)}
    {[-1,0,1].map((v,i)=>dot('vaultLed'+i,[.20,v*.19,.42],.028,true))}
  </group>}
  {fine&&<group>{[-1,1].map(v=>dot('status'+v,[v*.69,-.52,.08],.026))}</group>}
 </group>;
}

// v0.0.111: foreground-readable emblems. Keep the orbital architecture,
// but give each hub an opaque, uniquely shaped identity at LOW quality too.
function HubIdentityBeacon({id,tone}:{id:string;tone:string}){
 const metal=<meshStandardMaterial color="#aac7d5" emissive={tone} emissiveIntensity={.23} metalness={.52} roughness={.38}/>;
 const light=<meshBasicMaterial color={tone} toneMapped={false}/>;
 const pale=<meshBasicMaterial color="#dff8ff" toneMapped={false}/>;
 const block=(key:string,x:number,y:number,w:number,h:number,z=.035)=><mesh key={key} position={[x,y,z]}><boxGeometry args={[w,h,.075]}/>{metal}</mesh>;
 const glow=(key:string,x:number,y:number,r=.06)=><mesh key={key} position={[x,y,.12]}><sphereGeometry args={[r,12,8]}/>{light}</mesh>;
 const trace=(key:string,x:number,y:number,w:number,angle=0)=><mesh key={key} position={[x,y,.19]} rotation={[0,0,angle]}><boxGeometry args={[w,.016,.015]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh>;
 const rivet=(key:string,x:number,y:number)=><mesh key={key} position={[x,y,.16]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.025,.025,.018,8]}/><meshStandardMaterial color="#c4e2ed" metalness={.7} roughness={.3}/></mesh>;
 const identityShape:Record<string,{sides:number,scale:number,angle:number}>={
  profile:{sides:12,scale:1.06,angle:0},career:{sides:4,scale:1.12,angle:Math.PI/4},
  projects:{sides:6,scale:1.08,angle:Math.PI/6},portfolio:{sides:4,scale:1.08,angle:0},
  github:{sides:6,scale:1.07,angle:0},expertise:{sides:10,scale:1.12,angle:Math.PI/10},
  training:{sides:5,scale:1.11,angle:Math.PI/10},archive:{sides:4,scale:1.09,angle:Math.PI/4}
 };
 const shape=identityShape[id]??identityShape.profile;

 return <group position={[0,-.01,.45]} scale={.64}>
  {/* Unique backing geometry differentiates each station at a glance, even without labels. */}
  <mesh position={[0,0,-.225]} rotation={[Math.PI/2,0,shape.angle]} scale={shape.scale}>
   <cylinderGeometry args={[.55,.55,.055,shape.sides]}/>
   <meshStandardMaterial color="#19354b" emissive={tone} emissiveIntensity={.22} metalness={.74} roughness={.28}/>
  </mesh>
  {/* Solid, depth-tested medallion keeps the emblem legible against the dense starfield.
      It deliberately avoids transparency and Bloom to remain readable in LOW mode. */}
  <mesh position={[0,0,-.18]} rotation={[Math.PI/2,0,0]}>
   <cylinderGeometry args={[.48,.50,.085,8]}/>
   <meshStandardMaterial color="#071725" metalness={.68} roughness={.43} emissive={tone} emissiveIntensity={.075}/>
  </mesh>
  <mesh position={[0,0,-.125]} rotation={[0,0,Math.PI/8]}>
   <torusGeometry args={[.48,.010,5,8]}/>
   <meshBasicMaterial color={tone} toneMapped={false}/>
  </mesh>
  <mesh position={[0,-.59,-.08]}>
   <boxGeometry args={[.72,.055,.09]}/>
   <meshStandardMaterial color="#b2d1dd" metalness={.6} roughness={.32}/>
  </mesh>
  {/* Machined rim, four hardpoints and a layered inset: every identity stays legible
      when bloom and expensive lighting are disabled on older GPUs. */}
  <mesh position={[0,0,-.08]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.43,.45,.035,12]}/><meshStandardMaterial color="#10293c" emissive={tone} emissiveIntensity={.07} metalness={.82} roughness={.3}/></mesh>
  {[-1,1].flatMap(x=>[-1,1].map(y=>rivet(`mount-${x}-${y}`,x*.33,y*.33)))}
  <mesh position={[0,-.46,.10]}><boxGeometry args={[.34,.032,.028]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh>
  {id==='profile'&&<group>
   <mesh position={[0,.19,0]}><sphereGeometry args={[.19,16,12]}/>{pale}</mesh>
   <mesh position={[0,-.19,0]} scale={[.42,.27,.14]}><sphereGeometry args={[1,18,12]}/>{metal}</mesh>
   {glow('profile-pin',0,-.32,.065)}{trace('profile-collar',0,-.43,.36)}{trace('profile-shoulder',0,-.11,.52)}
  </group>}
  {id==='career'&&<group>
   {block('career-1',-.35,-.25,.21,.30)}{block('career-2',-.08,-.12,.21,.56)}{block('career-3',.19,.06,.21,.92)}
   {block('career-arrow',.37,.41,.25,.09)}{glow('career-peak',.35,.52,.07)}{[-.35,-.08,.19].map((x,i)=>trace('career-tick'+i,x,-.44,.15))}{trace('career-route',.02,.38,.52,.47)}
  </group>}
  {id==='projects'&&<group>
   {[-1,0,1].map((v,i)=><mesh key={i} position={[v*.30,i===1?.22:-.18,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.30,.30,.16]}/>{metal}</mesh>)}
   {block('projects-link-l',-.16,.02,.33,.055)}{block('projects-link-r',.16,.02,.33,.055)}
   {glow('projects-core',0,.22,.08)}{trace('projects-bus',0,-.44,.63)}{[-.30,.30].map((x,i)=>rivet('projects-port'+i,x,-.44))}
  </group>}
  {id==='portfolio'&&<group>
   {[-1,0,1].map((v,i)=><group key={i} position={[v*.29,.03-i*.035,v*.015]}>
    <mesh><boxGeometry args={[.26,.53,.12]}/>{metal}</mesh>
    <mesh position={[0,.07,.07]}><planeGeometry args={[.19,.28]}/>{light}</mesh>
   </group>)}
   {block('portfolio-plinth',0,-.34,.97,.10)}{[-.29,0,.29].map((x,i)=>trace('portfolio-caption'+i,x,-.43,.20))}
  </group>}
  {id==='github'&&<group>
   {block('github-stem',0,.08,.075,.54)}
   {[-1,1].map(v=><group key={v}>
    <mesh position={[v*.20,-.13,0]} rotation={[0,0,v*.57]}><boxGeometry args={[.43,.065,.08]}/>{metal}</mesh>
    {glow('branch'+v,v*.39,-.27,.115)}
   </group>)}
   <mesh position={[0,.40,.12]}><sphereGeometry args={[.125,14,10]}/>{pale}</mesh>{trace('github-trunk',0,.07,.45,Math.PI/2)}{trace('github-footer',0,-.46,.52)}
  </group>}
  {id==='expertise'&&<group>
   <mesh><icosahedronGeometry args={[.22,1]}/>{pale}</mesh>
   {Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return <group key={i}>
    <mesh position={[Math.cos(a)*.29,Math.sin(a)*.29,0]} rotation={[0,0,a]}><boxGeometry args={[.28,.055,.09]}/>{metal}</mesh>
    {glow('expert'+i,Math.cos(a)*.48,Math.sin(a)*.48,.085)}{rivet('expertise-mount'+i,Math.cos(a)*.35,Math.sin(a)*.35)}
   </group>})}
  </group>}
  {id==='training'&&<group>
   <mesh position={[0,.15,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.46,.46,.15]}/>{metal}</mesh>
   {block('training-brim',0,-.13,.95,.095)}{block('training-base',0,-.33,.57,.12)}
   {glow('training-light',0,.15,.095)}{trace('training-book',0,-.43,.54)}{rivet('training-tassel',.41,-.21)}
  </group>}
  {id==='archive'&&<group>
   <mesh><boxGeometry args={[.73,.78,.24]}/>{metal}</mesh>
   {[-1,0,1].map((v,i)=><group key={i}>
    <mesh position={[0,v*.22,.145]}><boxGeometry args={[.56,.15,.045]}/><meshBasicMaterial color="#0c2b3d"/></mesh>
    {glow('archive-lock'+i,.19,v*.22,.044)}
   </group>)}
   {block('archive-roof',0,.45,.89,.095)}{trace('archive-floor',0,-.45,.76)}{rivet('archive-indicator',-.35,.38)}
  </group>}
 </group>;
}

function GitBlogEmblem({id,tone,quality}:{id:string;tone:string;quality:'HIGH'|'BALANCED'|'LOW'}){
 return <><HubArchitecture id={id} tone={tone} quality={quality}/><HubIdentityBeacon id={id} tone={tone}/></>;
}
// v0.0.61: a purposeful orbital relay replaces the ambiguous bare diamond outline.
// A diamond-shaped metal frame, luminous communication core, antennae and live beacon orbit locally.
function OrbitalRelaySatellite({tone,index}:{tone:string;index:number}){
 const root=useRef<THREE.Group>(null!);
 useFrame(({clock},dt)=>{if(!root.current)return;const t=clock.elapsedTime;
   const phase=t*(.22+index*.012)+index*.73;
   root.current.position.set(-1.19+Math.cos(phase)*.13,1.00+Math.sin(phase)*.11,.48+Math.sin(phase*.8)*.12);
   root.current.rotation.set(.20+Math.sin(t*.18+index)*.12,Math.sin(t*.24+index)*.3,Math.sin(t*.31+index)*.13);
 });
 return <group ref={root} scale={.57}>
   <mesh><cylinderGeometry args={[.43,.43,.11,6]}/><meshStandardMaterial color="#071522" emissive={tone} emissiveIntensity={.14} metalness={.88} roughness={.25} transparent opacity={.85}/></mesh>
   <mesh position={[0,0,.058]}><torusGeometry args={[.38,.025,6,6]}/><meshBasicMaterial color={tone} transparent opacity={.65} depthWrite={false}/></mesh>
   <mesh position={[0,0,.15]} rotation={[0,0,Math.PI/4]}><octahedronGeometry args={[.21,1]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh>
   <mesh position={[0,0,.27]}><sphereGeometry args={[.095,12,8]}/><meshBasicMaterial color="#e4fcff" toneMapped={false}/></mesh>
   {Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return <group key={`relay-fin-${i}`} position={[Math.cos(a)*.42,Math.sin(a)*.42,0]} rotation={[0,0,a]}><mesh><boxGeometry args={[.13,.055,.09]}/><meshStandardMaterial color="#142f43" metalness={.88} roughness={.22} emissive={tone} emissiveIntensity={.22}/></mesh><mesh position={[.06,0,.055]}><boxGeometry args={[.035,.025,.012]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh></group>})}
   {[-1,1].map((s)=><group key={s}><mesh position={[s*.55,0,0]}><boxGeometry args={[.36,.035,.035]}/><meshStandardMaterial color="#24435b" metalness={.8} roughness={.2}/></mesh><mesh position={[s*.75,0,0]}><sphereGeometry args={[.075,10,8]}/><meshBasicMaterial color={tone} toneMapped={false}/></mesh></group>)}
   <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.68,.014,5,56]}/><meshBasicMaterial color={tone} transparent opacity={.46} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>
 </group>;
}
// v0.0.113 — Saturn-style rings: a single inclined plane, layered narrow bands,
// radial gaps, and proper depth occlusion by the opaque central planet sphere.
// Unlike the old crossed toruses, this produces a flattened ellipse in projection.
// v0.0.119 — volumetric, fully enclosed identity facilities. Every mesh remains inside r=.68.
// The outer glass never becomes an opaque disk; no foreground 2D medallions are used.
function HubInteriorFacility({id,tone,quality}:{id:string;tone:string;quality:'HIGH'|'BALANCED'|'LOW'}){
 const detail=quality!=='LOW';
 const steel=<meshStandardMaterial color="#8fb3c6" metalness={.54} roughness={.29} emissive={tone} emissiveIntensity={.22}/>;
 const dark=<meshStandardMaterial color="#142b3d" metalness={.55} roughness={.32} emissive={tone} emissiveIntensity={.18}/>;
 const glow=<meshStandardMaterial color={tone} metalness={.16} roughness={.26} emissive={tone} emissiveIntensity={.82}/>;
 const white=<meshBasicMaterial color="#ecfbff" toneMapped={false}/>;
 const box=(key:string,p:[number,number,number],size:[number,number,number],lit=false)=><mesh key={key} position={p}><boxGeometry args={size}/>{lit?glow:steel}</mesh>;
 const node=(key:string,p:[number,number,number],r=.055,lit=false)=><mesh key={key} position={p}><icosahedronGeometry args={[r,1]}/>{lit?white:glow}</mesh>;
 const base=<mesh position={[0,-.46,0]}><cylinderGeometry args={[.39,.43,.075,12]}/>{dark}</mesh>;
 return <group position={[0,-.015,0]} scale={.90}>
  {base}
  {id==='profile'&&<group>
   <mesh position={[0,.19,0]}><sphereGeometry args={[.18,18,14]}/>{steel}</mesh>
   <mesh position={[0,-.17,0]} scale={[.35,.30,.23]}><sphereGeometry args={[1,20,14]}/>{steel}</mesh>
   {box('collar',[0,-.34,.14],[.45,.055,.12],true)}
   {detail&&[-1,1].map(v=>node('id-node'+v,[v*.33,.15,.11],.045,true))}
  </group>}
  {id==='career'&&<group>
   {[-1,0,1].map((v,i)=><group key={i} position={[v*.22,-.14,0]}>
    {box('tower'+i,[0,(i*.13),0],[.18,.47+i*.24,.22])}
    {detail&&[0,1,2].map(j=>box('window'+j,[0,-.12+j*.11+i*.13,.117],[.12,.026,.012],true))}
   </group>)}
   {box('skybridge',[0,-.35,.03],[.76,.07,.24],true)}
   {node('peak',[.22,.48,0],.065,true)}
  </group>}
  {id==='projects'&&<group>
   {[[0,.27,0],[-.30,-.16,.06],[.30,-.16,.06]].map((pos,i)=><mesh key={i} position={pos as [number,number,number]} rotation={[.25,i*.3,Math.PI/4]}><boxGeometry args={[.29,.29,.29]}/>{steel}</mesh>)}
   {box('beam-left',[-.16,.02,.07],[.085,.36,.09],true)}
   {box('beam-right',[.16,.02,.07],[.085,.36,.09],true)}
   {node('hub',[0,.01,.20],.075,true)}
  </group>}
  {id==='portfolio'&&<group>
   {[-1,0,1].map((v,i)=><group key={i} position={[v*.22,.03-i*.025,0]} rotation={[0,v*-.17,0]}>
    {box('monitor',[0,0,0],[.24,.48,.095])}
    {box('screen',[0,.045,.052],[.18,.31,.014],true)}
    {detail&&box('caption',[0,-.19,.055],[.15,.022,.012],true)}
   </group>)}
   {box('gallery-plinth',[0,-.35,0],[.78,.10,.33])}
  </group>}
  {id==='github'&&<group>
   {box('trunk',[0,.045,0],[.085,.57,.11])}
   {[-1,1].map(v=><group key={v}>
    <mesh position={[v*.18,-.13,0]} rotation={[0,0,-v*.62]}><boxGeometry args={[.37,.08,.11]}/>{steel}</mesh>
    {node('branch'+v,[v*.36,-.26,.03],.10,true)}
   </group>)}
   {node('merge',[0,.37,.02],.12,true)}
   {detail&&node('commit',[0,.04,.10],.055)}
  </group>}
  {id==='expertise'&&<group>
   <mesh><icosahedronGeometry args={[.23,1]}/>{steel}</mesh>
   {Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return <group key={i}>
    <mesh position={[Math.cos(a)*.28,Math.sin(a)*.28,0]} rotation={[0,0,a]}><boxGeometry args={[.27,.06,.095]}/>{dark}</mesh>
    {node('knowledge'+i,[Math.cos(a)*.43,Math.sin(a)*.43,.035],.075,i%2===0)}
   </group>})}
  </group>}
  {id==='training'&&<group>
   <mesh position={[0,.09,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.42,.42,.19]}/>{steel}</mesh>
   {box('brim',[0,-.12,.08],[.78,.075,.28])}
   {box('pedestal',[0,-.31,0],[.51,.13,.30])}
   {node('crest',[0,.11,.115],.095,true)}
   {detail&&box('tassel',[.34,-.27,.09],[.035,.22,.035],true)}
  </group>}
  {id==='archive'&&<group>
   {box('vault',[0,-.025,0],[.62,.69,.36])}
   {box('roof',[0,.35,0],[.73,.075,.43])}
   {[-1,0,1].map((v,i)=><group key={i}>
    {box('drawer'+i,[0,v*.205,.192],[.49,.145,.027])}
    {node('lock'+i,[.16,v*.205,.225],.034,true)}
   </group>)}
  </group>}
 </group>;
}

function SaturnPlanetRings({tone,index,quality}:{tone:string;index:number;quality:'HIGH'|'BALANCED'|'LOW'}){
 const rings=useMemo(()=>{
  const count=quality==='LOW'?5:quality==='BALANCED'?7:9;
  return Array.from({length:count},(_,i)=>{
   const t=i/(count-1), inner=.76+t*.48;
   const width=(i%4===0?.025:.012)+(quality==='HIGH'?.004:0);
   return {inner,outer:inner+width,alpha:.17+(i%5)*.055,bright:i%6===0};
  });
 },[quality]);
 const plane=useRef<THREE.Group>(null!);
 useFrame((state)=>{if(plane.current)plane.current.rotation.z=Math.sin(state.clock.elapsedTime*.12+index)*.028;});
 return <group rotation={[.96+(index%3)*.065,0,-.17+(index%4)*.11]}>
  <group ref={plane}>
   {rings.map((band,i)=><mesh key={i} renderOrder={0}>
    <ringGeometry args={[band.inner,band.outer,quality==='LOW'?64:96]}/>
    <meshBasicMaterial color={band.bright?'#e6faff':tone} transparent opacity={band.alpha} side={THREE.DoubleSide} depthTest={true} depthWrite={false}/>
   </mesh>)}
  </group>
 </group>;
}
function Hub({n,index,activeId,quality}:{n:Node3D;index:number;activeId:string|null;quality:'HIGH'|'BALANCED'|'LOW'}){
 const g=useRef<THREE.Group>(null!);
 useFrame(({clock})=>{
  const t=clock.elapsedTime;
  g.current.position.copy(currentNodePosition(n.id));
  g.current.position.y+=Math.sin(t*.39+index*1.31)*.018;
  g.current.rotation.y=Math.sin(t*.13+index*.57)*.085;
  g.current.rotation.z=Math.sin(t*.17+index)*.008;
 });
 const focused=!activeId||activeId===n.id;
 return <group ref={g} position={currentNodePosition(n.id)} scale={focused?(activeId?1.08:1):.94}>
  {/* The facility occupies the center of a clear glass sphere, never a foreground logo. */}
  <HubInteriorFacility id={n.id} tone={n.tone} quality={quality}/>
  {/* Very faint back and front glass passes; neither writes depth or masks the facility. */}
  <mesh renderOrder={2}>
   <sphereGeometry args={[.70,quality==='LOW'?20:32,quality==='LOW'?14:24]}/>
   <meshPhysicalMaterial color="#9bc8db" emissive={n.tone} emissiveIntensity={.025} metalness={0} roughness={.09} transparent opacity={.045} depthWrite={false} side={THREE.FrontSide} clearcoat={1}/>
  </mesh>
  <mesh scale={1.005}>
   <sphereGeometry args={[.70,quality==='LOW'?20:32,quality==='LOW'?14:24]}/>
   <meshBasicMaterial color={n.tone} transparent opacity={.035} depthWrite={false} side={THREE.BackSide}/>
  </mesh>
  {/* Sparse equatorial frame marks rather than dense wire cages and debris. */}
  {quality==='HIGH'&&[-1,1].map(v=><mesh key={v} position={[v*.57,0,.08]}><icosahedronGeometry args={[.035,0]}/><meshBasicMaterial color={n.tone}/></mesh>)}
  {/* Thin, transparent glass-edge accent: never masks the enclosed facility. */}
  <mesh rotation={[.07,0,0]}>
   <torusGeometry args={[.69,.006,3,quality==='LOW'?40:72]}/>
   <meshBasicMaterial color={n.tone} transparent opacity={quality==='LOW'?.22:.34} depthWrite={false}/>
  </mesh>
  <SaturnPlanetRings tone={n.tone} index={index} quality={quality}/>
  <EcosystemFocusAura tone={n.tone} enabled={activeId===n.id}/>
 </group>;
}

type Highway={curve:THREE.CatmullRomCurve3;color:string;phase:number;width:number;speed:number;opacity:number;hubId:string;laneIndex:number;hubIndex:number};
// v0.0.79: all river curves are ordered HUB -> SINGULARITY, never core -> hub.
// Screen-space clockwise means the polar angle decreases as the particle advances.
function makeHighways(){
 const highways:Highway[]=[];
 nodes.forEach((n,k)=>{
  const hub=new THREE.Vector3(...n.pos);
  const theta=Math.atan2(hub.y,hub.x);
  const outerRadius=Math.hypot(hub.x,hub.y);
  for(let j=0;j<14;j++){
   const lane=(j-6.5)*.014;
   const start=hub.clone().add(new THREE.Vector3(-Math.sin(theta)*lane,Math.cos(theta)*lane,(j%4-1.5)*.025));
   const points:THREE.Vector3[]=[start];
   // A gently curving gravitational approach, followed by a visibly clockwise spiral.
   const turns=.76+(j%3)*.045; // inclined, sweeping accretion approach instead of upright circular coils
   const phase=lane*.36;
   for(let i=1;i<=38;i++){
    const q=i/38;
    const radius=outerRadius+(1.06+lane-outerRadius)*Math.pow(q,.84);
    const angle=theta-2*Math.PI*turns*Math.pow(q,1.18)+phase*q;
    const z=hub.z*(1-q)+(.12+(j%5-2)*.035)*q+Math.sin(q*Math.PI*2)*.065;
    // Prevent an abrupt tangent at the hub while retaining the inward spiral.
    const easedAngle=theta+(angle-theta)*Math.min(1,Math.pow(q/.25,.68));
    const tiltBlend=Math.sin(Math.PI*Math.min(1,q))*.31 + Math.pow(q,1.8)*.38;
    // Tilt the inward spiral into the same oblique 3D accretion plane.
    // The tilt is eased in so the animated hub anchor remains connected.
    const yFlat=Math.sin(easedAngle)*radius*(1-tiltBlend);
    const incline=.58*Math.pow(q,.85);
    const yTilt=yFlat*Math.cos(incline);
    const zTilt=yFlat*Math.sin(incline);
    points.push(new THREE.Vector3(Math.cos(easedAngle)*radius,yTilt,z+zTilt+.20*Math.sin(q*Math.PI)*Math.sin(theta+k*.31)));
   }
   highways.push({curve:new THREE.CatmullRomCurve3(points,false,'centripetal',.5),color:j%7===0?new THREE.Color(n.tone).lerp(new THREE.Color('#e0faff'),.16).getStyle():n.tone,phase:(k*14+j)*.137,width:j%7===0?.006:.003+(j%3)*.001,speed:.065+(j%5)*.009,opacity:j%7===0?.31:.13+(j%4)*.025,hubId:n.id,laneIndex:j,hubIndex:k});
  }
 });
 return highways;
}
function deformRiverPoint(h:Highway,q:number,t:number,out=new THREE.Vector3()){
 const base=h.curve.getPoint(q,out), originalStart=h.curve.getPoint(0), liveStart=currentNodePosition(h.hubId);
 // v0.0.30: the complete river reflows toward the live orbital ecosystem anchor.
 base.add(liveStart.sub(originalStart).multiplyScalar((1-q)*(1-q)*(1+2*q)));
 const tangent=h.curve.getTangent(q).normalize();
 const normal=new THREE.Vector3(-tangent.y,tangent.x,.10*Math.sin(h.hubIndex*.9)).normalize();
 const env=Math.sin(Math.PI*q), seed=h.hubIndex*1.713;
 // Slow bundle-scale motion: the bright backbone visibly bends, breathes and shears.
 const wave=Math.sin(t*.46+seed+q*4.4)*.115;
 const breathe=Math.sin(t*.19+seed*.7)*.055;
 const shear=Math.sin(t*.31+seed*.43+q*2.15)*.070;
 const depth=(Math.cos(t*.37+seed+q*5.8)*.095+Math.sin(t*.16+seed*.31)*.045)*env;
 return base.addScaledVector(normal,(wave+breathe+shear)*env).setZ(base.z+depth);
}
function DynamicRiver({h,index,activeId,quality='BALANCED'}:{h:Highway;index:number;activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){
 const sampleCount=quality==='HIGH'?42:quality==='BALANCED'?32:24, acc=useRef(0);
 const updateHz=quality==='HIGH'?26:quality==='BALANCED'?22:16;
 const halo=useRef<THREE.BufferGeometry>(null!),body=useRef<THREE.BufferGeometry>(null!),core=useRef<THREE.BufferGeometry>(null!),filament=useRef<THREE.BufferGeometry>(null!);
 const haloMat=useRef<THREE.MeshBasicMaterial>(null!),bodyMat=useRef<THREE.MeshBasicMaterial>(null!),coreMat=useRef<THREE.MeshBasicMaterial>(null!),filamentMat=useRef<THREE.MeshBasicMaterial>(null!);
 const arrays=useMemo(()=>({halo:new Float32Array(sampleCount*2*3),body:new Float32Array(sampleCount*2*3),core:new Float32Array(sampleCount*2*3),filament:new Float32Array(sampleCount*2*3)}),[sampleCount]);
 const scratch=useMemo(()=>({normal:new THREE.Vector3()}),[]);
 const indices=useMemo(()=>{const a:number[]=[];for(let i=0;i<sampleCount-1;i++){const k=i*2;a.push(k,k+1,k+2,k+1,k+3,k+2)}return a},[sampleCount]);
 const update=(geo:THREE.BufferGeometry|null,arr:Float32Array,width:number,t:number,phase:number)=>{if(!geo)return;for(let j=0;j<sampleCount;j++){const q=j/(sampleCount-1),p=deformRiverPoint(h,q,t+phase),tan=h.curve.getTangent(q).normalize(),n=scratch.normal.set(-tan.y,tan.x,.025*Math.sin(q*8+phase)).normalize();const pulse=1+.16*Math.sin(t*1.7+q*12+phase);n.multiplyScalar(width*.58*Math.sin(Math.PI*q)*pulse);const o=j*6;arr[o]=p.x+n.x;arr[o+1]=p.y+n.y;arr[o+2]=p.z+n.z;arr[o+3]=p.x-n.x;arr[o+4]=p.y-n.y;arr[o+5]=p.z-n.z}const attr=geo.getAttribute('position') as THREE.BufferAttribute;attr.needsUpdate=true;geo.computeBoundingSphere()};
 useFrame((state,delta)=>{const t=state.clock.elapsedTime,focused=!activeId||activeId===h.hubId,energy=.80+Math.sin(t*.72+index*.91)*.20;if(haloMat.current)haloMat.current.opacity=(focused?.18:.024)*energy;if(bodyMat.current)bodyMat.current.opacity=(focused?.28:.035)*(.9+Math.sin(t*.93+index)*.1);if(coreMat.current)coreMat.current.opacity=(focused?1.0:.11)*(.88+Math.sin(t*1.31+index*.63)*.12);if(filamentMat.current)filamentMat.current.opacity=(focused?1.0:.10)*(.72+.28*Math.sin(t*2.8+index));acc.current+=delta;if(acc.current<1/updateHz)return;acc.current=0;update(halo.current,arrays.halo,.125,t,.18);update(body.current,arrays.body,.055,t,.08);update(core.current,arrays.core,.027,t,0);update(filament.current,arrays.filament,.019,t,1.35)});
 const focused=!activeId||activeId===h.hubId,accent=h.color,coreColor=new THREE.Color(accent).lerp(new THREE.Color('#e9ffff'),.36).getStyle();
 const layer=(ref:React.RefObject<THREE.BufferGeometry>,matRef:React.RefObject<THREE.MeshBasicMaterial>,arr:Float32Array,color:string,opacity:number)=><mesh><bufferGeometry ref={ref}><bufferAttribute attach="attributes-position" args={[arr,3]}/><bufferAttribute attach="index" args={[new Uint16Array(indices),1]}/></bufferGeometry><meshBasicMaterial ref={matRef} color={color} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending}/></mesh>;
 return <group>{layer(halo,haloMat,arrays.halo,accent,focused?.075:.012)}{layer(body,bodyMat,arrays.body,accent,focused?.115:.018)}{layer(core,coreMat,arrays.core,coreColor,focused?.88:.065)}{layer(filament,filamentMat,arrays.filament,accent,focused?.86:.04)}</group>
}
function RiverBackbones({activeId,quality='BALANCED'}:{activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){const highways=useMemo(()=>makeHighways(),[]);const leaders=useMemo(()=>nodes.map(n=>highways.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean),[highways]);return <group>{leaders.map((h,i)=><DynamicRiver key={h.hubId} h={h} index={i} activeId={activeId} quality={quality}/>)}</group>}
// v0.0.94: extend the animated river endpoint into a clockwise capture spiral.
// The first derivative at the join follows the river tangent; the final position
// lies inside the opaque event-horizon sphere (radius .65). This is a visual
// accretion approximation, not a general-relativistic geodesic solver.
const VISIBLE_CAPTURE_FRACTION = .76;
function visibleInfallPosition(h:Highway,progress:number,time:number,out=new THREE.Vector3()){
 const q=THREE.MathUtils.clamp(progress,0,1);
 if(q<=VISIBLE_CAPTURE_FRACTION){
  return deformRiverPoint(h,q/VISIBLE_CAPTURE_FRACTION,time,out);
 }
 const u=(q-VISIBLE_CAPTURE_FRACTION)/(1-VISIBLE_CAPTURE_FRACTION);
 const start=deformRiverPoint(h,1,time);
 const before=deformRiverPoint(h,.997,time);
 const tangent=start.clone().sub(before).multiplyScalar(1/.003);
 const angle0=Math.atan2(start.y,start.x);
 const radius0=Math.hypot(start.x,start.y);
 // Two-stage spiral: starts on the exact highway endpoint and winds inward.
 const radial=radius0-(radius0-.48)*u*u*(3-2*u);
 const theta=angle0-TAU*.72*u*u*(3-2*u);
 const spiral=new THREE.Vector3(Math.cos(theta)*radial,Math.sin(theta)*radial,start.z*(1-u)+.03*u);
 // Hermite blend near the junction matches the incoming highway tangent.
 const join=Math.min(1,u/.16),weight=join*join*(3-2*join);
 const tangentContinuation=start.clone().addScaledVector(tangent,u*VISIBLE_CAPTURE_FRACTION*.24);
 return out.copy(tangentContinuation.lerp(spiral,weight));
}
// v0.0.93 — readable luminous spheres traveling ON the same animated backbone
// used by DynamicRiver. Their center, tail and bloom shell share deformRiverPoint.
// Three phase-staggered spheres per hub remain visible even in LOW quality.
function HighwayInfallSpheres({activeId,activated,quality}:{activeId:string|null;activated:boolean;quality:'HIGH'|'BALANCED'|'LOW'}){
 const highways=useMemo(()=>makeHighways(),[]);
 const leaders=useMemo(()=>nodes.map(n=>highways.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean),[highways]);
 const perHub=quality==='LOW'?2:quality==='BALANCED'?3:4;
 const count=leaders.length*perHub;
 const cores=useRef<THREE.InstancedMesh>(null!);
 const halos=useRef<THREE.InstancedMesh>(null!);
 const tails=useRef<THREE.InstancedMesh>(null!);
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 const travel=useRef(0);
 const gravity=useRef(0);
 const palette=useMemo(()=>leaders.flatMap(h=>Array.from({length:perHub},()=>new THREE.Color(h.color).lerp(new THREE.Color('#f5fdff'),.23))),[leaders,perHub]);
 useLayoutEffect(()=>{for(const ref of [cores,halos,tails]){if(!ref.current)continue;palette.forEach((c,i)=>ref.current!.setColorAt(i,c));if(ref.current.instanceColor)ref.current.instanceColor.needsUpdate=true;}},[palette]);
 useFrame((state,delta)=>{
  const dt=Math.min(delta,.05),now=state.clock.elapsedTime;
  gravity.current=THREE.MathUtils.damp(gravity.current,activated?1:0,1.7,dt);
  travel.current+=dt*(.095+gravity.current*.095);
  leaders.forEach((h,hubIndex)=>{
   for(let j=0;j<perHub;j++){
    const i=hubIndex*perHub+j;
    // At least two distinct glowing bodies per lane, traveling HUB -> CORE.
    const q=(travel.current+(j/perHub)+hubIndex*.071)%1;
    const focused=!activeId||activeId===h.hubId;
    const center=visibleInfallPosition(h,q,now);
    const trailing=visibleInfallPosition(h,Math.max(0,q-.019),now);
    const r=Math.hypot(center.x,center.y);
    // Avoid a visible respawn jump and fade behind the event horizon.
    const spawn=Math.min(1,q/.035);
    const horizonFade=q>VISIBLE_CAPTURE_FRACTION?Math.max(0,Math.min(1,(r-.64)/.18)):1;
    const approaching=(1-.48*q)*spawn*horizonFade;
    const radius=(j===0?.093:j===1?.067:.052)*approaching*(focused?1:.75);
    dummy.position.copy(center);dummy.rotation.set(0,0,0);dummy.scale.setScalar(Math.max(0.00001,radius));dummy.updateMatrix();cores.current?.setMatrixAt(i,dummy.matrix);
    dummy.scale.setScalar(Math.max(0.00001,radius*2.75));dummy.updateMatrix();halos.current?.setMatrixAt(i,dummy.matrix);
    dummy.position.copy(trailing);dummy.scale.setScalar(Math.max(0.00001,radius*.55));dummy.updateMatrix();tails.current?.setMatrixAt(i,dummy.matrix);
   }
  });
  for(const mesh of [cores.current,halos.current,tails.current])if(mesh)mesh.instanceMatrix.needsUpdate=true;
 });
 return <group>
  <instancedMesh ref={halos} args={[undefined,undefined,count]} frustumCulled={false} renderOrder={5}>
   <sphereGeometry args={[1,10,8]}/><meshBasicMaterial vertexColors transparent opacity={.19} depthWrite={false} depthTest={true} blending={THREE.AdditiveBlending}/>
  </instancedMesh>
  <instancedMesh ref={tails} args={[undefined,undefined,count]} frustumCulled={false} renderOrder={6}>
   <sphereGeometry args={[1,8,6]}/><meshBasicMaterial vertexColors transparent opacity={.50} depthWrite={false} depthTest={true} blending={THREE.AdditiveBlending}/>
  </instancedMesh>
  <instancedMesh ref={cores} args={[undefined,undefined,count]} frustumCulled={false} renderOrder={7}>
   <sphereGeometry args={[1,12,10]}/><meshBasicMaterial vertexColors transparent opacity={.98} depthWrite={false} depthTest={true} blending={THREE.AdditiveBlending}/>
  </instancedMesh>
 </group>;
}
function FlowLane({h,activeId}:{h:Highway;activeId:string|null}){const geo=useMemo(()=>new THREE.TubeGeometry(h.curve,56,h.width,4,false),[h]);const focused=!activeId||activeId===h.hubId;return <mesh geometry={geo}><meshBasicMaterial color={h.color} transparent opacity={h.opacity*(focused?(activeId ? .48 : .26):.06)} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>}
function PacketSwarm({highways,activeId,quality='BALANCED'}:{highways:Highway[];activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){const ref=useRef<THREE.InstancedMesh>(null!);const active=useMemo(()=>{const step=quality==='HIGH'?4:quality==='BALANCED'?5:7;return highways.filter((_,i)=>i%step===0)},[highways,quality]);const dummy=useMemo(()=>new THREE.Object3D(),[]),last=useRef(0);useFrame(s=>{const mesh=ref.current;if(!mesh)return;const t=s.clock.elapsedTime,updateHz=quality==='HIGH'?60:quality==='BALANCED'?40:30;if(t-last.current<1/updateHz)return;last.current=t;active.forEach((h,i)=>{const boost=activeId===h.hubId?1.9:activeId?0.72:1;const q=(t*h.speed*1.12*boost+h.phase)%1;const leader=h.laneIndex===0;if(leader)dummy.position.copy(deformRiverPoint(h,q,t));else{const p=h.curve.getPoint(q),start=h.curve.getPoint(0),live=currentNodePosition(h.hubId);dummy.position.copy(p.add(live.sub(start).multiplyScalar((1-q)*(1-q)*(1+2*q))))};const pulse=.72+Math.sin(t*2.4+i)*.18;dummy.scale.setScalar(pulse);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,new THREE.Color(h.color))});mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true});return <instancedMesh ref={ref} args={[undefined,undefined,active.length]} frustumCulled><sphereGeometry args={[.034,6,6]}/><meshBasicMaterial vertexColors transparent opacity={.82} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>}

type DynamicLane={h:Highway;points:THREE.Vector3[];normal:THREE.Vector3;seed:number};
function DynamicStreamField({highways,activeId,quality='BALANCED'}:{highways:Highway[];activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){
 const lineRefs=useRef<(THREE.Line|null)[]>([]),acc=useRef(0);
 const sampleCount=quality==='HIGH'?28:quality==='BALANCED'?22:16; const updateHz=quality==='HIGH'?36:quality==='BALANCED'?28:20;
 const lanes=useMemo<DynamicLane[]>(()=>highways.map((h,i)=>{const points=Array.from({length:sampleCount},(_,j)=>h.curve.getPoint(j/(sampleCount-1)));const a=points[0],b=points[points.length-1],d=b.clone().sub(a).normalize();return {h,points,normal:new THREE.Vector3(-d.y,d.x,.18*Math.sin(i*.71)).normalize(),seed:i*1.731}}),[highways,sampleCount]);
 const geometries=useMemo(()=>lanes.map(l=>{const g=new THREE.BufferGeometry();const a=new Float32Array(l.points.length*3);l.points.forEach((p,i)=>{a[i*3]=p.x;a[i*3+1]=p.y;a[i*3+2]=p.z});g.setAttribute('position',new THREE.BufferAttribute(a,3));return g}),[lanes]);
 const lines=useMemo(()=>lanes.map((l,i)=>{const accent=i%19===0?'#ffad62':i%13===0?'#9a7cff':i%7===0?'#e8fdff':l.h.color;return new THREE.Line(geometries[i],new THREE.LineBasicMaterial({color:accent,transparent:true,opacity:l.h.opacity,depthWrite:false,blending:THREE.AdditiveBlending}))}),[lanes,geometries]);
 useFrame((state,delta)=>{acc.current+=delta;if(acc.current<1/updateHz)return;acc.current=0;const t=state.clock.elapsedTime;lanes.forEach((l,i)=>{const line=lineRefs.current[i];if(!line)return;const pos=line.geometry.getAttribute('position') as THREE.BufferAttribute;const focus=!activeId||activeId===l.h.hubId;const amp=(.070+(i%7)*.0075)*(focus?1:.50);for(let j=0;j<l.points.length;j++){const q=j/(l.points.length-1),staticBase=l.points[j],originalStart=l.points[0],liveStart=currentNodePosition(l.h.hubId),base=staticBase.clone().add(liveStart.sub(originalStart).multiplyScalar((1-q)*(1-q)*(1+2*q))),env=Math.sin(Math.PI*q);const bundle=Math.sin(t*.74+l.seed+q*5.1)*amp*1.62;const ripple=Math.sin(t*1.46+l.seed*.63+q*11.4)*amp*.68;const breathe=Math.sin(t*.25+l.seed*.21)*amp*.55;const shear=Math.sin(t*.43+l.seed*.37+q*3.2)*amp*.46;const lateral=(bundle+ripple+breathe+shear)*env;const depth=(Math.cos(t*.71+l.seed+q*8.2)*amp*.85+Math.sin(t*.37+l.seed*.4)*amp*.35)*env;pos.setXYZ(j,base.x+l.normal.x*lateral,base.y+l.normal.y*lateral,base.z+depth)}pos.needsUpdate=true;const mat=line.material as THREE.LineBasicMaterial;mat.opacity=(l.h.opacity*(focus?(activeId?1.65:1.15):.12))*(i%7===0?1:.82)});});
 return <group>{lines.map((line,i)=><primitive key={i} object={line} ref={(o:THREE.Line|null)=>{lineRefs.current[i]=o}} />)}</group>
}

function Junction({p,color,scale=1}:{p:THREE.Vector3;color:string;scale?:number}){return <group position={p}><mesh><sphereGeometry args={[.055*scale,10,10]}/><meshBasicMaterial color="#ffffff"/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.11*scale,.009,5,32]}/><meshBasicMaterial color={color} transparent opacity={.8}/></mesh></group>}
// v0.0.39 Visual Gap Audit III — bright energy knots make the river read as a living flow rather than a bundle of thin lines.
function RiverEnergyKnots({activeId,quality='BALANCED'}:{activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){
 const leaders=useMemo(()=>{const all=makeHighways();return nodes.map(n=>all.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean)},[]);
 const perRiver=quality==='HIGH'?4:quality==='BALANCED'?3:2,ref=useRef<THREE.InstancedMesh>(null!),dummy=useMemo(()=>new THREE.Object3D(),[]),last=useRef(0);
 useFrame(st=>{const t=st.clock.elapsedTime, hz=quality==='HIGH'?36:quality==='BALANCED'?28:20;if(t-last.current<1/hz)return;last.current=t;let k=0;leaders.forEach((h,ri)=>{for(let j=0;j<perRiver;j++){const focus=!activeId||activeId===h.hubId,q=(t*(.055+ri*.004)+j/perRiver+ri*.071)%1;dummy.position.copy(deformRiverPoint(h,q,t+.12*j));const envelope=.45+.55*Math.sin(Math.PI*q),pulse=.70+.30*Math.sin(t*2.2+ri+j*1.7);dummy.scale.setScalar((focus?.045:.018)*envelope*pulse);dummy.updateMatrix();ref.current.setMatrixAt(k++,dummy.matrix)}});ref.current.instanceMatrix.needsUpdate=true});
 return <instancedMesh ref={ref} args={[undefined,undefined,leaders.length*perRiver]} frustumCulled><sphereGeometry args={[1,8,8]}/><meshBasicMaterial color="#b8f7ff" transparent opacity={.66} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
}
function RiverPulseTrain({activeId,quality='BALANCED'}:{activeId:string|null;quality?:'HIGH'|'BALANCED'|'LOW'}){
 const highways=useMemo(()=>makeHighways(),[]),leaders=useMemo(()=>nodes.map(n=>highways.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean),[highways]);
 const perRiver=quality==='HIGH'?3:quality==='BALANCED'?2:1,total=leaders.length*perRiver;
 const aura=useRef<THREE.InstancedMesh>(null!),glow=useRef<THREE.InstancedMesh>(null!),core=useRef<THREE.InstancedMesh>(null!),trail=useRef<THREE.InstancedMesh>(null!);
 const d=useMemo(()=>new THREE.Object3D(),[]),last=useRef(0),c=useMemo(()=>new THREE.Color(),[]);
 useFrame(st=>{const t=st.clock.elapsedTime,hz=quality==='HIGH'?44:quality==='BALANCED'?34:24;if(t-last.current<1/hz)return;last.current=t;let k=0;
  leaders.forEach((h,ri)=>{for(let j=0;j<perRiver;j++){const focus=!activeId||activeId===h.hubId,q=(t*(.105+ri*.004)+j/perRiver+ri*.083)%1,p=deformRiverPoint(h,q,t),q2=Math.max(.001,q-.018),ahead=deformRiverPoint(h,q2,t),pulse=.86+.22*Math.sin(t*4.6+ri*1.7+j*2.2),env=.62+.38*Math.sin(Math.PI*q);c.set(h.color);
   d.position.copy(p);d.quaternion.identity();d.scale.setScalar((focus?.105:.038)*pulse*env);d.updateMatrix();aura.current?.setMatrixAt(k,d.matrix);if(aura.current)aura.current.setColorAt(k,c);
   d.scale.setScalar((focus?.060:.024)*pulse*env);d.updateMatrix();glow.current?.setMatrixAt(k,d.matrix);if(glow.current)glow.current.setColorAt(k,c);
   d.scale.setScalar((focus?.025:.011)*(1+.16*Math.sin(t*7+j)));d.updateMatrix();core.current?.setMatrixAt(k,d.matrix);
   d.position.copy(p).lerp(ahead,.42);d.lookAt(ahead);d.scale.set((focus?.028:.010)*env,(focus?.028:.010)*env,(focus?.22:.07)*pulse);d.updateMatrix();trail.current?.setMatrixAt(k,d.matrix);if(trail.current)trail.current.setColorAt(k,c);k++;
  }});
  [aura.current,glow.current,core.current,trail.current].forEach(m=>{if(!m)return;m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true});
 });
 const sphere=<sphereGeometry args={[1,10,8]}/>;
 return <group>
  <instancedMesh ref={aura} args={[undefined,undefined,total]} frustumCulled={false}>{sphere}<meshBasicMaterial vertexColors transparent opacity={.16} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
  <instancedMesh ref={glow} args={[undefined,undefined,total]} frustumCulled={false}><sphereGeometry args={[1,10,8]}/><meshBasicMaterial vertexColors transparent opacity={.72} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
  <instancedMesh ref={core} args={[undefined,undefined,total]} frustumCulled={false}><sphereGeometry args={[1,8,6]}/><meshBasicMaterial color="#ffffff" transparent opacity={.96} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
  <instancedMesh ref={trail} args={[undefined,undefined,total]} frustumCulled={false}><sphereGeometry args={[1,7,5]}/><meshBasicMaterial vertexColors transparent opacity={.28} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
 </group>
}
// v0.1.00 — substantial plasma conduits, with directional energy advection.
// Eight physical bundles share the existing HUB -> CORE CatmullRom path data.
// v0.0.101: each conduit is an inclined, live-anchored plasma ribbon with
// flow encoded in UV space.  Hub-to-core direction is always u=0 -> u=1.
// v0.0.105: broken, tapered plasma sheaths instead of opaque neon hoses.
// UV.x follows the existing live hub -> horizon path. UV.y is the tube circumference.
const CONDUIT_VERTEX = `
 uniform vec3 uHubOffset;
 uniform float uTime;
 uniform float uSeed;
 uniform float uHubIndex;
 uniform float uLayer;
 attribute vec3 aRiverNormal;
 attribute vec3 aRiverCenter;
 varying vec2 vUv;
 varying float vTurbulence;
 void main(){
   vUv=uv;
   float q=uv.x;
   float env=sin(3.14159265*q);
   float envelope=pow(1.-q,2.)*(1.+2.*q);
   float seed=uHubIndex*1.713;
   float wave=sin(uTime*.46+seed+q*4.4)*.115;
   float breathe=sin(uTime*.19+seed*.7)*.055;
   float shear=sin(uTime*.31+seed*.43+q*2.15)*.070;
   float depth=(cos(uTime*.37+seed+q*5.8)*.095+sin(uTime*.16+seed*.31)*.045)*env;
   // Break up the uniform hose silhouette: pinched, breathing and torn sheath.
   float eddy=sin(q*57.+uTime*.82+seed)*sin(q*23.-uTime*.53+uv.y*12.);
   float knots=sin(q*12.-uTime*.28+seed*2.);
   float taper=mix(.36,1.04,smoothstep(.015,.19,q))*(1.-.73*smoothstep(.70,1.,q));
   float radiusScale=taper*(.68+.22*knots+.24*eddy);
   radiusScale=max(.18,radiusScale);
   vec3 p=aRiverCenter+(position-aRiverCenter)*radiusScale;
   p+=uHubOffset*envelope;
   p+=aRiverNormal*((wave+breathe+shear)*env);
   p.z+=depth;
   vTurbulence=eddy;
   gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
 }
`;
const CONDUIT_FRAGMENT = `
 uniform float uTime;
 uniform float uOpacity;
 uniform vec3 uColor;
 uniform float uSpeed;
 uniform float uLayer;
 varying vec2 vUv;
 varying float vTurbulence;
 void main(){
   float q=vUv.x;
   float angle=vUv.y*6.2831853;
   float spiral=sin(angle*3.+q*79.-uTime*uSpeed*4.8);
   float cross=sin(angle*7.-q*45.+uTime*2.1);
   float noise=sin(q*139.-uTime*1.8+angle*5.)*sin(q*37.+angle*11.+uTime*.6);
   // Patchy angular coverage: gaps remove the continuous tube silhouette.
   float coverage=.43+.28*spiral+.23*cross+.27*noise+.14*vTurbulence;
   float torn=smoothstep(.25,.76,coverage);
   float flowing=pow(max(0.,sin(q*102.-uTime*uSpeed*16.+angle*1.6)),16.);
   float spark=pow(max(0.,sin(q*173.-uTime*uSpeed*23.+angle*3.)),26.);
   float fade=smoothstep(0.,.035,q)*(1.-smoothstep(.91,1.,q));
   float shell=uLayer<.5?1.:.72;
   float alpha=uOpacity*fade*shell*torn*(.15+.20*spiral+.56*flowing+.29*spark);
   alpha=max(0.,alpha);
   vec3 hot=mix(uColor,vec3(.75,.91,1.),clamp(.20*flowing+.18*spark,0.,.48));
   // Avoid white clipping under Bloom; energy packets carry the brightest highlights.
   gl_FragColor=vec4(hot*(.68+.38*flowing+.28*spark),min(alpha,.41));
 }
`;
function PlasmaConduits({activeId,quality}:{activeId:string|null;quality:'HIGH'|'BALANCED'|'LOW'}){
 const leaders=useMemo(()=>{const all=makeHighways();return nodes.map(n=>all.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean)},[]);
 const streams=useMemo(()=>leaders.flatMap((h,i)=>[0,1].map(layer=>{
   const radius=layer===0?.082:.022;
   const geometry=new THREE.TubeGeometry(h.curve,quality==='HIGH'?150:quality==='BALANCED'?100:64,radius,layer===0?6:5,false);
   // Geometry and moving spheres now share the same normal and deformation field.
   const position=geometry.getAttribute('position');
   const normals=new Float32Array(position.count*3);
   const centers=new Float32Array(position.count*3);
   for(let vertex=0;vertex<position.count;vertex++){
     const q=geometry.getAttribute('uv').getX(vertex);
     const tangent=h.curve.getTangent(q).normalize();
     const center=h.curve.getPoint(q);
     centers[vertex*3]=center.x;centers[vertex*3+1]=center.y;centers[vertex*3+2]=center.z;
     const normal=new THREE.Vector3(-tangent.y,tangent.x,.10*Math.sin(h.hubIndex*.9)).normalize();
     normals[vertex*3]=normal.x;normals[vertex*3+1]=normal.y;normals[vertex*3+2]=normal.z;
   }
   geometry.setAttribute('aRiverNormal',new THREE.BufferAttribute(normals,3));
   geometry.setAttribute('aRiverCenter',new THREE.BufferAttribute(centers,3));
   const material=new THREE.ShaderMaterial({vertexShader:CONDUIT_VERTEX,fragmentShader:CONDUIT_FRAGMENT,
    uniforms:{uTime:{value:0},uOpacity:{value:layer===0?.19:.37},uColor:{value:new THREE.Color(h.color)},uSpeed:{value:.9+i*.045},uLayer:{value:layer},uHubOffset:{value:new THREE.Vector3()},uSeed:{value:i*1.61},uHubIndex:{value:h.hubIndex}},
    transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
   return {geometry,material,hubId:h.hubId,layer,start:h.curve.getPoint(0)};
 })),[leaders,quality]);
 useEffect(()=>()=>streams.forEach(s=>{s.geometry.dispose();s.material.dispose()}),[streams]);
 useFrame(st=>{const t=st.clock.elapsedTime;for(const stream of streams){
  stream.material.uniforms.uTime.value=t;
  stream.material.uniforms.uHubOffset.value.copy(currentNodePosition(stream.hubId)).sub(stream.start);
  const focused=!activeId||activeId===stream.hubId;
  stream.material.uniforms.uOpacity.value=(stream.layer===0?.18:.38)*(focused?1:.24);
 }});
 return <group>{streams.map((stream,i)=><mesh key={i} geometry={stream.geometry} material={stream.material} frustumCulled={false}/>)}</group>;
}
// Bright traveling packets and soft trailing afterimages, both sampled from the
// SAME live hub-anchored curve as the visible conduit mesh.
function ConduitEnergyPackets({activeId,quality}:{activeId:string|null;quality:'HIGH'|'BALANCED'|'LOW'}){
 const leaders=useMemo(()=>{const all=makeHighways();return nodes.map(n=>all.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean)},[]);
 const perHub=quality==='HIGH'?9:quality==='BALANCED'?6:4;
 const sphere=useRef<THREE.InstancedMesh>(null!),trail=useRef<THREE.InstancedMesh>(null!);
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 const colors=useMemo(()=>leaders.map(h=>new THREE.Color(h.color)),[leaders]);
 const elapsed=useRef(0);
 useFrame((st,delta)=>{
  if(!sphere.current||!trail.current)return;
  elapsed.current+=Math.min(delta,.05);
  const t=elapsed.current;let index=0;
  leaders.forEach((h,i)=>{for(let j=0;j<perHub;j++){
   const phase=j/perHub+i*.079;
   const q=(phase+t*(.071+i*.003))%1;
   const progress=Math.pow(q,1.65); // monotonic accelerating infall; slow launch, fast capture
   const focused=!activeId||activeId===h.hubId;
   const center=visibleInfallPosition(h,progress,t);
   const horizonDistance=Math.hypot(center.x,center.y);
   const extinction=progress>VISIBLE_CAPTURE_FRACTION?THREE.MathUtils.smoothstep(horizonDistance,.60,.83):1;
   const launch=THREE.MathUtils.smoothstep(progress,0,.025);
   const radius=(focused?.062:.022)*(.85+.18*Math.sin(t*5+j*1.7))*(1.-.35*progress)*extinction*launch;
   dummy.position.copy(center);dummy.scale.setScalar(Math.max(.00001,radius));dummy.updateMatrix();
   sphere.current!.setMatrixAt(index,dummy.matrix);sphere.current!.setColorAt(index,colors[i]);
   const back=Math.max(0,progress-.018-.018*progress);
   dummy.position.copy(visibleInfallPosition(h,back,t));dummy.scale.setScalar(Math.max(.00001,radius*1.35));dummy.updateMatrix();
   trail.current!.setMatrixAt(index,dummy.matrix);trail.current!.setColorAt(index,colors[i]);index++;
  }});
  sphere.current.instanceMatrix.needsUpdate=true;trail.current.instanceMatrix.needsUpdate=true;
  if(sphere.current.instanceColor)sphere.current.instanceColor.needsUpdate=true;
  if(trail.current.instanceColor)trail.current.instanceColor.needsUpdate=true;
 });
 return <group>
  <instancedMesh ref={sphere} args={[undefined,undefined,leaders.length*perHub]} frustumCulled={false}><sphereGeometry args={[1,8,6]}/><meshBasicMaterial vertexColors transparent opacity={.62} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
  <instancedMesh ref={trail} args={[undefined,undefined,leaders.length*perHub]} frustumCulled={false}><sphereGeometry args={[1,7,5]}/><meshBasicMaterial vertexColors transparent opacity={.21} depthWrite={false} blending={THREE.AdditiveBlending}/></instancedMesh>
 </group>;
}
// v0.0.103: sparse braided strands add depth without multiplying draw calls by 14 lanes.
function BraidedPlasmaStrands({activeId,quality}:{activeId:string|null;quality:'HIGH'|'BALANCED'|'LOW'}){
 const leaders=useMemo(()=>{const all=makeHighways();return nodes.map(n=>all.find(h=>h.hubId===n.id&&h.laneIndex===0)!).filter(Boolean)},[]);
 const perHub=quality==='HIGH'?4:quality==='BALANCED'?3:2;
 const segments=quality==='HIGH'?72:quality==='BALANCED'?48:30;
 const mesh=useRef<THREE.InstancedMesh>(null!);
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 const tangent=useMemo(()=>new THREE.Vector3(),[]);
 const normal=useMemo(()=>new THREE.Vector3(),[]),binormal=useMemo(()=>new THREE.Vector3(),[]),up=useMemo(()=>new THREE.Vector3(0,1,0),[]);
 const strandColors=useMemo(()=>leaders.map(h=>new THREE.Color(h.color)),[leaders]);
 const last=useRef(0);
 useFrame(st=>{
  if(!mesh.current)return;
  const t=st.clock.elapsedTime,rate=quality==='HIGH'?30:quality==='BALANCED'?24:16;
  if(t-last.current<1/rate)return;last.current=t;
  let k=0;
  leaders.forEach((h,i)=>{for(let strand=0;strand<perHub;strand++){
   for(let j=0;j<segments;j++){
    const q=(j+.5)/segments;
    const a=q*22.0-strand*6.2831853/perHub-t*.85;
    const p=deformRiverPoint(h,q,t);
    const pNext=deformRiverPoint(h,Math.min(.999,q+.006),t);
    tangent.copy(pNext).sub(p).normalize();
    normal.set(-tangent.y,tangent.x,0).normalize();
    binormal.crossVectors(tangent,normal).normalize();
    const radius=(.033+.015*Math.sin(q*37.-t*1.4+strand)+.009*Math.sin(q*89.+strand*2.1))*Math.sin(Math.PI*q);
    p.addScaledVector(normal,Math.cos(a)*radius).addScaledVector(binormal,Math.sin(a)*radius);
    dummy.position.copy(p);dummy.quaternion.setFromUnitVectors(up,tangent);
    const turbulence=Math.sin(q*91.+strand*3.1-t*1.3)*Math.sin(q*39.-t*.7+i);const fragment=Math.max(.04,Math.pow(Math.max(0,turbulence*.5+.5),1.8));const taper=Math.sin(Math.PI*q);dummy.scale.set(.0048*fragment,.026*fragment*taper,.0048*fragment);dummy.updateMatrix();mesh.current!.setMatrixAt(k,dummy.matrix);
    mesh.current!.setColorAt(k,strandColors[i]);k++;
   }
  }});
  mesh.current.instanceMatrix.needsUpdate=true;
  if(mesh.current.instanceColor)mesh.current.instanceColor.needsUpdate=true;
 });
 return <instancedMesh ref={mesh} args={[undefined,undefined,leaders.length*perHub*segments]} frustumCulled={false}>
  <cylinderGeometry args={[1,1,1,3,1]}/>
  <meshBasicMaterial vertexColors transparent opacity={activeId?.47:.32} depthWrite={false} blending={THREE.AdditiveBlending}/>
 </instancedMesh>;
}
function SpatialHighways({activeId,mobile=false,quality='BALANCED'}:{activeId:string|null;mobile?:boolean;quality?:'HIGH'|'BALANCED'|'LOW'}){const highways=useMemo(()=>makeHighways(),[]);const dynamicHighways=useMemo(()=>{const step=quality==='LOW'?14:mobile?9:quality==='BALANCED'?9:5;return highways.filter((_,i)=>i%step===0)},[highways,mobile,quality]);return <group><PlasmaConduits activeId={activeId} quality={quality}/><BraidedPlasmaStrands activeId={activeId} quality={quality}/><ConduitEnergyPackets activeId={activeId} quality={quality}/><RiverBackbones activeId={activeId} quality={quality}/>{quality!=='LOW'&&<DynamicStreamField highways={dynamicHighways} activeId={activeId} quality={quality}/>}{quality==='HIGH'&&<RiverPulseTrain activeId={activeId} quality={quality}/>}<PacketSwarm highways={dynamicHighways} activeId={activeId} quality={quality}/></group>}
function CrossLinks(){const pairs:[number,number][]=nodes.map((_,i)=>[i,(i+1)%nodes.length]);return <>{pairs.map(([a,b],i)=>{const A=new THREE.Vector3(...nodes[a].pos),B=new THREE.Vector3(...nodes[b].pos),mid=A.clone().lerp(B,.5);mid.z=-.7-i*.07;const c=new THREE.QuadraticBezierCurve3(A,mid,B);return <mesh key={i} geometry={new THREE.TubeGeometry(c,36,.005,4,false)}><meshBasicMaterial color="#157ca8" transparent opacity={.15} depthWrite={false}/></mesh>})}</>}
function HierarchicalFeeds(){return <>{nodes.flatMap((n,k)=>{const hub=new THREE.Vector3(...n.pos),dir=hub.clone().normalize(),collector=hub.clone().add(dir.multiplyScalar(-.68));return topologyFor(n,k).flatMap((s,i)=>{const sub=hub.clone().add(s.p),mid=collector.clone().lerp(sub,.55);mid.z+=i%2?.26:-.18;const c=new THREE.QuadraticBezierCurve3(collector,mid,sub);const primary=<mesh key={`${n.id}-sub-${i}`} geometry={new THREE.TubeGeometry(c,28,.0045,4,false)}><meshBasicMaterial color={n.tone} transparent opacity={.28} depthWrite={false}/></mesh>;const micros=s.micro.map((m,j)=>{const world=hub.clone().add(m),mc=new THREE.QuadraticBezierCurve3(sub,sub.clone().lerp(world,.5).setZ(world.z+.12),world);return <mesh key={`${n.id}-micro-${i}-${j}`} geometry={new THREE.TubeGeometry(mc,14,.0025,3,false)}><meshBasicMaterial color={n.tone} transparent opacity={.14} depthWrite={false}/></mesh>});return [primary,...micros]})})}</>}
function EcosystemClusters(){const clusters=useMemo(()=>nodes.flatMap((n,k)=>{const base=new THREE.Vector3(...n.pos);return Array.from({length:14},(_,i)=>{const a=(i/14)*Math.PI*2+k*.23,r=1.35+(i%4)*.17;return {p:base.clone().add(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r*.68,-.7+(i%5)*.22)),tone:n.tone,k,i}})}),[]);return <>{clusters.map((x,idx)=><group key={idx}><mesh position={x.p}><boxGeometry args={[.045,.045,.045]}/><meshBasicMaterial color={idx%9===0?'#ffffff':x.tone} transparent opacity={.55}/></mesh>{idx%3===0&&<line><bufferGeometry setFromPoints={[new THREE.Vector3(...nodes[x.k].pos),x.p]}/><lineBasicMaterial color={x.tone} transparent opacity={.08}/></line>}</group>)}</>}
function MicroNetwork(){
 const cyan=useRef<THREE.InstancedMesh>(null!),white=useRef<THREE.InstancedMesh>(null!);
 const pts=useMemo(()=>Array.from({length:190},(_,i)=>{const a=i*12.9898,b=i*78.233;return {p:new THREE.Vector3((Math.sin(a)*.5+.5)*11.4-5.7,(Math.sin(b)*.5+.5)*6.8-3.4,(Math.sin(a+b)*.5+.5)*3-2.8),white:i%7===0}}),[]);
 const groups=useMemo(()=>({cyan:pts.filter(x=>!x.white),white:pts.filter(x=>x.white)}),[pts]);
 useLayoutEffect(()=>{const d=new THREE.Object3D();const apply=(m:THREE.InstancedMesh,list:{p:THREE.Vector3;white:boolean}[])=>{list.forEach((x,i)=>{d.position.copy(x.p);const s=.72+(i%5)*.08;d.scale.setScalar(s);d.updateMatrix();m.setMatrixAt(i,d.matrix)});m.instanceMatrix.needsUpdate=true};apply(cyan.current,groups.cyan);apply(white.current,groups.white)},[groups]);
 return <group><instancedMesh ref={cyan} args={[undefined,undefined,groups.cyan.length]} frustumCulled><boxGeometry args={[.028,.028,.028]}/><meshBasicMaterial color="#168dcb" transparent opacity={.25}/></instancedMesh><instancedMesh ref={white} args={[undefined,undefined,groups.white.length]} frustumCulled><boxGeometry args={[.032,.032,.032]}/><meshBasicMaterial color="#dffcff" transparent opacity={.42}/></instancedMesh></group>
}

type InfraKind='compute'|'storage'|'gateway'|'relay';
type Infra={p:THREE.Vector3;kind:InfraKind;tone:string;scale:number;hub:number};
function cityInfra(){const out:Infra[]=[];nodes.forEach((n,k)=>{const base=new THREE.Vector3(...n.pos);for(let i=0;i<24;i++){const a=(i/24)*Math.PI*2+k*.37;const ring=i<10?1.45:i<18?2.05:2.65;const squash=.56+(k%3)*.04;const jitter=.08*Math.sin((i+1)*(k+2));const p=base.clone().add(new THREE.Vector3(Math.cos(a)*(ring+jitter),Math.sin(a)*(ring*squash+jitter*.4),-1.0+(i%6)*.16));const kinds:InfraKind[]=['compute','storage','gateway','relay'];out.push({p,kind:kinds[(i+k)%4],tone:n.tone,scale:.72+(i%5)*.13,hub:k})}});return out}
function InstancedInfrastructure(){
 const infra=useMemo(()=>cityInfra(),[]);
 const compute=useRef<THREE.InstancedMesh>(null!),storage=useRef<THREE.InstancedMesh>(null!),gateway=useRef<THREE.InstancedMesh>(null!),relay=useRef<THREE.InstancedMesh>(null!);
 const groups=useMemo(()=>({compute:infra.filter(x=>x.kind==='compute'),storage:infra.filter(x=>x.kind==='storage'),gateway:infra.filter(x=>x.kind==='gateway'),relay:infra.filter(x=>x.kind==='relay')}),[infra]);
 useLayoutEffect(()=>{const dummy=new THREE.Object3D();const apply=(ref:THREE.InstancedMesh,list:Infra[],kind:InfraKind)=>{list.forEach((x,i)=>{dummy.position.copy(x.p);dummy.rotation.set(0,(i*.73+x.hub*.31)%Math.PI,kind==='gateway'?Math.PI/4:0);const h=.18+x.scale*.22;if(kind==='compute')dummy.scale.set(.12*x.scale,h,.12*x.scale);else if(kind==='storage')dummy.scale.set(.10*x.scale,.20*x.scale,.10*x.scale);else if(kind==='gateway')dummy.scale.set(.15*x.scale,.15*x.scale,.15*x.scale);else dummy.scale.set(.035,.24*x.scale,.035);dummy.updateMatrix();ref.setMatrixAt(i,dummy.matrix);ref.setColorAt(i,new THREE.Color(x.tone))});ref.instanceMatrix.needsUpdate=true;if(ref.instanceColor)ref.instanceColor.needsUpdate=true};apply(compute.current,groups.compute,'compute');apply(storage.current,groups.storage,'storage');apply(gateway.current,groups.gateway,'gateway');apply(relay.current,groups.relay,'relay')},[groups]);
 return <group>
  <instancedMesh ref={compute} args={[undefined,undefined,groups.compute.length]} frustumCulled><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#082436" emissive="#16bde8" emissiveIntensity={.48} metalness={.7} roughness={.3} vertexColors/></instancedMesh>
  <instancedMesh ref={storage} args={[undefined,undefined,groups.storage.length]} frustumCulled><cylinderGeometry args={[1,1,1,8]}/><meshStandardMaterial color="#082436" emissive="#19c8ef" emissiveIntensity={.40} metalness={.65} roughness={.32} vertexColors/></instancedMesh>
  <instancedMesh ref={gateway} args={[undefined,undefined,groups.gateway.length]} frustumCulled><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#071d2c" emissive="#23d7ff" emissiveIntensity={.44} metalness={.72} roughness={.25} vertexColors/></instancedMesh>
  <instancedMesh ref={relay} args={[undefined,undefined,groups.relay.length]} frustumCulled><cylinderGeometry args={[1,1,1,6]}/><meshBasicMaterial color="#4adfff" transparent opacity={.42} vertexColors/></instancedMesh>
 </group>
}

// v0.0.30 Orbital Ecosystem Binding — local city/platform objects are children of each live hub orbit.
// v0.0.72: batch the 24 repeated infrastructure parts per hub into one GPU draw.
function OrbitalEcosystem({n,index,activeId}:{n:Node3D;index:number;activeId:string|null}){
 const g=useRef<THREE.Group>(null!),instances=useRef<THREE.InstancedMesh>(null!);
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 useLayoutEffect(()=>{if(!instances.current)return;for(let i=0;i<24;i++){
  const a=i/24*Math.PI*2+index*.37,ring=i<10?1.05:i<18?1.42:1.78,sc=.72+(i%5)*.13;
  dummy.position.set(Math.cos(a)*ring,Math.sin(a)*ring*.58,-.72+(i%6)*.13);
  dummy.rotation.set(0,i*.43,i%4===2?Math.PI/4:0);
  dummy.scale.set((i%4===2?.12:.09)*sc,(i%4===0?.22:.16)*sc,.09*sc);
  dummy.updateMatrix();instances.current.setMatrixAt(i,dummy.matrix);
 }instances.current.instanceMatrix.needsUpdate=true;},[index,dummy]);
 useFrame((state,delta)=>{if(!g.current)return;const t=state.clock.elapsedTime;g.current.position.copy(currentNodePosition(n.id));g.current.rotation.z=Math.sin(t*.17+index)*.025;g.current.rotation.y+=delta*.008;});
 return <group ref={g} position={currentNodePosition(n.id)} scale={!activeId||activeId===n.id?1:.93}>
  <mesh rotation={[Math.PI/2,0,0]} position={[0,0,-.82]}><ringGeometry args={[1.30,1.32,48]}/><meshBasicMaterial color={n.tone} transparent opacity={.29} side={THREE.DoubleSide}/></mesh>
  <instancedMesh ref={instances} args={[undefined,undefined,24]} frustumCulled={false}><boxGeometry args={[1,1,1]}/><meshBasicMaterial color={n.tone} transparent opacity={.68}/></instancedMesh>
 </group>
}
function OrbitalEcosystems({activeId}:{activeId:string|null}){return <>{nodes.map((n,i)=><OrbitalEcosystem key={n.id} n={n} index={i} activeId={activeId}/>)}</>}

function NetworkFloor(){const rings=useMemo(()=>[2.2,3.5,4.8,6.1],[]);return <group position={[0,0,-1.45]} rotation={[Math.PI/2,0,0]}>{rings.map((r,i)=><mesh key={r}><ringGeometry args={[r,r+.012,128]}/><meshBasicMaterial color={i%2?'#0a78a4':'#0ec4e8'} transparent opacity={.10-i*.012} side={THREE.DoubleSide}/></mesh>)}{Array.from({length:18},(_,i)=>{const a=(i/18)*Math.PI*2;return <mesh key={i} rotation={[0,0,a]} position={[3.15,0,0]}><planeGeometry args={[6.3,.008]}/><meshBasicMaterial color="#08779c" transparent opacity={.055} side={THREE.DoubleSide}/></mesh>})}</group>}
function LocalPlatforms(){return <>{nodes.map((n,k)=><group key={n.id} position={[n.pos[0],n.pos[1],-1.18]} rotation={[Math.PI/2,0,0]}><mesh><ringGeometry args={[.85,1.38,64]}/><meshBasicMaterial color={n.tone} transparent opacity={.055} side={THREE.DoubleSide}/></mesh><mesh><ringGeometry args={[1.48,1.50,64]}/><meshBasicMaterial color={n.tone} transparent opacity={.22} side={THREE.DoubleSide}/></mesh>{Array.from({length:12},(_,i)=><mesh key={i} rotation={[0,0,i*Math.PI/6]} position={[1.16,0,.01]}><planeGeometry args={[.34,.012]}/><meshBasicMaterial color={n.tone} transparent opacity={.18}/></mesh>)}</group>)}</>}
function SecondaryHighways(){const pairs:[number,number][]=nodes.map((_,i)=>[i,(i+1)%nodes.length]);return <>{pairs.map(([a,b],i)=>{const A=new THREE.Vector3(...nodes[a].pos),B=new THREE.Vector3(...nodes[b].pos);A.z=-1.02;B.z=-1.02;const mid=A.clone().lerp(B,.5);const v=B.clone().sub(A),normal=new THREE.Vector3(-v.y,v.x,0).normalize();mid.add(normal.multiplyScalar((i%2?-.24:.24)*(1+i%3*.2)));mid.z=-1.2+(i%3)*.12;const c=new THREE.QuadraticBezierCurve3(A,mid,B);return <group key={i}><mesh geometry={new THREE.TubeGeometry(c,42,.012,5,false)}><meshBasicMaterial color={i%3===0?'#29dfff':'#0b7fa8'} transparent opacity={.16} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>{[.25,.5,.75].map((t,j)=><Junction key={j} p={c.getPoint(t)} color={nodes[a].tone} scale={.55}/>)}</group>})}</>}
function CityDensity(){return <group><NetworkFloor/></group>}


// v0.0.81: Low-cost deep-space backdrop. A single unlit, non-fogged texture
// replaces flat black negative space. Generated once, no external image or runtime fetch.
function DeepSpaceBackdrop({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const {size,camera}=useThree();
 const mesh=useRef<THREE.Mesh>(null!);
 const texture=useMemo(()=>{
  const t=new THREE.TextureLoader().load('/images/cinematic-nebula-v098.webp');
  t.colorSpace=THREE.SRGBColorSpace;
  t.minFilter=THREE.LinearFilter;t.magFilter=THREE.LinearFilter;
  return t;
 },[]);
 // Cover UVs: full screen without distortion, including ultrawide and portrait.
 const sourceAspect=2048/1152,viewAspect=size.width/Math.max(1,size.height);
 const uvRepeatX=viewAspect<sourceAspect?viewAspect/sourceAspect:1;
 const uvRepeatY=viewAspect>sourceAspect?sourceAspect/viewAspect:1;
 useLayoutEffect(()=>{
  texture.wrapS=THREE.ClampToEdgeWrapping;texture.wrapT=THREE.ClampToEdgeWrapping;
  texture.repeat.set(uvRepeatX,uvRepeatY);
  texture.offset.set((1-uvRepeatX)/2,(1-uvRepeatY)/2);
  texture.needsUpdate=true;
 },[texture,uvRepeatX,uvRepeatY]);
 useLayoutEffect(()=>()=>texture.dispose(),[texture]);
 // Camera-following background: fixed 20-unit depth, so CameraRig zoom and parallax
 // can never expose a hard texture edge at any aspect ratio.
 useFrame(st=>{
  const cam=st.camera,m=mesh.current;if(!m)return;
  const distance=20;
  const fov=cam instanceof THREE.PerspectiveCamera?cam.fov:48;
  const height=2*Math.tan(THREE.MathUtils.degToRad(fov)/2)*distance;
  m.position.copy(cam.position).addScaledVector(cam.getWorldDirection(new THREE.Vector3()),distance);
  m.quaternion.copy(cam.quaternion);
  m.scale.set(height*(st.size.width/Math.max(1,st.size.height))*1.08,height*1.08,1);
 });
 return <mesh ref={mesh} renderOrder={-100} frustumCulled={false}>
  <planeGeometry args={[1,1]}/>
  <meshBasicMaterial map={texture} toneMapped={false} fog={false} depthWrite={false} depthTest={false}/>
 </mesh>;
}

// v0.0.120 — cinematic, GPU-only deep-space clouds and two off-axis spiral galaxies.
// The existing starfield texture remains underneath. This is not a generated image.
// v0.0.121: Corner-composed cinematic space: a dark center, dust-lane galaxies,
// warm/cool nebular filaments and fine star knots. All layers are procedural.
const CINEMATIC_SPACE_FRAGMENT = `
 precision highp float;
 varying vec2 vUv;
 uniform float uTime;
 uniform float uAspect;
 uniform float uDetail;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.05+vec2(4.7,9.2);a*=.5;}return v;}
 vec3 galaxy(vec2 uv,vec2 center,float angle,float scale){
   vec2 q=uv-center;q.x*=uAspect;q*=scale;
   mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));q=rot*q;
   q.y*=2.55;
   float r=length(q),theta=atan(q.y,q.x);
   float twist=theta*2.0-16.0*log(max(.06,r))+.6*fbm(q*17.);
   float arms=pow(.5+.5*cos(twist),6.0);
   float disk=exp(-r*4.3)*(.14+arms*.92);
   float lane=pow(.5+.5*cos(twist+1.15),10.0)*exp(-r*4.0);
   float core=exp(-r*r*95.0);
   vec3 blue=vec3(.04,.17,.40)*disk;
   vec3 orange=vec3(1.0,.38,.11)*(arms*exp(-r*6.0)*.50+core*.78);
   vec3 stars=vec3(.48,.72,1.0)*pow(max(0.,noise(q*180.)-.76),6.)*20.*disk;
   return max(vec3(0.),blue+orange+stars-vec3(.18,.12,.11)*lane);
 }
 void main(){
   vec2 uv=vUv;vec2 p=vec2(uv.x*uAspect,uv.y);
   float t=uTime*.0007;
   // Keep the playable 3D scene dark: color is concentrated at the outer corners.
   float center=length((uv-vec2(.51,.52))*vec2(uAspect,1.));
   float corner=smoothstep(.38,.85,center);
   float topLeft=exp(-length((uv-vec2(.07,.96))*vec2(uAspect,1.))*2.6);
   float bottomRight=exp(-length((uv-vec2(.98,.05))*vec2(uAspect,1.))*3.1);
   float rightEdge=exp(-pow((uv.x-1.04)*2.6,2.0));
   float w=fbm(p*5.2+vec2(t,-t*.6));
   float fine=fbm(p*15.0-vec2(t*.7,t));
   float filament=pow(smoothstep(.47,.77,w*.76+fine*.38),2.4);
   float coverage=corner*(.26+.74*filament)*(topLeft*.95+bottomRight*.88+rightEdge*.65);
   vec3 blue=vec3(.02,.16,.48),violet=vec3(.19,.045,.30),amber=vec3(.72,.15,.04);
   vec3 cloud=mix(blue,violet,smoothstep(.30,.72,fbm(p*2.7+vec2(7.,2.))));
   cloud=mix(cloud,amber,smoothstep(.60,.83,fbm(p*6.1+vec2(3.,11.)))*.64);
   vec3 g=galaxy(uv,vec2(.91,.81),-.52,2.6)*1.65;
   g+=galaxy(uv,vec2(.13,.96),.52,3.5)*.43;
   float sparkle=pow(max(0.,noise(p*190.)-.78),8.)*160.*corner;
   vec3 col=cloud*coverage*1.30+g+vec3(.54,.73,1.)*sparkle*.24;
   float alpha=clamp((coverage*.62+length(g)*.80+sparkle*.10)*uDetail,0.,.76);
   alpha*=mix(.10,1.,smoothstep(.28,.64,center));
   gl_FragColor=vec4(col,alpha);
 }
`;
function CinematicSpaceClouds({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const mesh=useRef<THREE.Mesh>(null!);
 const material=useMemo(()=>new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0},uAspect:{value:1},uDetail:{value:1}},
  vertexShader:ACCRETION_VERTEX,fragmentShader:CINEMATIC_SPACE_FRAGMENT,
  transparent:true,depthTest:false,depthWrite:false,fog:false,
  blending:THREE.NormalBlending,toneMapped:false
 }),[]);
 useFrame(st=>{
  const cam=st.camera,m=mesh.current;if(!m)return;
  const distance=19.9;
  const fov=cam instanceof THREE.PerspectiveCamera?cam.fov:48;
  const h=2*Math.tan(THREE.MathUtils.degToRad(fov)/2)*distance;
  m.position.copy(cam.position).addScaledVector(cam.getWorldDirection(new THREE.Vector3()),distance);
  m.quaternion.copy(cam.quaternion);
  m.scale.set(h*(st.size.width/Math.max(1,st.size.height))*1.08,h*1.08,1);
  material.uniforms.uAspect.value=st.size.width/Math.max(1,st.size.height);
  material.uniforms.uDetail.value=quality==='LOW'?.45:quality==='BALANCED'?.78:1;
  material.uniforms.uTime.value=st.clock.elapsedTime*(quality==='LOW'?.15:1);
 });
 useLayoutEffect(()=>()=>material.dispose(),[material]);
 return <mesh ref={mesh} renderOrder={-99} frustumCulled={false}>
  <planeGeometry args={[1,1]}/><primitive object={material} attach="material"/>
 </mesh>;
}

// v0.0.121: irregular rock silhouettes framing the corners, away from hub hit targets.
// Instancing keeps draw calls bounded on GTX 660-class hardware.
function CinematicCornerAsteroids({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const mesh=useRef<THREE.InstancedMesh>(null!);
 const count=quality==='LOW'?8:quality==='BALANCED'?19:34;
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 const rocks=useMemo(()=>Array.from({length:count},(_,i)=>{
  const side=i%4,step=Math.floor(i/4),j=(Math.sin(i*127.1)*43758.5)%1;
  const x=side===0?-6.5-step*.15:side===1?6.5+step*.15:(i%2?6.1:-6.1);
  const y=side===2?3.65+step*.12:side===3?-3.65-step*.12:-3.25+(i*1.83)%6.5;
  return {x:x+(j-.5)*1.4,y:y+Math.sin(i*2.71)*.53,z:-1.0-(i%5)*.58,s:.18+(i%6)*.065,phase:i*.79};
 }),[count]);
 useLayoutEffect(()=>{if(!mesh.current)return;rocks.forEach((r,i)=>{
  dummy.position.set(r.x,r.y,r.z);dummy.rotation.set(r.phase,r.phase*.7,r.phase*.31);
  dummy.scale.set(r.s*1.25,r.s*.72,r.s*.92);dummy.updateMatrix();mesh.current.setMatrixAt(i,dummy.matrix);
 });mesh.current.instanceMatrix.needsUpdate=true;},[rocks,dummy]);
 useFrame(st=>{if(!mesh.current)return;mesh.current.rotation.y=Math.sin(st.clock.elapsedTime*.009)*.016;});
 return <instancedMesh ref={mesh} args={[undefined,undefined,count]} frustumCulled={false}>
  <dodecahedronGeometry args={[1,1]}/>
  <meshStandardMaterial color="#090d17" roughness={.94} metalness={.04} emissive="#173047" emissiveIntensity={.07}/>
 </instancedMesh>;
}

// Remote infrastructure is intentionally small and muted: no extra navigation hubs.
// 2 clusters on the right, 1 on the left; single group transform per cluster.
function DeepSpaceRelays({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const roots=useRef<THREE.Group[]>([]);
 const cfg=useMemo(()=>[
  {x:7.0,y:2.5,z:-3.8,s:.45,tone:'#3676a0'},
  {x:7.3,y:-.35,z:-4.6,s:.58,tone:'#39648b'},
  {x:6.4,y:-2.9,z:-4.0,s:.48,tone:'#247c91'},
  {x:-6.9,y:2.9,z:-4.7,s:.40,tone:'#375b8c'},
  {x:-7.3,y:-2.4,z:-4.5,s:.43,tone:'#396a85'}
 ].slice(0,quality==='LOW'?2:quality==='HIGH'?5:4),[quality]);
 useFrame(st=>{const t=st.clock.elapsedTime;roots.current.forEach((g,i)=>{
  if(!g)return;const c=cfg[i];if(!c)return;
  g.position.set(c.x+Math.sin(t*.025+i)*.10,c.y+Math.cos(t*.019+i)*.09,c.z);
  g.rotation.y=t*(.018+i*.004);g.rotation.z=Math.sin(t*.032+i)*.09;
 });});
 return <group>{cfg.map((c,i)=><group key={i} ref={r=>{if(r)roots.current[i]=r}} scale={c.s}>
  <mesh><cylinderGeometry args={[.43,.51,.12,10]}/><meshStandardMaterial color="#091b29" emissive={c.tone} emissiveIntensity={.22} metalness={.65} roughness={.4}/></mesh>
  <mesh rotation={[Math.PI/2.8,.16,0]}><torusGeometry args={[.85,.025,6,40]}/><meshBasicMaterial color={c.tone} transparent opacity={.38} depthWrite={false}/></mesh>
  <mesh position={[0,.42,0]}><octahedronGeometry args={[.21,0]}/><meshBasicMaterial color={c.tone} transparent opacity={.60}/></mesh>
  {[0,1,2,3].map(j=><mesh key={j} position={[Math.cos(j*Math.PI/2)*.52,.02,Math.sin(j*Math.PI/2)*.52]}><boxGeometry args={[.15,.14,.14]}/><meshBasicMaterial color={c.tone} transparent opacity={.55}/></mesh>)}
 </group>)}</group>;
}


// v0.0.122 — All right-side set dressing is animated 3D geometry, not a static image.
// A remote accretion vortex sits above a modular station in the right-hand negative space.
// v0.0.123: cinematic mini accretion disk with dynamic filaments and a visible orbital station.
// v0.0.124: Anchor decorative objects to a viewport-relative position, not a fixed
// world-space x value. This keeps the station visible at different screen sizes.
function useOrbitalViewportAnchor(){
 const {camera,size}=useThree();
 return (x:number,y:number,depth:number,out:THREE.Vector3)=>{
  const fov=camera instanceof THREE.PerspectiveCamera?camera.fov:48;
  const h=2*Math.tan(THREE.MathUtils.degToRad(fov)/2)*depth;
  const w=h*(size.width/Math.max(size.height,1));
  const right=new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion);
  const up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion);
  const forward=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
  out.copy(camera.position).addScaledVector(forward,depth)
   .addScaledVector(right,(x-.5)*w).addScaledVector(up,(.5-y)*h);
 };
}

// Animated shader: the disk geometry stays fixed, while emission bands and matter shear inward.
// No static galaxy texture and no rigid-body disk rotation.
const MINI_ACCRETION_VERTEX = `
 varying vec2 vUv;
 void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
const MINI_ACCRETION_FRAGMENT = `
 uniform float uTime;
 uniform float uStrength;
 varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){
  vec2 p=(vUv-.5)*2.0;
  p.y/=0.53;
  float r=length(p);
  if(r<.16 || r>1.0) discard;
  float a=atan(p.y,p.x);
  float flow=a*5.0-r*23.0+uTime*(.70+1.6/(r+.5));
  float bands=pow(.5+.5*sin(flow),3.0);
  float grit=hash(floor(vec2(a*51.0+r*130.0,r*135.0-uTime*5.0)));
  float glow=exp(-pow((r-.37)*5.0,2.0))*1.1+exp(-pow((r-.62)*4.0,2.0))*.55;
  float fade=smoothstep(.16,.25,r)*(1.0-smoothstep(.83,1.0,r));
  vec3 amber=vec3(1.0,.31,.065), white=vec3(1.0,.88,.59), cyan=vec3(.08,.44,.97);
  vec3 col=mix(amber,white,clamp(glow*.7+bands*.3,0.0,1.0));
  col=mix(col,cyan,smoothstep(.67,.96,r)*.65);
  float alpha=fade*(.10+bands*.29+grit*.12)*uStrength;
  gl_FragColor=vec4(col*(.85+glow*.8),alpha);
 }
`;

// One miniature black hole: the former independent decorative disk has been removed.
// The accretion plane is fixed in world/camera space. Matter moves THROUGH that plane;
// the entire disk never spins as one rigid object.
function RemoteSpiralVortex({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const root=useRef<THREE.Group>(null!);
 const dust=useRef<THREE.Points>(null!);
 const diskShader=useRef<THREE.ShaderMaterial>(null!);
 const locate=useOrbitalViewportAnchor();
 const pos=useMemo(()=>new THREE.Vector3(),[]);
 const count=quality==='LOW'?360:quality==='BALANCED'?850:1500;
 const data=useMemo(()=>{
  const positions=new Float32Array(count*3),colors=new Float32Array(count*3);
  const cyan=new THREE.Color('#40caff'),hot=new THREE.Color('#ffae5b'),purple=new THREE.Color('#a77cff');
  const seeds=Array.from({length:count},(_,i)=>({arm:i%4,phase:((i*0.61803398875)%1),spread:Math.sin(i*81.97)*.11,speed:.55+(i%9)*.045}));
  for(let i=0;i<count;i++){
   const c=(i%4===0?cyan:i%4===2?purple:hot);
   colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;
  }
  return {positions,colors,seeds};
 },[count]);
 const filaments=useMemo(()=>Array.from({length:quality==='LOW'?4:quality==='BALANCED'?6:8},(_,i)=>{
  const pts:THREE.Vector3[]=[];
  for(let j=0;j<105;j++){
   const u=j/104, r=.25+1.02*u;
   const a=i*Math.PI*2/(quality==='LOW'?4:quality==='BALANCED'?6:8)+u*8.8;
   pts.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r*.46,Math.sin(a*.64)*.025));
  }
  return new THREE.CatmullRomCurve3(pts);
 }),[quality]);
 const last=useRef(0);
 useFrame(st=>{
  const t=st.clock.elapsedTime;
  if(diskShader.current)diskShader.current.uniforms.uTime.value=t;
  if(root.current){
   locate(.872,.167,9.9,pos);
   root.current.position.copy(pos);
   // Orientation changes only subtly; disk plane never rolls with the dust.
   root.current.rotation.set(.05,.06,-.26);
  }
  if(!dust.current||t-last.current<1/(quality==='HIGH'?30:quality==='BALANCED'?24:16))return;
  last.current=t;
  const a=dust.current.geometry.getAttribute('position') as THREE.BufferAttribute;
  for(let i=0;i<count;i++){
   const q=data.seeds[i];
   const u=1-((q.phase+t*q.speed*.065)%1);
   const r=.23+1.07*Math.pow(u,.80)+q.spread*u;
   const theta=q.arm*Math.PI/2+u*9.6+t*.08+q.spread*.4;
   a.array[i*3]=Math.cos(theta)*r;
   a.array[i*3+1]=Math.sin(theta)*r*.46;
   a.array[i*3+2]=Math.sin(theta*.75)*.027;
  }
  a.needsUpdate=true;
 });
 return <group ref={root} scale={quality==='LOW'?.80:1.02}>
  <group rotation={[.10,-.08,0]}>
   <mesh position={[0,0,-.045]} renderOrder={0}>
    <planeGeometry args={[2.55,2.55,1,1]}/>
    <shaderMaterial ref={diskShader} vertexShader={MINI_ACCRETION_VERTEX} fragmentShader={MINI_ACCRETION_FRAGMENT} uniforms={{uTime:{value:0},uStrength:{value:quality==='LOW'?.7:quality==='HIGH'?1.2:1}}} transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending}/>
   </mesh>
   <points ref={dust} frustumCulled={false}>
    <bufferGeometry>
     <bufferAttribute attach="attributes-position" args={[data.positions,3]}/>
     <bufferAttribute attach="attributes-color" args={[data.colors,3]}/>
    </bufferGeometry>
    <pointsMaterial vertexColors size={quality==='LOW'?.020:.027} sizeAttenuation transparent opacity={.91} depthWrite={false} blending={THREE.AdditiveBlending}/>
   </points>
   {filaments.map((curve,i)=><mesh key={i}>
    <tubeGeometry args={[curve,quality==='LOW'?56:90,i%2===0?.006:.0035,3,false]}/>
    <meshBasicMaterial color={i%3===0?'#ffc18a':i%3===1?'#45bbff':'#a78cff'} transparent opacity={i%2===0?.22:.12} depthWrite={false} blending={THREE.AdditiveBlending}/>
   </mesh>)}
   <mesh><ringGeometry args={[.23,.36,64]}/><meshBasicMaterial color="#ffb976" transparent opacity={.32} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>
  </group>
  <mesh position={[0,0,.085]}><sphereGeometry args={[.22,24,16]}/><meshBasicMaterial color="#000208"/></mesh>
  <mesh position={[0,0,.092]}><torusGeometry args={[.235,.017,6,64]}/><meshBasicMaterial color="#ffcc8e" transparent opacity={.87} toneMapped={false}/></mesh>
 </group>;
}

// Monumental orbital station, screen-anchored and independent from navigation hubs.
// Central command citadel, radial habitat ring, docking pylons and paired solar wings.
function OrbitalSpaceStation({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const root=useRef<THREE.Group>(null!);
 const habitat=useRef<THREE.Group>(null!);
 const antenna=useRef<THREE.Group>(null!);
 const locate=useOrbitalViewportAnchor();
 const pos=useMemo(()=>new THREE.Vector3(),[]);
 const spokes=quality==='LOW'?6:quality==='BALANCED'?10:14;
 const docks=quality==='LOW'?3:quality==='BALANCED'?5:8;
 useFrame(st=>{
  const t=st.clock.elapsedTime;
  if(root.current){
   locate(.862,.695,8.6,pos);
   root.current.position.copy(pos);
   root.current.position.y+=Math.sin(t*.17)*.10;
   root.current.rotation.y=-.12+Math.sin(t*.08)*.10;
   root.current.rotation.z=Math.sin(t*.09)*.035;
  }
  if(habitat.current)habitat.current.rotation.z=t*.045;
  if(antenna.current)antenna.current.rotation.y=t*.25;
 });
 const steel=<meshStandardMaterial color="#b2c9d8" metalness={.82} roughness={.26} emissive="#184f70" emissiveIntensity={.28}/>;
 return <group ref={root} scale={quality==='LOW'?.80:quality==='BALANCED'?1.02:1.10}>
  <mesh><cylinderGeometry args={[.40,.46,1.40,12]}/><meshStandardMaterial color="#8ba8c0" metalness={.75} roughness={.28} emissive="#1b5579" emissiveIntensity={.25}/></mesh>
  <mesh position={[0,.79,0]}><cylinderGeometry args={[.32,.45,.30,12]}/>{steel}</mesh>
  <mesh position={[0,1.02,.12]}><sphereGeometry args={[.29,16,12]}/><meshStandardMaterial color="#d1eaff" metalness={.55} roughness={.20} emissive="#35a9ed" emissiveIntensity={.62}/></mesh>
  <mesh position={[0,-.86,0]}><cylinderGeometry args={[.48,.32,.33,12]}/>{steel}</mesh>
  <group ref={habitat} rotation={[.16,0,0]}>
   <mesh><torusGeometry args={[1.12,.13,8,quality==='LOW'?36:72]}/><meshStandardMaterial color="#a8c5d6" metalness={.8} roughness={.27} emissive="#236f9a" emissiveIntensity={.30}/></mesh>
   <mesh><torusGeometry args={[1.12,.018,4,quality==='LOW'?36:72]}/><meshBasicMaterial color="#66e5ff" toneMapped={false}/></mesh>
   {Array.from({length:spokes},(_,i)=>{const a=i*Math.PI*2/spokes;
    return <group key={i} rotation={[0,0,a]}>
     <mesh position={[.69,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.043,.043,1.0,6]}/>{steel}</mesh>
     <mesh position={[1.12,0,0]}><boxGeometry args={[.22,.19,.20]}/><meshStandardMaterial color="#dae9ee" metalness={.64} roughness={.32} emissive="#19c5ed" emissiveIntensity={.37}/></mesh>
    </group>;
   })}
  </group>
  {[-1,1].map(side=><group key={side} position={[side*1.72,.02,0]}>
   <mesh position={[-side*.50,0,0]}><boxGeometry args={[1.05,.10,.10]}/>{steel}</mesh>
   {[-.48,.48].map((yy,i)=><group key={i} position={[side*.26,yy,0]}>
    <mesh><boxGeometry args={[1.85,.82,.065]}/><meshStandardMaterial color="#103a68" metalness={.45} roughness={.3} emissive="#136bc3" emissiveIntensity={.48}/></mesh>
    <mesh position={[0,0,.038]}><boxGeometry args={[1.77,.75,.012]}/><meshBasicMaterial color="#1e609a"/></mesh>
    {Array.from({length:7},(_,j)=><mesh key={j} position={[(j-3)*.25,0,.052]}><boxGeometry args={[.018,.73,.014]}/><meshBasicMaterial color="#8ddfff"/></mesh>)}
    <mesh position={[0,0,.057]}><boxGeometry args={[1.78,.014,.012]}/><meshBasicMaterial color="#7cddff"/></mesh>
   </group>)}
  </group>)}
  {[-1,1].map(side=><group key={side} position={[side*.53,-.98,0]}>
   <mesh><cylinderGeometry args={[.055,.055,.73,8]}/>{steel}</mesh>
   <mesh position={[0,-.42,0]}><boxGeometry args={[.42,.18,.35]}/><meshStandardMaterial color="#718fa7" metalness={.65} roughness={.3} emissive="#1f9ac0" emissiveIntensity={.22}/></mesh>
   <mesh position={[0,-.42,.19]}><sphereGeometry args={[.07,8,6]}/><meshBasicMaterial color="#73f3ff" toneMapped={false}/></mesh>
  </group>)}
  {/* Outer industrial truss and luminous secondary habitat ring. */}
  <mesh rotation={[.11,.14,0]}><torusGeometry args={[1.40,.033,6,quality==='LOW'?40:80]}/><meshStandardMaterial color="#a4c5d6" metalness={.82} roughness={.27} emissive="#2d9bc8" emissiveIntensity={.27}/></mesh>
  <mesh rotation={[.11,.14,0]}><torusGeometry args={[1.47,.010,4,quality==='LOW'?40:80]}/><meshBasicMaterial color="#3ecaff" transparent opacity={.68} depthWrite={false}/></mesh>
  {/* Independent docking modules distributed around the station perimeter. */}
  {Array.from({length:docks},(_,i)=>{const a=i*Math.PI*2/docks;
   return <group key={'dock'+i} position={[Math.cos(a)*1.55,Math.sin(a)*1.55,.05]} rotation={[0,0,a]}>
    <mesh><boxGeometry args={[.36,.18,.29]}/><meshStandardMaterial color="#819ba9" metalness={.8} roughness={.32} emissive="#19577d" emissiveIntensity={.30}/></mesh>
    <mesh position={[.20,0,.02]}><cylinderGeometry args={[.10,.10,.12,8]}/><meshStandardMaterial color="#c7dce4" metalness={.68} roughness={.29}/></mesh>
    <mesh position={[0,0,.17]}><boxGeometry args={[.26,.035,.02]}/><meshBasicMaterial color={i%2===0?'#73e6ff':'#ffc67e'} toneMapped={false}/></mesh>
   </group>;
  })}
  {/* Engineering bridge and paired propulsion nacelles. */}
  {[-1,1].map(side=><group key={'engine'+side} position={[side*.49,-1.36,-.10]}>
   <mesh><boxGeometry args={[.21,.58,.30]}/><meshStandardMaterial color="#91b3c3" metalness={.73} roughness={.31}/></mesh>
   <mesh position={[0,-.32,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.12,.18,.16,12]}/><meshStandardMaterial color="#627f93" metalness={.76} roughness={.25}/></mesh>
   <mesh position={[0,-.43,0]}><sphereGeometry args={[.10,10,8]}/><meshBasicMaterial color="#58d8ff" toneMapped={false}/></mesh>
  </group>)}
  <group ref={antenna} position={[0,1.35,0]}>
   <mesh><cylinderGeometry args={[.035,.035,.65,8]}/>{steel}</mesh>
   <mesh position={[0,.39,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.31,.019,6,32]}/><meshBasicMaterial color="#6ddfff" toneMapped={false}/></mesh>
   <mesh position={[0,.39,0]}><sphereGeometry args={[.08,10,8]}/><meshBasicMaterial color="#fff5d1" toneMapped={false}/></mesh>
  </group>
  <pointLight position={[0,.48,.65]} color="#55caff" intensity={quality==='HIGH'?1.0:.55} distance={3.8}/>
 </group>;
}

function DynamicStarfield({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){const ref=useRef<THREE.Points>(null!);const count=quality==='HIGH'?(mobile?420:1100):quality==='BALANCED'?(mobile?190:360):(mobile?120:220);const data=useMemo(()=>{const p=new Float32Array(count*3),base=new Float32Array(count*3);for(let i=0;i<count;i++){const a=i*12.9898,b=i*78.233;p[i*3]=base[i*3]=(Math.sin(a)*.5+.5)*18-9;p[i*3+1]=base[i*3+1]=(Math.sin(b)*.5+.5)*10-5;p[i*3+2]=base[i*3+2]=-2-(Math.sin(a+b)*.5+.5)*8}return {p,base}},[count]);const lastStarUpdate=useRef(0);const starHz=quality==='HIGH'?30:quality==='BALANCED'?22:14;useFrame((state)=>{const t=state.clock.elapsedTime;if(t-lastStarUpdate.current<1/starHz)return;lastStarUpdate.current=t;const mesh=ref.current;if(!mesh)return;const g=mesh.geometry,a=g.getAttribute('position') as THREE.BufferAttribute;for(let i=0;i<count;i++){const z=data.base[i*3+2],depth=Math.max(.18,1-Math.abs(z)/12);a.array[i*3]=data.base[i*3]+Math.sin(t*.035+i*.37)*.09*depth;a.array[i*3+1]=data.base[i*3+1]+((t*(.018+depth*.026)+i*.013)%10)-5+Math.sin(t*.09+i)*.035;a.array[i*3+2]=z+Math.sin(t*.027+i*.21)*.08}a.needsUpdate=true;ref.current.rotation.z=Math.sin(t*.018)*.012});return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[data.p,3]}/></bufferGeometry><pointsMaterial color="#9defff" size={.018} transparent opacity={.48} depthWrite={false} blending={THREE.AdditiveBlending}/></points>}

// v0.0.32 Dynamic Ambient Field — no decorative scene object is intentionally static.
function DynamicAmbientField({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){
 const shard=useRef<THREE.InstancedMesh>(null!),body=useRef<THREE.InstancedMesh>(null!);
 const shardCount=quality==='HIGH'?(mobile?30:76):quality==='BALANCED'?(mobile?17:36):(mobile?10:24);
 const bodyCount=quality==='HIGH'?(mobile?9:21):quality==='BALANCED'?(mobile?5:11):(mobile?3:7);
 const shards=useMemo(()=>Array.from({length:shardCount},(_,i)=>({a:(i/shardCount)*Math.PI*2+(i%5)*.17,r:5.1+(i%9)*.38,z:-1.2-(i%7)*.42,s:.035+(i%4)*.018,w:.018+(i%6)*.003,phase:i*.71})),[shardCount]);
 const bodies=useMemo(()=>Array.from({length:bodyCount},(_,i)=>({a:(i/bodyCount)*Math.PI*2+i*.29,r:5.4+(i%5)*.62,z:-1.5-(i%4)*.55,s:.055+(i%3)*.025,w:.010+(i%4)*.002,phase:i*1.17})),[bodyCount]);
 const dummy=useMemo(()=>new THREE.Object3D(),[]),last=useRef(0);
 const ambientHz=quality==='HIGH'?24:quality==='BALANCED'?18:12;
 useFrame((state)=>{const t=state.clock.elapsedTime;if(t-last.current<1/ambientHz)return;last.current=t;
  shards.forEach((x,i)=>{const a=x.a+t*x.w;dummy.position.set(Math.cos(a)*x.r+Math.sin(t*.13+x.phase)*.24,Math.sin(a)*x.r*.55+Math.cos(t*.11+x.phase)*.18,x.z+Math.sin(t*.17+x.phase)*.35);dummy.rotation.set(t*.09+x.phase,t*.13+i*.21,t*.07);const pulse=1+Math.sin(t*.37+x.phase)*.22;dummy.scale.set(x.s*8*pulse,x.s*3.2,x.s*3.2);dummy.updateMatrix();shard.current.setMatrixAt(i,dummy.matrix)});shard.current.instanceMatrix.needsUpdate=true;
  bodies.forEach((x,i)=>{const a=x.a-t*x.w;dummy.position.set(Math.cos(a)*x.r,Math.sin(a)*x.r*.62,x.z+Math.sin(t*.09+x.phase)*.45);dummy.rotation.set(0,t*.08+x.phase,0);const pulse=1+Math.sin(t*.21+x.phase)*.08;dummy.scale.setScalar(x.s*5*pulse);dummy.updateMatrix();body.current.setMatrixAt(i,dummy.matrix)});body.current.instanceMatrix.needsUpdate=true;
 });
 return <group>
  <instancedMesh ref={shard} args={[undefined,undefined,shardCount]} frustumCulled><boxGeometry args={[1,1,1]}/><meshBasicMaterial color="#27c9e8" transparent opacity={.20} depthWrite={false}/></instancedMesh>
  <instancedMesh ref={body} args={[undefined,undefined,bodyCount]} frustumCulled><icosahedronGeometry args={[1,1]}/><meshStandardMaterial color="#071b30" emissive="#4ddfff" emissiveIntensity={.48} transparent opacity={.42} metalness={.35} roughness={.25}/></instancedMesh>
 </group>
}

// v0.0.34 Dynamic Environment 2.0 — distant orbital colonies fill negative space without static scenery.
function DistantOrbitalColonies({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){const groups=useRef<THREE.Group[]>([]);const count=quality==='HIGH'?(mobile?3:7):quality==='BALANCED'?(mobile?2:5):(mobile?1:3);const cfg=useMemo(()=>Array.from({length:count},(_,i)=>({r:6.2+(i%3)*1.05,a:i*2.399+0.4,y:(i%2?1:-1)*(2.4+(i%3)*.48),z:-3.8-(i%4)*.72,s:.32+(i%3)*.08,w:(i%2?-1:1)*(.018+i*.002)})),[count]);useFrame((st)=>{const t=st.clock.elapsedTime;groups.current.forEach((g,i)=>{if(!g)return;const c=cfg[i];if(!c)return;const a=c.a+t*c.w;g.position.set(Math.cos(a)*c.r,c.y+Math.sin(t*.07+i)*.22,c.z+Math.sin(a)*.55);g.rotation.y=t*(.035+i*.004);g.rotation.z=Math.sin(t*.05+i)*.16})});return <group>{cfg.map((c,i)=><group key={i} ref={g=>{if(g)groups.current[i]=g;else groups.current.splice(i,1)}} scale={c.s}><mesh><icosahedronGeometry args={[.48,1]}/><meshStandardMaterial color="#061521" emissive={i%2?"#24cce8":"#477cff"} emissiveIntensity={.38} metalness={.65} roughness={.26}/></mesh><mesh rotation={[Math.PI/2.25,i*.18,0]}><torusGeometry args={[.82,.018,6,48]}/><meshBasicMaterial color={i%2?"#24cce8":"#5c86ff"} transparent opacity={.25} depthWrite={false}/></mesh>{[0,1,2].map(j=><mesh key={j} position={[Math.cos(j*2.094)*(.9+j*.12),Math.sin(j*2.094)*(.42+j*.06),.05*j]}><octahedronGeometry args={[.09+j*.02,0]}/><meshBasicMaterial color={j===0?"#d9fbff":"#26c8e8"} transparent opacity={.56}/></mesh>)}</group>)}</group>}


// v0.0.37 Composition & Depth Pass — sparse, moving foreground silhouettes create depth without static scenery.
function ForegroundParallaxField({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){
 const ref=useRef<THREE.InstancedMesh>(null!);const dummy=useMemo(()=>new THREE.Object3D(),[]);
 const count=quality==='HIGH'?(mobile?4:9):quality==='BALANCED'?(mobile?3:6):(mobile?2:4);
 const cfg=useMemo(()=>Array.from({length:count},(_,i)=>({x:(i%2?1:-1)*(5.7+(i%4)*.72),y:-3.0+(i%5)*1.48,z:1.0+(i%3)*.48,s:.22+(i%4)*.10,phase:i*.91,speed:.035+(i%3)*.008})),[count]);
 const last=useRef(0),updateHz=quality==='HIGH'?24:quality==='BALANCED'?18:12;useFrame((st)=>{const t=st.clock.elapsedTime;if(t-last.current<1/updateHz)return;last.current=t;cfg.forEach((c,i)=>{dummy.position.set(c.x+Math.sin(t*c.speed+c.phase)*.62,c.y+Math.cos(t*c.speed*.77+c.phase)*.34,c.z+Math.sin(t*.05+c.phase)*.22);dummy.rotation.set(t*.035+c.phase,t*.05+i*.23,t*.027);const pulse=1+Math.sin(t*.11+c.phase)*.06;dummy.scale.set(c.s*1.8*pulse,c.s*.72,c.s*.72);dummy.updateMatrix();ref.current.setMatrixAt(i,dummy.matrix)});ref.current.instanceMatrix.needsUpdate=true});
 return <instancedMesh ref={ref} args={[undefined,undefined,count]} frustumCulled><dodecahedronGeometry args={[1,0]}/><meshStandardMaterial color="#01060c" emissive="#07536c" emissiveIntensity={.075} metalness={.72} roughness={.40} transparent opacity={.25}/></instancedMesh>
}

// v0.0.37 Mid-depth relay halos keep the network visually connected outside the seven main hubs.
function MidDepthRelays({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){const roots=useRef<THREE.Group[]>([]),last=useRef(0);const count=quality==='HIGH'?(mobile?5:12):quality==='BALANCED'?(mobile?4:8):(mobile?2:5);const cfg=useMemo(()=>Array.from({length:count},(_,i)=>({a:i*2.399+.3,r:4.8+(i%4)*.7,z:-1.8-(i%3)*.38,s:.10+(i%3)*.025,w:(i%2?1:-1)*(.018+(i%4)*.003)})),[count]);const updateHz=quality==='HIGH'?30:quality==='BALANCED'?20:14;useFrame(st=>{const t=st.clock.elapsedTime;if(t-last.current<1/updateHz)return;last.current=t;roots.current.forEach((g,i)=>{if(!g)return;const c=cfg[i];if(!c)return;const a=c.a+t*c.w;g.position.set(Math.cos(a)*c.r,Math.sin(a)*c.r*.55+Math.sin(t*.07+i)*.15,c.z);g.rotation.z=-a*.35;g.rotation.y=t*.08})});return <group>{cfg.map((c,i)=><group key={i} ref={g=>{if(g)roots.current[i]=g;else roots.current.splice(i,1)}} scale={c.s}><mesh><icosahedronGeometry args={[1,1]}/><meshBasicMaterial color={i%3===0?'#bfefff':'#22bddd'} transparent opacity={.30}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.75,.035,6,40]}/><meshBasicMaterial color="#1bc5e6" transparent opacity={.11} depthWrite={false}/></mesh></group>)}</group>}

// v0.0.39: low-cost moving halo arcs occupy negative space without reintroducing static scenery.
function AmbientHaloArcs({quality='BALANCED',mobile=false}:{quality?:'HIGH'|'BALANCED'|'LOW';mobile?:boolean}){const roots=useRef<THREE.Mesh[]>([]);const count=quality==='HIGH'?(mobile?4:10):quality==='BALANCED'?(mobile?3:7):(mobile?2:4);const cfg=useMemo(()=>Array.from({length:count},(_,i)=>({x:(i%2?1:-1)*(4.6+(i%3)*1.05),y:-2.8+(i%5)*1.35,z:-2.2-(i%3)*.7,r:.42+(i%4)*.13,phase:i*.83,speed:(i%2?1:-1)*(.025+(i%3)*.006)})),[count]);useFrame((st,d)=>{const t=st.clock.elapsedTime;roots.current.forEach((m,i)=>{if(!m)return;const c=cfg[i];if(!c)return;m.position.set(c.x+Math.sin(t*.045+c.phase)*.35,c.y+Math.cos(t*.038+c.phase)*.22,c.z+Math.sin(t*.031+c.phase)*.18);m.rotation.x+=d*c.speed*.7;m.rotation.y+=d*c.speed;m.rotation.z=Math.sin(t*.06+c.phase)*.35;(m.material as THREE.MeshBasicMaterial).opacity=.07+.045*(.5+.5*Math.sin(t*.19+c.phase))})});return <group>{cfg.map((c,i)=><mesh key={i} ref={m=>{if(m)roots.current[i]=m;else roots.current.splice(i,1)}}><torusGeometry args={[c.r,.008,5,72,Math.PI*1.45]}/><meshBasicMaterial color={i%3===0?'#8b7cff':i%3===1?'#24d8ff':'#6ef0d1'} transparent opacity={.09} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh>)}</group>}

// v0.0.66: Quality-tiered cinematic lighting. LOW avoids extra dynamic point lights.
// The metallic dock receives a cool key and contrasting violet rim; highlights stay
// below the emissive AI core so the eight stations remain readable.
function LightingHierarchy({quality}:{quality:'HIGH'|'BALANCED'|'LOW'}){
 const low=quality==='LOW';
 return <group>
  <hemisphereLight args={['#09283b','#000208',low?.10:.13]}/>
  <directionalLight position={[-5.5,6.2,7.5]} color="#b6eaff" intensity={low?.52:.72}/>
  <directionalLight position={[5.5,-2.5,2.5]} color="#6c76ff" intensity={low?.22:.38}/>
  {!low&&<pointLight position={[0,.25,3.0]} color="#3bcaff" intensity={quality==='HIGH'?1.55:1.20} distance={7.0} decay={2}/>}
  {quality==='HIGH'&&<pointLight position={[0,-.8,-1.4]} color="#8e63ff" intensity={.54} distance={6.0} decay={2}/>}
 </group>
}

function AutonomousActivity(){
 const group=useRef<THREE.Group>(null!);
 const rings=useRef<THREE.Mesh[]>([]);
 const relays=useMemo(()=>nodes.map((n,i)=>({p:new THREE.Vector3(...n.pos).multiplyScalar(.78).setZ(.35+(i%3)*.08),tone:n.tone,phase:i*.83})),[]);
 useFrame((state,delta)=>{
  const t=state.clock.elapsedTime;
  group.current.rotation.z+=delta*.006;
  rings.current.forEach((m,i)=>{if(!m)return;const q=(t*.11+i*.29)%1;m.scale.setScalar(.72+q*.95);(m.material as THREE.MeshBasicMaterial).opacity=(1-q)*.11});
 });
 return <group ref={group}>{relays.map((r,i)=><group key={i} position={r.p}><mesh><sphereGeometry args={[.025,6,6]}/><meshBasicMaterial color={i%3===0?'#ffad62':r.tone} transparent opacity={.75}/></mesh><mesh ref={m=>{if(m)rings.current[i]=m}} rotation={[Math.PI/2,0,0]}><ringGeometry args={[.08,.092,24]}/><meshBasicMaterial color={r.tone} transparent opacity={.1} side={THREE.DoubleSide} depthWrite={false}/></mesh></group>)}</group>
}

function CameraRig({profile}:{profile:string}){useFrame((state,delta)=>{const p=state.pointer;const t=state.clock.elapsedTime;const aspect=state.size.width/Math.max(1,state.size.height);const mobile=profile.startsWith('mobile');const baseZ=profile==='mobile-portrait'?16.8:profile==='mobile-landscape'?13.0:profile==='laptop'?11.7:profile==='ultrawide'?10.5:profile==='uhd'?10.2:10.6;const tx=(mobile?0:p.x*(profile==='laptop'?.22:.30))+Math.sin(t*.10)*(mobile?.035:.10)+Math.sin(t*.031)*.025,ty=(mobile?0:p.y*(profile==='laptop'?.14:.19))+Math.cos(t*.085)*(mobile?.035:.07),tz=baseZ+(aspect<1.65&&!mobile?.35:0)+Math.sin(t*.13)*(mobile?.025:.06);state.camera.position.x=THREE.MathUtils.damp(state.camera.position.x,tx,3.2,delta);state.camera.position.y=THREE.MathUtils.damp(state.camera.position.y,ty,3.2,delta);state.camera.position.z=THREE.MathUtils.damp(state.camera.position.z,tz,2.2,delta);state.camera.lookAt(0,0,-.35)});return null}

export type ProjectedHub={id:string;x:number;y:number;radiusX:number;radiusY:number};
export type RenderTelemetry={fps:number;frameMs:number;calls:number;triangles:number;geometries:number;textures:number};

function ProjectionBridge({onProjection,onTelemetry,profile='fhd'}:{onProjection?:(hubs:ProjectedHub[])=>void;onTelemetry?:(t:RenderTelemetry)=>void;profile?:string}){
 const {camera,size,gl}=useThree();
 const lastProjection=useRef(0),lastTelemetry=useRef(0),frames=useRef(0),frameStart=useRef(0);
 useFrame((state,delta)=>{
  const now=state.clock.elapsedTime;
  frames.current++;
  if(onProjection&&now-lastProjection.current>.125){
   const scale=profile==='mobile-portrait'?.69:profile==='mobile-landscape'?.83:profile==='laptop'?.93:1,yoff=SCENE_Y_OFFSET+(profile==='mobile-portrait'?.24:profile==='mobile-landscape'?.12:0),mobile=profile.startsWith('mobile');const projected=nodes.map(n=>{const local=currentNodePosition(n.id).multiplyScalar(scale);local.y+=yoff;const v=local.project(camera);return {id:n.id,x:(v.x*.5+.5)*size.width,y:(-.5*v.y+.5)*size.height,radiusX:mobile?58:n.id==='data'?82:n.id==='study'?76:72,radiusY:mobile?48:n.id==='data'?62:56}});
   onProjection(projected);lastProjection.current=now;
  }
  if(onTelemetry&&now-lastTelemetry.current>.5){
   const span=Math.max(now-lastTelemetry.current,.001),fps=Math.round(frames.current/span);frames.current=0;lastTelemetry.current=now;
   const info=gl.info;
   onTelemetry({fps,frameMs:+(1000/Math.max(fps,1)).toFixed(1),calls:info.render.calls,triangles:info.render.triangles,geometries:info.memory.geometries,textures:info.memory.textures});
  }
 });return null;
}

export default function WebGLScene({activeId=null,coreActivated=false,onProjection,onTelemetry,profile='fhd',quality='BALANCED'}:{activeId?:string|null;coreActivated?:boolean;onProjection?:(hubs:ProjectedHub[])=>void;onTelemetry?:(t:RenderTelemetry)=>void;profile?:string;quality?:'HIGH'|'BALANCED'|'LOW'}){const mobile=profile.startsWith('mobile');const baseDpr=mobile?.9:profile==='uhd'?1.0:profile==='qhd'?1.05:profile==='laptop'?1.0:1.1;const dprMax=Math.min(baseDpr,quality==='HIGH'?1.1:quality==='BALANCED'?.95:.78);const sceneScale=profile==='mobile-portrait'?.69:profile==='mobile-landscape'?.83:profile==='laptop'?.93:1;const sceneY=SCENE_Y_OFFSET+(profile==='mobile-portrait'?.24:profile==='mobile-landscape'?.12:0);return <div className="webgl"><Canvas dpr={[.72,dprMax]} camera={{position:[0,0,10.2],fov:48}} gl={{antialias:false,alpha:false,powerPreference:'high-performance',stencil:false}} onCreated={({gl,scene})=>{gl.setClearColor('#00050d',1);scene.background=new THREE.Color('#00050d')}} performance={{min:.65,max:1,debounce:180}}><ProjectionBridge onProjection={onProjection} onTelemetry={onTelemetry} profile={profile}/><CameraRig profile={profile}/><color attach="background" args={['#00050d']}/><fog attach="fog" args={['#00030a',7.4,12.9]}/><ambientLight intensity={quality==='LOW'?.22:.12}/><LightingHierarchy quality={quality}/><DeepSpaceBackdrop quality={quality}/><CinematicSpaceClouds quality={quality}/><CinematicCornerAsteroids quality={quality}/><DeepSpaceRelays quality={quality}/><RemoteSpiralVortex quality={quality}/><OrbitalSpaceStation quality={quality}/><DynamicStarfield quality={quality} mobile={mobile}/>{quality!=='LOW'&&<DynamicAmbientField quality={quality} mobile={mobile}/>}{quality!=='LOW'&&<DistantOrbitalColonies quality={quality} mobile={mobile}/>}{quality!=='LOW'&&<MidDepthRelays quality={quality} mobile={mobile}/>}{quality!=='LOW'&&<AmbientHaloArcs quality={quality} mobile={mobile}/>}{quality!=='LOW'&&<ForegroundParallaxField quality={quality} mobile={mobile}/>}<group position={[0,sceneY,0]} scale={sceneScale}><group scale={1.045}><SingularityCore activated={coreActivated} quality={quality}/></group><IndependentOrbitController activeId={activeId} profile={profile}/><HubGravityInfall quality={quality} activated={coreActivated}/>{quality!=='LOW'&&<OrbitalEcosystems activeId={activeId}/>}<SpatialHighways activeId={activeId} mobile={mobile} quality={quality}/><HighwayInfallSpheres activeId={activeId} activated={coreActivated} quality={quality}/><AutonomousActivity/>{nodes.map((n,i)=><Hub key={n.id} n={n} index={i} activeId={activeId} quality={quality}/>)}</group>{<EffectComposer multisampling={0}><Bloom luminanceThreshold={quality==='HIGH'?.67:.72} luminanceSmoothing={.38} intensity={quality==='HIGH'?(mobile?.58:.72):quality==='LOW'?.24:.46} mipmapBlur/><Vignette eskil={false} offset={.19} darkness={quality==='HIGH'?.60:quality==='LOW'?.30:.50}/></EffectComposer>}</Canvas></div>}
