import { StatusCodes } from 'http-status-codes';

import {
  ElementNotFound,
  MovieNotFound,
  PathNotFound,
  UserNotFound,
} from '../constants/errors.js';

export default class NotFoundError extends Error {
  httpCode = StatusCodes.NOT_FOUND;

  constructor(docType) {
    switch (docType) {
      case 'movie':
        super(MovieNotFound);
        return;
      case 'user':
        super(UserNotFound);
        return;
      case 'path':
        super(PathNotFound);
        return;
      default:
        super(ElementNotFound);
    }
  }
}
