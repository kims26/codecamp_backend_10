import { IAuthUser } from 'src/commons/types/context';

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
