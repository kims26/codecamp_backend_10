import { User } from '../entities/user.entity';
import { UsersService } from './';
import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

//나만의 미니 Typeorm 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '1234', name: '짱구', age: 8 },

    { email: 'qqq@qqq.com', password: '1234', name: '상현', age: 26 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      // imports: [typeORMModule...]
      //controllers: []
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //이렇게하면, 진짜db가서 찾아와서 비교함
  // describe("findOne", ()=> {
  //     const resuit = usersService.findOne({email: 'a@a.com'});
  //     expect(result).toBe({
  //         email: "a@a.com",
  //         name: "철수",
  //         ...
  //     })
  // });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!!', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록 잘 됐는지 검증!!,', () => {
      usersService.create();
    });
  });
});
