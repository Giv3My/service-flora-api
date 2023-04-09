import { refreshTokenExp } from './constants/index.js';

export const getRefreshTokenExpiration = (role) => {
  return refreshTokenExp[role];
};
