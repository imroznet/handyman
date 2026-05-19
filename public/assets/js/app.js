const q = (s) => document.querySelector(s);
const safe = (v) => String(v || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

document.querySelectorAll('.faq button').forEach((b) => b.addEventListener('click', () => {
  const a = b.parentElement.querySelector('.answer');
  const open = a.style.display === 'block';
  a.style.display = open ? 'none' : 'block';
  b.setAttribute('aria-expanded', String(!open));
}));

const y = q('#year'); if (y) y.textContent = new Date().getFullYear();
const menuBtn = q('.menu-btn'); const nav = q('.nav-links');
if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

async function loadCMS() {
  const maps = [
    ['services', 'services-grid', (r) => `<a class="card service-card" href="/services/${safe(r.slug)}.html"><span class="icon">🛠️</span><strong>${safe(r.name || r.title)}</strong><span class="small">${safe(r.description)}</span></a>`],
    ['reviews', 'reviews-grid', (r) => `<div class="card"><strong>${safe(r.customer_name || 'Customer')}</strong> · ${'★'.repeat(Math.max(1, Math.min(5, Number(r.rating) || 5)))}<p>${safe(r.review_text)}</p></div>`],
    ['pricing', 'pricing-grid', (r) => `<div class="card"><strong>${safe(r.service_name || r.name)}</strong><p>${safe(r.price_label || r.pricing)}</p></div>`],
    ['faqs', 'faq-grid', (r) => `<div><button aria-expanded="false">${safe(r.question)}</button><div class="answer">${safe(r.answer)}</div></div>`]
  ];

  for (const [type, id, renderer] of maps) {
    const el = q(`#${id}`); if (!el) continue;
    el.innerHTML = '<div class="card"><span class="small">Loading...</span></div>';
    try {
      const res = await fetch(`/api/content/${type}`);
      if (!res.ok) throw new Error('bad');
      const rows = await res.json();
      if (!rows.length) { el.innerHTML = '<div class="card"><span class="small">No content yet.</span></div>'; continue; }
      el.innerHTML = rows.slice(0, 8).map(renderer).join('');
    } catch (_e) {
      el.innerHTML = '<div class="card"><span class="small">Content unavailable right now.</span></div>';
    }
  }

  document.querySelectorAll('#faq-grid button').forEach((b) => b.addEventListener('click', () => {
    const a = b.parentElement.querySelector('.answer');
    a.style.display = a.style.display === 'block' ? 'none' : 'block';
  }));
}
loadCMS();

const booking = q('#booking-form');
if (booking) {
  booking.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = q('#booking-msg');
    const btn = booking.querySelector('button[type="submit"],button');
    const data = new FormData(booking);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();

    if (name.length < 2) { msg.textContent = 'Please enter your full name.'; msg.className = ''; return; }
    if (!/^\+?\d[\d\s-]{7,}$/.test(phone)) { msg.textContent = 'Please enter a valid phone number.'; msg.className = ''; return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
    const r = await fetch('/api/bookings', { method: 'POST', body: data });
    if (r.ok) {
      msg.textContent = `Thanks! Booking sent. We will WhatsApp you shortly at ${phone}.`;
      msg.className = 'success';
      booking.reset();
    } else {
      msg.textContent = 'Unable to submit now. Please WhatsApp us directly at +65 8312 2991.';
      msg.className = '';
    }
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Booking'; }
  });
}
