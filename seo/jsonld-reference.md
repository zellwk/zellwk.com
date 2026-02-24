# JSON-LD Reference for zellwk.com

All JSON-LD is rendered using the `<JsonLD>` component from `@splendidlabz/astro`.

## Pages and their JSON-LD

### Homepage (`/`)
- **Organization** — name, logo, url, sameAs (social links)

### About page (`/about/`)
- **ProfilePage** — wraps Person as `mainEntity` with name, url, sameAs

### Blog post (`/blog/[slug]/`)
- **Article** — headline, datePublished, dateModified, image (OG image), author (Person array), publisher (Organization)
- **BreadcrumbList** — Home > Blog > Post Title

### Blog index (`/blog/`)
- **BreadcrumbList** — Home > Blog

### Tags index (`/tags/`)
- **BreadcrumbList** — Home > Tags

### Individual tag (`/tags/[tag]/`)
- **BreadcrumbList** — Home > Tags > #tag

### Pages without JSON-LD
- `/newsletter/` — no applicable schema
- `/testimonials/` — no applicable schema
- `/500` — error page, not indexed

## Available but unused types

These are built into `@splendidlabz/astro` and ready to use when needed:

- **FAQ** — for posts with Q&A sections. Use `type="FAQ"` with `items: [{ question, answer }]`
- **Course** — for course landing pages. Use `type="Course"` with `name`, `description`, `provider`
- **Carousel / ItemList** — for curated lists of content
- **LocalBusiness** — not applicable for this site

## Notes

- `Article` and `BlogPosting` are equivalent for Google — no need to switch
- `WebSite` + `SearchAction` was skipped — Google generates sitelinks search box automatically
- Author must be passed as an **array** to ArticleJsonLD (it iterates with `for...of`)
- The `type` prop is used for routing only and stripped before output — use `publisher` not `provider`
