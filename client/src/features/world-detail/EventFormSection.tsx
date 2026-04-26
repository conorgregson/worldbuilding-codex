import { forwardRef } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { EventFormSectionProps } from "./types";

export const EventFormSection = forwardRef<HTMLDivElement, EventFormSectionProps>(
  function EventFormSection(
    {
      values,
      entities,
      isSaving,
      successMessage,
      errorMessage,
      onChange,
      onSubmit,
      onCancelEdit,
      onAddParticipant,
      onRemoveParticipant,
      onUpdateParticipant,
    },
    ref
  ) {
    return (
      <div ref={ref}>
        <Card>
          <div className="section-heading">
            <h2>{values.editingEventId ? "Edit Event" : "Create Event"}</h2>
            <p>Record important historical moments and their participants.</p>
          </div>

          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <Input
              value={values.title}
              onChange={(event) => onChange({ ...values, title: event.target.value })}
              placeholder="Event title"
            />

            <Input
              value={values.dateLabel}
              onChange={(event) =>
                onChange({ ...values, dateLabel: event.target.value })
              }
              placeholder="Date label (e.g. Year 312, Winter)"
            />

            <Input
              value={values.sortYear}
              onChange={(event) =>
                onChange({ ...values, sortYear: event.target.value })
              }
              placeholder="Sort year"
              type="number"
            />

            <Input
              value={values.sortIndex}
              onChange={(event) =>
                onChange({ ...values, sortIndex: event.target.value })
              }
              placeholder="Sort index"
              type="number"
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

            <div className="page-subsection-stack">
              <h3 className="subsection-title">Participants</h3>

              {values.participants.map((participant, index) => (
                <Card key={index} className="nested-surface">
                  <div className="nested-stack">
                    <select
                      value={participant.entityId}
                      onChange={(event) =>
                        onUpdateParticipant(index, "entityId", event.target.value)
                      }
                    >
                      <option value="">Select entity</option>
                      {entities.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} ({candidate.type})
                        </option>
                      ))}
                    </select>

                    <Input
                      value={participant.roleLabel ?? ""}
                      onChange={(event) =>
                        onUpdateParticipant(index, "roleLabel", event.target.value)
                      }
                      placeholder="Role label (e.g. Witness, Commander)"
                    />

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onRemoveParticipant(index)}
                    >
                      Remove Participant
                    </Button>
                  </div>
                </Card>
              ))}

              <Button type="button" variant="secondary" onClick={onAddParticipant}>
                Add Participant
              </Button>
            </div>

            {successMessage ? (
              <StatusMessage variant="success">{successMessage}</StatusMessage>
            ) : null}

            {errorMessage ? (
              <StatusMessage variant="error">{errorMessage}</StatusMessage>
            ) : null}

            <div className="form-actions">
              <Button type="submit" disabled={isSaving || !values.title.trim()}>
                {isSaving
                  ? "Saving..."
                  : values.editingEventId
                    ? "Save Event Changes"
                    : "Create Event"}
              </Button>

              {values.editingEventId ? (
                <Button type="button" variant="secondary" onClick={onCancelEdit}>
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </Card>
      </div>
    );
  }
);