/* ============================================================
   OLUSCHI HARMON — Homepage JS
   js/main.js
   ============================================================ */

/* ── OVERLAY NAV ── */
const overlayIds = ['about-overlay', 'work-overlay', 'archive-overlay'];
const tabIds     = ['tab-about', 'tab-work', 'tab-archive'];
const scrim      = document.getElementById('overlay-scrim');
const TRANSITION_MS = 320; // matches CSS transform duration

function openOverlay(o, t) {
  document.getElementById(o).classList.add('open');
  document.getElementById(t).classList.add('active');
  if (scrim) scrim.classList.add('visible');
}

function toggleOverlay(o, t) {
  const isOpen = document.getElementById(o).classList.contains('open');
  const currentId = overlayIds.find(id => document.getElementById(id).classList.contains('open'));

  if (isOpen) {
    closeAll();
    return;
  }

  if (currentId) {
    // close current, wait for it to animate out, then open new
    closeAll();
    setTimeout(() => openOverlay(o, t), TRANSITION_MS);
  } else {
    openOverlay(o, t);
  }
}

function closeOverlay(o, t) {
  document.getElementById(o).classList.remove('open');
  if (t) document.getElementById(t).classList.remove('active');
  if (!document.querySelector('.overlay.open') && scrim) scrim.classList.remove('visible');
}

function closeAll() {
  overlayIds.forEach(o => document.getElementById(o).classList.remove('open'));
  tabIds.forEach(t => document.getElementById(t).classList.remove('active'));
  if (scrim) scrim.classList.remove('visible');
  closeProject();
}

// open overlay if page was reached via a hash link from a project page
(function () {
  const map = { '#about': ['about-overlay','tab-about'], '#work': ['work-overlay','tab-work'], '#archive': ['archive-overlay','tab-archive'] };
  const entry = map[location.hash];
  if (entry) openOverlay(entry[0], entry[1]);
})();

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
if (scrim) scrim.addEventListener('click', closeAll);

/* ── WORK GIF PREVIEW ── */
const preview = document.getElementById('work-preview-img');
if (preview) {
  document.querySelectorAll('.work-row[data-preview]').forEach(row => {
    row.addEventListener('mouseenter', () => {
      preview.src = row.dataset.preview;
      preview.style.aspectRatio = row.dataset.ratio || 'auto';
      preview.classList.add('show');
    });
    row.addEventListener('mousemove', e => { preview.style.left = (e.clientX + 20) + 'px'; preview.style.top = (e.clientY - 64) + 'px'; });
    row.addEventListener('mouseleave', () => preview.classList.remove('show'));
  });
}

/* ── ARCHIVE PROJECT DETAIL ── */
const projects = [
  {
    label: 'Pinterest x e.l.f. Cosmetics Zine',
    title: 'Pinterest x e.l.f. Cosmetics Zine',
    sub: 'Visual & digital design · 2025–Present',
    body: 'Brought to life — from concepting to production — the look and feel of Pinterest\'s first digital zine with e.l.f. Cosmetics.',
    imgs: [
      'work/pinterest/img/zine_1.gif',
      'work/pinterest/img/zine_2.gif',
      'work/pinterest/img/pin_zine.gif'
    ]
  },
  {
    label: 'To Be Archived',
    title: 'To Be Archived — Thesis',
    sub: 'Web + Book Design · 2023',
    body: 'A mixed media archive capturing personal style over 30 days — divided into a website and a physical journal, each acting as an interactive guide through the evolution of fashion styling.',
    imgs: [
      'work/thesis/Final_Poster.gif',
      'work/thesis/tba_pics.gif',
      'work/thesis/scan_sketch_3.png',
      'work/thesis/TBA_Home.gif',
      'work/thesis/archived_outfits.jpg'
    ]
  },
  {
    label: '256 Book',
    title: '256 Book',
    sub: 'Book Design · 2022',
    body: 'A book inspired by the aesthetics of Instagram saved folders. Random images, photos, and moments collected across a phone — reframed as a physical archive.',
    imgs: [
      'work/256/256_SavedImages.png',
      'work/256/bn_256.gif',
      'work/256/cover_256.png',
      'work/256/mc_256.gif'
    ]
  },
  {
    label: 'Al-Majles',
    title: 'Al-Majles',
    sub: 'Experimental Design · 2023',
    body: 'The essence of the psychology of Arabian men through the stylization of late 90s editing.',
    imgs: [
      'work/almajles/img/Al_Majles_motion.gif',
      'work/almajles/img/Shirt_mockup.png',
      'work/almajles/img/flyingcards_Album.png',
      'work/almajles/img/Al_Majles.gif'
    ]
  },
  {
    label: 'Ap0cene',
    title: 'Ap0cene — Social Media',
    sub: 'Social Media Design · 2022–23',
    body: 'Visual and digital design across platforms for Ap0cene. Social-first creative assets with a strong editorial point of view.',
    imgs: [
      'work/ap0cene/img/GiftGuide_Ap0cene.gif',
      'work/ap0cene/img/shyfck_Graphics_blush.gif',
      'work/ap0cene/img/aephotika_1.JPG',
      'work/ap0cene/img/aephotika_2.JPG',
      'work/ap0cene/img/aephotika_3.JPG',
      'work/ap0cene/img/SF_SalePost.png'
    ]
  },
  {
    label: 'Taking Up Space',
    title: 'Manifesto Posters — Taking Up Space',
    sub: 'Typography · 2021',
    body: 'A series of manifesto posters exploring space, type, and presence.',
    imgs: [
      'work/tus/tus_posters.png',
      'work/tus/mp_folded.png',
      'work/tus/tup_poster2.png'
    ]
  }
];

function openProject(idx) {
  const p = projects[idx];
  document.getElementById('detail-label').textContent = p.label;
  document.getElementById('detail-title').textContent = p.title;
  document.getElementById('detail-sub').textContent   = p.sub;
  document.getElementById('detail-body').textContent  = p.body;
  const strip = document.getElementById('detail-strip');
  strip.innerHTML = '';
  p.imgs.forEach(src => {
    const img = document.createElement('img');
    img.src = src; img.alt = p.title;
    strip.appendChild(img);
  });
  document.getElementById('project-detail').classList.add('open');
}

function closeProject() {
  const el = document.getElementById('project-detail');
  if (el) el.classList.remove('open');
}

/* ── BG WORD ── */
const words = ['archiving.', 'making.', 'directing.', 'collecting.', 'storytelling.', 'curating.'];
let wi = 0;
const bgWord = document.getElementById('bg-word');
if (bgWord) {
  setInterval(() => {
    bgWord.style.opacity = '0';
    setTimeout(() => { wi = (wi + 1) % words.length; bgWord.textContent = words[wi]; bgWord.style.opacity = '1'; }, 1200);
  }, 4000);
}
