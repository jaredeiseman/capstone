export class User {
  constructor(public username: string,
              public password: string,
              public isAdmin: boolean,
              public firstName: string,
              public lastName: string,
              public email: string) {}
}
