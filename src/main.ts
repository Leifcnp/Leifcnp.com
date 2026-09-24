import { portfolioContent } from './content/portfolio'
import { portfolioIslands, validateIslandDefinitions } from './content/islands'
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

    <header class="site-header" aria-label="Portfolio introduction">
      <div class="site-header__identity">
        <p class="site-header__label">Leif Pedersen</p>
        <h1 class="site-header__title">First landfall</h1>
      </div>
      <div class="site-header__control">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false">
          Pause motion
        </button>
      </div>
    </header>

    <div class="landmark-layer" data-landmark-layer role="list" aria-label="Island landmarks"></div>

    <footer class="scene-legend" aria-label="Map legend">
      <p class="scene-legend__title">Four islands. Room to explore.</p>
      <p class="scene-legend__key"><span class="scene-legend__ring" aria-hidden="true"></span> Ring marks a docking area</p>
    </footer>

    <section class="webgl-fallback is-hidden" data-webgl-fallback aria-live="polite">
      <p class="webgl-fallback__label">Island guide</p>
      <p>This browser cannot display the water animation. The island guide is still available here.</p>
      <ul class="island-summary" data-island-summary></ul>
    </section>
  </main>
`

const sceneLayer = document.querySelector<HTMLDivElement>('[data-scene-layer]')
const landmarkLayer = document.querySelector<HTMLDivElement>('[data-landmark-layer]')
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]')
const fallback = document.querySelector<HTMLElement>('[data-webgl-fallback]')
const islandSummary = document.querySelector<HTMLUListElement>('[data-island-summary]')

if (!sceneLayer || !landmarkLayer || !motionToggle || !fallback || !islandSummary) {
  throw new Error('The portfolio shell is incomplete.')
}

// Keep the serializable island contract honest before handing it to either
// the renderer or the readable fallback.
validateIslandDefinitions(portfolioIslands, portfolioContent)

const labels = new Map<string, HTMLDivElement>()

for (const [index, island] of portfolioIslands.entries()) {
  const label = document.createElement('div')
  label.className = 'landmark-label'
  label.dataset.landmarkId = island.id
  label.setAttribute('role', 'listitem')
  label.innerHTML = `
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `
  const name = label.querySelector<HTMLSpanElement>('.landmark-label__name')
  const category = label.querySelector<HTMLSpanElement>('.landmark-label__category')
  if (!name || !category) throw new Error('The landmark label is incomplete.')

  name.textContent = island.name
  category.textContent = `${formatCategory(island.category)} · ${String(index + 1).padStart(2, '0')}`
  landmarkLayer.append(label)
  labels.set(island.id, label)

  const summaryItem = document.createElement('li')
  summaryItem.textContent = `${island.name} — ${formatCategory(island.category)}`
  islandSummary.append(summaryItem)
}

let waterWorld: ReturnType<typeof createWaterWorld> | undefined

const updateMotionButton = () => {
  motionToggle.textContent = isPaused ? 'Resume motion' : 'Pause motion'
  motionToggle.setAttribute('aria-pressed', String(isPaused))
}

const updateLandmarkLabels = (
  projections: readonly { id: string; x: number; y: number; visible: boolean }[],
) => {
  for (const [id, label] of labels) {
    const projection = projections.find((candidate) => candidate.id === id)
    if (!projection || !projection.visible) {
      label.hidden = true
      continue
    }
    label.hidden = false
    // The world anchor is at the camera-facing foot of the landform. Place
    // the card just below it so the island remains visible, with the CSS
    // leader pointing back up to the anchor.
    label.style.transform = `translate3d(${projection.x}px, ${projection.y}px, 0) translate(-50%, 8px)`
  }
}

try {
  waterWorld = createWaterWorld(sceneLayer, {
    reducedMotion: reducedMotionQuery.matches,
    islands: portfolioIslands,
    onLandmarkProjection: updateLandmarkLabels,
  })
  waterWorld.setPaused(isPaused)
} catch (error) {
  console.warn('Unable to initialise the water scene.', error)
  landmarkLayer.hidden = true
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

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

updateMotionButton()
