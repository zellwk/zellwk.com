# AEO (Answer Engine Optimization) Plan for zellwk.com

Optimizing the site to be cited by AI answer engines — Google AI Overviews, ChatGPT, Perplexity, Gemini, etc.

**Overlaps with SEO plan:** Items marked with `(SEO plan)` are also tracked in `seo/plan.md` and should be done once, not twice.

---

## Phase 1 — Structured Data (Critical)

These are the highest-impact changes. AI engines rely on structured data to identify authoritative, well-attributed content.

### 1a. Add `BlogPosting` JSON-LD schema to blog posts `(SEO plan 3c)`

Requires changes to `@splendidlabz/astro`.

Fields needed:
- `@type`: BlogPosting
- `headline`: post title
- `description`: post description (or auto-generated excerpt)
- `datePublished`: pubDate
- `dateModified`: updateDate (when present)
- `author`: Person reference (see 1b)
- `image`: OG image URL
- `url`: canonical URL
- `publisher`: Person or Organization
- `mainEntityOfPage`: canonical URL

### 1b. Add `Person` JSON-LD schema for Zell Liew `(SEO plan 3c)`

Can be embedded in BlogPosting author field or standalone on the About page.

Fields needed:
- `@type`: Person
- `name`: Zell Liew
- `url`: https://zellwk.com/about/
- `sameAs`: [GitHub, Twitter/X, YouTube, CSS-Tricks author page, npm]
- `jobTitle`: Web Developer / Educator
- `description`: Short bio

### 1c. Add `BreadcrumbList` schema to blog posts `(SEO plan 3c)`

Path: Home > Blog > Post Title

### 1d. Set og:type to "article" for blog posts `(SEO plan 3b)`

Add `article:published_time`, `article:modified_time`, `article:author`, `article:tag`.

### 1e. Add `WebSite` schema to homepage `(SEO plan 3c)`

With `SearchAction` for sitelinks search box.

---

## Phase 2 — Content Metadata

### 2a. Continue meta description backfill `(SEO plan 1)`

Tracked in `seo/descriptions-tracker.md`. Currently 10/231 done.

For AEO priority, focus first on posts that:
- Target question-based queries ("how to", "what is", "why does")
- Cover topics where you have unique expertise (CSS reset, arrays, JavaScript learning)
- Have high existing traffic

### 2b. Add author byline to blog post template

- [ ] Add author name + link to About page on each blog post
- [ ] File: `src/pages/blog/[slug].astro`
- [ ] Keep it minimal — "Written by Zell Liew" with link

### 2c. Fix `<main>` element in layout

- [ ] Replace `<div class="content">` with `<main>` in `src/layouts/Base.astro`
- [ ] AI crawlers use `<main>` to identify primary content vs. navigation/chrome

---

## Phase 3 — Answer-Optimized Content

### 3a. Add concise answer paragraphs to key posts

AI engines extract 1-2 sentence direct answers. For high-value posts, add a concise "answer" near the top that directly addresses the core question.

Example — a post titled "My CSS Reset" could open with:
> A CSS reset removes inconsistent default browser styles so you start from a clean, predictable baseline. Here's the reset I use on every project and why each rule matters.

Priority posts to update:
- [ ] CSS reset
- [ ] How to learn JavaScript
- [ ] Overcoming fear of JavaScript
- [ ] How I work with arrays
- [ ] (Identify more from traffic data)

### 3b. Use question-format H2s where natural

Rewrite section headings as questions when it fits:
- "Box Sizing" → "Why change box-sizing to border-box?"
- "Removing margins" → "Why remove default margins and paddings?"

Only where it reads naturally — don't force it.

### 3c. Add FAQ sections to relevant posts

For posts covering broad topics, add a short FAQ section at the bottom addressing "People Also Ask" style questions. Back these with `FAQPage` schema (see Phase 4).

### 3d. Add summary / TL;DR sections

For longer tutorial posts (1500+ words), add a brief summary at the top or bottom. AI engines can extract these as concise answers.

---

## Phase 4 — Rich Schema for Specific Content Types

### 4a. Add `FAQPage` schema to posts with Q&A patterns

Identify posts that answer multiple distinct questions. Add FAQ schema with question/answer pairs.

Candidates:
- Posts with "FAQ" or "questions" sections
- Posts structured as "X things about Y"
- Posts addressing common misconceptions

### 4b. Add `HowTo` schema to tutorial posts

For posts with clear step-by-step instructions. Include:
- `name`: tutorial title
- `step[]`: each step with text and optional image/code
- `totalTime`: estimated time (if applicable)

Candidates:
- "Setting up VS Code" series
- Build tool setup posts
- Component building tutorials

---

## Phase 5 — AI Visibility & Monitoring

### 5a. Consider `llms.txt`

Emerging standard (like robots.txt for AI). Not critical yet — revisit when the spec stabilizes. Would describe site purpose, key content areas, and author credentials in a machine-friendly format.

### 5b. Monitor AI citations weekly

Pick 10-15 queries that your content should answer. Check weekly across:
- Google AI Overviews
- ChatGPT
- Perplexity
- Gemini

Track: Are you cited? How prominently? What content gets pulled?

Example queries to monitor:
- "best CSS reset"
- "how to learn JavaScript"
- "JavaScript array methods"
- "CSS Grid tutorial"
- "overcome fear of coding"

### 5c. Consider topic hub pages

Create hub/pillar pages that aggregate related posts:
- "Everything about CSS" → links to all CSS posts
- "Learning JavaScript" → curated learning path
- AI engines prefer comprehensive, interlinked content clusters

---

## Key Files Reference

- `site-config.js` — site-wide config
- `src/layouts/Base.astro` — main layout (needs `<main>` element)
- `src/layouts/Base/Head.astro` — head tags, SEO component
- `src/pages/blog/[slug].astro` — blog post template (author byline goes here)
- `src/pages/about.astro` — about page (Person schema source)
- `src/content/config.ts` — content schema definitions
- `node_modules/@splendidlabz/astro/components/SEO/SEO.astro` — SEO component (READ ONLY)
- `seo/plan.md` — SEO plan (overlapping items)
- `seo/descriptions-tracker.md` — description backfill tracker

---

## Current AEO Score Card

| Area | Current | Target |
|------|---------|--------|
| JSON-LD structured data | None | BlogPosting + Person + Breadcrumb on all posts |
| Meta descriptions | 10/231 | 231/231 |
| og:type for blog posts | "website" | "article" |
| Author byline on posts | None | All posts |
| `<main>` element | Missing | Present |
| FAQ schema | None | 20+ posts |
| HowTo schema | None | 10+ tutorial posts |
| AI citation monitoring | None | Weekly tracking |
