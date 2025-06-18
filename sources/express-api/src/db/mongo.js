const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/shared_db';

async function ping() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.db().admin().ping();
    await client.close();
    return true;
  } catch {
    return false;
  }
}

async function findDocuments(collection, query = {}) {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db();
    const docs = await db.collection(collection).find(query).toArray();
    return docs;
  } catch (e) {
    console.error('Mongo findDocuments error:', e.message);
    return [];
  } finally {
    await client.close();
  }
}

module.exports = { ping, findDocuments };
