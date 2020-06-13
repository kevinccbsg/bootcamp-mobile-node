
module.exports = {
  logger: {
    format: ':method :url :status :response-time ms - :res[content-length]',
  },
  ddbb: {
    url: 'mongodb://localhost:27017',
    dbName: 'nodepop',
    type: 'mongodb',
  },
  jwt: {
    seed: 'mysecretsuperseed',
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
