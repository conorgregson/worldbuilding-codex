import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EntityRelationshipsSectionProps } from "./types";

export function EntityRelationshipsSection({
  currentEntity,
  relationships,
  isLoading,
  errorMessage,
  isDeleting,
  onDeleteRelationship,
}: EntityRelationshipsSectionProps) {
  return (
    <>
      <Card>
        <div className="section-heading">
          <h2>Outgoing Relationships</h2>
          <p>Links that start from this entity and point to others.</p>
        </div>

        {isLoading ? (
          <StatusMessage variant="muted">Loading relationships...</StatusMessage>
        ) : null}

        {errorMessage ? (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        ) : null}

        {!isLoading && !errorMessage && relationships?.outgoing.length === 0 ? (
          <StatusMessage variant="muted">
            No outgoing relationships yet.
          </StatusMessage>
        ) : null}

        <div className="page-subsection-stack">
          {relationships?.outgoing.map((relationship) => (
            <Card key={relationship.id} className="surface-card">
              <div className="card-content-stack">
                <p className="text-reset">
                  <strong>{currentEntity.name}</strong>{" "}
                  <span className="muted-text">→</span>{" "}
                  <strong style={{ color: "#bfdbfe" }}>{relationship.relationshipType}</strong>{" "}
                  <span className="muted-text">→</span>{" "}
                  <Link to={`/entities/${relationship.targetEntity.id}`}>
                    {relationship.targetEntity.name}
                  </Link>{" "}
                  <span className="muted-text">({relationship.targetEntity.type})</span>
                </p>

                <p className="muted-text-reset">{relationship.note ?? "No note."}</p>
              </div>

              <div className="card-actions">
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => onDeleteRelationship(relationship.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Relationship"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card>
        <div className="section-heading">
          <h2>Incoming Relationships</h2>
          <p>Links created by other entities that point to this one.</p>
        </div>

        {!isLoading && !errorMessage && relationships?.incoming.length === 0 ? (
          <StatusMessage variant="muted">
            No incoming relationships yet.
          </StatusMessage>
        ) : null}

        <div className="page-subsection-stack">
          {relationships?.incoming.map((relationship) => (
            <Card key={relationship.id} className="surface-card">
              <div className="card-content-stack">
                <p className="text-reset">
                  <Link to={`/entities/${relationship.sourceEntity.id}`}>
                    {relationship.sourceEntity.name}
                  </Link>{" "}
                  <span className="muted-text">({relationship.sourceEntity.type})</span>{" "}
                  <span className="muted-text">→</span>{" "}
                  <strong style={{ color: "#bfdbfe" }}>{relationship.relationshipType}</strong>{" "}
                  <span className="muted-text">→</span>{" "}
                  <strong>{currentEntity.name}</strong>
                </p>

                <p className="muted-text-reset">{relationship.note ?? "No note."}</p>
              </div>

              <div className="card-actions">
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => onDeleteRelationship(relationship.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Relationship"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </>
  );
}