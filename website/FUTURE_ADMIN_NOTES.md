# Future Admin Notes

Draft Status: Human review required.

The Lost Compass Project website must remain static for V0.1.

Do not add admin forms, user accounts, authentication, databases, backend APIs, memberships, forums, maps, stores, donations, or newsletter plumbing in V0.1.

## Future Content-Entry System

Later versions may need an admin/content-entry system for:

- Stories
- Field journal entries
- Conservation partner highlights
- Shirt/product collections
- Photos/images

Do not build this now.

## Current Structure

Content is currently organized in reusable static data files and rendered by reusable layout components.

Primary content file:

```text
src/data/siteContent.js
```

Reusable component areas:

```text
src/components/Header.jsx
src/components/Footer.jsx
src/components/Logo.jsx
src/components/Section.jsx
```

Main page composition:

```text
src/App.jsx
```

## Future Implementation Direction

When the admin/content-entry system is added later, it should replace or feed the existing data records first, rather than requiring a page redesign.

Recommended future content model areas:

- Navigation labels and paths
- Brand assets
- Homepage section copy
- Page hero/copy blocks
- Story cards and full story entries
- Field journal entries
- Conservation focus cards
- Conservation partner highlights
- Shirt/product collection records
- Photo/image records with alt text and captions

Keep presentation components separate from content storage so future forms can manage content without rewriting the layout.

## Future Conservation Impact Metrics

Future conservation impact metrics may include:

- Projects Supported
- Organizations Highlighted
- Volunteer Hours Shared
- Funds Directed To Partners

Do not display these metrics publicly until real numbers exist.
