# Handyman SG (Static Frontend + Express/SQLite CMS)

Production-ready lightweight stack:
- Static site in `public/` (Cloudflare Pages compatible)
- Express + SQLite CMS in `backend/`
- Server-rendered admin panel (`/admin`)

## 1) Install
```bash
npm install
```

## 2) Default Admin Login (auto-seeded)
If there is no admin account, the backend seeds one automatically at startup.

**Default credentials**
- Email: `admin@handymansg.com`
- Password: `Admin123!`

Login URL:
- `http://localhost:8787/admin/login`

## 3) Environment Variables
Use environment variables to override defaults:
- `PORT` (default `8787`)
- `NODE_ENV` (`development` or `production`)
- `SESSION_SECRET` (required in production)
- `ADMIN_EMAIL` (default `admin@handymansg.com`)
- `ADMIN_PASSWORD` (default `Admin123!`)

## 4) Run
```bash
npm run dev
npm start
```
- `npm run dev`: development startup
- `npm start`: production startup

## 5) Seed / Reset Admin
Create admin manually (if missing):
```bash
ADMIN_EMAIL=admin@handymansg.com ADMIN_PASSWORD='Admin123!' npm run seed
```
Reset password for existing admin:
```bash
ADMIN_EMAIL=admin@handymansg.com ADMIN_PASSWORD='NewStrongPass123!' RESET_ADMIN=true npm run seed
```

Create a new admin account:
- Run seed with a new `ADMIN_EMAIL` + `ADMIN_PASSWORD` pair.

## 6) CMS Features
Manage all requested entities:
- Services
- Blog posts
- Reviews
- FAQs
- Pricing
- Gallery
- Locations
- Booking list and booking status updates
- Inquiries list in dashboard

## 7) Frontend API Integration
Homepage dynamically loads from CMS APIs:
- `/api/content/services`
- `/api/content/reviews`
- `/api/content/pricing`
- `/api/content/faqs`

Booking:
- `POST /api/bookings`

Inquiry:
- `POST /api/inquiries`

## 8) Deployment
### Cloudflare Pages (Frontend)
- Output directory: `public`
- No build step required
- Attach domain `https://handymansg.com`

### Backend hosting (Node)
Deploy `backend/` on any Node host (Render/Railway/Fly/shared VPS):
1. Set env vars (`SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`)
2. Install dependencies (`npm install`)
3. Run (`npm start`)
4. Reverse proxy/static route to same domain or subdomain

### Shared hosting notes
If hosting supports Node apps:
- Point app startup to `backend/server.js`
- Ensure writable directory for `backend/data/` and `backend/uploads/`
- Configure persistent storage for SQLite db file (`backend/data/cms.sqlite`)

## 9) SEO + Performance
- Semantic HTML and schema included on homepage
- Dynamic content loading with loading/empty/fallback states
- Lightweight CSS/JS and no heavy frameworks
- Sticky mobile CTA + WhatsApp floating button kept intact
