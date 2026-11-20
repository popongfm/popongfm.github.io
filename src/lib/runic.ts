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

/** Frame 0 = all runes, last frame = plain text; frame k reveals the first ceil(k/steps·len) characters. */
export function decodeFrames(text: string, steps: number): string[] {
  const chars = [...text];
  const frames: string[] = [];
  for (let k = 0; k <= steps; k++) {
    const n = Math.ceil((k / steps) * chars.length);
    frames.push(chars.slice(0, n).join('') + toRunes(chars.slice(n).join('')));
  }
  return frames;
}

export function runDecode(el: HTMLElement, text: string, opts: { reducedMotion: boolean; durationMs?: number }): void {
  if (opts.reducedMotion || typeof requestAnimationFrame === 'undefined') { el.textContent = text; return; }
  const duration = opts.durationMs ?? 700;
  const steps = Math.max(4, [...text].length);
  const frames = decodeFrames(text, steps);
  const start = performance.now();
  const tick = (now: number) => {
    const k = Math.min(steps, Math.floor(((now - start) / duration) * steps));
    el.textContent = frames[k];
    if (k < steps) requestAnimationFrame(tick);
  };
  el.textContent = frames[0];
  requestAnimationFrame(tick);
}
