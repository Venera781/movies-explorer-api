import { Router } from 'express';

import authRoutes from './authRoutes.js';
import movie from './movie.js';
import user from './user.js';
import NotFoundError from '../errors/NotFoundError.js';
import authCheck from '../middlewares/authCheck.js';

const routes = Router();

routes.use('/', authRoutes);
routes.use(authCheck);
routes.use('/users', user);
routes.use('/movies', movie);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('path'));
});

export default routes;
