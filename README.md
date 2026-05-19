# Handyman SG — Static-First Website + JSON CMS Workflow

This project now runs as a **fully static-compatible architecture** for Cloudflare Pages/shared hosting.

## Architecture
- Frontend: `public/` (HTML/CSS/Vanilla JS)
- Content source: `data/*.json`
- Admin interface: `public/admin/index.html` (static JSON editor workflow)

> No runtime backend is required for site rendering.

## Content Files
- `data/services.json`
- `data/reviews.json`
- `data/faqs.json`
- `data/pricing.json`
- `data/blogs.json`
- `data/locations.json`
- `data/gallery.json`

Homepage dynamic sections fetch these JSON files directly.

## Static Admin Usage
Open `/admin/` and unlock with password gate.

Default admin password (frontend gate):
- `Admin123!`

### Edit Workflow
1. Open admin and choose a JSON file.
2. Edit JSON in the editor (autosaves to localStorage).
3. Validate with **Preview Parse**.
4. Export or copy JSON.
5. Replace corresponding `data/*.json` file in repo.
6. Commit + deploy.

### Import/Export
- Import local `.json` files into editor.
- Export edited data for backup.

### Autosave
- Draft is stored in browser localStorage per content file.

## Deployment

### Cloudflare Pages
- Root: repository root
- Build command: none
- Output folder: `public`
- Ensure `data/` is published as static assets (keep at repo root if platform serves root files, or mirror under `public/data` depending host behavior).

### Shared Hosting
- Upload static files (`public/` + `data/`).
- No Node process required.

## Frontend Integration
`public/assets/js/app.js` loads and renders:
- services
- reviews
- pricing
- FAQs

Includes:
- loading states
- empty-state fallback
- error fallback

## Booking Flow (Static)
Booking submits via **WhatsApp redirect** with prefilled details; no backend endpoint required.

## SEO
- Keep `public/sitemap.xml` and `public/robots.txt`
- Homepage includes LocalBusiness + FAQ schema
- Existing internal linking/service/location pages remain intact

## GitHub Workflow
- Edit content in `data/*.json`
- Commit changes
- Push to main
- Cloudflare Pages redeploys static site
