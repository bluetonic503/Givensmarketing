/* ==========================================================================
   Givens Marketing — script.js
   Vanilla JS only. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');
  const contactSection = document.getElementById('contact');

  /* Pricing is rendered here so the existing static site architecture and contact flow remain intact. */
  const pricingStyles = document.createElement('style');
  pricingStyles.textContent = `
    .pricing-section { background: var(--color-bg); }
    .pricing-section .section-head { max-width: 720px; margin-inline: auto; }
    .pricing-grid { align-items: stretch; margin-top: 34px; }
    .pricing-card { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 32px 26px 26px; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
    .pricing-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
    .pricing-card.featured { border-color: var(--color-primary); box-shadow: 0 16px 38px rgba(22,163,74,.14); }
    .pricing-badge { position: absolute; top: -13px; left: 24px; padding: 5px 12px; border-radius: 999px; background: var(--color-primary); color: #fff; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .pricing-card h3 { margin-bottom: 10px; font-size: 1.05rem; letter-spacing: .12em; }
    .pricing-price { margin: 8px 0 12px; font-family: var(--font-display); font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 800; line-height: 1.1; letter-spacing: -.05em; }
    .pricing-price span { color: var(--color-text-secondary); font-family: var(--font-body); font-size: .82rem; font-weight: 500; letter-spacing: 0; }
    .pricing-description { min-height: 72px; margin: 0; color: var(--color-text-secondary); font-size: .94rem; line-height: 1.55; }
    .pricing-features { display: grid; gap: 10px; margin: 24px 0 28px; padding: 0; list-style: none; }
    .pricing-features li { display: flex; gap: 10px; align-items: flex-start; color: var(--color-text-secondary); font-size: .9rem; line-height: 1.45; }
    .pricing-features i { flex: 0 0 auto; margin-top: 4px; color: var(--color-primary); font-size: .78rem; }
    .pricing-card .btn { width: 100%; margin-top: auto; }
    .pricing-note { max-width: 760px; margin: 28px auto 0; color: var(--color-text-secondary); font-size: .8rem; text-align: center; }
    .pricing-note + .pricing-note { margin-top: 7px; }
    .founding-client { margin-top: 70px; padding: 52px 42px; border: 1px solid rgba(22,163,74,.2); border-radius: var(--radius-lg); background: #fff; box-shadow: var(--shadow-sm); text-align: center; }
    .founding-client .section-title { max-width: 680px; margin: 0 auto; }
    .founding-copy { max-width: 650px; margin: 16px auto 26px; color: var(--color-text-secondary); }
    .founding-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px 24px; max-width: 760px; margin: 0 auto 30px; padding: 0; list-style: none; text-align: left; }
    .founding-list li { display: flex; gap: 9px; align-items: flex-start; font-size: .92rem; }
    .founding-list i { margin-top: 4px; color: var(--color-primary); }
    .pricing-section .btn:focus-visible, .founding-client .btn:focus-visible { outline: 3px solid rgba(22,163,74,.35); outline-offset: 3px; }
    @media (max-width: 820px) { .founding-list { grid-template-columns: 1fr; } .founding-client { padding: 38px 24px; } }
    @media (max-width: 560px) { .pricing-description { min-height: 0; } .founding-client { margin-top: 52px; } }
  `;
  document.head.appendChild(pricingStyles);

  const check = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
  const list = (items) => items.map(item => `<li>${check}<span>${item}</span></li>`).join('');
  const plans = [
    {
      name: 'STARTER', price: 'KSh 25,000', description: 'For businesses ready to start generating leads or sales with Meta Ads.', cta: 'Get Started',
      items: ['Meta Ads account setup', 'Campaign strategy', '1–2 active campaigns', 'Audience research', 'Ad copy', 'Up to 4 ad creatives', 'Pixel & conversion tracking review', 'Weekly optimization', 'Monthly performance report', 'WhatsApp/email support']
    },
    {
      name: 'GROWTH', price: 'KSh 65,000', description: 'For growing businesses ready to scale their advertising.', cta: 'Choose Growth', featured: true,
      items: ['Everything in Starter', '3–5 active campaigns', 'Advanced audience targeting', 'Retargeting campaigns', 'Up to 10 ad creatives', 'Creative A/B testing', 'Landing-page/conversion review', 'Weekly performance analysis', 'Budget optimization', 'Competitor/ad research', 'Bi-weekly strategy calls']
    },
    {
      name: 'SCALE', price: 'KSh 130,000+', description: 'For established businesses treating paid advertising as a serious growth channel.', cta: "Let's Scale",
      items: ['Everything in Growth', 'Full-funnel Meta Ads strategy', 'Multiple campaign objectives', 'Advanced retargeting', 'Continuous creative testing', 'Up to 20 ad creatives', 'Conversion funnel optimization', 'Advanced tracking & attribution review', 'Competitor intelligence', 'Weekly strategy calls', 'Priority support', 'Detailed monthly growth report']
    }
  ];

  const pricing = document.createElement('section');
  pricing.id = 'pricing';
  pricing.className = 'pricing-section pricing';
  pricing.innerHTML = `
    <div class="section-inner">
      <div class="section-head reveal in-view">
        <p class="eyebrow">Packages</p>
        <h2 class="section-title">Simple Plans. Serious Growth.</h2>
        <p class="section-sub">Choose the level of Meta Ads support that matches where your business is today.</p>
      </div>
      <div class="pricing-grid">${plans.map(plan => `
        <article class="pricing-card${plan.featured ? ' featured' : ''}">
          ${plan.featured ? '<span class="pricing-badge">Most Popular</span>' : ''}
          <h3>${plan.name}</h3>
          <p class="pricing-price">${plan.price} <span>/ month</span></p>
          <p class="pricing-description">${plan.description}</p>
          <ul class="pricing-features">${list(plan.items)}</ul>
          <a class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} ripple" href="#contact">${plan.cta}</a>
        </article>`).join('')}</div>
      <p class="pricing-note">Management fees do not include your Meta advertising budget. Ad spend is paid directly to Meta.</p>
      <p class="pricing-note">No guaranteed results. Campaign performance depends on factors including your offer, market, creative, landing page, tracking, and advertising budget.</p>
      <div class="founding-client">
        <p class="eyebrow">Founding Client Opportunity</p>
        <h2 class="section-title">Build Your First Winning Campaign With Us</h2>
        <p class="founding-copy">We're opening a limited number of spots for businesses that want hands-on Meta Ads management while we expand our agency portfolio.</p>
        <ul class="founding-list">${list(['Free initial Meta Ads audit', 'Campaign strategy', 'Campaign setup', 'Creative testing', 'Ongoing optimization', 'Transparent reporting'])}</ul>
        <a class="btn btn-primary ripple" href="#contact">Claim a Founding Client Spot</a>
      </div>
    </div>`;
  if (contactSection) contactSection.parentNode.insertBefore(pricing, contactSection); else document.querySelector('main').appendChild(pricing);

  const pricingLink = document.createElement('a');
  pricingLink.href = '#pricing'; pricingLink.className = 'nav-link'; pricingLink.textContent = 'Pricing';
  const ctaLink = navLinksEl && navLinksEl.querySelector('.nav-cta');
  if (navLinksEl) navLinksEl.insertBefore(pricingLink, ctaLink || null);

  const brandsHeading = document.querySelector('#brands .section-title');
  if (brandsHeading && brandsHeading.textContent.toLowerCase().includes('numerous')) {
    brandsHeading.textContent = "Brands & Projects We've Worked With";
  }
  const brandGrid = document.querySelector('#brands .brand-grid');
  if (brandGrid && !brandGrid.querySelector('[data-bluetonic-card]')) {
    brandGrid.insertAdjacentHTML('beforeend', `<a data-bluetonic-card class="brand-card" href="https://bluetonic.net/" target="_blank" rel="noopener noreferrer"><span class="brand-logo-wrap"><img class="brand-logo" src="https://bluetonic.net/favicon.ico" alt="Bluetonic logo" loading="lazy"></span><span class="brand-name">Bluetonic</span><span class="brand-url">bluetonic.net</span></a>`);
  }

  const hideLoadingScreen = () => { if (loadingScreen) loadingScreen.classList.add('hidden'); };
  window.addEventListener('load', () => setTimeout(hideLoadingScreen, 400), { once: true });
  setTimeout(hideLoadingScreen, 1200);

  const toggleNavbarBg = () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40); };
  toggleNavbarBg(); window.addEventListener('scroll', toggleNavbarBg, { passive: true });

  const closeMenu = () => { if (!hamburger || !navLinksEl) return; hamburger.classList.remove('active'); navLinksEl.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); };
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => { const isOpen = navLinksEl.classList.toggle('open'); hamburger.classList.toggle('active', isOpen); hamburger.setAttribute('aria-expanded', String(isOpen)); });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href'); if (!targetId || targetId.length <= 1) return;
    const target = document.querySelector(targetId); if (!target) return;
    event.preventDefault(); const navHeight = navbar ? navbar.offsetHeight : 0;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1, behavior: 'smooth' });
  }));

  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');
  const setActiveLink = () => { let currentId = ''; const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 40; sections.forEach(section => { if (scrollPos >= section.offsetTop) currentId = section.id; }); navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`)); };
  setActiveLink(); window.addEventListener('scroll', setActiveLink, { passive: true });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }), { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else revealEls.forEach(el => el.classList.add('in-view'));

  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = el => { const target = parseFloat(el.dataset.target); const prefix = el.dataset.prefix || ''; const suffix = el.dataset.suffix || ''; const start = performance.now(); const step = now => { const progress = Math.min((now - start) / 1400, 1); el.textContent = `${prefix}${Math.floor((1 - Math.pow(1 - progress, 3)) * target)}${suffix}`; if (progress < 1) requestAnimationFrame(step); else el.textContent = `${prefix}${target}${suffix}`; }; requestAnimationFrame(step); };
  if ('IntersectionObserver' in window) { const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); } }), { threshold: 0.6 }); counters.forEach(el => counterObserver.observe(el)); }

  const timelineSteps = document.querySelectorAll('.timeline-step'); const timelineFill = document.querySelector('.timeline-fill');
  if ('IntersectionObserver' in window) { const timelineObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { const index = Array.from(timelineSteps).indexOf(entry.target); setTimeout(() => { entry.target.classList.add('active'); if (timelineFill) timelineFill.style.width = `${((index + 1) / timelineSteps.length) * 100}%`; }, index * 150); timelineObserver.unobserve(entry.target); } }), { threshold: 0.5 }); timelineSteps.forEach(step => timelineObserver.observe(step)); } else timelineSteps.forEach(step => step.classList.add('active'));

  document.querySelectorAll('.accordion-trigger').forEach(trigger => trigger.addEventListener('click', () => { const panel = trigger.nextElementSibling; const isOpen = trigger.getAttribute('aria-expanded') === 'true'; document.querySelectorAll('.accordion-trigger').forEach(t => { t.setAttribute('aria-expanded', 'false'); if (t.nextElementSibling) t.nextElementSibling.style.maxHeight = null; }); if (!isOpen) { trigger.setAttribute('aria-expanded', 'true'); panel.style.maxHeight = `${panel.scrollHeight}px`; } }));
  document.querySelectorAll('.ripple').forEach(btn => btn.addEventListener('click', function () { this.classList.remove('rippling'); void this.offsetWidth; this.classList.add('rippling'); }));

  const form = document.getElementById('contact-form'); const successMsg = document.getElementById('form-success');
  if (form && successMsg) {
    const fields = { name: { el: document.getElementById('name'), error: document.getElementById('name-error') }, email: { el: document.getElementById('email'), error: document.getElementById('email-error') }, business: { el: document.getElementById('business'), error: document.getElementById('business-error') }, message: { el: document.getElementById('message'), error: document.getElementById('message-error') } };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateField = key => { const field = fields[key]; if (!field.el || !field.error) return true; const value = field.el.value.trim(); let message = ''; if (!value) message = 'This field is required.'; else if (key === 'email' && !emailPattern.test(value)) message = 'Please enter a valid email address.'; else if (key === 'message' && value.length < 10) message = 'Please add a few more details (min 10 characters).'; field.error.textContent = message; const row = field.el.closest('.form-row'); if (row) row.classList.toggle('has-error', Boolean(message)); return !message; };
    Object.keys(fields).forEach(key => fields[key].el && fields[key].el.addEventListener('blur', () => validateField(key)));
    form.addEventListener('submit', event => { event.preventDefault(); const valid = Object.keys(fields).every(validateField); if (!valid) { successMsg.classList.remove('show'); return; } successMsg.textContent = 'Thank you! Your message has been received. This demo form is not connected to a backend.'; successMsg.classList.add('show'); form.reset(); setTimeout(() => successMsg.classList.remove('show'), 6000); });
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) { window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 600), { passive: true }); backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
});
