import request from 'supertest';
import getApp from '../../init/app';

import { getErrors } from '../../util/validatorjs';

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
      'data.users.*.userID': 'required|integer',
      'data.users.*.firstName': 'required|string',
      'data.users.*.lastName': 'required|string',
      'data.users.*.email': 'required|email',
    };

    request(app)
      .post('/graphql')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) { done(err); }
        const errors = await getErrors(res.body, rules);
        if (errors) { done(errors); }
        done();
      });
  });
});
