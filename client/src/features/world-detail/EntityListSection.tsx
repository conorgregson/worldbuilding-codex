import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EntityListSectionProps } from "./types";

export function EntityListSection({
  entities,
  isLoading,
  errorMessage,
}: EntityListSectionProps) {
  return (
    <div className="page-section-stack">
      <div className="section-heading">
        <h2>Entities</h2>
        <p>Browse the people, places, factions, artifacts, and cultures in this world.</p>
      </div>

      {isLoading ? (
        <StatusMessage variant="muted">Loading entities...</StatusMessage>
      ) : null}

      {errorMessage ? (
        <StatusMessage variant="error">{errorMessage}</StatusMessage>
      ) : null}

      {!isLoading && !errorMessage && entities.length === 0 ? (
        <StatusMessage variant="muted">
          No entities yet. Create the first entity in this world.
        </StatusMessage>
      ) : null}

      {entities.map((entity) => (
        <Card key={entity.id} className="surface-card">
          <div className="card-content-stack">
            <h3 className="text-reset">
              <Link to={`/entities/${entity.id}`}>{entity.name}</Link>{" "}
              <span className="muted-text">({entity.type})</span>
            </h3>

            <p className="text-reset">{entity.summary ?? "No summary."}</p>

            <p className="muted-text-reset">
              Tags:{" "}
              {entity.tags.length > 0
                ? entity.tags.map((tag) => tag.tag).join(", ")
                : "None"}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}