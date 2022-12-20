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
     
    let sum = 0
    for(let i=0; i<=9000000000; i++){
      sum += 1

    }

    return "철수 성공!!"
  }

  @Get('/qqq2')
  getHello2(): string {

    return "영희 성공!!"
  }
}
