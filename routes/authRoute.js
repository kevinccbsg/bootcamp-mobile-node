const config = require('config');
const debug = require('debug')('Nodepop:App');
const auth = require('../lib/auth');

const authRoute = (req, res, next) => {
  debug('Checking token');
  const { authorization } = req.headers;
  if (!authorization) return next(new Error('403:noToken'));
  try {
    auth({ seed: config.get('jwt.seed') }).verifyToken(authorization);
    debug('Token validated');
    return next();
  } catch (e) {
    return next(new Error('403:noTokenVerified'));
  }
};

module.exports = authRoute;
