const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

const hero = document.querySelector('.hero');
if (hero) {
  hero.style.setProperty('--mouse-x', 0.5);
  hero.style.setProperty('--mouse-y', 0.5);

  hero.addEventListener('mousemove', event => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    hero.style.setProperty('--mouse-x', x);
    hero.style.setProperty('--mouse-y', y);
  });
}

  // Interactive hero blob motion (subtle parallax)
  (function heroBlobMotion(){
    const blob = document.querySelector('.hero-blob');
    const heroEl = document.querySelector('.hero');
    if (!blob || !heroEl) return;

    // Respect reduced motion or small screens
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 700) return;

    let mouse = { x: 0.5, y: 0.5 };
    let tx = 0, ty = 0;

    heroEl.addEventListener('mousemove', (e) => {
      const r = heroEl.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    });

    function animate(){
      tx += (mouse.x - tx) * 0.06;
      ty += (mouse.y - ty) * 0.06;
      const moveX = (tx - 0.5) * 28;
      const moveY = (ty - 0.5) * 18;
      blob.style.transform = `translate3d(${18 + moveX}px, ${8 + moveY}px, 0) scale(1.02)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  })();

  // Hero carousel: auto-rotate slides every 3s, pause on hover
  (function initHeroCarousel(){
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (!slides.length) return;

    let idx = slides.findIndex(s => s.classList.contains('active'));
    if (idx < 0) idx = 0;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));

    const intervalMs = 3000;
    let timer = setInterval(next, intervalMs);

    function show(n) {
      slides.forEach((s, i) => s.classList.toggle('active', i === n));
    }

    function next() {
      idx = (idx + 1) % slides.length;
      show(idx);
    }

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(next, intervalMs); });
  })();
