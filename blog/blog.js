document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  const toggleNavbarBg = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  };

  toggleNavbarBg();
  window.addEventListener('scroll', toggleNavbarBg, { passive: true });

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
