// Logbook t=.25 normal-phone diagnostic; same environment and command as main fixture.
// Production QA: PLAYWRIGHT_BROWSERS_PATH=/tmp/web022-browsers ACTIVE_TIME=11.75 QUIET_TIME=8.25 node artifacts/phase15-rollout/browser-logbook-risk.mjs
// ACTIVE_TIME/QUIET_TIME are measured shared-water phases; BASELINE_URL4174/CANDIDATE_URL4175.
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs'
import {resolve,dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE??'/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs')
const root=process.env.PROJECT_ROOT??resolve(dirname(fileURLToPath(import.meta.url)),'../..'),out=process.env.OUTPUT_DIR??resolve(root,'artifacts/phase15-rollout')
const base='907673941072e59335e9f16e5de97b393c575d53',hash=x=>createHash('sha256').update(x).digest('hex')
const active=Number(process.env.ACTIVE_TIME),quiet=Number(process.env.QUIET_TIME)
assert.ok(Number.isFinite(active)&&Number.isFinite(quiet)&&active!==quiet,'Set measured ACTIVE_TIME and QUIET_TIME')
mkdirSync(out,{recursive:true})
const report={generatedAt:new Date().toISOString(),base,headAtMeasurement:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),candidateSourceSha256:Object.fromEntries(['src/world/effects/createShorelineFoam.ts','src/world/createLandmarks.ts','src/world/createWaterWorld.ts'].map(p=>[p,hash(readFileSync(resolve(root,p)))])),provenance:'Unmodified production bundles. Fixture manually steps actual requestAnimationFrame callbacks at100ms plus an exact final fractional interval; skips only intermediate raster draws, then renders each batch final frame normally. CPU simulation/camera/waves remain unchanged. Each matched view resets clock, holds actual Spill control, and uses normal production camera. Phone framing uses real paused instant Chartroom scanner then resume. Source hashes bind candidate working source; baseline proven by served asset bytes against recorded base docs. Canvas-only hashes hide HUD parents+descendants. Resize gets actual render step; drawer220ms animation settles260ms.',limits:'SwiftShader VM evidence, no physical GPU/browser-performance/Windows/browser-chrome/OS hidden-tab claim. Eight matched comparison images plus two targeted Logbook diagnostics. Local preview; publication remains root gate.',phases:{active,quiet},assets:{},captures:[],checks:[]}
const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});report.browser=browser.version()
function fixture(fallback){
 const callbacks=new Map();let id=1,now=1000;window.__draw=true
 window.requestAnimationFrame=fn=>{const key=id++;callbacks.set(key,fn);return key};window.cancelAnimationFrame=key=>callbacks.delete(key)
 for(const name of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){const original=WebGL2RenderingContext.prototype[name];WebGL2RenderingContext.prototype[name]=function(...args){if(window.__draw)return original.apply(this,args)}}
 window.__step=count=>{for(let tick=0;tick<count;tick++){window.__draw=tick===count-1;const pending=[...callbacks.values()];callbacks.clear();for(const fn of pending)fn(now);now+=100}window.__draw=true;return callbacks.size}
 window.__fraction=ms=>{now-=100-ms;return window.__step(1)}
 if(fallback){const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args)}}
}
async function open(url,viewport,fallback=false){const context=await browser.newContext({viewport,deviceScaleFactor:1});await context.addInitScript(fixture,fallback);const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});await page.goto(url,{waitUntil:'networkidle'});if(!fallback)assert.equal(await page.locator('canvas').count(),1);return{context,page,errors}}
async function step(page,n){for(let left=n;left>0;left-=10){await page.evaluate(n=>window.__step(n),Math.min(left,10));await page.waitForTimeout(60)}}
async function advance(page,seconds){const frames=Math.floor(seconds*10+1e-8);await step(page,frames);const remaining=seconds*1000-frames*100;if(remaining>1e-6)await page.evaluate(ms=>window.__fraction(ms),remaining)}
const sceneHash=async page=>hash(await page.screenshot({timeout:60000,style:'.portfolio-shell > :not(.scene-layer),.portfolio-shell > :not(.scene-layer) *{visibility:hidden!important}'}))
async function assets(name,url){const html=await(await fetch(url)).text(),paths=['index.html',...[...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map(x=>x[1])];report.assets[name]=[];for(const path of paths){const bytes=Buffer.from(await(await fetch(new URL(path,url))).arrayBuffer()),expected=name==='baseline'?execFileSync('git',['show',`${base}:docs/${path}`],{cwd:root,maxBuffer:10_000_000}):readFileSync(resolve(root,'docs',path));assert.equal(hash(bytes),hash(expected));report.assets[name].push({path,bytes:bytes.length,sha256:hash(bytes)})}}

try{
 const url='http://127.0.0.1:4175/';await assets('candidate',url);const{page,context,errors}=await open(url,{width:390,height:844})
 await page.locator('[data-vessel-reset]').click();await page.locator('[data-motion-toggle]').click();await page.locator('[data-scanner-island="island-writing"]').click();await page.locator('[aria-label="Close portfolio drawer"]').click();await page.locator('[data-motion-toggle]').click()
 const brake=await page.locator('[data-vessel-control="brake"]').boundingBox();await page.mouse.move(brake.x+brake.width/2,brake.y+brake.height/2);await page.mouse.down();await step(page,1);await advance(page,.25)
 await page.screenshot({path:resolve(out,'browser-logbook-phone-risk.png'),timeout:60000});report.captures.push({path:'browser-logbook-phone-risk.png',sha256:hash(readFileSync(resolve(out,'browser-logbook-phone-risk.png'))),simulationSeconds:.25,framing:'Real reset,pause,Logbook instant scan,close,resume,Spill; normal production follow camera',viewport:{width:390,height:844}})
 assert.deepEqual(errors,[]);report.checks.push({consoleErrors:errors});report.verdict='pass';await context.close()
}catch(error){report.verdict='failed';report.error=String(error);throw error}finally{await browser.close();writeFileSync(resolve(out,'browser-logbook-risk.json'),JSON.stringify(report,null,2)+'\n')}
console.log(JSON.stringify({verdict:report.verdict,captures:report.captures.length}))
