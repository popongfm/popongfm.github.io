import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ en: z.string(), th: z.string().optional() });

const projects = defineCollection({
  loader: glob({ pattern: ['*.md', '!*.th.md'], base: './src/content/projects' }),
  schema: z.object({
    title: text,
    summary: text,
    constellation: z.enum(['medical', 'space', 'robotics', 'data']),
    order: z.number().int().min(0),
    brightness: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
    featured: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    status: z.enum(['done', 'in-progress']),
    role: text,
    context: z.string(),
    contextTh: z.string().optional(),
    yearTh: z.string().optional(),
    year: z.string(),
    tools: z.array(z.string()).default([]),
    links: z.object({ github: z.string().url().optional(), demo: z.string().url().optional(), paper: z.string().url().optional() }).default({}),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const projectsTh = defineCollection({
  loader: glob({ pattern: '*.th.md', base: './src/content/projects', generateId: ({ entry }) => entry.replace(/\.th\.md$/, '') }),
  schema: z.object({}).passthrough(),
});

export const collections = { projects, projectsTh };
