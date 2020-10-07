import request from 'supertest';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import getApp from '../../../../init/app';
import getOauthTokenValid from '../../../config/getOauthTokenValid';

describe('GET /graphql query -> "users"', () => {
  it('responds graphql json', async (done) => {
    const app = await getApp();

    const data = {
      query: `{
        users {
          userID
          firstName
          lastName
          email
        }
      }`,
    };

    const rules = {
      'users.*.userID': 'required|integer',
      'users.*.firstName': 'required|string',
      'users.*.lastName': 'required|string',
      'users.*.email': 'required|email',
    };

    const token = await getOauthTokenValid();

    request(app)
      .post('/graphql')
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
  });
});
