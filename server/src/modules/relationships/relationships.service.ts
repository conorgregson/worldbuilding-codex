import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { CreateRelationshipInput } from "./relationships.schema";

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

export async function createRelationship(
  userId: string,
  worldId: string,
  input: CreateRelationshipInput
) {
  await ensureWorldOwnership(userId, worldId);

  if (input.sourceEntityId === input.targetEntityId) {
    throw new AppError("An entity cannot relate to itself", 400);
  }

  const [sourceEntity, targetEntity] = await Promise.all([
    prisma.entity.findFirst({
      where: {
        id: input.sourceEntityId,
        worldId,
        world: { userId },
      },
    }),
    prisma.entity.findFirst({
      where: {
        id: input.targetEntityId,
        worldId,
        world: { userId },
      },
    }),
  ]);

  if (!sourceEntity || !targetEntity) {
    throw new AppError("Both entities must exist in the same world", 400);
  }

  return prisma.relationship.create({
    data: {
      worldId,
      sourceEntityId: input.sourceEntityId,
      targetEntityId: input.targetEntityId,
      relationshipType: input.relationshipType,
      note: input.note ?? null,
    },
    include: {
      sourceEntity: {
        select: {
          id: true,
          name: true,
          type: true,
          worldId: true,
        },
      },
      targetEntity: {
        select: {
          id: true,
          name: true,
          type: true,
          worldId: true,
        },
      },
    },
  });
}

export async function getRelationshipsForEntity(userId: string, entityId: string) {
  const entity = await prisma.entity.findFirst({
    where: {
      id: entityId,
      world: {
        userId,
      },
    },
  });

  if (!entity) {
    throw new AppError("Entity not found", 404);
  }

  const [outgoing, incoming] = await Promise.all([
    prisma.relationship.findMany({
      where: {
        sourceEntityId: entityId,
        world: {
          userId,
        },
      },
      include: {
        targetEntity: {
          select: {
            id: true,
            name: true,
            type: true,
            worldId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.relationship.findMany({
      where: {
        targetEntityId: entityId,
        world: {
          userId,
        },
      },
      include: {
        sourceEntity: {
          select: {
            id: true,
            name: true,
            type: true,
            worldId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    outgoing,
    incoming,
  };
}

export async function deleteRelationship(userId: string, relationshipId: string) {
  const relationship = await prisma.relationship.findFirst({
    where: {
      id: relationshipId,
      world: {
        userId,
      },
    },
  });

  if (!relationship) {
    throw new AppError("Relationship not found", 404);
  }

  await prisma.relationship.delete({
    where: {
      id: relationshipId,
    },
  });

  return { message: "Relationship deleted successfully" };
}