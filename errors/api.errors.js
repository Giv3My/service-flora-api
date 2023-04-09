import { clientErrors } from './../helpers/constants/index.js';

class ApiError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  static BadRequest(message) {
    return new ApiError(clientErrors.badRequest, message);
  }

  static UnauthorizedError(message) {
    return new ApiError(clientErrors.unauthorizedError, message);
  }

  static NotAcceptable(message) {
    return new ApiError(clientErrors.notAcceptable, message);
  }
}

export default ApiError;
