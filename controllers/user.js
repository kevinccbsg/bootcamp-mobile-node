const config = require('config');
const debug = require('debug')('Nodepop:User');
const { User } = require('../models');

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
