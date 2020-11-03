import Login from '../../logic/user/session/login';
import dbUsers from '../../db/util/dbUser';

const getsuperAdminUser = async () => {
  const { superAdmin } = dbUsers();
  const login = new Login(superAdmin.email, superAdmin.password);
  const userToken = await login.getUser();
  return userToken;
};

export default getsuperAdminUser;
