// Builds public/data/bsc5.min.json — a flat [ra(h), dec(deg), mag, ...] array of Yale Bright Star
// Catalogue stars (public-domain BSC5) with V <= 6.0, from a JSON mirror of the catalog.
import { writeFileSync, mkdirSync } from 'node:fs';

const SRC = 'https://raw.githubusercontent.com/brettonw/YaleBrightStarCatalog/master/bsc5-short.json';
const res = await fetch(SRC);
if (!res.ok) throw new Error(`download failed: ${res.status}`);
const rows = await res.json();
const out = [];
for (const r of rows) {
  const ra = r.RA?.match(/(\d+)h\s*(\d+)m\s*([\d.]+)s/);
  const de = r.Dec?.match(/([+-])(\d+)°\s*(\d+)′\s*([\d.]+)″/);
  if (!ra || !de || !r.V) continue;
  const mag = Number(r.V);
  if (!(mag <= 6)) continue;
  const raH = +ra[1] + +ra[2] / 60 + +ra[3] / 3600;
  const dec = (de[1] === '-' ? -1 : 1) * (+de[2] + +de[3] / 60 + +de[4] / 3600);
  out.push(+raH.toFixed(3), +dec.toFixed(3), +mag.toFixed(2));
}
mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/bsc5.min.json', JSON.stringify(out));
console.log(`stars: ${out.length / 3}`);
