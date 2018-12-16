'use strict'

let anuncios = [];

module.exports = (config) => {
  return {
    getAnuncios: async (query, limit, sort) => {
      let queryResult = anuncios;
      if (limit) queryResult = queryResult.slice(0, limit);
      return anuncios;
    },
    saveAnuncios: async (items) => {
      anuncios = anuncios.concat(items);
      return Promise.resolve(anuncios);
    },
    deleteAll: async () => {
      anuncios = [];
      return Promise.resolve([]);
    }
  };
};