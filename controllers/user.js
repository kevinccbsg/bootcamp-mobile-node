const config = require('config');
const debug = require('debug')('Nodepop:User');
const validator = require('validator');
const { User } = require('../models');
const auth = require('../lib/auth');

module.exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) throw '400';
    if (!validator.isEmail(email)) throw '400:email';
    const user = await User(config.get('ddbb'))
      .register({ name, email, password });
    return res.status(201).json({ success: true, user });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw '400';
    if (!validator.isEmail(email)) throw '400:email';
    await User(config.get('ddbb'))
      .isAuth(email, password);
    const token = auth({ seed: config.get('jwt.seed') }).signToken(email);
    return res.json({ success: true, token });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};
