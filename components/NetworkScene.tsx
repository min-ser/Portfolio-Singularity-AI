'use client';
import dynamic from 'next/dynamic';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {ProjectedHub,RenderTelemetry} from './WebGLScene';
import {portfolioHubs} from './portfolioContent';
import {APP_VERSION,RELEASE_NAME,PERF_GUARD} from './version';
import {deviceHint,initialTier,nextTier} from './graphicsQuality';
const WebGLScene=dynamic(()=>import('./WebGLScene'),{ssr:false});

type Hub=(typeof portfolioHubs)[number];
const hubs=[...portfolioHubs];

type ViewportProfile='mobile-portrait'|'mobile-landscape'|'laptop'|'fhd'|'qhd'|'uhd'|'ultrawide';
function detectProfile():ViewportProfile{if(typeof window==='undefined')return 'fhd';const w=window.innerWidth,h=window.innerHeight,a=w/h;if(w<=760)return h>=w?'mobile-portrait':'mobile-landscape';if(h<=650&&w<=1180)return 'mobile-landscape';if(a>=2.05)return 'ultrawide';if(w>=3000)return 'uhd';if(w>=2200)return 'qhd';if(w>=1500&&h>=820)return 'fhd';return 'laptop'}

export default function NetworkScene(){
 const [profile,setProfile]=useState<ViewportProfile>('fhd');
 const [coreActivated,setCoreActivated]=useState(false);
 const [qualityMode,setQualityMode]=useState<'AUTO'|'HIGH'|'BALANCED'|'LOW'>('AUTO');
 const [autoQuality,setAutoQuality]=useState<'HIGH'|'BALANCED'|'LOW'>('BALANCED');
 const perfWindow=useRef<number[]>([]); const lastTierChange=useRef(0); const autoStarted=useRef(0); const [autoReason,setAutoReason]=useState('INITIALIZING');
 const [active,setActive]=useState<Hub|null>(null),[pinned,setPinned]=useState<Hub|null>(null),[destination,setDestination]=useState<{label:string;path:string}|null>(null),[projected,setProjected]=useState<Record<string,ProjectedHub>>({}),[telemetry,setTelemetry]=useState<RenderTelemetry|null>(null);
 const projectedRef=useRef<Record<string,ProjectedHub>>({});
 const [sampleStarted,setSampleStarted]=useState<number|null>(null);
 const [sampleDuration,setSampleDuration]=useState(0);
 const captureRef=useRef<{started:number;data:RenderTelemetry[]}|null>(null);
 const [captureResult,setCaptureResult]=useState<{quality:string;viewport:string;duration:number;count:number;avg:number;min:number;p95Frame:number;avgCalls:number;avgTriangles:number}|null>(null);
 const receiveTelemetry=useCallback((t:RenderTelemetry)=>{
  setTelemetry(t);
  const capture=captureRef.current;
  if(!capture)return;
  capture.data.push(t);
  const elapsed=(performance.now()-capture.started)/1000;
  setSampleDuration(Math.min(20,elapsed));
  if(elapsed>=20){
   captureRef.current=null;
   const data=capture.data;
   const sorted=data.map(x=>x.frameMs).sort((a,b)=>a-b);
   const avg=(fn:(x:RenderTelemetry)=>number)=>data.reduce((a,b)=>a+fn(b),0)/data.length;
   setCaptureResult({quality:qualityMode==='AUTO'?`AUTO/${autoQuality}`:qualityMode,viewport:`${window.innerWidth}x${window.innerHeight}`,duration:+elapsed.toFixed(1),count:data.length,avg:+avg(x=>x.fps).toFixed(1),min:Math.min(...data.map(x=>x.fps)),p95Frame:sorted[Math.min(sorted.length-1,Math.floor(sorted.length*.95))],avgCalls:Math.round(avg(x=>x.calls)),avgTriangles:Math.round(avg(x=>x.triangles))});
   setSampleStarted(null);
  }
 },[qualityMode,autoQuality]);
 const startCapture=()=>{captureRef.current={started:performance.now(),data:[]};setSampleStarted(performance.now());setSampleDuration(0);setCaptureResult(null)};
 const copyReport=()=>{if(!captureResult)return;const report={appVersion:APP_VERSION,...captureResult,userAgent:navigator.userAgent};void navigator.clipboard.writeText(JSON.stringify(report,null,2)).catch(()=>{});};
 useEffect(()=>{const sync=()=>setProfile(detectProfile());sync();window.addEventListener('resize',sync,{passive:true});return()=>window.removeEventListener('resize',sync)},[]);
 useEffect(()=>{const hint=deviceHint();const initial=initialTier(hint);setAutoQuality(initial);setAutoReason(`DEVICE BASELINE · ${initial}`);const now=performance.now();autoStarted.current=now;lastTierChange.current=now;perfWindow.current=[];},[]);
 useEffect(()=>{if(qualityMode!=='AUTO'||!telemetry||document.visibilityState!=='visible'||sampleStarted!==null)return;
 const now=performance.now();if(!Number.isFinite(telemetry.fps)||telemetry.fps<1)return;
 perfWindow.current=[...perfWindow.current.slice(-19),telemetry.fps];
 const next=nextTier(autoQuality,perfWindow.current,(now-lastTierChange.current)/1000,(now-autoStarted.current)/1000);
 if(next!==autoQuality){setAutoQuality(next);setAutoReason(`${autoQuality} → ${next} · STABLE FPS`);lastTierChange.current=now;perfWindow.current=[];}
 },[telemetry,qualityMode,autoQuality,sampleStarted]);
 useEffect(()=>{const reset=()=>{if(document.visibilityState==='visible'){perfWindow.current=[];const now=performance.now();lastTierChange.current=now;autoStarted.current=now;}};document.addEventListener('visibilitychange',reset);return()=>document.removeEventListener('visibilitychange',reset)},[]);
 const byId=useMemo(()=>new Map(hubs.map(h=>[h.id,h])),[]);
 const receiveProjection=useCallback((list:ProjectedHub[])=>{const next=Object.fromEntries(list.map(x=>[x.id,x]));projectedRef.current=next;setProjected(next)},[]);
 const proximity=(e:React.PointerEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();let best:Hub|null=null,bestScore=1;for(const h of hubs){const a=projectedRef.current[h.id];if(!a)continue;const dx=(e.clientX-r.left-a.x)/a.radiusX,dy=(e.clientY-r.top-a.y)/a.radiusY,score=dx*dx+dy*dy;if(score<bestScore){bestScore=score;best=h}}setActive(best)};
 const pos=(h:Hub)=>{const a=projected[h.id];return a?{left:a.x,top:a.y}:{left:`${h.fallback[0]*100}%`,top:`${h.fallback[1]*100}%`}};
 const navigate=useCallback((label:string,path:string)=>{const hub=hubs.find(h=>h.title===label)??null;setDestination({label,path});setPinned(hub);setActive(hub);},[]);
 const isMobile=profile==='mobile-portrait'||profile==='mobile-landscape';
 const navigateHub=useCallback((h:Hub)=>navigate(h.title,h.destination),[navigate]);
 const externalUrl=(h:Hub)=>{const base=process.env.NEXT_PUBLIC_GITBLOG_URL?.trim();if(!base)return null;try{const u=new URL(base);if(!['https:','http:'].includes(u.protocol))return null;u.hash=h.id;return u.toString()}catch{return null}};
 const openGitBlog=(h:Hub)=>{const url=externalUrl(h);if(url)window.open(url,'_blank','noopener,noreferrer')};
 const activateOrNavigate=useCallback((h:Hub)=>{if(isMobile&&active?.id!==h.id){setActive(h);setPinned(h);return;}navigateHub(h)},[isMobile,active,navigateHub]);
 const panelStyle=(active??pinned)?(()=>{const a=projected[(active??pinned)!.id];if(!a)return undefined;const w=isMobile?Math.min(window.innerWidth-24,340):profile==='laptop'?258:292,h=isMobile?250:profile==='laptop'?300:330,gap=profile==='ultrawide'?104:76;const sidebar=isMobile?0:profile==='laptop'?178:profile==='ultrawide'?236:215;const hud=isMobile?96:profile==='laptop'?118:138;const left=isMobile?12:(a.x>window.innerWidth*.64?Math.max(sidebar,a.x-w-gap):Math.min(window.innerWidth-w-18,a.x+gap));const top=isMobile?Math.max(12,window.innerHeight-hud-h-10):Math.min(Math.max(18,a.y-h*.42),window.innerHeight-hud-h-12);return {left,top}})():undefined;
 const effectiveQuality=qualityMode==='AUTO'?autoQuality:qualityMode;
 const focused=active??pinned;
 const dismissFocus=()=>{setPinned(null);setActive(null);setDestination(null)};
 return <main className={`scene vp-${profile}`} data-viewport={profile}><WebGLScene coreActivated={coreActivated} profile={profile} quality={effectiveQuality} activeId={focused?.id??null} onProjection={receiveProjection} onTelemetry={receiveTelemetry}/><div className="scan"/><div className="noise"/>
 <aside className="rail"><div className="brand">AI NETWORK <b>LAB</b></div><div className="role">CLOUD × DATA × AI × AUTOMATION</div><nav>{hubs.map((h,i)=><button key={h.id} className={(focused?.id===h.id?'on':'')} onClick={()=>navigateHub(h)} aria-current={focused?.id===h.id?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span>{h.title}</button>)}</nav><div className="railFoot">HYBRID WEBGL PORTFOLIO<br/><small>v{APP_VERSION} · {RELEASE_NAME}</small></div></aside>
 <section className="stage" onPointerMove={e=>{if(!pinned)proximity(e)}} onPointerLeave={()=>setActive(pinned)}><button type="button" className={`singularityControl ${coreActivated?'activated':''}`} onClick={()=>{setCoreActivated(v=>!v);setPinned(null);setActive(null);setDestination(null)}} aria-pressed={coreActivated} aria-label={coreActivated?'Deactivate Singularity Core':'Activate Singularity Core'}><strong>SINGULARITY CORE</strong><span>{coreActivated?'REACTOR ACTIVE · CLICK TO STANDBY':'CENTRAL CONTROL · CLICK TO ACTIVATE'}</span></button>{hubs.map((h,i)=><button key={h.id} aria-label={`${h.title} details`} className={'hub h'+i+' '+(focused?.id===h.id?'hot':'')} style={pos(h)} onPointerEnter={()=>setActive(byId.get(h.id)??h)} onFocus={()=>setActive(h)} onClick={()=>activateOrNavigate(h)}><b><span className="hubOrdinal">{String(i+1).padStart(2,'0')}</span> {h.title}</b><small>{h.sub}</small></button>)}{pinned&&<div className="info infoIA" onPointerEnter={()=>setActive(pinned)}><div className="infoTop"><span>NODE / {focused.id.toUpperCase()}</span><button type="button" className="infoClose" aria-label="Close node details" onClick={dismissFocus}>×</button></div><h2>{String(hubs.findIndex(h=>h.id===focused.id)+1).padStart(2,'0')} {focused.title}</h2><p>{focused.sub}</p><div className="iaLabel">DOMAIN</div>{focused.domains.map(x=><div className="row" key={x}>› {x}</div>)}<div className="iaLabel">CAPABILITY</div><div className="chips">{focused.capabilities.map(x=><span key={x}>{x}</span>)}</div><div className="evidence">{focused.evidence.map(x=><div key={x.label}><small>{x.label}</small><b>{x.value}</b></div>)}</div><button className="open navAction" onClick={()=>openGitBlog(focused)} disabled={!externalUrl(focused)}>{externalUrl(focused)?'OPEN GITBLOG ↗':'SET GITBLOG URL TO ENABLE LINK'}</button></div>}</section>
 <section className="hud hud2">
  <div className="hudStatus"><div className="hudHead"><b>REAL-TIME METRICS</b><span className="liveDot">LIVE</span></div><div className="metricsRow"><div className="health"><strong>{telemetry?.fps??'--'}</strong><small>FPS</small></div><div className="metricRing"><strong>{telemetry?.frameMs??'--'}</strong><small>FRAME MS</small></div><div className="metricRing"><strong>{telemetry?.calls??'--'}</strong><small>CALLS</small></div><div className="metricRing"><strong>{telemetry?Math.round(telemetry.triangles/1000):'--'}</strong><small>TRIS K</small></div></div></div>
  <div className="hudFlow"><div className="hudHead"><b>NETWORK TRAFFIC</b><span>REAL-TIME</span></div><div className="flowGrid"><div className="wave">{Array.from({length:24},(_,i)=><i key={i}/>)}</div><div className="flowLegend"><span>CLOUD</span><span>DATA</span><span>AI</span><span>AUTOMATION</span></div></div></div>
  <div className="hudActivity"><div className="hudHead"><b>RENDER RESOURCE</b><span>{focused?'FOCUSED':'AUTONOMOUS'}</span></div><div className="resourceRows"><div><span>DRAW CALLS</span><i style={{width:`${Math.min(100,(telemetry?.calls??0)/30)}%`}}/><b>{telemetry?.calls??'--'}</b></div><div><span>TRIANGLES</span><i style={{width:`${Math.min(100,(telemetry?.triangles??0)/5000)}%`}}/><b>{telemetry?.triangles?.toLocaleString()??'--'}</b></div><div><span>GEOMETRIES</span><i style={{width:`${Math.min(100,(telemetry?.geometries??0)/3)}%`}}/><b>{telemetry?.geometries??'--'}</b></div><div><span>TEXTURES</span><i style={{width:`${Math.min(100,(telemetry?.textures??0)/2)}%`}}/><b>{telemetry?.textures??'--'}</b></div></div><div className="activityMeta"><span>CALLS <b>{telemetry?.calls??'--'}</b></span><span>TRIS <b>{telemetry?.triangles?`${Math.round(telemetry.triangles/1000)}K`:'--'}</b></span></div></div>
  <div className="hudContext"><div className="hudHead"><b>ACTIVE CONTEXT</b><span>{destination?'ROUTED':focused?'LINKED':'STANDBY'}</span></div>{focused?<><strong className="contextTitle">{String(hubs.findIndex(h=>h.id===focused.id)+1).padStart(2,'0')} {focused.title}</strong><small>{focused.sub}</small><div className="contextPath">{destination?.label===focused.title?`DESTINATION › ${destination.path}`:`${focused.signal} › ${focused.domains[0]}`}</div></>:<><strong className="contextTitle">SINGULARITY CORE</strong><small>{coreActivated?'REACTOR ACTIVE':'CENTRAL CONTROL · STANDBY'}</small><div className="contextPath">8 HUBS · LIVE NETWORK</div></>}</div>
 </section>
 <details className="perf"><summary>PERF · {qualityMode==='AUTO'?`AUTO/${autoQuality}`:qualityMode}</summary><div><span>FPS <b>{telemetry?.fps??'--'}</b></span><span>FRAME <b>{telemetry?`${telemetry.frameMs}ms`:'--'}</b></span><span>CALLS <b>{telemetry?.calls??'--'}</b></span><span>TRI <b>{telemetry?.triangles?.toLocaleString()??'--'}</b></span><span>GEO <b>{telemetry?.geometries??'--'}</b></span><span>TEX <b>{telemetry?.textures??'--'}</b></span><span>QUALITY <b>{effectiveQuality}</b></span><span>AUTO POLICY <b>{qualityMode==='AUTO'?autoReason:'MANUAL LOCK'}</b></span>{sampleStarted!==null&&<span className="captureState">CAPTURING {Math.floor(sampleDuration)} / 20s</span>}{captureResult&&<div className="captureResult"><b>20s SAMPLE · {captureResult.count} READINGS</b><span>AVG {captureResult.avg} FPS · MIN {captureResult.min} FPS</span><span>P95 FRAME {captureResult.p95Frame} ms</span><span>AVG CALLS {captureResult.avgCalls} · TRIS {captureResult.avgTriangles}</span><span>{captureResult.viewport} · {captureResult.quality}</span><button type="button" onClick={copyReport}>COPY REPORT</button></div>}<div className="captureActions"><button type="button" disabled={sampleStarted!==null} onClick={startCapture}>MEASURE 20s</button></div><div className="qualityButtons">{(['AUTO','HIGH','BALANCED','LOW'] as const).map(q=><button key={q} className={qualityMode===q?'on':''} onClick={()=>{captureRef.current=null;setSampleStarted(null);setCaptureResult(null);setQualityMode(q);perfWindow.current=[];const now=performance.now();lastTierChange.current=now;autoStarted.current=now;if(q==='AUTO'){const initial=initialTier(deviceHint());setAutoQuality(initial);setAutoReason(`DEVICE BASELINE · ${initial}`)}}}>{q}</button>)}</div></div></details>
 {destination&&<div className="navToast"><span>NAVIGATION</span><b>{destination.label}</b><small>{destination.path} · SECTION SELECTED</small></div>}<div className="hint">DEPTH BANDS · PARALLAX FIELD · QUALITY {effectiveQuality} · PERF GUARD {PERF_GUARD} · {profile.toUpperCase()}</div></main>}
