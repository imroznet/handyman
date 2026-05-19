const q=(s)=>document.querySelector(s);
const safe=(v)=>String(v||'').replace(/[&<>"']/g,(m)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
const y=q('#year');if(y)y.textContent=new Date().getFullYear();
const menuBtn=q('.menu-btn');const nav=q('.nav-links');if(menuBtn&&nav)menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));

async function loadJSON(path){const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error(path);return r.json();}

async function renderHome(){
  const targets=[['/data/services.json','#services-grid',(r)=>`<a class="card service-card" href="/services/${safe(r.slug)}.html"><span class="icon">${safe(r.icon||'🛠️')}</span><strong>${safe(r.name)}</strong><span class="small">${safe(r.description)}</span></a>`],['/data/reviews.json','#reviews-grid',(r)=>`<div class="card"><strong>${safe(r.customer_name)}</strong> · ${'★'.repeat(r.rating||5)}<p>${safe(r.review_text)}</p></div>`],['/data/pricing.json','#pricing-grid',(r)=>`<div class="card"><strong>${safe(r.service_name)}</strong><p>${safe(r.price_label)}</p></div>`],['/data/faqs.json','#faq-grid',(r)=>`<div><button aria-expanded="false">${safe(r.question)}</button><div class="answer">${safe(r.answer)}</div></div>`]];
  for(const [path,sel,tpl] of targets){const el=q(sel);if(!el)continue;el.innerHTML='<div class="card"><span class="small">Loading...</span></div>';try{const rows=await loadJSON(path);el.innerHTML=rows.length?rows.map(tpl).join(''):'<div class="card"><span class="small">No content yet.</span></div>';}catch{el.innerHTML='<div class="card"><span class="small">Content unavailable.</span></div>';}}
  document.querySelectorAll('#faq-grid button,.faq button').forEach((b)=>b.addEventListener('click',()=>{const a=b.parentElement.querySelector('.answer');a.style.display=a.style.display==='block'?'none':'block';}));
}
renderHome();

const booking=q('#booking-form');if(booking){booking.addEventListener('submit',(e)=>{e.preventDefault();const msg=q('#booking-msg');const btn=booking.querySelector('button[type="submit"],button');const name=booking.name?.value.trim();const phone=booking.phone?.value.trim();if(!name||name.length<2){msg.textContent='Please enter your full name.';return;}if(!/^\+?\d[\d\s-]{7,}$/.test(phone)){msg.textContent='Please enter a valid phone number.';return;}if(btn){btn.disabled=true;btn.textContent='Preparing WhatsApp...';}
const service=encodeURIComponent(booking.service?.value||'General Handyman');const text=encodeURIComponent(`Booking request\nName: ${name}\nPhone: ${phone}\nService: ${booking.service?.value||''}\nAddress: ${booking.address?.value||''}\nDate: ${booking.date?.value||''}\nTime: ${booking.time?.value||''}\nMessage: ${booking.message?.value||''}`);window.location.href=`https://wa.me/6583122991?text=${text}`;msg.textContent='Redirecting to WhatsApp...';msg.className='success';setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent='Submit Booking';}},800);});}
