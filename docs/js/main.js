// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setNav(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
}

toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: validate, then open the visitor's email app with the details filled in.
// Swap this for a form service or API endpoint once one is chosen.
const CONTACT_EMAIL = 'hello@weekendtech.org';
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

const checks = {
  name: (v) => v.trim().length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  message: (v) => v.trim().length > 0,
};

function validate(field) {
  const ok = checks[field.name](field.value);
  const error = document.getElementById(`${field.name}-error`);
  field.setAttribute('aria-invalid', String(!ok));
  if (ok) field.removeAttribute('aria-describedby');
  else field.setAttribute('aria-describedby', error.id);
  error.hidden = ok;
  return ok;
}

Object.keys(checks).forEach((name) => {
  form.elements[name].addEventListener('blur', (e) => {
    if (e.target.value || e.target.getAttribute('aria-invalid')) validate(e.target);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const invalid = Object.keys(checks).map((n) => form.elements[n]).filter((f) => !validate(f));
  if (invalid.length) { invalid[0].focus(); return; }

  const { name, email, kind, message } = form.elements;
  const subject = `New project: ${kind.value}`;
  const body = `${message.value.trim()}\n\n${name.value.trim()}\n${email.value.trim()}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = `Your email app should open with the details filled in. If it doesn't, write to ${CONTACT_EMAIL}.`;
});
