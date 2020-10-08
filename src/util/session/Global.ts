/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import User from '../../db/entities/User';

class Global {
  private static instance: Global;

  private privateUser?: User;

  private constructor() {}

  static getInstance(): Global {
    if (!Global.instance) {
      Global.instance = new Global();
    }
    return Global.instance;
  }

  public setUser(user?: User): void {
    this.privateUser = user;
  }

  public getUser(): User | undefined {
    return this.privateUser;
  }
}

export default Global;
