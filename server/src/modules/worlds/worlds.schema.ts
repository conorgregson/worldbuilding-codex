import { z } from "zod";

export const createWorldSchema = z.object({
    title: z.string().min(1).max(100),
    genre: z.string().max(100).optional().nullable(),
    description: z.string().max(5000).optional().nullable(),
});

export const updateWorldSchema = createWorldSchema.partial();

export type CreateWorldInput = z.infer<typeof createWorldSchema>;
export type UpdateWorldInput = z.infer<typeof updateWorldSchema>;