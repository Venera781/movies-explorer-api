import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import { getCurrentUser, updateUser } from '../controllers/user.js';
import auth from '../middlewares/auth.js';

const router = Router();
router.get('/me', auth, getCurrentUser);
router.patch(
  '/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  updateUser,
);

export default router;
