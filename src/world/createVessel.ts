import * as THREE from 'three';
import { sampleWaterSurface } from './waves';
import { VESSEL_TUNING, type VesselState } from './vessel/kinematics';

export interface VesselPose {
  readonly heave: number;
  readonly pitch: number;
  readonly roll: number;
}

export interface VesselController {
  readonly group: THREE.Group;
  update(state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void;
  resetPose(state: Readonly<VesselState>, timeSeconds?: number): void;
  getPose(): Readonly<VesselPose>;
  dispose(): void;
}

const VESSEL_LENGTH = VESSEL_TUNING.length;
const VESSEL_WIDTH = VESSEL_TUNING.width;
const VESSEL_HEIGHT = VESSEL_TUNING.height;
const SAMPLE_OFFSET = 0.35;
const WATER_CLEARANCE = 0.2;

/**
 * Build the deliberately temporary Phase 3 vessel. The local +Z direction is
 * the bow, which keeps the visible coral triangle and kinematic heading in the
 * same convention.
 */
export function createVessel(scene: THREE.Scene): VesselController {
  const group = new THREE.Group();
  group.name = 'phase-three-vessel';
  group.rotation.order = 'YXZ';

  const bodyGeometry = new THREE.BoxGeometry(VESSEL_WIDTH, VESSEL_HEIGHT, VESSEL_LENGTH);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xf4efe4,
    roughness: 0.72,
    metalness: 0,
    flatShading: true,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.name = 'vessel-cream-block';
  group.add(body);

  const bowGeometry = createBowMarkerGeometry(VESSEL_WIDTH * 0.8, VESSEL_LENGTH * 0.44);
  const bowMaterial = new THREE.MeshStandardMaterial({
    color: 0xf06f68,
    roughness: 0.58,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  const bow = new THREE.Mesh(bowGeometry, bowMaterial);
  bow.name = 'vessel-coral-bow';
  bow.position.z = VESSEL_LENGTH * 0.22;
  bow.position.y = VESSEL_HEIGHT * 0.5 + 0.025;
  group.add(bow);

  const pose = { heave: 0, pitch: 0, roll: 0 };
  let disposed = false;

  const updatePose = (
    state: Readonly<VesselState>,
    timeSeconds: number,
    deltaSeconds: number,
    snap: boolean,
  ): void => {
    const surface = sampleVesselSurface(state.x, state.z, state.heading, timeSeconds);
    const smoothing = snap ? 1 : 1 - Math.exp(-Math.max(0, deltaSeconds) * 7.5);
    pose.heave = approach(pose.heave, surface.heave, smoothing);
    pose.pitch = approach(pose.pitch, surface.pitch, smoothing);
    pose.roll = approach(pose.roll, surface.roll, smoothing);

    // Keep the proxy partly submerged: the block center sits just above the
    // sampled surface, while its lower half remains visibly in the water.
    group.position.set(state.x, pose.heave + WATER_CLEARANCE, state.z);
    group.rotation.y = state.heading;
    group.rotation.x = pose.pitch;
    group.rotation.z = pose.roll;
  };

  scene.add(group);
  return {
    group,
    update: (state, timeSeconds, deltaSeconds): void => {
      if (disposed) return;
      updatePose(state, timeSeconds, deltaSeconds, false);
    },
    resetPose: (state, timeSeconds = 0): void => {
      if (disposed) return;
      updatePose(state, timeSeconds, 0, true);
    },
    getPose: (): Readonly<VesselPose> => ({ ...pose }),
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      bowGeometry.dispose();
      bowMaterial.dispose();
      group.removeFromParent();
      group.clear();
    },
  };
}

function createBowMarkerGeometry(width: number, length: number): THREE.BufferGeometry {
  const halfWidth = width * 0.5;
  const halfLength = length * 0.5;
  // A flat, high-contrast triangle on the cream block. Its point is local +Z.
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute([
      -halfWidth, 0, -halfLength,
      halfWidth, 0, -halfLength,
      0, 0, halfLength,
    ], 3),
  );
  geometry.setIndex([0, 1, 2]);
  geometry.computeVertexNormals();
  return geometry;
}

interface VesselSurface {
  readonly heave: number;
  readonly pitch: number;
  readonly roll: number;
}

function sampleVesselSurface(
  x: number,
  z: number,
  heading: number,
  timeSeconds: number,
): VesselSurface {
  const samples = [
    sampleAt(x, z, heading, 0, VESSEL_LENGTH * 0.5, timeSeconds),
    sampleAt(x, z, heading, 0, -VESSEL_LENGTH * 0.5, timeSeconds),
    sampleAt(x, z, heading, -VESSEL_WIDTH * 0.5, 0, timeSeconds),
    sampleAt(x, z, heading, VESSEL_WIDTH * 0.5, 0, timeSeconds),
  ];
  const bow = samples[0];
  const stern = samples[1];
  const port = samples[2];
  const starboard = samples[3];
  return {
    heave: samples.reduce((sum, sample) => sum + sample.height, 0) / samples.length,
    // Three.js positive X rotation lowers local +Z; invert the longitudinal
    // slope so a high bow visually rises with the wave.
    pitch: -Math.atan2(bow.height - stern.height, VESSEL_LENGTH),
    roll: Math.atan2(starboard.height - port.height, VESSEL_WIDTH),
  };
}

function sampleAt(
  x: number,
  z: number,
  heading: number,
  localX: number,
  localZ: number,
  timeSeconds: number,
): ReturnType<typeof sampleWaterSurface> {
  const cos = Math.cos(heading);
  const sin = Math.sin(heading);
  const worldX = x + localX * cos + localZ * sin;
  const worldZ = z - localX * sin + localZ * cos;
  return sampleWaterSurface(worldX, worldZ, timeSeconds, SAMPLE_OFFSET);
}

function approach(current: number, target: number, amount: number): number {
  return current + (target - current) * Math.min(1, Math.max(0, amount));
}
