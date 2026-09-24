import type { VesselInput } from '../world/vessel/kinematics'

export type VesselControl = 'forward' | 'reverse' | 'left' | 'right' | 'brake'

export interface VesselInputControllerOptions {
  /** Element containing buttons with `data-vessel-control` actions. */
  readonly root: HTMLElement
  /** Receives a normalized intent whenever the active input changes. */
  readonly onInput: (input: VesselInput) => void
  /** Optional callback for a separate reset button. */
  readonly onReset?: () => void
}

interface PointerIntent {
  readonly pointerId: number
  readonly control: VesselControl
  readonly button: HTMLButtonElement
}

const CONTROL_NAMES: readonly VesselControl[] = [
  'forward',
  'reverse',
  'left',
  'right',
  'brake',
]

const KEY_CONTROLS: ReadonlyMap<string, VesselControl> = new Map([
  ['w', 'forward'],
  ['arrowup', 'forward'],
  ['s', 'reverse'],
  ['arrowdown', 'reverse'],
  ['a', 'left'],
  ['arrowleft', 'left'],
  ['d', 'right'],
  ['arrowright', 'right'],
  [' ', 'brake'],
])

const EMPTY_INPUT: VesselInput = { throttle: 0, rudder: 0, brake: false }

/** Reduce any set of concurrently held controls to the shared physics intent. */
export function vesselInputFromControls(activeControls: Iterable<VesselControl>): VesselInput {
  const controls = new Set(activeControls)
  return {
    throttle: controls.has('forward') === controls.has('reverse')
      ? 0
      : controls.has('forward') ? 1 : -1,
    rudder: controls.has('left') === controls.has('right')
      ? 0
      : controls.has('left') ? -1 : 1,
    brake: controls.has('brake'),
  }
}

/**
 * Maps keyboard and compact touch controls to one shared vessel intent.
 *
 * This adapter deliberately knows nothing about the renderer or physics. It
 * can therefore be disabled while the scene is paused and always releases
 * held input when the page, tab, or input surface loses focus.
 */
export class VesselInputController {
  private readonly root: HTMLElement
  private readonly onInput: (input: VesselInput) => void
  private readonly onReset?: () => void
  private readonly buttons = new Map<VesselControl, HTMLButtonElement[]>()
  private resetButton?: HTMLButtonElement
  private readonly pressedKeys = new Map<string, VesselControl>()
  private readonly pressedButtons = new Map<HTMLButtonElement, VesselControl>()
  private readonly pointers = new Map<number, PointerIntent>()
  private readonly buttonHandlers: Array<{
    button: HTMLButtonElement
    type: string
    handler: EventListener
  }> = []
  private enabled = true
  private resetEnabled = true
  private disposed = false
  private resetHeld = false
  private lastInput: VesselInput = { ...EMPTY_INPUT }

  constructor(options: VesselInputControllerOptions) {
    this.root = options.root
    this.onInput = options.onInput
    this.onReset = options.onReset

    for (const control of CONTROL_NAMES) {
      const buttons = Array.from(
        this.root.querySelectorAll<HTMLButtonElement>(
          `[data-vessel-control="${control}"]`,
        ),
      )
      this.buttons.set(control, buttons)
      for (const button of buttons) this.bindButton(button, control)
    }

    this.root.addEventListener('pointerdown', this.onPointerDown)
    this.root.addEventListener('pointerup', this.onPointerUp)
    this.root.addEventListener('pointercancel', this.onPointerCancel)
    this.root.addEventListener('lostpointercapture', this.onLostPointerCapture)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('blur', this.onBlur)
    window.addEventListener('pagehide', this.onPageHide)
    document.addEventListener('visibilitychange', this.onVisibilityChange)

    const resetButton = this.root.querySelector<HTMLButtonElement>('[data-vessel-reset]')
    this.resetButton = resetButton ?? undefined
    if (resetButton && this.onReset) {
      const handler = () => {
        this.releaseAll()
        this.onReset?.()
      }
      resetButton.addEventListener('click', handler)
      this.buttonHandlers.push({ button: resetButton, type: 'click', handler })
    }

    this.emitIfChanged()
  }

  /** Enable movement controls and independently control the reset action. */
  setEnabled(enabled: boolean, resetEnabled = enabled): void {
    if (this.disposed) return
    this.enabled = enabled
    this.resetEnabled = resetEnabled
    this.releaseAll()
    for (const buttons of this.buttons.values()) {
      for (const button of buttons) {
        button.disabled = !enabled
        button.setAttribute('aria-disabled', String(!enabled))
      }
    }
    if (this.resetButton) {
      this.resetButton.disabled = !resetEnabled
      this.resetButton.setAttribute('aria-disabled', String(!resetEnabled))
    }
    this.root.toggleAttribute('data-controls-disabled', !enabled)
  }

  /** Release keyboard and pointer holds without disposing the adapter. */
  releaseAll(): void {
    this.pressedKeys.clear()
    this.pressedButtons.clear()
    this.resetHeld = false
    for (const { pointerId, button } of this.pointers.values()) {
      try {
        button.releasePointerCapture?.(pointerId)
      } catch {
        // Pointer capture may already have been cancelled by the browser.
      }
    }
    this.pointers.clear()
    this.emitIfChanged(true)
  }

  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.releaseAll()
    this.root.removeEventListener('pointerdown', this.onPointerDown)
    this.root.removeEventListener('pointerup', this.onPointerUp)
    this.root.removeEventListener('pointercancel', this.onPointerCancel)
    this.root.removeEventListener('lostpointercapture', this.onLostPointerCapture)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('blur', this.onBlur)
    window.removeEventListener('pagehide', this.onPageHide)
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
    for (const { button, type, handler } of this.buttonHandlers) {
      button.removeEventListener(type, handler)
    }
    this.buttonHandlers.length = 0
  }

  private readonly bindButton = (button: HTMLButtonElement, control: VesselControl): void => {
    button.dataset.vesselControl = control
    button.addEventListener('keydown', this.onButtonKeyDown)
    button.addEventListener('keyup', this.onButtonKeyUp)
    button.addEventListener('focusout', this.onButtonFocusOut)
    this.buttonHandlers.push(
      { button, type: 'keydown', handler: this.onButtonKeyDown },
      { button, type: 'keyup', handler: this.onButtonKeyUp },
      { button, type: 'focusout', handler: this.onButtonFocusOut },
    )
  }

  private readonly onButtonKeyDown = (event: Event): void => {
    if (!(event instanceof KeyboardEvent)) return
    const button = event.currentTarget as HTMLButtonElement | null
    const control = button?.dataset.vesselControl as VesselControl | undefined
    if (!button || !control || (event.key !== ' ' && event.key !== 'Enter')) return
    if (!this.enabled) return
    event.preventDefault()
    this.pressedButtons.set(button, control)
    this.emitIfChanged()
  }

  private readonly onButtonKeyUp = (event: Event): void => {
    if (!(event instanceof KeyboardEvent)) return
    const button = event.currentTarget as HTMLButtonElement | null
    const control = button?.dataset.vesselControl as VesselControl | undefined
    if (!button || !control || (event.key !== ' ' && event.key !== 'Enter')) return
    event.preventDefault()
    this.pressedButtons.delete(button)
    this.emitIfChanged()
  }

  private readonly onButtonFocusOut = (event: Event): void => {
    const button = event.currentTarget as HTMLButtonElement | null
    if (!button || !this.pressedButtons.delete(button)) return
    this.emitIfChanged()
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (!this.enabled || this.disposed) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const target = event.target instanceof Element
      ? event.target.closest<HTMLButtonElement>('[data-vessel-control]')
      : null
    const control = target?.dataset.vesselControl as VesselControl | undefined
    if (!target || !control || target.disabled) return
    event.preventDefault()
    this.pointers.set(event.pointerId, { pointerId: event.pointerId, control, button: target })
    target.setPointerCapture?.(event.pointerId)
    this.emitIfChanged()
  }

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (!this.pointers.delete(event.pointerId)) return
    event.preventDefault()
    this.emitIfChanged()
  }

  private readonly onPointerCancel = (event: PointerEvent): void => {
    if (!this.pointers.delete(event.pointerId)) return
    event.preventDefault()
    this.emitIfChanged()
  }

  private readonly onLostPointerCapture = (event: Event): void => {
    const pointerId = (event as PointerEvent).pointerId
    if (!Number.isFinite(pointerId) || !this.pointers.delete(pointerId)) return
    this.emitIfChanged()
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (this.disposed || isEditableTarget(event.target)) return
    // The non-modal drawer owns its keyboard space;
    // reading content with arrows or Space must never steer the vessel.
    if (isPortfolioUiTarget(event.target)) return
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const key = normalizeKey(event.key)
    // Let native buttons and controls retain their normal Space/Enter behavior.
    if (event.target instanceof HTMLElement && event.target.matches('button, a') && (key === ' ' || key === 'enter')) return
    if (key === 'r') {
      if (!this.resetEnabled) return
      if (this.resetHeld) return
      event.preventDefault()
      this.releaseAll()
      this.resetHeld = true
      this.onReset?.()
      return
    }
    if (!this.enabled) return
    const control = KEY_CONTROLS.get(key)
    if (!control) return
    event.preventDefault()
    if (this.pressedKeys.has(key)) return
    this.pressedKeys.set(key, control)
    this.emitIfChanged()
  }

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    const key = normalizeKey(event.key)
    if (key === 'r') {
      this.resetHeld = false
      return
    }
    if (!this.pressedKeys.delete(key)) return
    event.preventDefault()
    this.emitIfChanged()
  }

  private readonly onBlur = (): void => this.releaseAll()
  private readonly onPageHide = (): void => this.releaseAll()
  private readonly onVisibilityChange = (): void => {
    if (document.hidden) this.releaseAll()
  }

  private emitIfChanged(force = false): void {
    const input = this.getInput()
    if (!force && sameInput(input, this.lastInput)) return
    this.lastInput = input
    this.onInput({ ...input })
  }

  private getInput(): VesselInput {
    const controls = new Set<VesselControl>(this.pressedKeys.values())
    for (const control of this.pressedButtons.values()) controls.add(control)
    for (const { control } of this.pointers.values()) controls.add(control)
    const input = vesselInputFromControls(controls)
    for (const [control, buttons] of this.buttons) {
      const active = controls.has(control)
      for (const button of buttons) {
        button.dataset.active = String(active)
        button.setAttribute('aria-pressed', String(active))
      }
    }
    return input
  }
}

function normalizeKey(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key.toLowerCase()
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || Boolean(target.closest('input, select, textarea'))
}

function isPortfolioUiTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('.content-drawer'))
}

function sameInput(a: VesselInput, b: VesselInput): boolean {
  return a.throttle === b.throttle && a.rudder === b.rudder && a.brake === b.brake
}
