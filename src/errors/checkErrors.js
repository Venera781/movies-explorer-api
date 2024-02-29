import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import { IncorrectDataText, UserExists } from '../constants/errors.js';

const checkErrors = (err, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      message: IncorrectDataText(err.message),
    });
  }
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).send({ message: UserExists });
  }
  if ('httpCode' in err) {
    return res.status(err.httpCode).send({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export default checkErrors;
