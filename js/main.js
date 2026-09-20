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
