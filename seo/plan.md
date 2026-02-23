# SEO Audit Fix Plan for zellwk.com

## What's Done

- [x] **robots.txt** — fixed sitemap URL to `sitemap-index.xml`
- [x] **Twitter handle** — added `twitterHandle` and `siteHandle` (`@zellwk`) to `site-config.js`
- [x] **Preconnect** — added `<link rel="preconnect">` for TypeKit in `Head.astro`
- [x] **Homepage SEO** — added title + description to `src/pages/index.astro`
- [x] **Blog listing SEO** — improved title + description in `src/pages/blog/index.astro`
- [x] **Sitemap lastmod** — configured `serialize` callback in `astro.config.mjs` to add `lastmod` from `updateDate` > `pubDate` > filename date
- [x] **Descriptions backfill** — first 10 posts done (221 remaining)

---

## What's Left

### 1. Backfill missing blog post descriptions (221 remaining)

**Tracker:** `seo/descriptions-tracker.md`
**How to continue:** Say "continue backfilling descriptions" — read the tracker, find the next 10 pending posts, read each, write a ~150 char description, add to frontmatter, update tracker.
**Pace:** 10 posts per session.

### 2. Replace filenames with slugs in descriptions tracker

**File:** `seo/descriptions-tracker.md`
- Currently lists posts by filename (e.g. `2026-02-18-cause-of-depression.mdx`)
- Replace with slugs (e.g. `cause-of-depression`) for easier reference
- 371/449 posts have explicit `slug` in frontmatter; rest derive from filename minus date prefix

### 3. SEO component updates (in `@splendidlabz/astro`)

These require changes to the SEO component package, not the site repo:

**3a. Fix OGImageUrl → OGImageURL typo**
- `src/pages/blog/[slug].astro` passes `OGImageUrl` but the SEO component (`SEO.astro` line 44) destructures `OGImageURL`
- Per-post OG images are currently falling back to the generic `/og/fallback.png`
- Fix: either rename the prop in the blog template OR accept both in the SEO component

**3b. Set og:type to "article" for blog posts**
- Currently hardcoded to `"website"` in `SEO.astro` line 57
- Blog posts should use `og:type="article"` with `article:published_time`, `article:modified_time`, `article:tag`
- The `openGraph` prop already spreads (line 64), so this could be passed from blog template — but `basic.type` is hardcoded before the spread

**3c. Add JSON-LD structured data**
- Zero schema.org markup on the entire site
- Add to SEO component or create separate components:
  - `BlogPosting` schema on blog posts (headline, author, datePublished, dateModified, image)
  - `WebSite` schema on homepage (with `SearchAction` for sitelinks)
  - `Person` schema for Zell Liew
  - `BreadcrumbList` on blog/tag pages

## Key Files Reference

- `site-config.js` — site-wide SEO config (twitter handles added)
- `src/layouts/Base/Head.astro` — renders SEO component + head tags (preconnect added)
- `src/pages/blog/[slug].astro` — blog post template (OGImageUrl typo lives here)
- `src/pages/blog/index.astro` — blog listing page (SEO improved)
- `src/pages/index.astro` — homepage (title + description added)
- `src/pages/tags/[tag].astro` — tag pages
- `astro.config.mjs` — Astro config (sitemap lastmod configured)
- `public/robots.txt` — robots file (sitemap URL fixed)
- `seo/descriptions-tracker.md` — tracks description backfill progress
- `node_modules/@splendidlabz/astro/components/SEO/SEO.astro` — SEO component (READ ONLY in site repo)
