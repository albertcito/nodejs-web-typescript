import request from 'supertest';
import { Express } from 'express';

import assertJsonStructureGraphQL from '../../../config/assertJsonStructureGraphQL';

const langsTest = (app: Express, token: string, done: jest.DoneCallback) => {
  const data = {
    query: `{
      langs {
        pagination {
          from
          to
          total
          limit
          page
          length
        }
        data {
          langID
          localname
          name
        }
      }
    }`,
  };

  const rules = {
    'langs.data.*.langID': 'required|string',
    'langs.data.*.localname': 'required|string',
    'langs.data.*.name': 'required|string',
  };

  request(app)
    .post('/graphql/private')
    .send(data)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(async (err, res) => assertJsonStructureGraphQL(done, res, err, rules));
};

export default langsTest;
