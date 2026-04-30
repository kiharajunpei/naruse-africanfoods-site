# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static one-page corporate LP for **株式会社成勢アフリカンフーズ (Naruse African Foods Ltd.)** — a Japan-based startup operating QSR (fast food) in Accra, Ghana. The site targets three audiences (investors/partners, recruits/interns, press) on a single page in Japanese.

Live: `https://naruse-africanfoods.com/` (Cloudflare Pages, custom domain). Repo and primary content are in Japanese; preserve the Japanese copy when editing unless asked otherwise.

## Stack & Layout

Pure static site. **No build step, no package manager, no framework.** All assets are hand-written.

- `index.html` — the LP (everything: header, hero, About, Our Edge, Roadmap, Join us, Contact, footer)
- `style.css` — sole stylesheet for `index.html`
- `script.js` — vanilla JS for `index.html` (loaded as a plain `<script>`, not a module)
- `logos.html` — **standalone** logo-concept gallery with its own inline `<style>` block. It is not part of the LP's stylesheet/JS pipeline; do not factor its styles into `style.css` and do not link `script.js` from it.
- `sitemap.xml`, `robots.txt` — only `https://naruse-africanfoods.com/` is listed
- `.wrangler/cache/` — Cloudflare Pages local CLI cache; ignore when editing content

## Local dev

```bash
python -m http.server 8000   # then open http://localhost:8000
```

There is nothing to build, lint, or test. "Run tests" = open the page in a browser and visually verify on desktop + mobile widths. There are no automated tests; do not add a test/build toolchain unless explicitly asked.

## Deployment

Deployed via **Cloudflare Pages**. The repo is the publish root — pushing to the deployment branch triggers a build on Cloudflare. There is no GitHub Pages config despite what the README says (the README is stale on this point); the canonical URL (`<link rel="canonical">`, `og:url`, `sitemap.xml`) all point at `naruse-africanfoods.com`. Keep them consistent if the domain ever changes — they were last migrated together (see git log: `chore: URL切替`).

## Architecture & conventions

### Design system (defined in `:root` of `style.css`)

- **Colors**: `--navy` (#0f2741), `--ivory` (#f6f1e8), `--ochre` (#c9a35a), with `-deep` / `-soft` variants. Use the variables, not raw hex, for any new styles.
- **Fonts**: `Noto Sans JP` (body), `Noto Serif JP` (Japanese display), `Fraunces` (English italic accents), `Inter` (English UI/labels). All loaded from Google Fonts in the `<head>`.
- **`<em>` is repurposed as a typographic accent**, not for emphasis semantics: it renders as italic Fraunces serif in ochre. Wrap key phrases in `<em>` to get the editorial accent style; don't use `<i>` or inline styles for the same effect.

### Section pattern

Each major block in `index.html` uses one of three section themes — `.section-light`, `.section-dark`, `.section-accent` — and opens with the same head:

```html
<div class="section-head">
  <span class="section-idx">01</span>
  <span class="section-label">What we do</span>
</div>
```

Numbering (`01`–`05`) is sequential across the page. If you add or remove a section, renumber the rest. `section-dark` variants invert text colors automatically via descendant selectors in `style.css`; you do not need to override colors per-element.

### Animations (`script.js`)

- `.reveal` — any element with this class fades/slides in via `IntersectionObserver` when scrolled into view. Add the class to new headings/paragraphs to match the existing motion. The observer adds `.in` once and unobserves; do not rely on re-trigger.
- `[data-count="42"]` — `IntersectionObserver` count-up animation (1.8 s ease-out). Integer or single-decimal float.
- Header gets `.is-scrolled` after 10 px of scroll; mobile nav toggles `.is-open` on `#nav` and `#nav-toggle`.

### SEO / metadata coupling

These five places encode the same canonical URL, OG/Twitter card data, and JSON-LD Organization schema. **When editing site identity (URL, address, founding date, CEO, headcount, etc.), update all that apply in the same change:**

1. `<title>`, `<meta name="description">`, `<meta name="keywords">` in `index.html` `<head>`
2. `og:*` and `twitter:*` meta tags
3. `<link rel="canonical">`
4. The inline `<script type="application/ld+json">` Organization block (founder, address, email, employee count)
5. `sitemap.xml` (`<loc>` and `<lastmod>` — bump `<lastmod>` when content changes meaningfully)

The `google-site-verification` meta is real (Search Console) — do not remove or replace it without reason.

## Editorial rules (from README)

- **Do not put confidential business data in the site**: revenue, cost ratios, customer names, contract counterparties, unit economics. The page is public.
- The single contact email (`naruse.africanfoods@gmail.com`) appears in `<head>` JSON-LD, the Contact section's two `mailto:` links, and the footer. Keep them in sync.
- The roadmap phase years (Foundation 2025–26 → Scale 2027–29 → West Africa 2030–32 → IPO 2033 → 2035+) reflect the current plan. If you change a year in one place, change it everywhere it appears (Roadmap section, hero copy "10年で400店舗", JSON-LD `foundingDate`, etc.) — the README explicitly calls out keeping CLAUDE.md and the page aligned on this.
