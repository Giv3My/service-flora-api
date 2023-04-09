import * as authService from '../services/auth.service.js';
import { getJwtPayload } from '../services/token.service.js';

import { getRefreshTokenExpiration } from '../helpers/index.js';
import { success } from '../helpers/constants/index.js';
import ApiError from '../errors/api.errors.js';

export const signIn = async (req, res, next) => {
  try {
    const user = await authService.signIn(req.body);

    const { cookieExp: maxAge } = getRefreshTokenExpiration(user.data.role);

    res.header('Authorization', `Bearer ${user.accessToken}`);
    res.cookie('refreshToken', user.refreshToken, {
      maxAge,
      httpOnly: true,
    });

    return res.status(success.ok).json(user);
  } catch (e) {
    return next(e);
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');

  return res.sendStatus(success.noContent);
};

export const refreshTokens = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(ApiError.UnauthorizedError('Refresh token has been expired'));
  }

  const tokens = authService.refreshTokens(refreshToken);

  if (!tokens) {
    return next(ApiError.UnauthorizedError('Refresh token has been expired'));
  }

  const user = getJwtPayload(tokens.accessToken);
  const { cookieExp: maxAge } = getRefreshTokenExpiration(user.role);

  res.header('Authorization', tokens.accessToken);
  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge,
    httpOnly: true,
  });

  return res.status(success.ok).json(tokens);
};
