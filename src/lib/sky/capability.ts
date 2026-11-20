export type SkyMode = '3d' | '2d';

export function chooseSkyMode(env: { webgl2: boolean; width: number }): SkyMode {
  return env.webgl2 && env.width >= 768 ? '3d' : '2d';
}

export function detectWebGL2(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}
