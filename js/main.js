// NS Security Solutions — scripts (filled in progressively)

// --- Mobile drawer ---
const drawer = document.getElementById('mobile-drawer');
const openBtn = document.getElementById('mobile-menu-open');
const closeBtn = document.getElementById('mobile-menu-close');

function openDrawer() {
  drawer.classList.add('is-open');
  openBtn.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  openBtn.setAttribute('aria-expanded', 'false');
}

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

// --- Header scroll state ---
const header = document.getElementById('site-header');
function onScroll() {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Active nav link ---
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];
function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  }
  navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// --- Motion preference ---
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Hero entrance ---
if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
  gsap.set(['.hero-badge', '.hero h1', '.hero .lead', '.hero-ctas', '.hero-meta', '.hero-image-card'], { opacity: 0, y: 24 });
  const heroTl = gsap.timeline({ defaults: { duration: 0.7, ease: 'power2.out' } });
  heroTl
    .to('.hero-badge', { opacity: 1, y: 0 })
    .to('.hero h1', { opacity: 1, y: 0 }, '-=0.4')
    .to('.hero .lead', { opacity: 1, y: 0 }, '-=0.45')
    .to('.hero-ctas', { opacity: 1, y: 0 }, '-=0.4')
    .to('.hero-meta', { opacity: 1, y: 0 }, '-=0.35')
    .to('.hero-image-card', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6');
} else {
  // No GSAP or reduced motion: ensure content is visible with no animation.
  document.querySelectorAll('.hero-badge, .hero h1, .hero .lead, .hero-ctas, .hero-meta, .hero-image-card')
    .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
}

// --- Scroll reveal ---
const revealTargets = document.querySelectorAll(
  '.section-eyebrow, .section-title, .section-subtitle, .service-card, .solution-card, ' +
  '.brand-card, .process-step, .area-card, .benefit-card, .faq-item, .checklist-item, .contact-panel'
);

// Stagger cards within the same grid so they reveal in sequence rather than all at once.
document.querySelectorAll('.services-grid, .solutions-grid, .brands-grid, .process-grid, .areas-grid, .benefit-grid')
  .forEach((group) => {
    [...group.children].forEach((child, i) => { child.dataset.staggerIndex = i; });
  });

if (typeof gsap !== 'undefined' && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach((el) => { gsap.set(el, { opacity: 0, y: 20, scale: 0.96 }); });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = Number(entry.target.dataset.staggerIndex || 0);
      gsap.to(entry.target, {
        opacity: 1, y: 0, scale: 1, duration: 0.6,
        delay: Math.min(idx * 0.06, 0.3), ease: 'power2.out',
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
}

// --- Hero HUD timestamp (decorative CCTV monitor overlay, ticks with real local time) ---
const hudTimestamp = document.getElementById('hud-timestamp');
if (hudTimestamp) {
  const pad = (n) => String(n).padStart(2, '0');
  function tickTimestamp() {
    const d = new Date();
    hudTimestamp.textContent =
      `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  tickTimestamp();
  setInterval(tickTimestamp, 1000);
}

// --- Contact form -> WhatsApp prefill ---
const quoteForm = document.getElementById('quote-form');
quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(quoteForm);
  const fullname = (data.get('fullname') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const location = (data.get('location') || '').toString().trim();
  const service = (data.get('service') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!fullname || !phone || !location) {
    quoteForm.reportValidity();
    return;
  }

  const lines = [
    `Hi NS Security Solutions, I'd like a quote.`,
    `Name: ${fullname}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Requirement: ${service}`,
  ];
  if (message) lines.push(`Details: ${message}`);

  const text = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/917907582779?text=${text}`, '_blank', 'noopener,noreferrer');
});
