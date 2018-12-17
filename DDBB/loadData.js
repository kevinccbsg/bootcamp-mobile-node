const config = require('config');
const debug = require('debug')('Nodepop:load');
const { anuncios, users, tags } = require('./mockData.json');
const { Anuncio, User, Tag } = require('../models');

const deleteDB = () => Promise.all([
  Anuncio(config.get('ddbb')).deleteAll(),
  User(config.get('ddbb')).deleteAll(),
  Tag(config.get('ddbb')).deleteAll(),
]);

(async () => {
  try {
    debug('<---Deleting DDBB--->');
    await deleteDB();
    debug('<---DDBB Deleted--->');

    debug('<---Loading anuncios--->');
    await Anuncio(config.get('ddbb')).saveAnuncios(anuncios);
    debug('<---Anuncios Loaded--->');

    debug('<---Loading Users--->');
    await Promise.all(users.map(user => User(config.get('ddbb')).register(user)));
    debug('<---Users Loaded--->');

    debug('<---Loading Tags--->');
    await Tag(config.get('ddbb')).saveTags(tags);
    debug('<---Tags Loaded--->');

    debug('<---Digest data finished--->');
  } catch (e) {
    debug('<---Deleting DDBB--->');
    await deleteDB();
    debug('<---Deleting DDBB--->');
    throw e;
  }
})();
