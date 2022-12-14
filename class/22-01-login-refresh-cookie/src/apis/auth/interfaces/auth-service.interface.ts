import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceGetAccessToken {
  user: User;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}
