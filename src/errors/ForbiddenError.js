import { StatusCodes } from 'http-status-codes';

import { UserWithoutRights } from '../constants/errors.js';

export default class ForbiddenError extends Error {
  httpCode = StatusCodes.FORBIDDEN;

  constructor() {
    super(UserWithoutRights);
  }
}
