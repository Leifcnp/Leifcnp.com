import * as THREE from 'three';
import type { IslandDefinition } from '../content/islands';
export type { IslandDefinition } from '../content/islands';

export interface LandmarkProjectionAnchor {
  readonly id: string;
  readonly position: THREE.Vector3;
}

export interface LandmarkBounds {
  readonly id: string;
  readonly bounds: THREE.Box3;
}

export interface LandmarksController {
  readonly group: THREE.Group;
  readonly anchors: readonly LandmarkProjectionAnchor[];
  /** Per-island world-space bounds, preserving the empty space between islands. */
  readonly landmarkBounds: readonly LandmarkBounds[];
  dispose(): void;
}

const WATER_SURFACE_CLEARANCE = 0.18;
const LAND_BASE_Y = 1.42;

/**
 * Build the phase-two island set from serialisable records.  Geometry remains
 * intentionally primitive: sand shelves, faceted landforms, a few rock
 * facets, and a thin dashed cream docking boundary for each island.
 */
export function createLandmarks(
  scene: THREE.Scene,
  islands: readonly IslandDefinition[],
): LandmarksController {
  const group = new THREE.Group();
  group.name = 'phase-two-landmarks';
  scene.add(group);

  const resources: Array<THREE.BufferGeometry | THREE.Material> = [];
  const anchors: LandmarkProjectionAnchor[] = [];
  const landmarkGroups: Array<{ id: string; group: THREE.Group }> = [];

  islands.forEach((island, index) => {
    const landmark = createIsland(island, index, resources);
    group.add(landmark.group);
    landmarkGroups.push({ id: island.id, group: landmark.group });
    anchors.push({
      id: island.id,
      position: landmark.anchor.clone().add(
        new THREE.Vector3(island.position.x, 0, island.position.z),
      ),
    });
  });

  // Compute this once after all transforms are in place. The water world uses
  // the real generated bounds for orthographic framing, including the tallest
  // low-poly peak and every docking-ring point.
  group.updateMatrixWorld(true);
  const landmarkBounds = landmarkGroups.map(({ id, group: landmarkGroup }) => ({
    id,
    bounds: new THREE.Box3().setFromObject(landmarkGroup),
  }));

  let disposed = false;
  return {
    group,
    anchors,
    landmarkBounds,
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      for (const resource of resources) resource.dispose();
      group.removeFromParent();
      group.clear();
    },
  };
}

interface IslandParts {
  group: THREE.Group;
  anchor: THREE.Vector3;
}

function createIsland(
  island: IslandDefinition,
  index: number,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): IslandParts {
  const radius = island.landCollisionRadius;
  const outerRadius = island.dockingTriggerRadius;
  const group = new THREE.Group();
  group.name = island.id;
  group.userData = {
    islandId: island.id,
    landCollisionRadius: island.landCollisionRadius,
    dockingTriggerRadius: island.dockingTriggerRadius,
  };
  group.position.set(island.position.x, 0, island.position.z);

  const sandMaterial = registerMaterial(
    new THREE.MeshStandardMaterial({
      color: island.palette.sand,
      roughness: 0.9,
      metalness: 0,
      flatShading: true,
    }),
    resources,
  );
  const landMaterial = registerMaterial(
    new THREE.MeshStandardMaterial({
      color: island.palette.land,
      roughness: 0.92,
      metalness: 0,
      flatShading: true,
    }),
    resources,
  );
  const rockMaterial = registerMaterial(
    new THREE.MeshStandardMaterial({
      color: island.palette.rock,
      roughness: 0.96,
      metalness: 0,
      flatShading: true,
    }),
    resources,
  );

  const sandGeometry = registerGeometry(
    new THREE.CylinderGeometry(
      radius * 0.78,
      radius * 0.98,
      0.48,
      10,
      1,
      false,
    ),
    resources,
  );
  const sand = new THREE.Mesh(sandGeometry, sandMaterial);
  sand.name = 'sand-shelf';
  sand.position.y = LAND_BASE_Y + 0.24;
  group.add(sand);

  const landBase = LAND_BASE_Y + 0.48;
  addLandform(group, island, index, landBase, radius, landMaterial, resources);
  addRockFacets(group, island, index, radius, rockMaterial, resources);
  const ring = createDockingRing(outerRadius, resources);
  ring.position.y = LAND_BASE_Y + WATER_SURFACE_CLEARANCE;
  group.add(ring);

  // Put DOM labels near the camera-facing foot of each island.  The offset is
  // intentionally inside the docking ring so labels can sit in the open water
  // gap between the landmass and the ring without colliding with geometry.
  const facingOffset = radius * 0.82;
  const anchor = new THREE.Vector3(facingOffset, LAND_BASE_Y + 0.12, facingOffset);
  return { group, anchor };
}

function addLandform(
  group: THREE.Group,
  island: IslandDefinition,
  index: number,
  baseY: number,
  radius: number,
  material: THREE.Material,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): void {
  const heading = ((index * 37) % 90) * (Math.PI / 180);
  const height = Math.max(1.35, radius * 0.34);

  if (island.landform === 'twin-peaks') {
    const geometry = registerGeometry(
      new THREE.ConeGeometry(radius * 0.38, height * 1.12, 6, 1, false),
      resources,
    );
    for (const [x, z, scale] of [
      [-radius * 0.24, radius * 0.05, 0.92],
      [radius * 0.24, -radius * 0.04, 0.78],
    ] as const) {
      const peak = new THREE.Mesh(geometry, material);
      peak.name = 'landform-twin-peak';
      peak.position.set(x, baseY + (height * scale) / 2, z);
      peak.scale.set(scale, scale, scale);
      peak.rotation.y = heading;
      group.add(peak);
    }
    return;
  }

  if (island.landform === 'ridge') {
    const geometry = registerGeometry(
      new THREE.ConeGeometry(radius * 0.68, height * 0.86, 7, 1, false),
      resources,
    );
    const ridge = new THREE.Mesh(geometry, material);
    ridge.name = 'landform-ridge';
    ridge.position.y = baseY + height * 0.43;
    ridge.scale.set(1.35, 1, 0.58);
    ridge.rotation.y = heading;
    group.add(ridge);
    return;
  }

  if (island.landform === 'mesa') {
    const geometry = registerGeometry(
      new THREE.CylinderGeometry(
        radius * 0.54,
        radius * 0.76,
        height * 0.9,
        7,
        1,
        false,
      ),
      resources,
    );
    const mesa = new THREE.Mesh(geometry, material);
    mesa.name = 'landform-mesa';
    mesa.position.y = baseY + height * 0.45;
    mesa.rotation.y = heading;
    group.add(mesa);
    return;
  }

  const geometry = registerGeometry(
    new THREE.IcosahedronGeometry(radius * 0.63, 1),
    resources,
  );
  const mound = new THREE.Mesh(geometry, material);
  mound.name = 'landform-mound';
  mound.position.y = baseY + height * 0.42;
  mound.scale.set(1.05, 0.58, 0.9);
  mound.rotation.y = heading;
  group.add(mound);
}

function addRockFacets(
  group: THREE.Group,
  island: IslandDefinition,
  index: number,
  radius: number,
  material: THREE.Material,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): void {
  const geometry = registerGeometry(new THREE.DodecahedronGeometry(radius * 0.13, 0), resources);
  const rockCount = island.landform === 'twin-peaks' ? 4 : 3;
  for (let rockIndex = 0; rockIndex < rockCount; rockIndex += 1) {
    const angle = (index * 1.9 + rockIndex * 2.1) % (Math.PI * 2);
    const distance = radius * (0.48 + rockIndex * 0.08);
    const rock = new THREE.Mesh(geometry, material);
    rock.name = 'rock-facet';
    rock.position.set(
      Math.cos(angle) * distance,
      LAND_BASE_Y + 0.55 + (rockIndex % 2) * 0.14,
      Math.sin(angle) * distance,
    );
    rock.scale.set(1, 0.8 + (rockIndex % 2) * 0.25, 0.8);
    rock.rotation.set(0.2 * rockIndex, angle, 0.1 * index);
    group.add(rock);
  }
}

function createDockingRing(
  radius: number,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): THREE.Line {
  const points: THREE.Vector3[] = [];
  const segments = 96;
  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = registerGeometry(new THREE.BufferGeometry().setFromPoints(points), resources);
  const material = registerMaterial(
    new THREE.LineDashedMaterial({
      color: 0xf4efe4,
      dashSize: 0.72,
      gapSize: 0.48,
      transparent: true,
      opacity: 0.9,
      depthTest: false,
      depthWrite: false,
    }),
    resources,
  );
  const ring = new THREE.Line(geometry, material);
  ring.name = 'docking-boundary';
  ring.userData = { dockingTriggerRadius: radius };
  ring.computeLineDistances();
  ring.renderOrder = 4;
  return ring;
}

function registerGeometry<T extends THREE.BufferGeometry>(
  geometry: T,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): T {
  resources.push(geometry);
  return geometry;
}

function registerMaterial<T extends THREE.Material>(
  material: T,
  resources: Array<THREE.BufferGeometry | THREE.Material>,
): T {
  resources.push(material);
  return material;
}
