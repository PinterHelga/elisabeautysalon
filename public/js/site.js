(function(){
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero: lépcsőzetes belépés, ha a betűk megjöttek (max. 900 ms várakozás) */
  var started = false;
  function start(){ if(started) return; started = true; requestAnimationFrame(function(){ requestAnimationFrame(function(){ document.body.classList.add('loaded'); }); }); }
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(start); }
  setTimeout(start, 600);

  /* Fejléc: görgetésre zsugorodik és elmosott hátteret kap */
  var header = document.querySelector('.site-header');
  var ticking = false;
  function onScroll(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){ header.classList.toggle('is-scrolled', window.scrollY > 24); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();

  /* Mobil menü */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobilmenu');
  function setMenu(open){
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    if(open){ var f = menu.querySelector('a'); setTimeout(function(){ f && f.focus(); }, 120); }
  }
  toggle.addEventListener('click', function(){ setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function(e){ if(e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menu.classList.contains('is-open')){ setMenu(false); toggle.focus(); }
    if(e.key === 'Tab' && menu.classList.contains('is-open')){
      var items = [].slice.call(menu.querySelectorAll('a')).concat([toggle]);
      var first = items[0], last = items[items.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize', function(){ if(window.innerWidth > 960 && menu.classList.contains('is-open')) setMenu(false); });

  /* Számok felszámolása (requestAnimationFrame) */
  function countUp(el){
    var target = parseInt(el.getAttribute('data-count'), 10), suffix = el.getAttribute('data-suffix') || '';
    if(reduce){ el.textContent = target + suffix; return; }
    var dur = 2200, t0 = null;
    function frame(t){
      if(!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if(p < 1) requestAnimationFrame(frame);
    }
    el.textContent = '0';
    requestAnimationFrame(frame);
  }

  /* Scroll-reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && !reduce){
    /* az iris- és unveil-elem a clip-path miatt induláskor láthatatlan, ezért egy helyettesítő elemet figyelünk a helyén */
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ (en.target._reveal || en.target).classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin:'0px 0px -12% 0px', threshold:0.12 });
    revealEls.forEach(function(el){
      if(el.dataset.reveal === 'iris' || el.dataset.reveal === 'unveil'){
        var proxy = document.createElement('span');
        proxy.style.cssText = 'position:absolute;pointer-events:none;visibility:hidden;';
        proxy.style.left = el.offsetLeft + 'px'; proxy.style.top = el.offsetTop + 'px';
        proxy.style.width = el.offsetWidth + 'px'; proxy.style.height = el.offsetHeight + 'px';
        proxy._reveal = el;
        if(getComputedStyle(el.offsetParent || document.body).position === 'static' && el.offsetParent) el.offsetParent.style.position = 'relative';
        (el.offsetParent || document.body).appendChild(proxy);
        io.observe(proxy);
      } else io.observe(el);
    });

    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ countUp(en.target); cio.unobserve(en.target); } });
    }, { threshold:0.6 });
    counters.forEach(function(el){ el.textContent = '0'; cio.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* GYIK: egyszerre egy nyitott kérdés */
  var qs = document.querySelectorAll('.faq-q');
  qs.forEach(function(btn){
    btn.addEventListener('click', function(){
      var open = btn.getAttribute('aria-expanded') === 'true';
      qs.forEach(function(o){ o.setAttribute('aria-expanded','false'); o.closest('.faq-item').classList.remove('is-open'); });
      if(!open){ btn.setAttribute('aria-expanded','true'); btn.closest('.faq-item').classList.add('is-open'); }
    });
  });

  /* Űrlapok: beküldés a Netlify Formsnak (URL-kódolt POST a gyökérre), siker után köszönő doboz */
  document.querySelectorAll('[data-form-wrap] form').forEach(function(form){
    var btn = form.querySelector('[type="submit"]');
    var btnText = btn.textContent;
    var err = document.createElement('p');
    err.className = 'form-error';
    err.setAttribute('role', 'alert');
    err.hidden = true;
    err.innerHTML = 'Az üzenet most nem ment el. Kérlek, próbáld újra pár perc múlva, vagy hívj: <a href="tel:+36203449272">+36&nbsp;20&nbsp;344&nbsp;9272</a>.';
    form.appendChild(err);

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      err.hidden = true;
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Küldés…';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function(res){
        if(!res.ok) throw new Error('HTTP ' + res.status);
        var wrap = form.closest('[data-form-wrap]');
        var done = wrap.querySelector('.form-done');
        done.querySelector('p').textContent = form.getAttribute('data-msg');
        wrap.classList.add('is-sent');
        done.setAttribute('tabindex','-1'); done.focus({ preventScroll:true });
      }).catch(function(){
        err.hidden = false;
      }).then(function(){
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.textContent = btnText;
      });
    });
  });
})();

/* Csomag-gombok: az időpontkérő üzenetébe beírja a választott csomagot */
document.querySelectorAll('[data-prefill]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var field = document.getElementById('ik-uzenet');
    if(field){ field.value = btn.getAttribute('data-prefill'); }
  });
});
