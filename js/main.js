(function () {
  'use strict';

  // ---- Mobile menu ----
  var menu = document.querySelector('[data-mobile-menu]');
  var openBtns = document.querySelectorAll('[data-menu-open]');
  var closeBtns = document.querySelectorAll('[data-menu-close]');

  function openMenu() {
    if (menu) menu.classList.add('is-open');
  }
  function closeMenu() {
    if (menu) menu.classList.remove('is-open');
  }
  openBtns.forEach(function (btn) { btn.addEventListener('click', openMenu); });
  closeBtns.forEach(function (el) { el.addEventListener('click', closeMenu); });

  // ---- Header shadow on scroll ----
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Scroll reveal ----
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems = document.querySelectorAll('[data-reveal], [data-reveal-line]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    revealItems.forEach(function (el) { observer.observe(el); });

    // Safety net: nothing stays hidden forever.
    setTimeout(function () {
      revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    }, 6000);
  }

  // ---- Contact form (Formspree) ----
  var form = document.querySelector('[data-contact-form]');
  var successBox = document.querySelector('[data-form-success]');
  var errorBox = document.querySelector('[data-form-error]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            if (successBox) successBox.hidden = false;
          } else {
            throw new Error('submit failed');
          }
        })
        .catch(function () {
          if (errorBox) errorBox.hidden = false;
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
