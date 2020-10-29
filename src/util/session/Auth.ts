import Global, { GlobalData } from './Global';

class Auth {
  public static data(): GlobalData | undefined {
    const global = Global.getInstance();
    return global.getData();
  }

  public static setData(data?: GlobalData) {
    const global = Global.getInstance();
    global.setData(data);
  }
}

export default Auth;
