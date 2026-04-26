import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { CreateEventInput, UpdateEventInput } from "./events.schema";

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

async function ensureParticipantsBelongToWorld(
  userId: string,
  worldId: string,
  participants: { entityId: string; roleLabel?: string | null }[]
) {
  if (participants.length === 0) return;

  const entityIds = participants.map((participant) => participant.entityId);

  const entities = await prisma.entity.findMany({
    where: {
      id: { in: entityIds },
      worldId,
      world: { userId },
    },
    select: { id: true },
  });

  if (entities.length !== entityIds.length) {
    throw new AppError("All event participants must belong to the same world", 400);
  }
}

export async function listEvents(userId: string, worldId: string) {
  await ensureWorldOwnership(userId, worldId);

  return prisma.event.findMany({
    where: { worldId },
    include: {
      participants: {
        include: {
          entity: {
            select: {
              id: true,
              name: true,
              type: true,
              worldId: true,
            },
          },
        },
      },
    },
    orderBy: [
      { sortYear: "asc" },
      { sortIndex: "asc" },
      { createdAt: "asc" },
    ],
  });
}

export async function createEvent(
  userId: string,
  worldId: string,
  input: CreateEventInput
) {
  await ensureWorldOwnership(userId, worldId);
  await ensureParticipantsBelongToWorld(userId, worldId, input.participants);

  return prisma.event.create({
    data: {
      worldId,
      title: input.title,
      dateLabel: input.dateLabel ?? null,
      sortYear: input.sortYear ?? null,
      sortIndex: input.sortIndex ?? null,
      summary: input.summary ?? null,
      description: input.description ?? null,
      participants: {
        create: input.participants.map((participant) => ({
          entityId: participant.entityId,
          roleLabel: participant.roleLabel ?? null,
        })),
      },
    },
    include: {
      participants: {
        include: {
          entity: {
            select: {
              id: true,
              name: true,
              type: true,
              worldId: true,
            },
          },
        },
      },
    },
  });
}

export async function getEventById(userId: string, eventId: string) {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      world: {
        userId,
      },
    },
    include: {
      participants: {
        include: {
          entity: {
            select: {
              id: true,
              name: true,
              type: true,
              worldId: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
}

export async function updateEvent(
  userId: string,
  eventId: string,
  input: UpdateEventInput
) {
  const existingEvent = await prisma.event.findFirst({
    where: {
      id: eventId,
      world: {
        userId,
      },
    },
    select: {
      id: true,
      worldId: true,
    },
  });

  if (!existingEvent) {
    throw new AppError("Event not found", 404);
  }

  if (input.participants) {
    await ensureParticipantsBelongToWorld(userId, existingEvent.worldId, input.participants);
  }

  return prisma.event.update({
    where: { id: eventId },
    data: {
      ...(input.title !== undefined && input.title !== null
        ? { title: input.title }
        : {}),
      ...(input.dateLabel !== undefined
        ? { dateLabel: input.dateLabel ?? null }
        : {}),
      ...(input.sortYear !== undefined
        ? { sortYear: input.sortYear ?? null }
        : {}),
      ...(input.sortIndex !== undefined
        ? { sortIndex: input.sortIndex ?? null }
        : {}),
      ...(input.summary !== undefined
        ? { summary: input.summary ?? null }
        : {}),
      ...(input.description !== undefined
        ? { description: input.description ?? null }
        : {}),
      ...(input.participants !== undefined
        ? {
            participants: {
              deleteMany: {},
              create: input.participants.map((participant) => ({
                entityId: participant.entityId,
                roleLabel: participant.roleLabel ?? null,
              })),
            },
          }
        : {}),
    },
    include: {
      participants: {
        include: {
          entity: {
            select: {
              id: true,
              name: true,
              type: true,
              worldId: true,
            },
          },
        },
      },
    },
  });
}

export async function deleteEvent(userId: string, eventId: string) {
  await getEventById(userId, eventId);

  await prisma.event.delete({
    where: { id: eventId },
  });

  return { message: "Event deleted successfully" };
}