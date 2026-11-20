import type { Locale } from '../data/site';
import type { ConstellationId } from '../data/runes';
import { CONSTELLATION_ORDER } from '../data/runes';

type Text = { en: string; th?: string };
export interface ProjectData {
  title: Text; summary: Text; role: Text;
  constellation: ConstellationId; order: number; brightness: 1 | 2 | 3;
  featured?: 1 | 2 | 3; status: 'done' | 'in-progress';
  context: string; year: string; contextTh?: string; yearTh?: string; tools: string[];
  links: { github?: string; demo?: string; paper?: string };
  images: { src: string; alt: string }[]; draft: boolean;
}
export interface LocalizedProject extends Omit<ProjectData, 'title' | 'summary' | 'role'> {
  slug: string; title: string; summary: string; role: string; isFallback: boolean;
}

export function localize(entry: { id: string; data: ProjectData }, locale: Locale): LocalizedProject {
  const { title, summary, role, ...rest } = entry.data;
  const pick = (t: Text) => (locale === 'th' && t.th ? t.th : t.en);
  const isFallback = locale === 'th' && !(title.th && summary.th && role.th);
  const th = locale === 'th';
  return { ...rest, context: (th && rest.contextTh) || rest.context, year: (th && rest.yearTh) || rest.year, slug: entry.id, title: pick(title), summary: pick(summary), role: pick(role), isFallback };
}

export function sortProjects<T extends { constellation: ConstellationId; order: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => CONSTELLATION_ORDER.indexOf(a.constellation) - CONSTELLATION_ORDER.indexOf(b.constellation) || a.order - b.order);
}

export async function getProjects(locale: Locale): Promise<LocalizedProject[]> {
  const { getCollection } = await import('astro:content');
  const all = await getCollection('projects', (e) => !e.data.draft);
  return sortProjects(all.map((e) => localize(e as any, locale)));
}

export async function getFeatured(locale: Locale): Promise<LocalizedProject[]> {
  return (await getProjects(locale)).filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!);
}

export async function getThaiBody(slug: string) {
  const { getEntry, render } = await import('astro:content');
  const e = await getEntry('projectsTh', slug);
  return e ? render(e) : null;
}
