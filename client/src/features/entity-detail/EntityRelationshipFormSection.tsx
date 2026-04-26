import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EntityRelationshipFormSectionProps } from "./types";

export function EntityRelationshipFormSection({
  currentEntity,
  entities,
  values,
  isCreating,
  successMessage,
  errorMessage,
  onChange,
  onSubmit,
}: EntityRelationshipFormSectionProps) {
  const availableTargets = entities.filter(
    (candidate) => candidate.id !== currentEntity.id
  );

  const canCreateRelationship = availableTargets.length > 0;

  return (
    <Card>
      <h2>Create Relationship</h2>
      <p style={{ marginTop: 0, color: "#d1d5db" }}>
        Connect this entity to others in the same world.
      </p>

      {!canCreateRelationship ? (
        <StatusMessage variant="muted">
          Create at least one more entity in this world before adding relationships.
        </StatusMessage>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "grid", gap: 12 }}
      >
        <p>
          Source Entity: <strong>{currentEntity.name}</strong>
        </p>

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

        <Input
          value={values.relationshipType}
          onChange={(event) =>
            onChange({ ...values, relationshipType: event.target.value })
          }
          placeholder="Relationship type (e.g. member of, allied with, located in)"
          disabled={!canCreateRelationship || isCreating}
        />

        <Textarea
          value={values.note}
          onChange={(event) => onChange({ ...values, note: event.target.value })}
          placeholder="Optional note"
          disabled={!canCreateRelationship || isCreating}
        />

        {successMessage ? (
          <StatusMessage variant="success">{successMessage}</StatusMessage>
        ) : null}

        {errorMessage ? (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        ) : null}

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
      </form>
    </Card>
  );
}