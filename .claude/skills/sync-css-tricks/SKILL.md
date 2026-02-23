---
name: sync-css-tricks
description: 'Use when syncing CSS-Tricks articles to the blog, checking for missing external articles, or when the user mentions CSS-Tricks articles not yet added to src/content/blog/. Triggers on: sync articles, sync css tricks, add css tricks articles, missing css tricks posts, check external articles.'
---

# Sync CSS-Tricks Articles

Fetch articles from the CSS-Tricks author page and create blog entries for any missing ones in `src/content/blog/`.

## Process

1. **Fetch author page:** WebFetch `https://css-tricks.com/author/zellwk/` — extract all article titles and URLs. Only page 1 unless user requests more.

2. **Find missing articles:** For each article, search `src/content/blog/` by grepping for the CSS-Tricks URL and searching by title keywords. Read the frontmatter of potential matches to confirm — filenames can be misleading.

3. **For each missing article, fetch its page to get:**
   - Publication date (from article metadata)
   - A one-sentence summary for the description

4. **Create blog entry files** using the format below.

## External Article Format

```mdx
---
title: Article Title Here
description: "One-sentence description of the article's core argument or insight."
url: https://css-tricks.com/article-slug/
external: CSS Tricks
tags: ['relevant', 'tags']
---
```

Add **updateDate** to the frontmatter of the article if it exists.

## File Naming

`{YYYY-MM-DD}-{slug}.mdx` where date is from the CSS-Tricks publication date and slug is a short kebab-case version of the title.

Examples:

- `2025-10-20-honeypot-field.mdx`
- `2026-01-26-no-need-to-trap-focus-dialog.mdx`
- `2026-02-02-vscode-theming-building-extension.mdx`

## Descriptions

- One sentence, in double quotes in the frontmatter
- Describe the core argument or insight, not just the topic
- Use em dashes for asides

## Tags

Common tags: `css`, `javascript`, `accessibility`, `tailwind`, `vscode`, `typography`, `layouts`, `design`, `theming`, `splendidlabz`, `astro`, `svelte`

Check existing articles for conventions.

## Gotchas

- **Verify matches by reading frontmatter**, not just filenames — content can be wrong in the file
- **Duplicate dates are fine** — multiple articles can share the same date
- **Search multiple ways** — by URL, title keywords, and filename patterns to avoid false negatives
