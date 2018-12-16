'use strict'
const path = require('path');
const stores = require('require-all')({
  dirname: __dirname,
  filter: fileName => (fileName.toLowerCase() === path.basename(__filename) ? undefined : fileName.replace('.js', '')),
});

module.exports = (config) => {
  const ddbb = stores[config.type].index;
  return {
    getAnuncios: ddbb(config).getAnuncios,
    saveAnuncios: ddbb(config).saveAnuncios,
    deleteAll: ddbb(config).deleteAll,
  };
};