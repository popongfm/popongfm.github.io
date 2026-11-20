import { describe, it, expect } from 'vitest';
import { chooseSkyMode } from '../../src/lib/sky/capability';
import { parseHash, toHash } from '../../src/lib/sky/hashState';

describe('chooseSkyMode', () => {
  it('needs webgl2 and 768px', () => {
    expect(chooseSkyMode({ webgl2: true, width: 767 })).toBe('2d');
    expect(chooseSkyMode({ webgl2: true, width: 768 })).toBe('3d');
    expect(chooseSkyMode({ webgl2: false, width: 1440 })).toBe('2d');
  });
});

describe('hash state', () => {
  it('parses the four shapes', () => {
    expect(parseHash('')).toEqual({ journey: false, star: null, panel: null });
    expect(parseHash('#journey')).toEqual({ journey: true, star: null, panel: null });
    expect(parseHash('#star-dc-cellnet')).toEqual({ journey: true, star: 'dc-cellnet', panel: null });
    expect(parseHash('#panel-about')).toEqual({ journey: true, star: null, panel: 'about' });
  });
  it('ignores unknown panels and other hashes', () => {
    expect(parseHash('#panel-nope')).toEqual({ journey: true, star: null, panel: null });
    expect(parseHash('#main')).toEqual({ journey: false, star: null, panel: null });
  });
  it('round-trips', () => {
    for (const h of ['', '#journey', '#star-medi-ident-ai', '#panel-contact']) expect(toHash(parseHash(h))).toBe(h);
  });
});
