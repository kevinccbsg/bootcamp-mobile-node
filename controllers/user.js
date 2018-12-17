const config = require('config');
const debug = require('debug')('Nodepop:User');
const { User } = require('../models');
const auth = require('../lib/auth');

module.exports.register = async (req, res, next) => {
  try {
    const user = await User(config.get('ddbb'))
      .register(req.body);
    return res.json({ success: true, user });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await User(config.get('ddbb'))
      .isAuth(email, password);
    const token = auth({ seed: config.get('jwt.seed') }).signToken(email);
    return res.json({ success: true, token });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};
