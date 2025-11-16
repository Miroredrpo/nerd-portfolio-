
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

  // 3D Carousel
  const carousel = document.getElementById('carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if(carousel && items.length > 0){
    let currentIndex = 0;
    const totalItems = items.length;
    const theta = 360 / totalItems;
    const radius = Math.round((280 / 2) / Math.tan(Math.PI / totalItems)) + 100;
    
    function rotateCarousel(){
      const angle = theta * currentIndex * -1;
      carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
    }
    
    function positionItems(){
      items.forEach((item, i) => {
        const cellAngle = theta * i;
        item.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
      });
    }
    
    function nextSlide(){
      currentIndex++;
      rotateCarousel();
    }
    
    function prevSlide(){
      currentIndex--;
      rotateCarousel();
    }
    
    positionItems();
    rotateCarousel();
    
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    let autoRotate = setInterval(nextSlide, 1200);
    
    if(carousel.parentElement){
      carousel.parentElement.addEventListener('mouseenter', ()=>{
        clearInterval(autoRotate);
      });
      carousel.parentElement.addEventListener('mouseleave', ()=>{
        nextSlide(); 
        autoRotate = setInterval(nextSlide, 1200);
      });
    }
  }

  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1439657506807742556/tYCA49HhvhXKvY5wUR31Kom_hwjIcm6f26gdLnazjfIUYjzTGe5mm4CgESvMzacrurIE';
  
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.querySelector('.form-status');
  
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      const embed = {
        title: '📬 New Contact Form Submission',
        color: 0x1a237e,
        fields: [
          {
            name: ' Name',
            value: name,
            inline: false
          },
          {
            name: ' Email',
            value: email,
            inline: false
          },
          {
            name: ' Message',
            value: message,
            inline: false
          }
        ],
        footer: {
          text: 'Sameeha Nepal Portfolio'
        },
        timestamp: new Date().toISOString()
      };
      
      try{
        const response = await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: 'Portfolio Contact',
            embeds: [embed]
          })
        });
        
        if(response.ok){
          formStatus.textContent = '✓ Message sent successfully!';
          formStatus.className = 'form-status success';
          contactForm.reset();
          setTimeout(()=>{
            formStatus.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Failed to send');
        }
      } catch(error){
        formStatus.textContent = '✗ Failed to send message. Please try again or email directly.';
        formStatus.className = 'form-status error';
      }
    });
  }
});
