import { Request, RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../utils/app-error";
import {
  createWorld,
  deleteWorld,
  getWorldById,
  listWorlds,
  updateWorld,
} from "./worlds.service";
import { createWorldSchema, updateWorldSchema } from "./worlds.schema";

const worldParamsSchema = z.object({
  worldId: z.string().min(1),
});

function getUserId(req: Request) {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  return req.user.id;
}

export const getWorlds: RequestHandler = async (req, res) => {
  const worlds = await listWorlds(getUserId(req));
  res.status(200).json(worlds);
};

export const postWorld: RequestHandler = async (req, res) => {
  const input = createWorldSchema.parse(req.body);
  const world = await createWorld(getUserId(req), input);
  res.status(201).json(world);
};

export const getWorld: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const world = await getWorldById(getUserId(req), worldId);
  res.status(200).json(world);
};

export const patchWorld: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const input = updateWorldSchema.parse(req.body);
  const world = await updateWorld(getUserId(req), worldId, input);
  res.status(200).json(world);
};

export const removeWorld: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const result = await deleteWorld(getUserId(req), worldId);
  res.status(200).json(result);
};