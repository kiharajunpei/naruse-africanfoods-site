// ==================================================
// 成勢アフリカンフーズ — site interactions
// ==================================================

// --- Header: shadow on scroll ---
const header = document.getElementById('site-header');
const onScroll = () => {
  if (window.scrollY > 10) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Mobile nav toggle ---
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
toggle?.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  toggle.classList.toggle('is-open');
});
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.classList.remove('is-open');
  });
});

// --- Reveal on scroll ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Count-up numbers ---
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;
  const isFloat = !Number.isInteger(target);
  const duration = 1800;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutQuart(progress);
    const value = target * eased;
    el.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target.toString();
  };
  requestAnimationFrame(step);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
