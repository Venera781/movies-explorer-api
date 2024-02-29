import { StatusCodes } from 'http-status-codes';

import { UserExists } from '../constants/errors.js';

export default class ConflictError extends Error {
  httpCode = StatusCodes.CONFLICT;

  constructor() {
    super(UserExists);
  }
}
