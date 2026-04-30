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

## Linked Issues

- [ ] Support graph navigation
- [ ] Support relationship filtering
- [ ] Highlight selected entities
- [ ] Add graph no-results state

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

- [ ] Users can click an entity node.
- [ ] Clicking an entity node opens the matching entity detail page.
- [ ] Users can filter relationships by relationship type.
- [ ] Users can reset the relationship type filter.
- [ ] Filtering updates visible graph edges without crashing.
- [ ] Filtering does not permanently remove graph data.
- [ ] Selecting an entity highlights that entity.
- [ ] Selecting an entity highlights incoming relationships.
- [ ] Selecting an entity highlights outgoing relationships.
- [ ] Users can clear the selected entity.
- [ ] Empty filtered results show clear no-results messaging.
- [ ] Graph controls are keyboard reachable.
- [ ] Graph controls have accessible labels.
- [ ] No obvious console errors appear during graph interaction.

---

## Verification Checklist

### Local Verification

- [ ] Run frontend build/typecheck.
- [ ] Load a world with multiple entities and relationship types.
- [ ] Open the Relationship Graph page.
- [ ] Click an entity node.
- [ ] Confirm the matching entity detail page opens.
- [ ] Return to the graph page.
- [ ] Filter by one relationship type.
- [ ] Confirm only matching relationship edges are shown.
- [ ] Reset the relationship type filter.
- [ ] Confirm all relationship edges return.
- [ ] Select an entity.
- [ ] Confirm the selected entity is visually highlighted.
- [ ] Confirm incoming relationships are highlighted.
- [ ] Confirm outgoing relationships are highlighted.
- [ ] Clear the selected entity.
- [ ] Confirm the graph returns to its default visual state.
- [ ] Trigger a filter with no matching relationships if possible.
- [ ] Confirm no-results messaging appears.
- [ ] Confirm graph controls are keyboard reachable.
Confirm graph controls have visible focus states.
- [ ] Confirm no obvious console errors appear.

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

- Node navigation should not interfere with selection behavior.
- If nodes are both clickable and selectable, the interaction pattern should be clear.
- Relationship filtering should handle missing or inconsistent relationship types safely.
- Highlighting should remain understandable without relying only on color.
- Graph controls should not conflict with existing entity or timeline query params.
- If graph query params are added, they should be namespaced with graph....

---

## Completion Notes

To be completed after Sprint 2 work is finished.

#### Summary

Sprint 2 is pending.

The goal of this sprint is to make the Relationship Graph interactive by adding node navigation, relationship type filtering, selected entity highlighting, and incoming/outgoing relationship emphasis.

### Verification Results

Manual smoke testing pending.

Verify:

- Node navigation works.
- Relationship type filtering works.
- Filter reset works.
- Selected entity highlighting works.
- Incoming relationship highlighting works.
- Outgoing relationship highlighting works.
- Clear selection works.
- No-results messaging works.
- Keyboard navigation and focus states are acceptable.
- No obvious console errors appear during graph interaction.

### Follow-Up Items

- Sprint 3 should polish graph empty states, accessibility, responsive layout, documentation, screenshots, changelog, PR materials, and release notes.
- Future graph improvements can consider graph search, saved graph views, advanced layout controls, or relationship editing from the graph.