import * as tokenService from '../services/token.service.js';

import ApiError from '../errors/api.errors.js';

const authMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next(ApiError.UnauthorizedError('Unauthorized user'));
    }

    const accessToken = bearerToken.split(' ')[1];

    const user = tokenService.validateAccessToken(accessToken);

    if (!user) {
      return next(ApiError.UnauthorizedError('Access token has been expired'));
    }

    req.user = user;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError('Unauthorized user'));
  }
};

export default authMiddleware;
