/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import User from 'src/db/entities/User';
import OauthAccessToken from 'src/db/entities/OauthAccessToken';

export interface SessionData {
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
class Session {
  private static instance: Session;

  private session?: SessionData;

  private constructor() {}

  static getInstance(): Session {
    if (!Session.instance) {
      Session.instance = new Session();
    }
    return Session.instance;
  }

  public setSession(session?: SessionData): void {
    this.session = session;
  }

  public getSession(): SessionData | undefined {
    return this.session;
  }
}

export default Session;
