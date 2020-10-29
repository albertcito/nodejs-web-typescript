/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import User from '../../db/entities/User';
import OauthAccessToken from '../../db/entities/OauthAccessToken';

export interface GlobalData {
  user: User;
  auth: OauthAccessToken;
}
/**
 * Singleton class to get the current User and OauthAccessToken logged
 *
 * This is a Singleton class to save globaly the current session.
 * Please be aware that use this kind of class make very difficult debug code.
 * So, try to dont create manY of this kind of class. And dont overload with data or method.
 *
 * To read: https://www.yegor256.com/2016/06/27/singletons-must-die.html
 */
class Global {
  private static instance: Global;

  private data?: GlobalData;

  private constructor() {}

  static getInstance(): Global {
    if (!Global.instance) {
      Global.instance = new Global();
    }
    return Global.instance;
  }

  public setData(data?: GlobalData): void {
    this.data = data;
  }

  public getData(): GlobalData | undefined {
    return this.data;
  }
}

export default Global;
