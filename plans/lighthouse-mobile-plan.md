# Lighthouse Mobile Performance Plan

**Date:** 2026-02-24
**Score:** 66/100
**Target:** Improve FCP (4.2s), LCP (5.1s), TTI (9.0s)

## Done

- [x] Added preconnect for TypeKit fonts

## Priority Fixes

### 1. Fix Render-Blocking CSS (~2,590ms savings)
- `index.C4ENBMGw.css` (19KB, 893ms wasted)
- `use.typekit.net/pki5tfy.css` (1KB, 763ms wasted)
- `p.typekit.net/p.css` (755ms wasted)

Options:
- Self-host fonts instead of TypeKit (eliminates 2 render-blocking requests + DNS)
- Add `font-display: swap` if not set
- Inline critical CSS, defer the rest
- Preload main CSS

### 2. Improve TTFB (~700ms savings)
- HTML document takes 710ms — high for an Astro site
- Options: CDN edge caching, static pre-rendering for homepage, check hosting

### 3. Defer Third-Party Scripts (~310ms, 167KB savings)
| Script | Wasted |
|--------|--------|
| Google Tag Manager | 62KB |
| `Base.astro` bundle | 48KB |
| Facebook Pixel | 34KB |
| `TextInput.D1beYVQB.js` (newsletter form) | 23KB |

Options:
- Load analytics/tracking after user interaction
- Audit Base.astro bundle for code splitting
- Consider removing Facebook Pixel if unused
- Lazy-load newsletter form component

### 4. Fix CLS (0.137)
- Main culprit: `.prose-tight.card.card-purple` on homepage
- Secondary: `hgroup > p.h1-subhead`
- Options: explicit dimensions, font-display swap with size-adjusted fallbacks

### 5. Cache Policy (117KB improvable)
- Ensure `_astro/` assets have `Cache-Control: max-age=31536000, immutable`

## Metrics Snapshot (mobile)

| Metric | Value | Score |
|--------|-------|-------|
| FCP | 4.2s | 20 |
| LCP | 5.1s | 25 |
| TTI | 9.0s | 34 |
| SI | 4.2s | 78 |
| CLS | 0.137 | 79 |
| TBT | 10ms | 100 |
