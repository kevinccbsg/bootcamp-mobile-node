const path = require('path');
const stores = require('require-all')({
  dirname: __dirname,
  filter: fileName => (fileName.toLowerCase() === path.basename(__filename) ? undefined : fileName.replace('.js', '')),
});

module.exports = {
  Anuncio: config => stores[config.type].Anuncio(config),
  User: config => stores[config.type].User(config),
};
