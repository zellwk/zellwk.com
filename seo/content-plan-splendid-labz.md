# Content Plan: Discovery from zellwk.com to Splendid Labz

## Strategy

Write educational articles on zellwk.com (and CSS-Tricks where appropriate) that teach concepts, show the hard way, then naturally bridge to Splendid Labz products. CSS-Tricks articles earn backlinks and entity authority. zellwk.com articles do the actual selling.

**Pattern:** Teach the concept → Show the hard way → Show your way → Link to docs/product page

---

## Splendid Layouts (5 articles)

### 1. How to build responsive layouts without writing CSS properties

**Publish on: zellwk.com** — Splendid Layouts is the whole point. Too product-centric for CSS-Tricks.
**Format: Tutorial** — High search volume keyword. Tutorials rank best for "how to" queries.

- Show the verbose way: manually writing `display: grid`, `grid-template-columns`, gap, media queries — all for a simple 3-column responsive grid
- Introduce the concept of layout utility classes — what if one class handled the responsive behavior, the gap, and the column count?
- Demo building 3-4 real layouts (sidebar + content, card grid, dashboard) using Splendid Layouts, linking to docs for each class used

### 2. CSS Grid vs Flexbox — and when you don't need to choose

**Publish on: CSS-Tricks** — Evergreen topic, massive search volume. Unique angle differentiates from existing articles. Splendid Layouts gets a brief mention at the end.
**Format: Educational/comparison** — The twist in the title differentiates from hundreds of existing articles.

- Break down the actual decision criteria: 1D vs 2D, content-driven vs layout-driven, intrinsic vs extrinsic sizing — with visual examples
- Show real cases where developers pick the wrong one and the CSS gets ugly as a result
- Show how Splendid Layouts abstracts this decision — you describe _what_ you want (sidebar, grid, stack) and the system picks the right approach

### 3. Building a masonry layout in CSS (without JavaScript)

**Publish on: CSS-Tricks** — Hot CSS topic, no clean native solution yet. CSS-Tricks readers eat this up. Your solution is one option among several.
**Format: Tutorial** — Masonry is a frequently searched layout problem.

- Walk through the current state of CSS masonry: the `masonry` value for `grid-template-rows`, browser support, and the polyfill situation
- Show the column-based CSS hack and its limitations (ordering issues, uneven columns)
- Demonstrate the Splendid Layouts approach — what it takes to get a working masonry layout with a single class, and how it handles the edge cases

### 4. 5 CSS layout patterns every developer should know

**Publish on: zellwk.com** — The before/after comparison with Splendid Layouts is central to the structure.
**Format: Roundup/tutorial** — Listicle format performs well for discovery. Multiple entry points from search.

- Cover the five: holy grail, sidebar + content, responsive card grid, sticky footer, and content stack — show the vanilla CSS for each
- Point out the repetitive boilerplate across all five — media queries, gap calculations, flex vs grid decisions repeated every time
- Rebuild all five with Splendid Layouts, showing the before/after code comparison for each pattern

### 5. Why I stopped writing CSS for layouts

**Publish on: zellwk.com** — Personal opinion piece. Your voice, your story, your product at the end.
**Format: Opinion piece** — Opinion pieces get shared and linked to. Strong title creates curiosity.

- Your journey: writing layouts by hand for years, the patterns you noticed repeating across every project, the frustration of solving the same problems
- What you built instead and the design philosophy behind it — layout as _intent_ rather than layout as _implementation_
- Honest take on when you still write custom CSS for layouts vs. when the utility classes handle it — credibility through nuance, not absolutism

---

## Splendid Astro (5 articles)

### 6. The complete guide to SEO in Astro

**Publish on: zellwk.com** — You built the SEO package. This article IS the product demo. Huge long-tail search potential.
**Format: Tutorial/guide** — High search volume. You're the authority here.

- Cover the full checklist: meta tags, Open Graph, Twitter cards, canonical URLs, JSON-LD structured data, sitemap, robots.txt
- Show the manual way — scattered `<meta>` tags, easy to forget fields, no validation, duplicated across layouts
- Introduce `@splendidlabz/astro` SEO component — one component that handles everything, with sensible defaults and full override support

### 7. Dynamic OG images in Astro — the practical guide

**Publish on: zellwk.com** — Astro-specific, your tooling is the solution. Niche for CSS-Tricks.
**Format: Tutorial** — Specific, high-intent search query. People searching this are building production sites.

- Explain why OG images matter for click-through rates on social media and in search results
- Walk through the options: static images (tedious), Satori/Sharp generation (complex setup), third-party services (dependency)
- Show your approach with `@splendidlabz/astro` — how OG images are generated per page, the configuration, and the output

### 8. Astro content collections — tips from building a 450-post blog

**Publish on: zellwk.com** — Nobody else can write this. Personal experience, Astro-specific.
**Format: Experience/tutorial** — Your blog IS the proof.

- Share the real patterns you discovered managing 450+ MDX posts — slug strategies, frontmatter validation, handling optional fields, date formatting
- Common mistakes: schema too strict (breaks old posts), schema too loose (inconsistent output), not using `z.transform()` for computed fields
- Show the utilities from `@splendidlabz/astro` that make content collections easier to work with at scale

### 9. Setting up email in Astro (transactional + marketing)

**Publish on: zellwk.com** — Astro-specific, product-heavy.
**Format: Tutorial** — Developers dread email setup. Practical tutorial with a clear solution wins.

- The landscape: Resend, SendGrid, Mailchimp, ConvertKit — when to use which and how to connect them to Astro's server-side
- Building email templates that don't look broken in every client — the pain, the testing, the compromises
- Show how Splendid Astro's email helpers simplify the setup — API wrappers, template utilities, the parts you don't have to build yourself

### 10. Server-side patterns every Astro project needs

**Publish on: zellwk.com** — Astro-specific, too niche for CSS-Tricks.
**Format: Roundup/tutorial** — Targets developers moving from static Astro to SSR.

- Authentication middleware, request validation, error handling — the server-side patterns you end up building on every Astro project
- The DIY approach: each pattern from scratch, the edge cases you discover only in production
- The utilities in Splendid Astro that handle these — database helpers, server helpers, middleware patterns — with code examples

---

## Splendid Svelte (3 articles)

### 11. Islands architecture — what it actually means for your components

**Publish on: CSS-Tricks** — Broad web platform concept. Most explanations are abstract, yours would be concrete. Svelte/Splendid components mentioned as examples, not the focus.
**Format: Educational** — Gets searched but most explanations are abstract.

- Explain islands without the jargon: most of your page is static HTML, only the interactive bits load JavaScript. Show what this looks like in the browser DevTools.
- The practical implications: component hydration, passing data from server to client, managing state in isolated islands
- Real examples using Svelte components in Astro — when to reach for an island vs. when static HTML is enough, referencing Splendid Svelte components

### 12. Building accessible interactive components in Astro + Svelte

**Publish on: CSS-Tricks** — Accessibility is a strong CSS-Tricks topic. Framework-specific parts make it practical rather than theoretical.
**Format: Tutorial** — Combines two frameworks with an accessibility angle. Unique.

- Pick 3 components everyone needs: modal/dialog, dropdown menu, accordion. Show the accessibility requirements for each (ARIA roles, keyboard navigation, focus management)
- The amount of code it takes to get these right from scratch — event listeners, focus traps, screen reader announcements
- Show the Splendid Svelte versions — accessible by default, designed for islands architecture, drop-in ready

### 13. When to use Svelte islands vs. vanilla JavaScript in Astro

**Publish on: zellwk.com** — Too niche for CSS-Tricks. Astro+Svelte audience is your audience.
**Format: Comparison/opinion** — Developers new to Astro struggle with this decision.

- The decision framework: complexity of interaction, state management needs, reusability across pages
- When vanilla JS wins: simple toggle, scroll-triggered animation, form validation. When Svelte wins: complex state, reactive UI, component composition
- How Splendid Svelte components are designed for the sweet spot — interactive enough to need a framework, lightweight enough to not bloat the page

---

## Splendid Styles (3 articles)

### 14. How I set up CSS for new projects (and never think about it again)

**Publish on: zellwk.com** — Personal process piece. Splendid Styles is woven throughout.
**Format: Process/opinion** — "How I do X" posts from experienced developers always perform well.

- Your CSS setup checklist: reset/normalize, typography scale, spacing scale, color tokens, transition defaults, breakpoints — the decisions you make once and reuse forever
- The problem with starting from scratch every time vs. the problem with heavy frameworks — you want opinions baked in without being locked in
- Walk through Splendid Styles as your starting point — what it includes, what it doesn't, and how it's designed to be extended rather than overridden

### 15. CSS effects that make your site feel polished

**Publish on: CSS-Tricks** — Visual, shareable, broadly useful. The kind of article CSS-Tricks readers bookmark.
**Format: Tutorial** — Broad search term. Visual content gets shared.

- 5-6 subtle effects that separate amateur from polished: smooth transitions on hover states, entrance animations, focus rings, skeleton loading states, scroll-driven animations
- The implementation details people skip: easing curves, duration choices, `prefers-reduced-motion`, GPU-accelerated properties
- How Splendid Styles handles these — pre-built effect classes with sensible defaults, respects accessibility preferences out of the box

### 16. Design tokens for developers — a practical introduction

**Publish on: CSS-Tricks** — Trending topic, most articles target designers. Developer angle is underserved.
**Format: Educational** — Developer perspective is differentiated.

- What design tokens actually are in plain English — named values for colors, spacing, typography, shadows — and why naming matters more than the values themselves
- How to set them up in CSS custom properties, the naming conventions that scale, and common mistakes (too many tokens, too few, inconsistent naming)
- How Splendid Styles implements tokens — the system behind it, how to customize it for your brand, and how it connects to the layout and component systems

---

## Splendid Utils (3 articles)

### 17. JavaScript utility functions I use on every project

**Publish on: zellwk.com** — Product roundup disguised as a personal picks list. Too promotional for CSS-Tricks.
**Format: Roundup** — Listicle-style utility posts get consistent search traffic and bookmarks.

- Your top 10-15 utility functions: DOM queries, event delegation, debounce/throttle, deep clone, type checking, array/object helpers — with real use cases for each
- Why you stopped using lodash for most things — bundle size, tree-shaking issues, functions you can write in 3 lines
- Introduce Splendid Utils as your personal utility belt — battle-tested across your own projects, zero dependencies, works in both browser and Node

### 18. DOM manipulation without a framework — a modern guide

**Publish on: CSS-Tricks** — Classic CSS-Tricks material. Evergreen, educational, no product dependency.
**Format: Tutorial** — Targets developers who want to understand what frameworks abstract away.

- Modern DOM APIs that make jQuery unnecessary: `querySelector`, `closest`, `matches`, `insertAdjacentHTML`, `IntersectionObserver`, `MutationObserver`
- Common patterns: delegated event handling, dynamic element creation, reading/writing attributes, managing classes — all with vanilla JS
- Where Splendid Utils fills the gaps — the helpers that smooth over browser inconsistencies and reduce boilerplate for the patterns you use most

### 19. Node.js utilities you'll wish you had sooner

**Publish on: zellwk.com** — Not CSS-Tricks territory. Server-side JS is your blog's audience.
**Format: Tutorial/roundup** — Less competition than browser-focused utility posts.

- File system helpers, path manipulation, environment variable handling, simple caching patterns — the stuff every Node project reinvents
- Common pitfalls: async fs operations, path separators across OS, error handling for missing files
- The Node-specific utilities in Splendid Utils — what they do, when to use them, and how they handle the edge cases you'd forget

---

## Splendid Tracking (2 articles)

### 20. Setting up analytics without killing your page speed

**Publish on: CSS-Tricks** — Performance is a strong CSS-Tricks topic. The core content is genuinely educational.
**Format: Tutorial** — Performance-conscious developers actively search for this.

- The impact of analytics scripts: render-blocking, main thread blocking, CLS from injected elements. Show real Lighthouse before/after
- Loading strategies: `defer`, `async`, dynamic injection after interaction, partytown/web workers — trade-offs of each
- How Splendid Tracking handles this — loads scripts without blocking, respects user consent, keeps your performance scores clean

### 21. Privacy-friendly tracking for developers who hate tracking

**Publish on: zellwk.com** — Opinion piece, your product is the punchline. Personal voice content.
**Format: Opinion/tutorial** — Taps into the growing anti-tracking sentiment.

- The developer's dilemma: you need to know if your stuff is working, but you also know how invasive most tracking is
- What you actually need to track vs. what Google Analytics gives you by default — stripping it down to the essentials
- How Splendid Tracking takes a minimal approach — what it tracks, what it doesn't, how consent is handled, and how to add ad tracking only when you need it

---

## Splendid Pro — cross-product (2 articles)

### 22. My complete toolkit for building Astro sites

**Publish on: zellwk.com** — This is literally a product showcase. Your blog, your tools.
**Format: Process/showcase** — "What tools does X use" posts are consistently popular.

- Your full stack decision by decision: why Astro, why Svelte for islands, why custom CSS over Tailwind, why you built your own components
- Walk through a real site build from `npm create astro` to deployed — the parts that are boilerplate, the parts that need decisions, the parts that slow you down
- How the Splendid Pro libraries fit together — Astro for the server layer, Svelte for interactivity, Layouts for structure, Styles for design, Utils for everything else. The pitch is the integration, not any single piece.

### 23. How I build and deploy a complete Astro site in a day

**Publish on: zellwk.com** — Personal process, product-heavy.
**Format: Process/tutorial** — Ambitious title backed by specific proof.

- The project: a real site with blog, authentication, email, analytics — not a toy demo
- The timeline: what you set up in the first hour, where you spend most of your time (hint: content and design decisions, not plumbing), what's left at the end
- The honest breakdown of how much time Splendid Pro saves — which pieces are minutes instead of hours, and which parts still require custom work no matter what

---

## Summary

| Destination | Count | Purpose |
|-------------|-------|---------|
| **zellwk.com** | 15 | Product-centric, personal voice, conversion |
| **CSS-Tricks** | 8 | Backlinks, entity authority, discovery |
| **Total** | 23 | |

### CSS-Tricks articles (8)
2, 3, 11, 12, 15, 16, 18, 20

### zellwk.com articles (15)
1, 4, 5, 6, 7, 8, 9, 10, 13, 14, 17, 19, 21, 22, 23
