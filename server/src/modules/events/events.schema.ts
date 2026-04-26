import { z } from "zod";

export const participantInputSchema = z.object({
  entityId: z.string().min(1),
  roleLabel: z.string().max(100).optional().nullable(),
});

export const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  dateLabel: z.string().max(200).optional().nullable(),
  sortYear: z.number().int().optional().nullable(),
  sortIndex: z.number().int().optional().nullable(),
  summary: z.string().max(2000).optional().nullable(),
  description: z.string().max(10000).optional().nullable(),
  participants: z.array(participantInputSchema).optional().default([]),
});

export const updateEventSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  dateLabel: z.string().max(200).optional().nullable(),
  sortYear: z.number().int().optional().nullable(),
  sortIndex: z.number().int().optional().nullable(),
  summary: z.string().max(2000).optional().nullable(),
  description: z.string().max(10000).optional().nullable(),
  participants: z.array(participantInputSchema).optional(),
});

export const eventParamsSchema = z.object({
  eventId: z.string().min(1),
});

export const worldParamsSchema = z.object({
  worldId: z.string().min(1),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;