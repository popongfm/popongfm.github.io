# Codex of Runes Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Mickie's (Popong Faimoon) stars-and-runes portfolio at `https://popongfm.github.io`: an instant HTML fast path plus an optional 3D/2D sky in which projects are stars inside an Elder Futhark rune ring.

**Architecture:** Astro static site, EN at `/` and TH at `/th/`. All project content lives in one Astro content collection, which the fast-path pages and the sky both read. The sky is a client island on `/`:
- An SVG ring and constellations render server-side, so they work with no JS.
- `SkyController` enhances them: hash routing, panel and keyboard navigation.
- After "Begin the journey" it may lazy-load `Sky3D` (Three.js), when WebGL2 is available and the screen is at least 768px wide.

**Tech Stack:** Astro 5, TypeScript (strict), Three.js, Vitest, Playwright (`@playwright/test` pinned to the preinstalled `playwright` version), `@axe-core/playwright`, GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-20-portfolio-stars-runes-design.md` (Thai). Visual reference: https://claude.ai/artifact/J2sVtve7jrdTLFZjeFT5Wr#artboard-Merged

## Global Constraints

- Site URL `https://popongfm.github.io`, repo `popongfm.github.io`, no base path.
- Colors:
  - ink `#0A0E1C`
  - panel `#0F1426`
  - gold `#D9B96E` / `#E3C886` / `#F3DFA8`
  - cream text `#F4ECD6`
  - secondary text `#C9C2B0`
  - muted `#9C957F` (labels only)
  - hairline `#2E2A22`
  - unlit rune `#4E4632`
- Fonts (Google Fonts css2):
  - Cormorant Garamond 500/600/500i for display
  - IBM Plex Mono 400/500 for UI and body
  - Noto Sans Runic for runes
  - IBM Plex Sans Thai 400/500 for Thai body
  - Noto Serif Thai 500 for Thai display
- Runes glow **gold** only (`#F3DFA8`, halo `rgba(243,223,168,0.6)`).
- **No audio of any kind.**
- No autoplay or animation may block the fast path. Three.js is never requested before the user clicks "Begin the journey" (or opens `/#journey…` directly on a capable device).
- Rune meanings are labelled "traditional meanings".
- Content truth rules:
  - The CubeSat is titled "Gamma-Ray Burst CubeSat". The string "ANTARES-74" appears nowhere on the site.
  - Tic-Tac-Toe robot role: "Operated and maintained the system and fixed basic bugs; did not develop the full system."
  - Never mention NVIDIA Jetson / edge deployment.
  - No invented stats, awards or numbers. Missing content uses a visible `[TODO: …]` placeholder in the source and is hidden in production via `draft: true` where a whole entry lacks content.
- Text contrast ≥ 4.5:1. Decorative runes and SVGs get `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` turns off camera flights, twinkle and the rune-decode effect. Text shows immediately.
- Thai pages with missing Thai fields show the English text plus the notice "ยังไม่มีฉบับภาษาไทย — แสดงเป็นภาษาอังกฤษ". The build never fails for missing Thai.
- Tarot: The Fool (0) = past, The Magician (I) = present, The Star (XVII) = future. Mickie supplies the AI-generated self-portraits later. Until then, show gold line-art placeholder cards. Never use existing deck art.
- Featured order: 1 `medi-ident-ai`, 2 `ispace-lunar-workshop`, 3 `dc-cellnet` (status `in-progress`).

## Review Focus

1. **Thai page for a project with no Thai text** → English body plus the fallback notice, no build error (Task 3 test `th fallback`).
2. **Deep link to an unknown star `/#star-nope`** → sky opens with no panel and no console error, and the hash is replaced with `#journey` (Task 8 test `unknown star hash`).
3. **Phone width 390px** → 2D sky, nav wraps, and `document.documentElement.scrollWidth <= 390` (Task 4 and Task 8 tests).
4. **WebGL2 unavailable or context lost** → falls back to the 2D sky with the panel still working (Task 10 test `webgl fallback`).
5. **Thai or non-Latin title passed to the rune decode** → shown as-is, never turned into garbage runes (Task 7 test `non-latin passthrough`).

---

## File Structure

```
astro.config.mjs                 site, i18n (en default no prefix, th), integrations none
package.json                     scripts: dev, build, preview, test (vitest run), e2e (playwright test), bsc5
playwright.config.ts             webServer: `npm run build && npm run preview -- --port 4321`
.github/workflows/deploy.yml     withastro/action@v3 → actions/deploy-pages@v4
scripts/build-bsc5.mjs           BSC5 catalog.dat → public/data/bsc5.min.json
public/data/bsc5.min.json        committed generated file
src/styles/tokens.css            CSS custom properties from Global Constraints
src/content.config.ts            projects collection schema
src/content/projects/*.md        13 entries (Task 2 table)
src/data/runes.ts                rune table
src/data/site.ts                 name, contacts, nav items
src/data/tarot.ts                three cards
src/i18n/ui.ts                   UI strings + t()
src/lib/projects.ts              query + locale fallback
src/lib/runic.ts                 transliteration + decode frames
src/lib/sky/layout.ts            normalized constellation geometry
src/lib/sky/catalog.ts           BSC5 parsing + ra/dec → vec3
src/lib/sky/capability.ts        chooseSkyMode
src/lib/sky/hashState.ts         parse/serialize hash
src/layouts/Base.astro           head, fonts, skip link, Nav, footer
src/components/Nav.astro
src/components/RuneGlyph.astro   rune + tooltip (name, traditional meaning)
src/components/Hero.astro
src/components/FeaturedStones.astro
src/components/SkyRing.astro     server SVG: ring, constellations, star buttons (no-JS fallback)
src/components/ProjectPanel.astro  panel shell (client fills)
src/components/ProjectBody.astro   shared detail body (panel + /work/[slug])
src/components/TarotSpread.astro
src/components/Skills.astro
src/components/Contact.astro
src/islands/sky/SkyController.ts
src/islands/sky/Sky3D.ts
src/pages/[...locale]/ …          see Task 3 (index, work/index, work/[slug], about, cv)
tests/unit/*.test.ts             vitest
tests/e2e/*.spec.ts              playwright
```

---

### Task 1: Scaffold, tokens, base layout, deploy

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `src/styles/tokens.css`, `src/data/site.ts`, `src/layouts/Base.astro`, `src/components/Nav.astro`, `src/pages/index.astro` (temporary hello), `.github/workflows/deploy.yml`, `.gitignore`
- Test: `tests/e2e/layout.spec.ts`

**Interfaces:**
- Produces:
  - `site` object `{ name: 'Popong Faimoon', nameTh: 'โพธิ์พงศ์ ฝายมูล', email: 'popong.faim@bumail.net', github: 'https://github.com/popongfm', linkedin: 'https://www.linkedin.com/in/popong-faimoon' }`
  - `Base.astro` props `{ title: string; locale: 'en' | 'th'; description?: string }`, which renders a `<slot/>` inside `<main id="main">`
  - CSS vars `--ink --panel --gold --gold-2 --gold-3 --cream --text-2 --muted --hairline --rune-off`

- [ ] **Step 1:** `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`, then `npm i three && npm i -D vitest @playwright/test@$(node -p "require('playwright/package.json').version") @axe-core/playwright @types/three`. Set `site: 'https://popongfm.github.io'`.
- [ ] **Step 2: Write failing e2e** `layout.spec.ts`:
  - `nav links`: on `/`, links named Work, About, CV, Contact are visible, plus a language link with `href="/th/"`
  - `skip link`: the first Tab focuses "Skip to content"
  - `phone width`: at viewport 390×844, `scrollWidth <= 390`
  - `no audio`: `page.locator('audio, video').count() === 0`
- [ ] **Step 3:** Run `npx playwright test layout` → FAIL.
- [ ] **Step 4:** Implement `Base.astro`, `Nav.astro` (rune ᛗ + Cormorant name, links uppercase Plex Mono 13px letter-spacing .14em, EN/ไทย bordered link, flex-wrap on narrow), `tokens.css`, fonts `<link>`.
- [ ] **Step 5:** Run `npx playwright test layout` → PASS.
- [ ] **Step 6:** Add `deploy.yml` (on push to `main`; `withastro/action@v3`; `actions/deploy-pages@v4`; permissions pages:write, id-token:write).
- [ ] **Step 7:** Commit `feat: scaffold astro site with base layout and deploy workflow`.

### Task 2: Content model — runes and projects

**Files:**
- Create: `src/data/runes.ts`, `src/content.config.ts`, `src/content/projects/*.md`, `src/lib/projects.ts`
- Test: `tests/unit/projects.test.ts`, `tests/unit/runes.test.ts`

**Interfaces:**
- Produces:
  - `type ConstellationId = 'medical' | 'space' | 'robotics' | 'data'`
  - `type PanelRuneId = 'skills' | 'about' | 'contact'`
  - `RUNES: Record<ConstellationId | PanelRuneId, { char: string; name: string; meaning: { en: string; th: string } }>`
  - `FUTHARK: string` (24 chars, in order `ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ`)
  - `LIT_RUNES: string[]` (`['ᚢ','ᛏ','ᚱ','ᚨ','ᚲ','ᛗ','ᚷ']`)
  - Project schema fields:
    - `title: {en, th?}`, `summary: {en, th?}`
    - `constellation: ConstellationId`, `order: number` (position within constellation), `brightness: 1 | 2 | 3`
    - `featured?: 1 | 2 | 3`, `status: 'done' | 'in-progress'`
    - `role: {en, th?}`, `year: string`, `tools: string[]`
    - `links: {github?, demo?, paper?}`, `images: {src, alt}[]`
    - `draft: boolean` (default false)
    - The body markdown is EN. Optional TH body goes in a sibling file `<slug>.th.md` with only a body.
  - `lib/projects.ts`:
    - `getProjects(locale): Promise<LocalizedProject[]>` (non-draft, sorted by constellation then order)
    - `getFeatured(locale)` (sorted by `featured`)
    - `LocalizedProject = { slug; title; summary; role; isFallback: boolean; …rest }`

Rune table values:

| id | char | name | meaning.en |
|---|---|---|---|
| medical | ᚢ | Uruz | vitality, health |
| space | ᛏ | Tiwaz | the guiding star |
| robotics | ᚱ | Raidho | journey, motion |
| data | ᚨ | Ansuz | word, wisdom |
| skills | ᚲ | Kenaz | torch, knowledge, craft |
| about | ᛗ | Mannaz | humankind, the self |
| contact | ᚷ | Gebo | gift, exchange |

Thai meanings:
- ᚢ พลังชีวิต สุขภาพ
- ᛏ ดาวนำทาง
- ᚱ การเดินทาง การเคลื่อนที่
- ᚨ ถ้อยคำ ปัญญา
- ᚲ คบเพลิง ความรู้ งานช่าง
- ᛗ มนุษย์ ตัวตน
- ᚷ ของขวัญ การแลกเปลี่ยน

Project entries (EN title · constellation/order · featured · status · known facts only; everything else `[TODO: Mickie]`):

| slug | title.en | const/order | featured | status | known facts |
|---|---|---|---|---|---|
| medi-ident-ai | Medi-Ident AI | medical/0 | 1 | done | Android app identifying blood-pressure medications from photos; exhibited at PRIS 2026 (29–30 Oct 2026) |
| dc-cellnet | DC-CellNet | medical/1 | 3 | in-progress | Blood-cell detection research; github https://github.com/popongfm/DC-CellNet |
| mymedicine | MyMedicine | medical/2 | – | done | Pill instance segmentation with YOLO-seg |
| hospital-system | Hospital & Clinic System | medical/3 | – | done | Supabase web app: patients, staff roles, pharmacy, AI agent |
| ispace-lunar-workshop | ispace Lunar Mission Workshop | space/0 | 2 | done | Selected participant via online application |
| grb-cubesat | Gamma-Ray Burst CubeSat | space/1 | – | done | 6U CubeSat mission concept, GISTDA School Satellite Competition 2025; role: team lead |
| turtlebot3-person-detection | TurtleBot3 Person Detection | robotics/0 | – | done | ROS 2; odometry distance client + YOLO detection server; group project |
| amr-iiot | AMR IIoT Prototype | robotics/1 | – | done | AMRs hauling goods from factory QC to loading dock; user testing with QC staff, drivers, managers |
| tictactoe-robot | Tic-Tac-Toe Robot (PERSPECTIVE show) | robotics/2 | – | done | PLC + YOLO vision; role sentence from Global Constraints |
| lucien | LUCIEN | data/0 | – | in-progress | Personal AI agent |
| big-data-pipeline | Big Data Pipeline | data/1 | – | done | Course final project (AIE321) |
| visionquest-chatbot | VisionQuest Chatbot | data/2 | – | done | Course chatbot (AIE312) |
| ocr-drive-pipeline | Drive OCR Pipeline | data/3 | – | done | Google Drive OCR → Google Sheets, Fernet encryption |

- [ ] **Step 1: Write failing unit tests:**
  - `runes.test.ts`:
    - `FUTHARK.length === 24` (spread into chars)
    - every `LIT_RUNES` char is in `FUTHARK`
    - `RUNES.space.char === 'ᛏ'`
  - `projects.test.ts` (use `getProjects` against the real collection via `astro:content` mocked with the `experimental_AstroContainer`, or test the pure helper `localize(entry, locale)` extracted into `lib/projects.ts`):
    - `localize` with `th` and no `title.th` → `title === title.en` and `isFallback === true`
    - featured slugs in order are `['medi-ident-ai','ispace-lunar-workshop','dc-cellnet']`
    - no entry's title or body contains `ANTARES` or `Jetson`
    - each constellation's `order` values are unique
- [ ] **Step 2:** Run `npx vitest run` → FAIL.
- [ ] **Step 3:** Implement the data, schema (zod via `astro/zod`), entries and `localize(entry, locale): LocalizedProject` (pure) plus `getProjects`/`getFeatured`.
- [ ] **Step 4:** Run `npx vitest run` → PASS.
- [ ] **Step 5:** Commit `feat: add rune table and project content collection`.

### Task 3: i18n and routing

**Files:**
- Create: `src/i18n/ui.ts`
- Create pages under `src/pages/` mirrored for TH: `index.astro`, `work/index.astro`, `work/[slug].astro`, `about.astro`, `cv.astro` and `th/` copies that render shared page components with `locale="th"`
- Test: `tests/unit/i18n.test.ts`, `tests/e2e/i18n.spec.ts`

**Interfaces:**
- Produces:
  - `t(locale: 'en' | 'th', key: UiKey): string`
  - `localePath(locale, path: string): string` (`localePath('th','/work')` → `/th/work`; `localePath('en','/work')` → `/work`)
  - `altLocale(locale)`
  - `UiKey` includes `nav.work nav.about nav.cv nav.contact cta.begin cta.quick fallback.notice featured.label status.inProgress rune.traditional tarot.past tarot.present tarot.future sky.recenter sky.close`
- Page components live in `src/views/*.astro` taking `{locale}`, so EN and TH routes are 3-line wrappers.

- [ ] **Step 1: Failing tests:**
  - unit: `localePath` cases above; `t('th','fallback.notice') === 'ยังไม่มีฉบับภาษาไทย — แสดงเป็นภาษาอังกฤษ'`; every key has `en` and `th`
  - e2e `th fallback`: `/th/work/mymedicine` shows the English title and the notice text
  - e2e `hreflang`: `/work` has `<link rel="alternate" hreflang="th" href="https://popongfm.github.io/th/work">`
- [ ] **Step 2:** Run both → FAIL.
- [ ] **Step 3:** Implement. Claude drafts the TH UI strings; mark them in a comment `// TH strings drafted by Claude — review with Mickie`.
- [ ] **Step 4:** Run both → PASS.
- [ ] **Step 5:** Commit `feat: add en/th routing with english fallback`.

### Task 4: Landing page fast path

**Files:**
- Create: `src/views/Home.astro`, `src/components/Hero.astro`, `src/components/FeaturedStones.astro`, `src/components/RuneGlyph.astro`, `src/components/SkyRing.astro`
- Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `getFeatured`, `getProjects`, `RUNES`, `FUTHARK`, `LIT_RUNES`, `toRunes` (Task 7 — until then hard-code `ᛈᛟᛈᛟᛜ`), `CONSTELLATIONS` (Task 8 layout — implement `src/lib/sky/layout.ts` here if Task 8 is not done; its interface is defined in Task 8)
- Produces:
  - `SkyRing.astro` renders an `<svg>` (decor, `aria-hidden`), plus one `<a class="star" href="/work/<slug>" data-slug data-constellation>` per project, absolutely positioned over it, with accessible name = project title
  - ring runes `ᚲ ᛗ ᚷ` are `<a data-panel="skills|about|contact" href="/about#skills|/about|/about#contact">`
  - root `#sky` with `data-mode="static"`

Copy (EN, exact):
- eyebrow: "AI ENGINEERING & DATA SCIENCE · BANGKOK UNIVERSITY"
- h1: "Reading the sky, *building* with it."
- body: "I build AI for medicine, machines that move, and missions that look up. Each star is a project, each rune a meaning — follow a constellation, or skip straight to the work."
- CTAs: "BEGIN THE JOURNEY" (`href="#journey"`) and "QUICK VIEW" (`href="/work"`)
- caption under the runic name: "“POPONG” IN ELDER FUTHARK"

Layout follows the Merged artboard at ≥1100px:
- text column on the left
- ring on the right, centered at about 70% width, radius ≈ min(300px, 30vw)
- the three featured stones across the bottom

Below 1100px: stack text → ring (scaled) → stones.

- [ ] **Step 1: Failing e2e:**
  - `featured order`: stone headings are `Medi-Ident AI`, `ispace Lunar Mission Workshop`, `DC-CellNet`, and DC-CellNet shows "In progress"
  - `works without js`: with `javaScriptEnabled: false`, every `.star` link is present (13) and the Quick view link works
  - `no three on load`: collect `page.on('request')` URLs during load plus 2 s idle; none matches `/three/`
  - `phone width`: at 390px, `scrollWidth <= 390`
  - `rune tooltip`: hovering ᚢ in a stone shows "Uruz" and "vitality, health" and the text "traditional meaning"
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement the components. Generate the ring positions at build time: rune j at angle `j/24·2π` on radius `R`. LIT runes get `--gold-3` with a halo; the others get `--rune-off`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: landing page fast path with static rune ring`.

### Task 5: Work list and project pages

**Files:**
- Create: `src/views/WorkIndex.astro`, `src/views/WorkDetail.astro`, `src/components/ProjectBody.astro`
- Test: `tests/e2e/work.spec.ts`

**Interfaces:**
- Produces: `ProjectBody.astro` props `{ project: LocalizedProject; locale; headingLevel: 1 | 2 }`. It renders the rune, title, status badge, role, year, tools, links, images and body, and the fallback notice when `isFallback`. Reused by the panel in Task 8 via a server-rendered `<template id="tpl-<slug>">` on `/`.

- [ ] **Step 1: Failing e2e:**
  - `/work` has 4 group headings in rune order ᚢ ᛏ ᚱ ᚨ with 4/2/3/4 items
  - `/work/grb-cubesat` h1 is "Gamma-Ray Burst CubeSat" and the page text has no "ANTARES"
  - `/work/tictactoe-robot` contains "did not develop the full system"
  - `/work/dc-cellnet` has a link to `https://github.com/popongfm/DC-CellNet`
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement with `getStaticPaths` from `getProjects`. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: work index and project detail pages`.

### Task 6: About (tarot + skills), contact, CV

**Files:**
- Create: `src/data/tarot.ts`, `src/components/TarotSpread.astro`, `src/components/Skills.astro`, `src/components/Contact.astro`, `src/views/About.astro`, `src/views/Cv.astro`
- Test: `tests/e2e/about.spec.ts`

**Interfaces:**
- Produces:
  - `TAROT: { id: 'fool' | 'magician' | 'star'; numeral: '0' | 'I' | 'XVII'; name: string; slot: 'past' | 'present' | 'future'; rune: string; image?: string; text: {en, th?} }[]`
    - runes: fool ᚠ, magician ᚲ, star ᛏ
    - `text` is `[TODO: Mickie]` until supplied
    - `image` is undefined until Mickie supplies the file at `public/tarot/<id>.webp` (spec: portrait ~7:12, ≥1500px tall)
  - Each card is a `<button aria-expanded>` that flips (CSS 3D, or an instant swap under reduced motion) to reveal the text. The SVG gold frame (border, numeral top, name and rune bottom) wraps either the image or the line-art placeholder (a simple gold-line star/figure motif, original).
  - `Skills.astro` has `id="skills"` and lists the union of all project `tools`, grouped by rune constellation
  - `Contact.astro` has `id="contact"`, with the rune ᚷ, email `mailto:`, GitHub and LinkedIn
  - `Cv.astro`:
    - HTML CV: education "B.Eng. AI Engineering and Data Science, Bangkok University, 2024–2028 (expected)"
    - roles from the profile: hackathon Technical Assistant ×3 with names, Open House 2025 staff, PRIS 2026 exhibitor, ispace workshop participant
    - shows a "Download PDF" link only if `public/cv.pdf` exists at build time (`fs.existsSync`)
- [ ] **Step 1: Failing e2e:**
  - three cards in order 0, I, XVII
  - clicking The Magician sets `aria-expanded="true"`
  - with `reducedMotion: 'reduce'`, no element under `.tarot` has a running CSS animation or transition longer than 0s
  - `#skills` and `#contact` exist, and contact has `mailto:popong.faim@bumail.net`
  - `/cv` has no "Download PDF" link while `public/cv.pdf` is absent
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: about page with tarot spread, skills, contact and cv`.

### Task 7: Runic transliteration and decode effect

**Files:**
- Create: `src/lib/runic.ts`
- Test: `tests/unit/runic.test.ts`

**Interfaces:**
- Produces:
  - `toRunes(text: string): string` (Latin → Elder Futhark)
  - `decodeFrames(text: string, steps: number): string[]`: frame 0 = `toRunes(text)`, the last frame = `text`, and frame k reveals the first `ceil(k/steps·len)` characters as Latin
  - `runDecode(el: HTMLElement, text: string, opts: { reducedMotion: boolean; durationMs?: number /*default 700*/ }): void`

Mapping:
- digraphs first: `th→ᚦ`, `ng→ᛜ`
- letters: `a ᚨ, b ᛒ, c ᚲ, d ᛞ, e ᛖ, f ᚠ, g ᚷ, h ᚺ, i ᛁ, j ᛃ, k ᚲ, l ᛚ, m ᛗ, n ᚾ, o ᛟ, p ᛈ, q ᚲ, r ᚱ, s ᛊ, t ᛏ, u ᚢ, v ᚹ, w ᚹ, x ᚲᛊ, y ᛃ, z ᛉ` (case-insensitive)
- every other character passes through unchanged

- [ ] **Step 1: Failing tests:**
  - `toRunes('Popong') === 'ᛈᛟᛈᛟᛜ'`
  - `toRunes('the') === 'ᚦᛖ'`
  - `toRunes('DC-CellNet') === 'ᛞᚲ-ᚲᛖᛚᛚᚾᛖᛏ'`
  - `non-latin passthrough`: `toRunes('ระบบ') === 'ระบบ'`, and `decodeFrames('ระบบ',5)` has every frame `=== 'ระบบ'`
  - `decodeFrames('ab',2)` deep-equals `['ᚨᛒ','aᛒ','ab']`
  - `runDecode` with `reducedMotion: true` sets `el.textContent` to the final text synchronously (jsdom env)
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. Wire it in: the hero runic name uses `toRunes(site.name.split(' ')[0])`. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: elder futhark transliteration and decode effect`.

### Task 8: Sky controller — journey mode, panel, hash, keyboard (2D)

**Files:**
- Create: `src/lib/sky/layout.ts`, `src/lib/sky/capability.ts`, `src/lib/sky/hashState.ts`, `src/components/ProjectPanel.astro`, `src/islands/sky/SkyController.ts`
- Modify: `src/views/Home.astro` (include the panel, project templates and `<script>` for the controller)
- Test: `tests/unit/sky.test.ts`, `tests/e2e/sky.spec.ts`

**Interfaces:**
- Produces:
  - `CONSTELLATIONS: Record<ConstellationId, { points: [number, number][]; lines: number[][] }>` in ring-normalized coords (center 0,0; ring radius 1; y down). Values from the Merged artboard:
    - medical points `[[-0.633,-0.4],[-0.433,-0.55],[-0.233,-0.433],[-0.133,-0.2],[-0.3,-0.067]]`, lines `[[0,1,2,3,4]]`
    - space points `[[0.333,-0.55],[0.167,-0.7],[0.5,-0.667],[0.333,-0.317],[0.367,-0.1]]`, lines `[[1,0,2],[0,3,4]]`
    - robotics points `[[-0.533,0.367],[-0.3,0.233],[-0.067,0.4],[0.167,0.283],[0.367,0.45]]`, lines `[[0,1,2,3,4]]`
    - data points `[[0.533,-0.133],[0.667,0.033],[0.617,0.233],[0.733,-0.233]]`, lines `[[3,0,1,2]]`
    - project with `order` i sits on `points[i]`; extra points are decorative
  - `starPosition(constellation, order): [number, number]` (throws if order ≥ points.length)
  - `chooseSkyMode({ webgl2: boolean; width: number }): '3d' | '2d'` ('3d' iff `webgl2 && width >= 768`)
  - `parseHash(hash): { journey: boolean; star: string | null; panel: PanelRuneId | null }` and `toHash(state): string`
    - `''` → all false/null
    - `'#journey'` → journey only
    - `'#star-x'` → journey + star `x`
    - `'#panel-about'` → journey + panel
  - `SkyController`:
    - `init(root: HTMLElement, opts: { reducedMotion: boolean; knownSlugs: string[]; load3d: () => Promise<Sky3DModule> })`
    - adds `data-mode` = `'2d'`/`'3d'` and `data-journey="true"` on `#sky`
    - intercepts `.star` and ring-rune clicks in journey mode and opens the panel from `<template id="tpl-<slug>">` or `tpl-panel-<id>`, then runs `runDecode` on the panel heading
    - uses `history.pushState` for the hash; `popstate` closes or opens accordingly
    - Esc closes and returns focus to the originating star
    - arrow keys move focus through `.star` in DOM order (constellation, then order)
    - a recenter button (`t('sky.recenter')`)
    - the panel is a `role="dialog" aria-modal="false" aria-labelledby` region on the right (bottom sheet below 768px)
    - unknown slug → `history.replaceState` to `#journey`, no panel
    - stores nothing in storage
- [ ] **Step 1: Failing unit tests:**
  - every project's `starPosition` is within radius 0.84 of the origin
  - `chooseSkyMode({webgl2:true,width:767}) === '2d'` and `({webgl2:true,width:768}) === '3d'` and `({webgl2:false,width:1440}) === '2d'`
  - `parseHash`/`toHash` round-trip for all four shapes
- [ ] **Step 2: Failing e2e** (project config `chromium` with `--use-gl=swiftshader`; force 2D via `?sky=2d` query read by the controller for tests):
  - `begin`: click Begin → `#sky[data-journey="true"]`, URL hash `#journey`
  - `open star`: click star `medi-ident-ai` → dialog heading becomes "Medi-Ident AI" within 1 s, hash `#star-medi-ident-ai`; `page.goBack()` closes it
  - `deep link`: load `/#star-dc-cellnet` → panel open with "In progress"
  - `unknown star hash`: load `/#star-nope` → no dialog, hash `#journey`, zero console errors
  - `keyboard`: focus the first star, ArrowRight → the second star is focused, Enter opens, Esc closes and focus returns
  - `ring rune`: click ᚷ → the contact panel shows the mailto link
  - `phone`: at 390px the panel is a bottom sheet, `scrollWidth <= 390`
  - `reduced motion`: heading text equals the final title immediately after open
- [ ] **Step 3:** Run → FAIL. **Step 4:** Implement. **Step 5:** Run → PASS.
- [ ] **Step 6:** Commit `feat: sky controller with journey mode, panels and hash routing`.

### Task 9: Bright star catalog

**Files:**
- Create: `scripts/build-bsc5.mjs`, `src/lib/sky/catalog.ts`, `public/data/bsc5.min.json` (generated, committed)
- Test: `tests/unit/catalog.test.ts`

**Interfaces:**
- Produces:
  - `parseBsc5Line(line: string): { ra: number /*hours*/; dec: number /*deg*/; mag: number } | null`
    - fixed-width columns (1-based): RAh 76–77, RAm 78–79, RAs 80–83, DE− 84, DEd 85–86, DEm 87–88, DEs 89–90, Vmag 103–107
    - returns null when RA or Vmag is blank
  - `raDecToVec3(raHours, decDeg, r): [x, y, z]` with `x = r·cosδ·cos α`, `y = r·sinδ`, `z = −r·cosδ·sin α` (α in radians from hours ×15°)
  - JSON format: flat array `[ra, dec, mag, …]`, rounded to 3 decimals, `mag <= 6.0`
  - npm script `bsc5` downloads `https://cdsarc.cds.unistra.fr/ftp/V/50/catalog.gz`, gunzips it and writes the JSON
- [ ] **Step 1: Failing tests:**
  - a synthetic line built by placing `'05','55','10.3','+','07','24','25'` and `' 0.50'` at the stated columns → `{ ra≈5.9195, dec≈7.4069, mag:0.5 }` (toBeCloseTo 3)
  - a blank-RA line → null
  - `raDecToVec3(0,0,1)` ≈ `[1,0,0]`; `raDecToVec3(0,90,1)` ≈ `[0,1,0]`; `raDecToVec3(6,0,1)` ≈ `[0,0,-1]`
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement and run `npm run bsc5` once. Expect the output length/3 to be between 5000 and 9200. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: yale bright star catalog background data`.

### Task 10: Sky3D (Three.js)

**Files:**
- Create: `src/islands/sky/Sky3D.ts`
- Modify: `src/islands/sky/SkyController.ts` (call `load3d` when mode is '3d' on Begin or deep link)
- Test: `tests/e2e/sky3d.spec.ts`

**Interfaces:**
- Consumes: `CONSTELLATIONS`, `starPosition`, `raDecToVec3`, `/data/bsc5.min.json`, `FUTHARK`, `LIT_RUNES`
- Produces: `type Sky3DModule = { mount(canvasHost: HTMLElement, opts: { projects: {slug; constellation; order; brightness; title}[]; reducedMotion: boolean; onHover(slug | null): void; onSelect(slug): void; onPanelRune(id: PanelRuneId): void }): Sky3DHandle }` and `Sky3DHandle = { focusStar(slug): void; recenter(): void; destroy(): void; pickAtForTest(slug): void }`

Scene decisions:
- background: BSC5 points on a sphere r=500, size ∝ 10^(−0.4·mag), color cream
- the project field is a plane at z=0 facing the camera, scale 1 ring unit = 100 world units
- ring: 24 rune sprites (canvas-text textures, Noto Sans Runic) at radius 100. LIT runes gold with additive glow; the others `#4E4632`
- project stars are sprites sized by `brightness`, with constellation lines gold at opacity 0.75
- camera:
  - intro dolly from z=900 to z=260 over 2.2 s, ease-out (skipped under reduced motion)
  - OrbitControls with damping, `enablePan=false`, `minPolarAngle/maxPolarAngle = π/2 ± 0.35`, `minAzimuth/maxAzimuth = ±0.5`, distance 180–420
- hover: raycast → the star scales 1.6× and the lit rune of its constellation pulses
- the existing DOM `.star` links stay as an invisible, focusable layer projected each frame to screen coords, so keyboard and screen readers keep working and the e2e can click them
- `webglcontextlost` or a failed `WebGL2RenderingContext` creation → `destroy()` and the controller switches `data-mode` to '2d'

- [ ] **Step 1: Failing e2e** (swiftshader, no `?sky=2d`):
  - `3d mounts`: Begin → `#sky[data-mode="3d"] canvas` visible within 5 s, and a request to a URL matching `/three/` happened only after the click
  - `3d select`: click the `.star[data-slug="ispace-lunar-workshop"]` overlay → panel heading "ispace Lunar Mission Workshop"
  - `webgl fallback`: inject `HTMLCanvasElement.prototype.getContext = () => null` via `addInitScript` → after Begin `data-mode="2d"` and opening a star still works
  - `phone stays 2d`: at 390px after Begin, no canvas and `data-mode="2d"`
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: three.js sky with constrained orbit and rune ring`.

### Task 11: Accessibility, performance and launch check

**Files:**
- Create: `tests/e2e/a11y.spec.ts`, `tests/e2e/perf.spec.ts`
- Modify: whatever the tests expose

- [ ] **Step 1: Failing/guard tests:**
  - axe (`@axe-core/playwright`, tags wcag2a/wcag2aa) on `/`, `/work`, `/work/medi-ident-ai`, `/about`, `/cv`, `/th/` → zero violations
  - `perf`: on `/` with CPU 4× throttle and Fast 4G emulation via CDP, LCP (PerformanceObserver) < 2500 ms
  - the total JS transferred before interaction is < 60 KB gz
  - `content guard`: crawl every built HTML file in `dist/` → none contains `ANTARES`, `Jetson`, `<audio`, or `[TODO` (except in pages for `draft:false` entries still missing content — **list any hits in the PR description instead of failing**, so Mickie can see what content is missing)
- [ ] **Step 2:** Run → fix violations until PASS.
- [ ] **Step 3:** `npm run build` → zero errors. Push to `main` on GitHub repo `popongfm/popongfm.github.io` **only when Mickie says to publish**. Set Settings → Pages → Source to "GitHub Actions".
- [ ] **Step 4:** Commit `test: accessibility, performance and content guards`.
