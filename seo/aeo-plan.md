# AEO (Answer Engine Optimization) Plan for zellwk.com

Optimizing the site to be cited by AI answer engines — Google AI Overviews, ChatGPT, Perplexity, Gemini, etc.

---

## Phase 2 — Content Metadata

### 2a. Continue meta description backfill `(SEO plan 1)`

Tracked in `seo/descriptions-tracker.md`. Currently 20/231 done.

For AEO priority, focus first on posts that:
- Target question-based queries ("how to", "what is", "why does")
- Cover topics where you have unique expertise (CSS reset, arrays, JavaScript learning)
- Have high existing traffic

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

Emerging standard (like robots.txt for AI). Not critical yet — revisit when the spec stabilizes.

### 5b. Monitor AI citations weekly

Pick 10-15 queries that your content should answer. Check weekly across:
- Google AI Overviews
- ChatGPT
- Perplexity
- Gemini

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

- `seo/plan.md` — SEO plan (overlapping items)
- `seo/descriptions-tracker.md` — description backfill tracker
- `seo/jsonld-reference.md` — JSON-LD reference for all pages
