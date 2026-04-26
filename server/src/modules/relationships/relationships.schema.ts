import { z } from "zod";

export const createRelationshipSchema = z.object({
  sourceEntityId: z.string().min(1),
  targetEntityId: z.string().min(1),
  relationshipType: z.string().min(1).max(100),
  note: z.string().max(2000).optional().nullable(),
});

export const relationshipParamsSchema = z.object({
  relationshipId: z.string().min(1),
});

export const entityParamsSchema = z.object({
  entityId: z.string().min(1),
});

export const worldParamsSchema = z.object({
  worldId: z.string().min(1),
});

export type CreateRelationshipInput = z.infer<typeof createRelationshipSchema>;