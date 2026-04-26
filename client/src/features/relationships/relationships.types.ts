import type { EntityType } from "../entities/entities.types";

export type RelatedEntitySummary = {
    id: string;
    name: string;
    type: EntityType;
    worldId: string;
};

export type OutgoingRelationship = {
    id: string;
    worldId: string;
    sourceEntityId: string;
    targetEntityId: string;
    relationshipType: string;
    note: string | null;
    createdAt: string;
    targetEntity: RelatedEntitySummary;
};

export type IncomingRelationship = {
    id: string;
    worldId: string;
    sourceEntityId: string;
    targetEntityId: string;
    relationshipType: string;
    note: string | null;
    createdAt: string;
    sourceEntity: RelatedEntitySummary;
};

export type EntityRelationshipsResponse = {
    outgoing: OutgoingRelationship[];
    incoming: IncomingRelationship[];
};

export type CreateRelationshipInput = {
    sourceEntityId: string;
    targetEntityId: string;
    relationshipType: string;
    note?: string | null;
};