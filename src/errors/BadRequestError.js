import { StatusCodes } from 'http-status-codes';

import { BadRequestErrorText } from '../constants/errors.js';

export default class BadRequestError extends Error {
  httpCode = StatusCodes.BAD_REQUEST;

  constructor() {
    super(BadRequestErrorText);
  }
}
