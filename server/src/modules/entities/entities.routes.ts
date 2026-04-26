import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import {
  getEntities,
  getEntity,
  patchEntity,
  postEntity,
  removeEntity,
} from "./entities.controller";

const router = Router();

router.use(requireAuth);

router.get("/worlds/:worldId/entities", asyncHandler(getEntities));
router.post("/worlds/:worldId/entities", asyncHandler(postEntity));
router.get("/entities/:entityId", asyncHandler(getEntity));
router.patch("/entities/:entityId", asyncHandler(patchEntity));
router.delete("/entities/:entityId", asyncHandler(removeEntity));

export default router;