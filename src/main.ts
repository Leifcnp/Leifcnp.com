import { portfolioContent } from './content/portfolio'
import { portfolioIslands, validateIslandDefinitions } from './content/islands'
import { VesselInputController } from './controls/vesselInput'
import { getProximityState } from './interaction/proximity'
import { createPortfolioHud } from './ui/hud'
import { createWaterWorld, type SailingTelemetry } from './world/createWaterWorld'
import { createWindRush } from './audio/createWindRush'
import './styles.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('The app mount point is missing.')
}

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
let isPaused = reducedMotionQuery.matches
const windRush = createWindRush()
let soundEnabled = false
let soundAvailable = true
let soundRequestSerial = 0

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

    <aside class="vessel-model-note" aria-label="Visible sail trim">
      <span class="vessel-model-note__swatch" aria-hidden="true"></span>
      <span>Coral boom shows trim. Pennants trail downwind.</span>
    </aside>

    <section class="sailing-hud" data-sailing-hud aria-label="Wind and sail trim">
      <div class="sailing-hud__dial" aria-hidden="true"><span class="sailing-hud__bow"></span><span data-wind-marker>•</span></div>
      <div class="sailing-hud__readout">
        <p class="sailing-hud__eyebrow">Wind from <span data-wind-direction>ahead</span> · <span data-wind-speed>9 m/s</span></p>
        <p class="sailing-hud__trim"><span data-trim-mode>Auto</span> · Main <span data-sail-angle> eased</span> · Aim <span data-suggested-trim>beam reach</span></p>
        <p class="sailing-hud__efficiency">Trim <span class="sailing-hud__meter" aria-hidden="true"><span data-trim-meter></span></span> <span data-trim-efficiency>0%</span><span data-trim-sweetspot> </span></p>
        <p class="sailing-hud__guidance" data-sailing-guidance>Auto trim ready. WASD or arrows to set sail.</p>
      </div>
    </section>

    <section class="helm-panel" data-vessel-controls aria-label="Sailing controls">
      <div class="helm-panel__heading">
        <p class="helm-panel__eyebrow">Helm</p>
        <p class="helm-panel__hint">
          <span class="helm-panel__hint-keyboard">WASD / arrows steer · Q/E trim · M auto</span>
          <span class="helm-panel__hint-touch">Steer · trim · auto · spill</span>
        </p>
      </div>
      <div class="helm-controls" role="group" aria-label="Steering controls">
        <button class="helm-button helm-button--direction-up" type="button" data-vessel-control="up" aria-label="Sail up">
          <span aria-hidden="true">↑</span><span>Up</span>
        </button>
        <button class="helm-button helm-button--direction-left" type="button" data-vessel-control="left" aria-label="Sail left">
          <span aria-hidden="true">←</span><span>Left</span>
        </button>
        <button class="helm-button helm-button--direction-down" type="button" data-vessel-control="down" aria-label="Sail down">
          <span aria-hidden="true">↓</span><span>Down</span>
        </button>
        <button class="helm-button helm-button--direction-right" type="button" data-vessel-control="right" aria-label="Sail right">
          <span aria-hidden="true">→</span><span>Right</span>
        </button>
        <button class="helm-button helm-button--trim-in" type="button" data-vessel-control="trimIn" aria-label="Trim sail in">
          <span aria-hidden="true">↗</span><span>Trim in</span>
        </button>
        <button class="helm-button helm-button--trim-out" type="button" data-vessel-control="trimOut" aria-label="Ease sail out">
          <span aria-hidden="true">↘</span><span>Ease out</span>
        </button>
        <button class="helm-button helm-button--auto-trim" type="button" data-vessel-auto-trim aria-label="Return to auto trim">
          <span aria-hidden="true">A</span><span>Auto trim</span>
        </button>
        <button class="helm-button helm-button--brake" type="button" data-vessel-control="brake" aria-label="Spill wind">
          <span aria-hidden="true">■</span><span>Spill</span>
        </button>
        <button class="helm-button helm-button--reset" type="button" data-vessel-reset aria-label="Reset boat">
          <span aria-hidden="true">↺</span><span>Reset boat</span>
        </button>
        <button class="helm-button helm-button--sound" type="button" data-sound-toggle aria-pressed="false" aria-label="Sound off">
          <span aria-hidden="true">♪</span><span>Sound off</span>
        </button>
      </div>
    </section>

    <footer class="scene-legend" aria-label="Map legend">
      <p class="scene-legend__title">Four islands. Room to explore.</p>
      <p class="scene-legend__key"><span class="scene-legend__ring" aria-hidden="true"></span> Ring marks a docking area</p>
    </footer>

    <section class="webgl-fallback is-hidden" data-webgl-fallback aria-live="polite">
      <p class="webgl-fallback__label">Island guide</p>
      <p>The 3D water is unavailable in this browser. Use the category buttons above to explore the full portfolio.</p>
      <ul class="island-summary" data-island-summary></ul>
    </section>
  </main>
`

const sceneLayer = document.querySelector<HTMLDivElement>('[data-scene-layer]')
const landmarkLayer = document.querySelector<HTMLDivElement>('[data-landmark-layer]')
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]')
const helmPanel = document.querySelector<HTMLElement>('[data-vessel-controls]')
const sailingHud = document.querySelector<HTMLElement>('[data-sailing-hud]')
const windMarker = document.querySelector<HTMLElement>('[data-wind-marker]')
const windDirection = document.querySelector<HTMLElement>('[data-wind-direction]')
const windSpeed = document.querySelector<HTMLElement>('[data-wind-speed]')
const sailAngle = document.querySelector<HTMLElement>('[data-sail-angle]')
const suggestedTrim = document.querySelector<HTMLElement>('[data-suggested-trim]')
const trimMode = document.querySelector<HTMLElement>('[data-trim-mode]')
const trimMeter = document.querySelector<HTMLElement>('[data-trim-meter]')
const trimEfficiency = document.querySelector<HTMLElement>('[data-trim-efficiency]')
const trimSweetspot = document.querySelector<HTMLElement>('[data-trim-sweetspot]')
const soundToggle = document.querySelector<HTMLButtonElement>('[data-sound-toggle]')
const sailingGuidance = document.querySelector<HTMLElement>('[data-sailing-guidance]')
const vesselModelNote = document.querySelector<HTMLElement>('.vessel-model-note')
const fallback = document.querySelector<HTMLElement>('[data-webgl-fallback]')
const islandSummary = document.querySelector<HTMLUListElement>('[data-island-summary]')
const shell = document.querySelector<HTMLElement>('.portfolio-shell')

if (!sceneLayer || !landmarkLayer || !motionToggle || !helmPanel || !sailingHud || !windMarker || !windDirection || !windSpeed || !sailAngle || !suggestedTrim || !trimMode || !trimMeter || !trimEfficiency || !trimSweetspot || !soundToggle || !sailingGuidance || !fallback || !islandSummary || !shell) {
  throw new Error('The portfolio shell is incomplete.')
}

// Keep the serializable island contract honest before handing it to either
// the renderer or the readable fallback.
validateIslandDefinitions(portfolioIslands, portfolioContent)

let waterWorld: ReturnType<typeof createWaterWorld> | undefined
let previousProximityId: string | null = null

const hud = createPortfolioHud({
  root: shell,
  islands: portfolioIslands,
  content: portfolioContent,
  onScanRequest: (islandId) => {
    vesselInput.releaseAll()
    waterWorld?.startScan(islandId, {
      instant: isPaused || reducedMotionQuery.matches,
    })
  },
  onExploreRequest: () => {
    // Nearby exploration opens content without taking control away from the
    // helm. Persistent scanner buttons own automatic travel.
    vesselInput.releaseAll()
  },
})

const labels = new Map<string, HTMLDivElement>()
const labelSizes = new Map<string, { width: number; height: number }>()
const viewport = { width: window.innerWidth, height: window.innerHeight }
let sailingHudBounds = sailingHud.getBoundingClientRect()
const sailingHudObserver = typeof ResizeObserver !== 'undefined'
  ? new ResizeObserver(() => { sailingHudBounds = sailingHud.getBoundingClientRect() })
  : null
sailingHudObserver?.observe(sailingHud)
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

const updateMotionButton = () => {
  motionToggle.textContent = isPaused ? 'Resume motion' : 'Pause motion'
  motionToggle.setAttribute('aria-pressed', String(isPaused))
  helmPanel.setAttribute('aria-disabled', String(!waterWorld))
}

function updateSailingHud(snapshot: SailingTelemetry): void {
  if (!windMarker || !windDirection || !windSpeed || !sailAngle || !suggestedTrim || !trimMode || !trimMeter || !trimEfficiency || !trimSweetspot || !sailingHud || !sailingGuidance) return
  const degrees = (radians: number): number => Math.round(Math.abs(radians) * 180 / Math.PI)
  const markerRadius = 14
  const markerX = -Math.sin(snapshot.relativeWindAngle) * markerRadius
  const markerY = -Math.cos(snapshot.relativeWindAngle) * markerRadius
  windMarker.style.transform = `translate(calc(-50% + ${markerX}px), calc(-50% + ${markerY}px))`
  windDirection.textContent = directionLabel(snapshot.relativeWindAngle)
  windSpeed.textContent = `${snapshot.windSpeed.toFixed(0)} m/s`
  sailingHud.setAttribute('aria-label', `Wind from ${directionLabel(snapshot.relativeWindAngle)}, ${snapshot.windSpeed.toFixed(0)} metres per second. Sail angle ${degrees(snapshot.sailAngle)} degrees; suggested ${degrees(snapshot.suggestedAngle)} degrees.`)
  sailAngle.textContent = `${degrees(snapshot.sailAngle)}°`
  suggestedTrim.textContent = `${degrees(snapshot.suggestedAngle)}°`
  trimMode.textContent = snapshot.trimMode === 'manual' ? 'Manual' : 'Auto'
  trimMeter.style.width = `${Math.round(Math.max(0, Math.min(1, snapshot.trimEfficiency)) * 100)}%`
  trimEfficiency.textContent = `${Math.round(snapshot.trimEfficiency * 100)}%`
  trimSweetspot.textContent = snapshot.sweetSpot ? ' · Sweet spot' : ''
  sailingHud.toggleAttribute('data-manual-trim', snapshot.trimMode === 'manual')
  windRush.update({ boost: snapshot.trimBoost, serial: snapshot.boostSerial, paused: isPaused, reducedMotion: reducedMotionQuery.matches })
  sailingHud.toggleAttribute('data-no-go', snapshot.noGo)
  sailingHud.toggleAttribute('data-luffing', snapshot.luffing)
  if (snapshot.assisted) {
    sailingGuidance.textContent = 'Assisted passage: steer when you are ready to take the helm.'
  } else if (snapshot.moored) {
    sailingGuidance.textContent = 'Moored. Trim or steer to set sail.'
  } else if (snapshot.luffing) {
    sailingGuidance.textContent = 'Wind spilled. Release to catch the wind.'
  } else if (snapshot.noGo) {
    sailingGuidance.textContent = 'Into the wind. Turn left or right to tack.'
  } else if (snapshot.trimMode === 'auto' && !snapshot.trimEngaged) {
    sailingGuidance.textContent = 'Auto trim ready. WASD or arrows to set sail.'
  } else if (snapshot.trimMode === 'auto') {
    sailingGuidance.textContent = `Auto trim ${Math.round(snapshot.trimEfficiency * 100)}% · Q/E for manual trim.`
  } else if (snapshot.trimBoost > 0.05) {
    sailingGuidance.textContent = 'Sweet spot · speed surge!'
  } else if (snapshot.sailAngle > snapshot.suggestedAngle + 0.1) {
    sailingGuidance.textContent = 'Trim in toward the suggested angle for more drive.'
  } else if (snapshot.sailAngle < snapshot.suggestedAngle - 0.1) {
    sailingGuidance.textContent = 'Ease out toward the suggested angle for more drive.'
  } else if (snapshot.power < 0.08) {
    sailingGuidance.textContent = 'Turn across the wind to fill the sail.'
  } else if (snapshot.sweetSpot) {
    sailingGuidance.textContent = 'Sweet spot. Sail diagonally and tack to travel upwind.'
  } else {
    sailingGuidance.textContent = 'Manual trim. Q/E adjusts the sail; M returns to auto.'
  }
}

function directionLabel(angle: number): string {
  const degrees = ((angle * 180 / Math.PI) + 360) % 360
  if (degrees < 22.5 || degrees >= 337.5) return 'ahead'
  if (degrees < 67.5) return 'port bow'
  if (degrees < 112.5) return 'port'
  if (degrees < 157.5) return 'port quarter'
  if (degrees < 202.5) return 'astern'
  if (degrees < 247.5) return 'starboard quarter'
  if (degrees < 292.5) return 'starboard'
  return 'starboard bow'
}

const vesselInput = new VesselInputController({
  root: helmPanel,
  onInput: (input) => {
    waterWorld?.setInput(input)
  },
  onReset: () => {
    waterWorld?.resetVessel()
    hud.closeDrawer(false)
    windRush.update({ boost: 0, serial: 0, paused: isPaused, reducedMotion: reducedMotionQuery.matches })
  },
  onAutoTrim: () => waterWorld?.setAutoTrim(),
})

const updateSoundButton = (): void => {
  if (!soundToggle) return
  soundToggle.textContent = !soundAvailable ? '♪ Sound unavailable' : soundEnabled ? '♪ Sound on' : '♪ Sound off'
  soundToggle.setAttribute('aria-pressed', String(soundEnabled))
  soundToggle.setAttribute('aria-label', !soundAvailable ? 'Sound unavailable' : soundEnabled ? 'Sound on' : 'Sound off')
  soundToggle.disabled = !soundAvailable
}
const onSoundToggle = async (): Promise<void> => {
  if (!soundToggle || !soundAvailable) return
  const request = ++soundRequestSerial
  const enabled = !soundEnabled
  soundEnabled = enabled
  updateSoundButton()
  try {
    const accepted = await windRush.setEnabled(enabled)
    if (request !== soundRequestSerial) return
    soundEnabled = enabled && accepted
    soundAvailable = accepted || !enabled
  } catch {
    if (request !== soundRequestSerial) return
    soundAvailable = false
    soundEnabled = false
  }
  updateSoundButton()
}
soundToggle?.addEventListener('click', onSoundToggle)

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
  if (left < sailingHudBounds.right + 6 && right > sailingHudBounds.left - 6
    && top < sailingHudBounds.bottom + 6 && bottom > sailingHudBounds.top - 6) return false
  const headerBottom = viewport.height <= 460 ? 110 : viewport.width <= 900 ? 200 : 160
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
  sailingHudBounds = sailingHud.getBoundingClientRect()
}

window.addEventListener('resize', onViewportResize)

try {
  waterWorld = createWaterWorld(sceneLayer, {
    reducedMotion: reducedMotionQuery.matches,
    islands: portfolioIslands,
    // Reserve room for the interface without DOM layout reads every frame.
    // Responsive label bounds below refine this conservative projection.
    framingInsets: { top: 145, right: 20, bottom: 155, left: 20 },
    onLandmarkProjection: updateLandmarkLabels,
    onVesselUpdate: (snapshot) => {
      const proximity = getProximityState(
        { x: snapshot.x, z: snapshot.z },
        portfolioIslands,
        previousProximityId,
      )
      previousProximityId = proximity?.id ?? null
      hud.setProximity(proximity)
    },
    onSailingUpdate: updateSailingHud,
    onScanUpdate: (update) => hud.setScanUpdate(update),
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
  windRush.update({ boost: 0, serial: 0, paused: isPaused, reducedMotion: reducedMotionQuery.matches })
  updateMotionButton()
}

motionToggle.addEventListener('click', onMotionToggle)

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'p' && event.target === document.body) {
    motionToggle.click()
    return
  }
  if (event.key.toLowerCase() !== 'f' || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
  if (event.target instanceof Element && event.target.closest('.content-drawer, input, textarea, select, [contenteditable]')) return
  const promptButton = document.querySelector<HTMLButtonElement>('[data-explore-action]')
  const drawerOpen = document.querySelector<HTMLElement>('.content-drawer:not([hidden])')
  if (!drawerOpen && promptButton && !promptButton.closest('[hidden]')) {
    event.preventDefault()
    promptButton.click()
  }
}

window.addEventListener('keydown', onKeyDown)

const onReducedMotionChange = (event: MediaQueryListEvent) => {
  waterWorld?.setReducedMotion(event.matches)
  if (event.matches) {
    isPaused = true
    vesselInput.setEnabled(false, Boolean(waterWorld))
    waterWorld?.setPaused(true)
    windRush.update({ boost: 0, serial: 0, paused: true, reducedMotion: true })
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
    hud.dispose()
    windRush.dispose()
    soundToggle?.removeEventListener('click', onSoundToggle)
    labelResizeObserver?.disconnect()
    sailingHudObserver?.disconnect()
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
    hud.dispose()
    windRush.dispose()
    soundToggle?.removeEventListener('click', onSoundToggle)
    motionToggle.removeEventListener('click', onMotionToggle)
    window.removeEventListener('keydown', onKeyDown)
    reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    window.removeEventListener('pagehide', onPageHide)
    window.removeEventListener('pageshow', onPageShow)
    window.removeEventListener('resize', onViewportResize)
    labelResizeObserver?.disconnect()
    sailingHudObserver?.disconnect()
  })
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

updateMotionButton()
updateSoundButton()
