
let anuncios = [];

module.exports = () => (
  {
    getAnuncios: async (query, limit) => {
      let queryResult = anuncios;
      if (limit) queryResult = queryResult.slice(0, limit);
      return queryResult;
    },
    saveAnuncios: async (items) => {
      anuncios = anuncios.concat(items);
      return Promise.resolve(anuncios);
    },
    deleteAll: async () => {
      anuncios = [];
      return Promise.resolve([]);
    },
  }
);
