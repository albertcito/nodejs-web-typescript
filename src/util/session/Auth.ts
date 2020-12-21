import Session, { SessionData } from './Session';

class Auth {
  public static sessionOrEmpty(): SessionData | undefined {
    const global = Session.getInstance();
    return global.getSession();
  }

  public static session(): SessionData {
    const global = Session.getInstance();
    const data = global.getSession();
    if (!data) {
      throw new Error('Session does not exists');
    }
    return data;
  }

  public static setSession(session?: SessionData) {
    const global = Session.getInstance();
    global.setSession(session);
  }
}

export default Auth;
