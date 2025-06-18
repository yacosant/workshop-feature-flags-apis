import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {

  private readonly mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/shared_db';

  async ping(): Promise<boolean> {
    try {
      const client = new MongoClient(this.mongoUrl);
      await client.db().admin().ping();
      await client.close();
      return true;
    } catch {
      return false;
    }
  }

}
