# Worldbuilding Codex v1.3 — Sprint 1: Graph Foundation

## Goal

Add the core Relationship Graph foundation for Worldbuilding Codex v1.3 by creating a dedicated graph view that visually represents connected lore.

This sprint establishes the foundation for the v1.3 Relationship Graph release by allowing users to view world entities as nodes and relationships as directional edges.

---

## Release Context

Worldbuilding Codex v1.3 focuses on helping users explore connected lore through a visual relationship graph.

The release is planned to add:

- A relationship graph page or section
- Entity nodes
- Directional relationship edges
- Graph navigation
- Relationship filtering
- Selected entity highlighting
- Empty and error states for graph data

Sprint 1 covers the first layer of that work: the graph route, graph data loading, and basic visual rendering.

---

## Scope

- Add a Relationship Graph page or section for each world.
- Load the selected world’s entities and relationships.
- Render entities as graph nodes.
- Render relationships as directional edges.
- Show relationship type or label information where practical.
- Add a clear page heading and short helper text.
- Add navigation from the world detail page to the graph view.
- Handle worlds with entities but no relationships.
- Handle worlds with no entities.
- Confirm the graph view is refresh-safe.
- Confirm the graph view does not crash on sparse or empty data.

---

## Implementation Summary

Sprint 1 will add the first working Relationship Graph experience to Worldbuilding Codex.

Planned work includes:

- Add a dedicated graph route or page section for a world.
- Add a navigation link from the world detail page to the Relationship Graph.
- Reuse existing world, entity, and relationship data.
- Transform entities into graph nodes.
- Transform relationships into directional graph edges.
- Display basic relationship labels or relationship types.
- Add graph layout styling.
- Add basic empty states for worlds without enough graph data.
- Confirm refresh behavior works on the graph page.

---

## Suggested Route Behavior

Sprint 1 can introduce a route like:

```txt
/worlds/:worldId/graph
```

This keeps the Relationship Graph:

- Separate from the editable world detail page
- Easier to expand in later sprints
- Easier to verify independently
- More portfolio-friendly as a dedicated feature page

The world detail page can keep the existing relationship management workflow, while the graph page focuses on visual exploration.

---

## Acceptance Criteria

- [x] Users can open a Relationship Graph page or section for a world.
- [x] The graph view loads the correct world data.
- [x] Entities render as visible graph nodes.
- [x] Relationships render as visible directional edges.
- [x] Relationship type or label information is visible where practical.
- [x] Users can navigate to the graph view from the world detail page.
- [x] A world with entities but no relationships does not crash.
- [x] A world with no entities does not crash.
- [x] Refreshing the graph page does not crash.
- [x] The graph layout is usable on desktop.
- [x] The graph layout remains usable on narrower screens.
- [x] No obvious console errors appear during normal graph usage.

---

## Verification Checklist

### Local Verification

- [x] Run frontend build/typecheck.
- [x] Load a world with multiple entities and relationships.
- [x] Open the Relationship Graph page or section.
- [x] Confirm the graph page loads successfully.
- [x] Confirm entities appear as graph nodes.
- [x] Confirm relationships appear as directional edges.
- [x] Confirm relationship labels or types are visible where practical.
- [x] Refresh the graph page and confirm it still loads.
- [x] Open a world with entities but no relationships.
- [x] Confirm the graph page does not crash.
- [x] Open a world with no entities.
- [x] Confirm the graph page does not crash.
- [x] Test the graph layout on desktop.
- [x] Test the graph layout on a narrow viewport.
- [x] Confirm no obvious console errors appear.

### Production Verification

Complete after merge/deploy:

- [ ] Hosted frontend loads successfully.
- [ ] Login/authenticated flow works.
- [ ] World detail page loads.
- [ ] Relationship Graph page loads in production.
- [ ] Graph route refresh works in production.
- [ ] Entity nodes render in production.
- [ ] Relationship edges render in production.
- [ ] Empty graph states work in production.
- [ ] No obvious production console errors appear.

---

## Out of Scope

- Relationship type filtering
- Selected entity highlighting
- Incoming/outgoing relationship highlighting
- Graph search
- Graph layout persistence
- Drag-and-drop graph editing
- Creating or editing relationships from the graph
- Timeline Explorer work
- Import/export work
- Public sharing work

---

## Risks / Notes

- Graph rendering should defensively handle missing or incomplete entity/relationship data.
- Relationship edges depend on the current relationship response shape.
- Sprint 1 intentionally avoided adding a graph library and instead used a lightweight SVG graph.
- The graph currently fetches relationship data per entity because there is not yet a world-level relationships endpoint.
- This approach keeps Sprint 1 frontend-focused but may be worth revisiting later if graph data becomes larger.
- The first graph layout is intentionally simple; Sprint 1 is focused on stable rendering.
- Graph navigation and filtering are intentionally left for Sprint 2.
- Empty state polish can continue in Sprint 3.

---

Completion Notes

To be completed after Sprint 1 work is finished.

### Summary

Sprint 1 is complete.

The Relationship Graph foundation is now implemented. Users can open a dedicated graph route for a world, view entities as graph nodes, and see relationships as directional SVG edges with relationship type labels.

The world detail page now includes a Relationship Graph entry card, making the feature discoverable from the existing world workflow.

### Verification Results

Manual smoke testing passed.

Verified:

- Frontend build passed.
- Graph page loads locally.
- Relationship Graph route is protected.
- Relationship Graph route refresh works.
- Back-to-world navigation works.
- World detail page shows the Relationship Graph entry link.
- Entity nodes render correctly.
- Relationship edges render correctly.
- Relationship type labels appear where practical.
- World with entities but no relationships shows the no-relationships state.
- World with no entities shows the no-entities state.
- Desktop layout is usable.
- Narrow/mobile layout is usable.
- No obvious console errors appeared during normal graph usage.

### Follow-Up Items

- Sprint 2 should build on the graph foundation by adding node navigation, relationship type filtering, selected-entity highlighting, and incoming/outgoing relationship emphasis.
- Sprint 3 should polish graph empty states, accessibility, responsive behavior, documentation, and release materials.
- A future backend improvement could add a world-level relationships endpoint if graph data grows large enough that per-entity relationship fetching becomes inefficient.
