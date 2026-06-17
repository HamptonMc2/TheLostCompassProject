# Codex Handoff — The LostCompass Project

Draft Status: Human review required.

## Project root path

```bash
/home/alchimedes/projects/TheLostCompassProject
```

## Website path

```bash
/home/alchimedes/projects/TheLostCompassProject/website
```

## How to run dev server

```bash
cd /home/alchimedes/projects/TheLostCompassProject/website
npm install
npm run dev
```

Expected local URL:

```text
http://127.0.0.1:5173/#/
```

Admin route:

```text
http://127.0.0.1:5173/#/admin/stories
```

## How to build

```bash
cd /home/alchimedes/projects/TheLostCompassProject/website
npm run build
```

## How to test basic routes

Open these routes in the browser:

- `http://127.0.0.1:5173/#/`
- `http://127.0.0.1:5173/#/our-story`
- `http://127.0.0.1:5173/#/stories`
- `http://127.0.0.1:5173/#/stories/lost-cove-forgotten-mountain-town`
- `http://127.0.0.1:5173/#/conservation`
- `http://127.0.0.1:5173/#/apparel`
- `http://127.0.0.1:5173/#/join`
- `http://127.0.0.1:5173/#/contact`
- `http://127.0.0.1:5173/#/admin/stories`

Basic shell check:

```bash
curl -I http://127.0.0.1:5173/
```

## Important files

- `website/src/App.jsx`
- `website/src/main.jsx`
- `website/src/styles.css`
- `website/src/components/Header.jsx`
- `website/src/components/Footer.jsx`
- `website/src/components/Logo.jsx`
- `website/src/components/Section.jsx`
- `website/src/components/Stories.jsx`
- `website/public/assets/`
- `website/FUTURE_ADMIN_NOTES.md`
- `website/README.md`
- `Brand/MANIFESTO.md`
- `Brand/BRAND_GUIDE.md`
- `Brand/WEBSITE_BRIEF.md`

## Important data files

- `website/src/data/siteContent.js`
- `website/src/data/stories.js`

## Important components

- `App.jsx` handles hash routing.
- `Header.jsx` handles navigation state.
- `Footer.jsx` contains footer and draft status language.
- `Logo.jsx` renders the brand mark.
- `Section.jsx` contains reusable section/hero/card components.
- `Stories.jsx` contains story cards, story detail rendering, and the local Story Manager admin.

## Current known routes

- `#/`
- `#/our-story`
- `#/stories`
- `#/stories/lost-cove-forgotten-mountain-town`
- `#/conservation`
- `#/apparel`
- `#/join`
- `#/contact`
- `#/collections/compass-rose-collection`
- `#/collections/mountain-and-sea-collection`
- `#/collections/trail-crew-collection`
- `#/products/compass-rose-backmark`
- `#/products/compass-rose-front-back`
- `#/products/compass-rose-mountain-sea-mark`
- `#/products/mountain-and-sea-series`
- `#/products/keep-it-wild-crew-gear`

## Current admin route

```text
#/admin/stories
```

The admin is local-only and must not be deployed publicly without authentication.

## Current localStorage behavior

Story Manager stores local draft data in browser localStorage under:

```text
lostcompass_story_manager_v1
```

Default story records come from:

```text
website/src/data/stories.js
```

LocalStorage records can override or add stories locally in the browser. This is not a real CMS or backend.

## What Codex is allowed to do

- Inspect files before editing.
- Add/update markdown documentation.
- Make focused website fixes when explicitly requested.
- Run `npm run build`.
- Run local route checks.
- Improve local admin UX when asked.
- Create draft-only content marked for human review.

## What Codex must ask before doing

- Installing new packages.
- Adding backend services.
- Changing deployment configuration.
- Adding authentication.
- Adding checkout/cart/payment.
- Changing public routes or Cloudflare settings.
- Removing files.
- Publishing content.

## Do-not-break list

- Home
- Our Story
- Stories From The Trail
- Story detail pages
- Conservation
- Apparel
- Join The Journey
- Contact
- Collection pages
- Product preview pages
- `#/admin/stories`
- No cart / no checkout / no payment status
- Draft status and human review warnings

## Final verification checklist

- `npm run build` passes.
- `#/` loads.
- `#/stories` loads.
- `#/stories/lost-cove-forgotten-mountain-town` loads.
- `#/admin/stories` loads.
- Story Manager typing does not lose focus.
- Save Story works when required fields are filled.
- Save as Draft works.
- Preview Story works inline.
- Delete confirms before deleting.
- Lost Cove remains `Draft / Human Review Required`.
- No secrets, credentials, tokens, or real personal identity information are added.
