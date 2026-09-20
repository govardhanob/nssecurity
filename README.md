# NS Security Solutions — Website

Static marketing site for NS Security Solutions (CCTV camera supply, installation, DVR/NVR,
Wi-Fi cameras and networking) serving Ernakulam, Kochi, Aluva, North Paravur, Kalamassery,
Angamaly, Tripunithura and nearby areas.

## Project structure

```
index.html          All page markup + inline SVG icon sprite
css/style.css        All styles (no framework, custom properties for the design tokens)
js/main.js           Mobile menu, scroll effects, GSAP animations, WhatsApp-prefill contact form
images/              logo.png, hero.webp, installation.webp, property.webp,
                     favicon-16/32/48.png, apple-touch-icon.png
```

No build step, no dependencies to install beyond a browser. GSAP is loaded from a CDN
(`cdn.jsdelivr.net`) via a `<script>` tag in `index.html`.

## Run locally

```bash
python3 -m http.server 8000
```

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
   ```
   User-agent: *
   Allow: /
   Sitemap: https://<your-real-domain>/sitemap.xml
   ```
3. **sitemap.xml** — create `sitemap.xml` at the site root:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://<your-real-domain>/</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```
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
