import { describe, it, expect } from 'vitest';
import { toRunes } from '../../src/lib/runic';

describe('toRunes', () => {
  it('writes Popong in elder futhark', () => {
    expect(toRunes('Popong')).toBe('ᛈᛟᛈᛟᛜ');
  });
  it('uses the th digraph', () => {
    expect(toRunes('the')).toBe('ᚦᛖ');
  });
  it('keeps punctuation', () => {
    expect(toRunes('DC-CellNet')).toBe('ᛞᚲ-ᚲᛖᛚᛚᚾᛖᛏ');
  });
  it('non-latin passthrough', () => {
    expect(toRunes('ระบบ')).toBe('ระบบ');
  });
});

import { decodeFrames, runDecode } from '../../src/lib/runic';

describe('decodeFrames', () => {
  it('reveals latin left to right', () => {
    expect(decodeFrames('ab', 2)).toEqual(['ᚨᛒ', 'aᛒ', 'ab']);
  });
  it('non-latin text never turns into runes', () => {
    for (const f of decodeFrames('ระบบ', 5)) expect(f).toBe('ระบบ');
  });
});

describe('runDecode', () => {
  it('sets the final text at once under reduced motion', () => {
    const el = { textContent: '' } as unknown as HTMLElement;
    runDecode(el, 'Medi-Ident AI', { reducedMotion: true });
    expect(el.textContent).toBe('Medi-Ident AI');
  });
});
