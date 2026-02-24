---
name: sync-content-plan
description: "Use when syncing a content plan to Obsidian, moving article ideas to the writing app, or when the user says sync content plan, move content plan, send plan to Obsidian, sync articles to content folder."
---

# Sync Content Plan to Obsidian

Parse a content plan markdown file and create individual post files in the Obsidian writing app, then delete the source plan.

## Destination

`/Users/zellwk/projects/Obsidian Vaults/Work/3. Content/Posts/`

## Process

1. **Identify the content plan file.** User provides the path, or search `seo/` and project root for `content-plan*.md` files.

2. **Ask the user** for the `Category` value (e.g. "Tech", "Life", "Business") if not specified.

3. **Parse each article** from the plan. Articles are `###` headings with metadata lines and bullet points below. Extract:
   - **Title** — from the `###` heading (strip any leading number + period)
   - **Location** — from `**Publish on:**` line. Map to: `My blog` for zellwk.com, `CSS Tricks` for CSS-Tricks
   - **Format** — from `**Format:**` line (the word(s) before the ` — ` dash)
   - **Notes** — the bullet points below the metadata

4. **Create one `.md` file per article** in the destination folder, named by the article title. Use this format:

```markdown
---
Category: {value from user}
location: {mapped location}
format: {format}
aiGenerated: true
---

{bullet point notes from the plan}
```

5. **Delete the source content plan file** after all posts are created.

6. **Report** how many files were created and list them.

## Frontmatter Fields

| Field | Source | Example |
|-------|--------|---------|
| Category | User-provided | Tech |
| location | Parsed from `**Publish on:**` | My blog, CSS Tricks |
| format | Parsed from `**Format:**` | Tutorial, Opinion piece |
| aiGenerated | Always `true` | true |

## Location Mapping

| Plan says | Frontmatter value |
|-----------|-------------------|
| zellwk.com | My blog |
| CSS-Tricks | CSS Tricks |

## Gotchas

- Titles may contain special characters (em dashes, colons, parentheses) — preserve them in the filename
- Some articles have a `**Product:**` line — include it in the body as `**Product:** X` on its own line before the bullets
- Don't create duplicates — check if a file with the same name already exists and skip it
- Delete the plan file only after all posts are confirmed written
