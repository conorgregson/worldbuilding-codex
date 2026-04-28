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
            <label className="form-field">
              <span>Event title</span>
              <Input
                value={values.title}
                onChange={(event) =>
                  onChange({ ...values, title: event.target.value })
                }
                placeholder="Event title"
                required
              />
            </label>

            <label className="form-field">
              <span>Date label</span>
              <Input
                value={values.dateLabel}
                onChange={(event) =>
                  onChange({ ...values, dateLabel: event.target.value })
                }
                placeholder="Date label (e.g. Year 312, Winter)"
              />
            </label>

            <label className="form-field">
              <span>Sort year</span>
              <Input
                value={values.sortYear}
                onChange={(event) =>
                  onChange({ ...values, sortYear: event.target.value })
                }
                placeholder="Sort year"
                type="number"
              />
            </label>

            <label className="form-field">
              <span>Sort index</span>
              <Input
                value={values.sortIndex}
                onChange={(event) =>
                  onChange({ ...values, sortIndex: event.target.value })
                }
                placeholder="Sort index"
                type="number"
              />
            </label>

            <label className="form-field">
              <span>Summary</span>
              <Input
                value={values.summary}
                onChange={(event) =>
                  onChange({ ...values, summary: event.target.value })
                }
                placeholder="Summary"
              />
            </label>

            <label className="form-field">
              <span>Description</span>
              <Textarea
                value={values.description}
                onChange={(event) =>
                  onChange({ ...values, description: event.target.value })
                }
                placeholder="Description"
              />
            </label>

            <div className="page-subsection-stack">
              <div className="section-heading">
                <h3>Participants</h3>
                <p>
                  Link entities to this event and describe their role in what
                  happened.
                </p>
              </div>

              {values.participants.length === 0 ? (
                <StatusMessage variant="muted">
                  No participants added yet.
                </StatusMessage>
              ) : null}

              {values.participants.map((participant, index) => (
                <Card key={`${participant.entityId}-${index}`} className="nested-surface">
                  <div className="nested-stack">
                    <label className="form-field">
                      <span>Participant entity</span>
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
                    </label>

                    <label className="form-field">
                      <span>Participant role</span>
                      <Input
                        value={participant.roleLabel ?? ""}
                        onChange={(event) =>
                          onUpdateParticipant(index, "roleLabel", event.target.value)
                        }
                        placeholder="Role label (e.g. Witness, Commander)"
                      />
                    </label>

                    <div className="form-actions">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onRemoveParticipant(index)}
                        aria-label={`Remove participant ${index + 1}`}
                      >
                        Remove Participant
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="form-actions">
                <Button type="button" variant="secondary" onClick={onAddParticipant}>
                  Add Participant
                </Button>
              </div>
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