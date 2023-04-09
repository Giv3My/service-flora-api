import * as authService from '../services/auth.service.js';
import { getJwtPayload } from '../services/token.service.js';

import { getRefreshTokenExpiration } from '../helpers/index.js';

export const signIn = async (req, res) => {
  try {
    const user = await authService.signIn(req.body);

    const { cookieExp: maxAge } = getRefreshTokenExpiration(user.data.role);

    res.header('Authorization', `Bearer ${user.accessToken}`);
    res.cookie('refreshToken', user.refreshToken, {
      maxAge,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');

  return res.sendStatus(200);
};

export const refreshTokens = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).send('Refresh token has been expired');
  }

  const tokens = authService.refreshTokens(refreshToken);

  if (!tokens) {
    return res.status(401).send('Refresh token has been expired');
  }

  const user = getJwtPayload(tokens.accessToken);
  const { cookieExp: maxAge } = getRefreshTokenExpiration(user.role);

  res.header('Authorization', tokens.accessToken);
  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge,
    httpOnly: true,
  });

  return res.status(200).json(tokens);
};
