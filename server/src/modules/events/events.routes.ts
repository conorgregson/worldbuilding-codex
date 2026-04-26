import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import {
  getEvent,
  getEvents,
  patchEvent,
  postEvent,
  removeEvent,
} from "./events.controller";

const router = Router();

router.use(requireAuth);

router.get("/worlds/:worldId/events", asyncHandler(getEvents));
router.post("/worlds/:worldId/events", asyncHandler(postEvent));
router.get("/events/:eventId", asyncHandler(getEvent));
router.patch("/events/:eventId", asyncHandler(patchEvent));
router.delete("/events/:eventId", asyncHandler(removeEvent));

export default router;