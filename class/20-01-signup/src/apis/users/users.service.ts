import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUsersServiceCreate } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({
    email,
    hashedPassword: password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    // if (user) throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);

    return this.usersRepository.save({ email, password, name, age });
  }
}
