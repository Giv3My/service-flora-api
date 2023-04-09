import ApiError from '../errors/api.errors.js';

const checkRoleMiddleware = (roles) => (req, res, next) => {
  try {
    const user = req.user;

    if (!roles.includes(user.role)) {
      return next(ApiError.NotAcceptable('Your role is not suitable for this operation'));
    }

    next();
  } catch (e) {
    return next(ApiError.NotAcceptable('Your role is not suitable for this operation'));
  }
};

export default checkRoleMiddleware;
