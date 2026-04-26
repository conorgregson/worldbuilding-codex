import { Request, RequestHandler } from "express";
import { AppError } from "../../utils/app-error";
import {
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from "./events.service";
import {
  createEventSchema,
  eventParamsSchema,
  updateEventSchema,
  worldParamsSchema,
} from "./events.schema";

function getUserId(req: Request) {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  return req.user.id;
}

export const getEvents: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const events = await listEvents(getUserId(req), worldId);
  res.status(200).json(events);
};

export const postEvent: RequestHandler = async (req, res) => {
  const { worldId } = worldParamsSchema.parse(req.params);
  const input = createEventSchema.parse(req.body);
  const event = await createEvent(getUserId(req), worldId, input);
  res.status(201).json(event);
};

export const getEvent: RequestHandler = async (req, res) => {
  const { eventId } = eventParamsSchema.parse(req.params);
  const event = await getEventById(getUserId(req), eventId);
  res.status(200).json(event);
};

export const patchEvent: RequestHandler = async (req, res) => {
  const { eventId } = eventParamsSchema.parse(req.params);
  const input = updateEventSchema.parse(req.body);
  const event = await updateEvent(getUserId(req), eventId, input);
  res.status(200).json(event);
};

export const removeEvent: RequestHandler = async (req, res) => {
  const { eventId } = eventParamsSchema.parse(req.params);
  const result = await deleteEvent(getUserId(req), eventId);
  res.status(200).json(result);
};