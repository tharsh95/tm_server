import { Router } from "express";
import { auth } from "../middleware/auth";
import { createFeed, getFeed } from "../controllers/feedController";
import { feedValidation } from "../middleware/feedvalidation";

const router = Router();

router.post('/',auth,feedValidation, createFeed)
router.get('/',auth,getFeed)

export default router;

