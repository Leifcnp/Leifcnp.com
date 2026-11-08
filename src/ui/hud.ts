import { portfolioHarbours } from '../content/harbours'
import type { HarbourSnapshot } from '../interaction/localHarbour'
import type { LandmarkProjection } from '../world/createWaterWorld'
import type { IslandDefinition } from '../content/islands'
import type { PortfolioCategory, PortfolioContent } from '../content/portfolio'

export type ScanStatus = 'idle' | 'travelling' | 'arrived' | 'cancelled' | 'failed'

export interface ScanUpdate {
  readonly status: ScanStatus
  readonly islandId: string | null
  readonly message?: string
}

export interface PortfolioHudOptions {
  readonly root: HTMLElement
  readonly islands: readonly IslandDefinition[]
  readonly content: PortfolioContent
  readonly onScanRequest: (islandId: string) => void
  readonly onHarbourSelect: (id: string) => void
  readonly onZoomOut: () => void
  readonly onExploreRequest: (islandId: string) => void
}

export interface PortfolioHudController {
  readonly nav: HTMLElement
  readonly drawer: HTMLElement
  setHarbourUpdate(snapshot: HarbourSnapshot): void
  setHarbourProjection(projections: readonly LandmarkProjection[]): void
  openHarbour(id: string, trigger?: HTMLElement | null): void
  setProximity(island: IslandDefinition | null): void
  setScanUpdate(update: ScanUpdate): void
  openIsland(islandId: string, trigger?: HTMLElement | null): void
  closeDrawer(restoreFocus?: boolean): void
  dispose(): void
}

const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  resume: 'Resume',
  projects: 'Projects',
  writing: 'Writing',
  media: 'Media',
}

/**
 * Owns the scanner interface without importing Three.js. The drawer is an
 * intentionally non-modal aside: the persistent scanner nav stays in the
 * tab order while its content is open, which makes the fast path usable on
 * narrow screens and with a keyboard.
 */
export function createPortfolioHud(options: PortfolioHudOptions): PortfolioHudController {
  const { root, islands, content } = options
  const islandById = new Map(islands.map((island) => [island.id, island]))
  const nav = document.createElement('nav')
  nav.className = 'scanner-hud'
  nav.setAttribute('aria-label', 'Portfolio scanner')

  const navLabel = document.createElement('p')
  navLabel.className = 'scanner-hud__label'
  navLabel.textContent = 'Scan by category'
  nav.append(navLabel)

  const navList = document.createElement('div')
  navList.className = 'scanner-hud__links'
  navList.setAttribute('role', 'list')
  for (const island of islands) {
    const item = document.createElement('div')
    item.setAttribute('role', 'listitem')
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'scanner-hud__link'
    button.dataset.scannerIsland = island.id
    button.setAttribute('aria-label', `Scan ${island.name}, ${CATEGORY_LABELS[island.category]}`)
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-controls', 'portfolio-content-drawer')
    const number = document.createElement('span')
    number.className = 'scanner-hud__number'
    number.setAttribute('aria-hidden', 'true')
    number.textContent = String(navList.children.length + 1).padStart(2, '0')
    const label = document.createElement('span')
    label.className = 'scanner-hud__link-label'
    label.textContent = CATEGORY_LABELS[island.category]
    const name = document.createElement('span')
    name.className = 'scanner-hud__link-name'
    name.textContent = island.name
    button.append(number, label, name)
    button.addEventListener('click', onNavClick)
    item.append(button)
    navList.append(item)
  }
  nav.append(navList)

  const status = document.createElement('p')
  status.className = 'scanner-hud__status'
  status.setAttribute('role', 'status')
  status.setAttribute('aria-live', 'polite')
  status.setAttribute('aria-atomic', 'true')
  status.textContent = 'Under way · choose a category to scan'
  nav.append(status)

  const proximityStatus = document.createElement('p')
  proximityStatus.className = 'visually-hidden'
  proximityStatus.setAttribute('role', 'status')
  proximityStatus.setAttribute('aria-live', 'polite')
  proximityStatus.setAttribute('aria-atomic', 'true')
  nav.append(proximityStatus)

  const prompt = document.createElement('section')
  prompt.className = 'explore-prompt'
  prompt.hidden = true
  prompt.setAttribute('aria-label', 'Nearby island')
  const promptKicker = document.createElement('p')
  promptKicker.className = 'explore-prompt__kicker'
  promptKicker.textContent = 'Within range'
  const promptText = document.createElement('p')
  promptText.className = 'explore-prompt__text'
  const promptButton = document.createElement('button')
  promptButton.type = 'button'
  promptButton.dataset.exploreAction = 'true'
  promptButton.className = 'explore-prompt__button'
  promptButton.textContent = 'Explore island'
  promptButton.addEventListener('click', onExploreClick)
  prompt.append(promptKicker, promptText, promptButton)

  const drawer = document.createElement('aside')
  drawer.className = 'content-drawer'
  drawer.id = 'portfolio-content-drawer'
  drawer.hidden = true
  drawer.setAttribute('aria-label', 'Portfolio content')
  drawer.setAttribute('aria-live', 'off')
  const drawerHeader = document.createElement('div')
  drawerHeader.className = 'content-drawer__header'
  const closeButton = document.createElement('button')
  closeButton.type = 'button'
  closeButton.className = 'content-drawer__close'
  closeButton.setAttribute('aria-label', 'Close portfolio drawer')
  closeButton.textContent = 'Close'
  const onCloseClick = (): void => closeDrawer(true)
  closeButton.addEventListener('click', onCloseClick)
  const drawerHeading = document.createElement('h2')
  drawerHeading.className = 'content-drawer__title'
  drawerHeading.tabIndex = -1
  drawerHeading.id = 'portfolio-drawer-heading'
  drawerHeader.append(drawerHeading, closeButton)
  const drawerBody = document.createElement('div')
  drawerBody.className = 'content-drawer__body'
  drawerBody.tabIndex = 0
  drawerBody.setAttribute('role', 'region')
  drawerBody.setAttribute('aria-labelledby', drawerHeading.id)
  drawer.setAttribute('aria-labelledby', drawerHeading.id)
  drawer.append(drawerHeader, drawerBody)

  const localNav = document.createElement('section')
  localNav.className = 'harbour-nav'
  localNav.hidden = true
  localNav.setAttribute('aria-label', 'Shipyard local harbours')
  const localTitle = document.createElement('span')
  localTitle.className = 'harbour-nav__title'
  localTitle.textContent = 'Shipyard'
  const localDestinations = document.createElement('div')
  localDestinations.className = 'harbour-nav__destinations'
  const harbourButtons = new Map<string, HTMLButtonElement>()
  const harbourLabels = new Map<string, HTMLDivElement>()
  const harbourLayer = document.createElement('div')
  harbourLayer.className = 'harbour-labels'
  harbourLayer.setAttribute('aria-hidden', 'true')
  for (const harbour of portfolioHarbours) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = harbour.label
    button.dataset.harbourId = harbour.id
    button.setAttribute('aria-pressed', 'false')
    button.setAttribute('aria-label', `Focus ${harbour.label} harbour`)
    button.addEventListener('click', () => options.onHarbourSelect(harbour.id))
    localDestinations.append(button)
    harbourButtons.set(harbour.id, button)
    const label = document.createElement('div')
    label.className = 'harbour-label'
    label.dataset.harbourLandmark = harbour.id
    label.textContent = harbour.label
    label.hidden = true
    harbourLayer.append(label)
    harbourLabels.set(harbour.id, label)
  }
  const localOpen = document.createElement('button')
  localOpen.type = 'button'
  localOpen.textContent = 'Open'
  localOpen.dataset.harbourOpen = 'true'
  localOpen.addEventListener('click', () => {
    const id = harbourState.selectedHarbourId
    if (id) openHarbour(id, localOpen)
  })
  const nearbyOpen = document.createElement('button')
  nearbyOpen.type = 'button'
  nearbyOpen.hidden = true
  nearbyOpen.dataset.nearbyHarbourOpen = 'true'
  nearbyOpen.addEventListener('click', () => {
    if (harbourState.nearbyHarbourId) openHarbour(harbourState.nearbyHarbourId, nearbyOpen)
  })
  const zoomOut = document.createElement('button')
  zoomOut.type = 'button'
  zoomOut.textContent = 'Zoom out'
  zoomOut.addEventListener('click', () => options.onZoomOut())
  const localStatus = document.createElement('span')
  localStatus.className = 'harbour-nav__status'
  localStatus.setAttribute('role', 'status')
  localStatus.setAttribute('aria-live', 'polite')
  localNav.append(localTitle, zoomOut, localDestinations, localOpen, nearbyOpen, localStatus)
  root.append(nav, prompt, drawer, localNav, harbourLayer)

  let harbourState: HarbourSnapshot = { islandId: null, selectedHarbourId: null, nearbyHarbourId: null }
  let nearbyIsland: IslandDefinition | null = null
  let returnFocus: HTMLElement | null = null
  let lastStatus = status.textContent ?? ''
  let disposed = false
  let focusRequest = 0

  function onNavClick(event: Event): void {
    const target = event.currentTarget
    if (!(target instanceof HTMLButtonElement)) return
    const islandId = target.dataset.scannerIsland
    if (!islandId || !islandById.has(islandId)) return
    openIsland(islandId, target)
    options.onScanRequest(islandId)
  }

  function onExploreClick(): void {
    if (!nearbyIsland) return
    openIsland(nearbyIsland.id, promptButton)
    options.onExploreRequest(nearbyIsland.id)
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || drawer.hidden) return
    closeDrawer(true)
  }

  function openIsland(islandId: string, trigger: HTMLElement | null = null): void {
    const island = islandById.get(islandId)
    if (!island || disposed) return
    returnFocus = trigger ?? findNavButton(islandId)
    drawerHeading.textContent = island.name
    drawerBody.replaceChildren(renderIslandContent(island, content))
    drawerBody.scrollTop = 0
    drawer.hidden = false
    root.classList.add('is-reading')
    prompt.hidden = true
    for (const button of nav.querySelectorAll<HTMLButtonElement>('[data-scanner-island]')) {
      const selected = button.dataset.scannerIsland === islandId
      button.setAttribute('aria-expanded', String(selected))
      button.dataset.selected = String(selected)
    }
    // Let the drawer update before moving managed focus so assistive tech sees
    // the new heading and the close action remains one Tab away.
    const requestedFocus = ++focusRequest
    requestAnimationFrame(() => {
      if (!drawer.hidden && requestedFocus === focusRequest) drawerHeading.focus({ preventScroll: true })
    })
  }

  function closeDrawer(restoreFocus = true): void {
    if (drawer.hidden) return
    const selectedNavButton = activeNavButton()
    focusRequest += 1
    drawer.hidden = true
    root.classList.remove('is-reading')
    prompt.hidden = !nearbyIsland || Boolean(harbourState.islandId)
    for (const button of nav.querySelectorAll<HTMLButtonElement>('[data-scanner-island]')) {
      button.setAttribute('aria-expanded', 'false')
      button.dataset.selected = 'false'
    }
    const focusTarget = returnFocus && document.contains(returnFocus) && isVisible(returnFocus)
      ? returnFocus
      : selectedNavButton
    if (restoreFocus && focusTarget) {
      focusTarget.focus({ preventScroll: true })
    }
    returnFocus = null
  }

  function setProximity(island: IslandDefinition | null): void {
    if (nearbyIsland?.id === island?.id) return
    nearbyIsland = island
    prompt.hidden = !island || !drawer.hidden || Boolean(harbourState.islandId)
    proximityStatus.textContent = island
      ? `Docking range: ${island.name}. Explore prompt available.`
      : 'Outside all docking zones.'
    if (!island) return
    promptText.textContent = `${island.name} · ${CATEGORY_LABELS[island.category]}`
    promptButton.setAttribute('aria-label', `Explore ${island.name}`)
  }

  function setHarbourUpdate(snapshot: HarbourSnapshot): void {
    if (disposed) return
    if (snapshot.islandId === harbourState.islandId && snapshot.selectedHarbourId === harbourState.selectedHarbourId && snapshot.nearbyHarbourId === harbourState.nearbyHarbourId) return
    const previous = harbourState
    harbourState = snapshot
    const active = Boolean(snapshot.islandId)
    localNav.hidden = !active
    root.classList.toggle('is-local-harbour', active)
    prompt.hidden = !nearbyIsland || !drawer.hidden || active
    for (const [id, button] of harbourButtons) {
      button.setAttribute('aria-pressed', String(id === snapshot.selectedHarbourId))
    }
    const openId = snapshot.selectedHarbourId
    const harbour = portfolioHarbours.find((candidate) => candidate.id === openId)
    localOpen.disabled = !harbour
    localOpen.textContent = harbour ? `Open ${harbour.label}` : 'Open'
    localOpen.setAttribute('aria-label', harbour ? `Open ${harbour.label} content` : 'Open harbour content')
    const nearbyHarbour = portfolioHarbours.find((candidate) => candidate.id === snapshot.nearbyHarbourId)
    nearbyOpen.hidden = !nearbyHarbour || nearbyHarbour.id === openId
    nearbyOpen.textContent = nearbyHarbour ? `Open nearby ${nearbyHarbour.label}` : ''
    if (previous.nearbyHarbourId !== snapshot.nearbyHarbourId || previous.islandId !== snapshot.islandId) {
      const nearby = portfolioHarbours.find((candidate) => candidate.id === snapshot.nearbyHarbourId)
      localStatus.textContent = nearby ? `${nearby.label} reached · Open available` : 'Choose a harbour to focus'
    }
    if (!active) {
      for (const label of harbourLabels.values()) label.hidden = true
      if (localNav.contains(document.activeElement)) findNavButton('island-projects')?.focus({ preventScroll: true })
    }
  }

  function setHarbourProjection(projections: readonly LandmarkProjection[]): void {
    for (const [id, label] of harbourLabels) {
      const projection = projections.find((candidate) => candidate.id === id)
      label.hidden = !harbourState.islandId || !projection?.visible
      if (projection) label.style.transform = `translate3d(${projection.x}px, ${projection.y}px, 0) translate(-50%, 10px)`
    }
  }

  function openHarbour(id: string, trigger: HTMLElement | null = null): void {
    const harbour = portfolioHarbours.find((candidate) => candidate.id === id)
    if (!harbour || !harbourState.islandId) return
    const island = islandById.get(harbourState.islandId)
    if (!island) return
    openIsland(island.id, trigger ?? harbourButtons.get(id))
    drawerHeading.textContent = `${island.name} · ${harbour.label}`
    const target = harbour.contentTarget
    if (target.kind === 'overview') {
      const description = document.createElement('p')
      description.className = 'content-drawer__description'
      description.textContent = island.description
      drawerBody.replaceChildren(description)
    } else {
      drawerBody.replaceChildren(renderIslandContent({ ...island, description: '', contentIds: [target.contentId] }, content))
      drawerBody.querySelector('.content-drawer__description')?.remove()
    }
    options.onExploreRequest(island.id)
  }

  function setScanUpdate(update: ScanUpdate): void {
    if (disposed) return
    const fallback = update.status === 'travelling'
      ? `Assisted passage to ${islandById.get(update.islandId ?? '')?.name ?? 'island'}`
      : update.status === 'arrived'
        ? `Arrived at ${islandById.get(update.islandId ?? '')?.name ?? 'island'}`
        : update.status === 'cancelled'
          ? 'Scanner cancelled · steer manually'
          : update.status === 'failed'
            ? 'Scanner route unavailable · steer manually'
            : 'Under way · choose a category to scan'
    const next = update.message ?? fallback
    if (next === lastStatus) return
    lastStatus = next
    status.textContent = next
  }

  function findNavButton(islandId: string): HTMLButtonElement | null {
    return nav.querySelector<HTMLButtonElement>(`[data-scanner-island="${CSS.escape(islandId)}"]`)
  }

  function activeNavButton(): HTMLButtonElement | null {
    return activeIslandId() ? findNavButton(activeIslandId() as string) : null
  }

  function activeIslandId(): string | null {
    return Array.from(nav.querySelectorAll<HTMLButtonElement>('[data-scanner-island]'))
      .find((button) => button.dataset.selected === 'true')?.dataset.scannerIsland ?? null
  }

  function dispose(): void {
    if (disposed) return
    disposed = true
    focusRequest += 1
    root.classList.remove('is-reading', 'is-local-harbour')
    localNav.remove()
    harbourLayer.remove()
    window.removeEventListener('keydown', onKeyDown)
    for (const button of nav.querySelectorAll<HTMLButtonElement>('[data-scanner-island]')) {
      button.removeEventListener('click', onNavClick)
    }
    promptButton.removeEventListener('click', onExploreClick)
    closeButton.removeEventListener('click', onCloseClick)
    nav.remove()
    prompt.remove()
    drawer.remove()
  }

  window.addEventListener('keydown', onKeyDown)

  return {
    nav,
    drawer,
    setHarbourUpdate,
    setHarbourProjection,
    openHarbour,
    setProximity,
    setScanUpdate,
    openIsland,
    closeDrawer,
    dispose,
  }
}

function renderIslandContent(
  island: IslandDefinition,
  content: PortfolioContent,
): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const description = document.createElement('p')
  description.className = 'content-drawer__description'
  description.textContent = island.description
  fragment.append(description)

  const category = island.category
  if (category === 'resume') {
    for (const entry of content.resume.filter((candidate) => island.contentIds.includes(candidate.id))) {
      const article = createCard()
      appendHeading(article, entry.role)
      appendMeta(article, `${entry.organisation} · ${entry.period}`)
      appendParagraph(article, entry.summary)
      fragment.append(article)
    }
  } else if (category === 'projects') {
    for (const entry of content.projects.filter((candidate) => island.contentIds.includes(candidate.id))) {
      const article = createCard()
      appendHeading(article, entry.title)
      appendMeta(article, String(entry.year))
      appendParagraph(article, entry.summary)
      appendLinkOrPlaceholder(article, entry.link)
      fragment.append(article)
    }
  } else if (category === 'writing') {
    for (const entry of content.writing.filter((candidate) => island.contentIds.includes(candidate.id))) {
      const article = createCard()
      appendHeading(article, entry.title)
      appendMeta(article, `${entry.publication} · ${entry.year}`)
      appendParagraph(article, entry.excerpt)
      appendLinkOrPlaceholder(article, entry.link)
      fragment.append(article)
    }
  } else {
    for (const entry of content.media.filter((candidate) => island.contentIds.includes(candidate.id))) {
      const article = createCard()
      appendHeading(article, entry.label)
      appendMeta(article, entry.kind)
      appendLinkOrPlaceholder(article, entry.url)
      fragment.append(article)
    }
  }
  return fragment
}

function createCard(): HTMLElement {
  const article = document.createElement('article')
  article.className = 'content-card'
  return article
}

function appendHeading(parent: HTMLElement, text: string): void {
  const heading = document.createElement('h3')
  heading.textContent = text
  parent.append(heading)
}

function appendMeta(parent: HTMLElement, text: string): void {
  const meta = document.createElement('p')
  meta.className = 'content-card__meta'
  meta.textContent = text
  parent.append(meta)
}

function appendParagraph(parent: HTMLElement, text: string): void {
  const paragraph = document.createElement('p')
  paragraph.textContent = text
  parent.append(paragraph)
}

function appendLinkOrPlaceholder(parent: HTMLElement, href: string | undefined): void {
  if (!href || href === '#') {
    const placeholder = document.createElement('p')
    placeholder.className = 'content-card__placeholder'
    placeholder.textContent = 'Link unavailable in placeholder data.'
    parent.append(placeholder)
    return
  }
  const link = document.createElement('a')
  link.href = href
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.textContent = 'Open related material'
  parent.append(link)
}

function isVisible(element: HTMLElement): boolean {
  if (element.hidden || element.closest('[hidden]')) return false
  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden'
}
