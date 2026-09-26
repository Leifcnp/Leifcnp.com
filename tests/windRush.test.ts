import assert from 'node:assert/strict'
import test from 'node:test'

import { createWindRush } from '../src/audio/createWindRush.ts'

class MockParam {
  value = 0
  readonly targets: number[] = []

  cancelScheduledValues(): void {}

  setTargetAtTime(value: number): void {
    this.value = value
    this.targets.push(value)
  }
}

class MockNode {
  disconnected = false

  connect<T>(target: T): T {
    return target
  }

  disconnect(): void {
    this.disconnected = true
  }
}

class MockSource extends MockNode {
  buffer: unknown = null
  loop = false
  starts = 0
  stops = 0

  start(): void {
    this.starts += 1
  }

  stop(): void {
    this.stops += 1
  }
}

class MockContext {
  static instances: MockContext[] = []

  readonly destination = {}
  readonly sampleRate = 8000
  readonly source = new MockSource()
  readonly filter = Object.assign(new MockNode(), {
    type: 'lowpass',
    frequency: new MockParam(),
    Q: new MockParam(),
  })
  readonly output = Object.assign(new MockNode(), { gain: new MockParam() })
  state: AudioContextState = 'suspended'
  currentTime = 0
  closed = false

  constructor() {
    MockContext.instances.push(this)
  }

  createBuffer(_channels: number, length: number, _sampleRate: number): AudioBuffer {
    const data = new Float32Array(length)
    return { getChannelData: () => data } as unknown as AudioBuffer
  }

  createBufferSource(): MockSource {
    return this.source
  }

  createBiquadFilter(): typeof this.filter {
    return this.filter
  }

  createGain(): typeof this.output {
    return this.output
  }

  resume(): Promise<void> {
    this.state = 'running'
    return Promise.resolve()
  }

  close(): Promise<void> {
    this.closed = true
    this.state = 'closed'
    return Promise.resolve()
  }
}

class RejectingContext extends MockContext {
  override resume(): Promise<void> {
    return Promise.reject(new Error('gesture was rejected'))
  }
}

class DeferredContext extends MockContext {
  static resolveResume: (() => void) | null = null

  override resume(): Promise<void> {
    return new Promise((resolve) => {
      DeferredContext.resolveResume = () => {
        this.state = 'running'
        resolve()
      }
    })
  }
}

type AudioScope = typeof globalThis & { AudioContext?: unknown }

function withAudioContext<T>(constructor: unknown, run: () => Promise<T>): Promise<T> {
  const scope = globalThis as AudioScope
  const previous = scope.AudioContext
  scope.AudioContext = constructor
  return run().finally(() => {
    if (previous === undefined) delete scope.AudioContext
    else scope.AudioContext = previous
  })
}

test('wind rush is lazy, gesture-gated, bounded, and silences on pause', async () => {
  MockContext.instances.length = 0
  await withAudioContext(MockContext, async () => {
    const controller = createWindRush()
    controller.update({ boost: 1, serial: 1, paused: false, reducedMotion: false })
    assert.equal(MockContext.instances.length, 0, 'simulation updates must not construct audio')

    const first = controller.setEnabled(true)
    const second = controller.setEnabled(true)
    assert.strictEqual(first, second, 'concurrent gesture requests share one initialization')
    assert.equal(await first, true)
    const context = MockContext.instances[0]
    assert.ok(context)
    assert.equal(context.source.starts, 1)
    assert.equal(context.source.loop, true)
    assert.ok(context.output.gain.targets.at(-1)! > 0)
    assert.ok(context.output.gain.targets.at(-1)! <= 0.075)

    controller.update({ boost: 1, serial: 1, paused: true, reducedMotion: false })
    assert.equal(context.output.gain.targets.at(-1), 0)
    controller.update({ boost: 1, serial: 2, paused: false, reducedMotion: false })
    assert.ok(context.output.gain.targets.at(-1)! > 0)
    controller.update({ boost: 1, serial: 3, paused: false, reducedMotion: true })
    assert.equal(context.output.gain.targets.at(-1), 0)

    assert.equal(await controller.setEnabled(false), true)
    assert.equal(context.output.gain.targets.at(-1), 0)
    controller.dispose()
    controller.dispose()
    assert.equal(context.closed, true)
  })
})

test('wind rush gracefully handles unsupported and rejected audio contexts', async () => {
  const scope = globalThis as AudioScope
  const previous = scope.AudioContext
  try {
    delete scope.AudioContext
    const unsupported = createWindRush()
    unsupported.update({ boost: 1, serial: 1, paused: false, reducedMotion: false })
    assert.equal(await unsupported.setEnabled(true), false)
    unsupported.dispose()

    MockContext.instances.length = 0
    scope.AudioContext = RejectingContext
    const rejected = createWindRush()
    assert.equal(await rejected.setEnabled(true), false)
    assert.equal(MockContext.instances[0]?.closed, true)
    rejected.dispose()
  } finally {
    if (previous === undefined) delete scope.AudioContext
    else scope.AudioContext = previous
  }
})

test('muting while resume is pending cannot be overwritten by the late gesture result', async () => {
  MockContext.instances.length = 0
  DeferredContext.resolveResume = null
  await withAudioContext(DeferredContext, async () => {
    const controller = createWindRush()
    controller.update({ boost: 1, serial: 1, paused: false, reducedMotion: false })
    const pending = controller.setEnabled(true)
    assert.ok(DeferredContext.resolveResume)
    await controller.setEnabled(false)
    DeferredContext.resolveResume?.()
    assert.equal(await pending, false)
    assert.equal(MockContext.instances[0]?.closed, true)
    controller.dispose()
  })
})
