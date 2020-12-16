import GenericTestData from '../../../config/GenericTestData';

export default class LogoutTest implements GenericTestData {
  async resolver() {
    return { query: 'mutation { logout  }' };
  }

  rules() {
    return {
      logout: 'required|string',
    };
  }
}
