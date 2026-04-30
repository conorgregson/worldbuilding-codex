import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/Card";
import { StatusMessage } from "../components/ui/StatusMessage";
import { getEntities } from "../features/entities/entities.api";
import type { Entity } from "../features/entities/entities.types";
import { getEntityRelationships } from "../features/relationships/relationships.api";
import type { OutgoingRelationship } from "../features/relationships/relationships.types";
import { getWorld } from "../features/worlds/worlds.api";

const GRAPH_HEADING_ID = "relationship-graph-heading";
const SVG_WIDTH = 900;
const SVG_HEIGHT = 560;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const GRAPH_RADIUS = 210;
const EMPTY_ENTITIES: Entity[] = []

type GraphNode = {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
};

function getRelationshipGraphNodes(entities: Entity[]): GraphNode[] {
  if (entities.length === 1) {
    return [
      {
        id: entities[0].id,
        label: entities[0].name,
        type: entities[0].type,
        x: CENTER_X,
        y: CENTER_Y,
      },
    ];
  }

  return entities.map((entity, index) => {
    const angle = (2 * Math.PI * index) / entities.length - Math.PI / 2;

    return {
      id: entity.id,
      label: entity.name,
      type: entity.type,
      x: CENTER_X + GRAPH_RADIUS * Math.cos(angle),
      y: CENTER_Y + GRAPH_RADIUS * Math.sin(angle),
    };
  });
}

function getUniqueOutgoingRelationships(
  relationships: OutgoingRelationship[]
): OutgoingRelationship[] {
  const seenRelationshipIds = new Set<string>();

  return relationships.filter((relationship) => {
    if (seenRelationshipIds.has(relationship.id)) {
      return false;
    }

    seenRelationshipIds.add(relationship.id);
    return true;
  });
}

function getRelationshipTypes(relationships: OutgoingRelationship[]) {
  return Array.from(
    new Set(
      relationships
        .map((relationship) => relationship.relationshipType.trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));
}

function getNodeLabel(label: string) {
  return label.length > 18 ? `${label.slice(0, 18)}...` : label;
}

function getNodeClassName({
  nodeId,
  selectedEntityId,
  connectedEntityIds,
}: {
  nodeId: string;
  selectedEntityId: string;
  connectedEntityIds: Set<string>;
}) {
  return [
    "relationship-graph__node",
    selectedEntityId === nodeId ? "relationship-graph__node--selected" : "",
    selectedEntityId && connectedEntityIds.has(nodeId)
      ? "relationship-graph__node--connected"
      : "",
    selectedEntityId && !connectedEntityIds.has(nodeId)
      ? "relationship-graph__node--dimmed"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function getEdgeClassName({
  relationshipId,
  selectedEntityId,
  connectedRelationshipIds,
}: {
  relationshipId: string;
  selectedEntityId: string;
  connectedRelationshipIds: Set<string>;
}) {
  return [
    "relationship-graph__edge",
    selectedEntityId && connectedRelationshipIds.has(relationshipId)
      ? "relationship-graph__edge--connected"
      : "",
    selectedEntityId && !connectedRelationshipIds.has(relationshipId)
      ? "relationship-graph__edge--dimmed"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function RelationshipGraph({
  entities,
  relationships,
  totalRelationshipCount,
  selectedEntityId,
  onSelectEntity,
}: {
  entities: Entity[];
  relationships: OutgoingRelationship[];
  totalRelationshipCount: number;
  selectedEntityId: string;
  onSelectEntity: (entityId: string) => void;
}) {
  const nodes = useMemo(() => getRelationshipGraphNodes(entities), [entities]);

  const nodeMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, [nodes]);

  const visibleRelationships = relationships.filter(
    (relationship) =>
      nodeMap.has(relationship.sourceEntityId) &&
      nodeMap.has(relationship.targetEntityId)
  );

  const connectedRelationshipIds = useMemo(() => {
    if (!selectedEntityId) return new Set<string>();

    return new Set(
      visibleRelationships
        .filter(
          (relationship) =>
            relationship.sourceEntityId === selectedEntityId ||
            relationship.targetEntityId === selectedEntityId
        )
        .map((relationship) => relationship.id)
    );
  }, [selectedEntityId, visibleRelationships]);

  const connectedEntityIds = useMemo(() => {
    const entityIds = new Set<string>();

    if (!selectedEntityId) return entityIds;

    visibleRelationships.forEach((relationship) => {
      if (
        relationship.sourceEntityId === selectedEntityId ||
        relationship.targetEntityId === selectedEntityId
      ) {
        entityIds.add(relationship.sourceEntityId);
        entityIds.add(relationship.targetEntityId);
      }
    });

    return entityIds;
  }, [selectedEntityId, visibleRelationships]);

  if (entities.length === 0) {
    return (
      <Card>
        <StatusMessage variant="muted">
          No entities to graph yet. Create characters, locations, factions,
          species, artifacts, cultures, or other entities first. Once this world
          has connected lore, the Relationship Graph will help you explore it
          visually.
        </StatusMessage>
      </Card>
    );
  }

  if (totalRelationshipCount === 0) {
    return (
      <Card>
        <StatusMessage variant="muted">
          No relationships to graph yet. This world has entities, but they are
          not connected yet. Add relationships between entities to build a visual
          lore graph.
        </StatusMessage>
      </Card>
    );
  }

  if (relationships.length === 0) {
    return (
      <Card>
        <StatusMessage variant="muted">
          No relationships match this filter. Try another relationship type or
          reset the graph filters.
        </StatusMessage>
      </Card>
    );
  }

  return (
    <Card className="surface-card">
      <div className="relationship-graph-wrap" aria-label="Relationship graph">
        <svg
          className="relationship-graph"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          role="img"
          aria-labelledby="relationship-graph-title relationship-graph-description"
        >
          <title id="relationship-graph-title">Relationship graph</title>
          <desc id="relationship-graph-description">
            Entities are shown as nodes. Relationships are shown as directional
            edges between entities. Select an entity node to highlight its
            incoming and outgoing relationships.
          </desc>

          <defs>
            <marker
              id="relationship-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          {visibleRelationships.map((relationship) => {
            const sourceNode = nodeMap.get(relationship.sourceEntityId);
            const targetNode = nodeMap.get(relationship.targetEntityId);

            if (!sourceNode || !targetNode) return null;

            const labelX = (sourceNode.x + targetNode.x) / 2;
            const labelY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g
                key={relationship.id}
                className={getEdgeClassName({
                  relationshipId: relationship.id,
                  selectedEntityId,
                  connectedRelationshipIds,
                })}
              >
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  markerEnd="url(#relationship-arrow)"
                />
                <text x={labelX} y={labelY}>
                  {relationship.relationshipType}
                </text>
              </g>
            );
          })}

          {nodes.map((node) => (
            <g
              key={node.id}
              className={getNodeClassName({
                nodeId: node.id,
                selectedEntityId,
                connectedEntityIds,
              })}
              role="button"
              tabIndex={0}
              aria-label={`Select ${node.label}`}
              onClick={() => onSelectEntity(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectEntity(node.id);
                }
              }}
            >
              <circle cx={node.x} cy={node.y} r="42" />
              <text x={node.x} y={node.y - 4}>
                {getNodeLabel(node.label)}
              </text>
              <text
                x={node.x}
                y={node.y + 16}
                className="relationship-graph__node-type"
              >
                {node.type}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="relationship-graph-summary" aria-live="polite">
        <p className="muted-text-reset">
          Showing {entities.length}{" "}
          {entities.length === 1 ? "entity" : "entities"} and{" "}
          {visibleRelationships.length}{" "}
          {visibleRelationships.length === 1 ? "relationship" : "relationships"}.
        </p>
      </div>
    </Card>
  );
}

export default function WorldRelationshipGraphPage() {
  const { worldId } = useParams();
  const resolvedWorldId = worldId ?? "";

  const [relationshipTypeFilter, setRelationshipTypeFilter] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  const worldQuery = useQuery({
    queryKey: ["world", resolvedWorldId],
    queryFn: () => getWorld(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const entitiesQuery = useQuery({
    queryKey: ["world", resolvedWorldId, "entities"],
    queryFn: () => getEntities(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const entities = entitiesQuery.data ?? EMPTY_ENTITIES;

  const relationshipQueries = useQueries({
    queries: entities.map((entity) => ({
      queryKey: ["entity", entity.id, "relationships"],
      queryFn: () => getEntityRelationships(entity.id),
      enabled: Boolean(entity.id),
    })),
  });

  const relationships = useMemo(() => {
    const outgoingRelationships = relationshipQueries.flatMap((query) =>
      query.data?.outgoing ?? []
    );

    return getUniqueOutgoingRelationships(outgoingRelationships);
  }, [relationshipQueries]);

  const relationshipTypes = useMemo(
    () => getRelationshipTypes(relationships),
    [relationships]
  );

  const filteredRelationships = useMemo(() => {
    if (!relationshipTypeFilter) return relationships;

    return relationships.filter(
      (relationship) => relationship.relationshipType === relationshipTypeFilter
    );
  }, [relationshipTypeFilter, relationships]);

  const selectedEntity = useMemo(() => {
    return entities.find((entity) => entity.id === selectedEntityId);
  }, [entities, selectedEntityId]);

  const isRelationshipsLoading = relationshipQueries.some(
    (query) => query.isLoading
  );

  const relationshipError = relationshipQueries.find(
    (query) => query.error instanceof Error
  )?.error;

  function handleResetGraphControls() {
    setRelationshipTypeFilter("");
    setSelectedEntityId("");
  }

  if (!worldId) {
    return (
      <div className="page-shell">
        <Card>
          <div className="section-heading">
            <h1>Relationship Graph</h1>
            <p>Missing world ID.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section
        className="page-section-stack"
        aria-labelledby={GRAPH_HEADING_ID}
      >
        <div className="section-heading">
          <p className="muted-text-reset">World relationships</p>
          <h1 id={GRAPH_HEADING_ID}>
            {worldQuery.data
              ? `${worldQuery.data.title} Relationship Graph`
              : "Relationship Graph"}
          </h1>
          <p>
            Explore how this world&apos;s entities connect through directional
            relationships.
          </p>
        </div>

        <div className="card-actions">
          <Link to={`/worlds/${worldId}`}>Back to world</Link>
        </div>

        {worldQuery.isLoading || entitiesQuery.isLoading ? (
          <StatusMessage variant="muted">
            Loading relationship graph...
          </StatusMessage>
        ) : null}

        {worldQuery.error instanceof Error ? (
          <StatusMessage variant="error">
            {worldQuery.error.message || "World could not be loaded."}
          </StatusMessage>
        ) : null}

        {entitiesQuery.error instanceof Error ? (
          <StatusMessage variant="error">
            {entitiesQuery.error.message || "Entities could not be loaded."}
          </StatusMessage>
        ) : null}

        {relationshipError instanceof Error ? (
          <StatusMessage variant="error">
            {relationshipError.message || "Relationships could not be loaded."}
          </StatusMessage>
        ) : null}

        {isRelationshipsLoading && entities.length > 0 ? (
          <StatusMessage variant="muted">Loading relationships...</StatusMessage>
        ) : null}

        {!worldQuery.isLoading &&
        !entitiesQuery.isLoading &&
        !worldQuery.error &&
        !entitiesQuery.error &&
        !relationshipError &&
        !isRelationshipsLoading ? (
          <>
            <Card>
              <div className="relationship-graph-controls">
                <label className="form-field">
                  <span>Relationship type</span>
                  <select
                    value={relationshipTypeFilter}
                    onChange={(event) =>
                      setRelationshipTypeFilter(event.target.value)
                    }
                    disabled={relationships.length === 0}
                  >
                    <option value="">All relationship types</option>
                    {relationshipTypes.map((relationshipType) => (
                      <option key={relationshipType} value={relationshipType}>
                        {relationshipType}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="relationship-graph-controls__actions">
                  {selectedEntity ? (
                    <Link
                      className="ui-link-button ui-link-button--secondary"
                      to={`/entities/${selectedEntity.id}`}
                    >
                      Open selected entity
                    </Link>
                  ) : null}

                  {selectedEntity ? (
                    <button
                      className="ui-link-button ui-link-button--secondary relationship-graph-control-button"
                      type="button"
                      onClick={() => setSelectedEntityId("")}
                    >
                      Clear selection
                    </button>
                  ) : null}

                  {relationshipTypeFilter || selectedEntity ? (
                    <button
                      className="ui-link-button ui-link-button--secondary relationship-graph-control-button"
                      type="button"
                      onClick={handleResetGraphControls}
                    >
                      Reset graph controls
                    </button>
                  ) : null}
                </div>
              </div>

              {selectedEntity ? (
                <p className="relationship-graph-selection muted-text-reset">
                  Selected entity: <strong>{selectedEntity.name}</strong>
                </p>
              ) : (
                <p className="relationship-graph-selection muted-text-reset">
                  Select an entity node to highlight its incoming and outgoing
                  relationships.
                </p>
              )}
            </Card>

            <RelationshipGraph
              entities={entities}
              relationships={filteredRelationships}
              totalRelationshipCount={relationships.length}
              selectedEntityId={selectedEntityId}
              onSelectEntity={setSelectedEntityId}
            />
          </>
        ) : null}
      </section>
    </div>
  );
}