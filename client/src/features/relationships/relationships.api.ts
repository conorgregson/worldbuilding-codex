import { api } from "../../lib/api";
import type {
    CreateRelationshipInput,
    EntityRelationshipsResponse
} from "./relationships.types";

export function getEntityRelationships(entityId: string) {
    return api.get<EntityRelationshipsResponse>(`/api/entities/${entityId}/relationships`);
}

export function createRelationship(worldId: string, input: CreateRelationshipInput) {
    return api.post(`/api/worlds/${worldId}/relationships`, input);
}

export function deleteRelationship(relationshipId: string) {
    return api.delete<{ message: string }>(`/api/relationships/${relationshipId}`);
}