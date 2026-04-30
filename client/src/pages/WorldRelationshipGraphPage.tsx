import { useMemo } from "react";
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

function getNodeLabel(label: string) {
  return label.length > 18 ? `${label.slice(0, 18)}...` : label;
}

function RelationshipGraph({
  entities,
  relationships,
}: {
  entities: Entity[];
  relationships: OutgoingRelationship[];
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

  if (relationships.length === 0) {
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
            edges between entities.
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
              <g key={relationship.id} className="relationship-graph__edge">
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
            <g key={node.id} className="relationship-graph__node">
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

  const entities = entitiesQuery.data ?? [];

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

  const isRelationshipsLoading = relationshipQueries.some(
    (query) => query.isLoading
  );

  const relationshipError = relationshipQueries.find(
    (query) => query.error instanceof Error
  )?.error;

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
          <p className="muted-text-reset">World Relationships</p>
          <h1 id={GRAPH_HEADING_ID}>
            {worldQuery.data ? `${worldQuery.data.title} Relationship Graph` : "Relationship Graph"}
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
          <StatusMessage variant="muted">Loading relationship graph...</StatusMessage>
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
          <RelationshipGraph entities={entities} relationships={relationships} />
        ) : null}
      </section>
    </div>
  );
}