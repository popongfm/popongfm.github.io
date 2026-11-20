import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { localize } from '../../src/lib/projects';

const parseFrontmatter = (raw: string) => parse(raw.split(/^---$/m)[1]);

const dir = join(__dirname, '../../src/content/projects');
const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.endsWith('.th.md'));
const entries = files.map((f) => {
  const raw = readFileSync(join(dir, f), 'utf8');
  return { slug: f.replace(/\.md$/, ''), raw, data: parseFrontmatter(raw) };
});

describe('localize', () => {
  it('falls back to english when thai title is missing', () => {
    const p = localize({ id: 'x', data: { title: { en: 'Hello' }, summary: { en: 'S' }, role: { en: 'R' } } } as any, 'th');
    expect(p.title).toBe('Hello');
    expect(p.isFallback).toBe(true);
  });
  it('uses thai when present', () => {
    const p = localize({ id: 'x', data: { title: { en: 'Hello', th: 'สวัสดี' }, summary: { en: 'S', th: 'ส' }, role: { en: 'R', th: 'ร' } } } as any, 'th');
    expect(p.title).toBe('สวัสดี');
    expect(p.isFallback).toBe(false);
  });
});

describe('project content', () => {
  it('has 12 projects', () => {
    expect(entries.length).toBe(12);
  });
  it('featured order is medi-ident, ispace, dc-cellnet', () => {
    const featured = entries.filter((e) => e.data.featured).sort((a, b) => a.data.featured - b.data.featured).map((e) => e.slug);
    expect(featured).toEqual(['medi-ident-ai', 'ispace-lunar-workshop', 'dc-cellnet']);
  });
  it('never mentions ANTARES, Jetson or a phone number', () => {
    for (const e of entries) {
      expect(e.raw).not.toMatch(/ANTARES/i);
      expect(e.raw).not.toMatch(/Jetson/i);
      expect(e.raw).not.toMatch(/\+66/);
    }
  });
  it('order is unique within each constellation', () => {
    const seen = new Set<string>();
    for (const e of entries) {
      const key = `${e.data.constellation}/${e.data.order}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });
});

describe('code links from the portfolio PDF', () => {
  const expected: Record<string, string> = {
    'hospital-system': 'https://github.com/popongfm/AIE313-FinalProj_HospitalSystem',
    'visionquest-chat-portfolio': 'https://github.com/popongfm/AIE312-ChatBot-VISIONQUEST-',
    'fraud-analytics-pipeline': 'https://github.com/popongfm/AIE321_FinalProj_BigData_Pipeline',
    'thai-transport-volumes': 'https://github.com/popongfm/AIE314-FinalProj_DataPrep-Mining',
    'game-genre-prediction': 'https://github.com/popongfm/Game-Genres-Prediction',
    'community-discord-bot': 'https://github.com/popongfm/DiscordBot',
  };
  it('each project links to its repo', () => {
    for (const [slug, url] of Object.entries(expected)) {
      expect(entries.find((e) => e.slug === slug)!.data.links?.github, slug).toBe(url);
    }
    expect(entries.find((e) => e.slug === 'visionquest-chat-portfolio')!.data.links?.demo).toBe('https://visionquest-htn7.onrender.com/');
  });
});
