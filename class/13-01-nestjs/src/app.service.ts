import { Injectable, Scope } from '@nestjs/common';

// @Injectable({ scope: Scope.REQUEST })
// @Injectable({ scope: Scope.TRANSIENT })
@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  // constructor(
  //   private readonly qqqService: QqqService
  // ){

  // }

  aaa(num1: number, num2: number, unit: string): string {
    return 'Hello World!';
  }
}
