const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const { get, run } = require('./models/helpers');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'replace-with-long-random-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 12 }
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use((req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  return res.status(404).send('Page not found');
});

app.use((err, _req, res, _next) => {
  console.error('[server error]', err);
  if (res.headersSent) return;
  if (String(_req.path || '').startsWith('/api')) return res.status(500).json({ error: 'Internal server error' });
  return res.status(500).send('Internal server error');
});

async function seedDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@handymansg.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const existing = await get('SELECT id FROM admins LIMIT 1');
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await run('INSERT INTO admins (username,password_hash) VALUES (?,?)', [email, hash]);
    console.log(`[seed] default admin created: ${email}`);
  }
}

async function start() {
  await seedDefaultAdmin();
  const port = Number(process.env.PORT || 8787);
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

start().catch((e) => {
  console.error('Failed to start server', e);
  db.close();
  process.exit(1);
});
