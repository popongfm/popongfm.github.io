import { chooseSkyMode, detectWebGL2, type SkyMode } from '../../lib/sky/capability';
import { parseHash, toHash, type SkyState } from '../../lib/sky/hashState';
import { runDecode } from '../../lib/runic';
import type { PanelRuneId } from '../../data/runes';
import type { Sky3DHandle, Sky3DModule, SkyProject } from './types';

interface Opts { reducedMotion: boolean; load3d: () => Promise<Sky3DModule> }

export function initSky(root: HTMLElement, opts: Opts) {
  const shell = root.closest<HTMLElement>('.sky-shell')!;
  const panel = document.getElementById('panel') as HTMLElement;
  const panelBody = panel.querySelector<HTMLElement>('.panel-body')!;
  const stars = () => [...root.querySelectorAll<HTMLAnchorElement>('a.star')];
  const known = new Set(stars().map((s) => s.dataset.slug!));
  const forced = new URLSearchParams(location.search).get('sky') as SkyMode | null;
  let mode: SkyMode | null = null;
  let handle: Sky3DHandle | null = null;
  let trigger: HTMLElement | null = null;

  const setHash = (s: SkyState, push: boolean) => {
    const url = location.pathname + location.search + toHash(s);
    if (push) history.pushState(null, '', url); else history.replaceState(null, '', url);
  };

  function fallback2d() {
    handle?.destroy(); handle = null; mode = '2d'; root.dataset.mode = '2d';
    root.querySelector('.canvas-host')!.innerHTML = '';
  }

  async function enterJourney() {
    if (root.dataset.journey === 'true') return;
    root.dataset.journey = 'true';
    shell.classList.add('is-journey');
    document.documentElement.classList.add('journey-open');
    const header = document.querySelector<HTMLElement>('.site-header');
    document.documentElement.style.setProperty('--header-h', `${header?.offsetHeight ?? 0}px`);
    document.querySelectorAll('[data-journey-inert]').forEach((el) => el.setAttribute('inert', ''));
    mode = forced ?? chooseSkyMode({ webgl2: detectWebGL2(), width: innerWidth });
    root.dataset.mode = mode;
    if (mode === '3d') {
      try {
        const mod = await opts.load3d();
        if (root.dataset.journey !== 'true' || mode !== '3d') return; // left the sky while loading
        handle?.destroy(); handle = null;
        const projects: SkyProject[] = stars().map((s) => ({
          slug: s.dataset.slug!, constellation: s.dataset.constellation as SkyProject['constellation'],
          order: Number(s.dataset.order), brightness: Number(s.dataset.brightness) as 1 | 2 | 3, title: s.getAttribute('aria-label')!,
        }));
        handle = mod.mount(root.querySelector('.canvas-host')!, {
          projects, reducedMotion: opts.reducedMotion,
          onHover: (slug) => stars().forEach((s) => s.classList.toggle('is-hover', s.dataset.slug === slug)),
          onSelect: (slug) => openStar(slug, true, stars().find((s) => s.dataset.slug === slug) ?? null),
          onPanelRune: (id) => openPanel(id, true, null),
          onFail: fallback2d,
        });
        if (!handle) fallback2d();
      } catch {
        fallback2d();
      }
    }
  }

  function exitJourney() {
    closePanel(false);
    root.dataset.journey = 'false';
    shell.classList.remove('is-journey');
    document.documentElement.classList.remove('journey-open');
    document.querySelectorAll('[data-journey-inert]').forEach((el) => el.removeAttribute('inert'));
    mode = null;
    handle?.destroy(); handle = null;
    root.querySelector('.canvas-host')!.innerHTML = '';
    root.dataset.mode = 'static';
  }

  function show(tpl: HTMLTemplateElement) {
    panelBody.replaceChildren(tpl.content.cloneNode(true));
    panel.hidden = false;
    const h = panel.querySelector<HTMLElement>('#panel-title');
    if (h) runDecode(h, h.dataset.title ?? h.textContent ?? '', { reducedMotion: opts.reducedMotion });
    panel.querySelector<HTMLElement>('.panel-close')!.focus({ preventScroll: true });
  }

  async function openStar(slug: string, push: boolean, from: HTMLElement | null) {
    await enterJourney();
    const tpl = document.getElementById(`tpl-${slug}`) as HTMLTemplateElement | null;
    if (!known.has(slug) || !tpl) { setHash({ journey: true, star: null, panel: null }, false); return; }
    trigger = from ?? stars().find((s) => s.dataset.slug === slug) ?? null;
    stars().forEach((s) => s.classList.toggle('is-active', s.dataset.slug === slug));
    handle?.focusStar(slug);
    show(tpl);
    setHash({ journey: true, star: slug, panel: null }, push);
  }

  async function openPanel(id: PanelRuneId, push: boolean, from: HTMLElement | null) {
    await enterJourney();
    const tpl = document.getElementById(`tpl-panel-${id}`) as HTMLTemplateElement | null;
    if (!tpl) return;
    trigger = from;
    show(tpl);
    setHash({ journey: true, star: null, panel: id }, push);
  }

  function closePanel(updateHash = true) {
    if (panel.hidden) return;
    panel.hidden = true;
    panelBody.replaceChildren();
    stars().forEach((s) => s.classList.remove('is-active'));
    if (updateHash) setHash({ journey: root.dataset.journey === 'true', star: null, panel: null }, true);
    trigger?.focus({ preventScroll: true });
  }

  async function apply(s: SkyState) {
    if (!s.journey) { exitJourney(); return; }
    await enterJourney();
    if (s.star) await openStar(s.star, false, null);
    else if (s.panel) await openPanel(s.panel, false, null);
    else { panel.hidden = true; panelBody.replaceChildren(); stars().forEach((x) => x.classList.remove('is-active')); }
  }

  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const begin = t.closest('a[data-begin]');
    const star = t.closest<HTMLAnchorElement>('a.star');
    const rune = t.closest<HTMLAnchorElement>('a.ring-rune[data-panel]');
    if (begin) { e.preventDefault(); enterJourney(); setHash({ journey: true, star: null, panel: null }, true); shell.scrollIntoView({ block: 'center', behavior: opts.reducedMotion ? 'auto' : 'smooth' }); }
    else if (star) { e.preventDefault(); openStar(star.dataset.slug!, true, star); }
    else if (rune) { e.preventDefault(); openPanel(rune.dataset.panel as PanelRuneId, true, rune); }
    else if (t.closest('.panel-close')) closePanel();
    else if (t.closest('[data-exit]')) { exitJourney(); setHash({ journey: false, star: null, panel: null }, true); }
    else if (t.closest('[data-recenter]')) handle?.recenter();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!panel.hidden) { e.preventDefault(); closePanel(); }
      else if (root.dataset.journey === 'true') { exitJourney(); setHash({ journey: false, star: null, panel: null }, true); }
      return;
    }
    const cur = (document.activeElement as HTMLElement | null)?.closest?.('a.star');
    if (!cur) return;
    const list = stars();
    const i = list.indexOf(cur as HTMLAnchorElement);
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    list[(i + d + list.length) % list.length].focus();
  });

  addEventListener('popstate', () => apply(parseHash(location.hash)));
  const initial = parseHash(location.hash);
  if (initial.journey) apply(initial);
}
