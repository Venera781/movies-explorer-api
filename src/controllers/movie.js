import { StatusCodes } from 'http-status-codes';

import ForbiddenError from '../errors/ForbiddenError.js';
import NotFoundError from '../errors/NotFoundError.js';
import Movie from '../models/movie.js';

// GET /movies — возвращает все сохранённые текущим пользователем фильмы
export const getMovies = async (req, res, next) => {
  try {
    const userMovies = await Movie.find({ owner: req.user._id }).populate(
      'owner',
    );
    res.send(userMovies);
  } catch (err) {
    next(err);
  }
};

// POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
export const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    await movie.populate('owner');
    res.status(StatusCodes.CREATED).send(movie);
  } catch (err) {
    next(err);
  }
};

// DELETE /movies/_id  — удаляет сохранённый фильм по id

export const deleteMovie = async (req, res, next) => {
  try {
    const movies = await Movie.findById(req.params.movieId)
      .orFail(() => new NotFoundError('movie'))
      .populate('owner');
    if (movies.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError();
    }
    await movies.deleteOne();
    res.status(StatusCodes.OK).send(movies);
  } catch (err) {
    next(err);
  }
};
