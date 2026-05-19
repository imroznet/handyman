# Handyman SG Website + Lightweight CMS

Existing static frontend is kept intact (`public/`).
This update adds a production-ready lightweight CMS backend using Node.js + Express + SQLite.

## Stack
- Frontend: HTML/CSS/Vanilla JS (`public/`)
- Backend: Express (`backend/`)
- Database: SQLite (`backend/data/cms.sqlite`)
- Auth: session-based admin login with hashed password

## CMS Features
- Manage: services, blog posts, reviews, FAQs, pricing, gallery, location pages
- Dashboard with overview stats, recent bookings, and inquiries
- Booking management with status updates
- File uploads for service/blog/gallery images

## Run
```bash
npm install
ADMIN_USER=admin ADMIN_PASS=change-this-password npm start
```
Open:
- Website: `http://localhost:8787`
- Admin: `http://localhost:8787/admin/login`

## API (for frontend dynamic content)
- `GET /api/content/services`
- `GET /api/content/reviews`
- `GET /api/content/faqs`
- `GET /api/content/pricing`
- `GET /api/content/blogs`
- `GET /api/content/locations`
- `POST /api/bookings`
- `POST /api/inquiries`

## Cloudflare Compatibility
- Static frontend remains Cloudflare Pages compatible (`public/`).
- Backend can be deployed separately on lightweight Node hosting.
