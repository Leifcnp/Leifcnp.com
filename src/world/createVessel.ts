import * as THREE from 'three';
import { sampleFacetedWaterHeight } from './waterSurfaceGrid.ts';
import { VESSEL_TUNING, type VesselState } from './vessel/kinematics.ts';
import {
  calculateVesselPose,
  sampleVesselSurface,
  VESSEL_POSE_TUNING,
} from './vessel/pose.ts';
import {
  calculateHullSupport,
  sampleVesselWaterContact,
  type VesselContactHistory,
  type VesselWaterContact,
} from './vessel/hullContact.ts';

export interface VesselPose {
  readonly heave: number;
  readonly pitch: number;
  readonly roll: number;
}

export interface VesselController {
  readonly group: THREE.Group;
  update(state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void;
  resetPose(state: Readonly<VesselState>, timeSeconds?: number): void;
  setReducedMotion(reduced: boolean): void;
  setSailAngle(signedRadians: number, snap?: boolean): void;
  setSailLoad(power: number, relativeWindAngle: number): void;
  getWaterContact(): Readonly<VesselWaterContact>;
  getSailAngle(): number;
  getPose(): Readonly<VesselPose>;
  dispose(): void;
}

const VESSEL_LENGTH = VESSEL_TUNING.length;
const VESSEL_WIDTH = VESSEL_TUNING.width;
const WATER_CLEARANCE = 0.2;
const SAIL_MIN_ANGLE = 8 * Math.PI / 180;
const SAIL_MAX_ANGLE = 85 * Math.PI / 180;
const SAIL_SMOOTHING_RATE = 9;
const SAIL_RIG_PIVOT_Z = -0.34;
// Bound sudden tack/wave combinations without slowing ordinary water response.
const MAX_TILT_RATE = 3;

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
    registerGeometry(new THREE.CylinderGeometry(0.085, 0.12, 5.45, 6)),
    riggingMaterial,
  );
  mast.name = 'vessel-mast';
  mast.position.set(0, 3.19, -0.34);
  group.add(mast);

  const sailRig = new THREE.Group();
  sailRig.name = 'sail-rig';
  sailRig.position.set(0, 0, SAIL_RIG_PIVOT_Z);
  group.add(sailRig);

  // The authored geometry is specified in vessel-local coordinates. Moving a
  // child under the mast pivot therefore needs the inverse pivot translation
  // to preserve the neutral world-space pose exactly.
  const attachToSailRig = (mesh: THREE.Mesh): void => {
    mesh.position.z -= SAIL_RIG_PIVOT_Z;
    sailRig.add(mesh);
  };

  const boom = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.06, 0.075, 3.1, 6)),
    registerMaterial(new THREE.MeshStandardMaterial({
      color: 0xf06f68,
      roughness: 0.64,
      metalness: 0,
      flatShading: true,
    })),
  );
  boom.name = 'vessel-main-boom';
  boom.rotation.x = Math.PI * 0.5;
  boom.position.set(0, 2.04, -1.895);
  attachToSailRig(boom);

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
    registerGeometry(createCamberedSailGeometry(
      0.055,
      -0.6,
      [
        [5.8, -0.39],
        [2.0, -0.39],
        [2.08, -3.4],
        [3.3, -1.52],
      ],
    )),
    sailMaterial,
  );
  mainSail.name = 'vessel-cream-mainsail';
  attachToSailRig(mainSail);

  const mainSailShade = new THREE.Mesh(
    registerGeometry(createCamberedSailGeometry(
      0.062,
      -0.42,
      [
        [5.76, -0.41],
        [2.02, -0.41],
        [2.08, -2.74],
        [3.28, -1.28],
      ],
    )),
    sailShadeMaterial,
  );
  mainSailShade.name = 'vessel-mainsail-facet';
  attachToSailRig(mainSailShade);

  const coralMaterial = registerMaterial(new THREE.MeshStandardMaterial({
    color: 0xf06f68,
    roughness: 0.64,
    metalness: 0,
    side: THREE.DoubleSide,
    flatShading: true,
  }));
  const clewAccent = new THREE.Mesh(
    registerGeometry(createTriangleGeometry([
      0.073, 2.08, -0.48,
      0.073, 2.12, -3.05,
      0.073, 2.38, -2.78,
    ])),
    coralMaterial,
  );
  clewAccent.name = 'vessel-coral-main-clew';
  attachToSailRig(clewAccent);

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
  let reducedMotion = false;
  let sailAngle = SAIL_MAX_ANGLE;
  let sailAngleTarget = SAIL_MAX_ANGLE;
  let sailPower = 0;
  let relativeWindAngle = 0;
  let contact: VesselWaterContact = {
    bowPort: { x: 0, y: 0, z: 0, waterHeight: 0, clearance: 0, closingSpeed: 0 },
    bowStarboard: { x: 0, y: 0, z: 0, waterHeight: 0, clearance: 0, closingSpeed: 0 },
    leewardRail: { x: 0, y: 0, z: 0, waterHeight: 0, clearance: 0, closingSpeed: 0 },
    leewardSide: 'starboard',
    heelLoad: 0,
    sailPower: 0,
    relativeWindAngle: 0,
    forwardSpeed: 0,
  };
  let contactHistory: VesselContactHistory | undefined;
  let disposed = false;

  const normalizeSailAngle = (signedRadians: number): number => {
    if (!Number.isFinite(signedRadians)) return SAIL_MAX_ANGLE;
    const sign = signedRadians < 0 ? -1 : 1;
    const magnitude = Math.min(SAIL_MAX_ANGLE, Math.max(SAIL_MIN_ANGLE, Math.abs(signedRadians)));
    return sign * magnitude;
  };

  const updateSailRig = (deltaSeconds: number, snap: boolean): void => {
    const validDelta = Number.isFinite(deltaSeconds) && deltaSeconds > 0
      ? Math.min(deltaSeconds, 0.25)
      : 0;
    const smoothing = snap || reducedMotion
      ? 1
      : 1 - Math.exp(-validDelta * SAIL_SMOOTHING_RATE);
    sailAngle = approach(sailAngle, sailAngleTarget, smoothing);
    sailRig.rotation.y = sailAngle;
    // Mirror the shallow authored belly when trim changes tack so the visible
    // fullness stays on the leeward side of the rotating mainsail.
    sailRig.scale.x = sailAngle < 0 ? -1 : 1;
  };

  const updatePose = (
    state: Readonly<VesselState>,
    timeSeconds: number,
    deltaSeconds: number,
    snap: boolean,
  ): void => {
    const safeTime = Number.isFinite(timeSeconds) ? timeSeconds : 0;
    const surface = sampleVesselSurface(
      state.x,
      state.z,
      state.heading,
      VESSEL_LENGTH,
      VESSEL_WIDTH,
      (worldX, worldZ) => ({ height: sampleFacetedWaterHeight(worldX, worldZ, safeTime) }),
    );
    const forwardSpeed = state.velocityX * Math.sin(state.heading) + state.velocityZ * Math.cos(state.heading);
    const target = calculateVesselPose(
      surface,
      {
        forwardSpeed,
        yawRate: state.yawRate,
        sailPower,
        relativeWindAngle,
      },
      reducedMotion,
    );
    const validDelta = Number.isFinite(deltaSeconds) && deltaSeconds > 0 ? Math.min(deltaSeconds, 0.25) : 0;
    const heaveSmoothing = snap ? 1 : 1 - Math.exp(-validDelta * VESSEL_POSE_TUNING.heaveResponseRate);
    const tiltSmoothing = snap ? 1 : 1 - Math.exp(-validDelta * VESSEL_POSE_TUNING.tiltResponseRate);
    const tilt = (current: number, destination: number): number => {
      const filtered = approach(current, destination, tiltSmoothing);
      if (snap) return filtered;
      return current + Math.max(-MAX_TILT_RATE * validDelta, Math.min(
        MAX_TILT_RATE * validDelta, filtered - current,
      ));
    };
    pose.pitch = tilt(pose.pitch, target.pitch);
    pose.roll = tilt(pose.roll, target.roll);
    const basePose = { ...pose, heave: target.heave };
    const effectiveSailPower = reducedMotion ? 0 : sailPower;
    const preliminaryContact = sampleVesselWaterContact(
      state.x,
      state.z,
      state.heading,
      basePose,
      VESSEL_LENGTH,
      VESSEL_WIDTH,
      WATER_CLEARANCE,
      forwardSpeed,
      safeTime,
      (worldX, worldZ) => sampleFacetedWaterHeight(worldX, worldZ, safeTime),
      snap ? undefined : contactHistory,
      effectiveSailPower,
      relativeWindAngle,
    );
    const support = calculateHullSupport(
      preliminaryContact.contact,
      basePose,
      WATER_CLEARANCE,
      (worldX, worldZ) => sampleFacetedWaterHeight(worldX, worldZ, safeTime),
      state.x,
      state.z,
      state.heading,
    );
    pose.heave = Math.min(support.maximumHeave, Math.max(
      support.minimumHeave,
      approach(pose.heave, support.targetHeave, heaveSmoothing),
    ));
    const waterContact = sampleVesselWaterContact(
      state.x,
      state.z,
      state.heading,
      pose,
      VESSEL_LENGTH,
      VESSEL_WIDTH,
      WATER_CLEARANCE,
      forwardSpeed,
      safeTime,
      (worldX, worldZ) => sampleFacetedWaterHeight(worldX, worldZ, safeTime),
      snap ? undefined : contactHistory,
      effectiveSailPower,
      relativeWindAngle,
    );
    contact = waterContact.contact;
    contactHistory = waterContact.history;
    group.position.set(
      Number.isFinite(state.x) ? state.x : 0,
      pose.heave + WATER_CLEARANCE,
      Number.isFinite(state.z) ? state.z : 0,
    );
    group.rotation.y = Number.isFinite(state.heading) ? state.heading : 0;
    group.rotation.x = pose.pitch;
    group.rotation.z = pose.roll;
    updateSailRig(deltaSeconds, snap);
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
      contactHistory = undefined;
      updatePose(state, timeSeconds, 0, true);
    },
    setReducedMotion: (reduced): void => {
      if (disposed) return;
      reducedMotion = reduced === true;
      if (reducedMotion) updateSailRig(0, true);
    },
    setSailAngle: (signedRadians, snap = false): void => {
      if (disposed) return;
      sailAngleTarget = normalizeSailAngle(signedRadians);
      updateSailRig(0, snap);
    },
    setSailLoad: (power, windAngle): void => {
      if (disposed) return;
      sailPower = Number.isFinite(power) ? Math.min(1, Math.max(0, power)) : 0;
      relativeWindAngle = Number.isFinite(windAngle) ? windAngle : 0;
    },
    getSailAngle: (): number => sailAngle,
    getWaterContact: (): Readonly<VesselWaterContact> => ({
      ...contact,
      bowPort: { ...contact.bowPort },
      bowStarboard: { ...contact.bowStarboard },
      leewardRail: { ...contact.leewardRail },
    }),
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

function createCamberedSailGeometry(
  outerX: number,
  bellyX: number,
  points: readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]],
): THREE.BufferGeometry {
  const [head, tack, clew, belly] = points;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    outerX, head[0], head[1],
    outerX, tack[0], tack[1],
    outerX, clew[0], clew[1],
    bellyX, belly[0], belly[1],
  ], 3));
  // A shared interior vertex gives the sail three broad low-poly facets while
  // retaining the authored mast, tack, and clew silhouette at its edges.
  geometry.setIndex([0, 1, 3, 1, 2, 3, 2, 0, 3]);
  geometry.computeVertexNormals();
  return geometry;
}

function approach(current: number, target: number, amount: number): number {
  return current + (target - current) * Math.min(1, Math.max(0, amount));
}
