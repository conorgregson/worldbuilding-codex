import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import type { EntitySummarySectionProps } from "./types";

export function EntitySummarySection({
  entity,
  isDeleting,
  onBackToWorld,
  onDelete,
}: EntitySummarySectionProps) {
  return (
    <Card>
      <div className="summary-card">
        <div className="card-content-stack">
          <h1 className="summary-title">{entity.name}</h1>

          <div className="meta-row">
            <span className="meta-pill">
              <strong>Type:</strong> {entity.type}
            </span>
            <span className="meta-pill">
              <strong>Tags:</strong>{" "}
              {entity.tags.length > 0
                ? entity.tags.map((tag) => tag.tag).join(", ")
                : "None"}
            </span>
          </div>

          <p className="text-reset">{entity.summary ?? "No summary."}</p>
          <p className="muted-text-reset">{entity.description ?? "No description."}</p>
          <p className="muted-text-reset">{entity.notes ?? "No notes."}</p>
        </div>

        <div className="summary-actions">
          <Button type="button" variant="secondary" onClick={onBackToWorld}>
            Back to World
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Entity"}
          </Button>
        </div>
      </div>
    </Card>
  );
}