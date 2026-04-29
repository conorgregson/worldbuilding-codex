import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { Entity } from "../entities/entities.types";
import type { EntityListSectionProps } from "./types";

const ENTITY_SEARCH_PARAM = "entitySearch";

function normalizeSearchValue(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function entityMatchesSearch(entity: Entity, searchQuery: string): boolean {
  const normalizedQuery = normalizeSearchValue(searchQuery);

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    entity.name,
    entity.type,
    entity.summary,
    entity.description,
    entity.notes,
    ...entity.tags.map((tag) => tag.tag),
  ]
    .map(normalizeSearchValue)
    .join(" ");

  return searchableText.includes(normalizedQuery);
}

function getEntityResultLabel(count: number): string {
  return count === 1 ? "1 entity" : `${count} entities`;
}

export function EntityListSection({
  entities,
  isLoading,
  errorMessage,
}: EntityListSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const entitySearch = searchParams.get(ENTITY_SEARCH_PARAM) ?? "";

  const visibleEntities = entities.filter((entity) =>
    entityMatchesSearch(entity, entitySearch)
  );

  const hasSearch = entitySearch.trim().length > 0;
  const hasEntities = entities.length > 0;
  const hasVisibleEntities = visibleEntities.length > 0;

  function updateEntitySearch(nextSearch: string) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const trimmedSearch = nextSearch.trim();

      if (trimmedSearch) {
        nextParams.set(ENTITY_SEARCH_PARAM, nextSearch);
      } else {
        nextParams.delete(ENTITY_SEARCH_PARAM);
      }

      return nextParams;
    });
  }

  function clearEntitySearch() {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.delete(ENTITY_SEARCH_PARAM);
      return nextParams;
    });
  }

  return (
    <div className="page-section-stack">
      <div className="section-heading">
        <h2>Entities</h2>
        <p>
          Browse the people, places, factions, artifacts, and cultures in this
          world.
        </p>
      </div>

      <div className="form-stack" role="search" aria-label="Entity search">
        <label className="form-field">
          <span>Search entities</span>
          <Input
            type="search"
            value={entitySearch}
            onChange={(event) => updateEntitySearch(event.target.value)}
            placeholder="Search by name, summary, description, notes, or tag"
          />
        </label>

        {hasSearch ? (
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={clearEntitySearch}>
              Clear search
            </Button>
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <StatusMessage variant="muted">Loading entities...</StatusMessage>
      ) : null}

      {errorMessage ? (
        <StatusMessage variant="error">{errorMessage}</StatusMessage>
      ) : null}

      {!isLoading && !errorMessage && !hasEntities ? (
        <StatusMessage variant="muted">
          No entities yet. Create the first entity in this world.
        </StatusMessage>
      ) : null}

      {!isLoading && !errorMessage && hasEntities && hasSearch ? (
        <StatusMessage variant={hasVisibleEntities ? "muted" : "error"}>
          {hasVisibleEntities
            ? `Showing ${getEntityResultLabel(
                visibleEntities.length
              )} matching “${entitySearch}”.`
            : `No entities match “${entitySearch}”. Clear the search to show all entities.`}
        </StatusMessage>
      ) : null}

      {!isLoading &&
        !errorMessage &&
        hasEntities &&
        visibleEntities.map((entity) => (
          <Card key={entity.id} className="surface-card">
            <div className="card-content-stack">
              <h3 className="text-reset">
                <Link to={`/entities/${entity.id}`}>{entity.name}</Link>{" "}
                <span className="muted-text">({entity.type})</span>
              </h3>

              <p className="text-reset">{entity.summary ?? "No summary."}</p>

              <p className="muted-text-reset">
                Tags:{" "}
                {entity.tags.length > 0
                  ? entity.tags.map((tag) => tag.tag).join(", ")
                  : "None"}
              </p>
            </div>
          </Card>
        ))}
    </div>
  );
}