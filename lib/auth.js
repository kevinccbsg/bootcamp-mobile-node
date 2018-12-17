const bcrypt = require('bcrypt');
const debug = require('debug')('Nodepop:lib:auth');
const jwt = require('jsonwebtoken');

module.exports = ({ saltRounds, seed }) => ({
  getHash: password => new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (errSalt, salt) => {
      if (errSalt) return reject(errSalt);
      debug('Salt generated');
      return bcrypt.hash(password, salt, (errHash, hash) => {
        if (errHash) return reject(errHash);
        debug('Hash generated');
        return resolve(hash);
      });
    });
  }),
  isAuth: (password, hash) => bcrypt.compare(password, hash),
  signToken: email => jwt.sign({ email }, seed),
  verifyToken: token => jwt.verify(token, seed),
});
