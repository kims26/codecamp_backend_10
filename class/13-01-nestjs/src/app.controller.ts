import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, //
  ) {}

  // private readonly qqqService: QqqService,

  // private readonly zzzService: ZzzService,

  @Get('/qqq')
  getHello(): string {
    return this.appService.aaa(2000, 1000, '원');
  }
}
