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
  readonly onExploreRequest: (islandId: string) => void
}

export interface PortfolioHudController {
  readonly nav: HTMLElement
  readonly drawer: HTMLElement
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
  drawer.setAttribute('aria-labelledby', drawerHeading.id)
  drawer.append(drawerHeader, drawerBody)

  root.append(nav, prompt, drawer)

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
    prompt.hidden = !nearbyIsland
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
    prompt.hidden = !island || !drawer.hidden
    proximityStatus.textContent = island
      ? `Docking range: ${island.name}. Explore prompt available.`
      : 'Outside all docking zones.'
    if (!island) return
    promptText.textContent = `${island.name} · ${CATEGORY_LABELS[island.category]}`
    promptButton.setAttribute('aria-label', `Explore ${island.name}`)
  }

  function setScanUpdate(update: ScanUpdate): void {
    if (disposed) return
    const fallback = update.status === 'travelling'
      ? `Scanning toward ${islandById.get(update.islandId ?? '')?.name ?? 'island'}`
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
    root.classList.remove('is-reading')
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
