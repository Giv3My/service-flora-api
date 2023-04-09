import dotenv from 'dotenv';

import { getMillisecondsFromDays } from './getMillisecondsFromDays.js';

dotenv.config();

export const refreshTokenExp = {
  root: {
    cookieExp: getMillisecondsFromDays(process.env.COOKIE_REFRESH_ROOT_EXP),
    jwtExp: process.env.JWT_REFRESH_ROOT_EXP,
  },
  admin: {
    cookieExp: getMillisecondsFromDays(process.env.COOKIE_REFRESH_ADMIN_EXP),
    jwtExp: process.env.JWT_REFRESH_ADMIN_EXP,
  },
  user: {
    cookieExp: getMillisecondsFromDays(process.env.COOKIE_REFRESH_USER_EXP),
    jwtExp: process.env.JWT_REFRESH_USER_EXP,
  },
};
