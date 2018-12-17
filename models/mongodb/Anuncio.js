const { MongoClient } = require('mongodb');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    getAnuncios: async (query, limit, sort) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('anuncios');
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
    saveAnuncios: async (items) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('anuncios');
        const { insertedIds } = await col.insertMany([].concat(items));
        return insertedIds;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
    deleteAll: async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('anuncios');
        await col.deleteMany({});
        return;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
    registerUser: async (user) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');

        await col.insert(user);
        return;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
  };
};
