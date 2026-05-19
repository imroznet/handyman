# Handyman SG Website

Lightweight SEO-first handyman site for Singapore.

## Stack
- Static HTML/CSS/Vanilla JS frontend (`public/`)
- Lightweight Node + Express CMS backend (`backend/`)
- File-based JSON content store

## Run locally
```bash
npm install
npm start
```
Open `http://localhost:8787` and admin at `/admin/`.

Default admin credentials:
- user: `admin`
- pass: `change-this-password`

## Deployment
### Cloudflare Pages (frontend)
- Build command: none
- Output directory: `public`
- Add custom domain `handymansg.com`

### Backend options
- Deploy `backend/server.js` on a lightweight Node host (Render/Fly/Railway).
- Point forms/API calls to backend domain when separated.

## GitHub Workflow
- `.github/workflows/ci.yml` runs syntax sanity checks for JS files.
