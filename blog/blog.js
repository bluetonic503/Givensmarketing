document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const loadingScreen = document.getElementById('loading-screen');
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  const hideLoadingScreen = () => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      loadingScreen.setAttribute('aria-hidden', 'true');
    }
  };

  if (document.readyState === 'complete') {
    hideLoadingScreen();
  } else {
    window.addEventListener('load', hideLoadingScreen, { once: true });
    setTimeout(hideLoadingScreen, 1200);
  }

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

  if (hamburger && navLinksEl) {
    const closeMenu = () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
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
