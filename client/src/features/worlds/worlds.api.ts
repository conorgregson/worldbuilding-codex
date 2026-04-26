import { api } from "../../lib/api";
import type { CreateWorldInput, World } from "./worlds.types";

export function getWorlds() {
  return api.get<World[]>("/api/worlds");
}

export function createWorld(input: CreateWorldInput) {
  return api.post<World>("/api/worlds", input);
}

export function getWorld(worldId: string) {
  return api.get<World>(`/api/worlds/${worldId}`);
}

export function updateWorld(worldId: string, input: Partial<CreateWorldInput>) {
  return api.patch<World>(`/api/worlds/${worldId}`, input);
}

export function deleteWorld(worldId: string) {
  return api.delete<{ message: string }>(`/api/worlds/${worldId}`);
}