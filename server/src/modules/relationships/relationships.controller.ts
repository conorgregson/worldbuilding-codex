import { Request, RequestHandler, Response } from "express";
import { AppError } from "../../utils/app-error";
import {
    createRelationship,
    deleteRelationship,
    getRelationshipsForEntity,
} from "./relationships.service";
import {
    createRelationshipSchema,
    entityParamsSchema,
    relationshipParamsSchema,
    worldParamsSchema,
} from "./relationships.schema";

function getUserId(req: Request) {
    if (!req.user) {
        throw new AppError("Authentication required", 401);
    }

    return req.user.id;
}

export const postRelationship: RequestHandler = async (req, res) => {
    const { worldId } = worldParamsSchema.parse(req.params);
    const input = createRelationshipSchema.parse(req.body);

    const relationship = await createRelationship(getUserId(req), worldId, input);
    res.status(201).json(relationship);
};

export const getEntityRelationships: RequestHandler = async (req, res) => {
    const { entityId } = entityParamsSchema.parse(req.params);

    const relationships = await getRelationshipsForEntity(getUserId(req), entityId);
    res.status(200).json(relationships);
};

export const removeRelationship: RequestHandler = async (req, res) => {
    const { relationshipId } = relationshipParamsSchema.parse(req.params);

    const result = await deleteRelationship(getUserId(req), relationshipId);
    res.status(200).json(result);
};