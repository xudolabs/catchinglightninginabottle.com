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

      var params = new URLSearchParams();
      params.append('name', document.getElementById('name').value);
      params.append('email', document.getElementById('email').value);
      params.append('subject', document.getElementById('subject').value);
      params.append('message', document.getElementById('message').value);

      var scriptUrl = 'https://script.google.com/macros/s/AKfycbzHimoAixRcfqZQxg8ItZFGp29IWUn5jWg9WY2HULwy4ZeouMVRx_qhLABJV40QRcnt/exec';

      fetch(scriptUrl + '?' + params.toString(), {
        method: 'GET',
        mode: 'no-cors'
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

  // Toolkit email signup
  var toolkitForm = document.getElementById('toolkit-form');
  if (toolkitForm) {
    toolkitForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = document.getElementById('toolkit-btn');
      var status = document.getElementById('toolkit-status');
      var emailInput = document.getElementById('toolkit-email');
      btn.disabled = true;
      btn.textContent = 'Unlocking...';
      status.style.display = 'none';

      var params = new URLSearchParams();
      params.append('form', 'toolkit');
      params.append('email', emailInput.value);

      var scriptUrl = 'https://script.google.com/macros/s/AKfycbzHimoAixRcfqZQxg8ItZFGp29IWUn5jWg9WY2HULwy4ZeouMVRx_qhLABJV40QRcnt/exec';

      fetch(scriptUrl + '?' + params.toString(), {
        method: 'GET',
        mode: 'no-cors'
      })
      .then(function () {
        status.textContent = 'Access granted! Download links are now unlocked below.';
        status.style.color = '#22c55e';
        status.style.display = 'block';
        btn.textContent = 'Unlocked!';

        // Unlock download buttons
        document.querySelectorAll('.toolkit-download').forEach(function (link) {
          link.style.pointerEvents = 'auto';
          link.style.opacity = '1';
          link.textContent = 'Download';
        });
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
        status.style.color = '#ef4444';
        status.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Get Access';
      });
    });
  }
});
