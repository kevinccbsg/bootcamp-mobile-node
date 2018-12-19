
module.exports = {
  logger: {
    format: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"',
  },
  ddbb: {
    url: process.env.DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'nodepop',
    type: process.env.DB_TYPE || 'mongodb',
  },
  jwt: {
    seed: process.env.JWT_SEED || 'mysecretsuperseed',
  },
};
