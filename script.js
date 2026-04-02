// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===== AOS ANIMATIONS =====
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-animate'); } });
}, { threshold: 0.12 });
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SET MIN DATE FOR APPOINTMENT =====
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// ===== APPOINTMENT FORM =====
const form = document.getElementById('appointmentForm');
const successBox = document.getElementById('apptSuccess');
const resetBtn = document.getElementById('resetBtn');

function showError(fieldId, msg) {
  document.getElementById(fieldId + 'Error').textContent = msg;
  document.getElementById(fieldId).closest('.form-group').classList.add('has-error');
}
function clearError(fieldId) {
  const el = document.getElementById(fieldId + 'Error');
  if (el) el.textContent = '';
  const input = document.getElementById(fieldId);
  if (input) input.closest('.form-group').classList.remove('has-error');
}

function validateForm() {
  let valid = true;
  ['name','phone','date','time','service'].forEach(id => clearError(id));

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const service = document.getElementById('service').value;

  if (!name || name.length < 2) { showError('name', 'Please enter your full name.'); valid = false; }
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) { showError('phone', 'Enter a valid 10-digit Indian mobile number.'); valid = false; }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Enter a valid email address.'); valid = false; }
  if (!date) { showError('date', 'Please select a preferred date.'); valid = false; }
  if (!time) { showError('time', 'Please select a time slot.'); valid = false; }
  if (!service) { showError('service', 'Please select a service.'); valid = false; }

  return valid;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      const btn = document.getElementById('submitBtn');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.classList.add('hidden');
        successBox.classList.add('show');
      }, 900);
    }
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    form.reset();
    form.classList.remove('hidden');
    successBox.classList.remove('show');
    const btn = document.getElementById('submitBtn');
    btn.textContent = '📅 Book My Appointment';
    btn.disabled = false;
  });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
