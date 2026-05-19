
document.querySelectorAll('.faq button').forEach(b=>b.addEventListener('click',()=>{const a=b.parentElement.querySelector('.answer');a.style.display=a.style.display==='block'?'none':'block'}));
const y=document.querySelector('#year'); if(y) y.textContent=new Date().getFullYear();
