import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import {
  JWT_COOKIE_AGE,
  JWT_COOKIE_NAME,
  JWT_EXPIRES,
  JWT_SECRET,
} from '../constants/index.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import User, { findUserByCredentials } from '../models/user.js';

// GET /users/me —  возвращает информацию о пользователе (email и имя)
export const getCurrentUser = async (req, res, next) => {
  try {
    const userById = await User.findById(req.user._id).orFail(
      () => new NotFoundError('user'),
    );
    res
      .status(StatusCodes.OK)
      .send({ id: userById._id, name: userById.name, email: userById.email });
  } catch (err) {
    next(err);
  }
};

const updateUserData = async (res, next, getUserData) => {
  try {
    const [userId, userData] = getUserData();
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    }).orFail(() => new NotFoundError('user'));
    res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

// POST /signup — создаёт пользователя
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (password.length < 8) {
      throw new BadRequestError();
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(StatusCodes.CREATED).send({
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /users/me — обновляет информацию о пользователе (email и имя)
export const updateUser = (req, res, next) => {
  updateUserData(res, next, () => {
    const { name, email } = req.body;
    return [req.user._id, { name, email }];
  });
};

// контроллер аутентификации
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInDb = await findUserByCredentials(email, password);
    const token = jwt.sign({ _id: userInDb._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
    res
      .status(StatusCodes.OK)
      .cookie(JWT_COOKIE_NAME, token, {
        maxAge: JWT_COOKIE_AGE,
        httpOnly: true,
        sameSite: true,
      })
      .send();
  } catch (err) {
    next(err);
  }
};

// удалить JWT из куков пользователя
export const signOut = (req, res) => {
  res
    .status(StatusCodes.OK)
    .clearCookie(JWT_COOKIE_NAME, {
      httpOnly: true,
      sameSite: true,
    })
    .send();
};
