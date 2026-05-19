const bcrypt = require('bcryptjs');
const { get, run } = require('../backend/models/helpers');

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@handymansg.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const reset = process.env.RESET_ADMIN === 'true';
  const existing = await get('SELECT * FROM admins WHERE username=?', [email]);
  const hash = await bcrypt.hash(password, 10);

  if (!existing) {
    await run('INSERT INTO admins (username,password_hash) VALUES (?,?)', [email, hash]);
    console.log(`Created admin ${email}`);
  } else if (reset) {
    await run('UPDATE admins SET password_hash=? WHERE username=?', [hash, email]);
    console.log(`Reset password for ${email}`);
  } else {
    console.log(`Admin already exists for ${email}. Use RESET_ADMIN=true to reset password.`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
