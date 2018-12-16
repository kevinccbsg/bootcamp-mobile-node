const config = require('config');
const debug = require('debug')('Nodepop:Anuncio');
const Anuncio = require('../models/Anuncio');

module.exports.getAnuncio = async (req, res, next) => {
  try {
    const anuncios = await Anuncio(config.get('ddbb'))
      .getAnuncios({});
    return res.json({ success: true, anuncios });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};
