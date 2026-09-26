import * as THREE from 'three';
import { VESSEL_SPAWN } from '../content/islands';
import { STORM_TUNING } from './stormField';
import { calculateApparentWind, sampleWind } from './wind';
import { calculateSailResponse } from './vessel/sailResponse';
import { createTrimAssistState, stepTrimAssist, clearTrimBoost } from './vessel/trimAssist';
import {
  createLandmarks,
  type IslandDefinition,
  type LandmarkProjectionAnchor,
} from './createLandmarks';
import { createCameraRig } from './createCameraRig';
import { createVessel } from './createVessel';
import { createWake } from './effects/createWake';
import { createHullSpray } from './effects/createHullSpray';
import { createWindFlags } from './effects/createWindFlags';
import { planSafeDockingRoute } from '../navigation/routePlanner';
import {
  advanceScan as advanceScannerScan,
  cancelScan as cancelScannerScan,
  createScannerState,
  scannerIsActive,
  startScan as startScannerScan,
  type ScannerState,
} from '../navigation/scanner';
import { createOceanSurface } from './createOceanSurface';
import {
  createVesselState,
  stepVessel,
  VESSEL_TUNING,
  type VesselInput,
  type VesselState,
} from './vessel/kinematics';

// Preserve the Phase 1 import path while sharing the implementation with the
// vessel's buoyancy sampler.
export { sampleWaterHeight } from './waves';

export interface WaterWorldOptions {
  /** Start paused when true. The host can explicitly resume with setPaused(false). */
  reducedMotion?: boolean;
  /** Phase-two island records. An empty list retains the water-only view. */
  islands?: readonly IslandDefinition[];
  /** CSS-pixel space reserved for the DOM HUD and landmark labels. */
  framingInsets?: Partial<FramingInsets>;
  /** Called after layout and on each rendered frame for DOM label projection. */
  onLandmarkProjection?: (positions: readonly LandmarkProjection[]) => void;
  /** Called after each rendered vessel update with a small serialisable snapshot. */
  onVesselUpdate?: (snapshot: VesselTelemetry) => void;
  /** Called when scanner navigation changes state. */
  onScanUpdate?: (snapshot: ScanTelemetry) => void;
  onSailingUpdate?: (snapshot: SailingTelemetry) => void;
}

export interface FramingInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LandmarkProjection {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly visible: boolean;
}

export interface VesselTelemetry {
  readonly x: number;
  readonly z: number;
  readonly heading: number;
  readonly speed: number;
}

export interface SailingTelemetry {
  readonly sailAngle: number;
  readonly suggestedAngle: number;
  readonly signedSailAngle: number;
  readonly relativeWindAngle: number;
  readonly power: number;
  readonly noGo: boolean;
  readonly windSpeed: number;
  readonly luffing: boolean;
  readonly moored: boolean;
  readonly assisted: boolean;
  readonly trimMode: 'auto' | 'manual';
  readonly trimEngaged: boolean;
  readonly trimEfficiency: number;
  readonly sweetSpot: boolean;
  readonly trimBoost: number;
  readonly boostSerial: number;
}

export type ScanStatus = 'idle' | 'travelling' | 'arrived' | 'cancelled' | 'failed';

export interface ScanTelemetry {
  readonly status: ScanStatus;
  readonly islandId: string | null;
  readonly message?: string;
}

export interface ScanStartOptions {
  /** Skip travel animation. The caller should use this for reduced motion. */
  readonly instant?: boolean;
}

export interface WaterWorldController {
  setPaused(paused: boolean): void;
  setReducedMotion(reduced: boolean): void;
  setInput(input: VesselInput): void;
  resetVessel(): void;
  setAutoTrim(): void;
  getVesselState(): Readonly<VesselState>;
  getSailingState(): SailingTelemetry;
  startScan(islandId: string, options?: ScanStartOptions): void;
  cancelScan(): void;
  dispose(): void;
}

const MAX_DPR = 1.75;
const FIXED_STEP = 1 / 120;
const MAX_FRAME_DELTA = 0.1;
const MAX_STEPS_PER_FRAME = 12;

/**
 * Create the water field and its true isometric camera.  Passing island data
 * adds the Phase-two landforms while leaving interaction and portfolio copy
 * outside this rendering lifecycle.
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
  scene.fog = new THREE.Fog(0x082f3d, 540, 800);
  const cameraRig = createCameraRig();
  const camera = cameraRig.camera;

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

  const ocean = createOceanSurface(scene);

  const landmarks = createLandmarks(scene, options.islands ?? []);
  const vessel = createVessel(scene);
  const wake = createWake(scene);
  const hullSpray = createHullSpray(scene);
  const windFlags = createWindFlags(scene, vessel.group, landmarks.windFlagAnchors);
  let reducedMotion = Boolean(initialReducedMotion);
  vessel.setReducedMotion(reducedMotion);
  wake.setReducedMotion(reducedMotion);
  hullSpray.setReducedMotion(reducedMotion);
  windFlags.setReducedMotion(reducedMotion);
  // Keep a scanner arrival alongside its island while the visitor reads.
  // Helm input releases the mooring; ordinary free sailing still feels swell.
  let horizontallyMoored = false;
  const vesselSpawn = createVesselState(VESSEL_SPAWN.x, VESSEL_SPAWN.z);
  let vesselState: VesselState = vesselSpawn;
  let vesselInput: VesselInput = { throttle: 0, rudder: 0, brake: false };
  let trimAssist = createTrimAssistState();
  const vesselEnvironment = {
    sailingEnabled: true,
    worldLimit: STORM_TUNING.worldLimit,
    stormEnabled: true,
    obstacles: (options.islands ?? []).map((island) => ({
      x: island.position.x,
      z: island.position.z,
      radius: island.landCollisionRadius,
    })),
  };

  let scannerState: ScannerState = createScannerState({
    x: vesselState.x,
    z: vesselState.z,
    heading: vesselState.heading,
  });
  let scanTelemetry: ScanTelemetry = { status: 'idle', islandId: null };

  const getSailingState = (): SailingTelemetry => {
    const assisted = scannerIsActive(scannerState);
    const luffing = vesselInput.brake || horizontallyMoored;
    const reference = calculateSailResponse(vesselState, trimAssist.sailAngle, luffing ? 1 : 0);
    const displayedAngle = assisted ? reference.suggestedAngle : trimAssist.sailAngle;
    const response = assisted ? calculateSailResponse(vesselState, displayedAngle) : reference;
    const availablePower = calculateSailResponse(vesselState, reference.suggestedAngle).power;
    return {
      sailAngle: displayedAngle,
      suggestedAngle: response.suggestedAngle,
      signedSailAngle: response.signedAngle,
      relativeWindAngle: response.relativeWindAngle,
      power: response.power,
      noGo: response.noGo,
      windSpeed: calculateApparentWind(sampleWind(), vesselState.velocityX, vesselState.velocityZ).speed,
      luffing,
      moored: horizontallyMoored,
      assisted,
      trimMode: trimAssist.mode,
      trimEngaged: trimAssist.engaged,
      trimEfficiency: availablePower > 1e-6 ? clamp(response.power / availablePower, 0, 1) : 0,
      sweetSpot: !assisted && !luffing && !response.noGo && trimAssist.sweetSpot,
      trimBoost: assisted || luffing || response.noGo ? 0 : trimAssist.boost,
      boostSerial: trimAssist.boostSerial,
    };
  };

  const updateSailing = (snap = false): void => {
    const telemetry = getSailingState();
    vessel.setSailLoad(telemetry.power, telemetry.relativeWindAngle);
    vessel.setSailAngle(telemetry.signedSailAngle, snap);
    options.onSailingUpdate?.(telemetry);
  };

  const publishScan = (
    status: ScanStatus,
    islandId: string | null,
    message?: string,
  ): void => {
    scanTelemetry = message === undefined
      ? { status, islandId }
      : { status, islandId, message };
    options.onScanUpdate?.(scanTelemetry);
  };

  const refreshStaticFrame = (): void => {
    wake.reset();
    hullSpray.reset();
    updateSailing(true);
    vessel.resetPose(vesselState, elapsed);
    windFlags.update(vesselState, elapsed, 0);
    cameraRig.snapTo(vesselState.x, vesselState.z);
    ocean.update(elapsed);
    options.onVesselUpdate?.(toVesselTelemetry(vesselState));
    options.onLandmarkProjection?.(
      projectLandmarks(
        camera,
        getViewportWidth(container),
        getViewportHeight(container),
        landmarks.anchors,
        options.framingInsets,
      ),
    );
    renderer.render(scene, camera);
  };

  const applyScannerState = (next: ScannerState): void => {
    scannerState = next;
    if (next.status === 'arrived') horizontallyMoored = true;
    vesselState = {
      x: next.x,
      z: next.z,
      velocityX: next.velocityX,
      velocityZ: next.velocityZ,
      heading: next.heading,
      yawRate: 0,
    };
  };

  const publishScannerState = (state: ScannerState): void => {
    const status: ScanStatus = state.status === 'active' ? 'travelling' : state.status;
    publishScan(status, state.islandId, state.reason ?? undefined);
  };

  const cancelScanInternal = (message: string): void => {
    if (!scannerIsActive(scannerState)) return;
    applyScannerState(cancelScannerScan(scannerState, message));
    publishScannerState(scannerState);
  };

  const advanceScan = (deltaSeconds: number): void => {
    if (!scannerIsActive(scannerState)) return;
    const previousStatus = scannerState.status;
    applyScannerState(advanceScannerScan(scannerState, deltaSeconds));
    if (scannerState.status !== previousStatus) publishScannerState(scannerState);
  };

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
  let fixedAccumulator = 0;

  const isMotionPaused = (): boolean => manuallyPaused || documentHidden || !inViewport;

  const render = (now: number): void => {
    if (disposed) return;

    if (!lastTime) lastTime = now;
    const delta = Math.min(Math.max(0, (now - lastTime) / 1000), MAX_FRAME_DELTA);
    lastTime = now;
    if (!isMotionPaused()) {
      fixedAccumulator = Math.min(fixedAccumulator + delta, FIXED_STEP * MAX_STEPS_PER_FRAME);
      let steps = 0;
      while (fixedAccumulator + 1e-9 >= FIXED_STEP && steps < MAX_STEPS_PER_FRAME) {
        if (scannerIsActive(scannerState)) {
          advanceScan(FIXED_STEP);
        } else if (!horizontallyMoored) {
          trimAssist = stepTrimAssist(trimAssist, vesselState, {
            sheet: vesselInput.sheet ?? 0,
            engage: vesselInput.targetHeading !== undefined || Math.abs(vesselInput.rudder) > 1e-6,
            resumeAuto: false,
            suppressed: vesselInput.brake,
          }, FIXED_STEP);
          vesselState = stepVessel(
            vesselState, { ...vesselInput, sailAngle: trimAssist.sailAngle, trimBoost: trimAssist.boost },
            FIXED_STEP, vesselEnvironment, reducedMotion ? undefined : elapsed,
          );
        }
        // Water and forces share active simulation time. Discarded frames and
        // hidden/paused time never advance either side of the coupling.
        elapsed += FIXED_STEP;
        fixedAccumulator = Math.max(0, fixedAccumulator - FIXED_STEP);
        steps += 1;
      }
      cameraRig.update(vesselState.x, vesselState.z, delta);
      updateSailing();
      vessel.update(vesselState, elapsed, delta);
      windFlags.update(vesselState, elapsed, delta);
      wake.setTrimBoost(scannerIsActive(scannerState) || horizontallyMoored ? 0 : trimAssist.boost);
      wake.update(vesselState, elapsed, delta);
      if (scannerIsActive(scannerState) || horizontallyMoored) {
        hullSpray.reset();
      } else {
        hullSpray.update(vessel.getWaterContact(), elapsed, delta);
      }
      options.onVesselUpdate?.(toVesselTelemetry(vesselState));
    }

    options.onLandmarkProjection?.(projectLandmarks(camera, getViewportWidth(container), getViewportHeight(container), landmarks.anchors, options.framingInsets));
    ocean.update(elapsed);
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
    cameraRig.resize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
    renderer.setSize(width, height, false);
    options.onLandmarkProjection?.(projectLandmarks(camera, width, height, landmarks.anchors, options.framingInsets));
    if (isMotionPaused()) renderer.render(scene, camera);
  };

  const setPaused = (paused: boolean): void => {
    if (disposed) return;
    if (paused) cancelScanInternal('Scanner navigation paused.');
    manuallyPaused = paused;
    if (isMotionPaused()) {
      stopRendering();
      fixedAccumulator = 0;
      lastTime = 0;
      vesselInput = { throttle: 0, rudder: 0, brake: false };
      trimAssist = clearTrimBoost(trimAssist);
      wake.setTrimBoost(0);
      hullSpray.reset();
      renderer.render(scene, camera);
    } else {
      startRendering();
    }
    options.onSailingUpdate?.(getSailingState());
  };

  const onVisibilityChange = (): void => {
    documentHidden = document.hidden;
    if (isMotionPaused()) {
      stopRendering();
      fixedAccumulator = 0;
      lastTime = 0;
      vesselInput = { throttle: 0, rudder: 0, brake: false };
      trimAssist = clearTrimBoost(trimAssist);
      wake.setTrimBoost(0);
      hullSpray.reset();
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
              fixedAccumulator = 0;
              lastTime = 0;
              vesselInput = { throttle: 0, rudder: 0, brake: false };
              trimAssist = clearTrimBoost(trimAssist);
              wake.setTrimBoost(0);
              hullSpray.reset();
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
  updateSailing(true);
  vessel.resetPose(vesselState, elapsed);
  windFlags.update(vesselState, elapsed, 0);
  cameraRig.snapTo(vesselState.x, vesselState.z);
  options.onVesselUpdate?.(toVesselTelemetry(vesselState));
  options.onScanUpdate?.(scanTelemetry);
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
    setReducedMotion: (reduced): void => {
      if (disposed) return;
      reducedMotion = reduced;
      vessel.setReducedMotion(reduced);
      wake.setReducedMotion(reduced);
      hullSpray.setReducedMotion(reduced);
      windFlags.setReducedMotion(reduced);
      windFlags.update(vesselState, elapsed, 0);
      if (isMotionPaused()) renderer.render(scene, camera);
    },
    setInput: (input): void => {
      if (disposed) return;
      const nextInput = {
        // Manual propulsion comes only from the sail; legacy throttle is ignored.
        throttle: 0,
        sheet: clamp(input.sheet ?? 0, -1, 1),
        rudder: clamp(input.rudder, -1, 1),
        brake: Boolean(input.brake),
        targetHeading: Number.isFinite(input.targetHeading) ? input.targetHeading : undefined,
      };
      if (nextInput.targetHeading !== undefined || Math.abs(nextInput.sheet) > 1e-6 || Math.abs(nextInput.rudder) > 1e-6 || nextInput.brake) {
        horizontallyMoored = false;
        cancelScanInternal('Scanner navigation cancelled by helm input.');
        if (scannerState.status === 'arrived') {
          scannerState = createScannerState({ x: vesselState.x, z: vesselState.z, heading: vesselState.heading });
          publishScannerState(scannerState);
        }
      }
      vesselInput = nextInput;
      // A cancelled route must not retain a reward from before the voyage.
      if (nextInput.brake) {
        trimAssist = clearTrimBoost(trimAssist);
        wake.setTrimBoost(0);
        hullSpray.reset();
      }
      options.onSailingUpdate?.(getSailingState());
    },
    setAutoTrim: (): void => {
      if (disposed || isMotionPaused()) return;
      vesselInput = { throttle: 0, rudder: 0, brake: false };
      horizontallyMoored = false;
      cancelScanInternal('Scanner navigation cancelled by helm input.');
      if (scannerState.status === 'arrived') {
        scannerState = createScannerState({ x: vesselState.x, z: vesselState.z, heading: vesselState.heading });
        publishScannerState(scannerState);
      }
      trimAssist = stepTrimAssist(clearTrimBoost(trimAssist), vesselState, {
        sheet: 0, engage: true, resumeAuto: true, suppressed: false,
      }, 0);
      options.onSailingUpdate?.(getSailingState());
    },
    resetVessel: (): void => {
      if (disposed) return;
      wake.reset();
      hullSpray.reset();
      windFlags.reset();
      horizontallyMoored = false;
      vesselState = createVesselState(VESSEL_SPAWN.x, VESSEL_SPAWN.z);
      scannerState = createScannerState({ x: vesselState.x, z: vesselState.z, heading: vesselState.heading });
      publishScannerState(scannerState);
      vesselInput = { throttle: 0, rudder: 0, brake: false };
      trimAssist = clearTrimBoost(trimAssist);
      wake.setTrimBoost(0);
      fixedAccumulator = 0;
      lastTime = 0;
      elapsed = 0;
      trimAssist = createTrimAssistState();
      updateSailing(true);
      vessel.resetPose(vesselState, elapsed);
      windFlags.update(vesselState, elapsed, 0);
      cameraRig.snapTo(vesselState.x, vesselState.z);
      ocean.update(elapsed);
      options.onVesselUpdate?.(toVesselTelemetry(vesselState));
      options.onLandmarkProjection?.(projectLandmarks(camera, getViewportWidth(container), getViewportHeight(container), landmarks.anchors, options.framingInsets));
      renderer.render(scene, camera);
    },
    getVesselState: (): Readonly<VesselState> => ({ ...vesselState }),
    getSailingState,
    startScan: (islandId, startOptions = {}): void => {
      if (disposed) return;

      // A replacement takes over immediately. Do not publish an intermediate
      // cancelled state that would make the drawer announce stale progress.
      const route = planSafeDockingRoute(
        { x: vesselState.x, z: vesselState.z },
        islandId,
        options.islands ?? [],
        { worldLimit: STORM_TUNING.worldLimit, vesselClearance: VESSEL_TUNING.collisionRadius },
      );
      if (!route.ok) {
        cancelScanInternal('Scanner navigation replaced by an invalid route.');
        vesselInput = { throttle: 0, rudder: 0, brake: false };
        trimAssist = clearTrimBoost(trimAssist);
        wake.setTrimBoost(0);
        hullSpray.reset();
        publishScan('failed', islandId, route.message);
        return;
      }

      vesselInput = { throttle: 0, rudder: 0, brake: false };
      trimAssist = clearTrimBoost(trimAssist);
      wake.setTrimBoost(0);
      hullSpray.reset();
      horizontallyMoored = false;
      const current = createScannerState({ x: vesselState.x, z: vesselState.z, heading: vesselState.heading });
      applyScannerState(startScannerScan(current, { islandId, route: route.points }));

      const instant = Boolean(startOptions.instant) || manuallyPaused;
      if (instant) {
        if (scannerIsActive(scannerState)) {
          applyScannerState(advanceScannerScan(scannerState, scannerState.duration));
        }
        fixedAccumulator = 0;
        lastTime = 0;
        refreshStaticFrame();
        publishScannerState(scannerState);
        return;
      }

      publishScannerState(scannerState);
      startRendering();
    },
    cancelScan: (): void => {
      if (disposed) return;
      cancelScanInternal('Scanner navigation cancelled.');
    },
    dispose: (): void => {
      if (disposed) return;
      disposed = true;
      stopRendering();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      visibilityObserver?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      landmarks.dispose();
      vessel.dispose();
      wake.dispose();
      hullSpray.dispose();
      windFlags.dispose();
      cameraRig.dispose();
      ocean.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      scene.clear();
    },
  };
}

function projectLandmarks(
  camera: THREE.OrthographicCamera,
  width: number,
  height: number,
  anchors: readonly LandmarkProjectionAnchor[],
  requestedInsets: Partial<FramingInsets> | undefined,
): LandmarkProjection[] {
  const insets = getProjectionInsets(width, height, requestedInsets);
  return anchors.map(({ id, position }) => {
    const projected = position.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * width;
    const y = (1 - (projected.y * 0.5 + 0.5)) * height;
    return {
      id,
      x,
      y,
      visible: projected.z >= -1 && projected.z <= 1 &&
        x >= insets.left && x <= width - insets.right &&
        y >= insets.top && y <= height - insets.bottom,
    };
  });
}

function getProjectionInsets(
  width: number,
  height: number,
  requested: Partial<FramingInsets> | undefined,
): FramingInsets {
  const compactLandscape = height <= 460;
  const defaults: FramingInsets = width <= 600
    ? { top: 140, right: 20, bottom: 68, left: 20 }
    : { top: 160, right: 28, bottom: 70, left: 28 };
  if (compactLandscape) defaults.top = 112;
  return {
    top: Math.max(0, requested?.top ?? defaults.top),
    right: Math.max(0, requested?.right ?? defaults.right),
    bottom: Math.max(0, requested?.bottom ?? defaults.bottom),
    left: Math.max(0, requested?.left ?? defaults.left),
  };
}

function getViewportWidth(container: HTMLElement): number {
  return Math.max(1, container.clientWidth || window.innerWidth);
}

function getViewportHeight(container: HTMLElement): number {
  return Math.max(1, container.clientHeight || window.innerHeight);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : 0));
}

function toVesselTelemetry(state: Readonly<VesselState>): VesselTelemetry {
  return {
    x: state.x,
    z: state.z,
    heading: state.heading,
    speed: Math.hypot(state.velocityX, state.velocityZ),
  };
}
