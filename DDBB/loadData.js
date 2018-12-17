const config = require('config');
const { anuncios } = require('./mockData.json');
const { Anuncio } = require('../models');

(async () => {
  await Anuncio(config.get('ddbb')).deleteAll();
  const results = await Anuncio(config.get('ddbb')).saveAnuncios(anuncios);
  console.log(results);
})();
