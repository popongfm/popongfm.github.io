export interface CatalogStar { ra: number; dec: number; mag: number }

/** One star from the BSC5 JSON mirror (e.g. { RA: '05h 55m 10.3s', Dec: '+07° 24′ 25″', V: '0.50' }). */
export function parseBscStar(r: { RA?: string; Dec?: string; V?: string }): CatalogStar | null {
  if (!r.RA || !r.Dec || !r.V) return null;
  const ra = r.RA.match(/(\d+)h\s*(\d+)m\s*([\d.]+)s/);
  const de = r.Dec.match(/([+-])(\d+)°\s*(\d+)′\s*([\d.]+)″/);
  if (!ra || !de) return null;
  const sign = de[1] === '-' ? -1 : 1;
  return {
    ra: +ra[1] + +ra[2] / 60 + +ra[3] / 3600,
    dec: sign * (+de[2] + +de[3] / 60 + +de[4] / 3600),
    mag: Number(r.V),
  };
}

/** Three.js y-up: x = r·cosδ·cosα, y = r·sinδ, z = −r·cosδ·sinα. */
export function raDecToVec3(raHours: number, decDeg: number, r: number): [number, number, number] {
  const a = (raHours * 15 * Math.PI) / 180, d = (decDeg * Math.PI) / 180;
  return [r * Math.cos(d) * Math.cos(a), r * Math.sin(d), -r * Math.cos(d) * Math.sin(a)];
}
