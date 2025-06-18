import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHealth() {
    const isAlive: boolean = await this.appService.ping();
    return { name: "nestjs-api", status: 200, database: isAlive ? "OK" : "KO" };
  }
}
