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

let app: Express;
let token = '';

beforeAll(async () => {
  app = await getApp();
  token = await getOauthTokenValid();
});

describe('GET /graphql admin', () => {
  it('q: users', (done) => usersTest(app, token, done));
  it('q: lang(langID: $langID)', (done) => langTest(app, token, done));
  it('q: langs', (done) => langsTest(app, token, done));
  it('m: langCreate($options: LangInput!)', (done) => langCreateTest(app, token, done));
  it('m: langUpdate($options: LangInput!)', async (done) => langUpdateTest(app, token, done));
  it('m: langDelete($langID: String!)', async (done) => langDeleteTest(app, token, done));
});

describe('GET /graphql public', () => {
  it('m: login($email: String!, $password:String!)', (done) => loginTest(app, done));
  it('m: signUp($options:SignUpInput!)', (done) => signupTest(app, done));
});
