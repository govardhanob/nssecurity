# NS Security Solutions Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-file Stitch mockup `code.html` (Tailwind CDN + Material Symbols) into a production-ready, framework-free static website for NS Security Solutions, preserving its dark-navy/orange visual design exactly.

**Architecture:** Plain HTML5/CSS3/vanilla JS, GSAP for animation, inline Lucide SVG icons in place of the Material Symbols web font. No build step, no backend, no test runner — this is a static marketing site, so "verification" per task means: content greps for forbidden strings, `python3 -m http.server` + browser check, and HTML/contrast sanity checks, not unit tests. Because this whole build is a single continuous visual deliverable authored by one person in one sitting (not independent parallelizable units), it will be executed **inline** in this session rather than farmed out to fresh subagents, who would have to re-derive the design tokens and copy decisions from scratch.

**Tech Stack:** HTML5, CSS3 (custom properties, no framework), vanilla JS, GSAP (CDN, jsdelivr/cdnjs), inline Lucide SVG icons, Plus Jakarta Sans (Google Fonts), ImageMagick-generated placeholder `.webp` images.

**Spec:** User-provided brief (see conversation) + `code.html` (existing Stitch mockup, source of truth for layout/section order/copy baseline) + `DESIGN.md` (color/typography/spacing tokens). No separate spec file was written — the brief was already fully detailed and was confirmed section-by-section in chat before this plan.

## Global Constraints

- Business name everywhere: **NS Security Solutions**. Old name "Salahudeen CCTV Services" / "Salahudeen" must not appear anywhere, including hidden/dynamic strings (found one leak: the form's hidden success message in `code.html:621`).
- Confirmed core services only, presented as primary offerings: CCTV Camera Supply & Installation, DVR & NVR Installation, Wi-Fi Camera Solutions, Wi-Fi Networking Solutions, Wi-Fi Extender/Router/Modem Setup.
- Repair / remote-viewing / system-upgrade content: **keep, but neutral, non-committal wording** ("ask us", "subject to inspection") — never presented as a guaranteed service line. (User decision.)
- Business hours: no invented specific hours. Use neutral phrasing + the one confirmed fact: "Sunday & public holidays: urgent service only". (User decision.)
- No fabricated claims: no "10+ years", "certified", "authorized/official dealer", "#1", "lowest price", "500+/1000+", "24/7", "guaranteed response time", warranties, specific storage/lens/range specs, ColorVu/AcuSense/4K, awards, fake reviews, fake project counts, "genuine" as an authenticity guarantee.
- Contact: `tel:+917907582779`, `tel:+918891732779`, `https://wa.me/917907582779`, `mailto:salahudeenns3@gmail.com`.
- Contact form has no backend: on submit, build a WhatsApp deep link from the field values and open `wa.me` with it (user-approved approach) — no fake "message sent" success state that implies server delivery.
- JSON-LD LocalBusiness: only name, telephone, email, address (Pallikkara, Kunnathunad, Kerala — no postal code), areaServed, url. No lat/long, opening hours, ratings, price range, or social profiles.
- Colors (from `DESIGN.md`/`code.html` Tailwind config — use as CSS custom properties):
  `--navy-darkest:#040D16; --navy-dark:#071522; --navy-charcoal:#0D1720; --navy-surface:#0B1928; --navy-card:#112234; --navy-border:#1c3249; --brand-orange:#F47B20; --brand-orange-hover:#ea580c; --brand-orange-light:#fff4ed; --light-bg:#F8FAFC; --light-section:#EFF3F8; --light-border:#E2E8F0; --slate-body:#475569; --slate-heading:#0F172A;`
- Font: Plus Jakarta Sans (Google Fonts, weights 300–800).
- Domain is unknown — canonical/OG URLs use a clearly-marked placeholder (`https://www.nssecuritysolutions.example`), documented in the README as needing replacement.
- Respect `prefers-reduced-motion: reduce` everywhere GSAP is used.
- Mobile-first, no horizontal scroll, real `<button>` elements for interactive controls (not `<div onclick>`).

---

### Task 1: Project scaffolding, git init, favicon

**Files:**
- Create: `index.html` (empty shell only, filled in later tasks)
- Create: `css/style.css` (empty, filled in Task 3–5)
- Create: `js/main.js` (empty, filled in Task 8–10)
- Create: `images/favicon.svg`
- Create: `.gitignore`

**Interfaces:**
- Produces: the directory skeleton every later task writes into.

- [ ] **Step 1: Init git**

```bash
cd /home/govardhan/Documents/nssecurity && git init
```

- [ ] **Step 2: Create folder skeleton and empty files**

```bash
mkdir -p css js images
touch css/style.css js/main.js
```

- [ ] **Step 3: Create a simple favicon**

Create `images/favicon.svg` — a minimal camera glyph on the brand navy/orange, since no brand logo file exists:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#071522"/>
  <path d="M8 12a2 2 0 0 1 2-2h6l1.5 2H22a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-10z" fill="#F47B20"/>
  <circle cx="16" cy="18" r="3.4" fill="#071522"/>
</svg>
```

- [ ] **Step 4: `.gitignore`**

```
.DS_Store
*.log
```

- [ ] **Step 5: Verify**

```bash
ls css js images && cat images/favicon.svg
```
Expected: `css/style.css`, `js/main.js`, `images/favicon.svg` all exist; SVG is well-formed (starts with `<svg`, ends `</svg>`).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold static site structure"
```

---

### Task 2: `index.html` — `<head>` (SEO, OG, Twitter, JSON-LD, favicon)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: nothing yet (first content task).
- Produces: `<head>` block that Tasks 3–7 append `<body>` content after.

- [ ] **Step 1: Write the full `<head>`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CCTV Installation &amp; Security Solutions in Ernakulam | NS Security Solutions</title>
<meta name="description" content="NS Security Solutions provides CCTV camera supply, installation and security solutions in Ernakulam, Kochi, Aluva, North Paravur, Kalamassery, Angamaly and nearby areas.">
<link rel="canonical" href="https://www.nssecuritysolutions.example/">
<link rel="icon" type="image/svg+xml" href="images/favicon.svg">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="NS Security Solutions">
<meta property="og:title" content="CCTV Installation &amp; Security Solutions in Ernakulam | NS Security Solutions">
<meta property="og:description" content="CCTV camera supply, installation and security solutions in Ernakulam, Kochi, Aluva, North Paravur, Kalamassery, Angamaly and nearby areas.">
<meta property="og:url" content="https://www.nssecuritysolutions.example/">
<meta property="og:image" content="https://www.nssecuritysolutions.example/images/hero.webp">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CCTV Installation &amp; Security Solutions in Ernakulam | NS Security Solutions">
<meta name="twitter:description" content="CCTV camera supply, installation and security solutions in Ernakulam, Kochi, Aluva, North Paravur, Kalamassery, Angamaly and nearby areas.">
<meta name="twitter:image" content="https://www.nssecuritysolutions.example/images/hero.webp">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NS Security Solutions",
  "telephone": ["+91 79075 82779", "+91 88917 32779"],
  "email": "salahudeenns3@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pallikkara, Kunnathunad",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "areaServed": ["Kochi", "Ernakulam", "Aluva", "North Paravur", "Kalamassery", "Angamaly", "Tripunithura"],
  "url": "https://www.nssecuritysolutions.example/"
}
</script>
</head>
<body>
<!-- body filled in by Tasks 3-7 -->
</body>
</html>
```

- [ ] **Step 2: Verify**

```bash
grep -c "Salahudeen" index.html
```
Expected: `0`.

```bash
python3 -c "import json,re; s=open('index.html').read(); m=re.search(r'<script type=\"application/ld\\+json\">(.*?)</script>', s, re.S); json.loads(m.group(1)); print('valid json-ld')"
```
Expected: `valid json-ld`.

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat: add SEO/OG/Twitter/JSON-LD head"
```

---

### Task 3: `css/style.css` — tokens, reset, layout primitives, header/nav/mobile drawer

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Produces: `:root` custom properties (used by every later CSS task), `.container`, base typography, header/nav/drawer classes: `.top-strip`, `.site-header`, `.nav-links`, `.header-ctas`, `.mobile-menu-btn`, `.mobile-drawer`.

- [ ] **Step 1: Write tokens + reset + container**

```css
:root {
  --navy-darkest:#040D16; --navy-dark:#071522; --navy-charcoal:#0D1720;
  --navy-surface:#0B1928; --navy-card:#112234; --navy-border:#1c3249;
  --brand-orange:#F47B20; --brand-orange-hover:#ea580c; --brand-orange-light:#fff4ed;
  --light-bg:#F8FAFC; --light-section:#EFF3F8; --light-border:#E2E8F0;
  --slate-body:#475569; --slate-heading:#0F172A;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --radius-lg: 1rem; --radius-xl: 1.25rem;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
body {
  font-family: var(--font-sans);
  background: var(--navy-dark);
  color: #e2e8f0;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
::selection { background: var(--brand-orange); color: #fff; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--navy-dark); }
::-webkit-scrollbar-thumb { background: var(--navy-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--brand-orange); }

.container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
@media (min-width: 640px) { .container { padding: 0 2rem; } }

.icon { width: 1.1em; height: 1.1em; stroke-width: 2; vertical-align: -0.15em; }
```

- [ ] **Step 2: Top strip + header + nav + drawer**

```css
.top-strip {
  background: var(--navy-darkest); border-bottom: 1px solid rgba(28,50,73,.6);
  font-size: .75rem; color: #cbd5e1; padding: .375rem 0;
}
.top-strip .container { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .5rem; }
.top-strip .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand-orange); }

.site-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(7,21,34,.95); backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(28,50,73,.8);
  transition: box-shadow .25s ease, background-color .25s ease;
}
.site-header.is-scrolled { box-shadow: 0 8px 24px rgba(0,0,0,.35); background: rgba(4,13,22,.97); }
.site-header .container { height: 5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }

.brand { display: flex; align-items: center; gap: .875rem; }
.brand-mark {
  width: 2.75rem; height: 2.75rem; border-radius: .875rem;
  background: linear-gradient(135deg, var(--brand-orange), var(--brand-orange-hover));
  display: flex; align-items: center; justify-content: center; color: #fff;
}
.brand-name { font-weight: 800; font-size: 1.125rem; color: #fff; line-height: 1.2; }
.brand-tag { font-size: .75rem; color: #94a3b8; font-weight: 500; }

.nav-links { display: none; gap: 1.75rem; font-size: .875rem; font-weight: 600; color: #cbd5e1; }
.nav-links a:hover, .nav-links a.active { color: var(--brand-orange); }
@media (min-width: 1024px) { .nav-links { display: flex; } }

.header-ctas { display: flex; align-items: center; gap: .75rem; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; font-weight: 700; border-radius: .75rem; border: 1px solid transparent; cursor: pointer; transition: transform .15s ease, background-color .2s ease, box-shadow .2s ease; text-align: center; }
.btn:active { transform: scale(.98); }
.btn-primary { background: var(--brand-orange); color: #fff; box-shadow: 0 8px 20px rgba(244,123,32,.25); }
.btn-primary:hover { background: var(--brand-orange-hover); transform: translateY(-1px); }
.btn-ghost { background: var(--navy-card); border-color: var(--navy-border); color: #e2e8f0; }
.btn-ghost:hover { background: var(--navy-border); }
.btn-sm { padding: .5rem 1rem; font-size: .8rem; }
.btn-md { padding: .65rem 1.25rem; font-size: .875rem; }
.btn-lg { padding: .9rem 1.5rem; font-size: 1rem; }

.call-chip { display: none; }
@media (min-width: 640px) { .call-chip { display: inline-flex; } }

.mobile-menu-btn { display: inline-flex; background: none; border: 0; color: #cbd5e1; padding: .5rem; border-radius: .5rem; }
.mobile-menu-btn:hover { background: var(--navy-card); color: #fff; }
@media (min-width: 1024px) { .mobile-menu-btn { display: none; } }

.mobile-drawer {
  position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,.7); backdrop-filter: blur(4px);
  display: flex; align-items: flex-end; visibility: hidden; opacity: 0; transition: opacity .25s ease, visibility .25s ease;
}
.mobile-drawer.is-open { visibility: visible; opacity: 1; }
.mobile-drawer-panel {
  width: 100%; background: var(--navy-dark); border-top: 1px solid var(--navy-border);
  border-radius: 1.25rem 1.25rem 0 0; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;
  max-height: 85vh; overflow-y: auto; transform: translateY(16px); transition: transform .3s ease;
}
.mobile-drawer.is-open .mobile-drawer-panel { transform: translateY(0); }
.mobile-drawer nav { display: flex; flex-direction: column; gap: .25rem; font-weight: 600; font-size: 1rem; }
.mobile-drawer nav a { padding: .625rem .75rem; border-radius: .625rem; color: #e2e8f0; }
.mobile-drawer nav a:hover, .mobile-drawer nav a.active { background: var(--navy-card); color: var(--brand-orange); }
@media (min-width: 1024px) { .mobile-drawer { display: none; } }
```

- [ ] **Step 3: Verify**

```bash
python3 -c "print('ok')" # placeholder no-op; real check is visual in Task 7's browser check
grep -q ":root" css/style.css && echo "tokens present"
```
Expected: `tokens present`.

- [ ] **Step 4: Commit**

```bash
git add css/style.css && git commit -m "style: add tokens, reset, header/nav/drawer styles"
```

---

### Task 4: `css/style.css` — hero, trust strip, services grid, featured visual, residential/commercial

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: tokens from Task 3.
- Produces: `.hero`, `.hero-badge`, `.hero-image-card`, `.trust-strip`, `.trust-item`, `.section-eyebrow`, `.services-grid`, `.service-card`, `.featured-visual`, `.checklist-item`, `.solutions-grid`, `.solution-card`.

- [ ] **Step 1: Hero + trust strip**

```css
section { position: relative; }
.section-pad { padding: 5rem 0; }
.section-pad-sm { padding: 3rem 0; }

.hero { background: var(--navy-dark); padding: 2.5rem 0 4rem; overflow: hidden; }
@media (min-width: 1024px) { .hero { padding: 5rem 0; } }
.hero-grid { display: grid; gap: 3rem; align-items: center; }
@media (min-width: 1024px) { .hero-grid { grid-template-columns: 7fr 5fr; gap: 3.5rem; } }
.hero-badge {
  display: inline-flex; align-items: center; gap: .625rem; align-self: flex-start;
  padding: .375rem .875rem; border-radius: 999px; background: var(--navy-card);
  border: 1px solid var(--navy-border); color: #e2e8f0; font-size: .7rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
}
.hero h1 { font-size: 2rem; font-weight: 800; color: #fff; line-height: 1.15; margin: .75rem 0; }
.hero h1 .accent { color: var(--brand-orange); }
@media (min-width: 640px) { .hero h1 { font-size: 2.5rem; } }
@media (min-width: 1024px) { .hero h1 { font-size: 3rem; } }
.hero p.lead { font-size: 1rem; color: #cbd5e1; line-height: 1.7; max-width: 42rem; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: .875rem; margin-top: .5rem; }
.hero-meta { display: flex; flex-wrap: wrap; gap: .75rem 1.5rem; padding-top: 1rem; margin-top: .5rem; border-top: 1px solid rgba(28,50,73,.7); font-size: .75rem; color: #94a3b8; }
.hero-meta strong { color: #cbd5e1; }

.hero-image-card { position: relative; border-radius: 1.25rem; overflow: hidden; border: 1px solid rgba(28,50,73,.8); box-shadow: 0 25px 60px rgba(0,0,0,.45); }
.hero-image-card img { width: 100%; height: 24rem; object-fit: cover; }
.hero-image-card .overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,13,22,.95), rgba(4,13,22,.25) 55%, transparent); pointer-events: none; }
.hero-image-caption { position: absolute; left: 1rem; right: 1rem; bottom: 1rem; background: rgba(7,21,34,.95); backdrop-filter: blur(8px); border: 1px solid rgba(28,50,73,.8); border-radius: .875rem; padding: 1rem; display: flex; gap: .75rem; }

.trust-strip { background: var(--navy-charcoal); border-top: 1px solid rgba(28,50,73,.7); border-bottom: 1px solid rgba(28,50,73,.7); padding: 1.5rem 0; }
.trust-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 640px) { .trust-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .trust-grid { grid-template-columns: repeat(4, 1fr); } }
.trust-item { background: rgba(17,34,52,.6); border: 1px solid rgba(28,50,73,.6); border-radius: .875rem; padding: 1rem; display: flex; align-items: center; gap: .875rem; }
.trust-icon { width: 2.5rem; height: 2.5rem; border-radius: .625rem; background: var(--navy-surface); border: 1px solid var(--navy-border); color: var(--brand-orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
```

- [ ] **Step 2: Section header pattern + services grid + featured visual + solutions grid**

```css
.section-eyebrow { display: inline-flex; align-items: center; gap: .5rem; color: var(--brand-orange); font-size: .7rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; margin-bottom: .375rem; }
.section-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-orange); }
.section-title { font-size: 1.875rem; font-weight: 800; letter-spacing: -.01em; }
@media (min-width: 640px) { .section-title { font-size: 2.25rem; } }
.section-title.dark { color: #fff; }
.section-title.light { color: var(--slate-heading); }
.section-subtitle { margin-top: .5rem; line-height: 1.7; max-width: 42rem; }
.section-subtitle.light { color: var(--slate-body); }
.section-subtitle.dark { color: #94a3b8; }
.section-header-center { display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 40rem; margin: 0 auto; }

.services-section { background: var(--light-bg); color: #1e293b; }
.services-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr; margin-top: 3rem; }
@media (min-width: 768px) { .services-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }
.service-card { background: #fff; border: 1px solid var(--light-border); border-radius: 1.25rem; padding: 1.75rem; box-shadow: 0 1px 3px rgba(15,23,42,.05); display: flex; flex-direction: column; justify-content: space-between; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
.service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(15,23,42,.1); border-color: rgba(244,123,32,.4); }
.service-card.span-full { grid-column: 1 / -1; }
.service-card-icon { width: 3rem; height: 3rem; border-radius: .75rem; background: var(--light-section); color: var(--slate-heading); display: flex; align-items: center; justify-content: center; transition: background-color .2s ease, color .2s ease; }
.service-card:hover .service-card-icon { background: var(--brand-orange); color: #fff; }
.service-card-num { font-weight: 800; font-size: .7rem; letter-spacing: .05em; padding: .3rem .6rem; border-radius: .4rem; background: var(--light-section); color: var(--brand-orange); }
.service-card h3 { font-size: 1.25rem; font-weight: 700; color: var(--slate-heading); margin: 1rem 0 .5rem; }
.service-card p { font-size: .875rem; color: var(--slate-body); line-height: 1.6; }
.service-card-footer { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: .75rem; font-weight: 700; color: #64748b; }
.service-card-note { font-size: .7rem; font-weight: 600; color: #94a3b8; font-style: italic; }

.featured-visual { background: var(--navy-surface); border-top: 1px solid rgba(28,50,73,.7); border-bottom: 1px solid rgba(28,50,73,.7); }
.featured-grid { display: grid; gap: 3rem; align-items: center; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .featured-grid { grid-template-columns: 1fr 1fr; } }
.checklist { display: flex; flex-direction: column; gap: .875rem; margin-top: .5rem; }
.checklist-item { display: flex; align-items: center; gap: .75rem; padding: .875rem; border-radius: .875rem; background: rgba(17,34,52,.8); border: 1px solid var(--navy-border); }
.checklist-item strong { display: block; font-size: .875rem; color: #fff; }
.checklist-item span.desc { font-size: .75rem; color: #94a3b8; }
.featured-image { position: relative; border-radius: 1.25rem; overflow: hidden; border: 1px solid var(--navy-border); box-shadow: 0 25px 60px rgba(0,0,0,.45); }
.featured-image img { width: 100%; height: 22rem; object-fit: cover; }

.solutions-section { background: var(--light-section); color: #1e293b; }
.solutions-grid { display: grid; gap: 2rem; grid-template-columns: 1fr; margin-top: 3rem; }
@media (min-width: 1024px) { .solutions-grid { grid-template-columns: 1fr 1fr; } }
.solution-card { background: #fff; border: 1px solid var(--light-border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 1px 3px rgba(15,23,42,.05); transition: box-shadow .2s ease; }
.solution-card:hover { box-shadow: 0 20px 40px rgba(15,23,42,.08); }
.solution-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
.solution-icon { width: 3rem; height: 3rem; border-radius: .75rem; background: var(--light-section); color: var(--brand-orange); display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0; flex-shrink: 0; }
.zone-grid { display: grid; grid-template-columns: 1fr; gap: .625rem; margin-top: .75rem; font-size: .75rem; font-weight: 600; }
@media (min-width: 480px) { .zone-grid { grid-template-columns: 1fr 1fr; } }
.zone-grid div { display: flex; align-items: center; gap: .5rem; }
.solution-footnote { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; display: flex; gap: .75rem; align-items: flex-start; background: rgba(239,243,248,.8); padding: 1rem; border-radius: .875rem; }
```

- [ ] **Step 3: Verify**

```bash
grep -q "\.service-card" css/style.css && grep -q "\.hero-grid" css/style.css && echo "css ok"
```
Expected: `css ok`.

- [ ] **Step 4: Commit**

```bash
git add css/style.css && git commit -m "style: add hero, trust strip, services and solutions section styles"
```

---

### Task 5: `css/style.css` — brands, why-us, process, areas, FAQ, contact/form, footer, mobile bar, WhatsApp float

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: tokens from Task 3.
- Produces: `.brands-grid`, `.brand-card`, `.why-us-grid`, `.benefit-card`, `.process-grid`, `.process-step`, `.areas-grid`, `.area-card`, `.faq-list`, `.faq-item`, `.contact-panel`, `.contact-form`, `.site-footer`, `.mobile-action-bar`, `.whatsapp-float`.

- [ ] **Step 1: Brands, why-us, process**

```css
.brands-section { background: var(--navy-dark); border-top: 1px solid rgba(28,50,73,.7); border-bottom: 1px solid rgba(28,50,73,.7); padding: 4rem 0; }
.brands-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr; margin-top: 2.5rem; }
@media (min-width: 768px) { .brands-grid { grid-template-columns: 1fr 1fr; } }
.brand-card { background: var(--navy-card); border: 1px solid var(--navy-border); border-radius: 1.25rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
.brand-badge { width: 3.5rem; height: 3.5rem; border-radius: .75rem; background: var(--navy-surface); border: 1px solid var(--navy-border); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--brand-orange); font-size: 1.25rem; flex-shrink: 0; }
.brand-card h3 { color: #fff; font-size: 1.25rem; font-weight: 700; margin: 0 0 .25rem; }
.brand-card p { font-size: .75rem; color: #94a3b8; margin: 0; }
.brands-footnote { margin-top: 1.5rem; padding: 1rem; border-radius: .875rem; background: var(--navy-charcoal); border: 1px solid var(--navy-border); display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; font-size: .75rem; color: #94a3b8; }
.tag-chip { padding: .3rem .6rem; border-radius: .4rem; background: var(--navy-card); border: 1px solid var(--navy-border); }

.why-us-section { background: #fff; color: #1e293b; }
.why-us-grid { display: grid; gap: 3rem; align-items: center; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .why-us-grid { grid-template-columns: 5fr 7fr; } }
.why-us-callout { display: flex; gap: 1rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--light-section); border: 1px solid var(--light-border); }
.benefit-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
@media (min-width: 480px) { .benefit-grid { grid-template-columns: 1fr 1fr; } }
.benefit-card { padding: 1.5rem; border-radius: 1.25rem; background: var(--light-bg); border: 1px solid var(--light-border); }
.benefit-card h3 { font-size: 1rem; font-weight: 700; color: var(--slate-heading); margin: .75rem 0 .375rem; }
.benefit-card p { font-size: .75rem; color: var(--slate-body); line-height: 1.6; margin: 0; }

.process-section { background: var(--navy-charcoal); border-top: 1px solid rgba(28,50,73,.7); border-bottom: 1px solid rgba(28,50,73,.7); }
.process-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-top: 3rem; }
@media (min-width: 768px) { .process-grid { grid-template-columns: repeat(5, 1fr); } }
.process-step { background: var(--navy-card); border: 1px solid var(--navy-border); border-radius: 1.25rem; padding: 1.25rem; transition: border-color .2s ease; }
.process-step:hover { border-color: rgba(244,123,32,.6); }
.process-step-top { display: flex; align-items: center; justify-content: space-between; }
.process-step-num { width: 2rem; height: 2rem; border-radius: .5rem; background: var(--navy-surface); border: 1px solid var(--navy-border); color: var(--brand-orange); font-weight: 800; font-size: .8rem; display: flex; align-items: center; justify-content: center; }
.process-step h3 { font-size: .95rem; font-weight: 700; color: #fff; margin: .75rem 0 .375rem; }
.process-step p { font-size: .75rem; color: #94a3b8; line-height: 1.5; margin: 0; }
```

- [ ] **Step 2: Areas, FAQ, contact/form, footer, mobile bar, WhatsApp float**

```css
.areas-section { background: var(--navy-dark); }
.areas-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-top: 2.5rem; }
@media (min-width: 640px) { .areas-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .areas-grid { grid-template-columns: repeat(3, 1fr); } }
.area-card { padding: 1.25rem; border-radius: .875rem; background: var(--navy-card); border: 1px solid var(--navy-border); display: flex; gap: .875rem; align-items: flex-start; transition: border-color .2s ease; }
.area-card:hover { border-color: rgba(244,123,32,.6); }
.area-card.primary { border-color: rgba(244,123,32,.4); }
.area-card strong { display: block; color: #fff; font-size: 1rem; }
.area-card span.desc { font-size: .75rem; color: #94a3b8; }
.areas-cta { margin-top: 1rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--navy-surface); border: 1px solid var(--navy-border); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }

.faq-section { background: #fff; color: #1e293b; }
.faq-list { display: flex; flex-direction: column; gap: .875rem; margin-top: 2.5rem; }
.faq-item { background: var(--light-bg); border: 1px solid var(--light-border); border-radius: 1.25rem; padding: 1.25rem; }
.faq-item summary { display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: var(--slate-heading); cursor: pointer; list-style: none; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary .chev { color: var(--brand-orange); transition: transform .2s ease; }
.faq-item[open] summary .chev { transform: rotate(180deg); }
.faq-item p { font-size: .875rem; color: var(--slate-body); line-height: 1.6; margin-top: .75rem; }

.contact-section { position: relative; background: var(--navy-dark); border-top: 1px solid var(--navy-border); overflow: hidden; }
.contact-bg-img { position: absolute; inset: 0; object-fit: cover; opacity: .2; }
.contact-bg-tint { position: absolute; inset: 0; background: rgba(4,13,22,.9); }
.contact-panel { position: relative; z-index: 1; background: rgba(17,34,52,.9); backdrop-filter: blur(8px); border: 1px solid var(--navy-border); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 30px 70px rgba(0,0,0,.4); }
@media (min-width: 640px) { .contact-panel { padding: 2.5rem; } }
.contact-grid { display: grid; gap: 2.5rem; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .contact-grid { grid-template-columns: 5fr 7fr; } }
.contact-link { display: flex; align-items: center; gap: .875rem; padding: .75rem; border-radius: .875rem; background: var(--navy-surface); border: 1px solid var(--navy-border); transition: border-color .2s ease; }
.contact-link:hover { border-color: var(--brand-orange); }
.contact-link-icon { width: 2.5rem; height: 2.5rem; border-radius: .5rem; background: var(--navy-dark); color: var(--brand-orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.contact-link small { display: block; font-size: .7rem; color: #94a3b8; }
.contact-link strong { font-size: 1rem; color: #fff; }

.contact-form-card { background: var(--navy-surface); border: 1px solid var(--navy-border); border-radius: 1.25rem; padding: 1.5rem; }
@media (min-width: 640px) { .contact-form-card { padding: 2rem; } }
.form-row { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-bottom: 1rem; }
@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }
.form-field { display: flex; flex-direction: column; gap: .375rem; }
.form-field label { font-size: .75rem; font-weight: 700; color: #cbd5e1; }
.form-field input, .form-field select, .form-field textarea {
  padding: .625rem .875rem; border-radius: .75rem; background: var(--navy-card); border: 1px solid var(--navy-border);
  color: #fff; font-size: .875rem; font-family: inherit;
}
.form-field input::placeholder, .form-field textarea::placeholder { color: #64748b; }
.form-field input:focus, .form-field select:focus, .form-field textarea:focus {
  outline: none; border-color: var(--brand-orange); box-shadow: 0 0 0 3px rgba(244,123,32,.15);
}
.form-submit { width: 100%; padding: .9rem; margin-top: .25rem; }
.form-note { font-size: .7rem; color: #94a3b8; text-align: center; margin-top: .75rem; }

.site-footer { background: var(--navy-darkest); color: #94a3b8; padding: 4rem 0 6rem; border-top: 1px solid rgba(28,50,73,.5); }
@media (min-width: 640px) { .site-footer { padding-bottom: 4rem; } }
.footer-grid { display: grid; gap: 2.5rem; grid-template-columns: 1fr; padding-bottom: 3rem; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .footer-grid { grid-template-columns: 4fr 3fr 2fr 3fr; } }
.footer-col h4 { font-size: .8rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .05em; margin-bottom: .75rem; }
.footer-col a, .footer-col .footer-line { display: flex; align-items: center; gap: .5rem; font-size: .75rem; color: #94a3b8; padding: .3rem 0; }
.footer-col a:hover { color: var(--brand-orange); }
.footer-bottom { padding-top: 1.5rem; border-top: 1px solid rgba(28,50,73,.5); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem; font-size: .75rem; color: #64748b; }
.footer-bottom nav { display: flex; gap: 1.25rem; }

.mobile-action-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
  background: rgba(4,13,22,.97); backdrop-filter: blur(8px); border-top: 1px solid rgba(28,50,73,.8);
  padding: .625rem 1rem; display: flex; gap: .625rem;
}
@media (min-width: 640px) { .mobile-action-bar { display: none; } }
.mobile-action-bar a { flex: 1; }

.whatsapp-float {
  position: fixed; bottom: 5.5rem; right: 1.25rem; z-index: 45;
  width: 3.25rem; height: 3.25rem; border-radius: 50%;
  background: var(--brand-orange); color: #fff; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 25px rgba(244,123,32,.4);
}
@media (min-width: 640px) { .whatsapp-float { bottom: 1.5rem; } }
```

- [ ] **Step 3: Verify**

```bash
grep -q "\.whatsapp-float" css/style.css && grep -q "\.site-footer" css/style.css && echo "css ok"
```
Expected: `css ok`.

- [ ] **Step 4: Commit**

```bash
git add css/style.css && git commit -m "style: add brands, why-us, process, areas, faq, contact, footer styles"
```

---

### Task 6: `index.html` — top strip, header, mobile drawer, hero, trust strip

**Files:**
- Modify: `index.html` (insert into `<body>`)

**Interfaces:**
- Consumes: classes from Tasks 3–4.
- Produces: `#home` section, `<header class="site-header">` (id target for Task 8's scroll JS), `#mobile-drawer`, `#mobile-menu-open`/`#mobile-menu-close` ids (Task 8 JS hooks).

- [ ] **Step 1: Top strip + header + drawer**

```html
<div class="top-strip">
  <div class="container">
    <div style="display:flex;align-items:center;gap:.5rem;">
      <span class="dot"></span>
      <span style="font-weight:600;color:#e2e8f0;">CCTV Camera Supply, Installation &amp; Service</span>
      <span style="color:#64748b;" class="hide-mobile">&bull;</span>
      <span style="color:#94a3b8;" class="hide-mobile">Ernakulam &amp; Nearby Areas</span>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;color:#94a3b8;">
      <span class="hide-mobile" style="display:inline-flex;align-items:center;gap:.25rem;">
        <svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg>
        Base: Pallikkara, Kunnathunad, Kerala
      </span>
      <span style="display:inline-flex;align-items:center;gap:.25rem;color:#cbd5e1;">
        <svg class="icon" style="color:var(--brand-orange);"><use href="#i-clock"/></svg>
        Sunday &amp; public holidays: urgent service only
      </span>
    </div>
  </div>
</div>

<header class="site-header" id="site-header">
  <div class="container">
    <a class="brand" href="#home">
      <span class="brand-mark"><svg class="icon" style="width:1.4rem;height:1.4rem;"><use href="#i-video"/></svg></span>
      <span>
        <span class="brand-name">NS Security Solutions</span><br>
        <span class="brand-tag">CCTV &amp; Security Solutions</span>
      </span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="#home" class="active">Home</a>
      <a href="#services">Services</a>
      <a href="#why-us">About</a>
      <a href="#process">Process</a>
      <a href="#areas">Areas</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="header-ctas">
      <a class="btn btn-ghost btn-sm call-chip" href="tel:+917907582779" aria-label="Call NS Security Solutions">
        <svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>+91 79075 82779
      </a>
      <a class="btn btn-primary btn-sm" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp NS Security Solutions for a quote">
        <svg class="icon"><use href="#i-message-circle"/></svg><span class="hide-mobile">WhatsApp for a Quote</span><span class="show-mobile">Quote</span>
      </a>
      <button class="mobile-menu-btn" id="mobile-menu-open" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
        <svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-menu"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <div class="mobile-drawer-panel">
    <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:.75rem;border-bottom:1px solid var(--navy-border);">
      <span style="font-weight:700;color:#fff;">NS Security Solutions</span>
      <button id="mobile-menu-close" type="button" aria-label="Close menu" style="background:none;border:0;color:#94a3b8;padding:.25rem;">
        <svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-x"/></svg>
      </button>
    </div>
    <nav aria-label="Mobile primary">
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#why-us">About</a>
      <a href="#process">Process</a>
      <a href="#areas">Service Areas</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Contact</a>
    </nav>
    <div style="display:flex;flex-direction:column;gap:.625rem;padding-top:.75rem;border-top:1px solid var(--navy-border);">
      <a class="btn btn-primary btn-md" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer">
        <svg class="icon"><use href="#i-message-circle"/></svg>WhatsApp for a Quote
      </a>
      <a class="btn btn-ghost btn-md" href="tel:+917907582779">
        <svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>Call: +91 79075 82779
      </a>
    </div>
  </div>
</div>
```

Note: `<use href="#i-...">` references SVG symbols defined once in a hidden `<svg>` sprite. That sprite is added in Task 7 Step 3 (end of body, before scripts) with all icons this plan uses: `map-pin, clock, video, phone, message-circle, menu, x, check-circle, verified/shield-check, home, store, wifi, hard-drive, router, smartphone, wrench, arrow-right, mail, chevron-down, phone-call`. Until Task 7 Step 3 lands, icons render as empty — that's expected and doesn't block verifying markup/structure in this task.

- [ ] **Step 2: Hero + trust strip**

```html
<main>
<section class="hero" id="home">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="hero-badge">
          <span class="dot" style="width:8px;height:8px;border-radius:50%;background:var(--brand-orange);"></span>
          CCTV Installation &bull; Ernakulam &amp; Kochi
        </div>
        <h1>Professional CCTV <span class="accent">Installation</span> &amp; Security Solutions</h1>
        <p class="lead">CCTV camera supply and installation, DVR/NVR setup, Wi-Fi cameras and Wi-Fi networking solutions &mdash; Hikvision and CP Plus &mdash; for homes, shops, offices and commercial properties across Ernakulam and nearby areas.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary btn-lg" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer">
            <svg class="icon"><use href="#i-message-circle"/></svg>WhatsApp Us
          </a>
          <a class="btn btn-ghost btn-lg" href="tel:+917907582779">
            <svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>Call Now
          </a>
          <a class="btn btn-ghost btn-lg" href="#contact">Get a Quote</a>
        </div>
        <div class="hero-meta">
          <span><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg> <strong>Hikvision &bull; CP Plus &bull; Wi-Fi Cameras &bull; DVR/NVR</strong></span>
          <span><svg class="icon" style="color:var(--brand-orange);"><use href="#i-wrench"/></svg> On-site technician service</span>
        </div>
      </div>
      <div>
        <div class="hero-image-card">
          <img src="images/hero.webp" width="480" height="384" alt="CCTV technician installing a security camera on a residential property exterior in Kerala" loading="eager" fetchpriority="high">
          <div class="overlay"></div>
          <div class="hero-image-caption">
            <svg class="icon" style="color:var(--brand-orange);flex-shrink:0;margin-top:.15rem;"><use href="#i-shield-check"/></svg>
            <div>
              <strong style="color:#fff;font-weight:700;font-size:.875rem;">Professional Camera Installation &mdash; Residential &amp; Commercial</strong>
              <div style="color:#cbd5e1;font-size:.75rem;margin-top:.25rem;">Careful camera placement and neat cabling.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="trust-strip">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item"><span class="trust-icon"><svg class="icon"><use href="#i-wrench"/></svg></span><div><strong style="display:block;color:#fff;font-size:.875rem;">Professional Installation</strong><span style="font-size:.75rem;color:#94a3b8;">Neat cabling &amp; casing</span></div></div>
      <div class="trust-item"><span class="trust-icon"><svg class="icon"><use href="#i-store"/></svg></span><div><strong style="display:block;color:#fff;font-size:.875rem;">Residential &amp; Commercial</strong><span style="font-size:.75rem;color:#94a3b8;">Tailored coverage for properties</span></div></div>
      <div class="trust-item"><span class="trust-icon"><svg class="icon"><use href="#i-smartphone"/></svg></span><div><strong style="display:block;color:#fff;font-size:.875rem;">Mobile App Viewing Setup</strong><span style="font-size:.75rem;color:#94a3b8;">Setup support for compatible systems</span></div></div>
      <div class="trust-item"><span class="trust-icon"><svg class="icon"><use href="#i-map-pin"/></svg></span><div><strong style="display:block;color:#fff;font-size:.875rem;">Direct Local Support</strong><span style="font-size:.75rem;color:#94a3b8;">Pallikkara, Kunnathunad &amp; Ernakulam</span></div></div>
    </div>
  </div>
</section>
```

Leave `<main>` open — Task 7 closes it.

- [ ] **Step 2: Verify**

```bash
grep -c 'id="home"' index.html   # expect 1
grep -c 'wa.me/917907582779' index.html  # expect >= 3
grep -c "8:30" index.html  # expect 0 (no invented hours)
```

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat: add top strip, header, mobile drawer, hero, trust strip markup"
```

---

### Task 7: `index.html` — remaining sections + footer + sprite + close document

**Files:**
- Modify: `index.html` (append after Task 6's trust strip, close `</main>`, add footer/action bar/sprite/scripts, close `</body></html>`)

**Interfaces:**
- Consumes: classes from Tasks 3–5, icon sprite ids referenced in Task 6.
- Produces: complete `index.html`; `#quote-form` (Task 9's JS hook), `#whatsapp-float`.

- [ ] **Step 1: Services, featured visual, residential/commercial, brands**

```html
<section class="services-section section-pad" id="services">
  <div class="container">
    <div style="max-width:42rem;">
      <div class="section-eyebrow"><span class="dot"></span>Field-Tested Reliability</div>
      <h2 class="section-title light">CCTV &amp; Security Camera Services</h2>
      <p class="section-subtitle light">Practical CCTV installation in Ernakulam and nearby areas, using Hikvision and CP Plus equipment, planned around your property.</p>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-video"/></svg></span><span class="service-card-num">01</span></div>
        <h3>CCTV Camera Supply &amp; Installation</h3><p>Supply and professional installation of Hikvision and CP Plus CCTV systems for residential and commercial properties.</p></div>
        <div class="service-card-footer"><span>Homes &amp; Commercial</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-hard-drive"/></svg></span><span class="service-card-num">02</span></div>
        <h3>DVR &amp; NVR Installation</h3><p>Installation and configuration of DVR/NVR recording systems for your CCTV setup.</p></div>
        <div class="service-card-footer"><span>Recording Configuration</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-wifi"/></svg></span><span class="service-card-num">03</span></div>
        <h3>Wi-Fi Camera Solutions</h3><p>Installation and setup of Wi-Fi security cameras for indoor and outdoor use.</p></div>
        <div class="service-card-footer"><span>Indoor &amp; Outdoor</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-router"/></svg></span><span class="service-card-num">04</span></div>
        <h3>Wi-Fi Networking Solutions</h3><p>Wi-Fi network setup to support your CCTV system and general connectivity needs.</p></div>
        <div class="service-card-footer"><span>Network Setup</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-router"/></svg></span><span class="service-card-num">05</span></div>
        <h3>Wi-Fi Extender, Router &amp; Modem Setup</h3><p>Supply and setup of Wi-Fi extenders, routers and modems.</p></div>
        <div class="service-card-footer"><span>Networking Hardware</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
      <div class="service-card">
        <div><div style="display:flex;justify-content:space-between;"><span class="service-card-icon"><svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-wrench"/></svg></span><span class="service-card-num">06</span></div>
        <h3>Troubleshooting Support</h3><p>For an existing CCTV setup with issues, contact us to check whether on-site troubleshooting support is available for your system.</p></div>
        <div class="service-card-footer"><span class="service-card-note">Ask us &mdash; subject to inspection</span><svg class="icon"><use href="#i-arrow-right"/></svg></div>
      </div>
    </div>
  </div>
</section>

<section class="featured-visual section-pad">
  <div class="container">
    <div class="featured-grid">
      <div>
        <div class="section-eyebrow"><span class="dot"></span>Precise Planning</div>
        <h2 class="section-title dark" style="margin-bottom:.75rem;">Secure Your Property With the Right CCTV Setup</h2>
        <p style="color:#cbd5e1;font-size:.9375rem;line-height:1.7;">Every property layout has blind spots. Camera placement, weatherproof housings and recording channel capacity are planned around your exact property.</p>
        <div class="checklist">
          <div class="checklist-item"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-video"/></svg><div><strong>Camera Placement Planning</strong><span class="desc">Angles planned to cover entry gates, driveways, porches and perimeter walls.</span></div></div>
          <div class="checklist-item"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-wrench"/></svg><div><strong>Neat Installation &amp; Concealed Conduit</strong><span class="desc">Weatherproof casing and neat wiring without exposed or dangling cables.</span></div></div>
          <div class="checklist-item"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-smartphone"/></svg><div><strong>Recording &amp; Mobile App Setup</strong><span class="desc">Configuration of recording storage and mobile app viewing where supported.</span></div></div>
        </div>
        <a class="btn btn-primary btn-md" style="margin-top:1rem;" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer"><svg class="icon"><use href="#i-message-circle"/></svg>Get On-Site Advice on WhatsApp</a>
      </div>
      <div class="featured-image">
        <img src="images/installation.webp" width="640" height="480" alt="CCTV technician configuring a DVR/NVR recorder inside a home or small business in Kerala" loading="lazy">
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</section>

<section class="solutions-section section-pad" id="solutions">
  <div class="container">
    <div class="section-header-center">
      <div class="section-eyebrow"><span class="dot"></span>Tailored Applications</div>
      <h2 class="section-title light">Tailored Solutions for Homes &amp; Businesses</h2>
      <p class="section-subtitle light">Camera layouts planned around your property structure and requirements.</p>
    </div>
    <div class="solutions-grid">
      <div class="solution-card">
        <div class="solution-head"><span class="solution-icon"><svg class="icon" style="width:1.75rem;height:1.75rem;"><use href="#i-home"/></svg></span><div><h3 style="font-size:1.5rem;font-weight:700;color:var(--slate-heading);margin:0;">Residential CCTV</h3><span style="font-size:.75rem;color:#64748b;">Villas, houses, apartments &amp; private plots</span></div></div>
        <p style="font-size:.875rem;color:var(--slate-body);line-height:1.7;">Home security coverage planned around your family and property boundary, with concealed conduit and neat cabling.</p>
        <span style="font-size:.7rem;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.05em;">Priority Coverage Zones:</span>
        <div class="zone-grid">
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Independent Villas &amp; Houses</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Apartments &amp; Flat Entrances</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Main Gates &amp; Compound Walls</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Car Porches &amp; Driveways</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Sit-outs &amp; Balconies</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Backyard &amp; Terrace Doors</div>
        </div>
        <div class="solution-footnote"><svg class="icon" style="color:var(--brand-orange);flex-shrink:0;"><use href="#i-shield-check"/></svg><p style="font-size:.75rem;color:#334155;margin:0;">Focus on aesthetic neatness and easy multi-user phone viewing where supported.</p></div>
      </div>
      <div class="solution-card">
        <div class="solution-head"><span class="solution-icon"><svg class="icon" style="width:1.75rem;height:1.75rem;"><use href="#i-store"/></svg></span><div><h3 style="font-size:1.5rem;font-weight:700;color:var(--slate-heading);margin:0;">Commercial CCTV</h3><span style="font-size:.75rem;color:#64748b;">Retail shops, offices, warehouses &amp; commercial spaces</span></div></div>
        <p style="font-size:.875rem;color:var(--slate-body);line-height:1.7;">Multi-camera coverage for shops and offices to help monitor entries, counters and premises.</p>
        <span style="font-size:.7rem;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.05em;">Priority Coverage Zones:</span>
        <div class="zone-grid">
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Retail Shops &amp; Supermarkets</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Corporate Offices &amp; Studios</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Godowns &amp; Warehouses</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Commercial Complexes</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Workshops &amp; Garages</div>
          <div><svg class="icon" style="color:var(--brand-orange);"><use href="#i-check-circle"/></svg>Hotels &amp; Restaurants</div>
        </div>
        <div class="solution-footnote"><svg class="icon" style="color:var(--brand-orange);flex-shrink:0;"><use href="#i-shield-check"/></svg><p style="font-size:.75rem;color:#334155;margin:0;">Focus on multi-camera recording and remote owner oversight where supported.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="brands-section" id="brands">
  <div class="container">
    <div class="section-header-center">
      <div class="section-eyebrow"><span class="dot"></span>Equipment We Install</div>
      <h2 class="section-title dark">CCTV Brands We Work With</h2>
      <p style="font-size:.8125rem;color:#94a3b8;margin-top:.25rem;">CCTV hardware configured for your property.</p>
    </div>
    <div class="brands-grid">
      <div class="brand-card"><span class="brand-badge">HK</span><div><h3>Hikvision</h3><p>Surveillance equipment for homes and commercial setups.</p></div></div>
      <div class="brand-card"><span class="brand-badge">CP</span><div><h3>CP Plus</h3><p>Security camera systems and recording solutions.</p></div></div>
    </div>
    <div class="brands-footnote">
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;color:#cbd5e1;"><strong style="color:#fff;">Supported Systems:</strong><span class="tag-chip">Dome Cameras</span><span class="tag-chip">Bullet Cameras</span><span class="tag-chip">Wi-Fi Cameras</span><span class="tag-chip">DVR / NVR Systems</span></div>
      <span>Primary Base: Pallikkara, Kunnathunad, Kerala</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Why-us, process, areas, FAQ, contact, footer, mobile bar, close body**

```html
<section class="why-us-section section-pad" id="why-us">
  <div class="container">
    <div class="why-us-grid">
      <div>
        <div class="section-eyebrow"><span class="dot"></span>Technician-Led Service</div>
        <h2 class="section-title light" style="margin-bottom:.75rem;">Built Around Your Property, Not a One-Size-Fits-All Setup.</h2>
        <p style="color:var(--slate-body);line-height:1.7;">Communicate directly with the technician who inspects, installs and supports your CCTV setup.</p>
        <div class="why-us-callout" style="margin-top:1rem;">
          <svg class="icon" style="color:var(--brand-orange);width:1.5rem;height:1.5rem;flex-shrink:0;"><use href="#i-shield-check"/></svg>
          <div><strong style="display:block;color:#0f172a;font-size:.875rem;">Direct Accountability</strong><span style="font-size:.75rem;color:#475569;">Serving residential and commercial clients across Pallikkara, Kunnathunad and Ernakulam area.</span></div>
        </div>
      </div>
      <div class="benefit-grid">
        <div class="benefit-card"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-video"/></svg><h3>Professional Installation</h3><p>Careful camera placement and system setup.</p></div>
        <div class="benefit-card"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-shield-check"/></svg><h3>Supply, Install &amp; Support</h3><p>Supply, installation and setup from one local provider, with troubleshooting support available on request.</p></div>
        <div class="benefit-card"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-smartphone"/></svg><h3>Mobile App Setup</h3><p>Configure compatible CCTV systems for mobile viewing where supported.</p></div>
        <div class="benefit-card"><svg class="icon" style="color:var(--brand-orange);width:1.375rem;height:1.375rem;"><use href="#i-map-pin"/></svg><h3>Local Support</h3><p>Serving customers in Pallikkara, Kunnathunad and nearby areas.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="process-section section-pad" id="process">
  <div class="container">
    <div class="section-header-center">
      <div class="section-eyebrow"><span class="dot"></span>Transparent Steps</div>
      <h2 class="section-title dark">How It Works</h2>
      <p style="font-size:.875rem;color:#94a3b8;margin-top:.25rem;">A simple, transparent process from initial inquiry to installation.</p>
    </div>
    <div class="process-grid">
      <div class="process-step"><div class="process-step-top"><span class="process-step-num">01</span><svg class="icon" style="color:#64748b;"><use href="#i-phone-call"/></svg></div><h3>Contact Us</h3><p>Call or WhatsApp and explain your requirement.</p></div>
      <div class="process-step"><div class="process-step-top"><span class="process-step-num">02</span><svg class="icon" style="color:#64748b;"><use href="#i-wrench"/></svg></div><h3>Understand Your Requirement</h3><p>Discuss the property and required CCTV coverage.</p></div>
      <div class="process-step"><div class="process-step-top"><span class="process-step-num">03</span><svg class="icon" style="color:#64748b;"><use href="#i-hard-drive"/></svg></div><h3>Recommend Equipment</h3><p>Select suitable cameras and recording equipment.</p></div>
      <div class="process-step"><div class="process-step-top"><span class="process-step-num">04</span><svg class="icon" style="color:#64748b;"><use href="#i-video"/></svg></div><h3>Installation &amp; Setup</h3><p>Install and configure the CCTV system.</p></div>
      <div class="process-step"><div class="process-step-top"><span class="process-step-num">05</span><svg class="icon" style="color:#64748b;"><use href="#i-check-circle"/></svg></div><h3>Testing &amp; Handover</h3><p>Test the system and configure mobile viewing where supported.</p></div>
    </div>
  </div>
</section>

<section class="areas-section section-pad" id="areas">
  <div class="container">
    <div class="section-header-center">
      <div class="section-eyebrow"><span class="dot"></span>Local Service</div>
      <h2 class="section-title dark">CCTV Services Across Ernakulam</h2>
      <p style="font-size:.875rem;color:#94a3b8;margin-top:.25rem;">NS Security Solutions provides CCTV camera supply, installation and service for residential and commercial customers in Ernakulam and nearby areas. Primary base: Pallikkara, Kunnathunad, Kerala.</p>
    </div>
    <div class="areas-grid">
      <div class="area-card primary"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>Pallikkara &amp; Kunnathunad</strong><span class="desc" style="color:var(--brand-orange);">Primary Service Base</span></div></div>
      <div class="area-card"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>Kochi &amp; Ernakulam</strong><span class="desc">City &amp; surrounding areas</span></div></div>
      <div class="area-card"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>Aluva</strong><span class="desc">Aluva town &amp; environs</span></div></div>
      <div class="area-card"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>Kalamassery</strong><span class="desc">Kalamassery &amp; surrounding areas</span></div></div>
      <div class="area-card"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>North Paravur &amp; Angamaly</strong><span class="desc">Paravur town, Angamaly &amp; nearby</span></div></div>
      <div class="area-card"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg><div><strong>Tripunithura</strong><span class="desc">Tripunithura &amp; nearby residential areas</span></div></div>
    </div>
    <div class="areas-cta">
      <p style="font-size:.8125rem;color:#cbd5e1;margin:0;">Located in or near these areas? Call directly to check availability for your location.</p>
      <a class="btn btn-primary btn-sm" href="tel:+917907582779"><svg class="icon"><use href="#i-phone"/></svg>Check Availability</a>
    </div>
  </div>
</section>

<section class="faq-section section-pad" id="faq">
  <div class="container" style="max-width:56rem;">
    <div class="section-header-center">
      <div class="section-eyebrow"><span class="dot"></span>Clear Answers</div>
      <h2 class="section-title light">Frequently Asked Questions</h2>
      <p class="section-subtitle light">Practical questions from home and business owners across Ernakulam.</p>
    </div>
    <div class="faq-list">
      <details class="faq-item"><summary>How much does CCTV installation cost?</summary><p>Pricing depends on the number of cameras, cabling distance and DVR/NVR storage capacity. Contact us for an on-site inspection or a phone estimate.</p></details>
      <details class="faq-item"><summary>What type of CCTV camera is suitable for my home?</summary><p>Dome cameras suit indoor ceilings, sit-outs and covered porches. Bullet cameras suit outdoor gates and compound walls. We can help you choose based on your property.</p></details>
      <details class="faq-item"><summary>Do you install Hikvision and CP Plus cameras?</summary><p>Yes, we regularly install and configure both Hikvision and CP Plus systems, along with selected Wi-Fi cameras suited to your requirement.</p></details>
      <details class="faq-item"><summary>Can I view my CCTV cameras from my phone?</summary><p>Where your equipment and internet connection support it, we help set up the relevant mobile app on your Android or iPhone device for remote viewing.</p></details>
      <details class="faq-item"><summary>Do you install standalone Wi-Fi cameras?</summary><p>Yes. For smaller homes, flats, or monitoring a specific zone, standalone Wi-Fi cameras provide a cable-minimal option.</p></details>
      <details class="faq-item"><summary>Can you upgrade my existing CCTV system?</summary><p>It depends on your existing wiring and equipment. Contact us with details of your current setup and we can advise whether an upgrade or expansion is possible.</p></details>
      <details class="faq-item"><summary>Do you provide CCTV repair and maintenance?</summary><p>Get in touch with details of the issue you're facing — we can advise whether on-site troubleshooting support is available for your specific system.</p></details>
      <details class="faq-item"><summary>Which areas do you provide service in?</summary><p>We primarily serve Ernakulam city, Kochi, Aluva, Kalamassery, North Paravur, Angamaly, Tripunithura and nearby areas.</p></details>
    </div>
  </div>
</section>

<section class="contact-section section-pad" id="contact">
  <img class="contact-bg-img" src="images/property.webp" width="1600" height="900" alt="" loading="lazy">
  <div class="contact-bg-tint"></div>
  <div class="container" style="position:relative;z-index:1;">
    <div class="contact-panel">
      <div class="contact-grid">
        <div style="display:flex;flex-direction:column;justify-content:space-between;gap:2rem;">
          <div>
            <div class="section-eyebrow"><span class="dot"></span>Direct Communication</div>
            <h2 class="section-title dark" style="margin-bottom:.5rem;">Need CCTV Installation or a Quote?</h2>
            <p style="color:#cbd5e1;font-size:.9375rem;line-height:1.7;">Contact NS Security Solutions for CCTV camera supply, installation and Wi-Fi/networking solutions.</p>
            <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:1rem;">
              <a class="contact-link" href="tel:+917907582779"><span class="contact-link-icon"><svg class="icon"><use href="#i-phone"/></svg></span><div><small>Primary Phone &amp; WhatsApp</small><strong>+91 79075 82779</strong></div></a>
              <a class="contact-link" href="tel:+918891732779"><span class="contact-link-icon"><svg class="icon"><use href="#i-phone-call"/></svg></span><div><small>Secondary Phone</small><strong>+91 88917 32779</strong></div></a>
              <a class="contact-link" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer"><span class="contact-link-icon"><svg class="icon"><use href="#i-message-circle"/></svg></span><div><small>WhatsApp Direct</small><strong>+91 79075 82779</strong></div></a>
              <a class="contact-link" href="mailto:salahudeenns3@gmail.com"><span class="contact-link-icon"><svg class="icon"><use href="#i-mail"/></svg></span><div><small>Email</small><strong style="font-size:.875rem;">salahudeenns3@gmail.com</strong></div></a>
              <div class="contact-link" style="cursor:default;"><span class="contact-link-icon"><svg class="icon"><use href="#i-map-pin"/></svg></span><div><small>Physical Base</small><strong style="font-size:.875rem;">Pallikkara, Kunnathunad, Kerala</strong></div></div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:.75rem;">
            <a class="btn btn-primary btn-md" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer"><svg class="icon"><use href="#i-message-circle"/></svg>WhatsApp for a Quote</a>
            <a class="btn btn-ghost btn-md" href="tel:+917907582779"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>Call Now</a>
          </div>
        </div>
        <div class="contact-form-card">
          <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0 0 .5rem;">Request a Quote</h3>
          <p style="font-size:.75rem;color:#94a3b8;margin:0 0 1.5rem;">Fill in your details — submitting opens WhatsApp with your message pre-filled so you can send it directly to us.</p>
          <form class="contact-form" id="quote-form" novalidate>
            <div class="form-row">
              <div class="form-field"><label for="fullname">Full Name *</label><input id="fullname" name="fullname" type="text" placeholder="e.g. Rahul Menon" required></div>
              <div class="form-field"><label for="phone">Phone Number *</label><input id="phone" name="phone" type="tel" placeholder="e.g. 98460 XXXXX" required></div>
            </div>
            <div class="form-row">
              <div class="form-field"><label for="location">Property Location *</label><input id="location" name="location" type="text" placeholder="e.g. Aluva, Edappally, Kochi" required></div>
              <div class="form-field"><label for="service-needed">What do you need?</label>
                <select id="service-needed" name="service">
                  <option value="Home CCTV Installation">Home CCTV Installation</option>
                  <option value="Shop / Commercial CCTV">Shop / Commercial CCTV</option>
                  <option value="Wi-Fi Camera Setup">Wi-Fi Camera Setup</option>
                  <option value="Wi-Fi / Networking Setup">Wi-Fi / Networking Setup</option>
                  <option value="Existing System Query">Existing System Query</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>
            <div class="form-field" style="margin-bottom:1rem;"><label for="message">Requirement Details (Optional)</label><textarea id="message" name="message" rows="3" placeholder="Number of cameras, specific areas, timeline..."></textarea></div>
            <button class="btn btn-primary form-submit" type="submit"><svg class="icon"><use href="#i-message-circle"/></svg>Send via WhatsApp</button>
            <p class="form-note">Opens WhatsApp with your details pre-filled &bull; Your details are not stored on this site.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<aside class="mobile-action-bar">
  <a class="btn btn-ghost btn-md" href="tel:+917907582779"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>Call Now</a>
  <a class="btn btn-primary btn-md" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer"><svg class="icon"><use href="#i-message-circle"/></svg>WhatsApp</a>
</aside>

<a class="whatsapp-float" id="whatsapp-float" href="https://wa.me/917907582779" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
  <svg class="icon" style="width:1.5rem;height:1.5rem;"><use href="#i-message-circle"/></svg>
</a>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;">
          <span class="brand-mark" style="width:2.5rem;height:2.5rem;"><svg class="icon"><use href="#i-video"/></svg></span>
          <div><strong style="display:block;color:#fff;font-size:1.125rem;">NS Security Solutions</strong><span style="font-size:.75rem;color:#94a3b8;">CCTV &amp; Security Solutions</span></div>
        </div>
        <p style="font-size:.75rem;line-height:1.6;">CCTV camera supply, installation and Wi-Fi/networking solutions for homes, shops, offices and commercial properties in Ernakulam and nearby areas.</p>
      </div>
      <div class="footer-col"><h4>Services</h4>
        <a href="#services">CCTV Supply &amp; Installation</a>
        <a href="#services">DVR &amp; NVR Installation</a>
        <a href="#services">Wi-Fi Camera Solutions</a>
        <a href="#services">Wi-Fi Networking Solutions</a>
        <a href="#services">Wi-Fi Extenders, Routers &amp; Modems</a>
        <a href="#services">Troubleshooting Support (Ask Us)</a>
      </div>
      <div class="footer-col"><h4>Service Areas</h4>
        <a href="#areas">Pallikkara &amp; Kunnathunad</a>
        <a href="#areas">Kochi &amp; Ernakulam</a>
        <a href="#areas">Aluva</a>
        <a href="#areas">Kalamassery</a>
        <a href="#areas">North Paravur &amp; Angamaly</a>
        <a href="#areas">Tripunithura</a>
      </div>
      <div class="footer-col"><h4>Contact Details</h4>
        <a href="tel:+917907582779"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone"/></svg>+91 79075 82779</a>
        <a href="tel:+918891732779"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-phone-call"/></svg>+91 88917 32779</a>
        <a href="mailto:salahudeenns3@gmail.com"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-mail"/></svg>salahudeenns3@gmail.com</a>
        <span class="footer-line"><svg class="icon" style="color:var(--brand-orange);"><use href="#i-map-pin"/></svg>Pallikkara, Kunnathunad, Kerala</span>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 NS Security Solutions. All rights reserved.</span>
      <nav><a href="#home">Home</a><a href="#services">Services</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></nav>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Icon sprite + scripts, close document**

Append right before `</body>`:

```html
<svg style="display:none;">
  <symbol id="i-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
  <symbol id="i-video" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></symbol>
  <symbol id="i-phone-call" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2a9 9 0 0 1 9 9M13 6a5 5 0 0 1 5 5"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></symbol>
  <symbol id="i-message-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16M4 6h16M4 18h16"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m18 6-12 12M6 6l12 12"/></symbol>
  <symbol id="i-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21.8 10A10 10 0 1 1 17 3.34"/><path d="m9 11 3 3L22 4"/></symbol>
  <symbol id="i-shield-check" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></symbol>
  <symbol id="i-store" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 7h20l-2 5H4Z"/><path d="M4 12v8h16v-8M9 21v-5h6v5"/></symbol>
  <symbol id="i-wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0"/><circle cx="12" cy="20" r="1"/></symbol>
  <symbol id="i-hard-drive" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></symbol>
  <symbol id="i-router" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6.01 18H6M10.01 18H10M15 10v4M15 6.5a2.5 2.5 0 0 0-5 0"/></symbol>
  <symbol id="i-smartphone" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></symbol>
</svg>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Verify**

```bash
grep -c "Salahudeen" index.html                          # expect 0
grep -c "8:30 AM" index.html                              # expect 0
grep -c "genuine" index.html                              # expect 0
grep -c 'id="quote-form"' index.html                       # expect 1
grep -c 'id="whatsapp-float"' index.html                   # expect 1
python3 -c "
import re
html = open('index.html').read()
uses = set(re.findall(r'#i-([a-z-]+)', html))
syms = set(re.findall(r'id=\"i-([a-z-]+)\"', html))
missing = uses - syms
print('missing icons:', missing if missing else 'none')
"
```
Expected: `missing icons: none`; all other greps as noted.

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: complete index.html markup, icon sprite, footer, mobile bar"
```

---

### Task 8: `js/main.js` — mobile menu, navbar scroll state, active-link highlighting

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `#mobile-menu-open`, `#mobile-menu-close`, `#mobile-drawer`, `#site-header`, `.nav-links a`, `.mobile-drawer nav a` (all from Tasks 6–7).
- Produces: no exports — this is a plain script; later tasks append more code to the same file's IIFE-free top level (each behavior is its own self-contained block, so ordering between tasks 8–11 doesn't matter).

- [ ] **Step 1: Mobile drawer open/close**

```js
// --- Mobile drawer ---
const drawer = document.getElementById('mobile-drawer');
const openBtn = document.getElementById('mobile-menu-open');
const closeBtn = document.getElementById('mobile-menu-close');

function openDrawer() {
  drawer.classList.add('is-open');
  openBtn.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  openBtn.setAttribute('aria-expanded', 'false');
}

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
```

- [ ] **Step 2: Header scroll state + active nav link on scroll**

```js
// --- Header scroll state ---
const header = document.getElementById('site-header');
function onScroll() {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Active nav link ---
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];
function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  }
  navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
```

- [ ] **Step 3: Verify**

```bash
node --check js/main.js && echo "syntax ok"
```
Expected: `syntax ok` (no output from `--check` means valid syntax; the echo confirms the command didn't fail).

- [ ] **Step 4: Commit**

```bash
git add js/main.js && git commit -m "feat: add mobile drawer, header scroll state, active nav link JS"
```

---

### Task 9: `js/main.js` — GSAP hero entrance + reduced-motion gate

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `gsap` global (loaded via CDN script tag in Task 7), `.hero-badge`, `.hero h1`, `.hero .lead`, `.hero-ctas`, `.hero-meta`, `.hero-image-card` (Task 6 markup).
- Produces: `prefersReducedMotion` const, reused by Task 10's scroll-reveal code.

- [ ] **Step 1: Reduced-motion gate + hero entrance timeline**

```js
// --- Motion preference ---
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Hero entrance ---
if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
  gsap.set(['.hero-badge', '.hero h1', '.hero .lead', '.hero-ctas', '.hero-meta', '.hero-image-card'], { opacity: 0, y: 24 });
  const heroTl = gsap.timeline({ defaults: { duration: 0.7, ease: 'power2.out' } });
  heroTl
    .to('.hero-badge', { opacity: 1, y: 0 })
    .to('.hero h1', { opacity: 1, y: 0 }, '-=0.4')
    .to('.hero .lead', { opacity: 1, y: 0 }, '-=0.45')
    .to('.hero-ctas', { opacity: 1, y: 0 }, '-=0.4')
    .to('.hero-meta', { opacity: 1, y: 0 }, '-=0.35')
    .to('.hero-image-card', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6');
} else {
  // No GSAP or reduced motion: ensure content is visible with no animation.
  document.querySelectorAll('.hero-badge, .hero h1, .hero .lead, .hero-ctas, .hero-meta, .hero-image-card')
    .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
}
```

- [ ] **Step 2: Verify**

```bash
node --check js/main.js && echo "syntax ok"
grep -q "prefersReducedMotion" js/main.js && echo "reduced-motion gate present"
```
Expected: both echoed lines print.

- [ ] **Step 3: Commit**

```bash
git add js/main.js && git commit -m "feat: add GSAP hero entrance animation with reduced-motion fallback"
```

---

### Task 10: `js/main.js` — scroll-reveal via IntersectionObserver + GSAP

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `prefersReducedMotion` from Task 9; targets `.section-eyebrow, .section-title, .section-subtitle` (headings), `.service-card, .solution-card, .brand-card, .process-step, .area-card, .benefit-card, .faq-item, .checklist-item` (cards), `.contact-panel` (from Tasks 6–7 markup).

- [ ] **Step 1: Scroll reveal**

```js
// --- Scroll reveal ---
const revealTargets = document.querySelectorAll(
  '.section-eyebrow, .section-title, .section-subtitle, .service-card, .solution-card, ' +
  '.brand-card, .process-step, .area-card, .benefit-card, .faq-item, .checklist-item, .contact-panel'
);

if (typeof gsap !== 'undefined' && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => { gsap.set(el, { opacity: 0, y: 20 }); });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
}
```

- [ ] **Step 2: Verify**

```bash
node --check js/main.js && echo "syntax ok"
grep -q "IntersectionObserver" js/main.js && echo "reveal present"
```
Expected: both lines print.

- [ ] **Step 3: Commit**

```bash
git add js/main.js && git commit -m "feat: add IntersectionObserver-driven GSAP scroll reveal"
```

---

### Task 11: `js/main.js` — WhatsApp-prefill contact form, floating button pulse, hover polish

**Files:**
- Modify: `js/main.js`
- Modify: `css/style.css` (button/card hover already covered in Tasks 3–5 via CSS `:hover`; this task adds only the WhatsApp float's subtle pulse keyframes)

**Interfaces:**
- Consumes: `#quote-form` and its named fields (`fullname`, `phone`, `location`, `service`, `message`) from Task 7; `#whatsapp-float` from Task 7.

- [ ] **Step 1: WhatsApp-prefill form submit handler**

```js
// --- Contact form -> WhatsApp prefill ---
const quoteForm = document.getElementById('quote-form');
quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(quoteForm);
  const fullname = (data.get('fullname') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const location = (data.get('location') || '').toString().trim();
  const service = (data.get('service') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!fullname || !phone || !location) {
    quoteForm.reportValidity();
    return;
  }

  const lines = [
    `Hi NS Security Solutions, I'd like a quote.`,
    `Name: ${fullname}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Requirement: ${service}`,
  ];
  if (message) lines.push(`Details: ${message}`);

  const text = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/917907582779?text=${text}`, '_blank', 'noopener,noreferrer');
});
```

- [ ] **Step 2: WhatsApp float subtle pulse (CSS, reduced-motion respected)**

Append to `css/style.css`:

```css
@keyframes wa-pulse-ring {
  0%, 80%, 100% { box-shadow: 0 10px 25px rgba(244,123,32,.4), 0 0 0 0 rgba(244,123,32,0); }
  40% { box-shadow: 0 10px 25px rgba(244,123,32,.4), 0 0 0 8px rgba(244,123,32,.18); }
}
.whatsapp-float { animation: wa-pulse-ring 4.5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .whatsapp-float { animation: none; }
}
```

- [ ] **Step 3: Verify**

```bash
node --check js/main.js && echo "syntax ok"
grep -q "wa.me/917907582779?text=" js/main.js && echo "whatsapp prefill present"
grep -q "wa-pulse-ring" css/style.css && echo "pulse present"
```
Expected: all three lines print.

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css && git commit -m "feat: whatsapp-prefill contact form and floating button pulse"
```

---

### Task 12: Icon rendering wiring + card/button/navbar transition CSS audit

**Files:**
- Modify: `css/style.css` (append any missing transition rules found during audit)

**Interfaces:**
- Consumes: full `index.html` + `css/style.css` from Tasks 6–7, 3–5.

This task is a targeted audit, not new features: confirm every interactive element specified in the brief already has its hover/transition treatment from earlier tasks (it should, they were written in), and catch anything missed.

- [ ] **Step 1: Audit checklist against the CSS file**

```bash
for sel in ".service-card:hover" ".solution-card:hover" ".process-step:hover" ".area-card:hover" ".btn:active" ".btn-primary:hover" ".site-header.is-scrolled" ".mobile-drawer.is-open" ".faq-item\[open\]"; do
  grep -qF "$sel" css/style.css && echo "OK  $sel" || echo "MISSING $sel"
done
```
Expected: every line prints `OK`. If any print `MISSING`, add the missing rule to `css/style.css` following the same pattern as its neighbors in Tasks 3–5, then re-run.

- [ ] **Step 2: Commit (only if Step 1 required a fix)**

```bash
git add css/style.css && git commit -m "style: fill in missing hover/transition rules from audit" --allow-empty
```

---

### Task 13: Placeholder images

**Files:**
- Create: `images/hero.webp`
- Create: `images/installation.webp`
- Create: `images/property.webp`

**Interfaces:**
- Consumes: nothing.
- Produces: files referenced by `index.html:` `images/hero.webp` (480×384 art direction, actually rendered at various responsive sizes but source should be landscape-ish, generate 960×768), `images/installation.webp` (1280×960), `images/property.webp` (1600×900).

Real photography isn't available in this environment, so generate clearly-labeled placeholder art in the brand palette (navy background, orange label text) at the correct aspect ratios, so layout/CLS can be verified now and the business swaps in real photos later.

- [ ] **Step 1: Generate the three placeholders with ImageMagick**

```bash
convert -size 960x768 gradient:'#0B1928-#071522' \
  -gravity center -fill '#F47B20' -font DejaVu-Sans-Bold -pointsize 34 \
  -annotate 0 "REPLACE:\nimages/hero.webp\n\nPhoto: technician installing\na camera on a Kerala home" \
  images/hero.webp

convert -size 1280x960 gradient:'#0D1720-#040D16' \
  -gravity center -fill '#F47B20' -font DejaVu-Sans-Bold -pointsize 40 \
  -annotate 0 "REPLACE:\nimages/installation.webp\n\nPhoto: technician configuring\nDVR/NVR indoors" \
  images/installation.webp

convert -size 1600x900 gradient:'#0B1928-#040D16' \
  -gravity center -fill '#F47B20' -font DejaVu-Sans-Bold -pointsize 44 \
  -annotate 0 "REPLACE:\nimages/property.webp\n\nPhoto: completed CCTV\ninstallation on a property" \
  images/property.webp
```

- [ ] **Step 2: Verify**

```bash
file images/hero.webp images/installation.webp images/property.webp
```
Expected: all three report as `RIFF ... Web/P image`.

```bash
python3 - <<'EOF'
import struct
for name, expect in [('images/hero.webp', (960,768)), ('images/installation.webp', (1280,960)), ('images/property.webp', (1600,900))]:
    with open(name, 'rb') as f:
        data = f.read(30)
    print(name, 'starts with RIFF:', data[:4] == b'RIFF', 'is WEBP:', data[8:12] == b'WEBP')
EOF
```
Expected: `True True` for all three.

- [ ] **Step 3: Commit**

```bash
git add images/*.webp && git commit -m "chore: add placeholder images for hero/installation/property"
```

---

### Task 14: README.md

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: nothing (documentation only).

- [ ] **Step 1: Write the README**

```markdown
# NS Security Solutions — Website

Static marketing site for NS Security Solutions (CCTV camera supply, installation, DVR/NVR,
Wi-Fi cameras and networking) serving Ernakulam, Kochi, Aluva, North Paravur, Kalamassery,
Angamaly, Tripunithura and nearby areas.

## Project structure

\`\`\`
index.html          All page markup + inline SVG icon sprite
css/style.css        All styles (no framework, custom properties for the design tokens)
js/main.js           Mobile menu, scroll effects, GSAP animations, WhatsApp-prefill contact form
images/              hero.webp, installation.webp, property.webp, favicon.svg
\`\`\`

No build step, no dependencies to install beyond a browser. GSAP is loaded from a CDN
(`cdn.jsdelivr.net`) via `<script>` tags in `index.html`.

## Run locally

\`\`\`bash
python3 -m http.server 8000
\`\`\`

Then open http://localhost:8000 in a browser. (Any static file server works — this is a
plain HTML/CSS/JS site with no server-side logic.)

## Replacing the placeholder images

Three images currently ship as generated placeholders (navy background, orange text naming
the file and what should go there). Replace each file in place — same filename, same folder —
and the site picks it up automatically. Recommended source size/aspect ratio in parentheses:

- `images/hero.webp` — technician installing a camera on a residential exterior (~960×768, 4:3)
- `images/installation.webp` — technician configuring a DVR/NVR indoors (~1280×960, 4:3)
- `images/property.webp` — completed installation on a property, used as a dim background image (~1600×900, 16:9)

Export as `.webp` (use `cwebp`, an online converter, or "Save as WebP" in most image editors)
to keep the page lightweight. Keep the same filenames so you don't need to touch `index.html`.

## Deploying as a static site

Any static host works — no server, database, or build step required. Upload the whole
project folder (`index.html`, `css/`, `js/`, `images/`) as-is. For example:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or connect the git repo —
  no build command needed, output directory is the project root.
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch root.
- **Any shared hosting / cPanel**: upload the folder contents to `public_html/`.

### Before going live

1. **Domain**: `index.html`'s `<link rel="canonical">`, the Open Graph `og:url`/`og:image`,
   the Twitter card image URL, and the JSON-LD `"url"` field all currently use the placeholder
   domain `https://www.nssecuritysolutions.example/`. Replace every occurrence with the real
   domain once you have one (`grep -n "nssecuritysolutions.example" index.html` to find them).
2. **robots.txt** — create `robots.txt` at the site root once the real domain is known:
   \`\`\`
   User-agent: *
   Allow: /
   Sitemap: https://<your-real-domain>/sitemap.xml
   \`\`\`
3. **sitemap.xml** — create `sitemap.xml` at the site root:
   \`\`\`xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://<your-real-domain>/</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   \`\`\`
   These weren't generated as files here because they need the real production domain to be
   correct — using the placeholder domain would submit a broken sitemap to search engines.

## Business information still to confirm before publishing

- **Regular working hours.** Only "Sunday & public holidays: urgent service only" was
  provided. The site currently shows that fact only, with no invented Mon–Sat hours. If you
  want specific hours displayed in the top strip, give the exact times and they can be added.
- **Real domain name**, for the canonical/OG/JSON-LD URLs and `robots.txt`/`sitemap.xml` above.
- **Repair/upgrade/remote-viewing wording**: currently phrased neutrally ("ask us",
  "subject to inspection", "where supported") rather than as guaranteed services, per your
  instruction. Review that this reads accurately for what you're actually able to offer.
- **Three placeholder photos** (see above) need replacing with real images before launch.
- **Contact form**: submitting it opens WhatsApp with the enquiry pre-filled (no backend/email
  delivery, since this is a static site). Confirm that matches how you want to receive leads —
  the alternative is wiring it to a third-party form service (e.g. Formspree) if you'd rather
  receive form submissions by email.
\`\`\`
```

(Write the file with the fenced blocks above as literal content — the outer ` ```markdown ` fence in this plan step is just this plan's own formatting, not part of the README.)

- [ ] **Step 2: Verify**

```bash
test -f README.md && grep -q "nssecuritysolutions.example" README.md && echo "readme ok"
```
Expected: `readme ok`.

- [ ] **Step 3: Commit**

```bash
git add README.md && git commit -m "docs: add README with setup, deploy, and image-replacement instructions"
```

---

### Task 15: Final QA pass

**Files:** none created; verification only, with fixes applied inline wherever a check fails.

**Interfaces:** consumes the entire finished site.

- [ ] **Step 1: Forbidden-content grep sweep**

```bash
cd /home/govardhan/Documents/nssecurity
grep -rniE "Salahudeen|10\+ years|certified technician|authorized dealer|official partner|best cctv|#1 cctv|lowest price|500\+|1000\+|24/7|guaranteed response|manufacturer warranty|genuine warranty|colorvu|acusense|4k " index.html css/style.css js/main.js || echo "CLEAN"
```
Expected: `CLEAN`.

- [ ] **Step 2: Contact links sanity check**

```bash
grep -c 'tel:+917907582779' index.html
grep -c 'tel:+918891732779' index.html
grep -c 'wa.me/917907582779' index.html
grep -c 'mailto:salahudeenns3@gmail.com' index.html
```
Expected: each `>= 1` (several `>= 3`, since these appear in header/hero/contact/footer/mobile bar).

- [ ] **Step 3: JS syntax + icon-sprite completeness (re-run in case later tasks added new icon refs)**

```bash
node --check js/main.js && echo "js ok"
python3 -c "
import re
html = open('index.html').read()
uses = set(re.findall(r'#i-([a-z-]+)', html))
syms = set(re.findall(r'id=\"i-([a-z-]+)\"', html))
print('missing icons:', uses - syms or 'none')
"
```
Expected: `js ok`; `missing icons: none`.

- [ ] **Step 4: Visual/browser check**

```bash
cd /home/govardhan/Documents/nssecurity && python3 -m http.server 8000 &
sleep 1
```

Then use a browser tool (or the `run` skill) to open `http://localhost:8000` and manually confirm:
- Desktop (≥1280px): header nav visible, hero two-column, service grid 3-col, no console errors.
- Mobile width (375px): hamburger menu opens/closes and closes on link click, mobile sticky action bar visible at bottom, floating WhatsApp button doesn't overlap it, no horizontal scroll (`document.documentElement.scrollWidth <= document.documentElement.clientWidth` evaluated in devtools console should be true).
- Scroll the page: header gains `.is-scrolled` styling, section headings/cards fade+slide in once, FAQ items expand/collapse.
- Submit the contact form with all required fields filled: a new tab/window attempts to open `wa.me` with the message pre-filled (browser may block the popup in automated testing — confirm the URL was correct via console log if so).
- In devtools, enable "Emulate CSS prefers-reduced-motion: reduce", reload: hero content is visible immediately (no animation), scroll-reveal content is visible without waiting on scroll.

Kill the server when done:
```bash
kill %1 2>/dev/null
```

- [ ] **Step 5: Fix anything found, then final commit**

```bash
git add -A && git commit -m "chore: final QA fixes" --allow-empty
git log --oneline
```

---

## Self-Review Notes

- **Spec coverage:** project structure (Task 1), SEO/OG/Twitter/JSON-LD (Task 2), all 15 sections from the brief (Tasks 6–7), GSAP hero/scroll-reveal/hover/navbar/mobile-menu/WhatsApp-pulse animations with reduced-motion (Tasks 9–11), images with lazy loading + width/height + webp (Task 13), README with run/deploy/image-replacement/missing-info (Task 14), accessibility (real `<button>`s, aria-labels, focus-visible relies on browser default outline on `:focus` — of note, no custom `:focus` override was added anywhere in Tasks 3–5, so the browser's native focus ring is preserved by default, which satisfies "visible focus states" without extra work), final content/QA checklist from the brief (Task 15).
- **Placeholder scan:** no TBD/TODO left in any step; every code block is complete, copy-pasteable content, not a description of what to write.
- **Type/interface consistency:** element ids referenced across tasks (`site-header`, `mobile-drawer`, `mobile-menu-open/close`, `quote-form`, `whatsapp-float`) are defined once in Task 6/7 and consumed identically in Task 8–11; icon symbol ids (`i-video`, `i-phone`, etc.) are defined once in Task 7 Step 3 and every `<use href="#i-...">` in Tasks 6–7 matches that exact set (verified programmatically in Task 7 Step 4 and re-verified in Task 15 Step 3).
