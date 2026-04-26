import { Request, RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../utils/app-error";
import {
  createEntity,
  deleteEntity,
  getEntityById,
  listEntities,
  updateEntity,
} from "./entities.service";
import {
  createEntitySchema,
  listEntitiesQuerySchema,
  updateEntitySchema,
} from "./entities.schema";

const worldParamsSchema = z.object({
  worldId: z.string().min(1),
});

const entityParamsSchema = z.object({
  entityId: z.string().min(1),
});

function getUserId(req: Request) {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  return req.user.id;
}

export const getEntities: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const filters = listEntitiesQuerySchema.parse(req.query);
  const entities = await listEntities(getUserId(req), worldId, filters);
  res.status(200).json(entities);
};

export const postEntity: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const input = createEntitySchema.parse(req.body);
  const entity = await createEntity(getUserId(req), worldId, input);
  res.status(201).json(entity);
};

export const getEntity: RequestHandler = async (req, res) => {
  const { entityId } = entityParamsSchema.parse(req.params);
  const entity = await getEntityById(getUserId(req), entityId);
  res.status(200).json(entity);
};

export const patchEntity: RequestHandler = async (req, res) => {
  const { entityId } = entityParamsSchema.parse(req.params);
  const input = updateEntitySchema.parse(req.body);
  const entity = await updateEntity(getUserId(req), entityId, input);
  res.status(200).json(entity);
};

export const removeEntity: RequestHandler = async (req, res) => {
  const { entityId } = entityParamsSchema.parse(req.params);
  const result = await deleteEntity(getUserId(req), entityId);
  res.status(200).json(result);
};