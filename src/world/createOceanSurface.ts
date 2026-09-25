import * as THREE from 'three';
import {
  MAX_WAVE_HEIGHT,
  PRIMARY_WAVE,
  sampleCrossingWavePhase,
  samplePrimaryWavePhase,
  sampleWaterHeight,
  sampleWaterSurface,
} from './waves.ts';

export interface OceanSurfaceController {
  readonly mesh: THREE.Mesh;
  readonly crestMesh: THREE.Mesh;
  update(timeSeconds: number): void;
  dispose(): void;
}

/**
 * Adaptive low-poly ocean surface. The playable square has four-unit cells;
 * three broad outer bands keep the water visible around the camera footprint
 * without paying central-grid density across the full 720-unit field.
 */
export const OCEAN_SURFACE_TUNING = {
  centralLimit: 180,
  outerLimit: 360,
  centralStep: 4,
  outerStep: 12,
} as const;

const TROUGHS = [0.012, 0.16, 0.23] as const;
const MID_WATER = [0.018, 0.31, 0.4] as const;
const CRESTS = [0.045, 0.43, 0.5] as const;
const FOAM = [0.34, 0.58, 0.56] as const;

/** Create and own the shared animated low-poly water mesh. */
export function createOceanSurface(scene: THREE.Scene): OceanSurfaceController {
  const axes = createAdaptiveAxis();
  const vertexCount = axes.length * axes.length;
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const indices: number[] = [];
  const coordinates: Array<readonly [number, number]> = [];

  let vertex = 0;
  for (let row = 0; row < axes.length; row += 1) {
    for (let column = 0; column < axes.length; column += 1) {
      const x = axes[column];
      const z = axes[row];
      coordinates.push([x, z]);
      positions[vertex * 3] = x;
      positions[vertex * 3 + 1] = 0;
      positions[vertex * 3 + 2] = z;
      vertex += 1;
    }
  }

  const side = axes.length;
  for (let row = 0; row < side - 1; row += 1) {
    for (let column = 0; column < side - 1; column += 1) {
      const topLeft = row * side + column;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + side;
      const bottomRight = bottomLeft + 1;
      if ((row + column) % 2 === 0) {
        indices.push(topLeft, bottomLeft, topRight, topRight, bottomLeft, bottomRight);
      } else {
        indices.push(topLeft, bottomLeft, bottomRight, topLeft, bottomRight, topRight);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  const colorAttribute = new THREE.BufferAttribute(colors, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  colorAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttribute);
  geometry.setAttribute('color', colorAttribute);
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.08,
    flatShading: true,
    vertexColors: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'phase-one-water-field';
  scene.add(mesh);

  const crestRibbons = createCrestRibbons();
  scene.add(crestRibbons.mesh);

  let disposed = false;
  const update = (timeSeconds: number): void => {
    if (disposed) return;
    const time = Number.isFinite(timeSeconds) ? timeSeconds : 0;
    const position = geometry.getAttribute('position') as THREE.BufferAttribute;
    const color = geometry.getAttribute('color') as THREE.BufferAttribute;
    for (let index = 0; index < coordinates.length; index += 1) {
      const [x, z] = coordinates[index];
      const sample = sampleWaterSurface(x, z, time);
      position.setY(index, sample.height);
      setWaterColor(color, index, sample.height, sample.slopeX, sample.slopeZ);
    }
    position.needsUpdate = true;
    color.needsUpdate = true;
    crestRibbons.update(time);
  };

  update(0);
  return {
    mesh,
    crestMesh: crestRibbons.mesh,
    update,
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      geometry.dispose();
      material.dispose();
      mesh.removeFromParent();
      crestRibbons.dispose();
    },
  };
}

interface CrestRibbonController {
  readonly mesh: THREE.Mesh;
  update(timeSeconds: number): void;
  dispose(): void;
}

interface CrestRibbonDescriptor {
  readonly normalIndex: number;
  readonly tangentCenter: number;
  readonly activity: number;
}

/**
 * A single pooled draw of short primary-crest ribbons. Their normal position
 * is solved from the same travelling-wave phase as the water sampler, so they
 * cannot drift into a second animation. Inactive descriptors remain in the
 * fixed pool with zero opacity, preserving bounded buffers and draw cost.
 */
function createCrestRibbons(): CrestRibbonController {
  const normalX = PRIMARY_WAVE.directionX;
  const normalZ = PRIMARY_WAVE.directionZ;
  const tangentX = -normalZ;
  const tangentZ = normalX;
  const normalScale = 1 / (normalX * normalX + normalZ * normalZ);
  const tangentScale = 1 / (tangentX * tangentX + tangentZ * tangentZ);
  const halfLength = 4;
  const halfWidth = 0.24;
  const tangentStep = 44;
  const tangentExtent = OCEAN_SURFACE_TUNING.outerLimit * (Math.abs(tangentX) + Math.abs(tangentZ));
  const normalExtent = OCEAN_SURFACE_TUNING.outerLimit * (Math.abs(normalX) + Math.abs(normalZ));
  const minimumNormalIndex = Math.ceil((-
    normalExtent * PRIMARY_WAVE.waveNumber - Math.PI * 0.5
  ) / (Math.PI * 2)) - 1;
  const maximumNormalIndex = Math.floor((
    normalExtent * PRIMARY_WAVE.waveNumber - Math.PI * 0.5
  ) / (Math.PI * 2)) + 1;
  const crestWavelength = (Math.PI * 2) / PRIMARY_WAVE.waveNumber;
  const crestBandStart = (
    Math.PI * 0.5 + minimumNormalIndex * Math.PI * 2
  ) / PRIMARY_WAVE.waveNumber;
  const crestBandSpan = (maximumNormalIndex - minimumNormalIndex + 1) * crestWavelength;
  const descriptors: CrestRibbonDescriptor[] = [];
  for (let normalIndex = minimumNormalIndex; normalIndex <= maximumNormalIndex; normalIndex += 1) {
    let segmentIndex = 0;
    for (let tangentCenter = -tangentExtent; tangentCenter <= tangentExtent; tangentCenter += tangentStep) {
      descriptors.push({
        normalIndex,
        tangentCenter,
        activity: hash2d(normalIndex * 31 + segmentIndex * 17 + 401, normalIndex * 13 + segmentIndex * 7 + 911),
      });
      segmentIndex += 1;
    }
  }
  const positions = new Float32Array(descriptors.length * 4 * 3);
  const opacities = new Float32Array(descriptors.length * 4);
  const uvs = new Float32Array(descriptors.length * 4 * 2);
  const indices: number[] = [];
  for (let descriptorIndex = 0; descriptorIndex < descriptors.length; descriptorIndex += 1) {
    const first = descriptorIndex * 4;
    indices.push(first, first + 1, first + 2, first, first + 2, first + 3);
    uvs[(first + 0) * 2] = 0;
    uvs[(first + 0) * 2 + 1] = 0;
    uvs[(first + 1) * 2] = 1;
    uvs[(first + 1) * 2 + 1] = 0;
    uvs[(first + 2) * 2] = 1;
    uvs[(first + 2) * 2 + 1] = 1;
    uvs[(first + 3) * 2] = 0;
    uvs[(first + 3) * 2 + 1] = 1;
  }
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(positions, 3);
  const opacity = new THREE.BufferAttribute(opacities, 1);
  position.setUsage(THREE.DynamicDrawUsage);
  opacity.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', position);
  geometry.setAttribute('crestOpacity', opacity);
  geometry.setAttribute('crestUv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {},
    vertexShader: `
      attribute float crestOpacity;
      attribute vec2 crestUv;
      varying float vCrestOpacity;
      varying vec2 vCrestUv;
      void main() {
        vCrestOpacity = crestOpacity;
        vCrestUv = crestUv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vCrestOpacity;
      varying vec2 vCrestUv;
      void main() {
        float endTaper = smoothstep(0.0, 0.24, vCrestUv.x) *
          (1.0 - smoothstep(0.76, 1.0, vCrestUv.x));
        float edgeTaper = smoothstep(0.0, 0.22, vCrestUv.y) *
          (1.0 - smoothstep(0.78, 1.0, vCrestUv.y));
        gl_FragColor = vec4(0.52, 0.75, 0.69, vCrestOpacity * endTaper * edgeTaper);
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'phase-one-water-crest-ribbons';

  let disposed = false;
  const update = (timeSeconds: number): void => {
    if (disposed) return;
    const time = Number.isFinite(timeSeconds) ? timeSeconds : 0;
    const travel = time * PRIMARY_WAVE.angularSpeed / PRIMARY_WAVE.waveNumber;
    for (let descriptorIndex = 0; descriptorIndex < descriptors.length; descriptorIndex += 1) {
      const descriptor = descriptors[descriptorIndex];
      const baseNormal = (
        Math.PI * 0.5 + descriptor.normalIndex * Math.PI * 2
      ) / PRIMARY_WAVE.waveNumber;
      // Recycle only after the whole visible crest band has crossed the
      // boundary. Individual lines therefore travel continuously through a
      // primary-wave period instead of all jumping by one wavelength together.
      const recycledNormal = crestBandStart + positiveModulo(
        baseNormal - travel - crestBandStart,
        crestBandSpan,
      );
      const centerX = normalX * recycledNormal * normalScale + tangentX * descriptor.tangentCenter * tangentScale;
      const centerZ = normalZ * recycledNormal * normalScale + tangentZ * descriptor.tangentCenter * tangentScale;
      const primaryCrest = Math.max(0, Math.sin(samplePrimaryWavePhase(centerX, centerZ, time)));
      const crossingSupport = smoothstep(
        0.42,
        0.9,
        0.5 + 0.5 * Math.cos(sampleCrossingWavePhase(centerX, centerZ, time)),
      );
      const active = descriptor.activity > 0.48 ? 1 : 0;
      const strength = active * primaryCrest * crossingSupport * 0.3;
      const tangentStartX = tangentX * halfLength;
      const tangentStartZ = tangentZ * halfLength;
      const normalOffsetX = normalX * halfWidth;
      const normalOffsetZ = normalZ * halfWidth;
      const vertexBase = descriptorIndex * 4;
      setCrestVertex(position, vertexBase, centerX - tangentStartX - normalOffsetX, centerZ - tangentStartZ - normalOffsetZ, time);
      setCrestVertex(position, vertexBase + 1, centerX + tangentStartX - normalOffsetX, centerZ + tangentStartZ - normalOffsetZ, time);
      setCrestVertex(position, vertexBase + 2, centerX + tangentStartX + normalOffsetX, centerZ + tangentStartZ + normalOffsetZ, time);
      setCrestVertex(position, vertexBase + 3, centerX - tangentStartX + normalOffsetX, centerZ - tangentStartZ + normalOffsetZ, time);
      opacity.setX(vertexBase, strength);
      opacity.setX(vertexBase + 1, strength);
      opacity.setX(vertexBase + 2, strength);
      opacity.setX(vertexBase + 3, strength);
    }
    position.needsUpdate = true;
    opacity.needsUpdate = true;
  };
  update(0);
  return {
    mesh,
    update,
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      geometry.dispose();
      material.dispose();
      mesh.removeFromParent();
    },
  };
}

function setCrestVertex(
  position: THREE.BufferAttribute,
  index: number,
  x: number,
  z: number,
  timeSeconds: number,
): void {
  position.setXYZ(index, x, sampleWaterHeight(x, z, timeSeconds) + 0.045, z);
}

function createAdaptiveAxis(): number[] {
  const values: number[] = [];
  for (let value = -OCEAN_SURFACE_TUNING.outerLimit; value < -OCEAN_SURFACE_TUNING.centralLimit; value += OCEAN_SURFACE_TUNING.outerStep) {
    values.push(value);
  }
  for (let value = -OCEAN_SURFACE_TUNING.centralLimit; value <= OCEAN_SURFACE_TUNING.centralLimit; value += OCEAN_SURFACE_TUNING.centralStep) {
    values.push(value);
  }
  for (let value = OCEAN_SURFACE_TUNING.centralLimit + OCEAN_SURFACE_TUNING.outerStep; value <= OCEAN_SURFACE_TUNING.outerLimit; value += OCEAN_SURFACE_TUNING.outerStep) {
    values.push(value);
  }
  return values;
}

function setWaterColor(
  color: THREE.BufferAttribute,
  index: number,
  height: number,
  slopeX: number,
  slopeZ: number,
): void {
  const normalizedHeight = (height + MAX_WAVE_HEIGHT) / (MAX_WAVE_HEIGHT * 2);
  const baseMix = smoothstep(0.1, 0.52, normalizedHeight);
  const crestMix = smoothstep(0.6, 0.9, normalizedHeight) * 0.52;
  const slope = Math.min(1, Math.hypot(slopeX, slopeZ) * 2.8);
  // Foam is a narrow crest accent, rather than a broad height-based wash.
  // Keeping the water color teal at the crest preserves readable rolling form.
  const foamMix = smoothstep(0.76, 0.96, normalizedHeight) *
    smoothstep(0.24, 0.5, slope) * 0.16;
  const troughRed = TROUGHS[0] + (MID_WATER[0] - TROUGHS[0]) * baseMix;
  const troughGreen = TROUGHS[1] + (MID_WATER[1] - TROUGHS[1]) * baseMix;
  const troughBlue = TROUGHS[2] + (MID_WATER[2] - TROUGHS[2]) * baseMix;
  const waterRed = troughRed + (CRESTS[0] - troughRed) * crestMix;
  const waterGreen = troughGreen + (CRESTS[1] - troughGreen) * crestMix;
  const waterBlue = troughBlue + (CRESTS[2] - troughBlue) * crestMix;
  const red = waterRed + (FOAM[0] - waterRed) * foamMix;
  const green = waterGreen + (FOAM[1] - waterGreen) * foamMix;
  const blue = waterBlue + (FOAM[2] - waterBlue) * foamMix;
  color.setXYZ(index, red, green, blue);
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function hash2d(x: number, y: number): number {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}
