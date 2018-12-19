const config = require('config');
const debug = require('debug')('Nodepop:Anuncio');
const { Anuncio } = require('../models');
const Filter = require('../lib/filters');

module.exports.getAnuncio = async (req, res, next) => {
  const {
    tag, venta, nombre, precio, limit, sort, start,
  } = req.query;
  let filter = {};
  try {
    const opFilter = Filter(filter);
    if (tag) opFilter.tagFilter(req.query);
    if (venta !== null && venta !== undefined) opFilter.sellFilter(req.query);
    if (nombre) opFilter.nameFilter(req.query);
    if (precio) opFilter.priceFilter(req.query);
    filter = opFilter.filterValue();
    debug('Getting Anuncios with Filter');
    debug(filter);
    let sortQuery = null;
    if (sort) sortQuery = sort.split(',').map(key => ({ [key]: 1 }));
    debug('Sort query');
    debug(sortQuery);
    debug('limit');
    debug(limit);
    const anuncios = await Anuncio(config.get('ddbb'))
      .getAnuncios(filter, limit, sortQuery, start);
    return res.json({ success: true, anuncios });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};
