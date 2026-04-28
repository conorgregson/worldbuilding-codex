import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { RelationshipExplorerSectionProps } from "./types";

export function RelationshipExplorerSection({
  entities,
  relationships,
  isRelationshipsLoading,
  relationshipsErrorMessage,
  values,
  successMessage,
  errorMessage,
  isCreating,
  isDeleting,
  onChange,
  onSubmit,
  onDeleteRelationship,
}: RelationshipExplorerSectionProps) {
  const selectedEntity =
    entities.find((entity) => entity.id === values.selectedEntityId) ?? null;

  const availableTargets = entities.filter(
    (entity) => entity.id !== values.selectedEntityId
  );

  const canCreateRelationship =
    Boolean(values.selectedEntityId) && availableTargets.length > 0;

  return (
    <>
      <Card>
        <div className="section-heading">
          <h2>Relationship Explorer</h2>
          <p>Select an entity to create and inspect incoming or outgoing links.</p>
        </div>

        <label className="form-field">
          <span>Entity to manage</span>
          <select
            value={values.selectedEntityId}
            onChange={(event) =>
              onChange({
                ...values,
                selectedEntityId: event.target.value,
                targetEntityId: "",
                relationshipType: "",
                note: "",
              })
            }
          >
            <option value="">Select an entity to manage relationships</option>
            {entities.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.type})
              </option>
            ))}
          </select>
        </label>
      </Card>

      {selectedEntity ? (
        <>
          <Card>
            <div className="section-heading">
              <h2>Create Relationship</h2>
            </div>

            {!canCreateRelationship ? (
              <StatusMessage variant="muted">
                Create at least one more entity in this world before adding
                relationships.
              </StatusMessage>
            ) : null}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
              }}
              className="form-stack"
            >
              <p className="text-reset">
                Source Entity: <strong>{selectedEntity.name}</strong>
              </p>

              <label className="form-field">
                <span>Related entity</span>
                <select
                  value={values.targetEntityId}
                  onChange={(event) =>
                    onChange({ ...values, targetEntityId: event.target.value })
                  }
                  disabled={!canCreateRelationship || isCreating}
                >
                  <option value="">Select related entity</option>
                  {availableTargets.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name} ({candidate.type})
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Relationship type</span>
                <Input
                  value={values.relationshipType}
                  onChange={(event) =>
                    onChange({
                      ...values,
                      relationshipType: event.target.value,
                    })
                  }
                  placeholder="Relationship type (e.g. member of, allied with, located in)"
                  disabled={!canCreateRelationship || isCreating}
                />
              </label>

              <label className="form-field">
                <span>Relationship note</span>
                <Textarea
                  value={values.note}
                  onChange={(event) =>
                    onChange({ ...values, note: event.target.value })
                  }
                  placeholder="Optional note"
                  disabled={!canCreateRelationship || isCreating}
                />
              </label>

              {successMessage ? (
                <StatusMessage variant="success">{successMessage}</StatusMessage>
              ) : null}

              {errorMessage ? (
                <StatusMessage variant="error">{errorMessage}</StatusMessage>
              ) : null}

              <div className="form-actions">
                <Button
                  type="submit"
                  disabled={
                    isCreating ||
                    !canCreateRelationship ||
                    !values.targetEntityId ||
                    !values.relationshipType.trim()
                  }
                >
                  {isCreating ? "Creating..." : "Create Relationship"}
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2>Outgoing Relationships</h2>

            {isRelationshipsLoading ? (
              <StatusMessage variant="muted">
                Loading relationships...
              </StatusMessage>
            ) : null}

            {relationshipsErrorMessage ? (
              <StatusMessage variant="error">
                {relationshipsErrorMessage}
              </StatusMessage>
            ) : null}

            {!isRelationshipsLoading &&
            !relationshipsErrorMessage &&
            relationships?.outgoing.length === 0 ? (
              <StatusMessage variant="muted">
                No outgoing relationships yet.
              </StatusMessage>
            ) : null}

            <div className="page-subsection-stack">
              {relationships?.outgoing.map((relationship) => (
                <Card key={relationship.id}>
                  <p className="text-reset">
                    <strong>{selectedEntity.name}</strong> →{" "}
                    <strong>{relationship.relationshipType}</strong> →{" "}
                    <Link to={`/entities/${relationship.targetEntity.id}`}>
                      {relationship.targetEntity.name}
                    </Link>{" "}
                    <small>({relationship.targetEntity.type})</small>
                  </p>

                  <p>{relationship.note ?? "No note."}</p>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => onDeleteRelationship(relationship.id)}
                    disabled={isDeleting}
                    aria-label={`Delete outgoing relationship from ${selectedEntity.name} to ${relationship.targetEntity.name}`}
                  >
                    {isDeleting ? "Deleting..." : "Delete Relationship"}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

          <Card>
            <h2>Incoming Relationships</h2>

            {!isRelationshipsLoading &&
            !relationshipsErrorMessage &&
            relationships?.incoming.length === 0 ? (
              <StatusMessage variant="muted">
                No incoming relationships yet.
              </StatusMessage>
            ) : null}

            <div className="page-subsection-stack">
              {relationships?.incoming.map((relationship) => (
                <Card key={relationship.id}>
                  <p className="text-reset">
                    <Link to={`/entities/${relationship.sourceEntity.id}`}>
                      {relationship.sourceEntity.name}
                    </Link>{" "}
                    <small>({relationship.sourceEntity.type})</small> →{" "}
                    <strong>{relationship.relationshipType}</strong> →{" "}
                    <strong>{selectedEntity.name}</strong>
                  </p>

                  <p>{relationship.note ?? "No note."}</p>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => onDeleteRelationship(relationship.id)}
                    disabled={isDeleting}
                    aria-label={`Delete incoming relationship from ${relationship.sourceEntity.name} to ${selectedEntity.name}`}
                  >
                    {isDeleting ? "Deleting..." : "Delete Relationship"}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </>
      ) : null}
    </>
  );
}