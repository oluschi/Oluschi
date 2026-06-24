/* ============================================================
   OLUSCHI HARMON V2 — Main JS
   js/main.js
   ============================================================ */

/* ── STATE ── */
let activePanel = null;

const panels = {
  about:   document.getElementById('about-panel'),
  work:    document.getElementById('work-panel'),
  archive: document.getElementById('archive-panel'),
};

const navBtns = {
  about:   document.getElementById('nav-about'),
  work:    document.getElementById('nav-work'),
  archive: document.getElementById('nav-archive'),
};

/* ── PANEL OPEN / CLOSE ── */
function openPanel(name) {
  if (projectOpen) closeProject();          // a panel choice always drops the project layer
  if (activePanel && activePanel !== name) {
    closePanel(activePanel, false);
  }
  if (activePanel === name) {        // clicking the active item closes it
    closePanel(name);
    return;
  }
  panels[name].classList.add('open');
  navBtns[name].classList.add('active');
  document.body.classList.add('panel-open');
  activePanel = name;
  document.body.classList.toggle('about-active', name === 'about');
}

function closePanel(name, clearState = true) {
  if (!panels[name]) return;
  panels[name].classList.remove('open');
  navBtns[name].classList.remove('active');
  if (clearState) {
    document.body.classList.remove('panel-open');
    document.body.classList.remove('about-active');
    activePanel = null;
  }
}

function closeAll() {
  closeProject();
  Object.keys(panels).forEach(name => closePanel(name, false));
  document.body.classList.remove('panel-open');
  document.body.classList.remove('about-active');
  activePanel = null;
}

/* ── PROJECT LAYER — slides a fetched project page up over the Work list ── */
const projectLayer = document.getElementById('project-layer');
const projectBody  = projectLayer.querySelector('.project-layer-body');
const projectClose = projectLayer.querySelector('.project-layer-close');
let projectOpen = false;

async function openProject(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('fetch failed');
    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, 'text/html');
    const main = doc.querySelector('.project-standalone');
    if (!main) throw new Error('no project content');

    /* resolve the project's relative img/href paths against its own location */
    const base = new URL(url, location.href);
    main.querySelectorAll('img[src]').forEach(img => {
      img.setAttribute('src', new URL(img.getAttribute('src'), base).href);
    });
    main.querySelectorAll('a[href]').forEach(a => {
      a.setAttribute('href', new URL(a.getAttribute('href'), base).href);
    });

    projectBody.replaceChildren(main);
    projectBody.scrollTop = 0;
    projectLayer.classList.add('open');
    projectLayer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('project-open');
    projectOpen = true;
  } catch (e) {
    location.href = url;          // graceful fallback → the standalone page
  }
}

function closeProject() {
  if (!projectOpen) return;
  projectLayer.classList.remove('open');
  projectLayer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('project-open');
  projectOpen = false;
}

projectClose.addEventListener('click', closeProject);

/* intercept work-item clicks → open the slide-up layer instead of navigating */
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openProject(item.getAttribute('href'));
  });
});

/* clicks inside the layer: prev/next swap content, panel links return home,
   external/source links open normally */
projectBody.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;
  if (a.target === '_blank') return;                         // source links
  const href = a.getAttribute('href') || '';
  if (/^https?:\/\//.test(href) && !href.includes('/work/')) return;
  if (href.includes('/work/') && href.includes('index.html')) {   // prev / next
    e.preventDefault();
    openProject(href);
    return;
  }
  const hashMatch = href.match(/index\.html#(\w+)/);          // back to a panel
  if (hashMatch) {
    e.preventDefault();
    closeProject();
    if (panels[hashMatch[1]]) openPanel(hashMatch[1]);
  }
});

/* ── NAV BUTTONS ── */
navBtns.about.addEventListener('click',   () => openPanel('about'));
navBtns.work.addEventListener('click',    () => openPanel('work'));
navBtns.archive.addEventListener('click', () => openPanel('archive'));

/* ── FOLDER TABS (the peeking tongues) open their panel ── */
document.querySelectorAll('.panel-tab').forEach(tab => {
  tab.addEventListener('click', () => openPanel(tab.dataset.panel));
});

/* ── ESC TO CLOSE ── (project layer first, then any open panel) ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (projectOpen) { closeProject(); return; }
  closeAll();
});

/* ── OPEN A PANEL FROM URL HASH (returning from a project sub-page) ── */
(function () {
  const h = (location.hash || '').replace('#', '');
  if (panels[h]) openPanel(h);
})();
