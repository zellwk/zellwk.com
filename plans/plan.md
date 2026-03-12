# SEO Audit Fix Plan for zellwk.com

## What's Left

### 1. ✅ DONE - Backfill missing blog post descriptions

**Status:** All 231 articles now have descriptions (SEO Optimization Pass 7 completed)
**Tracker:** `seo/descriptions-tracker.md` — 231/231 done

### 2. SEO Component Updates

**Pending fixes in `@splendidlabz/astro`:**
- Fix OGImageUrl typo
- Add `og:type: "article"` to article pages
- Add JSON-LD structured data markup

**Impact:** These changes affect SEO metadata for all 451 blog posts and need to be made at the component level (not per-post).

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
