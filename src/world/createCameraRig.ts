import * as THREE from 'three';

export interface CameraRigController {
  readonly camera: THREE.OrthographicCamera;
  resize(width: number, height: number): void;
  update(x: number, z: number, deltaSeconds: number): void;
  snapTo(x: number, z: number): void;
  setLocalTarget(target: { x: number; z: number } | null): void;
  setFramingInsets(insets: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>): void;
  setReducedMotion(reduced: boolean): void;
  dispose(): void;
}

const CAMERA_OFFSET = 220;
const FOLLOW_RESPONSE = 5.5;
const SQRT2 = Math.sqrt(2);
const SQRT6 = Math.sqrt(6);
const finite = (value: number, fallback = 0): number => Number.isFinite(value) ? value : fallback;

/** Fixed isometric view; framing consumes a target, never arrival state. */
export function createCameraRig(): CameraRigController {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1200);
  let targetX = 0;
  let targetZ = 0;
  let vesselX = 0;
  let vesselZ = 0;
  let width = 1;
  let height = 1;
  let halfHeight = 30;
  let halfWidth = 30;
  let localTarget: { x: number; z: number } | null = null;
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  let reducedMotion = false;
  let disposed = false;

  const pointCamera = (): void => {
    camera.position.set(targetX + CAMERA_OFFSET, CAMERA_OFFSET, targetZ + CAMERA_OFFSET);
    camera.lookAt(targetX, 0, targetZ);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  };
  const framing = (): { x: number; z: number; zoom: number } => {
    if (!localTarget) return { x: vesselX, z: vesselZ, zoom: 1 };
    // Clamp each inset pair proportionally, retaining a usable minimum even
    // while a drawer is animating or reporting stale dimensions after resize.
    const horizontalScale = Math.min(1, width * 0.8 / Math.max(1, insets.left + insets.right));
    const verticalScale = Math.min(1, height * 0.8 / Math.max(1, insets.top + insets.bottom));
    const left = insets.left * horizontalScale;
    const right = insets.right * horizontalScale;
    const top = insets.top * verticalScale;
    const bottom = insets.bottom * verticalScale;
    const usableWidth = (width - left - right) / width;
    const usableHeight = (height - top - bottom) / height;
    const dx = localTarget.x - vesselX;
    const dz = localTarget.z - vesselZ;
    // Eight world units of padding cover the vessel and destination marker.
    const spanX = Math.abs((dx - dz) / SQRT2) + 8;
    const spanY = Math.abs((dx + dz) / SQRT6) + 8;
    const zoom = Math.min(1.6, 2 * halfWidth * usableWidth / spanX, 2 * halfHeight * usableHeight / spanY);
    const offsetX = (left - right) / width * halfWidth / zoom;
    const offsetY = (bottom - top) / height * halfHeight / zoom;
    return {
      x: (vesselX + localTarget.x) / 2 - (offsetX * SQRT2 - offsetY * SQRT6) / 2,
      z: (vesselZ + localTarget.z) / 2 - (-offsetX * SQRT2 - offsetY * SQRT6) / 2,
      zoom,
    };
  };
  const apply = (amount: number): void => {
    const desired = framing();
    targetX += (desired.x - targetX) * amount;
    targetZ += (desired.z - targetZ) * amount;
    camera.zoom += (desired.zoom - camera.zoom) * amount;
    pointCamera();
  };
  pointCamera();

  return {
    camera,
    resize: (nextWidth, nextHeight): void => {
      if (disposed) return;
      width = Math.max(1, finite(nextWidth, 1));
      height = Math.max(1, finite(nextHeight, 1));
      const aspect = width / height;
      halfHeight = height <= 460 ? 30 : width <= 600 ? 30 / aspect : 45;
      halfWidth = halfHeight * aspect;
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      apply(reducedMotion ? 1 : 0);
    },
    update: (x, z, deltaSeconds): void => {
      if (disposed) return;
      vesselX = finite(x, vesselX);
      vesselZ = finite(z, vesselZ);
      const dt = Math.max(0, finite(deltaSeconds));
      // Zero elapsed time freezes framing, including reduced-motion updates.
      apply(dt > 0 ? reducedMotion ? 1 : 1 - Math.exp(-dt * FOLLOW_RESPONSE) : 0);
    },
    snapTo: (x, z): void => {
      if (disposed) return;
      vesselX = finite(x, vesselX);
      vesselZ = finite(z, vesselZ);
      apply(1);
    },
    setLocalTarget: (target): void => {
      if (disposed) return;
      localTarget = target && Number.isFinite(target.x) && Number.isFinite(target.z) ? { ...target } : null;
      if (reducedMotion) apply(1);
    },
    setFramingInsets: (next): void => {
      if (disposed) return;
      for (const edge of ['top', 'right', 'bottom', 'left'] as const) {
        if (next[edge] !== undefined) insets[edge] = Math.max(0, finite(next[edge]!));
      }
      if (reducedMotion) apply(1);
    },
    setReducedMotion: (reduced): void => {
      if (disposed) return;
      reducedMotion = reduced;
      if (reduced) apply(1);
    },
    dispose: (): void => { disposed = true; },
  };
}
