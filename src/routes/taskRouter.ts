import {Router} from 'express';
import { changeStatus, createTasks, deleteTask, fetchTasks } from '../controllers/taskController';
import { auth } from '../middleware/auth';
import { taskValidation } from '../middleware/taskValidation';
const router = Router();


router.post('/',auth,taskValidation,createTasks) 
router.get('/',auth,fetchTasks)
router.patch('/:id',auth,changeStatus)
router.delete('/:id',auth,deleteTask)

export default router;