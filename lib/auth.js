const bcrypt = require('bcrypt');
const debug = require('debug')('Nodepop:lib:auth');

module.exports = ({ saltRounds }) => ({
  getHash: (password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(err);
      debug('Salt generated');
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        debug('Hash generated');
        return resolve(hash);
      });
    });
  }),
  isAuth: (password, hash) => bcrypt.compare(password, hash),
});
