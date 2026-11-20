import type { ConstellationId } from '../../data/runes';

export interface Constellation { points: [number, number][]; lines: number[][] }

/** Ring-normalized coordinates: center (0,0), rune ring radius 1, y down. */
export const CONSTELLATIONS: Record<ConstellationId, Constellation> = {
  medical: { points: [[-0.633, -0.4], [-0.433, -0.55], [-0.233, -0.433], [-0.133, -0.2], [-0.3, -0.067]], lines: [[0, 1, 2, 3, 4]] },
  space: { points: [[0.333, -0.55], [0.167, -0.7], [0.5, -0.667], [0.333, -0.317], [0.367, -0.1]], lines: [[1, 0, 2], [0, 3, 4]] },
  robotics: { points: [[-0.533, 0.367], [-0.3, 0.233], [-0.067, 0.4], [0.167, 0.283], [0.367, 0.45]], lines: [[0, 1, 2, 3, 4]] },
  data: { points: [[0.533, -0.133], [0.667, 0.033], [0.617, 0.233], [0.733, -0.233], [0.45, 0.15]], lines: [[3, 0, 1, 2], [2, 4]] },
};

/** Where each constellation's rune label sits (ring-normalized). */
export const LABEL_AT: Record<ConstellationId, [number, number]> = {
  medical: [-0.62, -0.68], space: [0.05, -0.86], robotics: [-0.55, 0.55], data: [0.5, 0.42],
};

export function starPosition(constellation: ConstellationId, order: number): [number, number] {
  const p = CONSTELLATIONS[constellation].points[order];
  if (!p) throw new Error(`No star point for ${constellation}/${order}`);
  return p;
}
