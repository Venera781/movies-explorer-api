import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET =
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'rttyuyuhxsbcjb';
export const JWT_EXPIRES = '7d';

export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? 'jwt';
export const JWT_COOKIE_AGE =
  process.env.JWT_COOKIE_AGE ?? 7 * 24 * 3600 * 1000;

export const PORT = process.env.PORT ?? 4000;
export const DB_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : 'mongodb://127.0.0.1:27017/bitfilmsdb';
