import { Router } from "express";
import { auth } from "../middleware/auth";
import { createFeed, getFeed } from "../controllers/feedController";

const router = Router();

router.post('/',auth,createFeed)
router.get('/',auth,getFeed)

export default router;

