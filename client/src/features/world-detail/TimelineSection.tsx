import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { TimelineSectionProps } from "./types";

export function TimelineSection({
  events,
  isLoading,
  errorMessage,
  isDeleting,
  onEdit,
  onDelete,
}: TimelineSectionProps) {
  return (
    <Card>
      <div className="section-heading">
        <h2>Timeline</h2>
        <p>Events are ordered by year and index to create a world chronology.</p>
      </div>

      {isLoading ? (
        <StatusMessage variant="muted">Loading timeline...</StatusMessage>
      ) : null}

      {errorMessage ? (
        <StatusMessage variant="error">{errorMessage}</StatusMessage>
      ) : null}

      {!isLoading && !errorMessage && events.length === 0 ? (
        <StatusMessage variant="muted">
          No events yet. Create the first event in this world.
        </StatusMessage>
      ) : null}

      <div className="page-subsection-stack">
        {events.map((timelineEvent) => (
          <Card key={timelineEvent.id} className="surface-card">
            <div className="card-title-row">
              <h3 className="text-reset">{timelineEvent.title}</h3>
            </div>

            <div className="meta-row">
              <span className="meta-pill">
                <strong>Date:</strong> {timelineEvent.dateLabel ?? "No date label"}
              </span>
              <span className="meta-pill">
                <strong>Year:</strong>{" "}
                {timelineEvent.sortYear !== null ? timelineEvent.sortYear : "None"}
              </span>
              <span className="meta-pill">
                <strong>Index:</strong>{" "}
                {timelineEvent.sortIndex !== null ? timelineEvent.sortIndex : "None"}
              </span>
            </div>

            <div className="card-content-stack">
              <p className="text-reset">{timelineEvent.summary ?? "No summary."}</p>
              <p className="muted-text-reset">
                {timelineEvent.description ?? "No description."}
              </p>
            </div>

            <div className="divider-top card-content-stack">
              <strong>Participants</strong>

              {timelineEvent.participants.length === 0 ? (
                <StatusMessage variant="muted">No participants.</StatusMessage>
              ) : (
                <div className="page-subsection-stack">
                  {timelineEvent.participants.map((participant) => (
                    <p key={participant.id} className="text-reset">
                      <Link to={`/entities/${participant.entity.id}`}>
                        {participant.entity.name}
                      </Link>{" "}
                      <span className="muted-text">({participant.entity.type})</span>
                      {participant.roleLabel ? ` — ${participant.roleLabel}` : ""}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="card-actions">
              <Button type="button" variant="secondary" onClick={() => onEdit(timelineEvent)}>
                Edit Event
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={() => onDelete(timelineEvent.id)}
                disabled={isDeleting}
                aria-label={`Delete event ${timelineEvent.title}`}
              >
                {isDeleting ? "Deleting..." : "Delete Event"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}