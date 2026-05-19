const q=(s)=>document.querySelector(s);
document.querySelectorAll('.faq button').forEach((b)=>b.addEventListener('click',()=>{const a=b.parentElement.querySelector('.answer');const open=a.style.display==='block';a.style.display=open?'none':'block';b.setAttribute('aria-expanded',String(!open));}));
const y=q('#year');if(y)y.textContent=new Date().getFullYear();
const menuBtn=q('.menu-btn');const nav=q('.nav-links');if(menuBtn&&nav){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));}

async function loadCMS(){
  const maps=[['services','services-grid',r=>`<a class="card service-card" href="/services/${r.slug||''}.html"><span class="icon">🛠️</span><strong>${r.name||r.title||''}</strong><span class="small">${r.description||''}</span></a>`],['reviews','reviews-grid',r=>`<div class="card"><strong>${r.customer_name||'Customer'}</strong> · ${'★'.repeat(Math.max(1,Math.min(5,Number(r.rating)||5)))}<p>${r.review_text||''}</p></div>`],['pricing','pricing-grid',r=>`<div class="card"><strong>${r.service_name||r.name||''}</strong><p>${r.price_label||r.pricing||''}</p></div>`],['faqs','faq-grid',r=>`<div><button aria-expanded="false">${r.question||''}</button><div class="answer">${r.answer||''}</div></div>`]];
  for(const [type,id,renderer] of maps){
    const el=q('#'+id); if(!el) continue;
    try{const res=await fetch('/api/content/'+type); if(!res.ok) continue; const rows=await res.json(); el.innerHTML=(rows||[]).slice(0,8).map(renderer).join('');}
    catch(_e){}
  }
  document.querySelectorAll('#faq-grid button').forEach((b)=>b.addEventListener('click',()=>{const a=b.parentElement.querySelector('.answer');a.style.display=a.style.display==='block'?'none':'block';}));
}
loadCMS();

const booking=q('#booking-form');if(booking){booking.addEventListener('submit',async(e)=>{e.preventDefault();const msg=q('#booking-msg');const data=new FormData(booking);if(!data.get('phone')||String(data.get('phone')).length<8){msg.textContent='Please enter a valid phone number.';msg.className='';return;}const r=await fetch('/api/bookings',{method:'POST',body:data});if(r.ok){msg.textContent='Thanks! Booking sent. We will WhatsApp you shortly.';msg.className='success';booking.reset();}else{msg.textContent='Unable to submit now. Please WhatsApp us directly at +65 8312 2991.';msg.className='';}});}
