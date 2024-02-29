import { Router } from 'express';

import { createUser, login, signOut } from '../controllers/user.js';
import { validateSignin, validateSignup } from '../middlewares/validation.js';

const routes = Router();
// авторизация пользователя - проверяет переданные в теле почту и пароль и возвращает JWT
routes.post('/signin', validateSignin, login);

// при запросе к роуту удалится JWT из куков пользователя
routes.post('/signout', signOut);

// регистрация пользователя  создаёт пользователя с переданными в теле: email, password и name
routes.post('/signup', validateSignup, createUser);

export default routes;
