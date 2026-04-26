import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/async-handler";
import { notImplementedSearch } from "./search.controller";

const router = Router();

router.use(requireAuth);

router.get("worlds/:worldId/search", asyncHandler(notImplementedSearch));

export default router;