export interface WindRushState {
  readonly boost: number
  readonly serial: number
  readonly paused: boolean
  readonly reducedMotion: boolean
}

export interface WindRushController {
  /** Enable audio after an explicit user gesture, or silence it when false. */
  setEnabled(enabled: boolean): Promise<boolean>
  update(state: WindRushState): void
  dispose(): void
}

type AudioContextConstructor = new () => AudioContext

const DEFAULT_STATE: WindRushState = {
  boost: 0,
  serial: 0,
  paused: false,
  reducedMotion: false,
}
const BUFFER_SECONDS = 0.75
const MAX_GAIN = 0.075
const BASE_GAIN = 0.012
const BOOST_GAIN = 0.05
const PULSE_SECONDS = 0.16

const clamp01 = (value: number): number => (
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0
)

const getAudioContextConstructor = (): AudioContextConstructor | null => {
  const scope = globalThis as typeof globalThis & {
    webkitAudioContext?: AudioContextConstructor
  }
  if (typeof scope.AudioContext === 'function') return scope.AudioContext
  if (typeof scope.webkitAudioContext === 'function') return scope.webkitAudioContext
  return null
}

/**
 * Create one lazy, synthesized wind-rush graph. Importing this module and
 * feeding it simulation state are intentionally silent; browsers only permit
 * the context to start after the caller has handled a user gesture.
 */
export function createWindRush(): WindRushController {
  let context: AudioContext | null = null
  let source: AudioBufferSourceNode | null = null
  let filter: BiquadFilterNode | null = null
  let gain: GainNode | null = null
  let disposed = false
  let userEnabled = false
  // This is separate from userEnabled because an in-flight resume can finish
  // after setEnabled(false) has muted the graph.
  let desiredEnabled = false
  let hidden = false
  let pendingEnable: Promise<boolean> | null = null
  let pulseUntil = 0
  let lastSerial = DEFAULT_STATE.serial
  let latestState: WindRushState = DEFAULT_STATE

  const visibilityDocument = typeof document === 'undefined' ? null : document
  hidden = Boolean(visibilityDocument?.hidden)
  const onVisibilityChange = (): void => {
    hidden = Boolean(visibilityDocument?.hidden)
    applyState()
  }
  visibilityDocument?.addEventListener('visibilitychange', onVisibilityChange)

  const disconnectGraph = (): void => {
    try { source?.stop() } catch { /* A source may already be stopped. */ }
    try { source?.disconnect() } catch { /* Graceful teardown for test doubles. */ }
    try { filter?.disconnect() } catch { /* Graceful teardown for test doubles. */ }
    try { gain?.disconnect() } catch { /* Graceful teardown for test doubles. */ }
    source = null
    filter = null
    gain = null
  }

  const closeContext = async (): Promise<void> => {
    const current = context
    context = null
    disconnectGraph()
    if (!current) return
    try { await current.close() } catch { /* Closing is best effort. */ }
  }

  const applyState = (): void => {
    if (!context || !gain || !filter || disposed) return
    const now = context.currentTime
    const boost = clamp01(latestState.boost)
    const active = userEnabled && !hidden && !latestState.paused && !latestState.reducedMotion && boost > 0
    const pulse = now < pulseUntil ? 1.35 : 1
    const target = active ? Math.min(MAX_GAIN, (BASE_GAIN + BOOST_GAIN * boost) * pulse) : 0
    const frequency = 560 + boost * 980
    gain.gain.cancelScheduledValues(now)
    gain.gain.setTargetAtTime(target, now, target > 0 ? 0.065 : 0.035)
    filter.frequency.cancelScheduledValues(now)
    filter.frequency.setTargetAtTime(frequency, now, 0.09)
  }

  const buildGraph = (current: AudioContext): void => {
    const sampleRate = Number.isFinite(current.sampleRate) && current.sampleRate > 0
      ? current.sampleRate
      : 44100
    const length = Math.max(2048, Math.min(32768, Math.round(sampleRate * BUFFER_SECONDS)))
    const buffer = current.createBuffer(1, length, sampleRate)
    const data = buffer.getChannelData(0)
    // A fixed LCG makes the wind texture deterministic without shipping an
    // asset. The low-pass filter supplies the usable wind character.
    let seed = 0x5eeda11
    for (let index = 0; index < data.length; index += 1) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      data[index] = (seed / 0xffffffff) * 2 - 1
    }

    const nextSource = current.createBufferSource()
    source = nextSource
    nextSource.buffer = buffer
    nextSource.loop = true
    const nextFilter = current.createBiquadFilter()
    filter = nextFilter
    nextFilter.type = 'lowpass'
    nextFilter.frequency.value = 560
    nextFilter.Q.value = 0.45
    const nextGain = current.createGain()
    gain = nextGain
    nextGain.gain.value = 0
    nextSource.connect(nextFilter)
    nextFilter.connect(nextGain)
    nextGain.connect(current.destination)
    try {
      nextSource.start()
    } catch (error) {
      disconnectGraph()
      throw error
    }
  }

  const enable = async (): Promise<boolean> => {
    if (disposed) return false
    const Constructor = getAudioContextConstructor()
    if (!Constructor) return false
    try {
      if (!context) {
        context = new Constructor()
        buildGraph(context)
      }
      if (context.state === 'suspended') await context.resume()
      if (disposed || !desiredEnabled) {
        await closeContext()
        return false
      }
      userEnabled = true
      applyState()
      return true
    } catch {
      userEnabled = false
      await closeContext()
      return false
    }
  }

  return {
    setEnabled: (enabled): Promise<boolean> => {
      if (disposed) return Promise.resolve(false)
      if (!enabled) {
        desiredEnabled = false
        userEnabled = false
        applyState()
        return Promise.resolve(true)
      }
      desiredEnabled = true
      if (pendingEnable) return pendingEnable
      pendingEnable = enable().finally(() => {
        pendingEnable = null
      })
      return pendingEnable
    },
    update: (state): void => {
      if (disposed) return
      const nextBoost = clamp01(state.boost)
      const nextSerial = Number.isFinite(state.serial) ? state.serial : 0
      latestState = {
        boost: nextBoost,
        serial: nextSerial,
        paused: Boolean(state.paused),
        reducedMotion: Boolean(state.reducedMotion),
      }
      if (nextSerial !== lastSerial && nextBoost > 0 && !latestState.paused && !latestState.reducedMotion) {
        pulseUntil = (context?.currentTime ?? 0) + PULSE_SECONDS
      }
      lastSerial = nextSerial
      applyState()
    },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      desiredEnabled = false
      userEnabled = false
      visibilityDocument?.removeEventListener('visibilitychange', onVisibilityChange)
      void closeContext()
    },
  }
}
