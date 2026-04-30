import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { StatusMessage } from "../components/ui/StatusMessage";
import { getWorldEvents } from "../features/events/events.api";
import type { Event } from "../features/events/events.types";

type TimelineDateStatus = "all" | "dated" | "undated";
type TimelineParticipantStatus =
  | "all"
  | "with-participants"
  | "without-participants";

const TIMELINE_SEARCH_PARAM = "timelineSearch";
const TIMELINE_DATE_STATUS_PARAM = "timelineDateStatus";
const TIMELINE_PARTICIPANT_STATUS_PARAM = "timelineParticipantStatus";

const TIMELINE_SEARCH_HELP_ID = "timeline-search-help";
const TIMELINE_RESULTS_HEADING_ID = "timeline-results-heading";

function compareTimelineEvents(a: Event, b: Event) {
  const yearA = a.sortYear ?? Number.POSITIVE_INFINITY;
  const yearB = b.sortYear ?? Number.POSITIVE_INFINITY;

  if (yearA !== yearB) return yearA - yearB;

  const indexA = a.sortIndex ?? Number.POSITIVE_INFINITY;
  const indexB = b.sortIndex ?? Number.POSITIVE_INFINITY;

  if (indexA !== indexB) return indexA - indexB;

  const dateA = a.dateLabel ?? "";
  const dateB = b.dateLabel ?? "";

  const dateCompare = dateA.localeCompare(dateB);
  if (dateCompare !== 0) return dateCompare;

  return a.createdAt.localeCompare(b.createdAt);
}

function getTimelineDateLabel(event: Event) {
  if (event.dateLabel) return event.dateLabel;
  if (event.sortYear !== null) return String(event.sortYear);
  return "Undated";
}

function normalizeSearchValue(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function eventMatchesSearch(event: Event, search: string) {
  const normalizedSearch = normalizeSearchValue(search);

  if (!normalizedSearch) return true;

  const searchableValues = [
    event.title,
    event.summary,
    event.description,
    event.dateLabel,
    event.sortYear?.toString(),
    event.sortIndex?.toString(),
    ...event.participants.flatMap((participant) => [
      participant.roleLabel,
      participant.entity.name,
      participant.entity.type,
    ]),
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(normalizedSearch)
  );
}

function eventMatchesDateStatus(event: Event, status: TimelineDateStatus) {
  if (status === "all") return true;

  const hasDateData =
    Boolean(event.dateLabel?.trim()) ||
    event.sortYear !== null ||
    event.sortIndex !== null;

  if (status === "dated") return hasDateData;
  return !hasDateData;
}

function eventMatchesParticipantStatus(
  event: Event,
  status: TimelineParticipantStatus
) {
  if (status === "all") return true;

  const hasParticipants = event.participants.length > 0;

  if (status === "with-participants") return hasParticipants;
  return !hasParticipants;
}

function getTimelineDateStatus(value: string | null): TimelineDateStatus {
  if (value === "dated" || value === "undated") return value;
  return "all";
}

function getTimelineParticipantStatus(
  value: string | null
): TimelineParticipantStatus {
  if (value === "with-participants" || value === "without-participants") {
    return value;
  }

  return "all";
}

function getTimelineResultLabel(count: number): string {
  return count === 1 ? "1 timeline event" : `${count} timeline events`;
}

export default function WorldTimelinePage() {
  const { worldId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const resolvedWorldId = worldId ?? "";

  const timelineSearch = searchParams.get(TIMELINE_SEARCH_PARAM) ?? "";
  const timelineDateStatus = getTimelineDateStatus(
    searchParams.get(TIMELINE_DATE_STATUS_PARAM)
  );
  const timelineParticipantStatus = getTimelineParticipantStatus(
    searchParams.get(TIMELINE_PARTICIPANT_STATUS_PARAM)
  );

  const eventsQuery = useQuery({
    queryKey: ["world", resolvedWorldId, "events"],
    queryFn: () => getWorldEvents(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const sortedEvents = useMemo(() => {
    return [...(eventsQuery.data ?? [])].sort(compareTimelineEvents);
  }, [eventsQuery.data]);

  const visibleEvents = useMemo(() => {
    return sortedEvents
      .filter((event) => eventMatchesSearch(event, timelineSearch))
      .filter((event) => eventMatchesDateStatus(event, timelineDateStatus))
      .filter((event) =>
        eventMatchesParticipantStatus(event, timelineParticipantStatus)
      );
  }, [
    sortedEvents,
    timelineSearch,
    timelineDateStatus,
    timelineParticipantStatus,
  ]);

  const hasSearch = timelineSearch.trim().length > 0;
  const hasDateFilter = timelineDateStatus !== "all";
  const hasParticipantFilter = timelineParticipantStatus !== "all";
  const hasActiveControls = hasSearch || hasDateFilter || hasParticipantFilter;

  const hasEvents = sortedEvents.length > 0;
  const hasVisibleEvents = visibleEvents.length > 0;

  function updateTimelineParam(paramName: string, nextValue: string) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const trimmedValue = nextValue.trim();

      if (!trimmedValue || trimmedValue === "all") {
        nextParams.delete(paramName);
      } else {
        nextParams.set(paramName, nextValue);
      }

      return nextParams;
    });
  }

  function resetTimelineControls() {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      nextParams.delete(TIMELINE_SEARCH_PARAM);
      nextParams.delete(TIMELINE_DATE_STATUS_PARAM);
      nextParams.delete(TIMELINE_PARTICIPANT_STATUS_PARAM);

      return nextParams;
    });
  }

  if (!worldId) {
    return (
      <div className="page-shell">
        <Card>
          <div className="section-heading">
            <h1>Timeline Explorer</h1>
            <p>Missing world ID.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section
        className="page-section-stack"
        aria-labelledby={TIMELINE_RESULTS_HEADING_ID}
      >
        <div className="section-heading">
          <p className="muted-text-reset">World timeline</p>
          <h1 id={TIMELINE_RESULTS_HEADING_ID}>Timeline Explorer</h1>
          <p>
            Browse, search, and filter this world&apos;s events in chronological
            order.
          </p>
        </div>

        <div className="card-actions">
          <Link to={`/worlds/${worldId}`}>Back to world</Link>
        </div>

        <div
          className="form-stack"
          role="search"
          aria-label="Timeline browsing controls"
        >
          <label className="form-field">
            <span>Search timeline</span>
            <Input
              type="search"
              value={timelineSearch}
              onChange={(event) =>
                updateTimelineParam(TIMELINE_SEARCH_PARAM, event.target.value)
              }
              placeholder="Search by title, summary, description, or participant"
              aria-describedby={TIMELINE_SEARCH_HELP_ID}
            />
          </label>

          <p id={TIMELINE_SEARCH_HELP_ID} className="muted-text-reset">
            Search checks event titles, summaries, descriptions, date fields,
            participant names, participant types, and role labels.
          </p>

          <label className="form-field">
            <span>Filter by date status</span>
            <select
              value={timelineDateStatus}
              onChange={(event) =>
                updateTimelineParam(
                  TIMELINE_DATE_STATUS_PARAM,
                  event.target.value
                )
              }
            >
              <option value="all">All events</option>
              <option value="dated">Dated or sorted events</option>
              <option value="undated">Undated events</option>
            </select>
          </label>

          <label className="form-field">
            <span>Filter by participant status</span>
            <select
              value={timelineParticipantStatus}
              onChange={(event) =>
                updateTimelineParam(
                  TIMELINE_PARTICIPANT_STATUS_PARAM,
                  event.target.value
                )
              }
            >
              <option value="all">All events</option>
              <option value="with-participants">Events with participants</option>
              <option value="without-participants">
                Events without participants
              </option>
            </select>
          </label>

          {hasActiveControls ? (
            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={resetTimelineControls}
              >
                Clear timeline search and filters
              </Button>
            </div>
          ) : null}
        </div>

        {eventsQuery.isLoading ? (
          <StatusMessage variant="muted">Loading timeline...</StatusMessage>
        ) : null}

        {eventsQuery.error instanceof Error ? (
          <StatusMessage variant="error">
            {eventsQuery.error.message || "Timeline events could not be loaded."}
          </StatusMessage>
        ) : null}

        {!eventsQuery.isLoading && !eventsQuery.error && !hasEvents ? (
          <StatusMessage variant="muted">
            No timeline events yet. Return to the world page to create the first
            event in this world.
          </StatusMessage>
        ) : null}

        {!eventsQuery.isLoading &&
        !eventsQuery.error &&
        hasEvents &&
        hasActiveControls ? (
          <StatusMessage variant={hasVisibleEvents ? "muted" : "error"}>
            {hasVisibleEvents
              ? `Showing ${getTimelineResultLabel(
                  visibleEvents.length
                )} matching the current timeline controls.`
              : "No timeline events match your current search or filters. Clear the controls to show the full timeline."}
          </StatusMessage>
        ) : null}

        {!eventsQuery.isLoading &&
        !eventsQuery.error &&
        hasEvents &&
        !hasActiveControls ? (
          <StatusMessage variant="muted">
            Showing all {getTimelineResultLabel(visibleEvents.length)}.
          </StatusMessage>
        ) : null}

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {hasEvents
            ? `${getTimelineResultLabel(visibleEvents.length)} currently shown.`
            : "No timeline events currently shown."}
        </div>

        {!eventsQuery.isLoading &&
          !eventsQuery.error &&
          hasEvents &&
          visibleEvents.map((timelineEvent) => (
            <Card
              key={timelineEvent.id}
              className="surface-card timeline-event-card"
            >
              <div className="card-title-row">
                <div>
                  <p className="muted-text-reset">
                    {getTimelineDateLabel(timelineEvent)}
                  </p>
                  <h2 className="text-reset">{timelineEvent.title}</h2>
                </div>
              </div>

              <div className="meta-row">
                <span className="meta-pill">
                  <strong>Date:</strong>{" "}
                  {timelineEvent.dateLabel ?? "No date label"}
                </span>
                <span className="meta-pill">
                  <strong>Year:</strong>{" "}
                  {timelineEvent.sortYear !== null
                    ? timelineEvent.sortYear
                    : "None"}
                </span>
                <span className="meta-pill">
                  <strong>Index:</strong>{" "}
                  {timelineEvent.sortIndex !== null
                    ? timelineEvent.sortIndex
                    : "None"}
                </span>
              </div>

              <div className="card-content-stack">
                <p className="text-reset">
                  {timelineEvent.summary ?? "No summary."}
                </p>
                <p className="muted-text-reset">
                  {timelineEvent.description ?? "No description."}
                </p>
              </div>

              <div className="divider-top card-content-stack">
                <h3 className="subsection-title">Participants</h3>

                {timelineEvent.participants.length === 0 ? (
                  <StatusMessage variant="muted">
                    No participants attached.
                  </StatusMessage>
                ) : (
                  <ul
                    className="participant-list"
                    aria-label={`${timelineEvent.title} participants`}
                  >
                    {timelineEvent.participants.map((participant) => (
                      <li key={participant.id} className="participant-item">
                        <Link to={`/entities/${participant.entity.id}`}>
                          {participant.entity.name}
                        </Link>

                        <span className="meta-pill">
                          {participant.entity.type}
                        </span>

                        {participant.roleLabel ? (
                          <span className="muted-text">
                            {participant.roleLabel}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          ))}
      </section>
    </div>
  );
}