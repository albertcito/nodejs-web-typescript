import { Express } from 'express';

import getApp from '../init/app';

import getOauthTokenValid from './config/getOauthTokenValid';
import GenericTest from './config/GenericTest';

import langCreateTest from './graphql/public/lang/langCreate';
import LangUpdateTest from './graphql/public/lang/langUpdate';
import LangDeleteTest from './graphql/public/lang/langDelete';
import LangTest from './graphql/public/lang/lang';
import LangsTest from './graphql/public/lang/langs';
import UsersTest from './graphql/public/user/users';
import UserTest from './graphql/public/user/user';
import LoginTest from './graphql/public/user/login';
import SignUpTest from './graphql/public/user/signup';
import ForgotPasswordTest from './graphql/public/user/forgotPassword';
import ResetPasswordTest from './graphql/public/user/resetPassword';
import ActivateEmailTest from './graphql/public/user/activateEmail';
import LogoutTest from './graphql/public/user/logout';

let app: Express;
let token = '';
let genericTest: GenericTest;

beforeAll(async () => {
  app = await getApp();
  token = await getOauthTokenValid();
  genericTest = new GenericTest(app);
});

describe('GET /graphql/public', () => {
  it('m: langCreate', (done) => langCreateTest(app, token, done));
  it('m: langUpdate', async (done) => genericTest.test(done, new LangUpdateTest(), token));
  it('m: langDelete', async (done) => genericTest.test(done, new LangDeleteTest(), token));
  it('q: langs', (done) => genericTest.test(done, new LangsTest()));
  it('q: lang', (done) => genericTest.test(done, new LangTest(), token));
  it('q: users', (done) => genericTest.test(done, new UsersTest(), token));
  it('q: user', (done) => genericTest.test(done, new UserTest(), token));
  it('m: login', (done) => genericTest.test(done, new LoginTest()));
  it('m: signUp', (done) => genericTest.test(done, new SignUpTest()));
  it('m: forgotPassword', (done) => genericTest.test(done, new ForgotPasswordTest()));
  it('m: resetPassword', (done) => genericTest.test(done, new ResetPasswordTest()));
  it('m: activateEmail', (done) => genericTest.test(done, new ActivateEmailTest()));
  it('q: logout', (done) => genericTest.test(done, new LogoutTest(), token));
});
