import request from 'supertest';
import getApp from '../../init/app';

import { getErrors } from '../../util/validatorjs';

describe('GET /graphql query -> "langs"', () => {
  it('respond graphql json', async (done) => {
    const app = await getApp();

    const data = {
      query: `{
        langs {
          langID
          localname
          name
        }
      }`,
    };

    const rules = {
      'data.langs.*.langID': 'required|string',
      'data.langs.*.localname': 'required|string',
      'data.langs.*.name': 'required|string',
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
