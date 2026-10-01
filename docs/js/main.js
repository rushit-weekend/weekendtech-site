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

// Contact form: validate, then send to the Google Apps Script web app
// (apps-script/contact-form.gs), which emails hello@ and logs to a Google Sheet.
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwnbxQdB1M8q4NC6qsgfVOx0ZhTUdNllQxCl_Rw6CWXOYsJemCMM_J3-9KcCxr9uHJoug/exec';
const CONTACT_EMAIL = 'hello@weekendtech.org';
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
const submit = form.querySelector('button[type="submit"]');

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

function showSent(email) {
  const sent = document.createElement('div');
  sent.className = 'form-sent';
  sent.setAttribute('role', 'status');
  sent.tabIndex = -1;
  sent.innerHTML = '<h3>Thanks, we have your project details</h3><p></p>';
  sent.querySelector('p').textContent = `We'll reply to you at ${email}. If it's urgent, write to ${CONTACT_EMAIL}.`;
  form.replaceWith(sent);
  sent.focus();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const invalid = Object.keys(checks).map((n) => form.elements[n]).filter((f) => !validate(f));
  if (invalid.length) { invalid[0].focus(); return; }

  submit.disabled = true;
  submit.textContent = 'Sending…';
  note.textContent = '';
  note.classList.remove('is-error');

  try {
    const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new URLSearchParams(new FormData(form)) });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'send_failed');
    showSent(form.elements.email.value.trim());
  } catch {
    submit.disabled = false;
    submit.textContent = 'Send project details';
    note.classList.add('is-error');
    note.textContent = `Your details didn't send. Check your connection and try again, or email ${CONTACT_EMAIL}.`;
  }
});
