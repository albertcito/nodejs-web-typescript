import { Express } from 'express';

import getApp from '../init/app';
import getOauthTokenValid from './config/getOauthTokenValid';
import usersTest from './graphql/private/user/users';
import langTest from './graphql/private/lang/lang';
import langsTest from './graphql/private/lang/langs';
import langCreateTest from './graphql/private/lang/langCreate';
import langUpdateTest from './graphql/private/lang/langUpdate';
import langDeleteTest from './graphql/private/lang/langDelete';
import loginTest from './graphql/public/user/login';
import signupTest from './graphql/public/user/signup';
import forgotPasswordTest from './graphql/public/user/forgotPassword';
import resetPasswordTest from './graphql/public/user/resetPassword';
import activateEmailTest from './graphql/public/user/activateEmail';

let app: Express;
let token = '';

beforeAll(async () => {
  app = await getApp();
  token = await getOauthTokenValid();
});

describe('GET /graphql/private', () => {
  it('q: users', (done) => usersTest(app, token, done));
  it('q: lang', (done) => langTest(app, token, done));
  it('q: langs', (done) => langsTest(app, token, done));
  it('m: langCreate', (done) => langCreateTest(app, token, done));
  it('m: langUpdate', async (done) => langUpdateTest(app, token, done));
  it('m: langDelete', async (done) => langDeleteTest(app, token, done));
});

describe('GET /graphql/public', () => {
  it('m: login', (done) => loginTest(app, done));
  it('m: signUp', (done) => signupTest(app, done));
  it('m: forgotPassword', (done) => forgotPasswordTest(app, done));
  it('m: resetPassword', (done) => resetPasswordTest(app, done));
  it('m: activateEmail', (done) => activateEmailTest(app, done));
});
