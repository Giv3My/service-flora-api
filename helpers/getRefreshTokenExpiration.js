import { roles } from './constants/roles.js';

export const getRefreshTokenExpiration = (role) => {
  let cookieExp, jwtExp;

  switch (role) {
    case roles.root:
      // cookieExp = 60 * 1000;
      // jwtExp = '60s';
      cookieExp = 24 * 60 * 60 * 1000;
      jwtExp = '1d';
      break;
    case roles.admin:
      // cookieExp = 60 * 1000;
      // jwtExp = '60s';
      cookieExp = 7 * 24 * 60 * 60 * 1000;
      jwtExp = '7d';
      break;
    default:
      // cookieExp = 60 * 1000;
      // jwtExp = '60s';
      cookieExp = 14 * 24 * 60 * 60 * 1000;
      jwtExp = '14d';
      break;
  }

  return {
    cookieExp,
    jwtExp,
  };
};
