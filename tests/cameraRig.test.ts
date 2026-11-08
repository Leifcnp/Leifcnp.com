import assert from 'node:assert/strict';
import test from 'node:test';
import { Vector3 } from 'three';
import { createCameraRig } from '../src/world/createCameraRig.ts';

function setup() {
  const rig = createCameraRig();
  rig.resize(1200, 800);
  rig.snapTo(30, 20);
  rig.setLocalTarget({ x: 42, z: 22 });
  rig.setFramingInsets({ top: 100, right: 380, bottom: 80, left: 30 });
  return rig;
}

test('local framing converges independently of frame partition', () => {
  const a = setup();
  const b = setup();
  a.update(30, 20, 1);
  for (let i = 0; i < 100; i++) b.update(30, 20, 0.01);
  assert.ok(a.camera.position.distanceTo(b.camera.position) < 1e-10);
  assert.ok(Math.abs(a.camera.zoom - b.camera.zoom) < 1e-10);
  assert.ok(a.camera.zoom <= 1.6);
});

test('vessel and destination fit measured insets across viewport shapes', () => {
  for (const [width, height] of [[1200, 800], [390, 844], [844, 390], [240, 240]]) {
    const rig = setup();
    rig.resize(width!, height!);
    const insets = { top: height! * .15, right: width! * .35, bottom: height! * .1, left: 12 };
    rig.setFramingInsets(insets);
    rig.setReducedMotion(true);
    for (const [x, z] of [[30, 20], [42, 22]]) {
      const point = new Vector3(x, 0, z).project(rig.camera);
      const screenX = (point.x + 1) * width! / 2;
      const screenY = (1 - point.y) * height! / 2;
      assert.ok(screenX >= insets.left && screenX <= width! - insets.right);
      assert.ok(screenY >= insets.top && screenY <= height! - insets.bottom);
    }
    assert.ok(rig.camera.zoom > 0 && rig.camera.zoom <= 1.6);
  }
});

test('reduced motion applies framing instantly; reset restores broad vessel framing', () => {
  const rig = setup();
  rig.setReducedMotion(true);
  const zoom = rig.camera.zoom;
  rig.update(30, 20, 1);
  assert.equal(rig.camera.zoom, zoom);
  rig.setLocalTarget(null);
  rig.snapTo(0, 0);
  assert.equal(rig.camera.zoom, 1);
  assert.deepEqual(rig.camera.position.toArray(), [220, 220, 220]);
});

test('zero time freezes transitions; invalid geometry remains finite; disposal freezes rig', () => {
  const rig = setup();
  const before = rig.camera.position.clone();
  rig.update(100, 100, 0);
  assert.ok(rig.camera.position.equals(before));
  rig.resize(NaN, 0);
  rig.setFramingInsets({ left: Infinity, top: 100000, right: 100000 });
  rig.setReducedMotion(true);
  assert.ok(rig.camera.position.toArray().every(Number.isFinite));
  assert.ok(Number.isFinite(rig.camera.zoom) && rig.camera.zoom > 0);
  const position = rig.camera.position.clone();
  const zoom = rig.camera.zoom;
  rig.dispose();
  rig.update(0, 0, 1);
  rig.setLocalTarget(null);
  rig.snapTo(0, 0);
  rig.resize(1200, 800);
  assert.ok(rig.camera.position.equals(position));
  assert.equal(rig.camera.zoom, zoom);
});
