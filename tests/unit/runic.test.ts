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
