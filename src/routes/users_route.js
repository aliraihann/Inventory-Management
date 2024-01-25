import { Router } from 'express';
const router = Router();
import { userRegister, userList, userLogin } from '../controllers/users_controller.js';

router.post('/register', userRegister);
router.get('/list', userList);
router.post('/login', userLogin);

export default router;