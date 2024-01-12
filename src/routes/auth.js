import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import { createUser, login, signOut } from '../controllers/user.js';
import auth from '../middlewares/auth.js';

const routes = Router();
// авторизация пользователя - проверяет переданные в теле почту и пароль и возвращает JWT
routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

// при запросе к роуту удалится JWT из куков пользователя
routes.post('/signout', auth, signOut);

// регистрация пользователя  создаёт пользователя с переданными в теле: email, password и name
routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

export default routes;
