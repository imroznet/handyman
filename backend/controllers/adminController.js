const bcrypt = require('bcryptjs');
const { all, get, run } = require('../models/helpers');

const tables = ['services','blog_posts','reviews','faqs','pricing','gallery','locations'];

exports.loginPage = (req,res)=>res.render('admin/login',{error:null});
exports.login = async (req,res)=>{
  const { username, password } = req.body;
  const admin = await get('SELECT * FROM admins WHERE username=?',[username]);
  if(!admin) return res.render('admin/login',{error:'Invalid credentials'});
  const ok = await bcrypt.compare(password, admin.password_hash);
  if(!ok) return res.render('admin/login',{error:'Invalid credentials'});
  req.session.adminId = admin.id;
  res.redirect('/admin');
};
exports.logout = (req,res)=>req.session.destroy(()=>res.redirect('/admin/login'));

exports.dashboard = async (req,res)=>{
  const stats = {};
  for(const t of [...tables,'bookings','inquiries']) stats[t] = (await get(`SELECT COUNT(*) as c FROM ${t}`)).c;
  const recentBookings = await all('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10');
  const recentInquiries = await all('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 10');
  res.render('admin/dashboard',{stats,recentBookings,recentInquiries});
};

exports.list = async (req,res)=>{
  const type = req.params.type;
  if(!tables.includes(type) && type!=='bookings') return res.status(404).send('Unknown type');
  const rows = await all(`SELECT * FROM ${type} ORDER BY id DESC`);
  res.render('admin/list',{type,rows});
};

exports.create = async (req,res)=>{
  const type = req.params.type;
  if(!tables.includes(type)) return res.status(404).end();
  const data = {...req.body};
  if(req.file) data.image_path = `/uploads/${req.file.filename}`;
  const keys = Object.keys(data).filter(Boolean);
  const vals = keys.map(k=>data[k]);
  await run(`INSERT INTO ${type} (${keys.join(',')}) VALUES (${keys.map(()=>'?').join(',')})`, vals);
  res.redirect(`/admin/${type}`);
};

exports.updateBookingStatus = async (req,res)=>{
  await run('UPDATE bookings SET status=? WHERE id=?',[req.body.status, req.params.id]);
  res.redirect('/admin/bookings');
};

exports.delete = async (req,res)=>{
  await run(`DELETE FROM ${req.params.type} WHERE id=?`,[req.params.id]);
  res.redirect(`/admin/${req.params.type}`);
};
