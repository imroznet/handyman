const express = require('express');
const { all, run } = require('../models/helpers');
const multer = require('multer');
const path = require('path');
const upload = multer({dest:path.join(__dirname,'../uploads')});
const router = express.Router();

router.get('/content/:type', async (req,res)=>{
  const map = {services:'services',reviews:'reviews',faqs:'faqs',pricing:'pricing',blogs:'blog_posts',locations:'locations',gallery:'gallery'};
  const table = map[req.params.type];
  if(!table) return res.status(404).json({error:'invalid type'});
  res.json(await all(`SELECT * FROM ${table} ORDER BY id DESC`));
});

router.post('/bookings', upload.single('image'), async (req,res)=>{
  const b = req.body;
  if(!b.name || !b.phone || !b.service) return res.status(400).json({error:'Missing required fields'});
  await run('INSERT INTO bookings (service,name,phone,address,date,time,message,image_path) VALUES (?,?,?,?,?,?,?,?)',[
    b.service,b.name,b.phone,b.address||'',b.date||'',b.time||'',b.message||'',req.file?`/uploads/${req.file.filename}`:''
  ]);
  res.json({ok:true});
});

router.post('/inquiries', async (req,res)=>{
  const { name, phone, message } = req.body;
  await run('INSERT INTO inquiries (name,phone,message) VALUES (?,?,?)',[name||'',phone||'',message||'']);
  res.json({ok:true});
});

module.exports = router;
