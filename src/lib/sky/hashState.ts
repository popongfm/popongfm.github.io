import type { PanelRuneId } from '../../data/runes';

export interface SkyState { journey: boolean; star: string | null; panel: PanelRuneId | null }
const PANELS: PanelRuneId[] = ['skills', 'about', 'contact'];

export function parseHash(hash: string): SkyState {
  const h = hash.replace(/^#/, '');
  if (h === 'journey') return { journey: true, star: null, panel: null };
  if (h.startsWith('star-') && h.length > 5) return { journey: true, star: h.slice(5), panel: null };
  if (h.startsWith('panel-')) {
    const p = h.slice(6) as PanelRuneId;
    return { journey: true, star: null, panel: PANELS.includes(p) ? p : null };
  }
  return { journey: false, star: null, panel: null };
}

export function toHash(s: SkyState): string {
  if (s.star) return `#star-${s.star}`;
  if (s.panel) return `#panel-${s.panel}`;
  return s.journey ? '#journey' : '';
}
