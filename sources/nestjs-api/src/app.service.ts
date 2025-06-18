import { Injectable } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Injectable()
export class AppService {
  constructor(private readonly mongoService: MongoService) { }

  async ping(): Promise<boolean> {
    return this.mongoService.ping();
  }

  async getFeatures(): Promise<any> {
    const docs = await this.mongoService.findDocuments('featureFlags', {});
    if (!docs.length) {
      return { status: 404, message: 'No features found' };
    }
    const features = docs.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
    return features;
  }
}
