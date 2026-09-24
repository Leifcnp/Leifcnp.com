import { createWaterWorld } from './world/createWaterWorld'
import './styles.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('The app mount point is missing.')
}

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
let isPaused = reducedMotionQuery.matches

app.innerHTML = `
  <main class="portfolio-shell">
    <div class="scene-layer" data-scene-layer aria-hidden="true"></div>
    <header class="hud" aria-label="Portfolio introduction">
      <div class="hud__identity">
        <p class="hud__label">Phase 01 · Open water</p>
        <h1 class="hud__title">Open water</h1>
        <p class="hud__name">Leif Pedersen</p>
      </div>
      <div class="hud__control">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false">
          Pause motion
        </button>
      </div>
    </header>
    <p class="webgl-fallback is-hidden" data-webgl-fallback role="status">
      This water scene needs WebGL to come alive. Try a browser with hardware acceleration enabled.
    </p>
  </main>
`

const sceneLayer = document.querySelector<HTMLDivElement>('[data-scene-layer]')
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]')
const fallback = document.querySelector<HTMLParagraphElement>('[data-webgl-fallback]')

if (!sceneLayer || !motionToggle || !fallback) {
  throw new Error('The portfolio shell is incomplete.')
}

let waterWorld: ReturnType<typeof createWaterWorld> | undefined

const updateMotionButton = () => {
  motionToggle.textContent = isPaused ? 'Resume motion' : 'Pause motion'
  motionToggle.setAttribute('aria-pressed', String(isPaused))
}

try {
  waterWorld = createWaterWorld(sceneLayer, { reducedMotion: reducedMotionQuery.matches })
  waterWorld.setPaused(isPaused)
} catch (error) {
  console.warn('Unable to initialise the water scene.', error)
  fallback.classList.remove('is-hidden')
  motionToggle.disabled = true
}

const onMotionToggle = () => {
  isPaused = !isPaused
  waterWorld?.setPaused(isPaused)
  updateMotionButton()
}

motionToggle.addEventListener('click', onMotionToggle)

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'p' && event.target === document.body) {
    motionToggle.click()
  }
}

window.addEventListener('keydown', onKeyDown)

const onReducedMotionChange = (event: MediaQueryListEvent) => {
  if (event.matches) {
    isPaused = true
    waterWorld?.setPaused(true)
    updateMotionButton()
  }
}

reducedMotionQuery.addEventListener('change', onReducedMotionChange)

const onPageHide = (event: PageTransitionEvent) => {
  // Keep the renderer alive for back/forward-cache restores.
  if (!event.persisted) waterWorld?.dispose()
}

window.addEventListener('pagehide', onPageHide)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    waterWorld?.dispose()
    motionToggle.removeEventListener('click', onMotionToggle)
    window.removeEventListener('keydown', onKeyDown)
    reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    window.removeEventListener('pagehide', onPageHide)
  })
}

updateMotionButton()
