'use sctrict'
const Anuncio = require('../models/anuncio');

module.exports.getAnuncio = async (req, res) => {
  try {
    const anuncios = await Anuncio().getAnuncios();
    res.json({ success: true, anuncios });
  } catch (e) {
    throw new Error(e);
  }
}; 
