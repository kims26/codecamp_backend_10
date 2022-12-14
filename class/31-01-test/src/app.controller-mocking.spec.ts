import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다???';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트이 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello world');
    });
  });
});
