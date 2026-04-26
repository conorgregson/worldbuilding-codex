import { EntityType } from "@prisma/client";
import { z } from "zod";

export const createEntitySchema = z.object({
    type: z.nativeEnum(EntityType),
    name: z.string().min(1).max(100),
    summary: z.string().max(1000).optional().nullable(),
    description: z.string().max(10000).optional().nullable(),
    notes: z.string().max(10000).optional().nullable(),
    tags: z.array(z.string().min(1).max(50)).optional().default([]),
});

export const updateEntitySchema = createEntitySchema.partial();

export const listEntitiesQuerySchema = z.object({
    type: z.nativeEnum(EntityType).optional(),
    tag: z.string().optional(),
    q: z.string().optional(),
});

export type CreateEntityInput = z.infer<typeof createEntitySchema>;
export type UpdateEntityInput = z.infer<typeof updateEntitySchema>;
export type ListEntitiesQuery = z.infer<typeof listEntitiesQuerySchema>;