import {Router} from 'express';
import { changeStatus, createTasks, deleteTask, fetchTasks } from '../controllers/taskController';
import { auth } from '../middleware/auth';
const router = Router();


router.post('/',auth,createTasks) 
router.get('/',auth,fetchTasks)
router.patch('/:id',auth,changeStatus)
router.delete('/:id',auth,deleteTask)

export default router;