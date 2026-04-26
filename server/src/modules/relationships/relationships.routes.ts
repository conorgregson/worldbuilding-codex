import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import { 
    getEntityRelationships,
    postRelationship,
    removeRelationship
 } from "./relationships.controller";

const router = Router();

router.use(requireAuth);

router.post("/worlds/:worldId/relationships", asyncHandler(postRelationship));
router.get("/entities/:entityId/relationships", asyncHandler(getEntityRelationships));
router.delete("/relationships/:relationshipId", asyncHandler(removeRelationship));

export default router;