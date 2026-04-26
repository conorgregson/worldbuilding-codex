import { forwardRef } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { WorldEditSectionProps } from "./types";

export const WorldEditSection = forwardRef<HTMLDivElement, WorldEditSectionProps>(
  function WorldEditSection(
    { values, isSaving, errorMessage, onChange, onSubmit },
    ref
  ) {
    return (
      <div ref={ref}>
        <Card>
          <div className="section-heading">
            <h2>Edit World</h2>
            <p>Update this world’s title, genre, and description.</p>
          </div>

          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <Input
              placeholder="World title"
              value={values.title}
              onChange={(event) =>
                onChange({ ...values, title: event.target.value })
              }
            />

            <Input
              placeholder="Genre"
              value={values.genre}
              onChange={(event) =>
                onChange({ ...values, genre: event.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              value={values.description}
              onChange={(event) =>
                onChange({ ...values, description: event.target.value })
              }
            />

            {errorMessage ? (
              <StatusMessage variant="error">{errorMessage}</StatusMessage>
            ) : null}

            <div className="form-actions">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save World Changes"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
);