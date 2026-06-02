# Oluschi Harmon — Site Structure
## oluschi-harmon.com

---

## FOLDER STRUCTURE

```
oluschi-final/
│
├── index.html              ← Homepage (main entry point)
│
├── css/
│   ├── style.css           ← Global: tokens, header, nav, overlays, scrollbars
│   ├── home.css            ← Homepage: about/work/archive overlays, canvas, bg word
│   └── project.css         ← Project pages: folder peek, sticky left, image layouts
│
├── js/
│   └── main.js             ← All JS: overlays, archive cards, canvas, bg word
│
├── img/                    ← Homepage assets (copy from your server)
│   ├── site_card.gif
│   ├── lulu.png
│   ├── link_icon_b.png
│   ├── mail_icon_b.png
│   └── pin_icon_b.png
│
├── fashion/                ← Copy your existing fashion/ folder here
│   └── img/
│       ├── 8_ball.gif
│       ├── spot_stars.gif
│       ├── spot_d2.gif
│       ├── spot_coach.gif
│       ├── trust_fund.gif
│       ├── bumble_trope.jpg
│       └── bumble_wrulf.png
│
├── web/                    ← Copy your existing web/ folder here
│   └── img/
│       ├── TBA_Home.gif
│       ├── TBA_Collage.gif
│       ├── TBA_Journey_no.27.gif
│       ├── TBA_Reflect.gif
│       ├── TBA_DandP.jpg
│       └── archived_outfits.jpg
│
├── graphics/               ← Copy your existing graphics/ folder here
│   └── img/
│       ├── bn_256.gif
│       ├── cover_256.png
│       ├── mc_256.gif
│       └── 256_SavedImages.png
│
└── work/
    ├── ok-cool/
    │   └── index.html      ← TEMPLATE A: 2-col 9:16 (social work)
    ├── highsnobiety/
    │   └── index.html      ← TEMPLATE A: 2-col 9:16 (social work)
    ├── collina/
    │   └── index.html      ← TEMPLATE B: wide landscape (copy from template-b)
    ├── thesis/
    │   └── index.html      ← TEMPLATE B: wide landscape
    ├── ap0cene/
    │   └── index.html      ← TEMPLATE B: wide landscape
    └── web/
        └── index.html      ← TEMPLATE B: wide landscape
```

---

## WORK PAGE TYPES

### Template A — Social (9:16 vertical grid)
Use for: **Ok Cool**, **Highsnobiety**
Right column: 2-column grid of portrait 9:16 cells
File: `work/ok-cool/index.html`

### Template B — Web / Archive (wide landscape)
Use for: **Collina Strada**, **To Be Archived**, **Ap0cene**, **Web Projects**
Right column: wide landscape blocks + side-by-side pairs
File: `template-b-web.html` (copy into each work subfolder)

---

## FILL IN FOR EACH PROJECT PAGE

Each work page has bracketed placeholders `[ like this ]`:

- `[ Project Title ]` — project name
- `[ Subtitle ]` — role type or campaign name
- `[ 00 ] / 06` — project number
- `[ Type ]` — e.g. Motion + Graphic Design
- `[ Year ]` — e.g. 2024
- `[ Your role ]` — exact title
- `[ Client ]` — client name
- `[ Scope ]` — scope of work
- The world paragraph — your creative POV in your voice
- `[ Link to work ]` — Instagram, Vercel, etc.
- `[ # ]` — impact number (clients, reach, etc.)
- Impact label — what the number means
- Credits — studio, role, full scope

---

## MOBILE BREAKPOINTS

- **≤ 680px** — archive goes 2-col, about overlay stacks, work rows simplify
- **≤ 420px** — archive goes 1-col, photo column narrows
- Project pages: left column unsticks and stacks above the work on mobile

---

## DEPLOYMENT

1. Upload this entire folder to your server root
2. Your existing `fashion/`, `web/`, `graphics/` folders go at the same level as `index.html`
3. The `img/` folder needs: `site_card.gif`, `lulu.png`, and the three social icons
4. Open `index.html` in a browser — everything resolves from relative paths

