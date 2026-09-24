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
const SAMPLE_OFFSET = 0.35;
const WATER_CLEARANCE = 0.2;

/** Build the owned low-poly Phase 5 sailboat. Local +Z remains the bow. */
export function createVessel(scene: THREE.Scene): VesselController {
  const group = new THREE.Group();
  group.name = 'portfolio-sailboat';
  group.rotation.order = 'YXZ';

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const registerGeometry = <T extends THREE.BufferGeometry>(geometry: T): T => {
    geometries.push(geometry);
    return geometry;
  };
  const registerMaterial = <T extends THREE.Material>(material: T): T => {
    materials.push(material);
    return material;
  };

  const hullMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0xd7c5a3,
    roughness: 0.82,
    metalness: 0,
    flatShading: true,
  }));
  const hull = new THREE.Mesh(
    registerGeometry(createHullGeometry(VESSEL_WIDTH, VESSEL_LENGTH)),
    hullMaterial,
  );
  hull.name = 'vessel-faceted-hull';
  group.add(hull);

  const deckMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0xb87346,
    roughness: 0.82,
    metalness: 0,
    flatShading: true,
  }));
  const deck = new THREE.Mesh(
    registerGeometry(createDeckGeometry(VESSEL_WIDTH, VESSEL_LENGTH)),
    deckMaterial,
  );
  deck.name = 'vessel-warm-wood-deck';
  group.add(deck);

  const cabinMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0x6c4b3e,
    roughness: 0.78,
    metalness: 0,
    flatShading: true,
  }));
  const cabin = new THREE.Mesh(
    registerGeometry(new THREE.BoxGeometry(1.02, 0.32, 0.84)),
    cabinMaterial,
  );
  cabin.name = 'vessel-cockpit-console';
  cabin.position.set(0, 0.63, -0.82);
  group.add(cabin);

  const riggingMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0x4e4c43,
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true,
  }));
  const mast = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.085, 0.12, 4.35, 6)),
    riggingMaterial,
  );
  mast.name = 'vessel-mast';
  mast.position.set(0, 2.64, -0.34);
  group.add(mast);

  const boom = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.055, 0.07, 2.55, 6)),
    riggingMaterial,
  );
  boom.name = 'vessel-main-boom';
  boom.rotation.x = Math.PI * 0.5;
  boom.position.set(0, 2.34, -1.32);
  group.add(boom);

  const bowsprit = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.045, 0.06, 1.58, 6)),
    riggingMaterial,
  );
  bowsprit.name = 'vessel-bowsprit';
  bowsprit.rotation.x = Math.PI * 0.5;
  bowsprit.position.set(0, 0.7, 0.82);
  group.add(bowsprit);

  const sailMaterial = registerMaterial(new THREE.MeshBasicMaterial({
    color: 0xfff7e6,
    side: THREE.DoubleSide,
    toneMapped: false,
  }));
  const sailShadeMaterial = registerMaterial(new THREE.MeshBasicMaterial({
    color: 0xdacdb3,
    side: THREE.DoubleSide,
    toneMapped: false,
  }));
  const mainSail = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      0.055, 4.46, -0.39,
      0.055, 0.74, -0.39,
      0.055, 2.19, -2.22,
    ])),
    sailMaterial,
  );
  mainSail.name = 'vessel-cream-mainsail';
  group.add(mainSail);

  const mainSailShade = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      0.062, 4.43, -0.41,
      0.062, 0.76, -0.41,
      0.062, 2.19, -1.52,
    ])),
    sailShadeMaterial,
  );
  mainSailShade.name = 'vessel-mainsail-facet';
  group.add(mainSailShade);

  const jib = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      0.065, 4.07, -0.2,
      0.065, 0.74, 0.04,
      0.065, 1.7, 2.28,
    ])),
    sailMaterial,
  );
  jib.name = 'vessel-cream-jib';
  group.add(jib);

  const coralMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0xf06f68,
    roughness: 0.64,
    metalness: 0,
    side: THREE.DoubleSide,
    flatShading: true,
  }));
  const jibAccent = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      0.073, 1.54, 0.45,
      0.073, 0.84, 0.17,
      0.073, 1.22, 1.55,
    ])),
    coralMaterial,
  );
  jibAccent.name = 'vessel-coral-jib-accent';
  group.add(jibAccent);

  const bow = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      -0.52, 0.7, 0.96,
      0.52, 0.7, 0.96,
      0, 0.7, 2.18,
    ])),
    coralMaterial,
  );
  bow.name = 'vessel-coral-bow';
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
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      group.removeFromParent();
      group.clear();
    },
  };
}

function createHullGeometry(width: number, length: number): THREE.BufferGeometry {
  const halfWidth = width * 0.5;
  const halfLength = length * 0.5;
  const topY = 0.45;
  const bottomY = -0.55;
  const top = [
    [-halfWidth, topY, -halfLength],
    [halfWidth, topY, -halfLength],
    [halfWidth * 0.9, topY, halfLength * 0.62],
    [0, topY, halfLength],
    [-halfWidth * 0.9, topY, halfLength * 0.62],
  ];
  const bottom = [
    [-halfWidth * 0.68, bottomY, -halfLength * 0.82],
    [halfWidth * 0.68, bottomY, -halfLength * 0.82],
    [halfWidth * 0.45, bottomY, halfLength * 0.52],
    [0, bottomY + 0.18, halfLength * 0.86],
    [-halfWidth * 0.45, bottomY, halfLength * 0.52],
  ];
  const vertices: number[] = [];
  for (const point of top) vertices.push(...point);
  for (const point of bottom) vertices.push(...point);
  vertices.push(0, bottomY - 0.08, -halfLength * 0.12);
  const bottomCenter = 10;
  const indices: number[] = [];
  for (let i = 0; i < 5; i += 1) {
    const next = (i + 1) % 5;
    indices.push(i, next, 5 + next, i, 5 + next, 5 + i);
    indices.push(bottomCenter, 5 + next, 5 + i);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createDeckGeometry(width: number, length: number): THREE.BufferGeometry {
  const halfWidth = width * 0.5 * 0.93;
  const halfLength = length * 0.5 * 0.96;
  const y = 0.47;
  const points = [
    [-halfWidth, y, -halfLength],
    [halfWidth, y, -halfLength],
    [halfWidth * 0.96, y, halfLength * 0.62],
    [0, y, halfLength],
    [-halfWidth * 0.96, y, halfLength * 0.62],
  ];
  const vertices: number[] = [0, y, -0.18];
  const indices: number[] = [];
  for (const point of points) vertices.push(...point);
  for (let i = 0; i < points.length; i += 1) {
    const next = (i + 1) % points.length;
    // Reverse the perimeter order so the deck faces upward (+Y). This is a
    // deliberate winding guard: the camera views the boat from above and the
    // deck material uses back-face culling.
    indices.push(0, next + 1, i + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  assertDeckFacesUpward(geometry);
  return geometry;
}

function assertDeckFacesUpward(geometry: THREE.BufferGeometry): void {
  const position = geometry.getAttribute('position');
  const index = geometry.getIndex();
  if (!index || index.count < 3) throw new Error('Vessel deck needs indexed faces');
  const a = index.getX(0);
  const b = index.getX(1);
  const c = index.getX(2);
  const abx = position.getX(b) - position.getX(a);
  const abz = position.getZ(b) - position.getZ(a);
  const acx = position.getX(c) - position.getX(a);
  const acz = position.getZ(c) - position.getZ(a);
  const normalY = abz * acx - abx * acz;
  if (!(normalY > 0)) throw new Error('Vessel deck faces downward');
}

function createTriangleGeometry(points: readonly number[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([...points], 3));
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
  const bow = sampleAt(x, z, heading, 0, VESSEL_LENGTH * 0.5, timeSeconds);
  const stern = sampleAt(x, z, heading, 0, -VESSEL_LENGTH * 0.5, timeSeconds);
  const port = sampleAt(x, z, heading, -VESSEL_WIDTH * 0.5, 0, timeSeconds);
  const starboard = sampleAt(x, z, heading, VESSEL_WIDTH * 0.5, 0, timeSeconds);
  return {
    heave: (bow.height + stern.height + port.height + starboard.height) * 0.25,
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
