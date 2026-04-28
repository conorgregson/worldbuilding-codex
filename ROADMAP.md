# Worldbuilding Codex Roadmap

Worldbuilding Codex is a full-stack lore management app for building fictional worlds through structured entities, relationships, and timeline events.

This roadmap tracks the project from its first stable portfolio release into future product-focused improvements.

---

## Goals

- Make fictional worlds easier to organize, browse, and maintain.
- Turn scattered lore notes into structured, connected data.
- Support writers, game masters, worldbuilders, and lore-heavy creators.
- Keep the app stable, demo-ready, and portfolio-friendly.
- Expand gradually from core CRUD workflows into search, visualization, import/export, and sharing.

---

## ✅ v1.0.0 — Stable Portfolio Release

**Status:** In progress  
**Planned:** April 2026

### Goal

Finalize Worldbuilding Codex as a stable public portfolio release with the core lore-management workflow complete, deployed, documented, and verified.

### Scope

- [ ] Confirm live frontend loads successfully
  - **AC:** The deployed Vercel app opens without console-blocking errors.
- [ ] Confirm backend health endpoint is reachable
  - **AC:** Render `/health` or equivalent health route returns a successful response.
- [ ] Confirm authentication works in production
  - **AC:** Users can register, log in, stay authenticated, and log out on the hosted app.
- [ ] Confirm protected routing works
  - **AC:** Auth-only pages are protected and route correctly after login/logout.
- [ ] Confirm worlds CRUD works
  - **AC:** Users can create, view, edit, and delete worlds.
- [ ] Confirm entities CRUD works
  - **AC:** Users can create, view, edit, and delete entities inside a world.
- [ ] Confirm relationship workflow works
  - **AC:** Users can create, view, and delete typed relationships between entities in the same world.
- [ ] Confirm timeline workflow works
  - **AC:** Users can create, view, edit, and delete timeline events.
- [ ] Confirm event participants work
  - **AC:** Users can attach entities to events with optional role labels.
- [ ] Confirm route refresh behavior works
  - **AC:** Refreshing hosted client routes such as `/worlds` does not produce a 404.
- [ ] Resolve favicon issue or remove unused favicon reference
  - **AC:** The hosted app no longer shows a missing favicon request unless intentionally deferred.
- [ ] Review README for v1.0 positioning
  - **AC:** README presents the app as a stable full-stack portfolio project with clear features, setup, deployment, screenshots, and roadmap.
- [ ] Update changelog for v1.0.0
  - **AC:** `CHANGELOG.md` includes a stable portfolio release entry.
- [ ] Create GitHub release notes
  - **AC:** Release notes summarize highlights, core workflows, deployment status, and future roadmap.
- [ ] Tag release as `v1.0.0`
  - **AC:** GitHub has a `v1.0.0` release/tag after final verification.

### Notes

v1.0.0 should not introduce a major new feature. It should promote the existing complete, deployed, and documented core workflow into the first stable public release.

---

## 👨🏻‍💻 v1.1.0 — Entity Search & Filtering

**Status:** Planned  
**Planned:** After v1.0.0

### Goal

Make large fictional worlds easier to browse by adding search, filtering, sorting, and stronger empty states to the entity list.

### Scope

- [ ] Add entity search
  - **AC:** Users can search by name, summary, description, notes, and tags.
- [ ] Add type filtering
  - **AC:** Users can filter entities by character, location, faction, species, artifact, culture, and other supported types.
- [ ] Add tag filtering
  - **AC:** Users can filter entities by one or more tags.
- [ ] Add sorting controls
  - **AC:** Users can sort alphabetically, by entity type, or by recently updated.
- [ ] Add no-results empty state
  - **AC:** Empty search/filter results explain what happened and offer a clear reset option.
- [ ] Preserve search/filter state during world browsing
  - **AC:** Search and filter choices do not reset unnecessarily while navigating within the world detail flow.

---

## 🚀 v1.2.0 — Timeline Explorer

**Status:** Planned

### Goal

Turn existing event tracking into a dedicated timeline browsing experience.

### Scope

- [ ] Add dedicated world timeline route
  - **AC:** Users can open a focused timeline page for a world.
- [ ] Improve chronological event layout
  - **AC:** Events are ordered by sort year, sort index, and date label where available.
- [ ] Add event search/filter controls
  - **AC:** Users can search timeline events by title, summary, description, and participants.
- [ ] Add participant visibility
  - **AC:** Timeline events clearly show attached entities and role labels.
- [ ] Add timeline empty states
  - **AC:** Empty and filtered timeline states are clear and actionable.

---

## 🌐 v1.3.0 — Relationship Graph

**Status:** Planned

### Goal

Add a visual graph view that helps users explore connected lore through entity relationships.

### Scope

- [ ] Add relationship graph page or section
  - **AC:** Entities render as nodes and relationships render as directional edges.
- [ ] Support graph navigation
  - **AC:** Users can click an entity node to open its detail page.
- [ ] Support relationship filtering
  - **AC:** Users can filter graph edges by relationship type.
- [ ] Highlight selected entities
  - **AC:** Selecting an entity highlights its incoming and outgoing relationships.
- [ ] Add graph empty/error states
  - **AC:** Worlds without enough relationship data explain how to create graph content.

---

## 🔑 v1.4.0 — World Import & Export

**Status:** Planned

### Goal

Give users safer ownership over their data by allowing world-level backup, export, and import.

### Scope

- [ ] Export a world as JSON
  - **AC:** Users can download one world with its entities, relationships, events, tags, and participants.
- [ ] Add import flow
  - **AC:** Users can upload a valid exported world JSON file.
- [ ] Validate imported data
  - **AC:** Invalid imports show clear validation errors and do not partially save bad data.
- [ ] Add import preview
  - **AC:** Users can review world title, entity count, relationship count, and event count before importing.
- [ ] Handle ID conflicts safely
  - **AC:** Imported worlds do not overwrite existing user data unless explicitly designed later.

---

## 🎨 v1.5.0 — Public World Sharing

**Status:** Planned

### Goal

Allow users to share read-only versions of selected worlds with beta readers, collaborators, game groups, or portfolio viewers.

### Scope

- [ ] Add world sharing toggle
  - **AC:** Users can enable or disable public read-only sharing for a world.
- [ ] Generate public world links
  - **AC:** Shared worlds have copyable public URLs.
- [ ] Add read-only public world page
  - **AC:** Public visitors can view approved world content without editing access.
- [ ] Protect private user data
  - **AC:** Public pages do not expose authenticated-only controls or unrelated user data.
- [ ] Add sharing status UI
  - **AC:** Users can clearly see whether a world is private or shared.

---

## 🌍 Long-Term Ideas

- Richer relationship taxonomy and relationship presets
- World-level dashboard analytics
- Lore consistency warnings
- Character/faction/location profile templates
- Markdown support for descriptions and notes
- Image uploads for entities and worlds
- Collaboration or invite-based editing
- AI-assisted lore summarization or contradiction detection
- Advanced timeline eras, calendars, and fictional date systems
- Printable/exportable world bible format

---

## Contributing to the Roadmap

This roadmap should stay honest and release-driven. Completed work should move into `CHANGELOG.md`, while planned work should remain here until it is actively scoped into a release.

Each release should include:

- A clear goal
- A small set of scoped tasks
- Acceptance criteria
- Verification notes before release
- Changelog and release notes updates