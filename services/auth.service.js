import { compare } from 'bcrypt';

import { UserModel } from '../db/models/user/index.js';
import * as tokenService from './token.service.js';

import { getUserDto } from '../helpers/index.js';

export const signIn = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email');
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  const tokens = tokenService.generateTokens({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const userDto = getUserDto(user);

  return {
    data: userDto,
    ...tokens,
  };
};

export const refreshTokens = (token) => {
  const user = tokenService.validateRefreshToken(token);

  if (!user) {
    return null;
  }

  const tokens = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return tokens;
};
