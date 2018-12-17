const config = require('config');
const auth = require('../lib/auth');

const authRoute = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(new Error('403:noToken'));
  try {
    auth({ seed: config.get('jwt.seed') }).verifyToken(authorization);
    return next();
  } catch (e) {
    return next(new Error('403:noTokenVerified'));
  }
};

module.exports = authRoute;