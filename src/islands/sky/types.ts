import type { ConstellationId, PanelRuneId } from '../../data/runes';

export interface SkyProject { slug: string; constellation: ConstellationId; order: number; brightness: 1 | 2 | 3; title: string }
export interface Sky3DHandle { focusStar(slug: string): void; recenter(): void; destroy(): void }
export interface Sky3DModule {
  mount(host: HTMLElement, opts: {
    projects: SkyProject[]; reducedMotion: boolean;
    onHover(slug: string | null): void; onSelect(slug: string): void; onPanelRune(id: PanelRuneId): void;
    onFail(): void;
  }): Sky3DHandle | null;
}
