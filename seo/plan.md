# SEO Audit Fix Plan for zellwk.com

## What's Left

### 1. Backfill missing blog post descriptions (211 remaining)

**Tracker:** `seo/descriptions-tracker.md`
**How to continue:** Say "continue backfilling descriptions" — read the tracker, find the next 10 pending posts, read each, write a ~150 char description, add to frontmatter, update tracker.
**Pace:** 10 posts per session.

## Key Files Reference

- `site-config.js` — site-wide SEO config
- `src/layouts/Base/Head.astro` — renders SEO component + head tags
- `src/pages/blog/[slug].astro` — blog post template
- `src/pages/blog/index.astro` — blog listing page
- `src/pages/index.astro` — homepage
- `src/pages/tags/[tag].astro` — tag pages
- `astro.config.mjs` — Astro config (sitemap lastmod configured)
- `seo/descriptions-tracker.md` — tracks description backfill progress
- `seo/jsonld-reference.md` — JSON-LD reference for all pages
