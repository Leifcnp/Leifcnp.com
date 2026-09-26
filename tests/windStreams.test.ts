import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'
import { createWindStreams, WIND_STREAM_CAPACITY } from '../src/world/effects/createWindStreams.ts'
import { portfolioIslands } from '../src/content/islands.ts'
import { sampleFacetedWaterHeight } from '../src/world/waterSurfaceGrid.ts'

function meshOf(scene: THREE.Scene): THREE.Mesh {
  const mesh = scene.getObjectByName('phase-thirteen-wind-streams')
  assert.ok(mesh instanceof THREE.Mesh)
  return mesh
}

test('creates one bounded translucent draw with finite water-following ribbons', () => {
  const scene = new THREE.Scene()
  const streams = createWindStreams(scene, [])
  const mesh = meshOf(scene)
  const position = mesh.geometry.getAttribute('position')
  const alpha = mesh.geometry.getAttribute('aAlpha')
  assert.equal(position.count, WIND_STREAM_CAPACITY * 9)
  assert.equal(alpha.count, position.count)
  assert.ok(Array.from(alpha.array).some(a => a > 0.05), 'wind strokes must have visible bodies')
  assert.equal(scene.children.filter((child) => child.name === 'phase-thirteen-wind-streams').length, 1)
  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index); const y = position.getY(index); const z = position.getZ(index)
    assert.ok([x, y, z, alpha.getX(index)].every(Number.isFinite))
    assert.ok(Math.abs(y - sampleFacetedWaterHeight(x, z, 0)) > 1.9)
  }
  streams.dispose()
})

test('wind direction moves ribbons downwind from the authored -X field', () => {
  const first = new THREE.Scene(); const second = new THREE.Scene()
  const a = createWindStreams(first, []); const b = createWindStreams(second, [])
  a.update({ x: 0, z: 0 }, 0, 0)
  b.update({ x: 0, z: 0 }, 0.5, 0.5)
  const pa = meshOf(first).geometry.getAttribute('position')
  const pb = meshOf(second).geometry.getAttribute('position')
  assert.ok(pb.getX(0) < pa.getX(0), 'stream should travel toward negative X')
  a.dispose(); b.dispose()
})

test('islands exclude the complete ribbon span and absolute time is partition independent', () => {
  const scene = new THREE.Scene(); const repeat = new THREE.Scene()
  const a = createWindStreams(scene, portfolioIslands); const b = createWindStreams(repeat, portfolioIslands)
  a.update({ x: 0, z: 0 }, 8, 0.1)
  a.update({ x: 0, z: 0 }, 8, 0.9)
  b.update({ x: 0, z: 0 }, 8, 1)
  const first = meshOf(scene).geometry.getAttribute('position')
  const second = meshOf(repeat).geometry.getAttribute('position')
  for (let i = 0; i < first.count; i += 1) {
    assert.equal(first.getX(i), second.getX(i))
    assert.equal(first.getY(i), second.getY(i))
    assert.equal(first.getZ(i), second.getZ(i))
  }
  for (const island of portfolioIslands) for (let i = 0; i < first.count; i += 1) {
    const distance = Math.hypot(first.getX(i) - island.position.x, first.getZ(i) - island.position.z)
    assert.ok(distance >= island.landCollisionRadius + 2.4 || meshOf(scene).geometry.getAttribute('aAlpha').getX(i) === 0)
  }
  a.dispose(); b.dispose()
})

test('reduced motion freezes the static cue and lifecycle operations are idempotent', () => {
  const scene = new THREE.Scene(); const streams = createWindStreams(scene, [])
  streams.setReducedMotion(true)
  const reducedAlpha = meshOf(scene).geometry.getAttribute('aAlpha')
  assert.equal(Math.max(...Array.from(reducedAlpha.array as ArrayLike<number>)), 0)
  const before = Array.from(meshOf(scene).geometry.getAttribute('position').array)
  streams.update({ x: 0, z: 0 }, 30, 1)
  const after = Array.from(meshOf(scene).geometry.getAttribute('position').array)
  for (let index = 0; index < after.length; index += 3) {
    assert.equal(after[index], before[index])
    assert.equal(after[index + 2], before[index + 2])
  }
  streams.reset(); streams.dispose(); streams.dispose()
  assert.equal(scene.getObjectByName('phase-thirteen-wind-streams'), undefined)
})


test('camera movement preserves visible world positions and wraps only invisible copies', () => {
  const scene = new THREE.Scene()
  const streams = createWindStreams(scene, [])
  const mesh = meshOf(scene)
  const position = mesh.geometry.getAttribute('position')
  const alpha = mesh.geometry.getAttribute('aAlpha')
  let previous: {x:number; z:number; alpha:number}[] = []
  for (let center = -110; center <= 110; center += 0.5) {
    streams.update({x:center,z:center * 0.2}, 5, 0)
    const next = Array.from({length:WIND_STREAM_CAPACITY}, (_,i) => ({x:position.getX(i*9+2),z:position.getZ(i*9+2),alpha:alpha.getX(i*9+2)}))
    if (previous.length) next.forEach((p,i) => {
      if (p.alpha > 1e-5 || previous[i].alpha > 1e-5) {
        assert.ok(Math.abs(p.x-previous[i].x)<1e-4 && Math.abs(p.z-previous[i].z)<1e-4, 'camera crossing must not move visible airflow')
      }
    })
    previous = next
  }
  streams.update({x:0,z:0},0,0)
  const visibleRows = new Set(Array.from({length:WIND_STREAM_CAPACITY},(_,i)=>Math.round(position.getZ(i*9+2)/10)))
  assert.ok(visibleRows.size > 4, 'the field must span several world rows')
  streams.dispose()
})
