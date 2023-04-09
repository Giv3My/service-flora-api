import * as tokenService from '../services/token.service.js';

const authMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).send('Unauthorized user');
    }

    const accessToken = bearerToken.split(' ')[1];

    const user = tokenService.validateAccessToken(accessToken);

    if (!user) {
      return res.status(401).send('Access token has been expired');
    }

    req.user = user;

    next();
  } catch (e) {
    return res.status(401).send('Unauthorized user');
  }
};

export default authMiddleware;
