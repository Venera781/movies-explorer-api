import jwt from 'jsonwebtoken';

import { JWT_COOKIE_NAME, JWT_SECRET } from '../constants/index.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const auth = async (req, res, next) => {
  const token = req.cookies[JWT_COOKIE_NAME];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new UnauthorizedError());
    return;
  }
  req.user = payload;
  next();
};
export default auth;
