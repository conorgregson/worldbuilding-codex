# Worldbuilding Codex v1.1 — Sprint 1: Search & Query State

## Goal

Add the core entity search experience for Worldbuilding Codex v1.1 and make entity browsing state predictable while users move through a world.

This sprint establishes the foundation for the v1.1 Entity Search & Filtering release by allowing users to search entities and by preserving search state through URL query parameters.

---

## Release Context

Worldbuilding Codex v1.1 focuses on making large fictional worlds easier to browse by adding:

- Entity search
- Type filtering
- Tag filtering
- Sorting controls
- Stronger no-results empty states
- Preserved search/filter state during world browsing

Sprint 1 covers the first layer of that work: search and browsing state.

---

## Scope

- Add entity search to the entity browsing experience.
- Search across entity:
  - Name
  - Type
  - Summary
  - Description
  - Notes
  - Tags
- Make search case-insensitive.
- Support partial matches.
- Add a clear/reset search action.
- Preserve search state while browsing within the same world.
- Store entity search state in URL query params using `entitySearch`.
- Confirm refresh behavior keeps the active search state.

---

## Linked Issues

- [x] Add entity search
- [x] Preserve entity search/filter state while browsing

---

## Implementation Summary

Sprint 1 added the core entity search experience to the world detail entity list.

Implemented work includes:

- Added a search input to the entity browsing section.
- Added entity search matching for:
  - Entity name
  - Entity type
  - Entity summary
  - Entity description
  - Entity notes
  - Entity tags
- Added case-insensitive search behavior.
- Added partial-match support.
- Added a clear search action.
- Preserved entity search state in the URL with the `entitySearch` query parameter.
- Added search result feedback for active searches.
- Added no-match messaging when a search hides all entities.
- Confirmed refresh behavior preserves active search state.

---

## Query Param Behavior

Sprint 1 introduced the following query parameter:

```txt
entitySearch
```

Example:

```txt
/worlds/:worldId?entitySearch=empire
```

This keeps entity search state:

- Refresh-safe
- Browser-navigation friendly
- Easy to extend in Sprint 2
- Namespaced away from future timeline or relationship search params

Future entity browsing params can build on the same pattern:

```txt
/worlds/:worldId?entitySearch=empire&entityType=FACTION&entityTag=royalty&entitySort=name
```

---

## Acceptance Criteria

- [x] Users can search entities within a world.
- [x] Search checks entity name.
- [x] Search checks entity summary.
- [x] Search checks entity description.
- [x] Search checks entity notes.
- [x] Search checks entity tags.
- [x] Search is case-insensitive.
- [x] Partial matches work.
- [x] Empty or missing optional fields do not crash search.
- [x] Clearing search restores the full entity list.
- [x] Search state does not reset unnecessarily during normal world browsing.
- [x] Refresh behavior is predictable and does not crash.
- [x] Active search state is preserved through the `entitySearch` URL query parameter.

---

## Verification Checklist

### Local Verification

- [x] Run frontend build/typecheck.
- [x] Load a world with multiple entities.
- [x] Search by entity name.
- [x] Search by entity type.
- [x] Search by summary.
- [x] Search by description.
- [x] Search by notes.
- [x] Search by tag.
- [x] Search with lowercase text.
- [x] Search with uppercase text.
- [x] Search with partial text.
- [x] Clear search and confirm full list returns.
- [x] Confirm URL updates with `?entitySearch=...`.
- [x] Refresh with active search and confirm expected state remains.
- [x] Trigger a no-match search and confirm clear messaging appears.
- [x] Confirm no obvious console errors appear.

### Production/Hosted Verification

Complete after merge/deploy if applicable:

- [ ] Hosted frontend loads successfully.
- [ ] Login/authenticated flow still works.
- [ ] World detail page loads.
- [ ] Entity search works in production.
- [ ] Refresh behavior works in production.
- [ ] No obvious production console errors appear.

---

## Out of Scope
- Type filtering
- Tag filtering UI
- Sorting controls
- No-results empty state polish
- Timeline Explorer work
- Relationship Graph work
- Import/export work
- Public sharing work

---

## Risks / Notes
- Entity search logic should continue to defensively handle optional fields.
- Tag search depends on the current entity tag response shape.
- URL query params should stay namespaced to avoid conflicts with future timeline search/filtering.
- Advanced fuzzy search was intentionally left out of v1.1.

---

## Completion Notes

To be completed after Sprint 1 work is finished.

### Summary

Sprint 1 is complete.

The entity list now supports a search-first browsing experience. Users can search across entity names, types, summaries, descriptions, notes, and tags. Search is case-insensitive, supports partial matches, and persists through the entitySearch URL query parameter.

The implementation also added a clear search action and search feedback messaging so users understand when results are being filtered.

### Verification Results

Manual smoke testing passed.

Verified:

- Search by entity name passed.
- Search by entity type passed.
- Search by summary passed.
- Search by description passed.
- Search by notes passed.
- Search by tag passed.
- Lowercase search passed.
- Uppercase search passed.
- Partial search passed.
- Clear search restored the full entity list.
- URL updated with `?entitySearch=....`
- Refresh with active search kept expected search state.
- No-match search displayed a clear message.
- No obvious console errors appeared during normal search usage.

### Follow-Up Items

- Sprint 2 should build on the same query-param pattern for entity type filtering, tag filtering, and sorting.
- Future entity browsing params should stay namespaced, such as:
  - `entityType`
  - `entityTag`
  - `entitySort`