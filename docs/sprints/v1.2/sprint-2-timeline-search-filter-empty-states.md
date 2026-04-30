# Worldbuilding Codex v1.2 Sprint 2 — Timeline Search, Filtering & Empty States

## Goal

Make the Timeline Explorer useful for larger fictional worlds by adding timeline search/filtering controls and clear empty states.

This sprint builds on Sprint 1’s dedicated timeline route by helping users narrow event lists and recover easily from empty or filtered results.

---

## Scope

### 1. Add timeline event search

Add a search input to the dedicated world timeline page.

Search should check:

- Event title
- Event summary
- Event description
- Participant names, if available through the current event data shape
- Participant role labels, if available

**Acceptance Criteria:**

- Users can search timeline events by title, summary, description, and participants.
- Search updates the visible timeline results.
- Search is case-insensitive.
- Search ignores extra leading/trailing whitespace.
- Clearing search restores the full timeline list.

---

### 2. Add basic timeline filters

Add lightweight filters that fit the existing data model.

Recommended filters for v1.2:

- Event date/sort year availability
  - All events
  - Dated/sorted events
  - Undated events
- Participant presence
  - All events
  - Events with participants
  - Events without participants

Optional only if already easy:

- Participant/entity filter
- Role label filter

**Acceptance Criteria:**

- Users can filter timeline events without breaking chronological ordering.
- Filters combine safely with search.
- Resetting filters restores the full timeline list.
- Filter controls remain usable on desktop and mobile.

---

### 3. Preserve timeline browsing state in URL query parameters

Preserve search/filter state using timeline-specific URL query parameters.

Suggested query parameters:

```txt
timelineSearch
timelineDateStatus
timelineParticipantStatus
```

Optional future parameter if participant/entity filtering is added:

```txt
timelineParticipant
```

**Acceptance Crtitera:**

- Timeline search/filter state is reflected in the URL.
- Refreshing the page preserves the active timeline controls.
- Using browser back/forward behaves predictably.
- Timeline query parameters do not conflict with v1.1 entity browsing parameters.

---

### 4. Add timeline empty and no-results states

Add clear states for both true empty timelines and filtered no-results timelines.

Required states:

- No events exist yet.
- Events exist, but no results match current search/filter controls.

**Acceptance Criteria:**

- Empty timeline state explains that the world does not have timeline events yet.
- Filtered no-results state explains that search/filter controls are hiding results.
- Filtered no-results state includes a clear reset action.
- Reset action clears timeline search/filter controls and restores results.

---

### 5. Improve timeline control accessibility

- Label search and filter controls clearly.
- Ensure controls are keyboard reachable.
- Add focus-visible styling where needed.
- Use semantic buttons for reset actions.
- Announce result count changes if an existing live-region pattern is available.

**Acceptance Criteria:**

- Search, filter, and reset controls have accessible labels.
- Controls can be used with keyboard navigation.
- Focus states are visible.
- Timeline count/status text is understandable by screen reader users.

---

## Out of Scope

- Full participant card rendering
- Relationship graph work
- World import/export
- Public world sharing
- Advanced fuzzy timeline search
- Saved timeline views
- Fictional calendar systems

---

## Implementation Notes

Recommended result summary text examples:

```txt
Showing 8 timeline events.
Showing 3 of 12 timeline events.
No timeline events match your current search or filters.
```

Recommended no-results reset button text:

```txt
Reset timeline filters
```

Search behavior should be simple and predictable. Avoid fuzzy search for this sprint unless it is trivial and already supported by shared utilities.

---

## Manual Verification Checklist

- [ ] Timeline page loads.
- [ ] Search by event title works.
- [ ] Search by event summary works.
- [ ] Search by event description works.
- [ ] Search by participant name works.
- [ ] Search by participant role label works.
- [ ] Date status filter works.
- [ ] Participant status filter works.
- [ ] Search and filters combine correctly.
- [ ] Chronological order remains stable after filtering.
- [ ] URL updates with `timelineSearch`.
- [ ] URL updates with `timelineDateStatus`.
- [ ] URL updates with `timelineParticipantStatus`.
- [ ] Refresh preserves active controls.
- [ ] Browser back/forward works predictably.
- [ ] Reset timeline filters clears controls.
- [ ] Filtered no-results state appears.
- [ ] Empty timeline state still appears for a world with no events.
- [ ] Keyboard navigation works through search, filters, reset, and event links.
- [ ] Mobile/narrow layout is usable.
- [ ] No major console errors appear.

---

## Completion Notes

To be filled in after implementation.

- Branch:
- PR:
- Tests run:
- Manual verification:
- Known follow-ups: