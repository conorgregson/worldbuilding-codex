# Worldbuilding Codex v1.3 — Sprint 2: Navigation, Filtering & Highlighting

## Goal

Make the Relationship Graph interactive by allowing users to navigate from graph nodes to entity detail pages, filter graph relationships by type, and highlight selected entity connections.

This sprint turns the graph from a static visual feature into a useful lore exploration tool.

---

## Release Context

Worldbuilding Codex v1.3 focuses on helping users understand how fictional-world entities connect to each other.

Sprint 1 establishes the graph foundation by rendering entities and relationships visually.

Sprint 2 builds on that foundation by adding:

- Clickable entity nodes
- Entity detail navigation
- Relationship type filtering
- Selected entity state
- Incoming and outgoing relationship highlighting
- Clear/reset behavior for graph interactions

---

## Scope

- Make entity nodes clickable.
- Navigate from a graph node to the matching entity detail page.
- Add a relationship type filter.
- Allow users to view all relationship types.
- Allow users to filter visible edges by one relationship type.
- Add selected entity state.
- Highlight the selected entity.
- Highlight incoming relationships for the selected entity.
- Highlight outgoing relationships for the selected entity.
- Add a clear selection action.
- Add a reset graph controls action if needed.
- Add no-results messaging when filtering hides all graph relationships.
- Confirm graph controls are keyboard reachable and labeled.

---

## Implementation Summary

Sprint 2 will add interaction controls to the Relationship Graph.

Planned work includes:

- Make graph nodes behave as links or buttons.
- Connect each graph node to its matching entity detail route.
- Add a relationship type filter control.
- Derive available relationship filter options from existing relationship data.
- Filter graph edges by selected relationship type.
- Preserve or reset visible graph state in a predictable way.
- Add selected entity state.
- Visually emphasize the selected entity.
- Visually emphasize relationships connected to the selected entity.
- Add clear selection behavior.
- Add no-results messaging for filters with no matching relationships.

---

## Query Param Behavior

Sprint 2 may introduce graph-specific query parameters if useful.

Possible params:

```txt
graphRelationshipType
graphSelectedEntity
```

Example:

```txt
/worlds/:worldId/graph?graphRelationshipType=ALLY&graphSelectedEntity=entity-id
```

This would keep graph interaction state:

- Refresh-safe
- Browser-navigation friendly
- Namespaced away from entity browsing params
- Namespaced away from timeline browsing params
- Easy to extend in future graph sprints

If the implementation is simpler without URL state, graph filter state can remain local for v1.3. However, if query params are added, they should stay graph-specific.

---

## Acceptance Criteria

- [x] Users can click an entity node.
- [x] Clicking an entity node opens the matching entity detail page.
- [x] Users can filter relationships by relationship type.
- [x] Users can reset the relationship type filter.
- [x] Filtering updates visible graph edges without crashing.
- [x] Filtering does not permanently remove graph data.
- [x] Selecting an entity highlights that entity.
- [x] Selecting an entity highlights incoming relationships.
- [x] Selecting an entity highlights outgoing relationships.
- [x] Users can clear the selected entity.
- [x] Empty filtered results show clear no-results messaging.
- [x] Graph controls are keyboard reachable.
- [x] Graph controls have accessible labels.
- [x] No obvious console errors appear during graph interaction.

---

## Verification Checklist

### Local Verification

- [x] Run frontend build.
- [x] Load a world with multiple entities and relationship types.
- [x] Open the Relationship Graph page.
- [x] Click an entity node.
- [x] Confirm the matching entity detail page opens.
- [x] Return to the graph page.
- [x] Filter by one relationship type.
- [x] Confirm only matching relationship edges are shown.
- [x] Reset the relationship type filter.
- [x] Confirm all relationship edges return.
- [x] Select an entity.
- [x] Confirm the selected entity is visually highlighted.
- [x] Confirm incoming relationships are highlighted.
- [x] Confirm outgoing relationships are highlighted.
- [x] Clear the selected entity.
- [x] Confirm the graph returns to its default visual state.
- [x] Trigger a filter with no matching relationships if possible.
- [x] Confirm no-results messaging appears.
- [x] Confirm graph controls are keyboard reachable.
Confirm graph controls have visible focus states.
- [x] Confirm no obvious console errors appear.

### Production Verification

Complete after merge/deploy:

- [ ] Hosted frontend loads successfully.
- [ ] Login/authenticated flow works.
- [ ] Relationship Graph page loads in production.
- [ ] Graph node navigation works in production.
- [ ] Relationship type filtering works in production.
- [ ] Selected entity highlighting works in production.
- [ ] Incoming/outgoing relationship highlighting works in production.
- [ ] Clear/reset graph actions work in production.
- [ ] Graph route refresh works in production.
- [ ] No obvious production console errors appear.

---

## Out of Scope

- Graph editing
- Creating relationships from the graph
- Deleting relationships from the graph
- Drag-and-drop graph layout persistence
- Advanced graph clustering
- Graph search
- Saved graph views
- Import/export work
- Public sharing work

---

## Risks / Notes

- Node navigation was intentionally implemented through a separate “Open selected entity” link instead of navigating immediately on node click.
- This makes the graph easier to use because selecting a node and navigating to an entity are separate actions.
- Graph node selection supports mouse and keyboard input.
- Highlighting does not rely only on color; selected and connected graph elements also use stroke width, opacity, and visual emphasis.
- Relationship filtering safely derives filter options from available relationship data.
- Graph filter and selection state are local for now.
- If graph state needs to become refresh-safe later, future query params should use the graph... namespace.
- The graph still fetches relationships per entity because there is not yet a world-level relationships endpoint.
- A world-level relationship endpoint may be worth adding later if graph data grows large enough that per-entity relationship fetching becomes inefficient.
- Sprint 3 should focus on final polish, accessibility review, responsive behavior, documentation, and release wrap-up.

---

## Completion Notes

To be completed after Sprint 2 work is finished.

#### Summary

Sprint 2 is complete.

The Relationship Graph is now interactive. Users can filter relationships by type, select graph nodes, highlight selected entities and their incoming/outgoing relationships, dim unrelated graph elements, clear selections, reset graph controls, and open the selected entity’s detail page.

The graph controls were also polished so clear/reset buttons match the visual style of the rest of the app.

### Verification Results

Manual smoke testing passed.

Verified:

- Frontend build/typecheck passed.
- Relationship Graph page loads locally.
- Relationship type filtering works.
- Filter reset works.
- Selected node highlighting works.
- Incoming relationship highlighting works.
- Outgoing relationship highlighting works.
- Connected nodes remain emphasized.
- Unrelated nodes and edges dim correctly.
- Selected entity status text appears.
- “Open selected entity” navigates to the matching entity detail page.
- Clear selection works.
- Reset graph controls works.
- Filtered no-results messaging appears.
- Keyboard selection with Enter and Space works on graph nodes.
- Graph controls are keyboard reachable.
- Graph controls have visible focus states.
- Clear/reset buttons visually match the app’s secondary button style.
- No obvious console errors appeared during graph interaction.

### Follow-Up Items

- Sprint 3 should polish final graph empty states, accessibility, responsive behavior, release documentation, screenshots, changelog, PR materials, and release notes.
- Future graph improvements can consider graph search, saved graph views, graph URL query state, advanced layout controls, or relationship editing directly from the graph.
- A future backend improvement could add a world-level relationships endpoint if graph performance becomes a concern.