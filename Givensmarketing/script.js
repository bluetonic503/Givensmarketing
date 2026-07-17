/* ==========================================================================
   Givens Marketing — script.js
   Vanilla JS only. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. Loading screen — fade out after page load
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 400);
  });

  /* ---------------------------------------------------------
     2. Sticky navbar background on scroll
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const toggleNavbarBg = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbarBg();
  window.addEventListener('scroll', toggleNavbarBg, { passive: true });

  /* ---------------------------------------------------------
     3. Mobile hamburger menu
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

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

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------------------------------------------------
     4. Smooth scrolling for in-page anchor links
     (native CSS scroll-behavior handles most of this;
      this JS fallback also accounts for the fixed navbar height)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------------------------------------------------------
     5. Active navigation link on scroll
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + document.getElementById('navbar').offsetHeight + 40;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------------------------------------------------------
     6. Scroll reveal animations (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     7. Counter animations (hero floating cards)
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------------------------------------------------------
     8. Timeline scroll animation (process section)
  --------------------------------------------------------- */
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineFill = document.querySelector('.timeline-fill');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(timelineSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('active');
          if (timelineFill) {
            const pct = ((index + 1) / timelineSteps.length) * 100;
            timelineFill.style.width = `${pct}%`;
          }
        }, index * 150);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  timelineSteps.forEach(step => timelineObserver.observe(step));

  /* ---------------------------------------------------------
     9. FAQ accordion — only one open at a time
  --------------------------------------------------------- */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      // Open clicked one if it wasn't already open
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------------
     10. Button ripple effect
  --------------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      this.style.setProperty('--x', `${e.clientX - rect.left}px`);
      this.style.setProperty('--y', `${e.clientY - rect.top}px`);

      const rippleAfter = this;
      rippleAfter.classList.remove('rippling');
      // force reflow to restart animation
      void rippleAfter.offsetWidth;
      rippleAfter.classList.add('rippling');
    });
  });

  /* ---------------------------------------------------------
     11. Contact form validation (no backend)
  --------------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('name-error') },
    email: { el: document.getElementById('email'), error: document.getElementById('email-error') },
    business: { el: document.getElementById('business'), error: document.getElementById('business-error') },
    message: { el: document.getElementById('message'), error: document.getElementById('message-error') }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (key) => {
    const { el, error } = fields[key];
    const value = el.value.trim();
    let message = '';

    if (value === '') {
      message = 'This field is required.';
    } else if (key === 'email' && !emailPattern.test(value)) {
      message = 'Please enter a valid email address.';
    } else if (key === 'message' && value.length < 10) {
      message = 'Please add a few more details (min 10 characters).';
    }

    error.textContent = message;
    el.closest('.form-row').classList.toggle('has-error', Boolean(message));
    return message === '';
  };

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) isValid = false;
    });

    if (!isValid) {
      successMsg.classList.remove('show');
      return;
    }

    // No backend — show a success message and reset form
    successMsg.textContent = 'Thank you! Your message has been received. This demo form is not connected to a backend.';
    successMsg.classList.add('show');
    form.reset();

    setTimeout(() => successMsg.classList.remove('show'), 6000);
  });

  /* ---------------------------------------------------------
     12. Back-to-top button
  --------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     13. Dynamic copyright year
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
