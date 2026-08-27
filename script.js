// ---- Year in footer ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Nav: solid background on scroll ----
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navMobile.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll(
  '.service-card, .why-item, .gallery-item, .testimonial-card, .contact-copy, .quote-form, .section-head, .why-copy'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => io.observe(el));

// ---- Quote form (front-end only — wire up to email/CRM as needed) ----
const form = document.getElementById('quoteForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  formNote.innerHTML = `Thanks${name ? ', ' + name.split(' ')[0] : ''} — we'll be in touch shortly. Prefer to talk now? <a href="tel:+13478275751">Call for pricing</a>.`;
  form.reset();
  // NOTE: This form currently only shows a confirmation message in the browser.
  // To actually receive submissions, connect it to a form backend (e.g. Formspree,
  // Netlify Forms, or a simple server endpoint) and POST the form data there.
});
