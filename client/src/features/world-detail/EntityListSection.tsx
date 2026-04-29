import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { StatusMessage } from "../../components/ui/StatusMessage";
import type { Entity, EntityType } from "../entities/entities.types";
import type { EntityListSectionProps } from "./types";

const ENTITY_SEARCH_PARAM = "entitySearch";
const ENTITY_TYPE_PARAM = "entityType";
const ENTITY_TAG_PARAM = "entityTag";
const ENTITY_SORT_PARAM = "entitySort";

const ENTITY_TYPES: EntityType[] = [
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

const ENTITY_SORT_OPTIONS = ["name", "type", "updated"] as const;

type EntitySortOption = (typeof ENTITY_SORT_OPTIONS)[number];

function normalizeSearchValue(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function formatEntityType(type: EntityType): string {
  return type
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isEntityType(value: string): value is EntityType {
  return ENTITY_TYPES.includes(value as EntityType);
}

function isEntitySortOption(value: string): value is EntitySortOption {
  return ENTITY_SORT_OPTIONS.includes(value as EntitySortOption);
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

function entityMatchesType(entity: Entity, selectedType: string): boolean {
  if (!selectedType) {
    return true;
  }

  return entity.type === selectedType;
}

function entityMatchesTag(entity: Entity, selectedTag: string): boolean {
  const normalizedSelectedTag = normalizeSearchValue(selectedTag);

  if (!normalizedSelectedTag) {
    return true;
  }

  return entity.tags.some(
    (tag) => normalizeSearchValue(tag.tag) === normalizedSelectedTag
  );
}

function sortEntities(entities: Entity[], sortOption: EntitySortOption): Entity[] {
  return [...entities].sort((firstEntity, secondEntity) => {
    if (sortOption === "type") {
      const typeComparison = firstEntity.type.localeCompare(secondEntity.type);

      if (typeComparison !== 0) {
        return typeComparison;
      }

      return firstEntity.name.localeCompare(secondEntity.name);
    }

    if (sortOption === "updated") {
      const firstUpdatedAt = new Date(firstEntity.updatedAt).getTime();
      const secondUpdatedAt = new Date(secondEntity.updatedAt).getTime();

      return secondUpdatedAt - firstUpdatedAt;
    }

    return firstEntity.name.localeCompare(secondEntity.name);
  });
}

function getEntityResultLabel(count: number): string {
  return count === 1 ? "1 entity" : `${count} entities`;
}

function getAvailableTags(entities: Entity[]): string[] {
  const tagSet = new Set<string>();

  entities.forEach((entity) => {
    entity.tags.forEach((tag) => {
      const trimmedTag = tag.tag.trim();

      if (trimmedTag) {
        tagSet.add(trimmedTag);
      }
    });
  });

  return Array.from(tagSet).sort((firstTag, secondTag) =>
    firstTag.localeCompare(secondTag)
  );
}

export function EntityListSection({
  entities,
  isLoading,
  errorMessage,
}: EntityListSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const entitySearch = searchParams.get(ENTITY_SEARCH_PARAM) ?? "";
  const entityTypeParam = searchParams.get(ENTITY_TYPE_PARAM) ?? "";
  const entityTag = searchParams.get(ENTITY_TAG_PARAM) ?? "";
  const entitySortParam = searchParams.get(ENTITY_SORT_PARAM) ?? "name";

  const selectedEntityType = isEntityType(entityTypeParam)
    ? entityTypeParam
    : "";

  const selectedSort = isEntitySortOption(entitySortParam)
    ? entitySortParam
    : "name";

  const availableTags = getAvailableTags(entities);

  const visibleEntities = sortEntities(
    entities
      .filter((entity) => entityMatchesSearch(entity, entitySearch))
      .filter((entity) => entityMatchesType(entity, selectedEntityType))
      .filter((entity) => entityMatchesTag(entity, entityTag)),
    selectedSort
  );

  const hasSearch = entitySearch.trim().length > 0;
  const hasTypeFilter = selectedEntityType.length > 0;
  const hasTagFilter = entityTag.trim().length > 0;
  const hasCustomSort = selectedSort !== "name";
  const hasActiveControls =
    hasSearch || hasTypeFilter || hasTagFilter || hasCustomSort;

  const hasEntities = entities.length > 0;
  const hasVisibleEntities = visibleEntities.length > 0;

  function updateEntityParam(paramName: string, nextValue: string) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const trimmedValue = nextValue.trim();

      if (trimmedValue) {
        nextParams.set(paramName, nextValue);
      } else {
        nextParams.delete(paramName);
      }

      return nextParams;
    });
  }

  function resetEntityControls() {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      nextParams.delete(ENTITY_SEARCH_PARAM);
      nextParams.delete(ENTITY_TYPE_PARAM);
      nextParams.delete(ENTITY_TAG_PARAM);
      nextParams.delete(ENTITY_SORT_PARAM);

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

      <div className="form-stack" role="search" aria-label="Entity browsing controls">
        <label className="form-field">
          <span>Search entities</span>
          <Input
            type="search"
            value={entitySearch}
            onChange={(event) =>
              updateEntityParam(ENTITY_SEARCH_PARAM, event.target.value)
            }
            placeholder="Search by name, summary, description, notes, or tag"
          />
        </label>

        <label className="form-field">
          <span>Filter by type</span>
          <select
            value={selectedEntityType}
            onChange={(event) =>
              updateEntityParam(ENTITY_TYPE_PARAM, event.target.value)
            }
          >
            <option value="">All types</option>
            {ENTITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {formatEntityType(type)}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Filter by tag</span>
          <select
            value={entityTag}
            onChange={(event) =>
              updateEntityParam(ENTITY_TAG_PARAM, event.target.value)
            }
            disabled={availableTags.length === 0}
          >
            <option value="">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Sort entities</span>
          <select
            value={selectedSort}
            onChange={(event) =>
              updateEntityParam(ENTITY_SORT_PARAM, event.target.value)
            }
          >
            <option value="name">Alphabetically</option>
            <option value="type">By type</option>
            <option value="updated">Recently updated</option>
          </select>
        </label>

        {hasActiveControls ? (
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={resetEntityControls}>
              Clear search and filters
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

      {!isLoading && !errorMessage && hasEntities && hasActiveControls ? (
        <StatusMessage variant={hasVisibleEntities ? "muted" : "error"}>
          {hasVisibleEntities
            ? `Showing ${getEntityResultLabel(
                visibleEntities.length
              )} matching the current entity browsing controls.`
            : "No entities match your current search or filters. Clear the controls to show all entities."}
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
                <span className="muted-text">({formatEntityType(entity.type)})</span>
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