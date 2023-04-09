const checkRoleMiddleware = (roles) => (req, res, next) => {
  try {
    const user = req.user;

    if (!roles.includes(user.role)) {
      return res.status(406).send('Your role is not suitable for this operation');
    }

    next();
  } catch (e) {
    return res.status(406).send('Your role is not suitable for this operation');
  }
};

export default checkRoleMiddleware;
