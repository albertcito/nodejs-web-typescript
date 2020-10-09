/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import User from '../../db/entities/User';

class Global {
  private static instance: Global;

  private user?: User;

  private constructor() {}

  static getInstance(): Global {
    if (!Global.instance) {
      Global.instance = new Global();
    }
    return Global.instance;
  }

  public setUser(user?: User): void {
    this.user = user;
  }

  public getUser(): User | undefined {
    return this.user;
  }
}

export default Global;
