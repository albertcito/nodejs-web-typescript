import { Express } from 'express';

import getServer from '../init/server';

import getAdminUser from './config/getAdminUser';
import GenericTest from './config/GenericTest';

import langCreateTest from './graphql/public/lang/langCreate';
import LangUpdateTest from './graphql/public/lang/langUpdate';
import LangDeleteTest from './graphql/public/lang/langDelete';
import LangTest from './graphql/public/lang/lang';
import LangsTest from './graphql/public/lang/langs';
import UsersTest from './graphql/public/user/users';
import UserTest from './graphql/public/user/user';
import UserBasicUpdateTest from './graphql/public/user/userBasicUpdate';
import UserUpdateTest from './graphql/public/user/userUpdate';
import UserEmailUpdateTest from './graphql/public/user/userEmailUpdate';
import UserPasswordUpdateTest from './graphql/public/user/userPasswordUpdate';
import ProfileEmailUpdate from './graphql/public/user/profileEmailUpdate';
import ProfilePasswordUpdate from './graphql/public/user/profilePasswordUpdate';
import LoginTest from './graphql/public/user/login';
import SignUpTest from './graphql/public/user/signup';
import ForgotPasswordTest from './graphql/public/user/forgotPassword';
import ResetPasswordTest from './graphql/public/user/resetPassword';
import ActivateEmailTest from './graphql/public/user/activateEmail';
import LogoutTest from './graphql/public/user/logout';

let app: Express;
let superAdminToken = '';
let genericTest: GenericTest;

beforeAll(async () => {
  app = await getServer();
  const admin = await getAdminUser();
  superAdminToken = admin.token;
  genericTest = new GenericTest(app);
});

describe('GET /graphql/public', () => {
  it('m: langCreate', (done) => langCreateTest(app, superAdminToken, done));
  it('m: langUpdate', async (done) => genericTest.test(done, new LangUpdateTest(), superAdminToken));
  it('m: langDelete', async (done) => genericTest.test(done, new LangDeleteTest(), superAdminToken));
  it('q: langs', (done) => genericTest.test(done, new LangsTest()));
  it('q: lang', (done) => genericTest.test(done, new LangTest(), superAdminToken));
  it('q: users', (done) => genericTest.test(done, new UsersTest(), superAdminToken));
  it('q: user', (done) => genericTest.test(done, new UserTest(), superAdminToken));
  it('q: userUpdate', (done) => genericTest.test(done, new UserUpdateTest(), superAdminToken));
  it('m: userEmailUpdate', (done) => genericTest.test(done, new UserEmailUpdateTest(), superAdminToken));
  it('m: userPasswordUpdate', (done) => genericTest.test(done, new UserPasswordUpdateTest(), superAdminToken));
  it('m: profileEmailUpdate', (done) => genericTest.test(done, new ProfileEmailUpdate(), superAdminToken));
  it('m: profilePasswordUpdate', (done) => genericTest.test(done, new ProfilePasswordUpdate(), superAdminToken));
  it('m: login', (done) => genericTest.test(done, new LoginTest()));
  it('m: signUp', (done) => genericTest.test(done, new SignUpTest()));
  it('m: forgotPassword', (done) => genericTest.test(done, new ForgotPasswordTest()));
  it('m: resetPassword', (done) => genericTest.test(done, new ResetPasswordTest()));
  it('m: activateEmail', (done) => genericTest.test(done, new ActivateEmailTest()));
  it('q: logout', (done) => genericTest.test(done, new LogoutTest(), superAdminToken));
});
