import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import type { WorldSummarySectionProps } from "./types";

export function WorldSummarySection({
  world,
  isDeleting,
  onBackToWorlds,
  onLoadIntoEditForm,
  onDelete,
}: WorldSummarySectionProps) {
  return (
    <Card>
      <div className="summary-card">
        <div className="card-content-stack">
          <h1 className="summary-title">{world.title}</h1>
          <p className="muted-text-reset">{world.genre ?? "No genre set"}</p>
          <p className="text-reset">{world.description ?? "No description yet."}</p>
        </div>

        <div className="summary-actions summary-actions--split">
          <div className="summary-actions__group">
            <Button type="button" variant="secondary" onClick={onLoadIntoEditForm}>
              Load into Edit Form
            </Button>

            <Button
              type="button"
              variant="danger"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete World"}
            </Button>
          </div>

          <Button type="button" variant="secondary" onClick={onBackToWorlds}>
            Back to Worlds
          </Button>
        </div>
      </div>
    </Card>
  );
}