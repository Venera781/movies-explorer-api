import { Router } from 'express';

import { createMovie, deleteMovie, getMovies } from '../controllers/movie.js';
import {
  validateDeleteMovie,
  validatePostMovies,
} from '../middlewares/validation.js';

const router = Router();

router.get('/', getMovies);
router.post('/', validatePostMovies, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

export default router;
