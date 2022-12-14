export interface IUsersServiceFindOne {
  email: string;
}

export interface IUsersServiceCreate {
  email: string;
  hashedPassword: string;
  name: string;
  age: number;
}
