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
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'replace-me', resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: 'lax', secure: false } }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);


(async()=>{
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'change-this-password';
  const existing = await get('SELECT id FROM admins WHERE username=?',[user]);
  if(!existing){
    const hash = await bcrypt.hash(pass, 10);
    await run('INSERT INTO admins (username,password_hash) VALUES (?,?)',[user,hash]);
  }
})();

app.listen(process.env.PORT || 8787, () => console.log('Server running'));
