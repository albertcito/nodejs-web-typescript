import Login from '../../logic/user/session/login';
import dbUsers from '../../db/util/dbUser';

export const getSuperAdminUserLogin = async () => {
  const { superAdmin } = dbUsers();
  const login = new Login(superAdmin.email, superAdmin.password);
  const userToken = await login.getUser();
  return userToken;
};

export const getAdminLogin = async () => {
  const { admin } = dbUsers();
  const login = new Login(admin.email, admin.password);
  const userToken = await login.getUser();
  return userToken;
};
