import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import UnauthorizedError from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model('user', userSchema);

export default User;
export const findUserByCredentials = async (email, password) => {
  const userInDb = await User.findOne({ email }).select('+password');
  if (!userInDb) {
    throw new UnauthorizedError();
  }
  const matched = await bcrypt.compare(password, userInDb.password);
  if (!matched) {
    throw new UnauthorizedError();
  }
  delete userInDb.password;
  return userInDb;
};
