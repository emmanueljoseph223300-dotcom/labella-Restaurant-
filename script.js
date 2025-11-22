document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const idx = Number(el.dataset.index) || 0;
        el.style.transitionDelay = `${idx * 100}ms`;
        el.classList.add('in-view');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => io.observe(card));
});

// Contact form handling (client-side only)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) { status.textContent = 'Please enter your name.'; form.name.focus(); return; }
    if (!email || !validateEmail(email)) { status.textContent = 'Please enter a valid email.'; form.email.focus(); return; }
    if (!message) { status.textContent = 'Please enter a message.'; form.message.focus(); return; }

    // simulate sending
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulated async send (replace with real endpoint POST in production)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      form.reset();
      status.textContent = 'Thanks — your message was sent. We will reply soon.';
      status.style.color = 'var(--accent-600)';
    }, 900);
  });
});

  // Mobile menu toggle: open/close, aria updates, ESC and outside click
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menu-toggle');
    const header = document.querySelector('.site-header');
    const nav = document.getElementById('main-nav');
    if (!toggle || !header || !nav) return;

    function openMenu() {
      header.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('no-scroll');
      // move focus into the first link
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      header.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('no-scroll');
      toggle.focus();
    }

    toggle.addEventListener('click', function (e) {
      const open = header.classList.contains('open');
      if (open) closeMenu(); else openMenu();
    });

    // Close the menu when a navigation link is clicked (useful for single-page anchors)
    const navLinks = Array.from(nav.querySelectorAll('a'));
    navLinks.forEach(link => {
      link.addEventListener('click', function (ev) {
        // allow normal navigation to happen, but close the menu immediately
        if (header.classList.contains('open')) {
          closeMenu();
        }
      });
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (header.classList.contains('open')) closeMenu();
      }
    });

    // Close when clicking outside the nav while open
    document.addEventListener('click', function (e) {
      if (!header.classList.contains('open')) return;
      const withinNav = nav.contains(e.target) || toggle.contains(e.target);
      if (!withinNav) closeMenu();
    });
  });
