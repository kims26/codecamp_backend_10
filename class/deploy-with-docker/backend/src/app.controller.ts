// app.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  // zzzzz
  getHello() {
    return '천연사이다';
  }
}
