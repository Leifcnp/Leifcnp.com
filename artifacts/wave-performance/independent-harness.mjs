// Run with bundled Node 24: node --experimental-strip-types artifacts/wave-performance/independent-harness.mjs [parity|bench|browser]
// Oracle is always reconstructed from Git; candidate is snapshotted before imports.
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, writeFileSync, readFileSync, symlinkSync, rmSync} from 'node:fs';
import {tmpdir, cpus, release} from 'node:os';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {stripTypeScriptTypes} from 'node:module';
import {createServer} from 'node:http';
const base='812e02fc2517d02165241289f31ea58a644e4fc0', root=process.cwd(), mode=process.argv[2]??'parity', sham=process.env.SHAM==='1';
const temp=mkdtempSync(join(tmpdir(),'wave-oracle-'));
const files=['waves.ts','waveNoise.ts','stormField.ts','waterSurfaceGrid.ts','createOceanSurface.ts'];
const hashes={};
for(const variant of ['base','candidate']){
 const dir=join(temp,variant); mkdirSync(dir); symlinkSync(join(root,'node_modules'),join(dir,'node_modules')); hashes[variant]={};
 for(const file of files){const content=(variant==='base'||sham)?execFileSync('git',['show',`${base}:src/world/${file}`],{cwd:root}):readFileSync(join(root,'src/world',file));writeFileSync(join(dir,file),content);hashes[variant][file]=createHash('sha256').update(content).digest('hex');}
}
const load=async(v,f)=>import(pathToFileURL(join(temp,v,f)).href);
const [bw,cw,bn,cn,bo,co]=await Promise.all([load('base','waves.ts'),load('candidate','waves.ts'),load('base','waveNoise.ts'),load('candidate','waveNoise.ts'),load('base','createOceanSurface.ts'),load('candidate','createOceanSurface.ts')]);
const THREE=await import(pathToFileURL(resolve('node_modules/three/build/three.module.js')).href);
let checks=0; const digest=createHash('sha256');
function equal(a,b,label){if(typeof a==='object'){for(const k of Object.keys(a))equal(a[k],b[k],`${label}.${k}`);return;}checks++;if(!Object.is(a,b))throw Error(`${label}: ${a} !== ${b}`);digest.update(`${Object.is(a,-0)?'-0':a};`);}
let state=0x98765432;function random(){state=(Math.imul(state,1664525)+1013904223)|0;return(state>>>0)/4294967296;}
const odd=[0,-0,NaN,Infinity,-Infinity,1e-300,-1e-300,1e16,-1e16,Number.MAX_VALUE,-Number.MAX_VALUE,2147483648,-2147483649,4294967296];
const seeds=[...odd,0x51f15e,1,-1,0xffffffff,0x80000000,0x51f15e+64,1.9,-1.9];
if(mode==='parity'){
 const targetA={},targetB={};
 for(let i=0;i<24000;i++){
  const seed=i%3===0?seeds[i%seeds.length]:Math.floor(random()*2**40)*(i%2?-1:1);
  let x=(random()-.5)*900,z=(random()-.5)*900,t=(random()-.5)*10000;
  if(i<odd.length*seeds.length){x=odd[i%odd.length];z=odd[Math.floor(i/odd.length)%odd.length];t=odd[(i*5)%odd.length];}
  if(i%7===0){x=(i%2?142:172)+(i%3-1)*1e-10;z=0;}
  if(i%11===0){x=Math.floor(x)+(i%3-1)*Number.EPSILON;z=Math.floor(z)+(i%3-1)*1e-12;}
  equal(bn.sampleWaveNoise(x,z,seed,targetA),cn.sampleWaveNoise(x,z,seed,targetB),`noise ${i}`);
  if(cn.sampleWaveNoiseValue)equal(bn.sampleWaveNoise(x,z,seed).value,cn.sampleWaveNoiseValue(x,z,seed),`noiseValue ${i}`);
  // Different APIs/seed order deliberately disturb cache slots between checks.
  cn.sampleWaveNoise(z,x,seed+64);cw.sampleWaterHeight(z,x,t,seed^0x6a09e667);
  equal(bw.sampleWaterHeight(x,z,t,seed),cw.sampleWaterHeight(x,z,t,seed),`height ${i}`);
  equal(bw.samplePrimaryWavePhase(x,z,t,seed),cw.samplePrimaryWavePhase(x,z,t,seed),`phase ${i}`);
  if(cw.sampleWaterSpatial){
   const expected=bw.sampleWaterSurface(x,z,t,0,seed), target={height:1,slopeX:2,slopeZ:3,stormIntensity:4};
   const spatial=cw.sampleWaterSpatial(x,z,t,target,seed);
   if(spatial!==target)throw Error('spatial target identity');
   for(const key of Object.keys(target))equal(expected[key],spatial[key],`spatial ${i}.${key}`);
   const held=cw.sampleWaterSpatial(x,z,t,undefined,seed), saved={...held};
   cw.sampleWaterSpatial(z,x,t+1,undefined,seed+64);
   equal(saved,held,`spatial retained ${i}`);
  }
  const distance=[0,.2,1e-9,-1,Infinity,NaN][i%6];
  equal(bw.sampleWaterSurface(x,z,t,distance,seed),cw.sampleWaterSurface(x,z,t,distance,seed),`surface ${i}`);
 }
 const oceanA=bo.createOceanSurface(new THREE.Scene()),oceanB=co.createOceanSurface(new THREE.Scene());
 for(const t of [0,1/60,2.718,500,-17,NaN]){oceanA.update(t);oceanB.update(t);for(const key of ['mesh','crestMesh'])for(const name of ['position','color','normal','opacity']){const a=oceanA[key].geometry.getAttribute(name),b=oceanB[key].geometry.getAttribute(name);if(a)for(let i=0;i<a.array.length;i++)equal(a.array[i],b.array[i],`${key}.${name}.${i}`);}}
 oceanA.dispose();oceanB.dispose();
 console.log(JSON.stringify({mode,base,hashes,checks,checksum:digest.digest('hex'),result:'exact Object.is parity'},null,2));
}else{
 let results, browserVersion;
 if(mode==='browser'){
  const server=createServer((req,res)=>{try{const path=req.url.split('?')[0];if(path==='/'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Independent wave CPU benchmark</title>');return;}const file=path.startsWith('/three/')?join(root,'node_modules/three/build',path.slice(7)):join(temp,path);let code=readFileSync(file,'utf8');if(file.endsWith('.ts'))code=stripTypeScriptTypes(code).replaceAll("from 'three'","from '/three/three.module.js'");res.setHeader('Content-Type','text/javascript');res.end(code);}catch(error){res.statusCode=500;res.end(String(error));}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const {chromium}=await import(process.env.PLAYWRIGHT_MODULE??'/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs');
  const browser=await chromium.launch({headless:true});browserVersion=browser.version();
  try{const page=await browser.newPage();await page.goto(`http://127.0.0.1:${server.address().port}/`);results=await page.evaluate(async(source)=>{const [bw,cw,bo,co,THREE]=await Promise.all([import('/base/waves.ts'),import('/candidate/waves.ts'),import('/base/createOceanSurface.ts'),import('/candidate/createOceanSurface.ts'),import('/three/three.module.js')]);return new Function('bw','cw','bo','co','THREE',`return (${source})(bw,cw,bo,co,THREE)`)(bw,cw,bo,co,THREE);},runBenchmark.toString());}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
 }else results=runBenchmark(bw,cw,bo,co,THREE);
 console.log(JSON.stringify({mode,sham,base,hashes,environment:{node:process.version,browser:browserVersion,platform:process.platform,release:release(),cpu:cpus()[0].model},note:'ocean uses unmodified production update; oceanWithNormals additionally computes normals (production only computes at construction). 40 AB/BA interleaved rounds, 10 warmups per workload; each timed ocean batch=6 updates; other timed batches=20000 queries. Timings normalize to one update or10000 queries. Browser executes identical CPU workload without WebGL raster.',results},null,2));
}
rmSync(temp,{recursive:true,force:true});

function runBenchmark(bw,cw,bo,co,THREE){
 const a=bo.createOceanSurface(new THREE.Scene()),b=co.createOceanSurface(new THREE.Scene());let sink=0;
 const workloads={
  ocean:(w,o,n)=>{for(let j=0;j<n;j++){o.update((j+frame)/60);sink+=o.mesh.geometry.getAttribute('position').array[3001];}},
  oceanWithNormals:(w,o,n)=>{for(let j=0;j<n;j++){o.update((j+frame)/60);o.mesh.geometry.computeVertexNormals();sink+=o.mesh.geometry.getAttribute('normal').array[3001];}},
  height:(w,o,n)=>{for(let j=0;j<n*10000;j++)sink+=w.sampleWaterHeight((j%201-100)*4,(Math.floor(j/201)%201-100)*4,(frame+j%3)/60);},
  scatteredHull:(w,o,n)=>{for(let j=0;j<n*10000;j++){const x=((j*7919)%44000)/100-220,z=((j*3571)%44000)/100-220;sink+=w.sampleWaterSurface(x,z,(frame+j%7)/60).slopeX;}},
  coldNoise:(w,o,n)=>{for(let j=0;j<n*10000;j++)sink+=w.sampleWaterHeight(j*131.13-220,-j*79.71,(j+frame)/60,(j*65537)|0);},
 };let frame=0;const results={};
 for(const [name,fn] of Object.entries(workloads)){const n=name.startsWith('ocean')?6:2;for(let i=0;i<10;i++){fn(bw,a,n);fn(cw,b,n);frame+=3;}const samples={base:[],candidate:[]};const sums={base:0,candidate:0};for(let round=0;round<40;round++){for(const v of round%2?['candidate','base']:['base','candidate']){sink=0;const start=performance.now();fn(v==='base'?bw:cw,v==='base'?a:b,n);samples[v].push((performance.now()-start)/n);sums[v]+=sink;}frame+=3;}const stats=x=>{const s=[...x].sort((a,b)=>a-b);return{median:s[Math.floor(s.length*.5)],p95:s[Math.floor(s.length*.95)],min:s[0],max:s.at(-1)};};results[name]={samplesMs:samples,stats:{base:stats(samples.base),candidate:stats(samples.candidate)},checksums:sums};}
 a.dispose();b.dispose();return results;
}
