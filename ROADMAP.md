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

## ✅ Version 1.0 — Stable Portfolio Release

**Focus:** Finalize Worldbuilding Codex as a stable public portfolio release with the core lore-management workflow complete, deployed, documented, and verified.

### Scope

- Confirm live frontend loads successfully
- Confirm backend health endpoint is reachable
- Confirm authentication works in production
- Confirm protected routing works
- Confirm worlds CRUD works
- Confirm entities CRUD works
- Confirm relationship workflow works
- Confirm timeline workflow works
- Confirm event participants work
- Confirm route refresh behavior works
- Resolve favicon issue or remove unused favicon reference
- Review README for v1.0 positioning
- Update changelog for v1.0.0
- Create GitHub release notes
- Tag release as `v1.0.0`

### Notes

- v1.0 does not introduce a major new feature
- This releaseld promotes the existing complete, deployed, and documented core workflow into the first stable public release.

Released: Apr 2026

---

## ✅ Version 1.1 — Entity Search & Filtering

**Focus:** Improve entity browsing for larger fictional worlds by adding search, filtering, sorting, no-results guidance, and accessibility/responsive polish.

### Scope

- Add entity search
  - **AC:** Users can search by name, type, summary, description, notes, and tags.
- Add type filtering
  - **AC:** Users can filter entities by character, location, faction, species, artifact, culture, and other supported types.
- Add tag filtering
  - **AC:** Users can filter entities by tag.
- Add sorting controls
  - **AC:** Users can sort alphabetically, by entity type, or by recently updated.
- Add no-results empty state
  - **AC:** Empty search/filter results explain what happened and offer a clear reset option.
- Preserve search/filter/sort state during world browsing
  - **AC:** Entity browsing controls persist through URL query parameters and remain refresh-safe.
- Polish accessibility and responsive layout
  - **AC:** Search, filter, sort, and reset controls are labelled, keyboard reachable, focus-visible, and usable on desktop and mobile.

### Notes

- v1.1 builds on the stable v1.0 core workflow by making larger worlds easier to browse.
- Entity browsing state is preserved with namespaced URL parameters:
  - `entitySearch`
  - `entityType`
  - `entityTag`
  - `entitySort`
- Advanced fuzzy search and saved entity views remain future improvement ideas.

Released: Apr 2026

---

### ✅ Version 1.2 — Timeline Explorer

**Focus:** Turn existing event tracking into a dedicated timeline browsing experience with search, filtering, URL query state, participant visibility, and timeline-focused polish.

### Scope

- Add dedicated world timeline route
  - **AC:** Users can open a focused timeline page for a world.
- Improve chronological event layout
  - **AC:** Events are ordered by sort year, sort index, date label, and creation fallback where available.
- Add event search controls
  - **AC:** Users can search timeline events by title, summary, description, date fields, participant names, participant types, and role labels.
- Add timeline filters
  - **AC:** Users can filter events by date/sort status and participant status.
- Preserve timeline browsing state
  - **AC:** Timeline search/filter controls persist through URL query parameters and remain refresh-safe.
- Add participant visibility
  - **AC:** Timeline events clearly show attached entities, entity types, and role labels.
- Add timeline empty and no-results states
  - **AC:** Empty and filtered timeline states are clear and actionable.
- Polish accessibility and responsive layout
  - **AC:** Timeline search, filter, reset, and participant links are labelled, keyboard reachable, focus-visible, and usable on desktop, tablet, and mobile.

### Notes

- v1.2 builds on the stable v1.0 core workflow and the v1.1 entity browsing improvements by giving timeline events their own focused browsing route.
- Timeline browsing state is preserved with namespaced URL parameters:
  - `timelineSearch`
  - `timelineDateStatus`
  - `timelineParticipantStatus`
- The world detail page keeps the editable timeline section for event management, while the dedicated Timeline Explorer page provides focused browsing, search, and filtering.
- Advanced fictional calendars, eras, drag-and-drop ordering, saved timeline views, and fuzzy search remain future improvement ideas.

Released: Apr 2026

---

## ✅ Version 1.3 — Relationship Graph

**Focus:** Add a visual graph view that helps users explore connected lore through entity relationships.

### Scope

- Add relationship graph page
  - **AC:** Users can open a dedicated graph page for a world.
- Render graph nodes and edges
  - **AC:** Entities render as graph nodes and relationships render as directional edges.
- Support graph navigation
  - **AC:** Users can select a graph node and open the matching entity detail page.
- Support relationship filtering
  - **AC:** Users can filter graph edges by relationship type.
- Highlight selected entities
  - **AC:** Selecting an entity highlights its incoming and outgoing relationships.
- Add graph empty and no-results states
  - **AC:** Worlds without enough relationship data explain how to create graph content, and filtered no-results states offer a clear reset action.
- Polish graph accessibility and responsive layout
  - **AC:** Graph controls are labelled, keyboard reachable, focus-visible, and usable on desktop, tablet, and mobile.

### Notes

- v1.3 builds on the stable v1.0 core workflow, the v1.1 entity browsing improvements, and the v1.2 Timeline Explorer by adding a visual way to explore connected lore.
- The Relationship Graph is available at:
  - `/worlds/:worldId/graph`
- The graph supports:
  - entity nodes
  - directional relationship edges
  - relationship type labels
  - relationship type filtering
  - selected entity highlighting
  - incoming/outgoing relationship highlighting
  - selected entity navigation
  - empty and filtered no-results states
- Graph filter and selection state are local for now. Future improvements may add URL query state if graph views need to become refresh-persistent.
- Advanced graph search, saved graph views, graph layout persistence, graph editing, and a world-level relationships endpoint remain future improvement ideas.

Released: Apr 2026

---

## 🔑 Version 1.4 — World Import & Export

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

## 🎨 Version 1.5 — Public World Sharing

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