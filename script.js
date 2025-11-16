
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('type-text');
  const cursor = document.getElementById('cursor');
  const words = ['Sameeha Nepal', 'a NERDDDD', 'a BOOKWORMMM'];
  const typeSpeed = 90;
  const deleteSpeed = 60;
  const pauseAfter = 1200; 

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(){
    const current = words[wordIndex];
    if(!deleting){
      el.textContent = current.slice(0, ++charIndex);
      if(charIndex === current.length){
        setTimeout(()=>{deleting = true;}, pauseAfter);
      }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if(charIndex === 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const delay = deleting ? deleteSpeed : typeSpeed;
    setTimeout(tick, delay);
  }

  setTimeout(tick, 600);

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const trg = document.querySelector(href);
        if(trg){
          trg.scrollIntoView({behavior:'smooth',block:'start'});
        }
        if(navList.classList.contains('show')){
          navList.classList.remove('show');
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });
});
