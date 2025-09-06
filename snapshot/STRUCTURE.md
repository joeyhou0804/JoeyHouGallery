# Snapshot Structure — www.joeyhou.gallery

This report summarizes the mirrored site to guide the Next.js rewrite.

## Top‑Level Pages
- `/index.html` — Home (hero + bilingual intro, nav list, link to joeyhou.org).
- `/applications.html` — iOS AR app overview (text, Cloudinary images, carousels).
- `/arts.html` — Art projects and travel journals (multiple Cloudinary images, carousels).
- `/handbooks.html` — Handbooks (Bootstrap layout, images expected via Cloudinary).
- `/posters.html` — Posters (Bootstrap cards, images via Cloudinary).
- `/reports.html` — Reports (Bootstrap cards, likely external links).
- `/videos.html` — YouTube embeds (iframes to specific video IDs).
- `/websites.html` — Website links/showcase.

## Assets & Dependencies
- CSS: `stylesheets/home.css` (home background + nav styles).
- Framework: Bootstrap 5 via CDN (+ Popper for index page).
- Media: Cloudinary images under `res.cloudinary.com/joey-hou-homepage/...`.
- Video: YouTube iframes, some using `http://` (should switch to `https://`).

## Navigation
All pages share the same navbar links: Home, Applications, Arts, Handbooks, Posters, Reports, Videos, Websites.

## Suggested Next.js 14 Routes (apps/web)
- `/` → `app/page.tsx` (already scaffolded).
- `/applications` → `app/applications/page.tsx`.
- `/arts` → `app/arts/page.tsx`.
- `/handbooks` → `app/handbooks/page.tsx`.
- `/posters` → `app/posters/page.tsx`.
- `/reports` → `app/reports/page.tsx`.
- `/videos` → `app/videos/page.tsx`.
- `/websites` → `app/websites/page.tsx`.

## Migration Notes
- Configure Next Images: allow `res.cloudinary.com` (done in next.config.js).
- Replace Bootstrap with MUI components (AppBar, Container, Grid, Card) for consistency with your stack.
- Convert hardcoded HTML sections to typed data (JSON/MDX) and map to components.
- Normalize external links to HTTPS (YouTube and others).

