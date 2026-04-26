import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EntityEditSectionProps } from "./types";
import type { EntityType } from "../entities/entities.types";

const entityTypeOptions: EntityType[] = [
  "CHARACTER",
  "LOCATION",
  "FACTION",
  "SPECIES",
  "RELIGION",
  "LANGUAGE",
  "ARTIFACT",
  "ORGANIZATION",
  "CULTURE",
  "OTHER",
];

export function EntityEditSection({
  values,
  isDirty,
  isSaving,
  successMessage,
  errorMessage,
  onChange,
  onSubmit,
  onReset,
}: EntityEditSectionProps) {
  return (
    <Card>
      <div className="section-heading">
        <h2>Edit Entity</h2>
        <p>Update the core details for this entity.</p>
      </div>

      <form
        className="form-stack"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <select
          value={values.type}
          onChange={(event) =>
            onChange({ ...values, type: event.target.value as EntityType })
          }
        >
          {entityTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <Input
          value={values.name}
          onChange={(event) => onChange({ ...values, name: event.target.value })}
          placeholder="Name"
        />

        <Input
          value={values.summary}
          onChange={(event) =>
            onChange({ ...values, summary: event.target.value })
          }
          placeholder="Summary"
        />

        <Textarea
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
          placeholder="Description"
        />

        <Textarea
          value={values.notes}
          onChange={(event) =>
            onChange({ ...values, notes: event.target.value })
          }
          placeholder="Notes"
        />

        <Input
          value={values.tags}
          onChange={(event) => onChange({ ...values, tags: event.target.value })}
          placeholder="Tags (comma separated)"
        />

        {successMessage ? (
          <StatusMessage variant="success">{successMessage}</StatusMessage>
        ) : null}

        {errorMessage ? (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        ) : null}

        <div className="form-actions">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
            disabled={!isDirty}
          >
            Reset Unsaved Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}