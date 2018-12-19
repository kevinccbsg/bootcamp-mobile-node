const isNumber = require('lodash/isNumber');

module.exports = (input) => {
  let filter = { ...input };
  return {
    tagFilter: ({ tag }) => {
      filter = {
        ...filter,
        tags: { $in: [tag] },
      };
      return filter;
    },
    sellFilter: ({ venta }) => {
      filter = {
        ...filter,
        venta: !!venta,
      };
      return filter;
    },
    nameFilter: ({ nombre }) => {
      filter = {
        ...filter,
        nombre: new RegExp(`^${nombre}`, 'i'),
      };
      return filter;
    },
    priceFilter: ({ precio }) => {
      if (!precio.includes('-')) throw new Error('400');
      const [gte, lte] = precio.split('-');
      if ((gte && !isNumber(Number(gte)))
        || (lte && !isNumber(Number(lte)))) throw new Error('400');
      filter = {
        ...filter,
        precio: {},
      };
      if (gte) {
        filter = {
          ...filter,
          precio: {
            ...filter.precio,
            $gte: Number(gte),
          },
        };
      }
      if (lte) {
        filter = {
          ...filter,
          precio: {
            ...filter.precio,
            $lte: Number(lte),
          },
        };
      }
      return filter;
    },
    filterValue: () => filter,
  };
};
