const db = require('../config/db');

const all = (sql, params=[]) => new Promise((resolve,reject)=>db.all(sql, params, (e,r)=>e?reject(e):resolve(r)));
const get = (sql, params=[]) => new Promise((resolve,reject)=>db.get(sql, params, (e,r)=>e?reject(e):resolve(r)));
const run = (sql, params=[]) => new Promise((resolve,reject)=>db.run(sql, params, function(e){e?reject(e):resolve(this);}));

module.exports = { all, get, run };
