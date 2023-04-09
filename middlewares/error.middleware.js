import ApiError from '../errors/api.errors.js';

import { serverErrors } from './../helpers/constants/statusCodes.js';

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res
    .status(serverErrors.internalServerError)
    .json({ message: 'Unexpected error' });
};

export default errorMiddleware;
