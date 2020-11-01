import GenericTestData from '../../../../config/GenericTestData';
import getFakerUser from '../../../../../db/factories/user.factory';
import Login from '../../../../../logic/user/session/login';

export default class LogoutTest implements GenericTestData {
  async resolver() {
    // create a user
    const password = '123456';
    const user = getFakerUser('123456');
    await user.save();

    // Login
    const login = new Login(user.email, password);
    await login.getUser();

    return { query: '{ logout }' };
  }

  rules() {
    return {
      logout: 'required|string',
    };
  }
}
