# Full Project Memory — The LostCompass Project

Draft Status: Human review required.

## Project identity

The LostCompass Project is an early-stage outdoor storytelling, local-history, and apparel-preview project.

## Brand name

The LostCompass Project

## Public-facing language rules

- Do not use the user's real name in public-facing LostCompass content.
- Use brand/project language or a handle/pseudonym if needed.
- Do not write as if the project is already a large movement, nonprofit, or proven conservation organization.
- Do not make unsupported donation claims.
- Do not claim conservation impact numbers unless verified.

## Tagline

Find Your Way. Explore More. Leave It Wild.

## Tone

Outdoor, premium, field-journal, Appalachian, respectful, clean, not corporate, not fake movement language.

## Visual style

Dark outdoor look with gold/teal compass accents, field-journal atmosphere, premium adventure brand feel, and readable article layouts.

## Mission direction

The project begins with exploration, local history, stories from the trail, and respect for wild places. Conservation language should remain honest and early-stage.

## What the project is

- A brand website
- A field-journal style story platform
- A Forgotten Places / local history direction
- A preview catalog for future apparel
- A local drafting workspace for stories

## What the project is not yet

- Not a public CMS
- Not a launched nonprofit
- Not a proven conservation organization
- Not an ecommerce store
- Not a checkout/payment system
- Not a public admin dashboard

## Apparel direction

Current apparel is preview-only.

Use:

- Coming Soon
- Future apparel drops are intended to support the mission
- Future store URL placeholder

Do not add:

- Checkout
- Cart
- Payment
- Unsupported sales or donation claims

Current collections:

- Compass Rose Collection
- Mountain & Sea Collection
- Trail Crew Collection / Official Crew Gear

## Conservation direction

Use honest early-stage language:

- "being built"
- "the goal is"
- "future apparel drops are intended to"
- "this project begins with"

Avoid:

- "we are a movement"
- "our community has"
- "we have already changed"
- unsupported donation claims
- unsupported conservation impact numbers

## Story/content direction

- Stories From The Trail
- Forgotten Places
- Local history
- Field notes
- Conservation stories
- Respectful exploration
- Leave It Wild notes

Lost Cove is the first major story draft.

## Admin/editor direction

The Story Manager is a local draft admin for V0.1. It exists to help add, edit, save, delete, preview, and organize stories without manually editing code for every draft.

It must not be deployed publicly without authentication.

## Current technical architecture

- Vite
- React
- Hash routing
- Tailwind styling
- Local data files
- Browser localStorage for Story Manager drafts
- Manual image path entry

## Current content structure

- `website/src/data/siteContent.js` contains main website content and apparel collection data.
- `website/src/data/stories.js` contains default story data and Story Manager storage helpers.
- `website/src/components/Stories.jsx` renders story listings, story detail pages, and the local Story Manager.

## Current apparel collections

- Compass Rose Collection
- Mountain & Sea Collection
- Trail Crew Collection / Official Crew Gear

## Current product preview behavior

Products are preview pages only. They show Coming Soon status and future store URL placeholders. There is no cart, checkout, payment, or active store link.

## Current Story Manager behavior

Route:

```text
#/admin/stories
```

Storage:

```text
lostcompass_story_manager_v1
```

The Story Manager supports:

- Add story
- Edit story
- Save story
- Save as draft
- Delete story with confirmation
- Preview current draft inline
- Story status
- Article sections
- Gallery image paths
- Research notes
- Source notes
- Research-needed checklist

## Lost Cove article direction

Working title:

Lost Cove: The Forgotten Mountain Town Between Tennessee and North Carolina

Category:

Forgotten Places / Local History / Trail Stories

Status:

Draft / Human Review Required

Rules:

- Must be researched before publishing.
- Do not invent exact dates, population numbers, railroad details, property details, or abandonment causes without verified sources.
- Include a Leave It Wild respect note.
- Add source links and image credits before public release.

## Language to avoid

- "We are a movement"
- "Our community has already..."
- "We have changed..."
- "Proceeds support..." unless store and support structure are verified
- "Donations go to..." unless legally and operationally true
- Exact historical claims without sources

## Language to prefer

- "being built"
- "the goal is"
- "future apparel drops are intended to"
- "this project begins with"
- "draft framework"
- "human review required"
- "research needed"
- "Leave It Wild"
- "Adventure With Purpose" when used carefully

## Future expansion ideas

- JSON import/export for stories
- Story backup button
- Authenticated admin
- Real backend CMS
- Image upload workflow
- Notify Me / Join the Journey signup
- Conservation tracker placeholder
- Store integration after policies and fulfillment are ready

## Current reality check

This is a strong V0.1 brand and local draft system. It is not ready for public admin deployment, final historical publication, or ecommerce launch. The next real value comes from browser testing, researched content, verified images, and careful public-language review.
