(function () {
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.link').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  var form = document.querySelector('form.msg');
  if (form) {
    var status = form.querySelector('.status');
    var send = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'status';
      status.textContent = form.dataset.sending;
      send.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad');
          form.reset();
          status.className = 'status ok';
          status.textContent = form.dataset.ok;
        })
        .catch(function () {
          status.className = 'status err';
          status.textContent = form.dataset.err;
        })
        .finally(function () { send.disabled = false; });
    });
  }
})();
