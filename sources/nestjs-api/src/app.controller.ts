import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  async getHealth() {
    const isAlive: boolean = await this.appService.ping();
    return { name: "nestjs-api", status: 200, database: isAlive ? "OK" : "KO" };
  }

  @Get('features')
  async getFeatures() {
    return await this.appService.getFeatures();
  }
}
