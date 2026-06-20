// AnimeForYou — Modern Animations
(function(){
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  function initReveal() {
    document.querySelectorAll('.anime-card, .feature-card, .team-card, .faq-item').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 8) * 0.06}s`;
      revealObserver.observe(el);
    });
  }

  const header = document.getElementById('siteHeader') || document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  document.addEventListener('mousedown', (e) => {
    const btn = e.target.closest('.btn, .admin-tab, .menu-btn');
    if (btn) btn.style.transform = 'scale(0.96)';
  });
  document.addEventListener('mouseup', () => {
    document.querySelectorAll('.btn, .admin-tab, .menu-btn').forEach(b => b.style.transform = '');
  });

  let tiltCard = null;
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.anime-card');
    if (!card) { if (tiltCard) { tiltCard.style.transform = ''; tiltCard = null; } return; }
    tiltCard = card;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  });

  document.addEventListener('mouseleave', (e) => {
    if (e.target.closest && e.target.closest('.anime-card')) {
      document.querySelectorAll('.anime-card').forEach(c => c.style.transform = '');
      tiltCard = null;
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  window.AnimeAnimations = { initReveal };
})();
