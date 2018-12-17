const { MongoClient } = require('mongodb');
const auth = require('../../lib/auth');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    register: async (user) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        col.createIndex('email', { unique: true });
        const password = auth(10).getHash(user.password);
        const userEncripted = {
          ...user,
          password,
        };
        const result = await col.insertOne(userEncripted);
        return { name: user.name, email: user.email };
      } catch (e) {
        throw new Error(e);
      } finally {
        client.close();
      }
    },
  };
};
