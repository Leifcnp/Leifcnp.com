// Production QA: PLAYWRIGHT_BROWSERS_PATH=/tmp/web022-browsers ACTIVE_TIME=11.75 QUIET_TIME=8.25 node artifacts/phase15-rollout/browser-check.mjs
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
const urls={baseline:process.env.BASELINE_URL??'http://127.0.0.1:4174/',candidate:process.env.CANDIDATE_URL??'http://127.0.0.1:4175/'}
try{
 for(const [name,url]of Object.entries(urls)){
  await assets(name,url)
  for(const [layout,viewport]of Object.entries({desktop:{width:1440,height:900},phone:{width:390,height:844}})){
   const{page,context,errors}=await open(url,viewport);await page.locator('[data-vessel-reset]').click()
   if(layout==='phone'){await page.locator('[data-motion-toggle]').click();await page.locator('[data-scanner-island="island-resume"]').click();await page.locator('[aria-label="Close portfolio drawer"]').click();await page.locator('[data-motion-toggle]').click()}
   const brake=await page.locator('[data-vessel-control="brake"]').boundingBox();await page.mouse.move(brake.x+brake.width/2,brake.y+brake.height/2);await page.mouse.down();await step(page,1);let previous=0
   for(const[phase,time]of [['active',active],['quiet',quiet]].sort((a,b)=>a[1]-b[1])){await advance(page,time-previous);previous=time;const path=`${name}-${layout}-${phase}.png`;await page.screenshot({path:resolve(out,path),timeout:60000});report.captures.push({path,sha256:hash(readFileSync(resolve(out,path))),name,layout,viewport,phase,simulationSeconds:time,framing:layout==='phone'?'Real Chartroom instant scanner/follow camera':'Reset spawn normal camera'})}
   if(name==='candidate'&&layout==='desktop'){await page.mouse.up();await page.locator('[data-vessel-reset]').click();await step(page,1);await advance(page,.25);await page.screenshot({path:resolve(out,'browser-logbook-desktop-risk.png'),clip:{x:280,y:370,width:280,height:230},timeout:60000});report.checks.push({normalCameraLogbookRiskInspection:{simulationSeconds:.25,path:'browser-logbook-desktop-risk.png',sha256:hash(readFileSync(resolve(out,'browser-logbook-desktop-risk.png'))),note:'Unscaled screenshot clip of real normal-camera rendering; visual judgment recorded at handoff.'}})}
   assert.deepEqual(errors,[]);await context.close()
  }
 }
 const{page,context,errors}=await open(urls.candidate,{width:1440,height:900});await step(page,1);const initial=await sceneHash(page);await step(page,10);assert.notEqual(await sceneHash(page),initial)
 await page.locator('[data-motion-toggle]').click();const paused=await sceneHash(page);await step(page,20);assert.equal(await sceneHash(page),paused);await page.locator('[data-motion-toggle]').click();await step(page,11);assert.notEqual(await sceneHash(page),paused);report.checks.push({motion:true,pauseFrozen:true,resume:true})
 await page.locator('[data-vessel-reset]').click();const reset=await sceneHash(page);await page.mouse.click(200,300);await page.keyboard.down('w');assert.equal(await page.locator('[data-vessel-control="up"]').getAttribute('aria-pressed'),'true');await step(page,25);await page.keyboard.up('w');await page.locator('[data-vessel-reset]').click();assert.equal(await sceneHash(page),reset);report.checks.push({trustedW:true,resetSceneRepeats:true})
 for(const[id,name]of [['island-resume','Chartroom'],['island-writing','Logbook'],['island-media','Signal Cove']]){
  await page.locator('[data-vessel-reset]').click();await page.locator(`[data-scanner-island="${id}"]`).click();assert.ok(await page.locator('.content-drawer').isVisible());await page.locator('[aria-label="Close portfolio drawer"]').click();let status='',ticks=0
  for(;ticks<400;ticks+=10){await step(page,10);status=await page.locator('.scanner-hud__status').innerText();if(status===`Arrived at ${name}`)break}
  assert.equal(status,`Arrived at ${name}`);assert.ok(await page.locator('[data-explore-action]').isVisible());assert.match(await page.locator('.explore-prompt__text').innerText(),new RegExp(name));report.checks.push({actualScannerArrival:name,steppedSeconds:(ticks+10)/10,nearbyExplorePrompt:true})
 }
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(80);await step(page,1);await page.locator('[data-scanner-island="island-media"]').click();await page.waitForTimeout(260);await step(page,1)
 const fit=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,height:innerHeight,drawer:document.querySelector('.content-drawer').getBoundingClientRect().toJSON(),buttons:[...document.querySelectorAll('[data-scanner-island]')].map(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))}))
 assert.ok(fit.scroll<=fit.width&&fit.drawer.left>=0&&fit.drawer.right<=fit.width&&fit.drawer.bottom<=fit.height&&fit.buttons.every(b=>b.width>=44&&b.height>=44));report.checks.push({phoneResizeAndDrawer:true,measurements:fit});await page.locator('[aria-label="Close portfolio drawer"]').click()
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('[data-motion-toggle]').getAttribute('aria-pressed')==='true',null,{polling:100});await page.waitForTimeout(100);const reduced=await sceneHash(page);await step(page,20);assert.equal(await sceneHash(page),reduced)
 for(const id of ['island-resume','island-projects','island-writing','island-media']){await page.locator(`[data-scanner-island="${id}"]`).click();assert.match(await page.locator('.scanner-hud__status').innerText(),/^Arrived at /);assert.ok(await page.locator('.content-drawer').isVisible());await page.locator('[aria-label="Close portfolio drawer"]').click()}
 report.checks.push({reducedMotionFrozen:true,allReducedScannerArrivals:true});assert.deepEqual(errors,[]);report.checks.push({consoleErrors:errors});await context.close()
 const fallback=await open(urls.candidate,{width:390,height:844},true);assert.ok(await fallback.page.locator('[data-webgl-fallback]').isVisible());for(const id of ['island-resume','island-projects','island-writing','island-media']){await fallback.page.locator(`[data-scanner-island="${id}"]`).click();assert.ok(await fallback.page.locator('.content-drawer').isVisible())}assert.ok(fallback.errors.every(e=>/Error creating WebGL context/.test(e)));report.checks.push({fallbackAllCategories:true,expectedFallbackErrors:fallback.errors});await fallback.context.close();report.verdict='pass'
}catch(error){report.verdict='failed';report.error=String(error);throw error}finally{await browser.close();writeFileSync(resolve(out,'browser-checks.json'),JSON.stringify(report,null,2)+'\n')}
console.log(JSON.stringify({verdict:report.verdict,captures:report.captures.length,checks:report.checks.length,browser:report.browser}))
