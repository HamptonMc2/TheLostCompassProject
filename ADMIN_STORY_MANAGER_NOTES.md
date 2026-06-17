# Admin Story Manager Notes

Draft Status: Human review required.

## Purpose

The Story Manager is a local draft admin for Stories From The Trail articles. It lets the user add, edit, save, delete, preview, and organize article drafts without manually editing code for every content change.

## Route

```text
#/admin/stories
```

Local URL:

```text
http://127.0.0.1:5173/#/admin/stories
```

## Current status

For V0.1, this is local draft admin only.

## What works

- Add new story
- Edit existing story
- Save story
- Save as draft
- Delete story with confirmation
- Preview story inline
- Draft / Human Review / Published status
- Article sections
- Gallery image paths
- Research notes
- Source notes
- Research-needed checklist

## Storage method

Browser localStorage.

Key:

```text
lostcompass_story_manager_v1
```

Default stories are stored in:

```text
website/src/data/stories.js
```

LocalStorage edits are browser-local and are not automatically written back to source files.

## How to add a story

1. Open `#/admin/stories`.
2. Click `Add New`.
3. Fill required fields.
4. Add article sections, gallery paths, research notes, source notes, and checklist items.
5. Click `Save Story` or `Save as Draft`.

## How to edit a story

1. Open `#/admin/stories`.
2. Find the story in the Story List panel.
3. Click `Edit`.
4. Change fields.
5. Click `Save Story`.

## How to save

Use:

- `Save Story` to save the current status.
- `Save as Draft` to force `Draft / Human Review Required`.

If saving fails, check the visible required-field message.

## How to preview

Click `Preview Story`. The preview renders inline from the current editor draft and does not require Published status.

## How to delete

Click `Delete` or `Delete Story`. Confirm the browser prompt before deletion. Default seed stories should be saved into localStorage before they can be removed from the local working list.

## How to add images

Do not upload through the editor in V0.1. Place story images manually in:

```text
website/public/assets/images/stories/[story-slug]/
```

Reference them in the editor as:

```text
/assets/images/stories/[story-slug]/filename.webp
```

## Image path convention

Example:

```text
/assets/images/stories/lost-cove-forgotten-mountain-town/lost-cove-trail.webp
```

## Known limitations

- Local-only browser storage
- No login/auth
- No file upload
- No backend database
- No multi-user editing
- Browser storage can be cleared
- Saved local drafts are not automatically committed to the repo

## Public deployment warning

This admin page is for local drafting only. Do not deploy publicly without authentication.

## Future CMS options

- JSON file import/export
- SQLite-backed local CMS
- Postgres-backed admin
- Headless CMS
- Authenticated custom admin
- Git-backed content publishing workflow
