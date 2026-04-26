import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/app-error";
import { CreateEntityInput, ListEntitiesQuery, UpdateEntityInput } from "./entities.schema";

function normalizeTags(tags: string[]): string[] {
    return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

async function ensureWorldOwnership(userId: string, worldId: string) {
    const world = await prisma.world.findFirst({
        where: {
            id: worldId,
            userId,
        },
    });

    if (!world) {
        throw new AppError("World not found", 404);
    }

    return world;
}

export async function listEntities(
    userId: string,
    worldId: string,
    filters: ListEntitiesQuery
) {
    await ensureWorldOwnership(userId, worldId);

  const where: Prisma.EntityWhereInput = {
    worldId,
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.tag
      ? {
          tags: {
            some: {
              tag: filters.tag.toLowerCase(),
            },
          },
        }
      : {}),
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q, mode: "insensitive" } },
            { summary: { contains: filters.q, mode: "insensitive" } },
            { description: { contains: filters.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  return prisma.entity.findMany({
    where,
    include: {
        tags: true,
    },
    orderBy: {
        updatedAt: "desc",
    },
  });
}

export async function createEntity(
    userId: string,
    worldId: string,
    input: CreateEntityInput
) {
    await ensureWorldOwnership(userId, worldId);

    const normalizedTags = normalizeTags(input.tags ?? []);

    return prisma.entity.create({
        data: {
            worldId,
            type: input.type,
            name: input.name,
            summary: input.summary ?? null,
            description: input.description ?? null,
            notes: input.notes ?? null,
            tags: {
                create: normalizedTags.map((tag) => ({ tag })),
            },
        },
        include: {
            tags: true,
        },
    });
}

export async function getEntityById(userId: string, entityId: string) {
    const entity = await prisma.entity.findFirst({
        where: {
            id: entityId,
            world: {
                userId,
            },
        },
        include: {
            tags: true,
        },
    });

    if (!entity) {
        throw new AppError("Entity not found", 404);
    }

    return entity;
}

export async function updateEntity(
    userId: string,
    entityId: string,
    input: UpdateEntityInput,
) {
    const existing = await prisma.entity.findFirst({
        where: {
            id: entityId,
            world: {
                userId,
            },
        },
        include: {
            tags: true,
        },
    });

    if (!existing) {
        throw new AppError("Entity not found", 404);
    }

    const normalizedTags = input.tags !== undefined ? normalizeTags(input.tags) : existing.tags.map((t) => t.tag);

    return prisma.entity.update({
        where: { id: entityId },
        data: {
            ...(input.type !== undefined ? { type: input.type } : {}),
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.summary !== undefined ? { summary: input.summary } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
            ...(input.notes !== undefined ? { notes: input.notes } : {}),
            ...(input.tags !== undefined
            ? {
                tags: {
                deleteMany: {},
                create: normalizedTags.map((tag) => ({ tag })),
                },
            }
            : {}),
        },
        include: {
        tags: true,
        },
    });
}

export async function deleteEntity(userId: string, entityId: string) {
    await getEntityById(userId, entityId);

    await prisma.entity.delete({
        where: { id: entityId },
    });

    return { message: "Entity deleted successfully" };
}