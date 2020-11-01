import Login from '../../logic/user/session/login';
import dbUSers from '../../db/util/dbUser';

const getAdminUser = async () => {
  const { admin } = dbUSers();
  const login = new Login(admin.email, admin.password);
  const userToken = await login.getUser();
  return userToken;
};

export default getAdminUser;
