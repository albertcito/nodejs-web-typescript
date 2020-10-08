import Global from './Global';
import User from '../../db/entities/User';

class Auth {
  public static user(): User | undefined {
    const global = Global.getInstance();
    return global.getUser();
  }

  public static setUser(user: User | undefined) {
    const global = Global.getInstance();
    global.setUser(user);
  }
}

export default Auth;
