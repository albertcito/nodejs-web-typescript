import request from 'supertest';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';
import getApp from '../../../../init/app';
import getOauthTokenValid from '../../../config/getOauthTokenValid';

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
      'langs.*.langID': 'required|string',
      'langs.*.localname': 'required|string',
      'langs.*.name': 'required|string',
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
