# Ben's Been Building

A small, dark, no-JavaScript portfolio site: one page of project tiles, plus a page for each project. Built with Astro and fully static.

```bash
npm run dev                  # http://localhost:4321
npm run new "Thing I built"  # scaffolds a project
npm run build                # static site in dist/
```

## Adding a project

`npm run new "Title"` creates `src/content/projects/<slug>/index.md`. In that file:

- `title` and `summary` (one sentence) appear on the tile.
- `live` is the URL behind the **Visit** button on the project page. Leave it out and the button is hidden.
- `date` sets the order. Newest comes first.
- The markdown body is the description on the project page.

Put a screenshot named `hero.png` (or `.jpg` / `.webp`) in the same folder. Until you do, the tile shows an empty frame.

## Blog

Posts go in `src/content/posts/*.md` and show at `/blog`, but nothing links there yet. Posts with `draft: true` are left out of the build.

## Deploying

Pushing to `main` deploys to GitHub Pages at https://bensbeenbuilding.com (see `.github/workflows/deploy.yml`).
