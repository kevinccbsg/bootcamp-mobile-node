'use sctrict'
const config = require('config');
const Anuncio = require('../models/anuncio');
const debug = require('debug')('Nodepop:Anuncio');

module.exports.getAnuncio = async (req, res, next) => {
  try {
    const anuncios = await Anuncio(config.get('ddbb'))
      .getAnuncios({});
    res.json({ success: true, anuncios });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
}; 
