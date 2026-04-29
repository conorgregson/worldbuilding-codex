
# Worldbuilding Codex v1.1 — Sprint 2: Filters, Sorting & Empty States

## Goal

Complete the main Entity Search & Filtering feature set by adding type filtering, tag filtering, sorting controls, and clear no-results/empty states.

Sprint 2 builds on Sprint 1 by turning the entity list into a more complete browsing experience for larger fictional worlds.

---

## Release Context

Worldbuilding Codex v1.1 focuses on making large fictional worlds easier to browse through search, filtering, sorting, and stronger empty states.

Sprint 1 establishes search and browsing state. Sprint 2 adds the remaining entity browsing controls and makes sure those controls work together.

---

## Scope

- Add entity type filtering.
- Add entity tag filtering.
- Add entity sorting controls.
- Support sorting alphabetically.
- Support sorting by entity type.
- Support sorting by recently updated if supported by the current data shape.
- Make search, filters, and sorting work together.
- Add no-results state for filtered/searched results.
- Keep true empty-entity states separate from no-results states.
- Add clear/reset controls for hidden results.

---

## Linked Issues

- [ ] Add entity type filtering
- [ ] Add entity tag filtering
- [ ] Add entity sorting controls
- [ ] Add entity no-results and empty states

---

## Implementation Plan

### 1. Review Sprint 1 search/state implementation

Before adding new controls, confirm:

- Search state is stable.
- Search filtering logic is easy to extend.
- The entity list can support multiple derived result states.
- URL params or state utilities can support type/tag/sort values if needed.

### 2. Add type filtering

Add a type filter control for supported entity types.

Supported types should include current app-supported entity types, such as:

- Character
- Location
- Faction
- Species
- Artifact
- Culture
- Other supported types already used by the app

The type filter should:

- Work with search.
- Be easy to reset.
- Not crash if an entity has a missing or unexpected type.

### 3. Add tag filtering

Add tag filtering based on tags present in the current world’s entities.

Tag filtering should:

- Use available tags from the current world/entity data.
- Work with search.
- Work with type filtering.
- Show selected tags clearly.
- Allow users to clear selected tags.

If multi-tag filtering is practical, support it. If not, keep the first implementation simple and document the limitation honestly.

### 4. Add sorting controls

Add a sorting control for the entity results.

Supported sorts:

- Alphabetical
- Entity type
- Recently updated, if supported

Sorting should apply after search/filter logic.

Recommended flow:

```txt
entities → search → filters → sort → render
```

Sorting should not mutate the original entity data unexpectedly.

### 5. Add no-results state

Add a clear no-results state when search/filter combinations hide all entities.

The no-results state should:

- Explain that no entities matched the current controls.
- Offer a clear reset action.
- Avoid looking like a broken or empty app.
- Be separate from the true empty state for worlds with no entities.

Suggested copy:

```txt
No entities match your current search or filters.
```

Suggested reset action:

```txt
Clear search and filters
```

### 6. Keep empty states distinct

There should be a difference between:

**1.** A world with no entities yet.

**2.** A world with entities, but none matching active search/filter controls.

This distinction helps users understand whether they need to create content or adjust controls.

---

## Acceptance Criteria

- [ ] Users can filter entities by supported type.
- [ ] Type filtering works with entity search.
- [ ] Users can filter entities by tag.
- [ ] Tag filtering works with search.
- [ ] Tag filtering works with type filtering.
- [ ] Selected filters are understandable to the user.
- [ ] Users can clear active filters.
- [ ] Users can sort entities alphabetically.
- [ ] Users can sort entities by type.
- [ ] Users can sort entities by recently updated if supported by the data.
- [ ] Sorting applies to the currently searched/filtered result set.
- [ ] Sorting does not corrupt or mutate source entity data.
- [ ] No-results state appears when active controls hide all entities.
- [ ] No-results state includes a reset option.
- [ ] True empty-world/entity state remains separate from no-results state.

---

## Verification Checklist

### Local Verification

- [ ] Run frontend build/typecheck.
- [ ] Run available frontend tests.
- [ ] Load a world with multiple entity types.
- [ ] Filter by character.
- [ ] Filter by location.
- [ ] Filter by faction.
- [ ] Filter by species, artifact, culture, or other supported types if available.
- [ ] Clear type filter.
- [ ] Filter by tag.
- [ ] Clear tag filter.
- [ ] Search + type filter combined passes.
- [ ] Search + tag filter combined passes.
- [ ] Type + tag filter combined passes.
- [ ] Search + type + tag combined passes if supported.
- [ ] Sort alphabetically.
- [ ] Sort by entity type.
- [ ] Sort by recently updated if supported.
- [ ] Confirm sorting applies after search/filter controls.
- [ ] Trigger no-results state.
- [ ] Use reset control from no-results state.
- [ ] Confirm true empty entity state still works for a world with no entities.
- [ ] Confirm no obvious console errors appear.

### Production/Hosted Verification

Complete after merge/deploy if applicable:

- [ ] Hosted frontend loads successfully.
- [ ] World detail page loads.
- [ ] Entity type filtering works in production.
- [ ] Entity tag filtering works in production.
- [ ] Entity sorting works in production.
- [ ] No-results state works in production.
- [ ] Reset controls work in production.
- [ ] No obvious production console errors appear.

---

## Out of Scope
- Advanced fuzzy search
- Saved entity views
- Bulk entity actions
- Relationship-aware filters
- Timeline event filters
- Relationship Graph work
- Import/export work
- Public sharing work

---

## Risks / Notes

- Tag filtering may need normalization if tags are stored inconsistently.
- Recently updated sorting should only be included if reliable timestamp data is available.
- Too many controls can clutter the UI, especially on mobile.
- Search/filter/sort state should remain understandable and resettable.

---

## Completion Notes

To be completed after Sprint 2 work is finished.

### Summary

- TBD

### Verification Results

- TBD

### Follow-Up Items

- TBD