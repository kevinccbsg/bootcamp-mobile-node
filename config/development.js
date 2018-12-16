
module.exports = {
  logger: {
    format: ':method :url :status :response-time ms - :res[content-length]',
  },
  ddbb: {
    url: 'mongodb://localhost:27017',
    dbName: 'nodepop',
    collection: 'anuncios',
    type: 'mongodb'
  }
};
