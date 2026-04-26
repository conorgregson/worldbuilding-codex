import { api } from "../../lib/api";
import type { CreateEntityInput, Entity } from "./entities.types";

export function getEntities(worldId: string) {
  return api.get<Entity[]>(`/api/worlds/${worldId}/entities`);
}

export function createEntity(worldId: string, input: CreateEntityInput) {
  return api.post<Entity>(`/api/worlds/${worldId}/entities`, input);
}

export function getEntity(entityId: string) {
  return api.get<Entity>(`/api/entities/${entityId}`);
}

export function updateEntity(entityId: string, input: Partial<CreateEntityInput>) {
  return api.patch<Entity>(`/api/entities/${entityId}`, input);
}

export function deleteEntity(entityId: string) {
  return api.delete<{ message: string }>(`/api/entities/${entityId}`);
}