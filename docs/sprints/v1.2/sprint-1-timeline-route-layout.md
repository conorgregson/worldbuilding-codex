# Worldbuilding Codex v1.2 Sprint 1 — Timeline Route & Chronological Layout

## Goal

Create the foundation for the v1.2 Timeline Explorer by adding a dedicated world timeline route and rendering existing timeline events in a focused chronological browsing layout.

This sprint should turn the existing event data into a separate, refresh-safe timeline page for each world without adding advanced filtering yet.

---

## Scope

### 1. Add dedicated world timeline route

- Add a focused timeline page for a single world.
- Route should be world-specific.
- The page should be reachable from the world detail/navigation UI.
- The route should remain protected behind authentication.
- Refreshing the route should not break the page.

**Acceptance Criteria:**

- Users can open a dedicated timeline page for a world.
- The route loads correctly after browser refresh.
- The route handles missing, invalid, or unauthorized world IDs safely.
- Authenticated users only see timeline data for worlds they own.

---

### 2. Fetch and display timeline events

- Load timeline events for the selected world.
- Reuse existing backend/API data where possible.
- Display each event as a readable timeline card or row.
- Include core event fields already supported by the app.

Suggested visible fields:

- Event title
- Date label
- Sort year, if useful
- Summary
- Description preview or full description depending on layout
- Participant count placeholder, if participant rendering is deferred to Sprint 3

**Acceptance Criteria:**

- Existing timeline events appear on the dedicated timeline page.
- Event data matches the selected world.
- Events do not appear across unrelated worlds.
- Loading and error states are handled clearly.

---

### 3. Improve chronological event layout

- Sort events consistently using the planned v1.2 ordering logic.
- Prioritize `sortYear`, then `sortIndex`, then `dateLabel` where available.
- Make the visual order easy to understand.
- Keep layout clean on desktop and mobile.

**Acceptance Criteria:**

- Events are ordered by sort year, sort index, and date label where available.
- Events with incomplete date data still render gracefully.
- Timeline order is predictable and stable.
- The page remains readable with several events.

---

### 4. Add base timeline page states

Add basic page states before the richer empty/filter states planned for Sprint 2.

Required states:

- Loading
- Error
- No timeline events
- World not found or access denied

**Acceptance Criteria:**

- Loading state appears while data is being fetched.
- Error state appears when timeline data cannot load.
- Empty state appears when the world has no events.
- Empty state clearly suggests creating timeline events.

---

## Out of Scope

- Timeline search
- Timeline filters
- Participant role display
- Advanced era/calendar logic
- Relationship graph work
- Import/export work
- Public sharing work

---

## Implementation Notes

Suggested route shape:

```txt
/worlds/:worldId/timeline
```

Suggested UI placement:

- Add a “Timeline” link or button from the world detail page.
- Keep the existing event creation/editing workflow unchanged unless small routing links are needed.

Suggested sorting behavior:

```txt
sortYear asc
sortIndex asc
dateLabel asc
createdAt or updatedAt fallback
```

If exact beckend sorting is already available, prefer reusing it. If not, apply client-side sorting temporarily and consider backend sorting later if needed.

---

## Manual Verification Checklist

- [x] Log in successfully.
- [x] Open a world with timeline events.
- [x] Click/open the dedicated timeline page.
- [x] Confirm timeline events render.
- [x] Confirm events are ordered chronologically.
- [x] Refresh the timeline route directly.
- [x] Confirm the page still loads correctly.
- [x] Open a world with no events.
- [x] Confirm the empty timeline state appears.
- [x] Test desktop layout.
- [x] Test mobile/narrow layout.
- [x] Confirm no console errors appear during normal use.

---

## Completion Notes

- Branch: v1.2-timeline-explorer
- PR: Pending
- Tests run:
  - Client build passed
  - Manual route verification passed
- Manual verification:
  - Dedicated world timeline route loads
  - Timeline route refresh works
  - Events render in chronological order
  - Participants display on event cards
  - World detail page links to full timeline
  - Back to world link works
  - Empty timeline state appears for worlds with no events
  - No major console errors found
- Known follow-ups:
  - Sprint 2 will add timeline search, filters, URL query state, and no-results states