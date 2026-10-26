#!/usr/bin/env node
// Quick capture: `npm run new "Thing I built"` creates src/content/projects/<slug>/index.md.
// Drop a hero.png (or .jpg/.webp) next to it and it shows up on the tile and the project page.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new "Project title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, 'src/content/projects', slug);

if (existsSync(dir)) {
  console.error(`Already exists: ${path.relative(root, dir)}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });
writeFileSync(
  path.join(dir, 'index.md'),
  `---
title: ${JSON.stringify(title)}
summary: "One sentence on what it is."
# live: https://example.com
date: ${new Date().toISOString().slice(0, 10)}
---

A few lines on what it is and why I built it.
`,
);
console.log(`${path.relative(root, dir)}/index.md  (add hero.png in the same folder)`);
