import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EntityCreateSectionProps } from "./types";
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

export function EntityCreateSection({
  values,
  isCreating,
  errorMessage,
  onChange,
  onSubmit,
}: EntityCreateSectionProps) {
  return (
    <Card>
      <div className="section-heading">
        <h2>Create Entity</h2>
        <p>Add characters, locations, factions, artifacts, and more.</p>
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
          placeholder="Name"
          value={values.name}
          onChange={(event) => onChange({ ...values, name: event.target.value })}
        />

        <Input
          placeholder="Summary"
          value={values.summary}
          onChange={(event) =>
            onChange({ ...values, summary: event.target.value })
          }
        />

        <Textarea
          placeholder="Description"
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
        />

        <Textarea
          placeholder="Notes"
          value={values.notes}
          onChange={(event) =>
            onChange({ ...values, notes: event.target.value })
          }
        />

        <Input
          placeholder="Tags (comma separated)"
          value={values.tags}
          onChange={(event) => onChange({ ...values, tags: event.target.value })}
        />

        {errorMessage ? (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        ) : null}

        <div className="form-actions">
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Entity"}
          </Button>
        </div>
      </form>
    </Card>
  );
}