import { Express } from 'express';

import getApp from '../init/app';
import getOauthTokenValid from './config/getOauthTokenValid';
import usersTest from './graphql/private/user/users';
import langTest from './graphql/private/lang/lang';
import langsTest from './graphql/private/lang/langs';
import langCreateTest from './graphql/private/lang/langCreate';
import langUpdateTest from './graphql/private/lang/langUpdate';

let app: Express;
let token = '';

beforeAll(async () => {
  app = await getApp();
  token = await getOauthTokenValid();
});

describe('GET /graphql', () => {
  it('q: users', (done) => usersTest(app, token, done));
  it('q: lang(langID: $langID)', (done) => langTest(app, token, done));
  it('q: langs', (done) => langsTest(app, token, done));
  it('m: langCreate($options: LangInput!)', (done) => langCreateTest(app, token, done));
  it('m: langUpdate($options: LangInput!)', async (done) => langUpdateTest(app, token, done));
});
