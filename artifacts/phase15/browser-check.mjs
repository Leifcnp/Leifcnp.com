// Non-shipped production-browser fixture. No application source instrumentation.
// PLAYWRIGHT_BROWSERS_PATH=/tmp/web022-browsers node artifacts/phase15/browser-check.mjs
// Override PLAYWRIGHT_MODULE, BASELINE_URL, CANDIDATE_URL, OUTPUT_DIR, BROWSER_STAGE.
// FAST_SIMULATION=1 skips intermediate raster only; final frames always draw normally.
// CAPTURES_ONLY=1 CAPTURE_LAYOUTS=desktop,phone,wide CAPTURE_TIMES=23 selects active frames.
// SKIP_CAPTURES=1 BROWSER_STAGE=candidate runs only the functional suite.
// CAPTURE_STATE=shipyard-dock uses real pause/instant scanner/resume controls.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = process.env.PROJECT_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const output = process.env.OUTPUT_DIR ?? resolve(root, 'artifacts/phase15')
const modulePath = process.env.PLAYWRIGHT_MODULE ?? '/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs'
const { chromium } = await import(modulePath)
const sha = value => createHash('sha256').update(value).digest('hex')
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
const base = process.env.BASELINE_SHA ?? 'e92b7a9735a6ac15ccabaebf4520c5b72a00335c'
const stage = process.env.BROWSER_STAGE ?? 'all'
mkdirSync(output, { recursive: true })
const report = {
  generatedAt: new Date().toISOString(), headAtMeasurement: git('rev-parse', 'HEAD'), base,
  provenance: {
    browser: 'Bundled playwright-core pinned Chromium headless shell, installed under /tmp only; SwiftShader software renderer.',
    sourceBinding: 'sourceSha256 always hashes the candidate working source, including baseline-only runs. Baseline identity is proven separately by served HTML/JS/CSS byte hashes against the recorded base commit docs.',
    fixture: 'Production bundles, unmodified HTML/CSS/JS. Pre-load fixture replaces requestAnimationFrame with manually stepped callbacks. First frame t=0, subsequent frames at 100ms; app fixed-step simulation remains unchanged. All matched captures reset boat/time, apply brake by the real Spill control, then step the identical frame sequence. Fixed camera rig and unmodified normal scene framing.',
    hiddenTab: 'Fixture overrides document.hidden and dispatches visibilitychange to exercise actual application suspension/resume handler; this is not an OS/browser background-tab lifecycle claim.',
    intermediateRasterSuppressed: Boolean(process.env.FAST_SIMULATION),
    resizeCapture: 'After every functional resize, step the actual app render callback; wait 260ms for the 220ms drawer animation before layout measurements and captures. Canvas-only motion hashes hide HUD parents and all descendants to exclude hover/fade styling.',
    rasterWarmup: 'When FAST_SIMULATION=1, only intermediate WebGL draw calls are skipped by the fixture; every application simulation callback runs, and each batch final frame renders normally. Captured final frames use the real full-size production camera and renderer.',
    limits: 'Software-rendered VM evidence; no physical mobile GPU, browser diversity, heap allocation, prolonged GPU lifecycle, or live-publication claim. Console errors are asserted absent except deliberately denied WebGL fallback.',
  },
  sourceSha256: Object.fromEntries(['src/world/effects/createShorelineFoam.ts','src/world/createLandmarks.ts','src/world/createWaterWorld.ts'].map(path => [path, sha(readFileSync(resolve(root,path)))])),
  captures: [], checks: [], assets: {}, errors: [],
}
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
report.browser = browser.version()
async function fixture({ fallback = false, fastSimulation = false } = {}) {
  window.__qaDrawEnabled = true
  if(fastSimulation) for(const name of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']) { const original = WebGL2RenderingContext.prototype[name]; WebGL2RenderingContext.prototype[name]=function(...args) { if(window.__qaDrawEnabled) return original.apply(this,args) } }
  const callbacks = new Map(); let nextId = 1, now = 1000
  window.requestAnimationFrame = fn => { const id = nextId++; callbacks.set(id, fn); return id }
  window.cancelAnimationFrame = id => callbacks.delete(id)
  window.__qa = {
    frames: 0,
    step(count = 1) {
      for (let tick = 0; tick < count; tick++) {
        window.__qaDrawEnabled = !fastSimulation || tick === count - 1
        const pending = [...callbacks.values()]; callbacks.clear()
        for (const callback of pending) callback(now)
        now += 100; this.frames++
      }
      window.__qaDrawEnabled = true
      return { frames: this.frames, callbacks: callbacks.size }
    },
    visibility(hidden) { Object.defineProperty(document,'hidden',{ configurable: true, get: () => hidden }); document.dispatchEvent(new Event('visibilitychange')) },
  }
  if (fallback) {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function(type,...args) { return /webgl/.test(type) ? null : original.call(this,type,...args) }
  }
}
async function open(url, viewport, options = {}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: options.reduced ? 'reduce' : 'no-preference' })
  await context.addInitScript(fixture, {...options,fastSimulation:Boolean(process.env.FAST_SIMULATION)})
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(String(error)))
  page.on('console', event => { if(event.type() === 'error') errors.push(event.text()) })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.locator('[data-motion-toggle]').waitFor()
  await page.waitForTimeout(100)
  if (!options.fallback) assert.equal(await page.locator('canvas').count(), 1, `WebGL unavailable: ${errors}`)
  return { context, page, errors }
}
async function step(page, count) { let result; for(let left=count; left>0; left-=10) { result=await page.evaluate(n => window.__qa.step(n),Math.min(left,10)); await page.waitForTimeout(60) } return result }
async function canvasHash(page) { return sha(await page.screenshot({ timeout: 60000, style: '.portfolio-shell > :not(.scene-layer), .portfolio-shell > :not(.scene-layer) * { visibility: hidden !important; }' })) }
async function capture(page, path, metadata = {}) {
  await page.screenshot({ path: resolve(output,path), timeout: 60000 })
  report.captures.push({ path, sha256: sha(readFileSync(resolve(output,path))), ...metadata })
}
async function verifyAssets(name, url) {
  const html = await (await fetch(url)).text()
  const paths = ['index.html', ...[...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map(match => match[1])]
  report.assets[name] = []
  for (const path of paths) {
    const bytes = Buffer.from(await (await fetch(new URL(path,url))).arrayBuffer())
    let expected
    if (name === 'baseline') expected = execFileSync('git',['show',`${base}:docs/${path}`],{cwd:root,maxBuffer:10_000_000})
    else expected = readFileSync(resolve(root,'docs',path))
    assert.equal(sha(bytes),sha(expected),`${name} served asset differs: ${path}`)
    report.assets[name].push({ path, bytes:bytes.length, sha256:sha(bytes), matches:name === 'baseline' ? `${base}:docs/${path}` : `docs/${path}` })
  }
}
const layouts = { desktop:[1440,900], phone:[390,844], wide:[2560,1080], small:[320,568], tall:[360,915], landscape:[844,390] }
try {
  for (const name of ['baseline','candidate']) {
    if (stage !== 'all' && stage !== name) continue
    const url = name === 'baseline' ? process.env.BASELINE_URL ?? 'http://127.0.0.1:4173/' : process.env.CANDIDATE_URL ?? 'http://127.0.0.1:4174/'
    await verifyAssets(name,url)
    mkdirSync(resolve(output,`${name}-fresh`),{recursive:true})
    for (const layout of process.env.SKIP_CAPTURES ? [] : process.env.CAPTURE_LAYOUTS ? process.env.CAPTURE_LAYOUTS.split(',') : ['desktop','phone','wide']) {
      const [width,height] = layouts[layout]
      const {context,page,errors} = await open(url,{width,height})
      await page.locator('[data-vessel-reset]').click()
      if(process.env.CAPTURE_STATE==='shipyard-dock') {
        await page.locator('[data-motion-toggle]').click(); await page.locator('[data-scanner-island="island-projects"]').click(); await page.locator('[aria-label="Close portfolio drawer"]').click(); await page.locator('[data-motion-toggle]').click()
      }
      const captureLayout = layout + (process.env.CAPTURE_STATE==='shipyard-dock' ? '-dock' : '')
      const brake = await page.locator('[data-vessel-control="brake"]').boundingBox()
      await page.mouse.move(brake.x + brake.width/2, brake.y + brake.height/2); await page.mouse.down()
      await step(page,1)
      let prior = 0
      for (const seconds of process.env.CAPTURE_TIMES ? process.env.CAPTURE_TIMES.split(',').map(Number) : layout === 'desktop' ? [0,4,8,12] : [4]) {
        await step(page,(seconds-prior)*10); prior=seconds
        await capture(page,`${name}-fresh/${captureLayout}-t${seconds}.png`,{name,layout,viewport:{width,height},simulationTimeSeconds:seconds,captureState:process.env.CAPTURE_STATE ?? 'spawn',control:'Spill held; normal production camera'})
        if(layout==='desktop' && seconds===23) { const path=`${name}-fresh/shipyard-context-t23.png`; await page.screenshot({path:resolve(output,path),clip:{x:880,y:330,width:250,height:200},timeout:60000});report.captures.push({path,sha256:sha(readFileSync(resolve(output,path))),name,simulationTimeSeconds:23,note:'Unscaled screenshot clip, same normal camera; full frame is primary evidence.'}) }
      }
      assert.deepEqual(errors,[])
      report.checks.push({name,layout,matchedCapture:true,consoleErrors:errors})
      await context.close()
    }
    if (name !== 'candidate' || process.env.CAPTURES_ONLY) continue
    const { context,page,errors } = await open(url,{width:1440,height:900})
    await step(page,1); const still = await canvasHash(page)
    await step(page,10); assert.notEqual(await canvasHash(page),still); report.checks.push({motionChanges:true})
    await page.locator('[data-motion-toggle]').click()
    const paused = await canvasHash(page); await step(page,20); assert.equal(await canvasHash(page),paused)
    await page.locator('[data-motion-toggle]').click(); await step(page,11); assert.notEqual(await canvasHash(page),paused)
    report.checks.push({pauseStable:true,resumeChanges:true})
    await page.locator('[data-vessel-reset]').click(); const reset = await canvasHash(page); await capture(page,'candidate-fresh/reset-before.png'); const resetWind = await page.locator('[data-wind-direction]').innerText(); const resetLabels = await page.locator('[data-landmark-layer]').innerHTML()
    await page.keyboard.down('ArrowRight'); await step(page,30); await page.keyboard.up('ArrowRight'); assert.notEqual(await page.locator('[data-wind-direction]').innerText(),resetWind)
    assert.notEqual(await canvasHash(page),reset)
    await page.locator('[data-vessel-reset]').click(); const repeatedReset = await canvasHash(page); await capture(page,'candidate-fresh/reset-after.png'); assert.equal(await page.locator('[data-landmark-layer]').innerHTML(),resetLabels); assert.equal(repeatedReset,reset)
    report.checks.push({manualSteeringChanges:true,resetRestoresLandmarkProjection:true,resetCanvasByteIdentical:repeatedReset===reset})
    for (const id of ['island-resume','island-projects','island-writing','island-media']) {
      await page.locator(`[data-scanner-island="${id}"]`).click()
      assert.ok(await page.locator('.content-drawer').isVisible())
      await page.locator('[aria-label="Close portfolio drawer"]').click()
    }
    await page.locator('[data-vessel-reset]').click()
    await page.locator('[data-scanner-island="island-projects"]').click()
    await page.locator('[aria-label="Close portfolio drawer"]').click()
    let arrival = ''
    for(let batch=0;batch<40;batch++) {
      await step(page,10); arrival = await page.locator('.scanner-hud__status').innerText()
      if(/arriv|moored/i.test(arrival)) break
    }
    assert.match(arrival,/arriv|moored/i)
    await capture(page,'candidate-fresh/scanner-arrival.png',{arrival})
    await page.keyboard.down('ArrowRight'); await step(page,4); await page.keyboard.up('ArrowRight')
    report.checks.push({allScannerDrawers:true,shipyardArrival:arrival,manualHandoff:await page.locator('.scanner-hud__status').innerText()})
    await page.evaluate(()=>window.__qa.visibility(true)); const hidden=await canvasHash(page)
    await step(page,20); assert.equal(await canvasHash(page),hidden)
    await page.evaluate(()=>window.__qa.visibility(false)); await step(page,11); assert.notEqual(await canvasHash(page),hidden)
    report.checks.push({visibilityHandlerFrozen:true,visibilityHandlerResumes:true,syntheticVisibility:true})
    const gl = await page.evaluate(()=>{ const gl=document.querySelector('canvas').getContext('webgl2'); const ext=gl.getExtension('WEBGL_debug_renderer_info'); return { renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),version:gl.getParameter(gl.VERSION)} })
    report.renderer=gl
    for (const [layout,[width,height]] of Object.entries(layouts)) {
      await page.setViewportSize({width,height}); await page.waitForTimeout(60); await step(page,1)
      await page.locator('[data-scanner-island="island-projects"]').click(); await page.waitForTimeout(260); await step(page,1)
      const fit=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,drawer:document.querySelector('.content-drawer').getBoundingClientRect().toJSON(),scanner:[...document.querySelectorAll('[data-scanner-island]')].map(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))}))
      assert.ok(fit.scroll<=width); assert.ok(fit.drawer.left>=-1 && fit.drawer.right<=width+1 && fit.drawer.top>=-1 && fit.drawer.bottom<=height+1)
      assert.ok(fit.scanner.every(rect=>rect.width>=44 && rect.height>=44))
      await capture(page,`candidate-fresh/${layout}-drawer.png`,{layout,viewport:{width,height}})
      report.checks.push({layout,drawerFits:true,noHorizontalOverflow:true,scannerTargetsAtLeast44px:true,measurements:fit})
      await page.locator('[aria-label="Close portfolio drawer"]').click()
    }
    await page.emulateMedia({reducedMotion:'reduce'}); await page.waitForFunction(() => document.querySelector('[data-motion-toggle]').getAttribute('aria-pressed') === 'true', null, {polling:100}); await step(page,3); await page.waitForTimeout(200)
    assert.equal(await page.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'true')
    const reduced=await canvasHash(page); await step(page,20); assert.equal(await canvasHash(page),reduced)
    await page.locator('[data-scanner-island="island-projects"]').click()
    assert.match(await page.locator('.scanner-hud__status').innerText(),/arriv|moored/i)
    assert.ok(await page.locator('.content-drawer').isVisible())
    await capture(page,'candidate-fresh/reduced-motion.png')
    report.checks.push({reducedMotionPauses:true,reducedMotionScannerInstantArrival:true,reducedDrawerUsable:true})
    assert.deepEqual(errors,[]); report.checks.push({consoleErrors:errors})
    await context.close()
    const reducedInitial=await open(url,{width:390,height:844},{reduced:true})
    assert.equal(await reducedInitial.page.locator('[data-motion-toggle]').getAttribute('aria-pressed'),'true')
    const initialReducedHash=await canvasHash(reducedInitial.page); await step(reducedInitial.page,30); assert.equal(await canvasHash(reducedInitial.page),initialReducedHash)
    report.checks.push({initialReducedMotionStatic:true}); assert.deepEqual(reducedInitial.errors,[]); await reducedInitial.context.close()
    const fallback=await open(url,{width:390,height:844},{fallback:true})
    assert.ok(await fallback.page.locator('[data-webgl-fallback]').isVisible()); assert.ok(await fallback.page.locator('[data-motion-toggle]').isDisabled())
    for(const id of ['island-resume','island-projects','island-writing','island-media']) {
      await fallback.page.locator(`[data-scanner-island="${id}"]`).click(); assert.ok(await fallback.page.locator('.content-drawer').isVisible())
    }
    await capture(fallback.page,'candidate-fresh/webgl-fallback.png')
    assert.ok(fallback.errors.every(error => /Error creating WebGL context/.test(error)),JSON.stringify(fallback.errors))
    report.checks.push({webglFallbackReadable:true,fallbackAllScannerCategories:true,expectedFallbackConsole:fallback.errors})
    await fallback.context.close()
  }
  report.verdict='pass'
} catch(error) { report.verdict='failed';report.errors.push(String(error)); throw error }
finally {
  await browser.close()
  writeFileSync(resolve(output,process.env.REPORT_NAME ?? `browser-checks${stage==='all'?'':`-${stage}`}.json`),JSON.stringify(report,null,2)+'\n')
}
console.log(JSON.stringify({verdict:report.verdict,captures:report.captures.length,checks:report.checks.length,browser:report.browser,renderer:report.renderer}))
