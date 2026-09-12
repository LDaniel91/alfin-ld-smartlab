/* =========================================================
   ALFIN 2026 — JavaScript principal (v2)
   Autor: Luis Daniel Ramos Corona | LD SmartLab
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const key = (k) => `alfin2026:${k}`;
  const store = {
    get: (k, d = null) => { try { return JSON.parse(localStorage.getItem(key(k))) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem(key(k), JSON.stringify(v)); } catch {} }
  };

  /* ---------- Tema claro/oscuro ---------- */
  const THEME_KEY = 'theme';
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    const btn = $('#themeToggle');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  };
  const initTheme = () => {
    const saved = store.get(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  };
  initTheme();

  document.addEventListener('click', (e) => {
    const t = e.target.closest('#themeToggle');
    if (!t) return;
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.set(THEME_KEY, next);
  });

  /* ---------- Menú móvil ---------- */
  const nav = $('#mainNav');
  const toggle = $('#menuToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
    });
  }
  $$('.has-dropdown > a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Contador de visitas ---------- */
  const VISIT_KEY = 'visits';
  const SESSION_KEY = 'sessionCounted';
  const initCounter = () => {
    const el = $('#visitCount');
    if (!el) return;
    let visits = parseInt(store.get(VISIT_KEY, 0), 10) || 0;
    const counted = sessionStorage.getItem(key(SESSION_KEY));
    if (!counted) {
      visits += 1;
      store.set(VISIT_KEY, visits);
      sessionStorage.setItem(key(SESSION_KEY), '1');
    }
    el.textContent = visits.toLocaleString('es-ES');
  };
  initCounter();

  /* ---------- Likes / Dislikes ---------- */
  const PAGE_ID = document.body.dataset.page || location.pathname;
  const initVotes = () => {
    const likeBtn = $('#likeBtn'), dislikeBtn = $('#dislikeBtn');
    if (!likeBtn || !dislikeBtn) return;
    const likeCount = $('#likeCount'), dislikeCount = $('#dislikeCount');
    const render = () => {
      likeCount.textContent = store.get(`likes:${PAGE_ID}`, 0);
      dislikeCount.textContent = store.get(`dislikes:${PAGE_ID}`, 0);
      const uv = store.get(`userVote:${PAGE_ID}`, null);
      likeBtn.classList.toggle('liked', uv === 'like');
      dislikeBtn.classList.toggle('disliked', uv === 'dislike');
    };
    render();
    likeBtn.addEventListener('click', () => {
      const uv = store.get(`userVote:${PAGE_ID}`, null);
      let l = store.get(`likes:${PAGE_ID}`, 0), d = store.get(`dislikes:${PAGE_ID}`, 0);
      if (uv === 'like') { l = Math.max(0, l - 1); store.set(`userVote:${PAGE_ID}`, null); }
      else { if (uv === 'dislike') d = Math.max(0, d - 1); l += 1; store.set(`userVote:${PAGE_ID}`, 'like'); }
      store.set(`likes:${PAGE_ID}`, l); store.set(`dislikes:${PAGE_ID}`, d); render();
    });
    dislikeBtn.addEventListener('click', () => {
      const uv = store.get(`userVote:${PAGE_ID}`, null);
      let l = store.get(`likes:${PAGE_ID}`, 0), d = store.get(`dislikes:${PAGE_ID}`, 0);
      if (uv === 'dislike') { d = Math.max(0, d - 1); store.set(`userVote:${PAGE_ID}`, null); }
      else { if (uv === 'like') l = Math.max(0, l - 1); d += 1; store.set(`userVote:${PAGE_ID}`, 'dislike'); }
      store.set(`likes:${PAGE_ID}`, l); store.set(`dislikes:${PAGE_ID}`, d); render();
    });
  };
  initVotes();

  /* ---------- Comentarios vía mailto ---------- */
  const initComments = () => {
    const form = $('#commentForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = $('#cName', form).value.trim();
      const email   = $('#cEmail', form).value.trim();
      const message = $('#cMessage', form).value.trim();
      const page    = document.title;
      const subject = encodeURIComponent(`[ALFIN 2026] Comentario en: ${page}`);
      const body = `Nombre: ${name}%0D%0AEmail: ${email}%0D%0APágina: ${page}%0D%0A%0D%0AMensaje:%0D%0A${message}%0D%0A`;
      const to = 'ldsmartlabmipc@outlook.com,luisdanielramoscorona2010@gmail.com';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      const ok = $('#commentOk');
      if (ok) { ok.style.display = 'block'; setTimeout(() => ok.style.display = 'none', 5000); }
      form.reset();
    });
  };
  initComments();

  /* ---------- Descargar PDF ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="pdf"]');
    if (!btn) return;
    e.preventDefault();
    window.print();
  });

  /* ---------- Hero rotativo ---------- */
  const hero = $('.hero');
  if (hero) {
    const imgs = (hero.dataset.images || '').split(',').filter(Boolean);
    if (imgs.length > 1) {
      let i = 0;
      setInterval(() => {
        i = (i + 1) % imgs.length;
        hero.style.setProperty('--hero-img', `url('${imgs[i]}')`);
      }, 6000);
    }
  }

  /* ---------- Año dinámico ---------- */
  $$('.current-year').forEach(el => el.textContent = new Date().getFullYear());

  /* =========================================================
     GALERÍA — filtros y lightbox
     ========================================================= */
  const initGallery = () => {
    const tabs = $$('.gallery-tab');
    const items = $$('.gallery-item');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.type === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });

    // Lightbox
    const lightbox = $('#lightbox');
    const lbContent = $('#lightboxContent');
    const lbCaption = $('#lightboxCaption');
    const lbClose = $('#lightboxClose');
    if (!lightbox) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        const src = item.dataset.src;
        const title = item.dataset.title || '';
        const desc = item.dataset.desc || '';
        lbContent.innerHTML = '';
        if (type === 'video') {
          const v = document.createElement('video');
          v.src = src; v.controls = true; v.autoplay = true;
          v.style.maxWidth = '90vw'; v.style.maxHeight = '85vh';
          lbContent.appendChild(v);
        } else {
          const img = document.createElement('img');
          img.src = src; img.alt = title;
          lbContent.appendChild(img);
        }
        lbCaption.textContent = title + (desc ? ` — ${desc}` : '');
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => {
      lightbox.classList.remove('open');
      lbContent.innerHTML = '';
      document.body.style.overflow = '';
    };
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  };
  initGallery();

  /* ---------- Fallback para imágenes que no cargan ---------- */
  $$('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent && !parent.querySelector('.img-fallback')) {
        const div = document.createElement('div');
        div.className = 'img-fallback';
        div.style.cssText = 'width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,var(--c-primary),var(--c-primary-2));color:#fff;font-size:2rem;';
        div.textContent = '📷';
        parent.appendChild(div);
      }
    });
  });

})();