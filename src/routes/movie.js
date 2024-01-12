import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createMovie,
  deleteMovie,
  getMovies,
} from '../controllers/movie.js';
import { validateUrl } from '../helpers.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, getMovies);
router.post(
  '/',
  auth,
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateUrl),
      trailerLink: Joi.string().required().custom(validateUrl),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().custom(validateUrl),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  auth,
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

export default router;
