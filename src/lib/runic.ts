const DIGRAPHS: Record<string, string> = { th: 'ᚦ', ng: 'ᛜ' };
const LETTERS: Record<string, string> = {
  a: 'ᚨ', b: 'ᛒ', c: 'ᚲ', d: 'ᛞ', e: 'ᛖ', f: 'ᚠ', g: 'ᚷ', h: 'ᚺ', i: 'ᛁ', j: 'ᛃ', k: 'ᚲ', l: 'ᛚ', m: 'ᛗ',
  n: 'ᚾ', o: 'ᛟ', p: 'ᛈ', q: 'ᚲ', r: 'ᚱ', s: 'ᛊ', t: 'ᛏ', u: 'ᚢ', v: 'ᚹ', w: 'ᚹ', x: 'ᚲᛊ', y: 'ᛃ', z: 'ᛉ',
};

/** Transliterate Latin letters to Elder Futhark; every other character passes through. */
export function toRunes(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const pair = text.slice(i, i + 2).toLowerCase();
    if (DIGRAPHS[pair]) { out += DIGRAPHS[pair]; i++; continue; }
    const ch = text[i];
    out += LETTERS[ch.toLowerCase()] ?? ch;
  }
  return out;
}
