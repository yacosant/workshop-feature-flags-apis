import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
  private readonly mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/shared_db';

  async ping(): Promise<boolean> {
    let client: MongoClient | null = null;
    try {
      client = new MongoClient(this.mongoUrl);
      await client.db().admin().ping();
      await client.close();
      return true;
    } catch {
      if (client) await client.close();
      return false;
    }
  }

  async findDocuments(collection: string, query = {}): Promise<any[]> {
    let client: MongoClient | null = null;
    try {
      client = new MongoClient(this.mongoUrl);
      await client.connect();
      const db = client.db();
      const docs = await db.collection(collection).find(query).toArray();
      return docs;
    } catch (e) {
      return [];
    } finally {
      if (client) await client.close();
    }
  }
}
