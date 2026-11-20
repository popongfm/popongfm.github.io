import { describe, it, expect } from 'vitest';
import { RUNES, FUTHARK, LIT_RUNES } from '../../src/data/runes';

describe('runes', () => {
  it('has the 24 elder futhark runes', () => {
    expect([...FUTHARK].length).toBe(24);
  });
  it('every lit rune is in the futhark', () => {
    for (const r of LIT_RUNES) expect(FUTHARK).toContain(r);
  });
  it('maps space to Tiwaz', () => {
    expect(RUNES.space.char).toBe('ᛏ');
    expect(RUNES.space.name).toBe('Tiwaz');
  });
});
