import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { StatusMessage } from "../components/ui/StatusMessage";
import { getWorldEvents } from "../features/events/events.api";
import type { Event } from "../features/events/events.types";

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

export default function WorldTimelinePage() {
  const { worldId } = useParams<{ worldId: string }>();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTimelineEvents() {
      if (!worldId) {
        setIsLoading(false);
        setErrorMessage("World not found.");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);

        const timelineEvents = await getWorldEvents(worldId);

        if (isMounted) {
          setEvents(timelineEvents);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Timeline events could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTimelineEvents();

    return () => {
      isMounted = false;
    };
  }, [worldId]);

  const sortedEvents = useMemo(() => {
    return [...events].sort(compareTimelineEvents);
  }, [events]);

  if (!worldId) {
    return (
      <main className="page">
        <Card>
          <div className="section-heading">
            <h1>Timeline</h1>
            <p>World not found.</p>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="page">
      <Card>
        <div className="section-heading">
          <div>
            <p className="muted-text-reset">World timeline</p>
            <h1>Timeline</h1>
            <p>
              Browse this world&apos;s events in chronological order by year,
              index, and date label.
            </p>
          </div>

          <div className="card-actions">
            <Link to={`/worlds/${worldId}`}>Back to world</Link>
          </div>
        </div>

        {isLoading ? (
          <StatusMessage variant="muted">Loading timeline...</StatusMessage>
        ) : null}

        {errorMessage ? (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        ) : null}

        {!isLoading && !errorMessage && sortedEvents.length === 0 ? (
          <StatusMessage variant="muted">
            No timeline events yet. Return to the world page to create the first
            event in this world.
          </StatusMessage>
        ) : null}

        {!isLoading && !errorMessage && sortedEvents.length > 0 ? (
          <section aria-label="Timeline events" className="page-subsection-stack">
            {sortedEvents.map((event) => (
              <Card key={event.id} className="surface-card">
                <div className="card-title-row">
                  <div>
                    <p className="muted-text-reset">
                      {getTimelineDateLabel(event)}
                    </p>
                    <h2 className="text-reset">{event.title}</h2>
                  </div>
                </div>

                <div className="meta-row">
                  <span className="meta-pill">
                    <strong>Date:</strong> {event.dateLabel ?? "No date label"}
                  </span>
                  <span className="meta-pill">
                    <strong>Year:</strong>{" "}
                    {event.sortYear !== null ? event.sortYear : "None"}
                  </span>
                  <span className="meta-pill">
                    <strong>Index:</strong>{" "}
                    {event.sortIndex !== null ? event.sortIndex : "None"}
                  </span>
                </div>

                <div className="card-content-stack">
                  <p className="text-reset">{event.summary ?? "No summary."}</p>
                  <p className="muted-text-reset">
                    {event.description ?? "No description."}
                  </p>
                </div>

                <div className="divider-top card-content-stack">
                  <strong>Participants</strong>

                  {event.participants.length === 0 ? (
                    <StatusMessage variant="muted">No participants.</StatusMessage>
                  ) : (
                    <div className="page-subsection-stack">
                      {event.participants.map((participant) => (
                        <p key={participant.id} className="text-reset">
                          <Link to={`/entities/${participant.entity.id}`}>
                            {participant.entity.name}
                          </Link>{" "}
                          <span className="muted-text">
                            ({participant.entity.type})
                          </span>
                          {participant.roleLabel
                            ? ` — ${participant.roleLabel}`
                            : ""}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </section>
        ) : null}
      </Card>
    </main>
  );
}