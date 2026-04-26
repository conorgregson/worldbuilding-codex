import { api } from "../../lib/api";
import type { CreateEventInput, Event, UpdateEventInput } from "./events.types";

export function getWorldEvents(worldId: string) {
  return api.get<Event[]>(`/api/worlds/${worldId}/events`);
}

export function createEvent(worldId: string, input: CreateEventInput) {
  return api.post<Event>(`/api/worlds/${worldId}/events`, input);
}

export function getEvent(eventId: string) {
  return api.get<Event>(`/api/events/${eventId}`);
}

export function updateEvent(eventId: string, input: UpdateEventInput) {
  return api.patch<Event>(`/api/events/${eventId}`, input);
}

export function deleteEvent(eventId: string) {
  return api.delete<{ message: string }>(`/api/events/${eventId}`);
}