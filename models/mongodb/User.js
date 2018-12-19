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
        const password = await auth({
          saltRounds: 10,
        }).getHash(user.password);
        const userEncripted = {
          ...user,
          password,
        };
        await col.insertOne(userEncripted);
        return { name: user.name, email: user.email };
      } catch (e) {
        if (e.message.includes('E11000')) throw 'E11000';
        throw e;
      } finally {
        client.close();
      }
    },
    isAuth: async (email, userPassword) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        const user = await col.findOne({ email });
        if (!user) throw '403:password';
        const isAuth = await auth({
          saltRounds: 10,
        }).isAuth(userPassword, user.password);
        if (!isAuth) throw '403:password';
        return isAuth;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    deleteAll: async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        await col.deleteMany({});
        return;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
  };
};
