import { describe, it, expect } from 'vitest';
import { parseBscStar, raDecToVec3 } from '../../src/lib/sky/catalog';

describe('parseBscStar', () => {
  it('reads RA, Dec and V from the BSC5 JSON mirror', () => {
    const s = parseBscStar({ RA: '05h 55m 10.3s', Dec: '+07° 24′ 25″', V: '0.50' })!;
    expect(s.ra).toBeCloseTo(5 + 55 / 60 + 10.3 / 3600, 3);
    expect(s.dec).toBeCloseTo(7 + 24 / 60 + 25 / 3600, 3);
    expect(s.mag).toBe(0.5);
  });
  it('handles southern declination', () => {
    const s = parseBscStar({ RA: '06h 45m 08.9s', Dec: '-16° 42′ 58″', V: '-1.46' })!;
    expect(s.dec).toBeCloseTo(-(16 + 42 / 60 + 58 / 3600), 3);
    expect(s.mag).toBe(-1.46);
  });
  it('returns null when RA or V is missing', () => {
    expect(parseBscStar({ RA: '', Dec: '+01° 00′ 00″', V: '5.0' })).toBeNull();
    expect(parseBscStar({ RA: '01h 00m 00.0s', Dec: '+01° 00′ 00″' })).toBeNull();
  });
});

describe('raDecToVec3', () => {
  it('maps the axes', () => {
    const near = (a: number[], b: number[]) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i], 6));
    near(raDecToVec3(0, 0, 1), [1, 0, 0]);
    near(raDecToVec3(0, 90, 1), [0, 1, 0]);
    near(raDecToVec3(6, 0, 1), [0, 0, -1]);
  });
});
