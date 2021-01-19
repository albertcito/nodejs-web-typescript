import { Express } from 'express';
import { Connection, createConnection } from 'typeorm';

import connectionOptions from '../init/db/connectionOptions';
import getServer from '../init/server';
import { getSuperAdminUserLogin, getAdminLogin } from './config/getUserLogins';
import GenericTest from './config/GenericTest';
import langCreateTest from './graphql/lang/langCreate';
import LangUpdateTest from './graphql/lang/langUpdate';
import LangDeleteTest from './graphql/lang/langDelete';
import LangTest from './graphql/lang/lang';
import LangsTest from './graphql/lang/langs';
import UsersTest from './graphql/user/users';
import UserTest from './graphql/user/user';
import UserBasicUpdateTest from './graphql/user/session/userBasicUpdate';
import UserEmailUpdateTest from './graphql/user/session/userEmailUpdate';
import UserPasswordUpdateTest from './graphql/user/session/userPasswordUpdate';
import ProfileEmailUpdate from './graphql/user/session/profileEmailUpdate';
import ProfilePasswordUpdate from './graphql/user/session/profilePasswordUpdate';
import ProfileBasicUpdate from './graphql/user/session/profileBasicUpdate';
import LoginTest from './graphql/user/session/login';
import LogoutTest from './graphql/user/session/logout';
import LoggedUserTest from './graphql/user/session/loggedUser';
import SignUpTest from './graphql/user/session/signup';
import ForgotPasswordTest from './graphql/user/session/forgotPassword';
import ResetPasswordTest from './graphql/user/session/resetPassword';
import ActivateEmailTest from './graphql/user/session/activateEmail';
import RolesTest from './graphql/roles/roles';
import RoleTest from './graphql/roles/role';
import RoleUpdateTest from './graphql/roles/roleUpdate';
import RoleUpdateRejectTest from './graphql/roles/roleUpdateReject';
import UserRolesUpdateTest from './graphql/user/roles/userRolesUpdate';
import UserStatusReasonsTest from './graphql/user/status/userStatusReasons';
import UserStatusesTest from './graphql/user/status/userStatuses';
import TranslationsTest from './graphql/translation/translations';
import TranslationTest from './graphql/translation/translation';
import TranslationCreateTest from './graphql/translation/translationCreate';
import TranslationUpdateTest from './graphql/translation/translationUpdate';
import TranslationDeleteTest from './graphql/translation/translationDelete';
import UserStatusUpdateOauthTest from './graphql/user/status/userStatusUpdateOauth';
import ImageUploadTest from './graphql/media/imageUpload';

let db: Connection;
let genericTest: GenericTest;
let app: Express;
let superAdminToken = '';
let tokenLogout = '';
let adminToken = '';

beforeAll(async () => {
  db = await createConnection(connectionOptions);
  app = await getServer();
  const superAdmin = await getSuperAdminUserLogin();
  superAdminToken = superAdmin.token;

  const adminLogout = await getSuperAdminUserLogin();
  tokenLogout = adminLogout.token;

  const admin = await getAdminLogin();
  adminToken = admin.token;

  genericTest = new GenericTest(app);
});

afterAll(async () => {
  await db.close();
});

describe('GET /graphql', () => {
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
  it('m: userRolesUpdate', (done) => genericTest.test(done, new UserRolesUpdateTest(), superAdminToken));
  it('m: roleUpdate -> Reject -> 403', (done) => (new RoleUpdateRejectTest(genericTest.url, app)).test(done, adminToken));
  it(
    'm: userStatusUpdate -> inactive -> revoke oAuthToken',
    (done) => (new UserStatusUpdateOauthTest(genericTest.url, app)).test(done, superAdminToken),
  );
  it('m: userStatusReasons', (done) => genericTest.test(done, new UserStatusReasonsTest(), superAdminToken));
  it('m: UserStatuses', (done) => genericTest.test(done, new UserStatusesTest(), superAdminToken));
  it('q: translations', (done) => genericTest.test(done, new TranslationsTest(), adminToken));
  it('q: translation', (done) => genericTest.test(done, new TranslationTest(), adminToken));
  it('m: translationCreate', (done) => genericTest.test(done, new TranslationCreateTest(), adminToken));
  it('m: translationUpdate', (done) => genericTest.test(done, new TranslationUpdateTest(), adminToken));
  it('m: translationDelete', (done) => genericTest.test(done, new TranslationDeleteTest(), adminToken));
  it('m: imageUpload', (done) => ImageUploadTest(app, superAdminToken, done));
});
