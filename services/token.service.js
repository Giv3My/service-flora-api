import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { getRefreshTokenExpiration } from '../helpers/getRefreshTokenExpiration.js';

dotenv.config();

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXP,
  });

  const { jwtExp: expiresIn } = getRefreshTokenExpiration(payload.role);

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const validateAccessToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return user;
  } catch (e) {
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return user;
  } catch (e) {
    return null;
  }
};

export const getJwtPayload = (token) => {
  return jwt.decode(token);
};
