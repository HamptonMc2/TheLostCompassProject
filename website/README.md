# The Lost Compass Project Website

Version 0.1 website for `thelostcompassproject.com`.

Draft Status: Human review required.

## Stack

- React
- Vite
- Tailwind CSS
- Cloudflare Pages compatible static build

## Install

```bash
npm install
```

## Run Dev

```bash
npm run dev
```

Vite will print a local preview URL, usually `http://localhost:5173/`.

## Build

```bash
npm run build
```

The production output is created in:

```bash
dist
```

## Content Structure

V0.1 is intentionally static. Do not add admin forms, accounts, memberships, forums, maps, donations, stores, or newsletter plumbing yet.

Current content is organized in:

```text
src/data/siteContent.js
```

The React components read from these data objects:

- navigation
- brand assets
- homepage sections
- page hero/copy blocks
- story and field-record cards
- conservation focus cards
- contact route cards

When an admin/content-entry system is added later, replace these data records with managed content for stories, field journal entries, conservation partner highlights, collections, and photos/images without changing the page layout components first.

## Cloudflare Pages Notes

Use these settings for Cloudflare Pages:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: website
Node version: 24 or current Cloudflare-supported LTS
```

The site uses hash-based navigation such as `#/our-story`, so it does not require special rewrite rules for V0.1.

## Asset Notes

The official source logo is:

```text
../assets/logos/The LostCompass Project Logo.png
```

Website-ready logo assets were generated from that source:

```text
public/assets/logos/compass-rose-transparent.png
public/assets/logos/compass-rose-transparent.webp
public/assets/logos/compass-rose-simple.svg
public/favicon.png
```

V0.1 now uses the provided image assets for the live homepage and cards:

```text
public/assets/images/hero-hiker-sunset.jpeg
public/assets/images/hikers-golden-ridge.jpeg
public/assets/images/vintage-compass-map.jpeg
public/assets/images/forest-trail.jpeg
public/assets/images/coastal-overlook.jpeg
public/assets/images/reef-restoration.jpeg
public/assets/images/trail-crew.jpeg
public/assets/images/field-notes.jpeg
public/assets/images/compass-rose-front-back.jpeg
public/assets/images/compass-rose-chest-mark.jpeg
public/assets/images/compass-rose-back-layout.jpeg
public/assets/images/compass-rose-back-shirt.jpeg
```

## Manual Review Needed

- Confirm transparent logo edge quality against final brand standards.
- Review all public copy before publishing.
