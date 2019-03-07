const { MongoClient } = require('mongodb');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    getTags: async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('tags');
        const cursor = await col.find({});
        const tags = await cursor.toArray();
        return tags;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
    saveTags: async (items) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('tags');
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
        const col = db.collection('tags');
        await col.deleteMany({});
        return;
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
  };
};
