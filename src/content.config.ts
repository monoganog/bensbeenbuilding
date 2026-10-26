import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each project is a folder: src/content/projects/<slug>/index.md (+ hero.png/jpg/webp).
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // the one sentence on the tile
    live: z.string().url().optional(),
    date: z.coerce.date(), // newest first on the home page
  }),
});

// Blog is built but not linked anywhere yet.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
