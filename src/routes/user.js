import { Router } from 'express';

import { getCurrentUser, updateUser } from '../controllers/user.js';
import { validateUpdateUser } from '../middlewares/validation.js';

const router = Router();
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

export default router;
