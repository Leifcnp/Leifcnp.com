import * as THREE from 'three';

export interface CameraRigController {
  readonly camera: THREE.OrthographicCamera;
  resize(width: number, height: number): void;
  update(x: number, z: number, deltaSeconds: number): void;
  snapTo(x: number, z: number): void;
  dispose(): void;
}

const CAMERA_OFFSET = 220;
const FOLLOW_RESPONSE = 5.5;
const MOBILE_WORLD_WIDTH = 60;
const DESKTOP_WORLD_HEIGHT = 90;
const COMPACT_LANDSCAPE_WORLD_HEIGHT = 60;

/**
 * A fixed-angle orthographic rig. Only the X/Z target follows the vessel;
 * target Y stays at the water plane so wave heave never makes the horizon or
 * label projection bob.
 */
export function createCameraRig(): CameraRigController {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1200);
  camera.position.set(CAMERA_OFFSET, CAMERA_OFFSET, CAMERA_OFFSET);

  let targetX = 0;
  let targetZ = 0;
  let disposed = false;

  const pointCamera = (): void => {
    camera.position.set(targetX + CAMERA_OFFSET, CAMERA_OFFSET, targetZ + CAMERA_OFFSET);
    camera.lookAt(targetX, 0, targetZ);
    camera.updateMatrixWorld(true);
  };
  pointCamera();

  return {
    camera,
    resize: (width, height): void => {
      if (disposed) return;
      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      const aspect = safeWidth / safeHeight;
      const halfHeight = safeHeight <= 460
        ? COMPACT_LANDSCAPE_WORLD_HEIGHT * 0.5
        : safeWidth <= 600
          ? (MOBILE_WORLD_WIDTH / aspect) * 0.5
          : DESKTOP_WORLD_HEIGHT * 0.5;
      const halfWidth = halfHeight * aspect;
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      pointCamera();
    },
    update: (x, z, deltaSeconds): void => {
      if (disposed) return;
      const amount = 1 - Math.exp(-Math.max(0, deltaSeconds) * FOLLOW_RESPONSE);
      targetX += (x - targetX) * amount;
      targetZ += (z - targetZ) * amount;
      pointCamera();
    },
    snapTo: (x, z): void => {
      if (disposed) return;
      targetX = x;
      targetZ = z;
      pointCamera();
    },
    dispose: (): void => {
      disposed = true;
    },
  };
}
