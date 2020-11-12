import { Express } from 'express';

import getServer from '../init/server';
import { getSuperAdminUserLogin, getAdminLogin } from './config/getUserLogins';
import GenericTest from './config/GenericTest';
import langCreateTest from './graphql/public/lang/langCreate';
import LangUpdateTest from './graphql/public/lang/langUpdate';
import LangDeleteTest from './graphql/public/lang/langDelete';
import LangTest from './graphql/public/lang/lang';
import LangsTest from './graphql/public/lang/langs';
import UsersTest from './graphql/public/user/users';
import UserTest from './graphql/public/user/user';
import UserBasicUpdateTest from './graphql/public/user/session/userBasicUpdate';
import UserEmailUpdateTest from './graphql/public/user/session/userEmailUpdate';
import UserPasswordUpdateTest from './graphql/public/user/session/userPasswordUpdate';
import ProfileEmailUpdate from './graphql/public/user/session/profileEmailUpdate';
import ProfilePasswordUpdate from './graphql/public/user/session/profilePasswordUpdate';
import ProfileBasicUpdate from './graphql/public/user/session/profileBasicUpdate';
import LoginTest from './graphql/public/user/session/login';
import LogoutTest from './graphql/public/user/session/logout';
import LoggedUserTest from './graphql/public/user/session/loggedUser';
import SignUpTest from './graphql/public/user/session/signup';
import ForgotPasswordTest from './graphql/public/user/session/forgotPassword';
import ResetPasswordTest from './graphql/public/user/session/resetPassword';
import ActivateEmailTest from './graphql/public/user/session/activateEmail';
import RolesTest from './graphql/public/roles/roles';
import RoleTest from './graphql/public/roles/role';
import RoleUpdateTest from './graphql/public/roles/roleUpdate';
import RoleUpdateRejectTest from './graphql/public/roles/roleUpdateReject';
import UserRolesUpdateTest from './graphql/public/user/roles/userRolesUpdate';
import TranslationsTest from './graphql/public/translation/translations';
import TranslationTest from './graphql/public/translation/translation';
import TranslationCreateTest from './graphql/public/translation/translationCreate';
import TranslationUpdateTest from './graphql/public/translation/translationUpdate';
import TranslationDeleteTest from './graphql/public/translation/translationDelete';
import UserStatusUpdateTest from './graphql/public/user/status/userStatusUpdate';
import UserStatusUpdateOauthTest from './graphql/public/user/status/UserStatusUpdateOauth';

let genericTest: GenericTest;
let app: Express;
let superAdminToken = '';
let tokenLogout = '';
let adminToken = '';

beforeAll(async () => {
  app = await getServer();
  const superAdmin = await getSuperAdminUserLogin();
  superAdminToken = superAdmin.token;

  const adminLogout = await getSuperAdminUserLogin();
  tokenLogout = adminLogout.token;

  const admin = await getAdminLogin();
  adminToken = admin.token;

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
  it('m: userUpdate', (done) => genericTest.test(done, new UserBasicUpdateTest(), superAdminToken));
  it('m: userEmailUpdate', (done) => genericTest.test(done, new UserEmailUpdateTest(), superAdminToken));
  it('m: userPasswordUpdate', (done) => genericTest.test(done, new UserPasswordUpdateTest(), superAdminToken));
  it('m: profileEmailUpdate', (done) => genericTest.test(done, new ProfileEmailUpdate(), superAdminToken));
  it('m: profilePasswordUpdate', (done) => genericTest.test(done, new ProfilePasswordUpdate(), superAdminToken));
  it('m: profileBasicUpdate', (done) => genericTest.test(done, new ProfileBasicUpdate(), superAdminToken));
  it('m: login', (done) => genericTest.test(done, new LoginTest()));
  it('m: loggedUser', (done) => genericTest.test(done, new LoggedUserTest(), tokenLogout));
  it('m: logout', (done) => genericTest.test(done, new LogoutTest(), tokenLogout));
  it('m: signUp', (done) => genericTest.test(done, new SignUpTest()));
  it('m: forgotPassword', (done) => genericTest.test(done, new ForgotPasswordTest()));
  it('m: resetPassword', (done) => genericTest.test(done, new ResetPasswordTest()));
  it('m: activateEmail', (done) => genericTest.test(done, new ActivateEmailTest()));
  it('q: roles', (done) => genericTest.test(done, new RolesTest(), superAdminToken));
  it('q: role', (done) => genericTest.test(done, new RoleTest(), superAdminToken));
  it('m: roleUpdate', (done) => genericTest.test(done, new RoleUpdateTest(), superAdminToken));
  it('m: userRolesCreate', (done) => genericTest.test(done, new UserRolesUpdateTest(), superAdminToken));
  it('m: roleUpdate -> Reject -> 403', (done) => (new RoleUpdateRejectTest(genericTest.url, app)).test(done, adminToken));
  it('m: userStatusUpdate', (done) => genericTest.test(done, new UserStatusUpdateTest(), superAdminToken));
  it('m: userStatusUpdate -> revoked oAuthToken', (done) => (new UserStatusUpdateOauthTest(genericTest.url, app)).test(done, superAdminToken));
  it('q: translations', (done) => genericTest.test(done, new TranslationsTest(), adminToken));
  it('q: translation', (done) => genericTest.test(done, new TranslationTest(), adminToken));
  it('m: translationCreate', (done) => genericTest.test(done, new TranslationCreateTest(), adminToken));
  it('m: translationUpdate', (done) => genericTest.test(done, new TranslationUpdateTest(), adminToken));
  it('m: translationDelete', (done) => genericTest.test(done, new TranslationDeleteTest(), adminToken));
});
