import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { CreateWorldInput, UpdateWorldInput } from "./worlds.schema";

export async function listWorlds(userId: string) {
    return prisma.world.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
    });
}

export async function createWorld(userId: string, input: CreateWorldInput) {
    return prisma.world.create({
        data:{
            userId,
            title: input.title,
            genre: input.genre ?? null,
            description: input.description ?? null,
        },
    });
}

export async function getWorldById(userId: string, worldId: string) {
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

export async function updateWorld(
    userId: string,
    worldId: string,
    input: UpdateWorldInput
) {
    await getWorldById(userId, worldId);

    return prisma.world.update({
        where: { id: worldId },
        data: {
            ...(input.title !== undefined ? { title: input.title } : {}),
            ...(input.genre !== undefined ? { genre: input.genre } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
        },
    });
}

export async function deleteWorld(userId: string, worldId: string) {
    await getWorldById(userId, worldId);

    await prisma.world.delete({
        where: { id: worldId },
    });

    return { message: "World deleted successfully" };
}