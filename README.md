# Handyman SG — Static Website + JSON CMS Admin

This project is fully static-hosting compatible (Cloudflare Pages/shared hosting). No backend runtime is required.

## Admin Access
- URL: `/admin/`
- Default password: `HandymanSG2026`
- Session persistence: browser `localStorage`
- Logout: available inside admin dashboard

## JSON Content Files
Edit these content files:
- `/data/services.json`
- `/data/reviews.json`
- `/data/faqs.json`
- `/data/pricing.json`
- `/data/blogs.json`
- `/data/locations.json`
- `/data/gallery.json`

## Static Admin Features
The static admin supports:
- file switching
- JSON editing
- autosave drafts in localStorage
- format JSON helper
- validation helper
- preview helper
- copy-to-clipboard
- download JSON
- upload/import JSON

## Publishing Workflow
1. Open `/admin/` and unlock.
2. Select file and edit JSON.
3. Validate + preview.
4. Copy or download updated JSON.
5. Replace matching file in `/data/`.
6. Commit and push to GitHub.
7. Cloudflare Pages redeploys automatically.

## Frontend Integration
Homepage dynamic sections fetch JSON directly:
- `/data/services.json`
- `/data/reviews.json`
- `/data/faqs.json`
- `/data/pricing.json`

The frontend includes loading states, empty states, and graceful fallback messages.

## Cloudflare Pages Setup
- Framework preset: none
- Build command: none
- Output folder: `public`
- Ensure `/data` is deployed as static assets reachable at `/data/*.json`

## Shared Hosting Setup
- Upload static assets (`public/` + `data/`)
- No Node server required

## GitHub Workflow
- Update content in `/data/`
- Commit changes
- Push to main
- Cloudflare Pages publishes updates

## Quality Check
Run syntax check locally:
```bash
npm run check
```
