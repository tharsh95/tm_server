import { Router } from 'express';
import authRouter from './routes/authRouter';
import taskRouter from './routes/taskRouter';
import feedRouter from './routes/feedRouter'
const router = Router();

// Register all route modules here
router.use('/auth', authRouter);
router.use('/task', taskRouter);
router.use('/feed',feedRouter)

export default router;