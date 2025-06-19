import { MongoClient, Filter } from 'mongodb';

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/shared_db';
const client = new MongoClient(mongoUrl);

export async function ping(): Promise<boolean> {
  try {
    await client.connect();
    await client.db().admin().ping();
    await client.close();
    return true;
  } catch (err) {
    try { await client.close(); } catch { }
    return false;
  }
}


export async function find(collectionName: string, filter: Filter<any> = {}) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const docs = await collection.find(filter).toArray();
    await client.close();
    return docs;
  } catch (err) {
    try { await client.close(); } catch { }
    return [];
  }
}

export async function getCacheTime() {
  await client.connect();
  const db = client.db();
  const doc = await db.collection('cache').findOne({});
  await client.close();
  return doc?.time || 0;
}

export async function setCacheTime(time: number) {
  await client.connect();
  const db = client.db();
  await db.collection('cache').updateOne({}, { $set: { time } }, { upsert: true });
  await client.close();
}

