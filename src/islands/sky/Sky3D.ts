import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CONSTELLATIONS, starPosition } from '../../lib/sky/layout';
import { raDecToVec3 } from '../../lib/sky/catalog';
import { FUTHARK, LIT_RUNES } from '../../data/runes';
import type { Sky3DModule, Sky3DHandle } from './types';

const UNIT = 100; // world units per ring radius
const GOLD = new THREE.Color('#D9B96E');
const HOME = new THREE.Vector3(0, 0, 260);

const vert = /* glsl */ `
  attribute float size; attribute float glow;
  varying float vGlow;
  void main() {
    vGlow = glow;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }`;
const frag = /* glsl */ `
  uniform vec3 color; varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(color, a * vGlow);
  }`;

function pointsMaterial(color: string) {
  return new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(color) } },
    vertexShader: vert, fragmentShader: frag,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

function runeTexture(ch: string, color: string, glow: boolean) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  g.font = '84px "Noto Sans Runic", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  if (glow) { g.shadowColor = 'rgba(243,223,168,0.9)'; g.shadowBlur = 24; }
  g.fillStyle = color;
  g.fillText(ch, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const mod: Sky3DModule = {
  mount(host, opts) {
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return null;
    }
    const sky = host.closest<HTMLElement>('#sky')!;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const canvas = renderer.domElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 2000);
    camera.position.set(0, 0, opts.reducedMotion ? HOME.z : 900);

    const controls = new OrbitControls(camera, canvas);
    Object.assign(controls, {
      enablePan: false, enableDamping: true, dampingFactor: 0.08, rotateSpeed: 0.5,
      minDistance: 180, maxDistance: 420,
      minPolarAngle: Math.PI / 2 - 0.35, maxPolarAngle: Math.PI / 2 + 0.35,
      minAzimuthAngle: -0.5, maxAzimuthAngle: 0.5,
    });

    // Real bright stars on a far sphere.
    const bg = new THREE.Points(new THREE.BufferGeometry(), pointsMaterial('#F4ECD6'));
    scene.add(bg);
    fetch('/data/bsc5.min.json').then((r) => r.json()).then((flat: number[]) => {
      const pos: number[] = [], size: number[] = [], glow: number[] = [];
      for (let i = 0; i < flat.length; i += 3) {
        pos.push(...raDecToVec3(flat[i], flat[i + 1], 500));
        const b = Math.pow(10, -0.4 * flat[i + 2]);
        size.push(6 + Math.min(18, b * 40)); glow.push(Math.min(1, 0.25 + b * 3));
      }
      bg.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      bg.geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1));
      bg.geometry.setAttribute('glow', new THREE.Float32BufferAttribute(glow, 1));
    }).catch(() => { /* background is decoration */ });

    // Rings.
    const ringMat = (o: number) => new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: o });
    for (const [r, o] of [[1.1, 0.25], [0.9, 0.18], [0.84, 0.1]] as const) {
      const pts = Array.from({ length: 129 }, (_, i) => { const a = (i / 128) * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * r * UNIT, Math.sin(a) * r * UNIT, 0); });
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat(o)));
    }

    // Constellation lines + decorative points.
    const linePts: THREE.Vector3[] = [];
    const deco: number[] = [];
    for (const c of Object.values(CONSTELLATIONS)) {
      for (const l of c.lines) for (let i = 0; i < l.length - 1; i++) {
        const [a, b] = [c.points[l[i]], c.points[l[i + 1]]];
        linePts.push(new THREE.Vector3(a[0] * UNIT, -a[1] * UNIT, 0), new THREE.Vector3(b[0] * UNIT, -b[1] * UNIT, 0));
      }
      for (const p of c.points) deco.push(p[0] * UNIT, -p[1] * UNIT, 0);
    }
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePts), ringMat(0.75)));

    // Project stars.
    const projPos = opts.projects.map((p) => { const [x, y] = starPosition(p.constellation, p.order); return new THREE.Vector3(x * UNIT, -y * UNIT, 0); });
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.Float32BufferAttribute(projPos.flatMap((v) => [v.x, v.y, v.z]), 3));
    const baseSize = opts.projects.map((p) => 10 + p.brightness * 6);
    const sizeAttr = new THREE.Float32BufferAttribute([...baseSize], 1);
    pg.setAttribute('size', sizeAttr);
    pg.setAttribute('glow', new THREE.Float32BufferAttribute(opts.projects.map(() => 1), 1));
    scene.add(new THREE.Points(pg, pointsMaterial('#F6E3A8')));
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(deco, 3));
    dg.setAttribute('size', new THREE.Float32BufferAttribute(deco.map(() => 5), 1));
    dg.setAttribute('glow', new THREE.Float32BufferAttribute(deco.map(() => 0.5), 1));
    scene.add(new THREE.Points(dg, pointsMaterial('#F6E3A8')));

    // Rune ring sprites.
    const runeSprites: THREE.Sprite[] = [];
    const ringWorld: THREE.Vector3[] = [];
    const fontReady = document.fonts?.load('84px "Noto Sans Runic"').catch(() => undefined) ?? Promise.resolve();
    fontReady.then(() => {
      [...FUTHARK].forEach((ch, j) => {
        const a = (j / 24) * Math.PI * 2;
        const lit = LIT_RUNES.includes(ch);
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: runeTexture(ch, lit ? '#F3DFA8' : '#4E4632', lit), transparent: true, depthWrite: false }));
        s.position.set(Math.sin(a) * UNIT, Math.cos(a) * UNIT, 0);
        s.scale.setScalar(lit ? 14 : 11);
        s.userData.ch = ch;
        scene.add(s); runeSprites.push(s);
      });
    });
    [...FUTHARK].forEach((_, j) => { const a = (j / 24) * Math.PI * 2; ringWorld.push(new THREE.Vector3(Math.sin(a) * UNIT, Math.cos(a) * UNIT, 0)); });

    // DOM overlay (focusable star links, ring rune links, labels) follows the 3D projection.
    const starEls = [...sky.querySelectorAll<HTMLLIElement>('.stars li')];
    const starAt = new Map(opts.projects.map((p, i) => [p.slug, i]));
    const ringEls = [...sky.querySelectorAll<HTMLElement>('.ring .ring-rune')];
    const saved = [...starEls, ...ringEls].map((el) => [el, el.style.left, el.style.top] as const);
    const v = new THREE.Vector3();
    function place(el: HTMLElement, world: THREE.Vector3, rect: DOMRect, crect: DOMRect) {
      v.copy(world).project(camera);
      el.style.left = `${(v.x * 0.5 + 0.5) * crect.width + crect.left - rect.left}px`;
      el.style.top = `${(-v.y * 0.5 + 0.5) * crect.height + crect.top - rect.top}px`;
    }

    let active: string | null = null, hover: string | null = null;
    const onEnter = (e: Event) => { hover = (e.currentTarget as HTMLElement).dataset.slug ?? null; opts.onHover(hover); };
    const onLeave = () => { hover = null; opts.onHover(null); };
    const links = [...sky.querySelectorAll<HTMLAnchorElement>('a.star')];
    links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('focus', onEnter); a.addEventListener('pointerleave', onLeave); a.addEventListener('blur', onLeave); });

    function resize() {
      const w = host.clientWidth || innerWidth, h = host.clientHeight || innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize); ro.observe(host); resize();

    let failed = false;
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); if (!failed) { failed = true; opts.onFail(); } });

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!opts.reducedMotion) {
        const k = Math.min(1, (now - t0) / 2200);
        if (k < 1) camera.position.z = 900 + (HOME.z - 900) * (1 - Math.pow(1 - k, 3));
        bg.rotation.y = (now - t0) * 0.000004;
      }
      // Hovered/active stars swell; their constellation rune pulses.
      opts.projects.forEach((p, i) => { sizeAttr.array[i] = baseSize[i] * (p.slug === hover || p.slug === active ? 1.6 : 1); });
      sizeAttr.needsUpdate = true;
      const litCh = new Set(opts.projects.filter((p) => p.slug === hover || p.slug === active).map((p) => ({ medical: 'ᚢ', space: 'ᛏ', robotics: 'ᚱ', data: 'ᚨ' })[p.constellation]));
      const pulse = 1 + 0.15 * Math.sin(now / 220);
      runeSprites.forEach((s) => { const lit = LIT_RUNES.includes(s.userData.ch); s.scale.setScalar((lit ? 14 : 11) * (litCh.has(s.userData.ch) ? pulse * 1.3 : 1)); });
      controls.update();
      renderer.render(scene, camera);
      const rect = sky.getBoundingClientRect(), crect = canvas.getBoundingClientRect();
      starEls.forEach((li) => { const a = li.querySelector<HTMLElement>('a.star')!; const i = starAt.get(a.dataset.slug!); if (i !== undefined) place(li, projPos[i], rect, crect); });
      ringEls.forEach((el, j) => place(el, ringWorld[j], rect, crect));
    };
    raf = requestAnimationFrame(tick);

    const handle: Sky3DHandle = {
      focusStar(slug) { active = slug; },
      recenter() { controls.reset(); camera.position.copy(HOME); controls.target.set(0, 0, 0); controls.update(); },
      destroy() {
        cancelAnimationFrame(raf); ro.disconnect(); controls.dispose();
        links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('focus', onEnter); a.removeEventListener('pointerleave', onLeave); a.removeEventListener('blur', onLeave); });
        saved.forEach(([el, l, t]) => { el.style.left = l; el.style.top = t; });
        scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | undefined; mat?.dispose(); });
        renderer.dispose(); canvas.remove();
      },
    };
    return handle;
  },
};

export default mod;
