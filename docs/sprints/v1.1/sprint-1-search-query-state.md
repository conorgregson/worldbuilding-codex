# Worldbuilding Codex v1.1 — Sprint 1: Search & Query State

## Goal

Add the core entity search experience for Worldbuilding Codex v1.1 and make entity browsing state predictable while users move through a world.

This sprint establishes the foundation for the v1.1 Entity Search & Filtering release by allowing users to search entities and by deciding how search/filter/sort state should persist during world browsing.

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
  - Summary
  - Description
  - Notes
  - Tags
- Make search case-insensitive.
- Support partial matches.
- Add a clear/reset search action.
- Preserve search state while browsing within the same world.
- Decide whether entity browsing state should be stored in:
  - Local component state
  - Route/search params
  - A shared helper/state utility
- Prefer URL query params if practical, so refresh and browser navigation behave predictably.

---

## Linked Issues

- [ ] Add entity search
- [ ] Preserve entity search/filter state while browsing

---

## Implementation Plan

### 1. Review current entity list flow

Before implementing, review:

- Where entities are loaded
- Where the entity list is rendered
- How entity cards/list items are structured
- Whether the world detail page already owns the entity list state
- Whether entity list state should move into route/search params

### 2. Add search input

Add a search control near the entity list.

The search input should:

- Have a clear visible label or accessible label.
- Use a controlled value.
- Update visible results as the user types.
- Be easy to clear.

Suggested placeholder:

```txt
Search entities...
```

### 3. Build search matching logic

Search should check:
- `name`
- `summary`
- `description`
- `notes`
- `tags`

Search should be:
- Case-insensitive
- Whitespace-tolerant
- Safe when optional fields are missing
- Safe when tags are empty or undefined

### 4. Add clear/reset behavior

Users should be able to clear the search and return to the full entity list.

Clear behavior should:

- Reset the search input.
- Restore all matching entities.
- Preserve any unrelated state only if that state still makes sense.

### 5. Preserve browsing state

Search state should not reset unnecessarily while the user is still browsing within the same world.

Preferred behavior:

- Search persists while navigating within the world detail/entity browsing flow.
- Search resets when switching to a different world.
- Refresh behavior is predictable.
- Back/forward behavior is not confusing.

If URL params are used, possible format:

```txt
/worlds/:worldId?search=empire
```

Or, if entities have a dedicated nested route:

```txt
/worlds/:worldId/entities?search=empire
```

---

## Acceptance Criteria

- [ ] Users can search entities within a world.
- [ ] Search checks entity name.
- [ ] Search checks entity summary.
- [ ] Search checks entity description.
- [ ] Search checks entity notes.
- [ ] Search checks entity tags.
- [ ] Search is case-insensitive.
- [ ] Partial matches work.
- [ ] Empty or missing optional fields do not crash search.
- [ ] Clearing search restores the full entity list.
- [ ] Search state does not reset unnecessarily during normal world browsing.
- [ ] Switching worlds does not accidentally carry unrelated search state into another world.
- [ ] Refresh behavior is predictable and does not crash.

---

## Verification Checklist

### Local Verification

- [ ] Run frontend build/typecheck.
- [ ] Run available frontend tests.
- [ ] Load a world with multiple entities.
- [ ] Search by entity name.
- [ ] Search by summary.
- [ ] Search by description.
- [ ] Search by notes.
- [ ] Search by tag.
- [ ] Search with lowercase text.
- [ ] Search with uppercase text.
- [ ] Search with partial text.
- [ ] Clear search and confirm full list returns.
- [ ] Navigate within the same world and confirm search behavior is predictable.
- [ ] Switch worlds and confirm search does not incorrectly carry over.
- [ ] Refresh with active search if URL params are implemented.
- [ ] Confirm no obvious console errors appear.

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
- If entity fields are inconsistent or optional, search logic should defensively handle missing values.
- If tags are stored differently across frontend/backend responses, tag search may need normalization.
- If URL params are introduced, make sure the implementation does not make routing unnecessarily complex.
- Avoid overbuilding advanced fuzzy search in this sprint.

---

## Completion Notes

To be completed after Sprint 1 work is finished.

### Summary

- TBD

### Verification Results

- TBD

### Follow-Up Items

- TBD