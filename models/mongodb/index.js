'use strict'
const MongoClient = require('mongodb').MongoClient;
const isArray = require('lodash/isArray');

module.exports = (config) => {
  if (!config.url || !config.dbName || !config.collection) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName, collection } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    getAnuncios: async (query, limit, sort) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        const cursor = await col.find(query);
        if (limit) cursor.limit(limit);
        if (sort) cursor.sort(sort);
        return cursor.toArray();
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
    saveAnuncio: async (items) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        const r = await col.insertMany([].concat(items));
        return r;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
  };
};