import { Router } from 'express';

import auth from './auth.js';
import movie from './movie.js';
import user from './user.js';
import NotFoundError from '../errors/NotFoundError.js';

const routes = Router();

routes.use('/', auth);
routes.use('/users', user);
routes.use('/movies', movie);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('path'));
});

export default routes;
