
module.exports = {
  logger: {
    format: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"',
  },
  ddbb: {
    url: process.env.DB_URL || 'mongodb://mongo-nodepop:27017',
    dbName: process.env.DB_NAME || 'nodepop',
    type: process.env.DB_TYPE || 'mongodb',
  },
  jwt: {
    seed: process.env.JWT_SEED || 'mysecretsuperseed',
  },
  router: {
    swaggerOptions: {
      info: {
        description: 'This documentation for Nodepop API',
        title: 'Nodepop API',
        version: '1.0.0',
        contact: {
          name: 'Kevin Martínez',
          email: 'kevinccbsg@gmail.com',
        },
      },
      servers: [],
      security: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
      baseDir: process.cwd(),
      filesPattern: './**/api**.js',
    },
  },
};
