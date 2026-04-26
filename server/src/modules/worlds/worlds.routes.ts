import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import { getWorld, getWorlds, patchWorld, postWorld, removeWorld } from "./worlds.controller";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(getWorlds));
router.post("/", asyncHandler(postWorld));
router.get("/:worldId", asyncHandler(getWorld));
router.patch("/:worldId", asyncHandler(patchWorld));
router.delete("/:worldId", asyncHandler(removeWorld));

export default router;