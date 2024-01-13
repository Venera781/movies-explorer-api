import { StatusCodes } from 'http-status-codes';

import { UserWithoutRights } from '../constants/errors.js';

export default class UnauthorizedError extends Error {
  httpCode = StatusCodes.UNAUTHORIZED;

  constructor() {
    super(UserWithoutRights);
  }
}
