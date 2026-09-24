import * as THREE from 'three';

/**
 * Return the water height at a world-space position.
 *
 * The input time is measured in seconds. Keeping this function deterministic
 * makes it useful later for buoyancy and vessel heave calculations.
 */
export function sampleWaterHeight(x: number, z: number, timeSeconds = 0): number {
  const time = timeSeconds;
  const longSwell = Math.sin(x * 0.075 + time * 0.42) * 0.62;
  const crossSwell = Math.cos(z * 0.1 - time * 0.32) * 0.38;
  const diagonalRipple = Math.sin((x + z) * 0.16 + time * 0.56) * 0.16;
  const counterRipple = Math.cos((x - z) * 0.21 - time * 0.44) * 0.08;

  return longSwell + crossSwell + diagonalRipple + counterRipple;
}

export interface WaterWorldOptions {
  /** Start paused when true. The host can explicitly resume with setPaused(false). */
  reducedMotion?: boolean;
}

export interface WaterWorldController {
  setPaused(paused: boolean): void;
  dispose(): void;
}

// The extra margin keeps the finite geometry beyond the viewport on wide
// displays while retaining the same orthographic isometric framing.
const FIELD_SIZE = 360;
const FIELD_SEGMENTS = 76;
const VIEW_HEIGHT = 94;
const MAX_DPR = 1.75;

/**
 * Create the empty Phase 1 water field and its true isometric camera.
 *
 * The scene deliberately contains no content beyond the tessellated water,
 * lighting, and background. Later phases can build on this module only after
 * this foundation is reviewed.
 */
export function createWaterWorld(
  container: HTMLElement,
  options: WaterWorldOptions = {},
): WaterWorldController {
  const initialReducedMotion =
    options.reducedMotion ??
    (typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x082f3d);
  scene.fog = new THREE.Fog(0x082f3d, 260, 520);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 500);
  // Equal x/y/z components create the classic true isometric direction.
  camera.position.set(58, 58, 58);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
  renderer.setClearColor(0x082f3d, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = false;
  renderer.domElement.setAttribute('aria-label', 'Animated isometric water field');
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.touchAction = 'none';
  container.appendChild(renderer.domElement);

  const geometry = createWaterGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.52,
    metalness: 0.08,
    flatShading: true,
    vertexColors: true,
  });
  const water = new THREE.Mesh(geometry, material);
  water.name = 'phase-one-water-field';
  scene.add(water);

  // A cool hemisphere and a warm directional highlight make the facets legible
  // while keeping the palette calm enough for the future cream HUD overlay.
  scene.add(new THREE.HemisphereLight(0xa7d7d0, 0x073340, 1.65));
  const sun = new THREE.DirectionalLight(0xffe2bb, 2.35);
  sun.position.set(-55, 80, 42);
  scene.add(sun);
  const coolFill = new THREE.DirectionalLight(0x5ebfc9, 0.48);
  coolFill.position.set(75, 42, -65);
  scene.add(coolFill);

  let disposed = false;
  // Reduced motion is an initial condition. The host owns preference changes
  // and an explicit setPaused(false) is allowed to resume the scene.
  let manuallyPaused = initialReducedMotion;
  let documentHidden = typeof document !== 'undefined' ? document.hidden : false;
  let inViewport = true;
  let frameHandle: number | null = null;
  let lastTime = 0;
  let elapsed = 0;

  const isMotionPaused = (): boolean => manuallyPaused || documentHidden || !inViewport;

  const render = (now: number): void => {
    if (disposed) return;

    if (!lastTime) lastTime = now;
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    if (!isMotionPaused()) elapsed += delta;

    updateWaterGeometry(geometry, elapsed);
    renderer.render(scene, camera);

    if (isMotionPaused()) {
      frameHandle = null;
      return;
    }
    frameHandle = window.requestAnimationFrame(render);
  };

  const startRendering = (): void => {
    if (disposed || frameHandle !== null) return;
    lastTime = 0;
    frameHandle = window.requestAnimationFrame(render);
  };

  const stopRendering = (): void => {
    if (frameHandle === null) return;
    window.cancelAnimationFrame(frameHandle);
    frameHandle = null;
  };

  const resize = (): void => {
    if (disposed) return;
    const width = Math.max(1, container.clientWidth || window.innerWidth);
    const height = Math.max(1, container.clientHeight || window.innerHeight);
    const aspect = width / height;
    const halfHeight = VIEW_HEIGHT * 0.5;
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
    renderer.setSize(width, height, false);
    if (isMotionPaused()) renderer.render(scene, camera);
  };

  const setPaused = (paused: boolean): void => {
    if (disposed) return;
    manuallyPaused = paused;
    if (isMotionPaused()) {
      stopRendering();
      renderer.render(scene, camera);
    } else {
      startRendering();
    }
  };

  const onVisibilityChange = (): void => {
    documentHidden = document.hidden;
    if (isMotionPaused()) {
      stopRendering();
      renderer.render(scene, camera);
    } else {
      startRendering();
    }
  };

  const visibilityObserver =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            inViewport = entries[0]?.isIntersecting ?? true;
            if (isMotionPaused()) {
              stopRendering();
              renderer.render(scene, camera);
            } else {
              startRendering();
            }
          },
          { threshold: 0.01 },
        )
      : null;

  const resizeObserver =
    typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;

  resize();
  resizeObserver?.observe(container);
  // ResizeObserver tracks container changes; this also catches viewport/DPR
  // changes where the container's CSS dimensions remain unchanged.
  window.addEventListener('resize', resize);
  visibilityObserver?.observe(container);
  document.addEventListener('visibilitychange', onVisibilityChange);

  if (isMotionPaused()) renderer.render(scene, camera);
  else startRendering();

  return {
    setPaused,
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      stopRendering();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      visibilityObserver?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      scene.clear();
    },
  };
}

function createWaterGeometry(): THREE.BufferGeometry {
  const side = FIELD_SEGMENTS + 1;
  const positions: number[] = [];
  const colors: number[] = [];
  const half = FIELD_SIZE * 0.5;
  const grid = new Array<readonly [number, number]>(side * side);

  // Build one shared, gently irregular lattice first. Every adjacent face
  // reads the same corner coordinates, so the organic triangulation stays
  // watertight even though the render geometry is expanded per face.
  for (let row = 0; row < side; row += 1) {
    const baseZ = (row / FIELD_SEGMENTS) * FIELD_SIZE - half;
    for (let column = 0; column < side; column += 1) {
      const baseX = (column / FIELD_SEGMENTS) * FIELD_SIZE - half;
      const edge = column === 0 || row === 0 || column === FIELD_SEGMENTS || row === FIELD_SEGMENTS;
      const jitterX = edge ? 0 : (hash2d(column, row) - 0.5) * 0.72;
      const jitterZ = edge ? 0 : (hash2d(column + 97, row + 53) - 0.5) * 0.72;
      grid[row * side + column] = [baseX + jitterX, baseZ + jitterZ];
    }
  }

  const addFace = (
    first: readonly [number, number],
    second: readonly [number, number],
    third: readonly [number, number],
    column: number,
    row: number,
    triangle: number,
  ): void => {
    const centerX = (first[0] + second[0] + third[0]) / 3;
    const centerZ = (first[1] + second[1] + third[1]) / 3;
    const color = facetColor(centerX, centerZ, column, row, triangle);
    for (const [x, z] of [first, second, third]) {
      positions.push(x, sampleWaterHeight(x, z, 0), z);
      colors.push(color[0], color[1], color[2]);
    }
  };

  for (let row = 0; row < FIELD_SEGMENTS; row += 1) {
    for (let column = 0; column < FIELD_SEGMENTS; column += 1) {
      const topLeft = grid[row * side + column];
      const topRight = grid[row * side + column + 1];
      const bottomLeft = grid[(row + 1) * side + column];
      const bottomRight = grid[(row + 1) * side + column + 1];

      // Alternate the diagonal so the low-poly pattern does not form a
      // monotonous lattice across the entire field.
      if ((row + column) % 2 === 0) {
        addFace(topLeft, bottomLeft, topRight, column, row, 0);
        addFace(topRight, bottomLeft, bottomRight, column, row, 1);
      } else {
        addFace(topLeft, bottomLeft, bottomRight, column, row, 0);
        addFace(topLeft, bottomRight, topRight, column, row, 1);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function facetColor(
  x: number,
  z: number,
  column: number,
  row: number,
  triangle: number,
): readonly [number, number, number] {
  const broadSwell = 0.5 + 0.5 * Math.sin(x * 0.022 - z * 0.014);
  const blueShift = 0.5 + 0.5 * Math.cos(x * 0.012 + z * 0.018);
  const facetVariation = hash2d(column * 2 + triangle + 19, row + 71);
  return [
    0.018 + blueShift * 0.012,
    0.22 + broadSwell * 0.09 + facetVariation * 0.025,
    0.34 + broadSwell * 0.11 + blueShift * 0.05 + facetVariation * 0.025,
  ];
}

function hash2d(x: number, y: number): number {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function updateWaterGeometry(geometry: THREE.BufferGeometry, timeSeconds: number): void {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;

  for (let vertex = 0; vertex < position.count; vertex += 1) {
    const x = position.getX(vertex);
    const z = position.getZ(vertex);
    const y = sampleWaterHeight(x, z, timeSeconds);
    position.setY(vertex, y);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.getAttribute('normal').needsUpdate = true;
}
