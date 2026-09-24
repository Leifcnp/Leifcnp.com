import { portfolioContent } from './content/portfolio'
import { portfolioIslands, validateIslandDefinitions } from './content/islands'
import { VesselInputController } from './controls/vesselInput'
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
        <h1 class="site-header__title">Under way</h1>
        <p class="site-header__subtitle">A portfolio in motion</p>
      </div>
      <div class="site-header__control">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false">
          Pause motion
        </button>
      </div>
    </header>

    <div class="landmark-layer" data-landmark-layer role="list" aria-label="Island landmarks"></div>

    <aside class="vessel-model-note" aria-label="Boat orientation">
      <span class="vessel-model-note__swatch" aria-hidden="true"></span>
      <span>Coral end is the bow.</span>
    </aside>

    <section class="helm-panel" data-vessel-controls aria-label="Boat controls">
      <div class="helm-panel__heading">
        <p class="helm-panel__eyebrow">Helm</p>
        <p class="helm-panel__hint">
          <span class="helm-panel__hint-keyboard">WASD or arrows to steer · Space to brake</span>
          <span class="helm-panel__hint-touch">Hold to sail · Combine forward + turn</span>
        </p>
      </div>
      <div class="helm-controls" role="group" aria-label="Steering controls">
        <button class="helm-button helm-button--turn-left" type="button" data-vessel-control="left" aria-label="Turn left">
          <span aria-hidden="true">↶</span><span>Left</span>
        </button>
        <button class="helm-button helm-button--forward" type="button" data-vessel-control="forward" aria-label="Forward">
          <span aria-hidden="true">↑</span><span>Forward</span>
        </button>
        <button class="helm-button helm-button--reverse" type="button" data-vessel-control="reverse" aria-label="Reverse">
          <span aria-hidden="true">↓</span><span>Reverse</span>
        </button>
        <button class="helm-button helm-button--turn-right" type="button" data-vessel-control="right" aria-label="Turn right">
          <span aria-hidden="true">↷</span><span>Right</span>
        </button>
        <button class="helm-button helm-button--brake" type="button" data-vessel-control="brake" aria-label="Brake">
          <span aria-hidden="true">■</span><span>Brake</span>
        </button>
        <button class="helm-button helm-button--reset" type="button" data-vessel-reset aria-label="Reset boat">
          <span aria-hidden="true">↺</span><span>Reset boat</span>
        </button>
      </div>
    </section>

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
const helmPanel = document.querySelector<HTMLElement>('[data-vessel-controls]')
const vesselModelNote = document.querySelector<HTMLElement>('.vessel-model-note')
const fallback = document.querySelector<HTMLElement>('[data-webgl-fallback]')
const islandSummary = document.querySelector<HTMLUListElement>('[data-island-summary]')

if (!sceneLayer || !landmarkLayer || !motionToggle || !helmPanel || !fallback || !islandSummary) {
  throw new Error('The portfolio shell is incomplete.')
}

// Keep the serializable island contract honest before handing it to either
// the renderer or the readable fallback.
validateIslandDefinitions(portfolioIslands, portfolioContent)

const labels = new Map<string, HTMLDivElement>()
const labelSizes = new Map<string, { width: number; height: number }>()
const viewport = { width: window.innerWidth, height: window.innerHeight }
const labelResizeObserver = typeof ResizeObserver !== 'undefined'
  ? new ResizeObserver((entries) => {
      for (const entry of entries) {
        const label = entry.target as HTMLDivElement
        const id = label.dataset.landmarkId
        if (!id) continue
        const borderBox = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize
        const width = borderBox?.inlineSize ?? entry.contentRect.width
        const height = borderBox?.blockSize ?? entry.contentRect.height
        if (width <= 0 || height <= 0) continue
        labelSizes.set(id, {
          width,
          height,
        })
      }
    })
  : null

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
  labelSizes.set(island.id, { width: 120, height: 40 })
  labelResizeObserver?.observe(label)

  const summaryItem = document.createElement('li')
  summaryItem.textContent = `${island.name} — ${formatCategory(island.category)}`
  islandSummary.append(summaryItem)
}

let waterWorld: ReturnType<typeof createWaterWorld> | undefined

const updateMotionButton = () => {
  motionToggle.textContent = isPaused ? 'Resume motion' : 'Pause motion'
  motionToggle.setAttribute('aria-pressed', String(isPaused))
  helmPanel.setAttribute('aria-disabled', String(!waterWorld))
}

const vesselInput = new VesselInputController({
  root: helmPanel,
  onInput: (input) => waterWorld?.setInput(input),
  onReset: () => waterWorld?.resetVessel(),
})

const updateLandmarkLabels = (
  projections: readonly { id: string; x: number; y: number; visible: boolean }[],
) => {
  for (const [id, label] of labels) {
    const projection = projections.find((candidate) => candidate.id === id)
    if (!projection || !projection.visible || !canPlaceLabel(projection, labelSizes.get(id))) {
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

function canPlaceLabel(
  projection: { readonly x: number; readonly y: number },
  size: { readonly width: number; readonly height: number } | undefined,
): boolean {
  const width = size?.width ?? 120
  const height = size?.height ?? 40
  const left = projection.x - width * 0.5
  const top = projection.y + 8
  const right = left + width
  const bottom = top + height
  const margin = Math.min(48, Math.max(16, viewport.width * 0.04))
  const headerBottom = viewport.height <= 460 ? 112 : viewport.width <= 600 ? 140 : 160
  const helmBottom = viewport.height <= 460 ? 105 : 155
  const helmLeft = viewport.width <= 540
    ? margin
    : Math.max(margin, viewport.width - margin - Math.min(480, viewport.width - margin * 2))

  if (left < margin || right > viewport.width - margin || top < headerBottom || bottom > viewport.height - helmBottom) {
    return false
  }

  // The camera keeps the tracked vessel near the viewport centre. Leave a
  // small clear patch so a label cannot sit over the boat as it sails by.
  const boatHalfSize = 32
  const boatLeft = viewport.width * 0.5 - boatHalfSize
  const boatTop = viewport.height * 0.5 - boatHalfSize
  const boatRight = viewport.width * 0.5 + boatHalfSize
  const boatBottom = viewport.height * 0.5 + boatHalfSize
  const overlapsBoat = left < boatRight && right > boatLeft && top < boatBottom && bottom > boatTop
  if (overlapsBoat) return false

  // Keep the explicit helm rectangle in the arithmetic even where the
  // bottom inset already covers it; this preserves the no-overlap contract
  // if the panel is shortened for a future viewport variant.
  const helmTop = viewport.height - helmBottom
  return !(left < viewport.width - margin && right > helmLeft && top < viewport.height && bottom > helmTop)
}

const onViewportResize = () => {
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
}

window.addEventListener('resize', onViewportResize)

try {
  waterWorld = createWaterWorld(sceneLayer, {
    reducedMotion: reducedMotionQuery.matches,
    islands: portfolioIslands,
    // Reserve the static header and helm panel without measuring either on
    // every frame. The world also uses these insets when fitting the camera.
    framingInsets: { top: 145, right: 20, bottom: 155, left: 20 },
    onLandmarkProjection: updateLandmarkLabels,
  })
  waterWorld.setPaused(isPaused)
  vesselInput.setEnabled(!isPaused, Boolean(waterWorld))
} catch (error) {
  console.warn('Unable to initialise the water scene.', error)
  landmarkLayer.hidden = true
  fallback.classList.remove('is-hidden')
  motionToggle.disabled = true
  vesselInput.setEnabled(false, false)
  helmPanel.hidden = true
  if (vesselModelNote) vesselModelNote.hidden = true
}

const onMotionToggle = () => {
  isPaused = !isPaused
  vesselInput.setEnabled(!isPaused && Boolean(waterWorld), Boolean(waterWorld))
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
    vesselInput.setEnabled(false, Boolean(waterWorld))
    waterWorld?.setPaused(true)
    updateMotionButton()
  }
}

reducedMotionQuery.addEventListener('change', onReducedMotionChange)

const onPageHide = (event: PageTransitionEvent) => {
  vesselInput.releaseAll()
  // Keep the renderer alive for back/forward-cache restores.
  if (!event.persisted) {
    vesselInput.dispose()
    waterWorld?.dispose()
    labelResizeObserver?.disconnect()
    window.removeEventListener('resize', onViewportResize)
  }
}

window.addEventListener('pagehide', onPageHide)

const onPageShow = () => {
  if (waterWorld) vesselInput.setEnabled(!isPaused, true)
}

window.addEventListener('pageshow', onPageShow)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    waterWorld?.dispose()
    vesselInput.dispose()
    motionToggle.removeEventListener('click', onMotionToggle)
    window.removeEventListener('keydown', onKeyDown)
    reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    window.removeEventListener('pagehide', onPageHide)
    window.removeEventListener('pageshow', onPageShow)
    window.removeEventListener('resize', onViewportResize)
    labelResizeObserver?.disconnect()
  })
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

updateMotionButton()
