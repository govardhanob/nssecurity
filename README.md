# NS Security Solutions — Website

Static marketing site for NS Security Solutions (CCTV camera supply, installation, DVR/NVR,
Wi-Fi cameras and networking) serving Ernakulam, Kochi, Aluva, North Paravur, Kalamassery,
Angamaly, Tripunithura and nearby areas.

## Project structure

```
index.html                              Homepage — all sections + inline SVG icon sprite
cctv-installation-kakkanad-infopark.html  Location landing page (primary service base)
cctv-installation-kochi-ernakulam.html    Location landing page
cctv-installation-aluva.html              Location landing page
cctv-installation-kalamassery.html        Location landing page
cctv-installation-north-paravur-angamaly.html  Location landing page
cctv-installation-tripunithura.html       Location landing page
css/style.css        All styles (no framework, custom properties for the design tokens)
js/main.js           Mobile menu, scroll effects, GSAP animations, WhatsApp-prefill contact form
images/              logo.png, hero.webp, installation.webp, property.webp,
                     favicon-16/32/48.png, apple-touch-icon.png
robots.txt           Points crawlers at sitemap.xml
sitemap.xml          Lists all 7 pages (homepage + 6 location pages)
```

### Location pages (SEO)

Six location-specific landing pages target searches like "cctv installation kakkanad" or
"cctv installation ernakulam" — grouped to match the homepage's existing service-area cards
(so no two pages compete for the same search term), each with genuinely unique intro copy,
a couple of area-specific FAQ entries, and full header/footer/nav matching the homepage. They're
linked from the homepage's Areas section cards and footer, and cross-link to each other via an
"Other Areas We Serve" section, so a crawler can reach every page from any other page.

If you add a 7th service area later, follow the same pattern: unique `<title>`/description,
a short factual paragraph about that specific place (no fabricated claims — see the content
rules below), 2-3 tailored FAQ entries, and add it to `sitemap.xml` and the homepage's area
cards/footer links.

No build step, no dependencies to install beyond a browser. GSAP is loaded from a CDN
(`cdn.jsdelivr.net`) via a `<script>` tag in `index.html`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser. (Any static file server works — this is a
plain HTML/CSS/JS site with no server-side logic.)

## Replacing the placeholder image

`images/hero.webp` and `images/installation.webp` are already real photos. One placeholder
remains — `images/property.webp` (navy background, orange text naming the file), used as a
dim background image behind the contact section on every page. Replace it in place — same
filename, same folder (`images/property.webp`, ~1600×900, 16:9) — and every page picks it up
automatically, no HTML changes needed.

Export as `.webp` (use `cwebp`, an online converter, or "Save as WebP" in most image editors)
to keep the page lightweight.

## Deploying as a static site

Any static host works — no server, database, or build step required. Upload the whole
project folder (`index.html`, `css/`, `js/`, `images/`) as-is. For example:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or connect the git repo —
  no build command needed, output directory is the project root.
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch root.
- **Any shared hosting / cPanel**: upload the folder contents to `public_html/`.

### Before going live

Domain is set to `https://nssecurity.in/` throughout (`<link rel="canonical">`, Open Graph,
Twitter card, JSON-LD `"url"`), and `robots.txt` / `sitemap.xml` are already in the project
root pointing at it. If the final domain ends up being `www.nssecurity.in` instead of the bare
domain, update those same spots (`grep -n "nssecurity.in" index.html robots.txt sitemap.xml`)
and pick one as canonical — set up a 301 redirect from the other in Netlify so Google doesn't
see both as duplicate content.

## Business information still to confirm before publishing

- **Regular working hours.** Only "Sunday & public holidays: urgent service only" was
  provided. The site currently shows that fact only, with no invented Mon–Sat hours. If you
  want specific hours displayed in the top strip, give the exact times and they can be added.
- **Repair/upgrade/remote-viewing wording**: currently phrased neutrally ("ask us",
  "subject to inspection", "where supported") rather than as guaranteed services, per your
  instruction. Review that this reads accurately for what you're actually able to offer.
- **`images/property.webp`** (see above) still needs replacing with a real photo.
- **Contact form**: submitting it opens WhatsApp with the enquiry pre-filled (no backend/email
  delivery, since this is a static site). Confirm that matches how you want to receive leads —
  the alternative is wiring it to a third-party form service (e.g. Formspree) if you'd rather
  receive form submissions by email.

## SEO / ranking notes

- Every page (homepage + 6 location pages) has its own `<title>`, meta description, canonical
  URL, Open Graph/Twitter tags, and a `LocalBusiness` JSON-LD block scoped to its area.
- `robots.txt` and `sitemap.xml` are at the site root — after deploying, submit the site and
  `sitemap.xml` to Google Search Console (search.google.com/search-console) to get indexed
  faster than waiting for organic crawling.
- Ranking in Google's local **Map Pack** (the 3-pin box shown above search results for
  location searches) requires a Google Business Profile — that's a separate, free Google
  product tied to the business owner's identity, not something achievable through website code
  alone. Without one, the site can still rank in regular organic results, just not that box.
- The location pages are intentionally grouped to match the homepage's service-area cards
  (not one page per literal place name) and each carries unique, factual copy — avoid
  duplicating near-identical pages per keyword variant, which search engines penalize as
  thin/doorway content.
