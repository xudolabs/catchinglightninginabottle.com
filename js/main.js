// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form submission to Google Sheets
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = document.getElementById('submit-btn');
      var status = document.getElementById('form-status');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.style.display = 'none';

      var payload = new FormData();
      payload.append('name', document.getElementById('name').value);
      payload.append('email', document.getElementById('email').value);
      payload.append('subject', document.getElementById('subject').value);
      payload.append('message', document.getElementById('message').value);

      fetch('https://script.google.com/macros/s/AKfycbzalPG2j5z_H1E-DcgZuqGOGeSWXXHtQiL0lp3HyRA-ds0JtAejkRQAVau8kr7qK7J2/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      })
      .then(function () {
        status.textContent = 'Thank you! Your message has been sent.';
        status.style.color = '#22c55e';
        status.style.display = 'block';
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
        status.style.color = '#ef4444';
        status.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Message';
      });
    });
  }
});
