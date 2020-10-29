/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import User from '../../db/entities/User';
import OauthAccessToken from '../../db/entities/OauthAccessToken';

export interface GlobalData {
  user: User;
  auth: OauthAccessToken;
}

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
