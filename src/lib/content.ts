import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'posts'>;

// Any hero.* dropped into a project's folder is picked up automatically.
const heroFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/*/hero.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true },
);

export function getHero(id: string): ImageMetadata | undefined {
  const key = Object.keys(heroFiles).find((k) => k.split('/').at(-2) === id);
  return key ? heroFiles[key].default : undefined;
}

export async function getProjects() {
  const all = await getCollection('projects');
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPosts() {
  // Drafts show in `npm run dev` but never in the built site.
  const all = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
